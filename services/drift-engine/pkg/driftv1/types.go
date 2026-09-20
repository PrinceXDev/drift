package driftv1

import (
	"math"
	"time"
)

// Source is an authoritative input a Knowledge Base is built from.
type Source struct {
	ID        string    `json:"id"`
	Title     string    `json:"title"`
	Kind      string    `json:"kind"`
	URI       string    `json:"uri"`
	Owner     string    `json:"owner"`
	Authority int       `json:"authority"` // 1..5; higher wins a conflict outright
	ChangedAt time.Time `json:"changedAt"`
}

// Claim is one atomic, checkable fact mirrored from a Knowledge Base entry.
//
// Value/Unit are optional on purpose. When both builds carry a typed value the
// engine can decide contradiction arithmetically and report confidence 1.0.
// When they do not, it falls back to a semantic comparison and says so.
type Claim struct {
	ID        string      `json:"id"`
	Path      string      `json:"path"` // mirrors the KB outline path, e.g. "support/returns"
	Statement string      `json:"statement"`
	Value     *float64    `json:"value,omitempty"`
	Unit      string      `json:"unit,omitempty"`
	Tier      ClaimTier   `json:"tier"`
	Citations []string    `json:"citations"` // source IDs
	Status    ClaimStatus `json:"status"`

	// ---- lineage -----------------------------------------------------------
	//
	// Three build IDs, each answering a different question a person actually
	// asks about a fact they are about to rely on:
	//
	//	FirstSeenBuild     where did this come from?      (created)
	//	LastVerifiedBuild  when was it last re-confirmed? (verified)
	//	LastChangedBuild   when did it last move?         (changed)
	//
	// They are maintained by the ledger on every capture rather than stored by
	// hand, because a lineage somebody has to remember to update is a lineage
	// that is wrong. See ledger.CaptureAgainst.
	//
	// The distinction between verified and changed is the one that carries the
	// weight. A claim re-asserted identically across nine builds and then
	// changed in the tenth reads as `verified build.54, changed build.55` — the
	// last moment it was boring, and the moment it stopped being.

	// FirstSeenBuild is the build this claim first appeared in.
	FirstSeenBuild string `json:"firstSeenBuild,omitempty"`
	// LastVerifiedBuild is the most recent build in which this claim was
	// re-asserted *unchanged*. It deliberately does not advance on a build that
	// altered the claim: "we checked and it still said this" and "it says
	// something else now" are different facts and must not share a field.
	LastVerifiedBuild string `json:"lastVerifiedBuild,omitempty"`
	// LastChangedBuild is the most recent build in which the claim's substance
	// moved. Empty for a claim that has never changed since it appeared.
	LastChangedBuild string `json:"lastChangedBuild,omitempty"`
}

// SameSubstanceAs reports whether this claim asserts the same thing as an
// earlier version of itself.
//
// # It has to agree with the differ, exactly
//
// This predicate decides whether a capture advances LastVerifiedBuild or
// LastChangedBuild. The differ decides whether the same pair of claims produces
// a drift event. If the two ever disagreed, the console would show a claim
// stamped "changed in build 47" beside a feed insisting build 47 changed
// nothing — a knowledge-integrity tool contradicting itself about its own
// knowledge. `TestLineageAgreesWithDiffer` fails the build if they diverge.
//
// So the rules below are the differ's rules, in the same order:
//
//	both sides carry a comparable typed value  the numbers decide, and nothing
//	                                           else does — reworded prose around
//	                                           an unchanged quantity is not a
//	                                           change of mind
//	otherwise                                  thinner evidence (a lost citation,
//	                                           a demoted tier) or altered prose
//	                                           is a change
//
// Lineage and status are ignored throughout: they are bookkeeping the ledger
// itself writes, and comparing them would make every claim look changed on
// every capture, which would make lineage mean nothing.
func (c Claim) SameSubstanceAs(prior Claim) bool {
	// 1. Deterministic. Two comparable numbers settle it outright.
	if prior.HasTypedValue() && c.HasTypedValue() && prior.Unit == c.Unit {
		return math.Abs(*prior.Value-*c.Value) < 1e-9
	}

	// 2. Structural: the assertion stands on thinner evidence than before.
	if len(c.Citations) < len(prior.Citations) || tierRank(c.Tier) > tierRank(prior.Tier) {
		return false
	}

	// 3. Fallback: untyped prose. All we have to compare is the sentence.
	return prior.Statement == c.Statement
}

// tierRank orders tiers by how load-bearing they are, so a demotion is
// detectable. Mirrors the private helper in internal/differ.
func tierRank(t ClaimTier) int {
	switch t {
	case TierCore:
		return 0
	case TierStandard:
		return 1
	default:
		return 2
	}
}

// HasTypedValue reports whether this claim can participate in a deterministic
// comparison. This single predicate is what separates a provable contradiction
// from an LLM's opinion, so it is deliberately strict: a value without a unit
// does not count, because "30" and "45" are not comparable without knowing
// they are both days.
func (c Claim) HasTypedValue() bool {
	return c.Value != nil && c.Unit != ""
}

// Surface is a published place that can depend on a claim.
//
// A content page is one kind of surface. An agent that answers questions from
// the Knowledge Base is another, and so is a syndicated feed or an email
// template. They differ in how you correct them and not at all in how they go
// wrong: each one repeats a fact to a customer, and each one keeps repeating it
// after the organisation stops believing it.
//
// Modelling the general case is what lets a non-page dependent be *registered*
// rather than special-cased. The Dissent agent registers itself here every time
// it answers, so "which published surfaces depend on this claim?" includes the
// bot — and the blast-radius walk that finds the seven pages finds the bot in
// the same query, because a dependency is an Assertion either way.
type Surface struct {
	ID   string      `json:"id"`
	Kind SurfaceKind `json:"kind"`
	// Title is what an operator would call it: "Support Bot", "Returns & Refunds".
	Title string `json:"title"`
	Owner string `json:"owner"`
	// Locator is where a human goes to see it — a URL, a channel, a queue name.
	Locator string `json:"locator,omitempty"`
}

// WithLineage returns this claim stamped with its provenance, given the version
// of it carried by the previous build (nil when it is new) and the ID of the
// build being captured.
//
// It lives on the type rather than in the ledger so that every producer of a
// snapshot — the live capture path, the seed fixtures, a future importer —
// applies identical rules. A demo dataset whose lineage was stamped by hand
// would eventually disagree with the engine that reads it, which in this
// product would be an unusually poor joke.
//
//	prior == nil     first seen here; verified here; never changed
//	same substance   first seen carried; verified here; last change carried
//	moved            first seen carried; verified NOT advanced; changed here
//
// The third line is the load-bearing one: a build that changes a claim has not
// verified it, it has replaced it. Advancing both stamps together would erase
// the difference between a fact nobody has re-checked in a year and one
// confirmed yesterday.
func (c Claim) WithLineage(prior *Claim, buildID string) Claim {
	if prior == nil {
		c.FirstSeenBuild = buildID
		c.LastVerifiedBuild = buildID
		c.LastChangedBuild = ""
		return c
	}

	c.FirstSeenBuild = prior.FirstSeenBuild
	if c.FirstSeenBuild == "" {
		// The previous snapshot predates lineage — an imported baseline, or one
		// captured by an older engine. Claiming we first saw it in this build
		// would be a lie; the build we demonstrably did see it in is the most we
		// honestly know.
		c.FirstSeenBuild = prior.LastVerifiedBuild
	}

	if c.SameSubstanceAs(*prior) {
		c.LastVerifiedBuild = buildID
		c.LastChangedBuild = prior.LastChangedBuild
		return c
	}

	c.LastVerifiedBuild = prior.LastVerifiedBuild
	c.LastChangedBuild = buildID
	return c
}

// Assertion is a place on a published surface where a Claim is expressed.
type Assertion struct {
	ID      string `json:"id"`
	ClaimID string `json:"claimId"`
	// PageID names the content page carrying this assertion, for the page case.
	//
	// Exactly one of PageID and SurfaceID is set. Page assertions keep the
	// original field because everything downstream — the causal graph, the
	// remediation queue, the Content Lake publisher — addresses a document; a
	// surface assertion has no document to patch and is corrected by whatever
	// owns the surface.
	PageID string `json:"pageId,omitempty"`
	// SurfaceID names a non-page dependent: an agent, a feed, a template.
	SurfaceID string `json:"surfaceId,omitempty"`
	FieldPath string `json:"fieldPath"`
	// BlockKey is the Portable Text `_key` of the addressed block.
	//
	// FieldPath ("body[1]") is for humans and for rendering. BlockKey is what
	// the remediation agent actually targets, because a positional reference
	// into a mutable array silently points at different text the moment someone
	// reorders two paragraphs — and then the agent rewrites the wrong sentence.
	//
	// In a tool about content going quietly out of date, an addressing scheme
	// that goes quietly out of date would be a poor joke.
	BlockKey     string         `json:"blockKey,omitempty"`
	RenderedText string         `json:"renderedText"`
	VerifiedAt   string         `json:"verifiedAgainstBuild"`
	State        AssertionState `json:"state"`
}

// DependentID returns whichever of PageID / SurfaceID this assertion carries.
// Callers that only need "what does this hang off" should use it rather than
// branching, so a new surface kind cannot quietly go unhandled.
func (a Assertion) DependentID() string {
	if a.SurfaceID != "" {
		return a.SurfaceID
	}
	return a.PageID
}

// OnPage reports whether this assertion addresses editable page content — the
// only case a correction can be drafted and published for.
func (a Assertion) OnPage() bool { return a.PageID != "" }

// ClaimLineage is the provenance of one fact, assembled for a reader.
//
// Six branches, which is the shape of the question people actually ask: where
// did this come from, when did it appear, when was it last confirmed, what is
// publishing it, and when did it move.
type ClaimLineage struct {
	Claim Claim `json:"claim"`
	// Sources are the documents cited by the claim, highest authority first.
	Sources []Source `json:"sources"`
	// FirstSeen, LastVerified and LastChanged resolve the claim's build IDs to
	// the builds themselves, so a reader gets a date rather than "build.46".
	FirstSeen    *BuildSnapshot `json:"firstSeen,omitempty"`
	LastVerified *BuildSnapshot `json:"lastVerified,omitempty"`
	LastChanged  *BuildSnapshot `json:"lastChanged,omitempty"`
	// Dependents is every published surface expressing this claim — pages and
	// agents alike, from the same reference walk.
	Dependents []Dependent `json:"dependents"`
	// Drift is the change that moved this claim most recently, when there is one.
	Drift *DriftEvent `json:"drift,omitempty"`
}

// Dependent pairs an assertion with the surface carrying it, so a lineage
// reader does not have to resolve two collections to render one row.
type Dependent struct {
	Assertion Assertion `json:"assertion"`
	Surface   Surface   `json:"surface"`
}

// Conflict is raised by the Knowledge Base build itself when the same fact
// appears with different values across sources.
type Conflict struct {
	Path            string           `json:"path"`
	CompetingValues []CompetingValue `json:"competingValues"`
	ResolvedBy      string           `json:"resolvedBy,omitempty"` // instruction ID
}

// CompetingValue is one side of a Conflict.
type CompetingValue struct {
	Statement string   `json:"statement"`
	Value     *float64 `json:"value,omitempty"`
	Unit      string   `json:"unit,omitempty"`
	SourceID  string   `json:"sourceId"`
	Authority int      `json:"authority"`
}

// BuildSnapshot is one immutable Knowledge Base build.
//
// The entire product rests on this being immutable: because Sanity entries
// belong to a build and cannot be hand-edited, two snapshots are comparable,
// and a knowledge base becomes a time series rather than a corpus.
type BuildSnapshot struct {
	ID                  string     `json:"id"`
	KBID                string     `json:"kbId"`
	BuildNumber         int        `json:"buildNumber"`
	BuiltAt             time.Time  `json:"builtAt"`
	OutlineHash         string     `json:"outlineHash"`
	Claims              []Claim    `json:"claims"`
	Conflicts           []Conflict `json:"conflicts"`
	InstructionsActive  []string   `json:"instructionsActive"`
	InstructionsArchive []string   `json:"instructionsArchived"`
}

// EntryCount is derived rather than stored so it can never disagree with Claims.
func (b BuildSnapshot) EntryCount() int { return len(b.Claims) }

// DriftEvent is the diff between two builds, for one claim. A stream of these
// is the changelog of organisational truth.
type DriftEvent struct {
	FromBuild   string        `json:"fromBuild"`
	ToBuild     string        `json:"toBuild"`
	ClaimPath   string        `json:"claimPath"`
	ClaimID     string        `json:"claimId"`
	Kind        DriftKind     `json:"kind"`
	Before      string        `json:"before,omitempty"`
	After       string        `json:"after,omitempty"`
	Confidence  float64       `json:"confidence"`
	DetectedBy  Detector      `json:"detectedBy"`
	Tier        ClaimTier     `json:"tier"`
	BlastRadius []string      `json:"blastRadius"` // assertion IDs
	State       WorkflowState `json:"workflowState"`
}

// NeedsHumanReview encodes the escalation policy in one place.
//
// Two independent reasons to involve a person: the engine is not certain what
// changed, or it is certain but the claim is load-bearing. Core claims always
// get a human even at confidence 1.0 — being sure a critical fact changed is
// precisely when you want someone to look.
func (e DriftEvent) NeedsHumanReview(threshold float64) bool {
	return e.Confidence < threshold || e.Tier == TierCore
}

// ContentPage is published, customer-facing content — the stuff that drifts.
type ContentPage struct {
	ID      string   `json:"id"`
	Title   string   `json:"title"`
	Slug    string   `json:"slug"`
	Summary string   `json:"summary"`
	Body    []string `json:"body"` // one string per block; assertions address body[n]
	Owner   string   `json:"owner"`
}

// Instruction is a standing decision written back into the Knowledge Base.
type Instruction struct {
	ID          string   `json:"id"`
	Text        string   `json:"text"`
	AnchoredTo  []string `json:"anchoredTo"`
	CreatedFrom string   `json:"createdFrom,omitempty"`
	DecidedBy   string   `json:"decidedBy,omitempty"`
	Status      string   `json:"status"`
}
