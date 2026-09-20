package pipeline_test

import (
	"context"
	"encoding/json"
	"flag"
	"os"
	"path/filepath"
	"testing"

	"github.com/drift/drift-engine/internal/pipeline"
	"github.com/drift/drift-engine/internal/seeddata"
	"github.com/drift/drift-engine/pkg/driftv1"
)

var update = flag.Bool("update", false, "rewrite golden files")

// fixtureReader serves the seed assertions without touching the network.
type fixtureReader struct {
	byClaim map[string][]driftv1.Assertion
}

func (r fixtureReader) AssertionsReferencing(_ context.Context, claimID string) ([]driftv1.Assertion, error) {
	return r.byClaim[claimID], nil
}

func run(t *testing.T) pipeline.Result {
	t.Helper()
	res, err := pipeline.Run(
		context.Background(),
		seeddata.Build46(), seeddata.Build47(),
		fixtureReader{byClaim: seeddata.AssertionsByClaim()},
		pipeline.DefaultConfig(),
	)
	if err != nil {
		t.Fatalf("pipeline: %v", err)
	}
	return res
}

// The golden file is the demo, frozen. If a change to the engine alters what
// the Drift Feed shows for builds 46 -> 47, this test fails and the diff in the
// golden file says exactly how the product's behaviour changed.
func TestPipeline_Golden(t *testing.T) {
	res := run(t)

	got, err := json.MarshalIndent(res.Events, "", "  ")
	if err != nil {
		t.Fatal(err)
	}
	got = append(got, '\n')

	path := filepath.Join("..", "..", "testdata", "golden", "diff-46-47.json")

	if *update {
		if err := os.MkdirAll(filepath.Dir(path), 0o755); err != nil {
			t.Fatal(err)
		}
		if err := os.WriteFile(path, got, 0o644); err != nil {
			t.Fatal(err)
		}
		t.Logf("wrote golden file %s", path)
		return
	}

	want, err := os.ReadFile(path)
	if err != nil {
		t.Fatalf("read golden (run `go test ./... -update` to create): %v", err)
	}
	if string(got) != string(want) {
		t.Errorf("engine output changed.\n--- got ---\n%s\n--- want ---\n%s", got, want)
	}
}

// The headline numbers the demo narration depends on. If any of these move, the
// script is wrong, so they are asserted explicitly rather than left to the
// golden file where a reader would have to count.
func TestPipeline_TheDemoNumbers(t *testing.T) {
	res := run(t)
	s := res.Summarise()

	byPath := map[string]driftv1.DriftEvent{}
	for _, e := range res.Events {
		byPath[e.ClaimPath] = e
	}

	t.Run("the return window is a certain contradiction", func(t *testing.T) {
		ev, ok := byPath["support/returns"]
		if !ok {
			t.Fatal("no drift event for support/returns — the whole demo rests on this")
		}
		if ev.Kind != driftv1.DriftContradicted {
			t.Errorf("kind = %q, want contradicted", ev.Kind)
		}
		if ev.Confidence != 1.0 || ev.DetectedBy != driftv1.DetectorTypedValue {
			t.Errorf("confidence/detector = %v/%q, want 1.0/typed_value — "+
				"a typed comparison must not be downgraded to a guess",
				ev.Confidence, ev.DetectedBy)
		}
		// Seven pages and the Support Bot. The bot is in the radius because it
		// answered a returns question from this claim and has been repeating
		// "30 days" ever since — as wrong as the pages, and until surfaces
		// existed, invisible. Both halves are asserted, because a regression
		// that dropped either would still leave the total looking plausible.
		pages, surfaces := splitDependents(t, ev.BlastRadius)
		if pages != 7 {
			t.Errorf("blast radius = %d pages, want 7 (the number in the demo script)", pages)
		}
		if surfaces != 1 {
			t.Errorf("blast radius = %d non-page surfaces, want 1 (the Support Bot)", surfaces)
		}
		if ev.State != driftv1.StateTriage {
			t.Errorf("state = %q, want triage — a core claim always reaches a human", ev.State)
		}
	})

	t.Run("the abolished restocking fee is retired, not contradicted", func(t *testing.T) {
		ev, ok := byPath["support/restocking-fee"]
		if !ok {
			t.Fatal("expected a retired event for the abolished restocking fee")
		}
		if ev.Kind != driftv1.DriftRetired {
			t.Errorf("kind = %q, want retired", ev.Kind)
		}
		if len(ev.BlastRadius) != 1 {
			t.Errorf("blast radius = %d, want 1 — one page still advertises the fee", len(ev.BlastRadius))
		}
		if pages, _ := splitDependents(t, ev.BlastRadius); pages != 1 {
			t.Errorf("the restocking fee is published on %d pages, want 1", pages)
		}
	})

	t.Run("a reworded claim with an unchanged value is not drift", func(t *testing.T) {
		if ev, found := byPath["shipping/dispatch-time"]; found {
			t.Errorf("dispatch time was reworded but still says 2 days; reporting it as %q "+
				"would make the feed noise instead of signal", ev.Kind)
		}
	})

	t.Run("untyped prose is flagged but never claims certainty", func(t *testing.T) {
		ev, ok := byPath["brand/tone"]
		if !ok {
			t.Fatal("expected the brand tone rewrite to be flagged")
		}
		if ev.Confidence >= 1.0 {
			t.Errorf("confidence = %v; prose comparison must stay below 1.0", ev.Confidence)
		}
		if ev.DetectedBy != driftv1.DetectorSemantic {
			t.Errorf("detectedBy = %q, want semantic", ev.DetectedBy)
		}
		if len(ev.BlastRadius) != 0 || ev.State != driftv1.StateDismissed {
			t.Errorf("nothing published asserts brand tone, so it should be dismissed "+
				"rather than spend a human's attention; got state %q with %d affected",
				ev.State, len(ev.BlastRadius))
		}
	})

	t.Run("the new price-match claim is an addition", func(t *testing.T) {
		ev, ok := byPath["support/price-match"]
		if !ok {
			t.Fatal("expected an added event for the new price-match policy")
		}
		if ev.Kind != driftv1.DriftAdded {
			t.Errorf("kind = %q, want added", ev.Kind)
		}
	})

	t.Run("summary matches the narration", func(t *testing.T) {
		// 7 return-window pages + 1 restocking-fee page + the Support Bot.
		if s.AffectedDependents != 9 {
			t.Errorf("affected dependents = %d, want 9 "+
				"(7 return-window pages + 1 restocking fee + the Support Bot)", s.AffectedDependents)
		}
		if s.UnresolvedConfl != 1 {
			t.Errorf("unresolved conflicts = %d, want 1 (the policy PDF vs the help centre)", s.UnresolvedConfl)
		}
		if s.NeedingReview < 1 {
			t.Error("at least the core return-window change must need review")
		}
	})
}

// Determinism, asserted at the level a user would check it: run the whole
// pipeline repeatedly and require identical serialised output every time.
func TestPipeline_IsReproducible(t *testing.T) {
	first, err := json.Marshal(run(t).Events)
	if err != nil {
		t.Fatal(err)
	}
	for i := 0; i < 20; i++ {
		again, err := json.Marshal(run(t).Events)
		if err != nil {
			t.Fatal(err)
		}
		if string(again) != string(first) {
			t.Fatalf("run %d produced different output; determinism is a product guarantee", i)
		}
	}
}

// splitDependents counts how much of a blast radius is editable page content
// and how much is some other kind of published surface.
//
// The distinction is not cosmetic: a page is corrected by approving a patch,
// and everything else is corrected by rebuilding the Knowledge Base. A test
// asserting only the total would pass while the queue quietly filled with work
// nobody can publish.
func splitDependents(t *testing.T, ids []string) (pages, surfaces int) {
	t.Helper()
	index := map[string]driftv1.Assertion{}
	for _, a := range seeddata.Dependencies() {
		index[a.ID] = a
	}
	for _, id := range ids {
		a, ok := index[id]
		if !ok {
			t.Errorf("blast radius names %q, which is not a known dependency", id)
			continue
		}
		if a.OnPage() {
			pages++
		} else {
			surfaces++
		}
	}
	return pages, surfaces
}
