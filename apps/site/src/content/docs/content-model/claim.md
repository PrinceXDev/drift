---
title: claim
description: One atomic, checkable fact — the pivot of the whole model, field by field.
group: Content model
order: 22
updated: 2026-09-20
---

`claim` is one atomic, checkable fact, mirrored from a Knowledge Base entry. Claims are never
authored by hand: they are proposed by the claim-extraction agent and confirmed into the ledger
by the engine.

The concept page is [Claims](/docs/concepts/claims); this is the field reference.

## Fields

| Field | Type | Rules | Notes |
| --- | --- | --- | --- |
| `path` | string | required; lowercase slash-separated slug | Mirrors the Knowledge Base outline path, e.g. `support/returns`. |
| `statement` | text | required, ≤ 400 | The fact in one sentence. |
| `value` | number | | The typed quantity this claim asserts, when it has one. |
| `unit` | string | required **when** `value` is set | e.g. `days`, `USD`, `kg`. |
| `tier` | string | required; `core` `standard` `peripheral` | Default `standard`. Drives routing. |
| `citations` | array of refs to `source` | required, ≥ 1 | Inherited from the Knowledge Base entry. |
| `firstSeenBuild` | ref to `buildSnapshot` | read-only | The build this claim first appeared in. |
| `lastVerifiedBuild` | ref to `buildSnapshot` | read-only | The most recent build in which it was re-asserted **unchanged**. |
| `lastChangedBuild` | ref to `buildSnapshot` | read-only | The most recent build in which its substance moved. |
| `status` | string | required; `active` `retired` `contested` | Default `active`. |
| `supersededBy` | ref to `claim` | read-only | Makes belief history traversable. |

## The path pattern

```ts
rule.required().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)*$/, {
  name: 'lowercase slash-separated path',
})
```

The path is the join key between a Sanity document and a Knowledge Base entry. Allowing
`Support/Returns` and `support/returns` to both exist would mean two claims for one fact, and
two blast radii that are each incomplete.

## The unit rule

```ts
validation: (rule) =>
  rule.custom((unit, context) => {
    const value = (context.document as {value?: number} | undefined)?.value
    if (typeof value === 'number' && !unit) return 'Unit is required when a value is set.'
    return true
  })
```

A value without a unit is worse than no value at all: it looks comparable and is not.

## Status

| Status | Meaning |
| --- | --- |
| `active` | Currently asserted by the latest build. |
| `retired` | The organisation stopped asserting it. Kept, because published content may still depend on it. |
| `contested` | Sources disagree and the disagreement is unresolved. The Dissent agent refuses to answer from it. |

`retired` claims must remain resolvable. An early bug on the public site was exactly this: a
retired claim could not be resolved, so a page depending on it rendered an error instead of a
warning. A fact nobody believes any more is still a fact somebody published.

## Lineage

The three build references are written by the ledger on every capture and are read-only here.
`lastVerifiedBuild` deliberately does not advance on a build that changed the claim. Full
explanation: [Claim lineage](/docs/concepts/lineage).

## Preview

```ts
preview: {
  select: {path: 'path', statement: 'statement', tier: 'tier', status: 'status'},
  prepare: ({path, statement, tier, status}) => ({
    title: path,
    subtitle: `${tier} · ${status} · ${statement}`,
  }),
}
```

The Studio list shows the path first, because the path is how a person navigates between a
claim and the Knowledge Base entry it mirrors.

## Example

```json
{
  "_type": "claim",
  "_id": "claim.support-returns",
  "path": "support/returns",
  "statement": "Returns are accepted within 45 days of delivery.",
  "value": 45,
  "unit": "days",
  "tier": "core",
  "citations": [
    {"_ref": "source.returns-policy-v4"},
    {"_ref": "source.help-centre-returns"}
  ],
  "firstSeenBuild": {"_ref": "build.41"},
  "lastVerifiedBuild": {"_ref": "build.46"},
  "lastChangedBuild": {"_ref": "build.47"},
  "status": "active"
}
```
