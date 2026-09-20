---
title: Claim lineage
description: Where a fact came from, when it appeared, when it was last confirmed, when it moved, and what is still publishing it — in one query.
group: Concepts
order: 16
updated: 2026-09-20
---

Every claim carries three build references, and each one answers a different question somebody
actually asks about a fact they are about to rely on.

| Stamp | The question it answers |
| --- | --- |
| `firstSeenBuild` | Where did this come from? |
| `lastVerifiedBuild` | When was it last re-confirmed? |
| `lastChangedBuild` | When did it last move? |

Read together they produce the sentence a reader wants: _last confirmed at build 46, moved at
build 47._

## The distinction that carries the weight

`lastVerifiedBuild` **does not advance on a build that changed the claim**.

"We checked and it still says this" and "it says something else now" are different facts, and
they must not share a field. A build that changes a claim has not verified it — it has replaced
it.

```text
prior == nil      first seen here · verified here · never changed
same substance    first seen carried · verified here · last change carried
moved             first seen carried · verified NOT advanced · changed here
```

Advancing both stamps together would erase the difference between a fact nobody has re-checked
in a year and one confirmed yesterday. Those are the two facts a person weighing whether to
trust a number most needs to be able to tell apart.

A claim re-asserted identically across nine builds and then changed in the tenth reads as
`verified build.54, changed build.55` — the last moment it was boring, and the moment it
stopped being.

## Stamped, never authored

All three fields are `readOnly` in the Studio and are written by the ledger on every capture.

> [!WARNING]
> A provenance field an editor can type into is a provenance field that will eventually be
> wrong, and a wrong lineage is worse than none — it invites somebody to publish on the strength
> of a verification that never happened.

The stamping logic lives on the type rather than in the ledger, so that every producer of a
snapshot applies identical rules — the live capture path, the seed fixtures, and any future
importer:

```go
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
```

A demo dataset whose lineage was stamped by hand would eventually disagree with the engine that
reads it, which in this product would be an unusually poor joke. See
[ADR-0013](/docs/decisions/lineage-is-computed-not-stored).

## The assembled view

`GET /v1/claims/{id}/lineage` returns a `ClaimLineage`: six branches, which is the shape of the
question people ask.

```json
{
  "claim": { "path": "support/returns", "value": 45, "unit": "days", "tier": "core" },
  "sources": [
    { "title": "Returns & Refunds Policy v4", "authority": 5 },
    { "title": "Help Centre — Returns", "authority": 2 }
  ],
  "firstSeen":    { "buildNumber": 41, "builtAt": "2026-08-30T09:12:00Z" },
  "lastVerified": { "buildNumber": 46, "builtAt": "2026-09-12T11:02:00Z" },
  "lastChanged":  { "buildNumber": 47, "builtAt": "2026-09-19T16:40:00Z" },
  "dependents": [
    { "assertion": { "fieldPath": "body[3]" }, "surface": { "kind": "page",  "title": "Returns & Refunds" } },
    { "assertion": { "fieldPath": "answer"  }, "surface": { "kind": "agent", "title": "Support Bot" } }
  ],
  "drift": { "kind": "contradicted", "before": "30 days", "after": "45 days", "confidence": 1 }
}
```

Note what `sources` and `dependents` are doing: the build IDs are resolved into the builds
themselves, so a reader gets a date rather than the string `build.46`, and each dependent pairs
its assertion with the surface carrying it so the UI does not have to resolve two collections
to render one row.

## Reading it as a story

```text
CLAIM  "Returns are accepted within 45 days of delivery."
  │
  ├── Source      Returns & Refunds Policy v4 (authority 5) · Help Centre (2)
  ├── Created     build 41 · 30 Aug
  ├── Verified    build 46 · 12 Sep · by whom, from the audit chain
  ├── Published   7 pages + the Support Bot
  └── Changed     build 47 · 19 Sep · 30 days → 45 days, typed value, confidence 1.0
```

Five answers, one query. Each line is a different question a nervous person asks before
repeating a number to a customer, and none of them is answerable at all in a system where prose
is overwritten in place.

## Belief history is traversable

`supersededBy` chains one claim to the one that replaced it. Walk it backwards to answer _what
would we have told a customer in March?_ — a question that is simply unanswerable when the
previous wording no longer exists anywhere.

## Read next

- [Claims](/docs/concepts/claims)
- [The ledger](/docs/engine/ledger)
- [HTTP API — lineage](/docs/api/http)
