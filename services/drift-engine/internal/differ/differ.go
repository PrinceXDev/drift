// Package differ computes the belief changelog between two Knowledge Base builds.
//
// Design rule: no LLM runs in this package. Everything here is deterministic and
// golden-file tested, so the same two builds always produce byte-identical events.
// The model is confined to two places elsewhere in the system — proposing claims
// from entry prose, and drafting a correction for a human to approve — and it is
// never permitted to decide *that* something drifted, only to describe it.
//
// That separation is the reason DRIFT can show its working. A judge (or an
// auditor) can check "why is this page flagged?" by comparing two numbers,
// without trusting a model at all.
package differ

import (
	"math"
	"sort"

	"github.com/drift/drift-engine/pkg/driftv1"
)

// Options tunes the comparison. Zero value is usable: see DefaultOptions.
type Options struct {
	// SemanticConfidence is the confidence assigned when a change is detected
	// from prose rather than from typed values. Deliberately well below 1.0:
	// prose comparison is a hint, not a proof.
	SemanticConfidence float64
	// WeakenedConfidence applies to citation loss and tier demotion, which are
	// structural facts about the graph and so more trustworthy than prose.
	WeakenedConfidence float64
}

// DefaultOptions reflects the escalation policy described in docs/decisions.
func DefaultOptions() Options {
	return Options{SemanticConfidence: 0.55, WeakenedConfidence: 0.9}
}

// Diff compares two Knowledge Base builds and returns the belief changelog.
//
// Events are returned in a stable order (claim path, then kind) so that golden
// files are meaningful and two runs are byte-comparable.
func Diff(from, to driftv1.BuildSnapshot, opts Options) []driftv1.DriftEvent {
	if opts.SemanticConfidence == 0 {
		opts = DefaultOptions()
	}

	before := indexByPath(from.Claims)
	after := indexByPath(to.Claims)

	events := make([]driftv1.DriftEvent, 0, len(before)+len(after))

	// Claims present in the later build.
	for path, newClaim := range after {
		oldClaim, existed := before[path]
		if !existed {
			events = append(events, newEvent(from, to, newClaim, driftv1.DriftAdded,
				"", newClaim.Statement, 1.0, driftv1.DetectorOutlinePresence))
			continue
		}
		if ev, changed := compare(from, to, oldClaim, newClaim, opts); changed {
			events = append(events, ev)
		}
	}

	// Claims that vanished: the organisation stopped asserting them.
	for path, oldClaim := range before {
		if _, stillThere := after[path]; !stillThere {
			events = append(events, newEvent(from, to, oldClaim, driftv1.DriftRetired,
				oldClaim.Statement, "", 1.0, driftv1.DetectorOutlinePresence))
		}
	}

	// Instructions Sanity auto-archived because their anchoring source changed.
	// A standing decision has come unmoored from its justification.
	for _, id := range archivedSince(from, to) {
		events = append(events, driftv1.DriftEvent{
			FromBuild:  from.ID,
			ToBuild:    to.ID,
			ClaimPath:  "instruction/" + id,
			Kind:       driftv1.DriftInstructionArchived,
			Before:     id,
			Confidence: 1.0,
			DetectedBy: driftv1.DetectorInstructionLifecycle,
			Tier:       driftv1.TierCore,
			State:      driftv1.StateDetected,
		})
	}

	sortEvents(events)
	return events
}

// compare decides whether one claim changed between builds, and how sure we are.
//
// The ordering of the checks is the whole point: the deterministic test runs
// first and short-circuits, so a typed contradiction is never downgraded to a
// semantic guess just because the prose also happened to change.
func compare(from, to driftv1.BuildSnapshot, old, cur driftv1.Claim, opts Options) (driftv1.DriftEvent, bool) {
	// 1. Deterministic: both sides carry a comparable typed value.
	if old.HasTypedValue() && cur.HasTypedValue() && old.Unit == cur.Unit {
		if !nearlyEqual(*old.Value, *cur.Value) {
			return newEvent(from, to, cur, driftv1.DriftContradicted,
				old.Statement, cur.Statement, 1.0, driftv1.DetectorTypedValue), true
		}
		// Values agree. The prose may have been reworded, but the organisation
		// did not change its mind, so this is not drift. Saying nothing here is
		// what keeps the feed signal and not noise.
		return driftv1.DriftEvent{}, false
	}

	// 2. Structural: evidence got thinner without the assertion changing.
	if lostCitations(old, cur) || demotedTier(old, cur) {
		return newEvent(from, to, cur, driftv1.DriftWeakened,
			old.Statement, cur.Statement, opts.WeakenedConfidence,
			driftv1.DetectorCitationGraph), true
	}

	// 3. Fallback: untyped prose changed. Flagged, but explicitly low confidence
	//    and routed to a human rather than acted on.
	if old.Statement != cur.Statement {
		return newEvent(from, to, cur, driftv1.DriftContradicted,
			old.Statement, cur.Statement, opts.SemanticConfidence,
			driftv1.DetectorSemantic), true
	}

	return driftv1.DriftEvent{}, false
}

func newEvent(
	from, to driftv1.BuildSnapshot,
	c driftv1.Claim,
	kind driftv1.DriftKind,
	before, after string,
	confidence float64,
	detector driftv1.Detector,
) driftv1.DriftEvent {
	return driftv1.DriftEvent{
		FromBuild:   from.ID,
		ToBuild:     to.ID,
		ClaimPath:   c.Path,
		ClaimID:     c.ID,
		Kind:        kind,
		Before:      before,
		After:       after,
		Confidence:  confidence,
		DetectedBy:  detector,
		Tier:        c.Tier,
		BlastRadius: nil, // filled in by the graph walk; see internal/graph
		State:       driftv1.StateDetected,
	}
}

func indexByPath(claims []driftv1.Claim) map[string]driftv1.Claim {
	out := make(map[string]driftv1.Claim, len(claims))
	for _, c := range claims {
		out[c.Path] = c
	}
	return out
}

func lostCitations(old, cur driftv1.Claim) bool {
	return len(cur.Citations) < len(old.Citations)
}

func demotedTier(old, cur driftv1.Claim) bool {
	return tierRank(cur.Tier) > tierRank(old.Tier)
}

func tierRank(t driftv1.ClaimTier) int {
	switch t {
	case driftv1.TierCore:
		return 0
	case driftv1.TierStandard:
		return 1
	default:
		return 2
	}
}

// archivedSince returns instructions archived between the two builds.
func archivedSince(from, to driftv1.BuildSnapshot) []string {
	was := make(map[string]bool, len(from.InstructionsArchive))
	for _, id := range from.InstructionsArchive {
		was[id] = true
	}
	var out []string
	for _, id := range to.InstructionsArchive {
		if !was[id] {
			out = append(out, id)
		}
	}
	sort.Strings(out)
	return out
}

// nearlyEqual avoids reporting drift from float representation noise.
func nearlyEqual(a, b float64) bool {
	return math.Abs(a-b) < 1e-9
}

// sortEvents gives the output a total order so golden files are stable.
func sortEvents(events []driftv1.DriftEvent) {
	sort.SliceStable(events, func(i, j int) bool {
		if events[i].ClaimPath != events[j].ClaimPath {
			return events[i].ClaimPath < events[j].ClaimPath
		}
		return events[i].Kind < events[j].Kind
	})
}
