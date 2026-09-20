package dissent_test

import (
	"strings"
	"testing"

	"github.com/drift/drift-engine/internal/dissent"
	"github.com/drift/drift-engine/internal/seeddata"
	"github.com/drift/drift-engine/pkg/driftv1"
)

func corpus() dissent.Corpus {
	sources := map[string]driftv1.Source{}
	for _, s := range seeddata.Sources() {
		sources[s.ID] = s
	}
	return dissent.Corpus{Build: seeddata.Build47(), Sources: sources}
}

// The headline behaviour. Build 47 carries an unresolved conflict on
// support/returns: the policy PDF says 45 days, the help centre still says 30.
// A conventional grounded agent picks one and answers confidently. This must not.
func TestAsk_RefusesToAnswerWhenSourcesDisagree(t *testing.T) {
	a := dissent.New(corpus())

	v := a.Ask("How long do I have to return something?")

	if v.Answered() {
		t.Fatalf("agent answered despite an unresolved conflict: %+v", v.Answer)
	}
	if v.Adjudication == nil {
		t.Fatal("expected an adjudication")
	}
	if v.Adjudication.Path != "support/returns" {
		t.Errorf("adjudicating %q, want support/returns", v.Adjudication.Path)
	}
	if len(v.Adjudication.Sides) != 2 {
		t.Fatalf("got %d sides, want 2", len(v.Adjudication.Sides))
	}
	if v.BuildID != "build.47" {
		t.Errorf("verdict must be pinned to a build, got %q", v.BuildID)
	}
}

// Authority orders the sides and suggests a winner — but only suggests.
func TestAdjudication_RanksByAuthorityAndOnlySuggests(t *testing.T) {
	a := dissent.New(corpus())
	v := a.Ask("How long is the return window?")

	adj := v.Adjudication
	if adj == nil {
		t.Fatal("expected an adjudication")
	}

	if adj.Sides[0].Authority <= adj.Sides[1].Authority {
		t.Error("sides must be ordered with the highest authority first")
	}
	if adj.Sides[0].SourceID != seeddata.SrcReturnsPolicy {
		t.Errorf("favoured source = %q, want the signed policy PDF", adj.Sides[0].SourceID)
	}
	if !adj.Sides[0].Favoured || adj.Sides[1].Favoured {
		t.Error("exactly the highest-authority side should be marked favoured")
	}
	// The wording has to make clear nothing has been decided yet.
	if !strings.Contains(adj.Reason, "nothing on record") {
		t.Errorf("reason should say the decision has not been made: %q", adj.Reason)
	}
}

// The payoff: resolving does not just answer this question, it writes a standing
// decision back into the Knowledge Base so the next build is correct by
// construction. Using the agent improves the corpus.
func TestAdjudication_ProposesAnInstructionAnchoredToBothSources(t *testing.T) {
	a := dissent.New(corpus())
	v := a.Ask("What is the return window?")

	proposed := v.Adjudication.Proposed
	if proposed.Text == "" {
		t.Fatal("no instruction proposed")
	}
	if !strings.Contains(proposed.Text, "Returns & Refunds Policy v4") {
		t.Errorf("instruction should name the authoritative source: %q", proposed.Text)
	}
	if !strings.Contains(proposed.Text, "authoritative") {
		t.Errorf("instruction should state which source wins: %q", proposed.Text)
	}
	if len(proposed.AnchoredTo) != 2 {
		t.Errorf("anchored to %v, want both disagreeing sources — Sanity archives the "+
			"instruction when either changes", proposed.AnchoredTo)
	}
}

// Equal authority means the agent has nothing useful to suggest. Marking a
// favourite anyway would dress a coin-flip up as a recommendation.
func TestAdjudication_NoFavouriteWhenAuthorityTies(t *testing.T) {
	c := corpus()
	build := c.Build
	build.Conflicts = []driftv1.Conflict{{
		Path: "support/returns",
		CompetingValues: []driftv1.CompetingValue{
			{Statement: "45 days.", SourceID: "src-a", Authority: 3},
			{Statement: "30 days.", SourceID: "src-b", Authority: 3},
		},
	}}
	c.Build = build

	v := dissent.New(c).Ask("return window")
	adj := v.Adjudication
	if adj == nil {
		t.Fatal("expected an adjudication")
	}
	for _, s := range adj.Sides {
		if s.Favoured {
			t.Error("no side should be favoured when authority ties")
		}
	}
	if !strings.Contains(adj.Reason, "equal authority") {
		t.Errorf("reason should explain the tie: %q", adj.Reason)
	}
}

// A conflict with a resolving instruction is settled. The agent must stop asking.
func TestAsk_AnswersOnceTheConflictIsResolved(t *testing.T) {
	c := corpus()
	build := c.Build
	resolved := make([]driftv1.Conflict, len(build.Conflicts))
	copy(resolved, build.Conflicts)
	resolved[0].ResolvedBy = "instruction.returns-pdf-wins"
	build.Conflicts = resolved
	c.Build = build

	v := dissent.New(c).Ask("How long do I have to return something?")

	if !v.Answered() {
		t.Fatal("once a standing instruction settles the conflict, the agent should answer")
	}
	if len(v.Answer.Claims) == 0 {
		t.Fatal("expected at least one claim")
	}
	if v.Answer.Claims[0].Path != "support/returns" {
		t.Errorf("routed to %q, want support/returns", v.Answer.Claims[0].Path)
	}
}

// Where sources agree, the agent behaves like a normal grounded agent — with
// citations and a build id, so the answer stays checkable.
func TestAsk_AnswersWithCitationsWhenSourcesAgree(t *testing.T) {
	a := dissent.New(corpus())

	v := a.Ask("What is the warranty period?")

	if !v.Answered() {
		t.Fatalf("no conflict covers warranty; expected an answer, got %+v", v.Adjudication)
	}
	if len(v.Answer.Claims) == 0 || v.Answer.Claims[0].Path != "support/warranty" {
		t.Fatalf("routed to %+v, want support/warranty", v.Answer.Paths)
	}
	if len(v.Answer.Citations) == 0 {
		t.Error("an answer without citations is not checkable")
	}
	if v.BuildID == "" {
		t.Error("an answer without a build id cannot be verified later")
	}
}

// Admitting ignorance is a real answer. Stretching an unrelated claim to fit is
// how a grounded agent produces its most confident nonsense.
func TestAsk_SaysNothingWhenNoEntryCovers(t *testing.T) {
	a := dissent.New(corpus())

	v := a.Ask("Do you sell bicycles?")

	if !v.Answered() {
		t.Fatalf("expected an empty answer, got adjudication %+v", v.Adjudication)
	}
	if len(v.Answer.Claims) != 0 {
		t.Errorf("stretched unrelated claims to fit: %+v", v.Answer.Paths)
	}
}

// Core claims are adjudicated before standard ones when a question touches both.
func TestAsk_PresentsTheMostConsequentialConflictFirst(t *testing.T) {
	c := corpus()
	build := c.Build
	build.Conflicts = []driftv1.Conflict{
		{
			Path: "shipping/free-threshold", // standard tier
			CompetingValues: []driftv1.CompetingValue{
				{Statement: "75 USD", SourceID: "a", Authority: 4},
				{Statement: "50 USD", SourceID: "b", Authority: 2},
			},
		},
		{
			Path: "support/returns", // core tier
			CompetingValues: []driftv1.CompetingValue{
				{Statement: "45 days", SourceID: "c", Authority: 5},
				{Statement: "30 days", SourceID: "d", Authority: 2},
			},
		},
	}
	c.Build = build

	v := dissent.New(c).Ask("returns and free shipping")

	if v.Adjudication == nil {
		t.Fatal("expected an adjudication")
	}
	if v.Adjudication.Path != "support/returns" {
		t.Errorf("adjudicating %q first; a core claim outranks a standard one",
			v.Adjudication.Path)
	}
}

// The same question must always produce the same verdict. An agent that
// sometimes flags a contradiction and sometimes does not is worthless for the
// job this one has.
func TestAsk_IsDeterministic(t *testing.T) {
	a := dissent.New(corpus())
	questions := []string{
		"How long do I have to return something?",
		"What is the warranty period?",
		"Do you sell bicycles?",
	}

	for _, q := range questions {
		first := a.Ask(q)
		for i := 0; i < 25; i++ {
			again := a.Ask(q)
			if again.Answered() != first.Answered() {
				t.Fatalf("%q: run %d disagreed with the first about whether to answer", q, i)
			}
			if first.Adjudication != nil && again.Adjudication.Path != first.Adjudication.Path {
				t.Fatalf("%q: run %d adjudicated a different path", q, i)
			}
			if first.Answer != nil && len(again.Answer.Paths) != len(first.Answer.Paths) {
				t.Fatalf("%q: run %d routed differently", q, i)
			}
		}
	}
}

// Routing prefers the curated path over prose, and breaks near-ties toward core.
func TestRouting_PrefersPathMatchesAndCoreClaims(t *testing.T) {
	a := dissent.New(corpus())

	v := a.Ask("shipping threshold")
	if !v.Answered() {
		t.Fatalf("unexpected adjudication: %+v", v.Adjudication)
	}
	if len(v.Answer.Paths) == 0 || v.Answer.Paths[0] != "shipping/free-threshold" {
		t.Errorf("routed to %v, want shipping/free-threshold first", v.Answer.Paths)
	}
}

// A weak match beside a strong one reads as the agent not knowing which claim
// the question was about. "warranty period" must not also drag in the EU
// cooling-off claim just because it contains the word "period".
func TestRouting_DropsWeakMatchesBesideAStrongOne(t *testing.T) {
	a := dissent.New(corpus())

	v := a.Ask("What is the warranty period?")
	if !v.Answered() {
		t.Fatalf("unexpected adjudication: %+v", v.Adjudication)
	}

	if len(v.Answer.Paths) != 1 {
		t.Errorf("routed to %v; only support/warranty is really about the warranty period",
			v.Answer.Paths)
	}
	if v.Answer.Paths[0] != "support/warranty" {
		t.Errorf("top match = %q, want support/warranty", v.Answer.Paths[0])
	}
}

// The cutoff is relative, so it must not change behaviour with question length.
// A longer phrasing of the same question should route to the same place.
func TestRouting_CutoffIsStableAcrossQuestionLength(t *testing.T) {
	a := dissent.New(corpus())

	short := a.Ask("warranty")
	long := a.Ask("Could you please tell me what the warranty covers on my order?")

	if !short.Answered() || !long.Answered() {
		t.Fatal("both phrasings should answer")
	}
	if len(short.Answer.Paths) == 0 || len(long.Answer.Paths) == 0 {
		t.Fatal("both phrasings should route somewhere")
	}
	if short.Answer.Paths[0] != long.Answer.Paths[0] {
		t.Errorf("phrasing changed the route: %q vs %q",
			short.Answer.Paths[0], long.Answer.Paths[0])
	}
}
