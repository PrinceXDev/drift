---
title: buildSnapshot
description: One immutable Knowledge Base build, captured as a document — the type that makes DRIFT possible at all.
group: Content model
order: 26
updated: 2026-09-20
---

`buildSnapshot` is one immutable Sanity Knowledge Base build, captured as a document. It is the
type that makes the product possible: two snapshots can be diffed, so a knowledge base stops
being a corpus you read and becomes a time series you can ask questions of.

The whole document type is `readOnly: true`. Snapshots are an append-only ledger and nothing in
the UI may edit one.

## Fields

| Field | Type | Notes |
| --- | --- | --- |
| `kbId` | string | Which Knowledge Base this build belongs to. |
| `buildNumber` | number | Monotonic per Knowledge Base. |
| `builtAt` | datetime | When Sanity produced the build. |
| `outlineHash` | string | Content address of the outline. **Equal hashes mean nothing changed.** |
| `entryCount` | number | How many entries the build carried. |
| `conflicts` | array of `conflict` | Raised by the build itself where sources disagree. |
| `instructionsActive` | array of refs to `instruction` | Standing decisions in force for this build. |
| `instructionsArchived` | array of refs to `instruction` | Decisions Sanity archived because an anchoring source changed. |

> [!NOTE]
> In the Go model, `EntryCount()` is derived from the claim slice rather than stored, so it can
> never disagree with the claims actually captured. The Sanity document stores the number
> because a Studio list has nothing to derive it from.

## The conflict object

```ts
{
  path: string,                       // the claim path the sources disagree about
  competingValues: [
    {
      statement: text,
      value: number,
      unit: string,
      source: reference to source,
    }
  ],
  resolvedBy: reference to instruction  // set when a human adjudicates
}
```

Most systems treat build conflicts as noise to be suppressed. Here they are the product: they
are what the [Conflict Room](/docs/apps/console) renders, what makes the
[Dissent agent](/docs/apps/dissent) refuse to answer, and what the `no_unresolved_conflict`
gate check blocks on.

When a human adjudicates, DRIFT writes a standing
[instruction](/docs/content-model/instruction) back into the Knowledge Base and points
`resolvedBy` at it, so the **next** build is correct by construction.

## Content addressing

The hash covers what the endpoint actually returned — the raw outline text plus each entry's
raw Markdown, in sorted path order.

```text
sha256( outline.raw + Σ entry.raw  ordered by path )
```

Two consequences:

- **If nothing changed, the hash is identical and the diff is skipped entirely.** Rebuilds are
  frequent and mostly uneventful.
- **Re-running any historical diff reproduces byte-identical output**, because the inputs are
  pinned by content rather than by timestamp. The golden-file test in the Go engine depends on
  this property.

The hash deliberately covers the raw text rather than the parsed claims: if the parser changes,
that should be visible as a different snapshot rather than silently absorbed.

## Instruction lifecycle

`instructionsArchived` is not bookkeeping. Sanity auto-archives an instruction when its
anchoring source changes, which means an entry in this array is a signal that **a governing
decision has become unmoored from its justification** — and the differ turns it into an
`instruction_archived` drift event. See
[Conflicts and instructions](/docs/concepts/conflicts-instructions).

## Preview

```ts
prepare: ({n, builtAt, count}) => ({
  title: `Build ${n}`,
  subtitle: `${count ?? 0} entries · ${builtAt ?? 'unknown time'}`,
})
```

## Example

```json
{
  "_type": "buildSnapshot",
  "_id": "build.47",
  "kbId": "kb.northwind",
  "buildNumber": 47,
  "builtAt": "2026-09-19T16:40:00Z",
  "outlineHash": "sha256:9f2c1e…",
  "entryCount": 41,
  "conflicts": [
    {
      "path": "support/returns",
      "competingValues": [
        {"statement": "45 days", "value": 45, "unit": "days", "source": {"_ref": "source.returns-policy-v4"}},
        {"statement": "30 days", "value": 30, "unit": "days", "source": {"_ref": "source.help-centre-returns"}}
      ]
    }
  ],
  "instructionsActive": [],
  "instructionsArchived": []
}
```
