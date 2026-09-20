---
title: assertion
description: The edge the entire product walks — a place on a published surface where a claim is expressed.
group: Content model
order: 24
status: stable
updated: 2026-09-20
---

`assertion` is the single most important design decision in DRIFT. It records a specific place
on a published surface where a claim is expressed, and it holds a **real Sanity reference** to
that claim.

Because the reference is real, blast radius is:

```groq
*[_type == "assertion" && references($claimId)]
```

Exact, instant, and provably complete. The concept page is
[Assertions and blast radius](/docs/concepts/blast-radius); this is the field reference.

## Fields

| Field | Type | Rules | Notes |
| --- | --- | --- | --- |
| `claim` | ref to `claim` | required | The fact this published text depends on. **The edge.** |
| `page` | ref to `contentPage` | custom: page XOR surface | Set for page assertions. |
| `surface` | ref to `surface` | custom: page XOR surface | Set for an agent, a feed, a template. |
| `fieldPath` | string | required | Where inside the page the claim is expressed, e.g. `body[3]`. |
| `blockKey` | string | required **when** `page` is set | The Portable Text `_key` of the addressed block. |
| `renderedText` | text | required | The exact published sentence, as a human would read it. |
| `verifiedAgainstBuild` | ref to `buildSnapshot` | read-only | The build this text was last confirmed correct against. |
| `state` | string | required, read-only | `verified` `stale` `contradicted` `orphaned`. Default `verified`. |

## Page or surface, never both and never neither

```ts
validation: (rule) =>
  rule.custom((page, context) => {
    const surface = (context.document as {surface?: unknown} | undefined)?.surface
    if (page && surface) {
      return 'An assertion addresses a page or a surface, never both.'
    }
    if (!page && !surface) {
      return 'An assertion must name either a page or a surface.'
    }
    return true
  })
```

Keeping both shapes in **one** document type is deliberate. A second, parallel way to depend on
a claim would have quietly falsified the completeness argument, because completeness over pages
is not completeness. One document type means one query, and one query means the answer is still
provable. See [ADR-0012](/docs/decisions/surfaces-are-assertions-too).

## Why `blockKey` is required on pages

```ts
validation: (rule) =>
  rule.custom((blockKey, context) => {
    const page = (context.document as {page?: unknown} | undefined)?.page
    if (page && !blockKey) {
      return 'A page assertion must address its block by `_key`, never by position.'
    }
    return true
  })
```

A positional path points at different text the moment somebody reorders two paragraphs, and the
remediation agent would then rewrite the wrong sentence — inside its scope restriction, with
the gate satisfied. In a tool about content going quietly out of date, an addressing scheme
that goes quietly out of date would be a poor joke.

A surface has no Portable Text to key into, so the rule does not apply there.

## State is derived

| State | Meaning |
| --- | --- |
| `verified` | The text agrees with the claim as of the current build. |
| `stale` | The claim has moved since this text was last verified. |
| `contradicted` | The text asserts something the current build actively denies. |
| `orphaned` | The claim it depended on no longer exists in the current build. |

`verifiedAgainstBuild` is what makes "approved" mean something: staleness is derived by
comparing that build to the current one, not remembered as a flag somebody set.

## Preview

```ts
prepare: ({text, state, pageTitle, surfaceTitle, surfaceKind, claimPath}) => {
  const where = pageTitle ?? (surfaceTitle ? `${surfaceTitle} (${surfaceKind})` : 'unknown surface')
  return {title: text, subtitle: `${state} · ${where} ← ${claimPath ?? 'unknown claim'}`}
}
```

The preview reads as a sentence: _stale · Returns & Refunds ← support/returns_.

## Examples

A page assertion:

```json
{
  "_type": "assertion",
  "_id": "assertion.returns-b01",
  "claim": {"_ref": "claim.support-returns"},
  "page": {"_ref": "page.returns"},
  "fieldPath": "body[0]",
  "blockKey": "b01",
  "renderedText": "Returns are accepted within 30 days of delivery.",
  "verifiedAgainstBuild": {"_ref": "build.46"},
  "state": "stale"
}
```

An agent's assertion, written when it answered a customer:

```json
{
  "_type": "assertion",
  "_id": "assertion.bot-2026-09-18-0142",
  "claim": {"_ref": "claim.support-returns"},
  "surface": {"_ref": "surface.support-bot"},
  "fieldPath": "answer",
  "renderedText": "You have 30 days from delivery to start a return.",
  "verifiedAgainstBuild": {"_ref": "build.46"},
  "state": "stale"
}
```

Same document type. Same query finds both.
