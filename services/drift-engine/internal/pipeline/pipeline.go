// Package pipeline wires the deterministic stages together: diff two builds,
// resolve blast radius, apply the routing policy.
//
// It exists so that "what the engine does" is one readable function rather than
// something a reader has to reconstruct from three packages. The whole product
// is forty lines long once the pieces are in place, which is itself the point:
// the intelligence is in the content model, not in the code.
package pipeline

import (
	"context"

	"github.com/drift/drift-engine/internal/differ"
	"github.com/drift/drift-engine/internal/graph"
	"github.com/drift/drift-engine/pkg/driftv1"
)

// Config tunes the run.
type Config struct {
	// ReviewThreshold is the confidence below which a change must reach a human.
	// Note that core claims escalate regardless — see DriftEvent.NeedsHumanReview.
	ReviewThreshold float64
	Differ          differ.Options
}

// DefaultConfig is the policy described in docs/decisions/0004.
func DefaultConfig() Config {
	return Config{ReviewThreshold: 0.8, Differ: differ.DefaultOptions()}
}

// Result is everything one build-over-build comparison produced.
type Result struct {
	From   driftv1.BuildSnapshot `json:"from"`
	To     driftv1.BuildSnapshot `json:"to"`
	Events []driftv1.DriftEvent  `json:"events"`
}

// Summary is the headline the console shows above the Drift Feed.
type Summary struct {
	TotalEvents   int `json:"totalEvents"`
	NeedingReview int `json:"needingReview"`
	// AffectedDependents counts every published place still expressing a
	// changed claim — pages, and any other registered surface.
	//
	// It was `affectedPages` until agents could register as dependents, at
	// which point the name was simply wrong: the number included a bot and the
	// label said pages. A headline count that quietly means something other
	// than what it says is the failure mode this product is about.
	AffectedDependents int `json:"affectedDependents"`
	UnresolvedConfl    int `json:"unresolvedConflicts"`
}

// Summarise counts what a human actually needs to know at a glance.
func (r Result) Summarise() Summary {
	dependents := map[string]bool{}
	review := 0
	for _, e := range r.Events {
		if e.State == driftv1.StateTriage {
			review++
		}
		for _, a := range e.BlastRadius {
			dependents[a] = true
		}
	}
	unresolved := 0
	for _, c := range r.To.Conflicts {
		if c.ResolvedBy == "" {
			unresolved++
		}
	}
	return Summary{
		TotalEvents:        len(r.Events),
		NeedingReview:      review,
		AffectedDependents: len(dependents),
		UnresolvedConfl:    unresolved,
	}
}

// Run executes the full deterministic pipeline for one pair of builds.
//
// No LLM is invoked anywhere in this call graph. That is deliberate and tested:
// the same two builds always produce the same events, so the console can offer
// "re-run this diff" as evidence rather than as a slogan.
func Run(
	ctx context.Context,
	from, to driftv1.BuildSnapshot,
	reader graph.AssertionReader,
	cfg Config,
) (Result, error) {
	if cfg.ReviewThreshold == 0 {
		cfg = DefaultConfig()
	}

	events := differ.Diff(from, to, cfg.Differ)

	events, err := graph.NewWalker(reader).Resolve(ctx, events)
	if err != nil {
		return Result{}, err
	}

	for i := range events {
		events[i].State = graph.NextState(events[i], cfg.ReviewThreshold)
	}

	return Result{From: from, To: to, Events: events}, nil
}
