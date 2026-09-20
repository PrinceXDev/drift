package remediation_test

import (
	"context"
	"errors"
	"io"
	"log/slog"
	"sync"
	"testing"

	"github.com/drift/drift-engine/internal/authz"
	"github.com/drift/drift-engine/internal/eventlog"
	"github.com/drift/drift-engine/internal/gate"
	"github.com/drift/drift-engine/internal/remediation"
	"github.com/drift/drift-engine/internal/seeddata"
	"github.com/drift/drift-engine/pkg/driftv1"
)

// ---------------------------------------------------------------------------
// fixtures
// ---------------------------------------------------------------------------

type corpus struct {
	build      driftv1.BuildSnapshot
	assertions map[string]driftv1.Assertion
	err        error
}

func (c corpus) CurrentBuild(context.Context) (driftv1.BuildSnapshot, error) {
	return c.build, c.err
}

func (c corpus) Assertion(_ context.Context, id string) (driftv1.Assertion, bool, error) {
	if c.err != nil {
		return driftv1.Assertion{}, false, c.err
	}
	a, ok := c.assertions[id]
	return a, ok, nil
}

type recordingPublisher struct {
	mu    sync.Mutex
	calls []string
	last  remediation.PublishRequest
	err   error
}

func (p *recordingPublisher) Publish(_ context.Context, req remediation.PublishRequest) error {
	p.mu.Lock()
	defer p.mu.Unlock()
	if p.err != nil {
		return p.err
	}
	p.calls = append(p.calls, req.AssertionID+"@"+req.BuildID)
	p.last = req
	return nil
}

func (p *recordingPublisher) count() int {
	p.mu.Lock()
	defer p.mu.Unlock()
	return len(p.calls)
}

type reader struct {
	byClaim map[string][]driftv1.Assertion
}

func (r reader) AssertionsReferencing(_ context.Context, id string) ([]driftv1.Assertion, error) {
	return r.byClaim[id], nil
}

// settledBuild resolves the seed conflict so the gate's other checks are what
// the test is exercising.
func settledBuild() driftv1.BuildSnapshot {
	b := seeddata.Build47()
	conflicts := make([]driftv1.Conflict, len(b.Conflicts))
	copy(conflicts, b.Conflicts)
	for i := range conflicts {
		conflicts[i].ResolvedBy = "instruction.returns-pdf-wins"
	}
	b.Conflicts = conflicts
	return b
}

func assertionIndex() map[string]driftv1.Assertion {
	out := map[string]driftv1.Assertion{}
	for _, a := range seeddata.Assertions() {
		out[a.ID] = a
	}
	return out
}

type harness struct {
	svc   *remediation.Service
	log   *eventlog.Log
	store *eventlog.MemStore
	pub   *recordingPublisher
}

func newHarness(t *testing.T, opts ...func(*corpus, *recordingPublisher)) harness {
	t.Helper()

	c := corpus{build: settledBuild(), assertions: assertionIndex()}
	pub := &recordingPublisher{}
	for _, opt := range opts {
		opt(&c, pub)
	}

	store := eventlog.NewMemStore()
	log := eventlog.New(store)
	g := gate.New(reader{byClaim: seeddata.AssertionsByClaim()})
	quiet := slog.New(slog.NewTextHandler(io.Discard, nil))

	return harness{
		svc:   remediation.New(g, log, c, pub, quiet),
		log:   log,
		store: store,
		pub:   pub,
	}
}

func grant(t *testing.T, perm authz.Permission, roles ...authz.Role) *authz.Grant {
	t.Helper()
	g, err := authz.Authorize(
		authz.Actor{ID: "dana", Roles: roles, Tenant: "acme"}, perm, "acme", "assert.returns-1")
	if err != nil {
		t.Fatalf("authorize: %v", err)
	}
	return g
}

func agentGrant(t *testing.T) *authz.Grant {
	t.Helper()
	g, err := authz.Authorize(
		authz.Actor{ID: "drafter", Roles: []authz.Role{authz.RoleAgent}, Tenant: "acme", IsAgent: true},
		authz.PermDraftCorrection, "acme", "assert.returns-1")
	if err != nil {
		t.Fatalf("authorize: %v", err)
	}
	return g
}

func readyDraft() remediation.Draft {
	return remediation.Draft{
		AssertionID:         "assert.returns-1",
		ProposedText:        "You have 45 days from delivery to start a return.",
		DraftedAgainstBuild: "build.47",
		DraftedBlastRadius: []string{
			"assert.returns-1", "assert.returns-2", "assert.returns-3", "assert.returns-4",
			"assert.returns-5", "assert.returns-6", "assert.returns-7",
		},
		TouchedFieldPath: "body[1]",
		DraftedBy:        "agent.drafter",
	}
}

func eventsOf(t *testing.T, h harness) []eventlog.Event {
	t.Helper()
	events, err := h.store.Range(context.Background(), eventlog.Query{Tenant: "acme"})
	if err != nil {
		t.Fatal(err)
	}
	return events
}

func typesOf(events []eventlog.Event) []eventlog.Type {
	out := make([]eventlog.Type, 0, len(events))
	for _, e := range events {
		out = append(out, e.Type)
	}
	return out
}

// ---------------------------------------------------------------------------
// the slice, end to end
// ---------------------------------------------------------------------------

func TestApprove_PublishesAndLeavesACompleteTrail(t *testing.T) {
	h := newHarness(t)
	ctx := context.Background()

	out, err := h.svc.Approve(ctx, grant(t, authz.PermApprovePublish, authz.RoleEditor), readyDraft())
	if err != nil {
		t.Fatalf("approve: %v", err)
	}
	if !out.Applied {
		t.Fatalf("not applied: %s", out.Decision.Reason())
	}
	if h.pub.count() != 1 {
		t.Errorf("publisher called %d times, want 1", h.pub.count())
	}

	events := eventsOf(t, h)
	if len(events) != 2 {
		t.Fatalf("trail has %d entries, want approval then completion: %v", len(events), typesOf(events))
	}
	if events[0].Type != eventlog.CorrectionApproved {
		t.Errorf("first entry = %s, want the approval recorded before the write", events[0].Type)
	}
	if events[1].Type != eventlog.PublicationDone {
		t.Errorf("second entry = %s, want the completion", events[1].Type)
	}

	// The chain must verify: this is the trail an auditor would be shown.
	if err := h.log.Verify(ctx, "acme"); err != nil {
		t.Errorf("audit chain does not verify: %v", err)
	}
}

// Approval is recorded before the write. If the process dies mid-publish, the
// trail still says a decision was made.
func TestApprove_RecordsTheDecisionBeforeActingOnIt(t *testing.T) {
	h := newHarness(t, func(_ *corpus, p *recordingPublisher) {
		p.err = errors.New("content lake unavailable")
	})
	ctx := context.Background()

	out, err := h.svc.Approve(ctx, grant(t, authz.PermApprovePublish, authz.RoleEditor), readyDraft())
	if err == nil {
		t.Fatal("expected the publish failure to surface")
	}
	if out.Applied {
		t.Error("reported applied after the publisher failed")
	}

	events := eventsOf(t, h)
	if len(events) != 1 || events[0].Type != eventlog.CorrectionApproved {
		t.Fatalf("expected the approval to survive the failed publish, got %v", typesOf(events))
	}
}

// A blocked publication is a fact worth remembering.
func TestApprove_RecordsBlockedAttempts(t *testing.T) {
	h := newHarness(t)
	ctx := context.Background()

	stale := readyDraft()
	stale.DraftedAgainstBuild = "build.46"

	out, err := h.svc.Approve(ctx, grant(t, authz.PermApprovePublish, authz.RoleEditor), stale)
	if err != nil {
		t.Fatal(err)
	}
	if out.Applied {
		t.Fatal("published a stale draft")
	}
	if h.pub.count() != 0 {
		t.Error("publisher was called despite the gate blocking")
	}

	events := eventsOf(t, h)
	if len(events) != 1 || events[0].Type != eventlog.PublicationBlocked {
		t.Fatalf("expected a blocked record, got %v", typesOf(events))
	}
	failed, _ := events[0].Evidence["failedChecks"].([]string)
	if len(failed) == 0 {
		t.Error("the blocked record does not say which checks failed")
	}
}

// Double-click, retried request, replayed queue message: one publication.
func TestApprove_IsIdempotent(t *testing.T) {
	h := newHarness(t)
	ctx := context.Background()
	g := grant(t, authz.PermApprovePublish, authz.RoleEditor)

	first, err := h.svc.Approve(ctx, g, readyDraft())
	if err != nil {
		t.Fatal(err)
	}
	second, err := h.svc.Approve(ctx, g, readyDraft())
	if err != nil {
		t.Fatal(err)
	}

	if h.pub.count() != 1 {
		t.Errorf("published %d times on a repeated approval, want 1", h.pub.count())
	}
	if !second.Duplicate {
		t.Error("the second approval did not report itself as a duplicate")
	}
	if first.Decision.BuildID != second.Decision.BuildID {
		t.Error("the two approvals disagree about which build they acted on")
	}
}

func TestApprove_IsIdempotentUnderConcurrency(t *testing.T) {
	h := newHarness(t)
	ctx := context.Background()
	g := grant(t, authz.PermApprovePublish, authz.RoleEditor)

	var wg sync.WaitGroup
	for i := 0; i < 25; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			_, _ = h.svc.Approve(ctx, g, readyDraft())
		}()
	}
	wg.Wait()

	if h.pub.count() != 1 {
		t.Errorf("25 concurrent approvals published %d times, want 1", h.pub.count())
	}
}

// An agent cannot obtain a publish grant, and the service refuses a grant for
// the wrong permission even if one were somehow produced.
func TestApprove_RefusesAGrantForTheWrongPermission(t *testing.T) {
	h := newHarness(t)

	_, err := h.svc.Approve(context.Background(), agentGrant(t), readyDraft())
	if err == nil {
		t.Fatal("an agent's draft grant was accepted for publication")
	}
	if !errors.Is(err, authz.ErrDenied) {
		t.Errorf("error = %v, want ErrDenied", err)
	}
	if h.pub.count() != 0 {
		t.Error("publisher was called")
	}
}

func TestApprove_RequiresAnActor(t *testing.T) {
	h := newHarness(t)
	if _, err := h.svc.Approve(context.Background(), nil, readyDraft()); !errors.Is(err, authz.ErrNoActor) {
		t.Errorf("error = %v, want ErrNoActor", err)
	}
}

// Never report a publication that did not happen.
func TestApprove_WithoutAPublisherFailsLoudly(t *testing.T) {
	store := eventlog.NewMemStore()
	svc := remediation.New(
		gate.New(reader{byClaim: seeddata.AssertionsByClaim()}),
		eventlog.New(store),
		corpus{build: settledBuild(), assertions: assertionIndex()},
		nil, // no publisher
		slog.New(slog.NewTextHandler(io.Discard, nil)),
	)

	out, err := svc.Approve(context.Background(), grant(t, authz.PermApprovePublish, authz.RoleEditor), readyDraft())
	if !errors.Is(err, remediation.ErrNoPublisher) {
		t.Fatalf("error = %v, want ErrNoPublisher", err)
	}
	if out.Applied {
		t.Error("reported a publication with no publisher configured")
	}
}

// Preview is read-only: it must evaluate everything and record nothing.
func TestPreview_EvaluatesWithoutSideEffects(t *testing.T) {
	h := newHarness(t)
	ctx := context.Background()

	decision, err := h.svc.Preview(ctx, grant(t, authz.PermSimulate, authz.RoleViewer, authz.RoleAgent), readyDraft())
	if err != nil {
		t.Fatal(err)
	}
	if len(decision.Checks) == 0 {
		t.Error("preview returned no checks")
	}
	if len(decision.BlastRadius) != 8 {
		t.Errorf("preview blast radius = %d, want 8 recomputed (7 pages + the Support Bot)", len(decision.BlastRadius))
	}

	if events := eventsOf(t, h); len(events) != 0 {
		t.Errorf("preview wrote %d audit entries; it must be read-only", len(events))
	}
	if h.pub.count() != 0 {
		t.Error("preview published something")
	}
}

// A rejection is recorded, because "a person looked at this and said no" is a
// fact about the organisation's knowledge.
func TestReject_IsRecordedWithItsReason(t *testing.T) {
	h := newHarness(t)
	ctx := context.Background()

	out, err := h.svc.Reject(ctx, grant(t, authz.PermApprovePublish, authz.RoleEditor),
		readyDraft(), "the policy PDF is itself out of date; legal is reissuing it")
	if err != nil {
		t.Fatal(err)
	}
	if out.Applied {
		t.Error("a rejection reported itself as applied")
	}

	events := eventsOf(t, h)
	if len(events) != 1 || events[0].Type != eventlog.CorrectionRejected {
		t.Fatalf("expected one rejection record, got %v", typesOf(events))
	}
	if events[0].Evidence["reason"] == nil {
		t.Error("the rejection does not record why")
	}
	if h.pub.count() != 0 {
		t.Error("a rejection published something")
	}
}

// Failure recovery: an unreadable corpus must abort before any write, not
// publish against a guess.
func TestApprove_AbortsWhenCurrentBeliefCannotBeRead(t *testing.T) {
	h := newHarness(t, func(c *corpus, _ *recordingPublisher) {
		c.err = errors.New("mcp unavailable")
	})

	_, err := h.svc.Approve(context.Background(), grant(t, authz.PermApprovePublish, authz.RoleEditor), readyDraft())
	if err == nil {
		t.Fatal("approved without being able to read current belief")
	}
	if h.pub.count() != 0 {
		t.Error("published without knowing the current build")
	}
	if events := eventsOf(t, h); len(events) != 0 {
		t.Error("wrote an audit entry for an approval that never got as far as a decision")
	}
}

func TestApprove_UnknownAssertionIsRefused(t *testing.T) {
	h := newHarness(t)

	draft := readyDraft()
	draft.AssertionID = "assert.does-not-exist"

	_, err := h.svc.Approve(context.Background(), grant(t, authz.PermApprovePublish, authz.RoleEditor), draft)
	if err == nil {
		t.Fatal("approved a correction to an assertion that does not exist")
	}
	if h.pub.count() != 0 {
		t.Error("publisher was called")
	}
}

// The audit entry has to answer "why was this allowed?" long after everyone
// involved has forgotten.
func TestApprove_EvidenceIsSufficientForAnAudit(t *testing.T) {
	h := newHarness(t)
	ctx := context.Background()

	if _, err := h.svc.Approve(ctx, grant(t, authz.PermApprovePublish, authz.RoleEditor), readyDraft()); err != nil {
		t.Fatal(err)
	}

	approval := eventsOf(t, h)[0]
	for _, key := range []string{"passedChecks", "claimId", "fieldPath", "blastRadius", "draftedBy", "beforeDigest", "afterDigest"} {
		if approval.Evidence[key] == nil {
			t.Errorf("approval evidence is missing %q", key)
		}
	}
	if approval.ActorID == "" || approval.BuildID == "" || approval.CorrelationID == "" {
		t.Error("approval is not fully traceable to actor, build and correlation")
	}
	// Redaction: the page's actual text must never reach the audit record.
	if before, _ := approval.Evidence["beforeDigest"].(string); len(before) > 0 && before[:7] != "sha256:" {
		t.Errorf("beforeDigest = %q; content must be fingerprinted, not stored", before)
	}
}

// The publisher must receive everything it needs to write safely — including
// the page and the block key, without which it cannot address the paragraph.
func TestApprove_PassesACompletePublishRequest(t *testing.T) {
	h := newHarness(t)

	if _, err := h.svc.Approve(context.Background(),
		grant(t, authz.PermApprovePublish, authz.RoleEditor), readyDraft()); err != nil {
		t.Fatal(err)
	}

	h.pub.mu.Lock()
	req := h.pub.last
	h.pub.mu.Unlock()

	if req.PageID == "" {
		t.Error("no page id: the publisher cannot patch a paragraph without it")
	}
	if req.BlockKey == "" {
		t.Error("no block key: a positional path is not safe to write through")
	}
	if req.BuildID == "" {
		t.Error("no build id: the assertion could not be stamped")
	}
	if req.IdempotencyKey == "" {
		t.Error("no idempotency key: a retried write could publish twice")
	}
	if req.Text != readyDraft().ProposedText {
		t.Errorf("text = %q, want the approved correction", req.Text)
	}
}
