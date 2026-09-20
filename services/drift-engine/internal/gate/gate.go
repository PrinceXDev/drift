// Package gate is the deterministic checkpoint in front of publication.
//
// # Why a gate exists at all
//
// Between an agent drafting a correction and a human approving it, time passes.
// Minutes usually; occasionally a weekend. In that window the Knowledge Base can
// rebuild, the claim can change again, another page can start depending on it,
// or a second source can be added that contradicts the correction.
//
// Approving a draft therefore cannot mean "publish what was drafted". It has to
// mean "publish this, if it is still the right thing to publish". The gate is
// the difference, and it re-derives everything rather than trusting anything
// computed earlier.
//
// # No model runs here
//
// Every check is a comparison between values that already exist. A gate that
// asked a model "does this look safe to publish?" would be unauditable at
// precisely the moment auditability matters most. When a publication is blocked
// the operator gets a named check and two values, not an opinion.
//
// # Fail closed
//
// Any check that cannot be evaluated blocks. A gate that waves work through
// when it is uncertain is not a gate.
package gate

import (
	"context"
	"fmt"
	"sort"
	"strings"

	"github.com/drift/drift-engine/internal/authz"
	"github.com/drift/drift-engine/internal/graph"
	"github.com/drift/drift-engine/pkg/driftv1"
)

// CheckName identifies a gate condition. Stable strings: they appear in audit
// evidence, in the UI, and in support conversations months later.
type CheckName string

const (
	// CheckHumanApproval — the approving actor is a person, not an agent.
	CheckHumanApproval CheckName = "human_approval"
	// CheckBuildCurrent — the draft was written against the build being published against.
	CheckBuildCurrent CheckName = "build_current"
	// CheckStillStale — the assertion still disagrees with current belief.
	CheckStillStale CheckName = "still_stale"
	// CheckClaimActive — the claim being published is still asserted.
	CheckClaimActive CheckName = "claim_active"
	// CheckNoUnresolvedConflict — no source disagreement covers this claim.
	CheckNoUnresolvedConflict CheckName = "no_unresolved_conflict"
	// CheckNoContradiction — the new text does not contradict another current claim.
	CheckNoContradiction CheckName = "no_contradiction"
	// CheckBlastRadiusStable — the set of affected assertions has not grown since drafting.
	CheckBlastRadiusStable CheckName = "blast_radius_stable"
	// CheckScopeRespected — the correction touches only the declared field.
	CheckScopeRespected CheckName = "scope_respected"
	// CheckCorrectableSurface — the dependent is something a patch can fix.
	CheckCorrectableSurface CheckName = "correctable_surface"
)

// Check is one condition and its outcome.
//
// Detail is written for the person who has just been stopped from publishing.
// It names the two values that disagree, because "blocked by policy" is not
// something anyone can act on.
type Check struct {
	Name   CheckName `json:"name"`
	Passed bool      `json:"passed"`
	Detail string    `json:"detail"`
	// Blocking distinguishes a hard stop from an advisory. Advisories are
	// recorded and surfaced but do not prevent publication.
	Blocking bool `json:"blocking"`
}

// Decision is the gate's verdict.
type Decision struct {
	Allowed bool    `json:"allowed"`
	Checks  []Check `json:"checks"`
	// BuildID is the build the decision was made against, so the audit entry
	// records the state of belief at the moment of the call.
	BuildID string `json:"buildId"`
	// BlastRadius is recomputed here rather than taken from the drift event.
	// If a page started depending on this claim after the draft was written, the
	// approver needs to know before they click, not after.
	BlastRadius []string `json:"blastRadius"`
}

// Blocked returns the checks that stopped publication, for the UI and the
// audit entry.
func (d Decision) Blocked() []Check {
	var out []Check
	for _, c := range d.Checks {
		if c.Blocking && !c.Passed {
			out = append(out, c)
		}
	}
	return out
}

// Reason renders the blocking checks as one line for logs.
func (d Decision) Reason() string {
	blocked := d.Blocked()
	if len(blocked) == 0 {
		return "allowed"
	}
	names := make([]string, 0, len(blocked))
	for _, c := range blocked {
		names = append(names, string(c.Name))
	}
	return "blocked by " + strings.Join(names, ", ")
}

// Request is what the gate evaluates.
type Request struct {
	// Assertion is the published span being corrected.
	Assertion driftv1.Assertion
	// ProposedText is the corrected sentence awaiting approval.
	ProposedText string
	// DraftedAgainstBuild is the build the draft was written against.
	DraftedAgainstBuild string
	// DraftedBlastRadius is what the blast radius was at drafting time.
	DraftedBlastRadius []string
	// FieldPath the draft claims to have touched.
	TouchedFieldPath string
}

// Corpus is current belief: the build being published against.
type Corpus struct {
	Build driftv1.BuildSnapshot
}

// claimByID indexes the build.
func (c Corpus) claimByID(id string) (driftv1.Claim, bool) {
	for _, claim := range c.Build.Claims {
		if claim.ID == id {
			return claim, true
		}
	}
	return driftv1.Claim{}, false
}

// Gate evaluates publication requests.
type Gate struct {
	reader graph.AssertionReader
}

// New returns a Gate that recomputes blast radius through the given reader.
func New(reader graph.AssertionReader) *Gate { return &Gate{reader: reader} }

// Evaluate runs every check and returns a decision.
//
// All checks run even after one fails. An operator who fixes the first problem
// and resubmits, only to hit a second, has been served badly; they should see
// everything wrong at once.
func (g *Gate) Evaluate(
	ctx context.Context,
	grant *authz.Grant,
	req Request,
	corpus Corpus,
) (Decision, error) {
	decision := Decision{BuildID: corpus.Build.ID}

	add := func(name CheckName, passed, blocking bool, format string, args ...any) {
		decision.Checks = append(decision.Checks, Check{
			Name: name, Passed: passed, Blocking: blocking,
			Detail: fmt.Sprintf(format, args...),
		})
	}

	// 1. A person, checked independently of the permission table.
	if err := authz.MustBeHuman(grant); err != nil {
		add(CheckHumanApproval, false, true,
			"publication requires a human approver; %v", err)
	} else {
		add(CheckHumanApproval, true, true,
			"approved by %s (%s)", grant.ActorID(), grant.Actor().RoleNames())
	}

	// 2. The draft must have been written against the build we are publishing
	//    against. A rebuild between drafting and approval means the correction
	//    may be answering a question that has already changed.
	if req.DraftedAgainstBuild == corpus.Build.ID {
		add(CheckBuildCurrent, true, true,
			"drafted against %s, which is current", corpus.Build.ID)
	} else {
		add(CheckBuildCurrent, false, true,
			"drafted against %s but current belief is %s; the Knowledge Base rebuilt "+
				"after this draft was written, so it must be re-drafted",
			req.DraftedAgainstBuild, corpus.Build.ID)
	}

	// 3. The claim must still be asserted. Publishing a correction toward a claim
	//    the organisation has since retired would write a fact nobody believes.
	claim, claimFound := corpus.claimByID(req.Assertion.ClaimID)
	switch {
	case !claimFound:
		add(CheckClaimActive, false, true,
			"claim %s is not present in %s; it was retired after this draft was written",
			req.Assertion.ClaimID, corpus.Build.ID)
	case claim.Status != driftv1.ClaimActive:
		add(CheckClaimActive, false, true,
			"claim %s is %s, not active", claim.Path, claim.Status)
	default:
		add(CheckClaimActive, true, true, "claim %s is active", claim.Path)
	}

	// 4. The published text must still disagree with the claim. If someone fixed
	//    it by hand in the meantime, publishing again would be a no-op write with
	//    a misleading audit entry saying a correction was applied.
	if req.Assertion.RenderedText == req.ProposedText {
		add(CheckStillStale, false, true,
			"the published text already matches the proposal; nothing to correct "+
				"(it was probably fixed by hand)")
	} else {
		add(CheckStillStale, true, true, "published text still differs from the correction")
	}

	// 5. No unresolved source disagreement may cover this claim. Publishing into
	//    a live disagreement picks a winner by accident.
	if claimFound {
		if conflict, found := unresolvedConflictFor(corpus.Build, claim.Path); found {
			add(CheckNoUnresolvedConflict, false, true,
				"sources still disagree about %s (%d competing values); resolve the "+
					"conflict before publishing, or the correction picks a side by accident",
				conflict.Path, len(conflict.CompetingValues))
		} else {
			add(CheckNoUnresolvedConflict, true, true,
				"no unresolved conflict covers %s", claim.Path)
		}
	}

	// 6. The proposed text must not contradict a *different* current claim.
	//    This is the check that catches a correction which fixes the return
	//    window and, in doing so, states a shipping threshold that is wrong.
	if contradicted := contradictions(req.ProposedText, corpus.Build, req.Assertion.ClaimID); len(contradicted) > 0 {
		add(CheckNoContradiction, false, true,
			"the correction contradicts %s", strings.Join(contradicted, ", "))
	} else {
		add(CheckNoContradiction, true, true,
			"the correction agrees with every other current claim")
	}

	// 7. Scope. The agent may rewrite only the field the assertion declares.
	if req.TouchedFieldPath == req.Assertion.FieldPath {
		add(CheckScopeRespected, true, true,
			"correction touches only %s", req.Assertion.FieldPath)
	} else {
		add(CheckScopeRespected, false, true,
			"correction touches %s but the assertion declares %s",
			req.TouchedFieldPath, req.Assertion.FieldPath)
	}

	// 8. The dependent must be something a correction can actually fix.
	//
	//    Since surfaces exist, a blast radius can contain an agent, a feed or a
	//    template alongside the pages. Those have no document to patch: the
	//    Support Bot is wrong until the Knowledge Base rebuilds, and no amount
	//    of rewriting a paragraph changes that. Publishing a "correction" for
	//    one would write nothing, record a completed publication, and mark the
	//    work done — the audit trail asserting a fix that never happened.
	//
	//    Blocking, and blocking with an explanation, because the operator is not
	//    doing anything wrong: they are looking at a real dependent that is
	//    genuinely stale and is simply not theirs to fix here.
	if req.Assertion.OnPage() {
		add(CheckCorrectableSurface, true, true,
			"%s is page content and can be patched", req.Assertion.PageID)
	} else {
		add(CheckCorrectableSurface, false, true,
			"%s is not editable page content, so there is nothing to patch; it stops "+
				"repeating the old value when the Knowledge Base rebuilds, not when "+
				"somebody approves a paragraph",
			req.Assertion.DependentID())
	}

	// 9. Blast radius, recomputed. Advisory rather than blocking: a page that
	//    started depending on this claim since drafting is important to know
	//    about, but it is a reason to look, not a reason to refuse.
	current, err := g.currentBlastRadius(ctx, req.Assertion.ClaimID)
	if err != nil {
		// Fail closed. An unknown blast radius is not a small blast radius.
		add(CheckBlastRadiusStable, false, true,
			"could not recompute the blast radius: %v; refusing to publish against "+
				"an unknown dependency set", err)
	} else {
		decision.BlastRadius = current
		if added := addedSince(req.DraftedBlastRadius, current); len(added) > 0 {
			add(CheckBlastRadiusStable, false, false,
				"%d assertion(s) started depending on this claim since drafting: %s",
				len(added), strings.Join(added, ", "))
		} else {
			add(CheckBlastRadiusStable, true, false,
				"%d dependent assertion(s), unchanged since drafting", len(current))
		}
	}

	decision.Allowed = len(decision.Blocked()) == 0
	return decision, nil
}

func (g *Gate) currentBlastRadius(ctx context.Context, claimID string) ([]string, error) {
	assertions, err := g.reader.AssertionsReferencing(ctx, claimID)
	if err != nil {
		return nil, err
	}
	ids := make([]string, 0, len(assertions))
	for _, a := range assertions {
		ids = append(ids, a.ID)
	}
	sort.Strings(ids)
	return ids, nil
}

func addedSince(before, now []string) []string {
	had := make(map[string]bool, len(before))
	for _, id := range before {
		had[id] = true
	}
	var added []string
	for _, id := range now {
		if !had[id] {
			added = append(added, id)
		}
	}
	sort.Strings(added)
	return added
}

func unresolvedConflictFor(build driftv1.BuildSnapshot, path string) (driftv1.Conflict, bool) {
	for _, c := range build.Conflicts {
		if c.Path == path && c.ResolvedBy == "" {
			return c, true
		}
	}
	return driftv1.Conflict{}, false
}

// contradictions finds current claims the proposed text disagrees with.
//
// # Why unit agreement is not enough
//
// The first implementation flagged a contradiction whenever the text stated a
// number in the same unit as some claim. Correcting a return window to "45
// days" then contradicted the dispatch time (2 days), the price-match window
// (14 days) and the EU cooling-off period (14 days) — three false positives on
// the product's own demo data, because they all happen to be measured in days.
//
// A unit is not a topic. Two claims can both be counted in days and be about
// entirely different things.
//
// # The rule
//
// A quantity contradicts a claim only when the text mentions something
// *distinctive* to that claim: a term from its path that does not also appear
// in the path of the claim being corrected. Shared vocabulary is discounted, so
// correcting `support/returns` cannot accidentally implicate
// `support/returns-eu` through the word they have in common — only through
// "eu", which the text would have to actually say.
//
// This is conservative on purpose. It will miss a contradiction expressed
// entirely in prose with no distinguishing term. That is the right trade: a
// false positive blocks a legitimate publication, and operators who are blocked
// spuriously learn to click through warnings, which costs more than a miss.
func contradictions(text string, build driftv1.BuildSnapshot, exceptClaimID string) []string {
	quantities := extractQuantities(text)
	if len(quantities) == 0 {
		return nil
	}

	// Vocabulary belonging to the claim under correction is not evidence that
	// the text is talking about some other claim.
	var subjectTokens map[string]bool
	for _, c := range build.Claims {
		if c.ID == exceptClaimID {
			subjectTokens = pathTokens(c.Path)
			break
		}
	}

	textTokens := textTokenSet(text)

	var found []string
	for _, claim := range build.Claims {
		if claim.ID == exceptClaimID || !claim.HasTypedValue() || claim.Status != driftv1.ClaimActive {
			continue
		}
		if !mentionsDistinctively(textTokens, pathTokens(claim.Path), subjectTokens) {
			continue
		}
		for _, q := range quantities {
			if !sameUnit(q.unit, claim.Unit) {
				continue
			}
			if q.value != *claim.Value {
				found = append(found,
					fmt.Sprintf("%s (says %g %s, the text says %g %s)",
						claim.Path, *claim.Value, claim.Unit, q.value, claim.Unit))
			}
		}
	}
	sort.Strings(found)
	return found
}

// mentionsDistinctively reports whether the text names something specific to a
// claim, ignoring vocabulary it shares with the claim being corrected.
func mentionsDistinctively(text, claimPath, subjectPath map[string]bool) bool {
	for token := range claimPath {
		if subjectPath[token] {
			continue // shared vocabulary proves nothing
		}
		if text[token] {
			return true
		}
	}
	return false
}
