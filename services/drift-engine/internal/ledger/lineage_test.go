package ledger_test

import (
	"context"
	"testing"
	"time"

	"github.com/drift/drift-engine/internal/differ"
	"github.com/drift/drift-engine/internal/ledger"
	"github.com/drift/drift-engine/internal/seeddata"
	"github.com/drift/drift-engine/pkg/driftv1"
)

// ---------------------------------------------------------------------------
// The stamps
// ---------------------------------------------------------------------------

func claimIn(t *testing.T, b driftv1.BuildSnapshot, id string) driftv1.Claim {
	t.Helper()
	for _, c := range b.Claims {
		if c.ID == id {
			return c
		}
	}
	t.Fatalf("build %s carries no claim %s", b.ID, id)
	return driftv1.Claim{}
}

// A baseline capture has nothing to carry forward, and says so: everything is
// first seen here. The alternative — leaving the stamps empty — would make the
// lineage panel render a claim with no origin at all.
func TestBaselineCaptureStampsEverythingAsNew(t *testing.T) {
	build, err := ledger.Capture(context.Background(), newKB(), "kb.test", 1, when())
	if err != nil {
		t.Fatalf("capture: %v", err)
	}

	for _, c := range build.Claims {
		if c.FirstSeenBuild != "build.1" {
			t.Errorf("%s firstSeen = %q, want build.1", c.ID, c.FirstSeenBuild)
		}
		if c.LastVerifiedBuild != "build.1" {
			t.Errorf("%s lastVerified = %q, want build.1", c.ID, c.LastVerifiedBuild)
		}
		if c.LastChangedBuild != "" {
			t.Errorf("%s lastChanged = %q, want empty: a claim that has just appeared "+
				"has not changed, it has arrived", c.ID, c.LastChangedBuild)
		}
	}
}

// The load-bearing case. A build that changes a claim has not verified it, so
// the verification stamp must stay where it was — otherwise "last confirmed"
// and "last altered" collapse into one field and the panel can no longer say
// how long a fact stood before it moved.
func TestAChangedClaimDoesNotAdvanceItsVerification(t *testing.T) {
	before := seeddata.Build46()
	after := seeddata.Build47()

	returns := claimIn(t, after, "claim.returns-window")
	if returns.FirstSeenBuild != "build.46" {
		t.Errorf("firstSeen = %q, want build.46 (carried forward, not re-stamped)",
			returns.FirstSeenBuild)
	}
	if returns.LastChangedBuild != "build.47" {
		t.Errorf("lastChanged = %q, want build.47", returns.LastChangedBuild)
	}
	if returns.LastVerifiedBuild != "build.46" {
		t.Errorf("lastVerified = %q, want build.46 — build 47 replaced this claim, "+
			"it did not confirm it", returns.LastVerifiedBuild)
	}

	// And the claim really did move, so the test is not passing vacuously.
	if claimIn(t, before, "claim.returns-window").SameSubstanceAs(returns) {
		t.Fatal("the returns window is supposed to differ between 46 and 47")
	}
}

// An unchanged claim advances its verification and keeps its change history.
func TestAnUnchangedClaimAdvancesItsVerification(t *testing.T) {
	warranty := claimIn(t, seeddata.Build47(), "claim.warranty")

	if warranty.LastVerifiedBuild != "build.47" {
		t.Errorf("lastVerified = %q, want build.47 — the warranty was re-asserted "+
			"identically, which is exactly what verification means",
			warranty.LastVerifiedBuild)
	}
	if warranty.LastChangedBuild != "" {
		t.Errorf("lastChanged = %q, want empty", warranty.LastChangedBuild)
	}
	if warranty.FirstSeenBuild != "build.46" {
		t.Errorf("firstSeen = %q, want build.46", warranty.FirstSeenBuild)
	}
}

// Rewording prose around an unchanged number is not a change of mind. The
// differ already refuses to report it; lineage has to refuse too, or the
// console shows a claim stamped "changed in build 47" beside a feed insisting
// build 47 changed nothing.
func TestARewordedClaimWithTheSameValueIsStillVerified(t *testing.T) {
	dispatch := claimIn(t, seeddata.Build47(), "claim.dispatch")

	if dispatch.LastChangedBuild != "" {
		t.Errorf("lastChanged = %q, want empty: the dispatch claim was reworded but "+
			"still says 2 days, and the differ reports no drift for it",
			dispatch.LastChangedBuild)
	}
	if dispatch.LastVerifiedBuild != "build.47" {
		t.Errorf("lastVerified = %q, want build.47", dispatch.LastVerifiedBuild)
	}
}

// A claim new in the later build is first seen there, not carried from nowhere.
func TestANewClaimIsFirstSeenInTheBuildThatAddedIt(t *testing.T) {
	priceMatch := claimIn(t, seeddata.Build47(), "claim.price-match")

	if priceMatch.FirstSeenBuild != "build.47" {
		t.Errorf("firstSeen = %q, want build.47", priceMatch.FirstSeenBuild)
	}
	if priceMatch.LastChangedBuild != "" {
		t.Errorf("lastChanged = %q, want empty", priceMatch.LastChangedBuild)
	}
}

// A snapshot captured before lineage existed has no stamps to carry. Claiming
// we first saw the claim in the current build would be a lie; the build we
// demonstrably did see it in is the most we honestly know.
func TestLineageFromAnUnstampedPredecessorDoesNotInventAnOrigin(t *testing.T) {
	prior := driftv1.Claim{
		ID: "claim.x", Statement: "unchanged", Tier: driftv1.TierStandard,
		LastVerifiedBuild: "build.40",
	}
	current := driftv1.Claim{
		ID: "claim.x", Statement: "unchanged", Tier: driftv1.TierStandard,
	}

	got := current.WithLineage(&prior, "build.41")
	if got.FirstSeenBuild != "build.40" {
		t.Errorf("firstSeen = %q, want build.40 — the oldest build we can actually "+
			"point at, not the one we happen to be capturing", got.FirstSeenBuild)
	}
}

// ---------------------------------------------------------------------------
// The contract
// ---------------------------------------------------------------------------

// Lineage and the differ must never disagree about whether a claim moved.
//
// They are two independent implementations of one judgement — one decides
// whether to advance a stamp, the other whether to emit a drift event — and a
// divergence would show up as a claim marked "changed in build 47" next to a
// feed reporting nothing changed. In a knowledge-integrity tool, contradicting
// itself about its own knowledge is not a cosmetic bug.
func TestLineageAgreesWithDiffer(t *testing.T) {
	cases := []struct {
		name  string
		prior driftv1.Claim
		next  driftv1.Claim
	}{
		{
			name:  "identical",
			prior: typed("30", 30, "days", driftv1.TierCore, "src.a"),
			next:  typed("30", 30, "days", driftv1.TierCore, "src.a"),
		},
		{
			name:  "typed value moved",
			prior: typed("30", 30, "days", driftv1.TierCore, "src.a"),
			next:  typed("45", 45, "days", driftv1.TierCore, "src.a"),
		},
		{
			name:  "reworded around an unchanged value",
			prior: typed("returns within 30 days", 30, "days", driftv1.TierCore, "src.a"),
			next:  typed("30 days to return", 30, "days", driftv1.TierCore, "src.a"),
		},
		{
			name:  "untyped prose reworded",
			prior: untyped("write warmly", driftv1.TierPeripheral, "src.b"),
			next:  untyped("write plainly", driftv1.TierPeripheral, "src.b"),
		},
		{
			name:  "untyped prose unchanged",
			prior: untyped("write warmly", driftv1.TierPeripheral, "src.b"),
			next:  untyped("write warmly", driftv1.TierPeripheral, "src.b"),
		},
		{
			name:  "untyped claim lost a citation",
			prior: untyped("write warmly", driftv1.TierPeripheral, "src.a", "src.b"),
			next:  untyped("write warmly", driftv1.TierPeripheral, "src.a"),
		},
		{
			name:  "untyped claim demoted",
			prior: untyped("write warmly", driftv1.TierCore, "src.b"),
			next:  untyped("write warmly", driftv1.TierPeripheral, "src.b"),
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			from := driftv1.BuildSnapshot{ID: "build.1", Claims: []driftv1.Claim{tc.prior}}
			to := driftv1.BuildSnapshot{ID: "build.2", Claims: []driftv1.Claim{tc.next}}

			differSaysChanged := len(differ.Diff(from, to, differ.DefaultOptions())) > 0
			lineageSaysChanged := !tc.next.SameSubstanceAs(tc.prior)

			if differSaysChanged != lineageSaysChanged {
				t.Fatalf("differ says changed=%v but lineage says changed=%v; "+
					"the two must decide identically or the console contradicts itself",
					differSaysChanged, lineageSaysChanged)
			}
		})
	}
}

// The demo dataset's lineage is computed, not typed. If somebody hand-edits a
// stamp in seeddata, this fails.
func TestSeedLineageMatchesLedger(t *testing.T) {
	before := seeddata.Build46()
	after := seeddata.Build47()

	prior := map[string]*driftv1.Claim{}
	for i := range before.Claims {
		prior[before.Claims[i].ID] = &before.Claims[i]
	}

	for _, got := range after.Claims {
		// Strip the stamps and recompute them the way a live capture would.
		bare := got
		bare.FirstSeenBuild, bare.LastVerifiedBuild, bare.LastChangedBuild = "", "", ""
		want := bare.WithLineage(prior[got.ID], after.ID)

		if got.FirstSeenBuild != want.FirstSeenBuild ||
			got.LastVerifiedBuild != want.LastVerifiedBuild ||
			got.LastChangedBuild != want.LastChangedBuild {
			t.Errorf("%s lineage = (%s, %s, %s), want (%s, %s, %s)",
				got.ID,
				got.FirstSeenBuild, got.LastVerifiedBuild, got.LastChangedBuild,
				want.FirstSeenBuild, want.LastVerifiedBuild, want.LastChangedBuild)
		}
	}
}

// ---------------------------------------------------------------------------

func typed(statement string, value float64, unit string, tier driftv1.ClaimTier, citations ...string) driftv1.Claim {
	v := value
	return driftv1.Claim{
		ID: "claim.x", Path: "support/x", Statement: statement,
		Value: &v, Unit: unit, Tier: tier, Citations: citations,
		Status: driftv1.ClaimActive,
	}
}

func untyped(statement string, tier driftv1.ClaimTier, citations ...string) driftv1.Claim {
	return driftv1.Claim{
		ID: "claim.x", Path: "brand/x", Statement: statement,
		Tier: tier, Citations: citations, Status: driftv1.ClaimActive,
	}
}

func when() time.Time { return time.Date(2026, 9, 19, 12, 0, 0, 0, time.UTC) }
