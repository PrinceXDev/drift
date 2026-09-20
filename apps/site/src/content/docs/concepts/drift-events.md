---
title: Drift events
description: The taxonomy of belief change — six kinds, five detectors, and a confidence number that means something.
group: Concepts
order: 14
updated: 2026-09-20
---

A **drift event** is the diff between two builds, for one claim. A stream of them is the
changelog of organisational truth, and every row in the Control Room's Drift Feed is one of
these documents.

```json
{
  "_type": "driftEvent",
  "fromBuild": "build.46",
  "toBuild": "build.47",
  "claim": "claim.support-returns",
  "kind": "contradicted",
  "before": "Returns are accepted within 30 days of delivery.",
  "after": "Returns are accepted within 45 days of delivery.",
  "confidence": 1,
  "detectedBy": "typed_value",
  "blastRadius": ["assertion.a1", "assertion.a2", "…"],
  "workflowState": "detected"
}
```

## The six kinds

| Kind | Meaning |
| --- | --- |
| `added` | A claim present in the later build and absent from the earlier one. |
| `retired` | A claim that disappeared — the organisation stopped asserting it. |
| `contradicted` | The important one. The same claim path now carries a different typed value. 30 days became 45 days. |
| `weakened` | Still asserted, but on thinner evidence: a lost citation, or a tier demoted. |
| `citation_broken` | A cited source no longer resolves. |
| `instruction_archived` | Sanity auto-archived a standing decision because its anchoring source changed — a governing rule has come unmoored from its justification. |

`weakened` and `instruction_archived` are the two that would not occur to you before building
this, and they are the two that turn out to matter most in a real corpus. A policy nobody
changed but which now rests on one source instead of three has changed in a way worth knowing
about. A rule whose justification was edited out from under it is worse.

## The five detectors

`detectedBy` records _which mechanism found the change_. Deterministic detectors are tried
first and preferred; `semantic` is the fallback of last resort.

| Detector | Fires when |
| --- | --- |
| `outline_presence` | The claim appeared in or vanished from the build outline. No comparison happened — presence itself is the evidence. |
| `typed_value` | Both builds carried a comparable value and unit. The comparison was arithmetic. |
| `citation_graph` | The change was in the evidence: a citation lost, added or broken. |
| `instruction_lifecycle` | An instruction was archived or activated. |
| `semantic` | Nothing above applied, and all that was left to compare was the prose. |

> [!NOTE]
> `outline_presence` exists because labelling an `added` or `retired` event `typed_value` would
> overstate what was actually checked. Nothing was compared — the claim simply was not there
> before. Being precise about the evidence is the entire point of the field.

## Confidence

`confidence` is a number between 0 and 1, and it means one specific thing: **how much of this
conclusion came from arithmetic rather than from prose.**

- `1.0` — both builds carried a typed value and a matching unit. The contradiction is a
  subtraction, and anyone can check it.
- Below `1.0` — the change was inferred from prose comparison.

Anything under the configured threshold goes to a human rather than being applied silently. So
does anything on a `core` claim, regardless of confidence:

```go
func (e DriftEvent) NeedsHumanReview(threshold float64) bool {
	return e.Confidence < threshold || e.Tier == TierCore
}
```

Confidence is never produced by a model. If it were, it would be a model's opinion about its own
reliability, which is the least useful number in computing.

## Blast radius is precomputed, then recomputed

`blastRadius` holds every published assertion that depends on the claim, resolved by
[the graph walk](/docs/engine/graph) at diff time. The console renders "8 affected" without a
traversal on every paint.

It is then **recomputed from scratch at the gate**, and the two are compared. If a page started
depending on the claim in the hours between drafting and approval, `blast_radius_stable` fails
and the approver is told before the click, not after.

## Workflow state

`workflowState` mirrors the deployed `drift-remediation` workflow, and `workflowInstanceId`
links the event to its run:

```text
detected → triage → drafting → review → published
                 ↘ dismissed          ↘ (back to drafting)
```

An event that ends `dismissed` is kept. A dismissed event is still a record of what the
organisation looked at and decided, and deleting it would mean the ledger only remembers the
changes somebody agreed with.

Full detail: [The remediation workflow](/docs/sanity/workflows).

## Drift events are read-only

The document type is `readOnly: true` in the Studio. An event is an observation about two
immutable builds; if the observation is wrong, the fix is to correct the detector and re-run
the diff — which is reproducible precisely because the builds are content-addressed.

## Read next

- [The differ](/docs/engine/differ) — how events are produced
- [The `driftEvent` document type](/docs/content-model/drift-event)
- [Conflicts and instructions](/docs/concepts/conflicts-instructions)
