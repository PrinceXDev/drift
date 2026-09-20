package differ_test

import (
	"reflect"
	"testing"
	"time"

	"github.com/drift/drift-engine/internal/differ"
	"github.com/drift/drift-engine/pkg/driftv1"
)

func f(v float64) *float64 { return &v }

func build(id string, n int, claims ...driftv1.Claim) driftv1.BuildSnapshot {
	return driftv1.BuildSnapshot{
		ID:          id,
		KBID:        "kb-policies",
		BuildNumber: n,
		BuiltAt:     time.Date(2026, 9, 19, 12, 0, 0, 0, time.UTC),
		Claims:      claims,
	}
}

func returnsClaim(days float64, tier driftv1.ClaimTier, citations ...string) driftv1.Claim {
	if citations == nil {
		citations = []string{"src-returns-policy"}
	}
	return driftv1.Claim{
		ID:        "claim-returns",
		Path:      "support/returns",
		Statement: "Returns are accepted within the stated window.",
		Value:     f(days),
		Unit:      "days",
		Tier:      tier,
		Citations: citations,
		Status:    driftv1.ClaimActive,
	}
}

// The headline case: the demo. One number changes in one source and the engine
// must report it as a contradiction with full confidence — no model involved.
func TestDiff_TypedValueChange_IsDeterministicContradiction(t *testing.T) {
	from := build("build-46", 46, returnsClaim(30, driftv1.TierCore))
	to := build("build-47", 47, returnsClaim(45, driftv1.TierCore))

	events := differ.Diff(from, to, differ.DefaultOptions())

	if len(events) != 1 {
		t.Fatalf("expected exactly 1 event, got %d: %+v", len(events), events)
	}
	ev := events[0]
	if ev.Kind != driftv1.DriftContradicted {
		t.Errorf("kind = %q, want %q", ev.Kind, driftv1.DriftContradicted)
	}
	if ev.Confidence != 1.0 {
		t.Errorf("confidence = %v, want 1.0 — typed comparison must be certain", ev.Confidence)
	}
	if ev.DetectedBy != driftv1.DetectorTypedValue {
		t.Errorf("detectedBy = %q, want %q", ev.DetectedBy, driftv1.DetectorTypedValue)
	}
}

// Rewording must NOT produce drift when the typed value is unchanged. This is
// what keeps the Drift Feed signal rather than noise, and it is the property
// most likely to regress, so it gets its own test.
func TestDiff_RewordingWithSameValue_IsNotDrift(t *testing.T) {
	old := returnsClaim(30, driftv1.TierCore)
	reworded := returnsClaim(30, driftv1.TierCore)
	reworded.Statement = "Customers may return items within the stated window."

	events := differ.Diff(build("a", 1, old), build("b", 2, reworded), differ.DefaultOptions())

	if len(events) != 0 {
		t.Fatalf("rewording with an unchanged value must not drift, got %+v", events)
	}
}

// Untyped prose can only ever be a low-confidence hint, and must be routed to a
// human. If this ever returns 1.0 the trust story collapses.
func TestDiff_UntypedProseChange_IsLowConfidence(t *testing.T) {
	old := driftv1.Claim{ID: "c", Path: "brand/tone", Statement: "Write warmly.", Tier: driftv1.TierStandard}
	cur := driftv1.Claim{ID: "c", Path: "brand/tone", Statement: "Write plainly.", Tier: driftv1.TierStandard}

	events := differ.Diff(build("a", 1, old), build("b", 2, cur), differ.DefaultOptions())

	if len(events) != 1 {
		t.Fatalf("expected 1 event, got %d", len(events))
	}
	if events[0].Confidence >= 1.0 {
		t.Errorf("prose comparison must not claim certainty, got %v", events[0].Confidence)
	}
	if events[0].DetectedBy != driftv1.DetectorSemantic {
		t.Errorf("detectedBy = %q, want semantic", events[0].DetectedBy)
	}
	if !events[0].NeedsHumanReview(0.8) {
		t.Error("a low-confidence event must escalate to a human")
	}
}

// Losing a citation means the claim now rests on thinner evidence, even though
// the organisation still asserts it. That is worth surfacing.
func TestDiff_LostCitation_IsWeakened(t *testing.T) {
	old := returnsClaim(30, driftv1.TierStandard, "src-a", "src-b")
	cur := returnsClaim(30, driftv1.TierStandard, "src-a")
	cur.Value, cur.Unit = nil, "" // untyped so the structural check is reached

	oldUntyped := old
	oldUntyped.Value, oldUntyped.Unit = nil, ""

	events := differ.Diff(build("a", 1, oldUntyped), build("b", 2, cur), differ.DefaultOptions())

	if len(events) != 1 || events[0].Kind != driftv1.DriftWeakened {
		t.Fatalf("expected one weakened event, got %+v", events)
	}
}

func TestDiff_AddedAndRetired(t *testing.T) {
	gone := driftv1.Claim{ID: "1", Path: "old/thing", Statement: "We used to believe this.", Tier: driftv1.TierStandard}
	fresh := driftv1.Claim{ID: "2", Path: "new/thing", Statement: "Now we believe this.", Tier: driftv1.TierStandard}

	events := differ.Diff(build("a", 1, gone), build("b", 2, fresh), differ.DefaultOptions())

	if len(events) != 2 {
		t.Fatalf("expected 2 events, got %d: %+v", len(events), events)
	}
	kinds := map[driftv1.DriftKind]bool{}
	for _, e := range events {
		kinds[e.Kind] = true
	}
	if !kinds[driftv1.DriftAdded] || !kinds[driftv1.DriftRetired] {
		t.Errorf("expected both added and retired, got %v", kinds)
	}
}

// Core claims escalate even at full confidence: being certain that a critical
// fact changed is exactly when a person should look.
func TestNeedsHumanReview_CoreAlwaysEscalates(t *testing.T) {
	ev := driftv1.DriftEvent{Confidence: 1.0, Tier: driftv1.TierCore}
	if !ev.NeedsHumanReview(0.8) {
		t.Error("a core claim must always reach a human, even at confidence 1.0")
	}
	peripheral := driftv1.DriftEvent{Confidence: 1.0, Tier: driftv1.TierPeripheral}
	if peripheral.NeedsHumanReview(0.8) {
		t.Error("a certain peripheral change should not page anyone")
	}
}

// Determinism is a product guarantee, not an implementation detail: the console
// shows "re-run this diff and get the same answer" as evidence you can trust it.
func TestDiff_IsDeterministic(t *testing.T) {
	from := build("a", 1,
		returnsClaim(30, driftv1.TierCore),
		driftv1.Claim{ID: "x", Path: "zeta/last", Statement: "z", Tier: driftv1.TierStandard},
		driftv1.Claim{ID: "y", Path: "alpha/first", Statement: "a", Tier: driftv1.TierStandard},
	)
	to := build("b", 2, returnsClaim(45, driftv1.TierCore))

	first := differ.Diff(from, to, differ.DefaultOptions())
	for i := 0; i < 50; i++ {
		again := differ.Diff(from, to, differ.DefaultOptions())
		if len(again) != len(first) {
			t.Fatalf("run %d returned %d events, first run returned %d", i, len(again), len(first))
		}
		for j := range first {
			if !reflect.DeepEqual(again[j], first[j]) {
				t.Fatalf("run %d differs at index %d:\n got %+v\nwant %+v", i, j, again[j], first[j])
			}
		}
	}
}
