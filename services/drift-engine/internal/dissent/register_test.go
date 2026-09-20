package dissent_test

import (
	"testing"

	"github.com/drift/drift-engine/internal/dissent"
	"github.com/drift/drift-engine/internal/seeddata"
	"github.com/drift/drift-engine/internal/surface"
	"github.com/drift/drift-engine/pkg/driftv1"
)

func bot() driftv1.Surface {
	return driftv1.Surface{
		ID: "surface.support-bot", Kind: driftv1.SurfaceAgent,
		Title: "Support Bot", Owner: "support@northwind.example",
	}
}

func agentOver(t *testing.T, build driftv1.BuildSnapshot) (*dissent.Agent, *surface.Registry) {
	t.Helper()
	sources := map[string]driftv1.Source{}
	for _, s := range seeddata.Sources() {
		sources[s.ID] = s
	}

	registry := surface.NewRegistry()
	a := dissent.New(dissent.Corpus{Build: build, Sources: sources})
	if err := a.RegisterWith(registry, bot(), func(err error) { t.Errorf("record: %v", err) }); err != nil {
		t.Fatalf("register: %v", err)
	}
	return a, registry
}

// The point of the whole surface abstraction: an agent that answers from a
// claim becomes part of that claim's blast radius, without anything
// page-specific being involved.
func TestAnsweringRegistersADependency(t *testing.T) {
	a, registry := agentOver(t, seeddata.Build46())

	verdict := a.Ask("How long do I have to return something?")
	if !verdict.Answered() {
		t.Fatal("build 46 has no unresolved conflict, so this must be answerable")
	}

	dependents := registry.DependentsOf("claim.returns-window")
	if len(dependents) != 1 {
		t.Fatalf("dependents = %d, want 1 — the bot just published this fact", len(dependents))
	}

	dep := dependents[0]
	if dep.Surface.ID != "surface.support-bot" {
		t.Errorf("surface = %q, want the bot", dep.Surface.ID)
	}
	if dep.Assertion.OnPage() {
		t.Error("an agent answer must not be recorded as page content: there is no " +
			"paragraph to patch, and the gate has to be able to tell")
	}
	if dep.Assertion.VerifiedAt != "build.46" {
		t.Errorf("verifiedAt = %q, want build.46 — an answer is only ever as current "+
			"as the build it was drawn from", dep.Assertion.VerifiedAt)
	}
}

// A refusal published no fact, so nothing now depends on one. Recording it
// would inflate the blast radius with a surface that is already correct.
func TestRefusingToAnswerRegistersNothing(t *testing.T) {
	// Build 47 carries the unresolved returns conflict, which is what makes the
	// agent refuse rather than pick a side.
	a, registry := agentOver(t, seeddata.Build47())

	verdict := a.Ask("How long do I have to return something?")
	if verdict.Answered() {
		t.Fatal("build 47 has an unresolved conflict on this claim; the agent must refuse")
	}

	if got := registry.DependentsOf("claim.returns-window"); len(got) != 0 {
		t.Fatalf("dependents = %d, want 0 — the agent refused, so it published nothing", len(got))
	}
}

// Asking the same question repeatedly is one dependent, not a counter.
func TestRepeatedQuestionsAreOneDependency(t *testing.T) {
	a, registry := agentOver(t, seeddata.Build46())

	for i := 0; i < 5; i++ {
		a.Ask("How long do I have to return something?")
	}

	if got := registry.DependentsOf("claim.returns-window"); len(got) != 1 {
		t.Fatalf("dependents = %d, want 1: a blast radius counts places a fact is "+
			"published, not how often somebody asked", len(got))
	}
}

// Different questions that land on the same claim are separate dependents:
// each one is a distinct answer the bot is still giving.
func TestDifferentQuestionsOnOneClaimAreSeparateDependencies(t *testing.T) {
	a, registry := agentOver(t, seeddata.Build46())

	a.Ask("How long do I have to return something?")
	a.Ask("What is the returns window?")

	if got := registry.DependentsOf("claim.returns-window"); len(got) != 2 {
		t.Fatalf("dependents = %d, want 2", len(got))
	}
}

// An agent registering at every startup does not accumulate copies of itself.
func TestRegisteringTwiceIsIdempotent(t *testing.T) {
	registry := surface.NewRegistry()
	a := dissent.New(dissent.Corpus{Build: seeddata.Build46()})

	for i := 0; i < 3; i++ {
		if err := a.RegisterWith(registry, bot(), nil); err != nil {
			t.Fatalf("register %d: %v", i, err)
		}
	}
	if got := len(registry.Surfaces()); got != 1 {
		t.Fatalf("surfaces = %d, want 1", got)
	}
}

// An unregistered agent answers exactly as before. Registration is additive:
// the Dissent agent has to remain useful in a process with no registry at all.
func TestAnUnregisteredAgentStillAnswers(t *testing.T) {
	a := dissent.New(dissent.Corpus{Build: seeddata.Build46()})
	if !a.Ask("How long do I have to return something?").Answered() {
		t.Fatal("an agent with no registry must still answer")
	}
}
