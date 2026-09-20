package graph_test

import (
	"context"
	"errors"
	"sync/atomic"
	"testing"

	"github.com/drift/drift-engine/internal/graph"
	"github.com/drift/drift-engine/pkg/driftv1"
)

type fakeReader struct {
	byClaim map[string][]driftv1.Assertion
	calls   atomic.Int64
	err     error
}

func (f *fakeReader) AssertionsReferencing(_ context.Context, claimID string) ([]driftv1.Assertion, error) {
	f.calls.Add(1)
	if f.err != nil {
		return nil, f.err
	}
	return f.byClaim[claimID], nil
}

// The demo, in a test: one claim changes, seven published pages are affected.
func TestResolve_FindsEveryDependentAssertion(t *testing.T) {
	seven := make([]driftv1.Assertion, 0, 7)
	for _, id := range []string{"a7", "a3", "a1", "a6", "a2", "a5", "a4"} {
		seven = append(seven, driftv1.Assertion{ID: id, ClaimID: "claim-returns"})
	}
	r := &fakeReader{byClaim: map[string][]driftv1.Assertion{"claim-returns": seven}}

	events := []driftv1.DriftEvent{{ClaimID: "claim-returns", ClaimPath: "support/returns"}}
	out, err := graph.NewWalker(r).Resolve(context.Background(), events)
	if err != nil {
		t.Fatalf("resolve: %v", err)
	}

	if got := len(out[0].BlastRadius); got != 7 {
		t.Fatalf("blast radius = %d, want 7", got)
	}
	// Stable order matters: the console renders this list and golden files compare it.
	want := []string{"a1", "a2", "a3", "a4", "a5", "a6", "a7"}
	for i, id := range want {
		if out[0].BlastRadius[i] != id {
			t.Errorf("index %d = %q, want %q (order must be stable)", i, out[0].BlastRadius[i], id)
		}
	}
}

// Several events for one claim must not produce several queries.
func TestResolve_DeduplicatesClaimQueries(t *testing.T) {
	r := &fakeReader{byClaim: map[string][]driftv1.Assertion{
		"c1": {{ID: "a1"}},
	}}
	events := []driftv1.DriftEvent{
		{ClaimID: "c1", Kind: driftv1.DriftContradicted},
		{ClaimID: "c1", Kind: driftv1.DriftWeakened},
		{ClaimID: "c1", Kind: driftv1.DriftCitationBroken},
	}

	if _, err := graph.NewWalker(r).Resolve(context.Background(), events); err != nil {
		t.Fatalf("resolve: %v", err)
	}
	if got := r.calls.Load(); got != 1 {
		t.Errorf("made %d queries for one claim, want 1", got)
	}
}

// A partial blast radius is more dangerous than none: a human would approve a
// fix believing every affected page was covered.
func TestResolve_RefusesPartialResults(t *testing.T) {
	r := &fakeReader{err: errors.New("content lake unavailable")}
	events := []driftv1.DriftEvent{{ClaimID: "c1"}, {ClaimID: "c2"}}

	out, err := graph.NewWalker(r).Resolve(context.Background(), events)
	if err == nil {
		t.Fatal("expected an error, got nil — partial results must never be returned")
	}
	if out != nil {
		t.Error("expected nil events alongside the error")
	}
}

func TestNextState_RoutingPolicy(t *testing.T) {
	cases := []struct {
		name  string
		event driftv1.DriftEvent
		want  driftv1.WorkflowState
	}{
		{
			name:  "nothing depends on it, so nobody is paged",
			event: driftv1.DriftEvent{Confidence: 0.2, Tier: driftv1.TierCore},
			want:  driftv1.StateDismissed,
		},
		{
			name: "core claim always reaches a human",
			event: driftv1.DriftEvent{
				Confidence: 1.0, Tier: driftv1.TierCore, BlastRadius: []string{"a1"},
			},
			want: driftv1.StateTriage,
		},
		{
			name: "uncertain change reaches a human",
			event: driftv1.DriftEvent{
				Confidence: 0.55, Tier: driftv1.TierStandard, BlastRadius: []string{"a1"},
			},
			want: driftv1.StateTriage,
		},
		{
			name: "certain peripheral change goes straight to drafting",
			event: driftv1.DriftEvent{
				Confidence: 1.0, Tier: driftv1.TierPeripheral, BlastRadius: []string{"a1"},
			},
			want: driftv1.StateDrafting,
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			if got := graph.NextState(tc.event, 0.8); got != tc.want {
				t.Errorf("NextState = %q, want %q", got, tc.want)
			}
		})
	}
}
