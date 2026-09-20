---
title: Claims
description: The unit of belief — one atomic, checkable fact, and why it carries a typed value rather than a paragraph.
group: Concepts
order: 11
updated: 2026-09-20
---

A **claim** is one atomic, checkable fact, mirrored from a Knowledge Base entry. It is the
pivot of the entire content model: sources produce claims, assertions depend on claims, drift
events describe how a claim moved, and lineage is a claim's biography.

```text
CLAIM  "Returns are accepted within 45 days of delivery."
  path       support/returns
  value      45
  unit       days
  tier       core
  citations  Returns & Refunds Policy v4 · Help Centre
  status     active
```

## A claim is deliberately not a paragraph

The single most consequential design decision about claims is that they carry an optional typed
`value` and `unit`.

With them, contradiction between two builds is **arithmetic**:

```text
build 46   value 30, unit days
build 47   value 45, unit days
           ─────────────────────────────────────────────
           contradicted · confidence 1.0 · typed_value
```

Without them, the engine falls back to comparing prose, and says so by reporting a confidence
below 1.0 and a detector of `semantic`.

That is the difference between a claim you can prove and an opinion you have to trust. "30
days" versus "45 days" is decidable by anyone with a calculator. "Our policy has been updated"
versus "our returns policy has changed recently" is not decidable at all.

> [!NOTE]
> `HasTypedValue()` is strict on purpose: a value without a unit does not count. `30` and `45`
> are not comparable until you know they are both days, and a system that guesses the unit is a
> system that will eventually compare dollars to kilograms.

## The fields, and why each is there

| Field | Why it exists |
| --- | --- |
| `path` | Mirrors the Knowledge Base outline path, e.g. `support/returns`. This is how the engine maps a claim back to the entry it came from. Validated against a lowercase, slash-separated pattern. |
| `statement` | The fact in one sentence, capped at 400 characters. If it needs more, it is not atomic. |
| `value` + `unit` | The typed quantity, when there is one. `unit` is required whenever `value` is set. |
| `tier` | `core`, `standard` or `peripheral`, mirroring the Knowledge Base's `[core]` / `[peripheral]` outline tagging. |
| `citations` | At least one source. A claim with no citation is a bug, and the schema enforces it. |
| `status` | `active`, `retired` or `contested`. |
| `supersededBy` | The claim that replaced this one, making belief history traversable. |
| `firstSeenBuild` · `lastVerifiedBuild` · `lastChangedBuild` | [Lineage](/docs/concepts/lineage), stamped by the ledger and never authored. |

The complete field reference, with every validation rule, is in
[the `claim` document type](/docs/content-model/claim).

## Tier is a routing signal, not a label

The Knowledge Base tags entries `[core]` or `[peripheral]` in its outline. DRIFT mirrors that
tagging onto claims and then _uses_ it:

- Drift in a **core** claim pages a human — always, even at confidence 1.0. Being certain that a
  load-bearing fact changed is precisely when you want somebody to look.
- Drift in a **peripheral** claim batches into a digest.

That policy lives in exactly one place:

```go
// NeedsHumanReview encodes the escalation policy in one place.
//
// Two independent reasons to involve a person: the engine is not certain what
// changed, or it is certain but the claim is load-bearing.
func (e DriftEvent) NeedsHumanReview(threshold float64) bool {
	return e.Confidence < threshold || e.Tier == TierCore
}
```

## Claims are never authored by hand

A claim is proposed by the claim-extraction agent from Knowledge Base entry prose, and confirmed
into the ledger by the engine. That is one of the [three places a language
model runs](/docs/concepts/determinism) in the entire system, and its output enters a review
queue rather than the ledger directly.

The reason is containment. Extraction is genuinely a language problem — turning a paragraph of
policy into `45, days` is not work for a regular expression. But once the claim exists, nothing
downstream needs a model again: comparison, traversal, gating and routing are all operations on
typed data.

## Sameness, and the one predicate that decides it

Whether a claim in build 47 is "the same claim" as one in build 46 is decided by
`Claim.SameSubstanceAs`, in this order:

1. **Both sides carry a comparable typed value** — the numbers decide, and nothing else does.
   Reworded prose around an unchanged quantity is not a change of mind.
2. **Otherwise, thinner evidence is a change** — a lost citation, or a tier demoted from `core`
   toward `peripheral`. The claim still stands, but on less.
3. **Otherwise, compare the sentence.**

```go
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
```

Lineage and status are ignored throughout: they are bookkeeping the ledger itself writes, and
comparing them would make every claim look changed on every capture, which would make lineage
mean nothing.

> [!WARNING]
> This predicate has to agree with [the differ](/docs/engine/differ) exactly. If the two ever
> disagreed, the console would show a claim stamped "changed in build 47" beside a feed
> insisting build 47 changed nothing — a knowledge-integrity tool contradicting itself about its
> own knowledge. `TestLineageAgreesWithDiffer` fails the build if they diverge.

## Read next

- [Assertions and blast radius](/docs/concepts/blast-radius)
- [Claim lineage](/docs/concepts/lineage)
- [The `claim` document type](/docs/content-model/claim)
