---
title: driftEvent
description: The diff between two builds, for one claim — every row in the Drift Feed is one of these.
group: Content model
order: 27
updated: 2026-09-20
---

`driftEvent` is the diff between two builds, for one claim. A stream of them is the changelog
of organisational truth. The document type is `readOnly: true`.

The concept page is [Drift events](/docs/concepts/drift-events); this is the field reference.

## Fields

| Field | Type | Rules | Notes |
| --- | --- | --- | --- |
| `fromBuild` | ref to `buildSnapshot` | | The earlier build. |
| `toBuild` | ref to `buildSnapshot` | | The later build. |
| `claim` | ref to `claim` | | The fact that moved. |
| `kind` | string | required | `added` `retired` `contradicted` `weakened` `citation_broken` `instruction_archived` |
| `before` | text | | The statement as of the earlier build. Empty for `added`. |
| `after` | text | | The statement as of the later build. Empty for `retired`. |
| `confidence` | number | required, 0–1 | `1.0` when the comparison was arithmetic. |
| `detectedBy` | string | | `typed_value` `citation_graph` `instruction_lifecycle` `semantic` (and `outline_presence` in the engine). |
| `blastRadius` | array of refs to `assertion` | | Every published assertion depending on this claim. Precomputed at diff time. |
| `workflowState` | string | | `detected` `triage` `drafting` `review` `published` `dismissed`. Default `detected`. |
| `workflowInstanceId` | string | | Returned by `sanity-workflows start`. Links this event to its remediation run. |

## Orderings

```ts
orderings: [
  {title: 'Newest first', name: 'newest', by: [{field: 'toBuild.builtAt', direction: 'desc'}]},
]
```

Ordered by the build's timestamp rather than by `_createdAt`, because the interesting order is
when belief moved, not when DRIFT got round to recording it.

## Confidence and detector, together

The two fields are only meaningful as a pair. `confidence: 1.0` on its own could be a model
asserting certainty; `confidence: 1.0, detectedBy: typed_value` is a statement that two numbers
were subtracted and anyone can repeat the subtraction.

Anything under the configured threshold routes to a human instead of being applied silently,
and so does anything on a `core` claim at any confidence.

## Blast radius is precomputed and then recomputed

Stored here so the console can render "8 affected" without a traversal on every paint —
and recomputed from scratch at the [gate](/docs/engine/gate), where any growth since drafting
fails `blast_radius_stable`.

## Preview

```ts
prepare: ({kind, path, before, after, state}) => ({
  title: `${kind.toUpperCase()} · ${path ?? 'unknown claim'}`,
  subtitle:
    kind === 'added' ? after
    : kind === 'retired' ? before
    : `${before} → ${after} (${state})`,
})
```

## Example

```json
{
  "_type": "driftEvent",
  "_id": "drift.46-47.support-returns",
  "fromBuild": {"_ref": "build.46"},
  "toBuild": {"_ref": "build.47"},
  "claim": {"_ref": "claim.support-returns"},
  "kind": "contradicted",
  "before": "Returns are accepted within 30 days of delivery.",
  "after": "Returns are accepted within 45 days of delivery.",
  "confidence": 1,
  "detectedBy": "typed_value",
  "blastRadius": [
    {"_ref": "assertion.returns-b01"},
    {"_ref": "assertion.faq-b04"},
    {"_ref": "assertion.bot-2026-09-18-0142"}
  ],
  "workflowState": "triage",
  "workflowInstanceId": "wfi_01J8…"
}
```

## Why it is read-only

An event is an observation about two immutable builds. If the observation is wrong, the fix is
to correct the detector and re-run the diff — which is reproducible precisely because the builds
are content-addressed. Editing the record would produce a changelog that disagrees with the
inputs it claims to describe.
