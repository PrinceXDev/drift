package eventlog_test

import (
	"context"
	"errors"
	"sync"
	"testing"

	"github.com/drift/drift-engine/internal/authz"
	"github.com/drift/drift-engine/internal/eventlog"
)

func grantFor(t *testing.T, tenant string, perm authz.Permission, roles ...authz.Role) *authz.Grant {
	t.Helper()
	g, err := authz.Authorize(
		authz.Actor{ID: "sam", Email: "sam@acme.test", Roles: roles, Tenant: tenant},
		perm, tenant, "support/returns",
	)
	if err != nil {
		t.Fatalf("authorize: %v", err)
	}
	return g
}

func newLog() (*eventlog.Log, *eventlog.MemStore) {
	store := eventlog.NewMemStore()
	return eventlog.New(store), store
}

// An audit entry cannot exist for an unauthorized action, because writing one
// requires the Grant that authorization produces.
func TestRecord_RequiresAGrant(t *testing.T) {
	log, _ := newLog()

	_, err := log.Record(context.Background(), nil, eventlog.Append{Type: eventlog.PublicationDone})
	if !errors.Is(err, eventlog.ErrNoGrant) {
		t.Errorf("error = %v, want ErrNoGrant", err)
	}
}

// Idempotency: a retried request observes the original event rather than
// appending a second one. Without this, every network blip doubles the audit
// trail and "how many times did this happen" becomes unanswerable.
func TestRecord_IsIdempotent(t *testing.T) {
	log, store := newLog()
	ctx := context.Background()
	grant := grantFor(t, "acme", authz.PermApprovePublish, authz.RoleEditor)

	append := eventlog.Append{
		Type:           eventlog.CorrectionApproved,
		Subject:        "assert.returns-1",
		BuildID:        "build.47",
		IdempotencyKey: "approve:assert.returns-1:build.47",
	}

	first, err := log.Record(ctx, grant, append)
	if err != nil {
		t.Fatal(err)
	}
	second, err := log.Record(ctx, grant, append)
	if err != nil {
		t.Fatal(err)
	}

	if first.ID != second.ID {
		t.Errorf("retry produced a new event: %s then %s", first.ID, second.ID)
	}
	events, _ := store.Range(ctx, eventlog.Query{Tenant: "acme"})
	if len(events) != 1 {
		t.Errorf("log holds %d events after a retry, want 1", len(events))
	}
}

// The same guarantee under concurrency — a retry storm must not race past the
// pre-check in Record.
func TestRecord_IsIdempotentUnderConcurrency(t *testing.T) {
	log, store := newLog()
	ctx := context.Background()
	grant := grantFor(t, "acme", authz.PermApprovePublish, authz.RoleEditor)

	var wg sync.WaitGroup
	for i := 0; i < 40; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			_, _ = log.Record(ctx, grant, eventlog.Append{
				Type:           eventlog.CorrectionApproved,
				Subject:        "assert.returns-1",
				IdempotencyKey: "approve:once",
			})
		}()
	}
	wg.Wait()

	events, _ := store.Range(ctx, eventlog.Query{Tenant: "acme"})
	if len(events) != 1 {
		t.Fatalf("40 concurrent retries produced %d events, want 1", len(events))
	}
}

// Tamper evidence. Editing a recorded event must be detectable.
func TestVerify_DetectsAlteredContent(t *testing.T) {
	log, store := newLog()
	ctx := context.Background()
	grant := grantFor(t, "acme", authz.PermApprovePublish, authz.RoleEditor)

	for _, subject := range []string{"a1", "a2", "a3"} {
		if _, err := log.Record(ctx, grant, eventlog.Append{
			Type: eventlog.CorrectionApproved, Subject: subject, BuildID: "build.47",
		}); err != nil {
			t.Fatal(err)
		}
	}

	if err := log.Verify(ctx, "acme"); err != nil {
		t.Fatalf("a clean log failed verification: %v", err)
	}

	// Reach past the API and rewrite history, as an attacker with store access would.
	events, _ := store.Range(ctx, eventlog.Query{Tenant: "acme"})
	tampered := events[1]
	tampered.Subject = "a2-altered"
	store.Overwrite(1, tampered)

	err := log.Verify(ctx, "acme")
	if err == nil {
		t.Fatal("verification passed on an altered log")
	}
	if !errors.Is(err, eventlog.ErrTamper) {
		t.Errorf("error = %v, want ErrTamper", err)
	}
}

// Deleting an entry breaks the chain even though every surviving event is
// individually well-formed.
func TestVerify_DetectsDeletion(t *testing.T) {
	log, store := newLog()
	ctx := context.Background()
	grant := grantFor(t, "acme", authz.PermApprovePublish, authz.RoleEditor)

	for _, s := range []string{"a1", "a2", "a3"} {
		_, _ = log.Record(ctx, grant, eventlog.Append{Type: eventlog.CorrectionApproved, Subject: s})
	}

	store.Delete(1) // remove the middle event

	if err := log.Verify(ctx, "acme"); !errors.Is(err, eventlog.ErrTamper) {
		t.Errorf("deleting an event went undetected: %v", err)
	}
}

// Time-travel is a bounded fold, not a separate mechanism.
func TestRange_TimeTravelBySequence(t *testing.T) {
	log, _ := newLog()
	ctx := context.Background()
	grant := grantFor(t, "acme", authz.PermReadAudit, authz.RoleSteward)

	for _, s := range []string{"a1", "a2", "a3", "a4"} {
		_, _ = log.Record(ctx, grant, eventlog.Append{Type: eventlog.DriftDetected, Subject: s})
	}

	asOf, err := log.Read(ctx, grant, eventlog.Query{UpToSeq: 2})
	if err != nil {
		t.Fatal(err)
	}
	if len(asOf) != 2 {
		t.Fatalf("as-of seq 2 returned %d events, want 2", len(asOf))
	}
	if asOf[1].Subject != "a2" {
		t.Errorf("last event = %q, want a2", asOf[1].Subject)
	}
}

// An incident timeline is a filter, not a table.
func TestRange_SubjectTimeline(t *testing.T) {
	log, _ := newLog()
	ctx := context.Background()
	grant := grantFor(t, "acme", authz.PermReadAudit, authz.RoleSteward)

	_, _ = log.Record(ctx, grant, eventlog.Append{Type: eventlog.DriftDetected, Subject: "support/returns"})
	_, _ = log.Record(ctx, grant, eventlog.Append{Type: eventlog.DriftDetected, Subject: "shipping/free"})
	_, _ = log.Record(ctx, grant, eventlog.Append{Type: eventlog.IncidentDeclared, Subject: "support/returns"})
	_, _ = log.Record(ctx, grant, eventlog.Append{Type: eventlog.PublicationDone, Subject: "support/returns"})

	timeline, err := log.Read(ctx, grant, eventlog.Query{Subject: "support/returns"})
	if err != nil {
		t.Fatal(err)
	}
	if len(timeline) != 3 {
		t.Fatalf("timeline has %d entries, want 3", len(timeline))
	}
	for _, e := range timeline {
		if e.Subject != "support/returns" {
			t.Errorf("timeline leaked %q", e.Subject)
		}
	}
}

// Cross-tenant isolation: a read is forced to the grant's tenant, so passing
// another tenant's name in the query cannot widen the result.
func TestRead_CannotEscapeItsTenant(t *testing.T) {
	log, _ := newLog()
	ctx := context.Background()

	acme := grantFor(t, "acme", authz.PermReadAudit, authz.RoleSteward)
	globex := grantFor(t, "globex", authz.PermReadAudit, authz.RoleSteward)

	_, _ = log.Record(ctx, acme, eventlog.Append{Type: eventlog.DriftDetected, Subject: "acme-secret"})
	_, _ = log.Record(ctx, globex, eventlog.Append{Type: eventlog.DriftDetected, Subject: "globex-secret"})

	// Ask, as acme, for globex's events.
	events, err := log.Read(ctx, acme, eventlog.Query{Tenant: "globex"})
	if err != nil {
		t.Fatal(err)
	}
	for _, e := range events {
		if e.Tenant != "acme" {
			t.Fatalf("acme read a %s event: %q", e.Tenant, e.Subject)
		}
	}
	if len(events) != 1 {
		t.Errorf("got %d events, want acme's 1", len(events))
	}
}

// Per-tenant sequences: one tenant's volume must not perturb another's numbers,
// which would leak activity levels across the boundary.
func TestSequences_ArePerTenant(t *testing.T) {
	log, _ := newLog()
	ctx := context.Background()
	acme := grantFor(t, "acme", authz.PermReadAudit, authz.RoleSteward)
	globex := grantFor(t, "globex", authz.PermReadAudit, authz.RoleSteward)

	for i := 0; i < 5; i++ {
		_, _ = log.Record(ctx, acme, eventlog.Append{Type: eventlog.DriftDetected, Subject: "x"})
	}
	first, err := log.Record(ctx, globex, eventlog.Append{Type: eventlog.DriftDetected, Subject: "y"})
	if err != nil {
		t.Fatal(err)
	}

	if first.Seq != 1 {
		t.Errorf("globex's first event has seq %d; sequences must be per-tenant", first.Seq)
	}
	if first.PrevID != "" {
		t.Error("globex's first event chains to an acme event")
	}
}

// Every event carries the four things the brief requires be traceable.
func TestEvent_CarriesFullTraceability(t *testing.T) {
	log, _ := newLog()
	ctx := context.Background()
	grant := grantFor(t, "acme", authz.PermApprovePublish, authz.RoleEditor)

	e, err := log.Record(ctx, grant, eventlog.Append{
		Type:     eventlog.PublicationDone,
		Subject:  "assert.returns-1",
		BuildID:  "build.47",
		Evidence: map[string]any{"claimPath": "support/returns", "before": 30, "after": 45},
	})
	if err != nil {
		t.Fatal(err)
	}

	if e.ActorID == "" || e.ActorRole == "" {
		t.Error("event does not name the actor")
	}
	if e.BuildID == "" {
		t.Error("event is not pinned to a build")
	}
	if e.Subject == "" {
		t.Error("event does not name what it touched")
	}
	if len(e.Evidence) == 0 {
		t.Error("event carries no evidence")
	}
	if e.CorrelationID == "" {
		t.Error("event has no correlation id; the causal chain is unreconstructable")
	}
	if e.ID == "" || e.Seq != 1 {
		t.Errorf("event identity is wrong: id=%q seq=%d", e.ID, e.Seq)
	}
}

// Replay determinism: identical input produces identical content addresses, so
// re-processing a build cannot create divergent history.
func TestHash_IsStableAcrossEvidenceOrdering(t *testing.T) {
	a := eventlog.Event{
		Type: eventlog.DriftDetected, Subject: "support/returns", BuildID: "build.47",
		Evidence: map[string]any{"z": 1, "a": 2, "m": 3},
	}
	b := eventlog.Event{
		Type: eventlog.DriftDetected, Subject: "support/returns", BuildID: "build.47",
		Evidence: map[string]any{"a": 2, "m": 3, "z": 1},
	}
	if a.Hash() != b.Hash() {
		t.Error("evidence map ordering changed the content address; replay would diverge")
	}
}
