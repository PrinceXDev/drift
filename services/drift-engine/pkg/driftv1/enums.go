// Package driftv1 is the exported contract of the DRIFT engine.
//
// Everything in this package is mirrored into TypeScript for the console and the
// Sanity schema. The mirror is not maintained by hand: `cmd/gencontracts` emits
// packages/contracts/src/driftv1.ts from these declarations, and a contract test
// fails the build if the Sanity schema's enums drift from the ones here.
//
// The irony of a knowledge-integrity tool whose own types silently diverge was
// not lost on us.
package driftv1

// ClaimStatus tracks a fact's lifecycle across successive Knowledge Base builds.
type ClaimStatus string

const (
	ClaimActive    ClaimStatus = "active"
	ClaimRetired   ClaimStatus = "retired"
	ClaimContested ClaimStatus = "contested"
)

// ClaimTier mirrors the [core] / [peripheral] tagging a Sanity Knowledge Base
// applies to entries in its outline. We reuse it as a routing signal.
type ClaimTier string

const (
	TierCore       ClaimTier = "core"
	TierStandard   ClaimTier = "standard"
	TierPeripheral ClaimTier = "peripheral"
)

// AssertionState says whether published text still agrees with the current build.
type AssertionState string

const (
	AssertionVerified     AssertionState = "verified"
	AssertionStale        AssertionState = "stale"
	AssertionContradicted AssertionState = "contradicted"
	AssertionOrphaned     AssertionState = "orphaned"
)

// SurfaceKind says what sort of published thing depends on a claim.
//
// The list is short on purpose. It exists to answer "how would you correct
// this?", and the answers are genuinely different: a page is patched, an agent
// is re-grounded, a feed is republished, a template is re-rendered. A taxonomy
// any finer would be classification for its own sake.
type SurfaceKind string

const (
	// SurfacePage is editable published content — the only kind a correction can
	// be drafted against, because it is the only kind with a document to patch.
	SurfacePage SurfaceKind = "page"
	// SurfaceAgent is something that answers from the Knowledge Base. It is not
	// corrected by rewriting a paragraph; it is corrected by the next build.
	SurfaceAgent SurfaceKind = "agent"
	// SurfaceFeed is syndicated output: a product feed, an API response, an export.
	SurfaceFeed SurfaceKind = "feed"
	// SurfaceTemplate is transactional copy — email, receipts, notifications.
	SurfaceTemplate SurfaceKind = "template"
)

// AllSurfaceKinds mirrors SURFACE_KINDS in packages/schema/src/constants.ts.
var AllSurfaceKinds = []SurfaceKind{
	SurfacePage, SurfaceAgent, SurfaceFeed, SurfaceTemplate,
}

// Correctable reports whether a drafted correction can be published to this
// kind of surface. Only pages can: everything else is downstream of the
// Knowledge Base and is fixed by fixing the claim, not by rewriting the output.
//
// The gate relies on this. Drafting a paragraph rewrite for a bot would be a
// correction that publishes nowhere and marks the work done.
func (k SurfaceKind) Correctable() bool { return k == SurfacePage }

// DriftKind is the taxonomy of belief change — the vocabulary in which
// "what did this organisation stop believing" is expressed.
type DriftKind string

const (
	// DriftAdded is a claim present in the later build and absent from the earlier one.
	DriftAdded DriftKind = "added"
	// DriftRetired is a claim that disappeared: the organisation stopped asserting it.
	DriftRetired DriftKind = "retired"
	// DriftContradicted is the important one — the same claim path now carries a
	// different typed value. 30 days became 45 days.
	DriftContradicted DriftKind = "contradicted"
	// DriftWeakened is a claim that lost a citation or had its tier demoted: still
	// asserted, but on thinner evidence than before.
	DriftWeakened DriftKind = "weakened"
	// DriftCitationBroken means a cited source no longer resolves.
	DriftCitationBroken DriftKind = "citation_broken"
	// DriftInstructionArchived fires when Sanity auto-archives a standing decision
	// because its anchoring source changed — a governing rule has come unmoored
	// from its justification.
	DriftInstructionArchived DriftKind = "instruction_archived"
)

// Detector names which mechanism found a change. Deterministic detectors are
// tried first and preferred; Semantic is the fallback of last resort.
type Detector string

const (
	// DetectorOutlinePresence covers claims that appeared in or vanished from the
	// build outline. No comparison happened — presence itself is the evidence —
	// so labelling these `typed_value` would overstate what we actually checked.
	DetectorOutlinePresence      Detector = "outline_presence"
	DetectorTypedValue           Detector = "typed_value"
	DetectorCitationGraph        Detector = "citation_graph"
	DetectorInstructionLifecycle Detector = "instruction_lifecycle"
	DetectorSemantic             Detector = "semantic"
)

// WorkflowState mirrors the stages in sanity/workflows/drift-remediation.ts.
type WorkflowState string

const (
	StateDetected  WorkflowState = "detected"
	StateTriage    WorkflowState = "triage"
	StateDrafting  WorkflowState = "drafting"
	StateReview    WorkflowState = "review"
	StatePublished WorkflowState = "published"
	StateDismissed WorkflowState = "dismissed"
)

// AllDriftKinds is used by the contract test that compares this package against
// the Sanity schema's enum lists.
var AllDriftKinds = []DriftKind{
	DriftAdded, DriftRetired, DriftContradicted,
	DriftWeakened, DriftCitationBroken, DriftInstructionArchived,
}

// AllWorkflowStates mirrors WORKFLOW_STATES in packages/schema/src/constants.ts.
var AllWorkflowStates = []WorkflowState{
	StateDetected, StateTriage, StateDrafting,
	StateReview, StatePublished, StateDismissed,
}
