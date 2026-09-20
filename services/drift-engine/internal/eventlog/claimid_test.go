package eventlog_test

import (
	"context"
	"testing"

	"github.com/drift/drift-engine/internal/authz"
	"github.com/drift/drift-engine/internal/eventlog"
)

// A claim's timeline is one query.
//
// Before ClaimID existed, "everything that ever happened to the returns window"
// meant resolving today's assertions for that claim and then filtering the log
// by each of them — a join the log did not support, answered against a
// dependency graph that has since changed. An assertion retired last month
// would have dropped out of its own history.
func TestReadByClaimIDCrossesEveryAssertion(t *testing.T) {
	ctx := context.Background()
	log := eventlog.New(eventlog.NewMemStore())
	grant := grantFor(t, "acme", authz.PermApprovePublish, authz.RoleEditor)

	// Two different published places, one fact.
	appends := []eventlog.Append{
		{Type: eventlog.CorrectionApproved, Subject: "assert.returns-1", ClaimID: "claim.returns-window", BuildID: "build.47"},
		{Type: eventlog.PublicationDone, Subject: "assert.returns-1", ClaimID: "claim.returns-window", BuildID: "build.47"},
		{Type: eventlog.PublicationBlocked, Subject: "assert.returns-7", ClaimID: "claim.returns-window", BuildID: "build.47"},
		// A different fact entirely, which must not appear.
		{Type: eventlog.CorrectionApproved, Subject: "assert.warranty-1", ClaimID: "claim.warranty", BuildID: "build.47"},
		// And an event about no fact in particular.
		{Type: eventlog.BuildCaptured, Subject: "build.47", BuildID: "build.47"},
	}
	for _, a := range appends {
		if _, err := log.Record(ctx, grant, a); err != nil {
			t.Fatalf("record %s: %v", a.Type, err)
		}
	}

	events, err := log.Read(ctx, grant, eventlog.Query{ClaimID: "claim.returns-window"})
	if err != nil {
		t.Fatalf("read: %v", err)
	}
	if len(events) != 3 {
		t.Fatalf("claim timeline = %d events, want 3 (two assertions, one fact)", len(events))
	}

	subjects := map[string]bool{}
	for _, e := range events {
		subjects[e.Subject] = true
		if e.ClaimID != "claim.returns-window" {
			t.Errorf("event %s leaked from claim %s", e.ID, e.ClaimID)
		}
	}
	if len(subjects) != 2 {
		t.Errorf("timeline covers %d assertions, want 2 — a claim's history spans "+
			"every place it was published, not just the one somebody clicked", len(subjects))
	}
}

// Subject and claim filters compose, so "this assertion, for this fact" is
// still one read.
func TestSubjectAndClaimFiltersCompose(t *testing.T) {
	ctx := context.Background()
	log := eventlog.New(eventlog.NewMemStore())
	grant := grantFor(t, "acme", authz.PermApprovePublish, authz.RoleEditor)

	for _, a := range []eventlog.Append{
		{Type: eventlog.CorrectionApproved, Subject: "assert.returns-1", ClaimID: "claim.returns-window"},
		{Type: eventlog.CorrectionApproved, Subject: "assert.returns-7", ClaimID: "claim.returns-window"},
	} {
		if _, err := log.Record(ctx, grant, a); err != nil {
			t.Fatal(err)
		}
	}

	events, err := log.Read(ctx, grant, eventlog.Query{
		Subject: "assert.returns-1", ClaimID: "claim.returns-window",
	})
	if err != nil {
		t.Fatal(err)
	}
	if len(events) != 1 {
		t.Fatalf("filtered read = %d events, want 1", len(events))
	}
}

// The claim is pinned at write time, so a timeline does not change shape
// because the dependency graph moved afterwards.
func TestClaimIDIsCoveredByTheHashChain(t *testing.T) {
	ctx := context.Background()
	store := eventlog.NewMemStore()
	log := eventlog.New(store)
	grant := grantFor(t, "acme", authz.PermApprovePublish, authz.RoleEditor)

	event, err := log.Record(ctx, grant, eventlog.Append{
		Type: eventlog.CorrectionApproved, Subject: "assert.returns-1",
		ClaimID: "claim.returns-window", BuildID: "build.47",
	})
	if err != nil {
		t.Fatal(err)
	}

	tampered := event
	tampered.ClaimID = "claim.warranty"
	store.Overwrite(0, tampered)

	if err := log.Verify(ctx, grant.Tenant()); err == nil {
		t.Fatal("rewriting an event's claim went undetected; provenance that can be " +
			"edited after the fact is not provenance")
	}
}
