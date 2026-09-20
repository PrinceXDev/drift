---
title: gate — the nine checks
description: Why approval cannot mean "publish what was drafted", and the deterministic checkpoint that makes it mean something else.
group: The engine
order: 34
status: stable
updated: 2026-09-20
---

`internal/gate` is the deterministic checkpoint in front of publication.

## Why a gate exists at all

Between an agent drafting a correction and a human approving it, time passes. Minutes usually;
occasionally a weekend. In that window the Knowledge Base can rebuild, the claim can change
again, another page can start depending on it, or a second source can be added that contradicts
the correction.

Approving a draft therefore cannot mean "publish what was drafted". It has to mean **"publish
this, if it is still the right thing to publish"** — and the gate is the difference. It
re-derives everything rather than trusting anything computed earlier.

## No model runs here

Every check is a comparison between values that already exist. A gate that asked a model "does
this look safe to publish?" would be unauditable at precisely the moment auditability matters
most.

When a publication is blocked the operator gets **a named check and two values**, not an
opinion.

## Fail closed

Any check that cannot be evaluated blocks. A gate that waves work through when it is uncertain
is not a gate.

## The nine checks

| Check | Passes when |
| --- | --- |
| `human_approval` | The approving actor is a person, not an agent. Checked independently of the permission table. |
| `build_current` | The draft was written against the build being published against. |
| `still_stale` | The assertion still disagrees with current belief — somebody may have fixed it by hand already. |
| `claim_active` | The claim being published is still asserted at all. |
| `no_unresolved_conflict` | No source disagreement covers this claim. |
| `no_contradiction` | The new text does not contradict another current claim. |
| `blast_radius_stable` | The set of affected assertions has not grown since drafting. |
| `scope_respected` | The correction touches only the declared field. |
| `correctable_surface` | The dependent is something a patch can actually fix — i.e. a page. |

Check names are stable strings on purpose: they appear in audit evidence, in the UI, and in
support conversations months later.

### One of them is advisory

`blast_radius_stable` **warns rather than blocks**. A page that started depending on the claim
since drafting is a reason to look, not a reason to refuse — and making every check blocking
teaches operators to route around the gate. The other eight block.

> [!NOTE]
> [ADR-0010](/docs/decisions/publication-gate) describes eight checks. `correctable_surface` was
> added afterwards, when [surfaces](/docs/concepts/surfaces) made it possible to draft a
> correction for something with no paragraph to patch. The ADR is left as written rather than
> quietly updated.

## Every check runs, even after one fails

```go
// All checks run even after one fails. An operator who fixes the first problem
// and resubmits, only to hit a second, has been served badly; they should see
// everything wrong at once.
```

## The shape of a decision

```go
type Check struct {
	Name     CheckName `json:"name"`
	Passed   bool      `json:"passed"`
	Detail   string    `json:"detail"`
	Blocking bool      `json:"blocking"` // advisories are recorded, not enforced
}

type Decision struct {
	Allowed     bool     `json:"allowed"`
	Checks      []Check  `json:"checks"`
	BuildID     string   `json:"buildId"`     // the state of belief at the moment of the call
	BlastRadius []string `json:"blastRadius"` // recomputed here, not taken from the event
}
```

`Detail` is written for the person who has just been stopped from publishing. It names the two
values that disagree, because "blocked by policy" is not something anyone can act on.

`Reason()` renders the blocking checks as one line for logs: `blocked by no_unresolved_conflict`.

## Blast radius is recomputed, not trusted

```go
// BlastRadius is recomputed here rather than taken from the drift event.
// If a page started depending on this claim after the draft was written, the
// approver needs to know before they click, not after.
```

## Advisory versus blocking

`Blocking` distinguishes a hard stop from a note. Advisories are recorded and surfaced but do
not prevent publication — which keeps the blocking set small enough that a block always means
something.

## What the demo does

Against the committed fixtures, approving the `support/returns` correction is refused by
`no_unresolved_conflict`: the policy PDF and the help centre still disagree, and settling that
by clicking Approve on a paragraph would be the wrong mechanism. The right one is a standing
[instruction](/docs/content-model/instruction), which fixes the _next build_ rather than one
page.

The refusal is not a limitation of the demo. It is the product working.

## Related

- [remediation](/docs/engine/remediation) — where the gate sits in the order of operations
- [ADR-0010](/docs/decisions/publication-gate)
- [Surfaces](/docs/concepts/surfaces) — why `correctable_surface` exists
