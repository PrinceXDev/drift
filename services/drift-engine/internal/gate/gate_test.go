package gate_test

import (
	"context"
	"errors"
	"testing"

	"github.com/drift/drift-engine/internal/authz"
	"github.com/drift/drift-engine/internal/gate"
	"github.com/drift/drift-engine/internal/seeddata"
	"github.com/drift/drift-engine/pkg/driftv1"
)

type fixtureReader struct {
	byClaim map[string][]driftv1.Assertion
	err     error
}

func (r fixtureReader) AssertionsReferencing(_ context.Context, id string) ([]driftv1.Assertion, error) {
	if r.err != nil {
		return nil, r.err
	}
	return r.byClaim[id], nil
}

func humanGrant(t *testing.T) *authz.Grant {
	t.Helper()
	g, err := authz.Authorize(
		authz.Actor{ID: "dana", Roles: []authz.Role{authz.RoleEditor}, Tenant: "acme"},
		authz.PermApprovePublish, "acme", "assert.returns-1")
	if err != nil {
		t.Fatal(err)
	}
	return g
}

// An agent cannot obtain a publish grant at all, so the gate is tested with a
// grant for a permission an agent *can* hold, to prove the human check fires
// independently of the permission table.
func agentGrant(t *testing.T) *authz.Grant {
	t.Helper()
	g, err := authz.Authorize(
		authz.Actor{ID: "agent.drafter", Roles: []authz.Role{authz.RoleAgent}, Tenant: "acme", IsAgent: true},
		authz.PermDraftCorrection, "acme", "assert.returns-1")
	if err != nil {
		t.Fatal(err)
	}
	return g
}

func corpus() gate.Corpus { return gate.Corpus{Build: seeddata.Build47()} }

func readerWithSeed() fixtureReader {
	return fixtureReader{byClaim: seeddata.AssertionsByClaim()}
}

// A correction that is genuinely ready: drafted against the current build, the
// claim is active, the text still differs, scope respected.
func goodRequest() gate.Request {
	a := seeddata.Assertions()[0] // assert.returns-1, claim.returns-window, body[1]
	return gate.Request{
		Assertion:           a,
		ProposedText:        "You have 45 days from delivery to start a return.",
		DraftedAgainstBuild: "build.47",
		DraftedBlastRadius: []string{
			"assert.returns-1", "assert.returns-2", "assert.returns-3", "assert.returns-4",
			"assert.returns-5", "assert.returns-6", "assert.returns-7",
		},
		TouchedFieldPath: a.FieldPath,
	}
}

// Build 47 still carries an unresolved conflict on support/returns, so the
// happy path needs it settled first — which is itself the point: you cannot
// publish into a live disagreement.
func settledCorpus() gate.Corpus {
	build := seeddata.Build47()
	conflicts := make([]driftv1.Conflict, len(build.Conflicts))
	copy(conflicts, build.Conflicts)
	for i := range conflicts {
		conflicts[i].ResolvedBy = "instruction.returns-pdf-wins"
	}
	build.Conflicts = conflicts
	return gate.Corpus{Build: build}
}

func TestEvaluate_AllowsAReadyCorrection(t *testing.T) {
	g := gate.New(readerWithSeed())

	decision, err := g.Evaluate(context.Background(), humanGrant(t), goodRequest(), settledCorpus())
	if err != nil {
		t.Fatal(err)
	}

	if !decision.Allowed {
		t.Fatalf("a ready correction was blocked: %s\n%+v", decision.Reason(), decision.Blocked())
	}
	if decision.BuildID != "build.47" {
		t.Errorf("decision not pinned to a build: %q", decision.BuildID)
	}
	if len(decision.BlastRadius) != 8 {
		t.Errorf("blast radius = %d, want 8 recomputed (7 pages + the Support Bot)", len(decision.BlastRadius))
	}
}

// The central promise, enforced at the gate as well as in authz.
func TestEvaluate_BlocksAnAgent(t *testing.T) {
	g := gate.New(readerWithSeed())

	decision, err := g.Evaluate(context.Background(), agentGrant(t), goodRequest(), settledCorpus())
	if err != nil {
		t.Fatal(err)
	}

	if decision.Allowed {
		t.Fatal("an unattended agent passed the publication gate")
	}
	if !hasBlocking(decision, gate.CheckHumanApproval) {
		t.Errorf("expected human_approval to block, got %s", decision.Reason())
	}
}

// You cannot publish into a live source disagreement: the correction would pick
// a winner by accident.
func TestEvaluate_BlocksPublicationIntoAnUnresolvedConflict(t *testing.T) {
	g := gate.New(readerWithSeed())

	// Unmodified build 47 still has the returns conflict open.
	decision, err := g.Evaluate(context.Background(), humanGrant(t), goodRequest(), corpus())
	if err != nil {
		t.Fatal(err)
	}

	if decision.Allowed {
		t.Fatal("published into an unresolved conflict")
	}
	if !hasBlocking(decision, gate.CheckNoUnresolvedConflict) {
		t.Errorf("expected no_unresolved_conflict to block, got %s", decision.Reason())
	}
}

// A rebuild between drafting and approval invalidates the draft. This is the
// whole reason the gate exists rather than approval being a direct write.
func TestEvaluate_BlocksAStaleDraftAfterARebuild(t *testing.T) {
	g := gate.New(readerWithSeed())

	req := goodRequest()
	req.DraftedAgainstBuild = "build.46" // the KB rebuilt while this sat in the queue

	decision, err := g.Evaluate(context.Background(), humanGrant(t), req, settledCorpus())
	if err != nil {
		t.Fatal(err)
	}

	if decision.Allowed {
		t.Fatal("published a draft written against a superseded build")
	}
	if !hasBlocking(decision, gate.CheckBuildCurrent) {
		t.Errorf("expected build_current to block, got %s", decision.Reason())
	}
}

// Somebody fixed the sentence by hand. Publishing again would be a no-op write
// with an audit entry claiming a correction was applied.
func TestEvaluate_BlocksWhenAlreadyFixedByHand(t *testing.T) {
	g := gate.New(readerWithSeed())

	req := goodRequest()
	req.ProposedText = req.Assertion.RenderedText

	decision, _ := g.Evaluate(context.Background(), humanGrant(t), req, settledCorpus())
	if decision.Allowed {
		t.Fatal("published a correction identical to what is already live")
	}
	if !hasBlocking(decision, gate.CheckStillStale) {
		t.Errorf("expected still_stale to block, got %s", decision.Reason())
	}
}

// The contradiction check: a correction that fixes the return window but states
// a shipping threshold that disagrees with a current claim.
func TestEvaluate_DetectsContradictionWithAnotherClaim(t *testing.T) {
	g := gate.New(readerWithSeed())

	req := goodRequest()
	// support/warranty says 24 months in build 47. This says 36.
	req.ProposedText = "You have 45 days to return, and everything carries a 36 month warranty."

	decision, _ := g.Evaluate(context.Background(), humanGrant(t), req, settledCorpus())

	if decision.Allowed {
		t.Fatal("published text that contradicts a current claim")
	}
	if !hasBlocking(decision, gate.CheckNoContradiction) {
		t.Errorf("expected no_contradiction to block, got %s", decision.Reason())
	}
	detail := detailOf(decision, gate.CheckNoContradiction)
	if detail == "" || !contains(detail, "support/warranty") {
		t.Errorf("the block should name the claim it contradicts, got %q", detail)
	}
}

// Agreeing with another claim is fine. This guards against the contradiction
// check being so eager that it blocks correct text.
func TestEvaluate_AllowsTextThatAgreesWithOtherClaims(t *testing.T) {
	g := gate.New(readerWithSeed())

	req := goodRequest()
	req.ProposedText = "You have 45 days to return, and everything carries a 24 month warranty."

	decision, _ := g.Evaluate(context.Background(), humanGrant(t), req, settledCorpus())
	if !decision.Allowed {
		t.Fatalf("blocked text that agrees with current belief: %s", decision.Reason())
	}
}

// Scope: the correction must touch only the declared field.
func TestEvaluate_BlocksOutOfScopeEdits(t *testing.T) {
	g := gate.New(readerWithSeed())

	req := goodRequest()
	req.TouchedFieldPath = "body[3]"

	decision, _ := g.Evaluate(context.Background(), humanGrant(t), req, settledCorpus())
	if decision.Allowed {
		t.Fatal("published an edit outside the assertion's declared field")
	}
	if !hasBlocking(decision, gate.CheckScopeRespected) {
		t.Errorf("expected scope_respected to block, got %s", decision.Reason())
	}
}

// Fail closed. An unknown blast radius is not a small blast radius.
func TestEvaluate_FailsClosedWhenBlastRadiusCannotBeComputed(t *testing.T) {
	g := gate.New(fixtureReader{err: errors.New("content lake unavailable")})

	decision, err := g.Evaluate(context.Background(), humanGrant(t), goodRequest(), settledCorpus())
	if err != nil {
		t.Fatal(err)
	}

	if decision.Allowed {
		t.Fatal("published without knowing what depends on the claim")
	}
	if !hasBlocking(decision, gate.CheckBlastRadiusStable) {
		t.Errorf("expected blast_radius_stable to block, got %s", decision.Reason())
	}
}

// A page that started depending on this claim since drafting is worth knowing
// about — but it is a reason to look, not to refuse.
func TestEvaluate_BlastRadiusGrowthIsAdvisoryNotBlocking(t *testing.T) {
	g := gate.New(readerWithSeed())

	req := goodRequest()
	req.DraftedBlastRadius = []string{"assert.returns-1"} // six appeared since

	decision, _ := g.Evaluate(context.Background(), humanGrant(t), req, settledCorpus())

	if !decision.Allowed {
		t.Fatalf("growth in blast radius should warn, not block: %s", decision.Reason())
	}
	check := findCheck(decision, gate.CheckBlastRadiusStable)
	if check == nil || check.Passed {
		t.Fatal("expected a failed advisory for blast radius growth")
	}
	if check.Blocking {
		t.Error("blast radius growth must be advisory, not blocking")
	}
	if !contains(check.Detail, "since drafting") {
		t.Errorf("advisory should explain what changed, got %q", check.Detail)
	}
}

// Every check runs even after one fails: an operator should see everything
// wrong at once rather than fixing problems one resubmission at a time.
func TestEvaluate_ReportsEveryFailureAtOnce(t *testing.T) {
	g := gate.New(readerWithSeed())

	req := goodRequest()
	req.DraftedAgainstBuild = "build.46"
	req.TouchedFieldPath = "body[9]"

	decision, _ := g.Evaluate(context.Background(), agentGrant(t), req, corpus())

	blocked := decision.Blocked()
	if len(blocked) < 4 {
		t.Fatalf("expected at least 4 blocking failures reported together, got %d: %s",
			len(blocked), decision.Reason())
	}
	for _, want := range []gate.CheckName{
		gate.CheckHumanApproval, gate.CheckBuildCurrent,
		gate.CheckScopeRespected, gate.CheckNoUnresolvedConflict,
	} {
		if !hasBlocking(decision, want) {
			t.Errorf("%s should have been reported", want)
		}
	}
}

// The gate is deterministic: the same request against the same build always
// yields the same verdict.
func TestEvaluate_IsDeterministic(t *testing.T) {
	g := gate.New(readerWithSeed())
	req, c := goodRequest(), settledCorpus()

	first, _ := g.Evaluate(context.Background(), humanGrant(t), req, c)
	for i := 0; i < 20; i++ {
		again, _ := g.Evaluate(context.Background(), humanGrant(t), req, c)
		if again.Allowed != first.Allowed || len(again.Checks) != len(first.Checks) {
			t.Fatalf("run %d diverged", i)
		}
		for j := range first.Checks {
			if again.Checks[j].Name != first.Checks[j].Name ||
				again.Checks[j].Passed != first.Checks[j].Passed {
				t.Fatalf("run %d differs at check %d", i, j)
			}
		}
	}
}

// ---------------------------------------------------------------------------

func findCheck(d gate.Decision, name gate.CheckName) *gate.Check {
	for i := range d.Checks {
		if d.Checks[i].Name == name {
			return &d.Checks[i]
		}
	}
	return nil
}

func hasBlocking(d gate.Decision, name gate.CheckName) bool {
	for _, c := range d.Blocked() {
		if c.Name == name {
			return true
		}
	}
	return false
}

func detailOf(d gate.Decision, name gate.CheckName) string {
	if c := findCheck(d, name); c != nil {
		return c.Detail
	}
	return ""
}

func contains(haystack, needle string) bool {
	return len(haystack) >= len(needle) && (func() bool {
		for i := 0; i+len(needle) <= len(haystack); i++ {
			if haystack[i:i+len(needle)] == needle {
				return true
			}
		}
		return false
	})()
}

// A drafted "correction" for a surface that has no document to patch must be
// blocked, not published.
//
// Since agents can register as dependents, a blast radius can contain the
// Support Bot alongside the seven pages. Approving a paragraph rewrite for it
// would write nothing at all, record a completed publication, and mark the work
// done — an audit trail asserting a fix that never happened, which is a worse
// failure than the stale answer it was trying to correct.
func TestEvaluate_BlocksACorrectionAimedAtAnUnpatchableSurface(t *testing.T) {
	g := gate.New(readerWithSeed())

	answer := seeddata.AgentDependencies()[0] // the bot's returns answer
	req := goodRequest()
	req.Assertion = answer
	req.TouchedFieldPath = answer.FieldPath
	req.ProposedText = "You have 45 days from delivery to start a return."

	decision, err := g.Evaluate(context.Background(), humanGrant(t), req, settledCorpus())
	if err != nil {
		t.Fatal(err)
	}

	if decision.Allowed {
		t.Fatal("the gate allowed a correction to a surface with nothing to patch")
	}

	var found bool
	for _, c := range decision.Blocked() {
		if c.Name == gate.CheckCorrectableSurface {
			found = true
			if c.Detail == "" {
				t.Error("a blocked operator needs to be told why; this one is the " +
					"gate's answer to a person who has done nothing wrong")
			}
		}
	}
	if !found {
		t.Errorf("blocked by %v, but not by correctable_surface", decision.Blocked())
	}
}

// The same check must not get in the way of ordinary page corrections.
func TestEvaluate_PageCorrectionsPassTheSurfaceCheck(t *testing.T) {
	g := gate.New(readerWithSeed())

	decision, err := g.Evaluate(context.Background(), humanGrant(t), goodRequest(), settledCorpus())
	if err != nil {
		t.Fatal(err)
	}
	for _, c := range decision.Checks {
		if c.Name == gate.CheckCorrectableSurface && !c.Passed {
			t.Fatalf("page correction failed the surface check: %s", c.Detail)
		}
	}
}
