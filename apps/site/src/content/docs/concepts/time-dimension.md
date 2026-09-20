---
title: The time dimension
description: Why an immutable Knowledge Base build turns a corpus into a time series — the one property the whole product is built on.
group: Concepts
order: 10
updated: 2026-09-20
---

Everything DRIFT does follows from one sentence in Sanity's Knowledge Base documentation:

> Entries belong to a build and cannot be edited by hand.

Read as a limitation, that sentence is an inconvenience — you cannot patch a bad entry, you
have to fix the source and rebuild. Read as a guarantee, it is the foundation of a product.

## What immutability buys

If an entry cannot be edited after its build, then a build is a **timestamped, immutable
snapshot of what an organisation currently asserts to be true**. And two snapshots can be
compared.

That single step changes the category of the thing you are holding:

| A corpus | A time series |
| --- | --- |
| You read it | You diff it |
| Answers a question about now | Answers a question about change |
| "What is our returns policy?" | "When did it change, and what still says the old thing?" |
| Retrieval | Ledger |

The first column is what almost every Knowledge Base integration does, because it is what the
product's own pitch leads with: grounded answers with citations. The second column is empty,
and it is the one with the interesting questions in it.

## The question nobody else can answer

> What did this organisation stop believing since last Tuesday, and which published pages are
> still asserting the old thing?

To answer that you need four things simultaneously, and no other content platform provides
them together:

1. **Immutable, timestamped snapshots** so that two points in time are comparable at all.
2. **Contradiction surfaced rather than averaged away** — when two sources disagree you need to
   know, not to receive whichever one ranked higher.
3. **Decisions that outlive a rebuild, and expire when their basis changes.**
4. **A provably complete dependency walk** over the same content, so that "which pages are
   affected?" has an exact answer rather than a plausible one.

Sanity provides all four: Knowledge Base builds, build-time conflict detection, Instructions
with source-anchored auto-archival, and real references queried with GROQ. The full mapping is
in [Why Sanity specifically](/docs/sanity/why-sanity).

## How DRIFT uses it

The engine captures each build as a [`buildSnapshot`](/docs/content-model/build-snapshot)
document, content-addressed over exactly what the Context MCP endpoint returned. Successive
snapshots feed [the differ](/docs/engine/differ), which emits one
[`driftEvent`](/docs/content-model/drift-event) per claim that moved. A stream of those events
is the changelog of organisational truth.

```text
build 46 ──┐
           ├──→ differ ──→ driftEvent{kind, before, after, confidence, detectedBy}
build 47 ──┘
```

Because a snapshot is content-addressed rather than timestamp-addressed, two consequences
follow that matter operationally:

- **Identical hash, no work.** Knowledge Base rebuilds are frequent and mostly uneventful. If
  the outline hash is unchanged, the whole diff is skipped.
- **Any historical diff can be re-run and produces byte-identical output**, because the inputs
  are pinned by content. The console can offer "re-run this diff" as evidence rather than as a
  slogan, and the [golden-file test](/docs/engine/differ) depends on exactly this.

## Why the hash covers raw text

The snapshot hash is taken over the _raw_ outline text and each entry's _raw_ Markdown, in
sorted path order — not over the parsed claims.

That is deliberate. If the claim parser changes, the same Knowledge Base content should produce
a _different_ snapshot, visibly, rather than having the change silently absorbed into identical
output. A tool whose own interpretation of the data can shift without anyone noticing has no
business telling other people their content is drifting.

## What this does not claim

Time travel here means folding an append-only [event log](/docs/engine/eventlog) up to a
sequence number, and walking the `supersededBy` chain between claims. It does not mean
arbitrary point-in-time reconstruction of a Sanity dataset — the Content Lake's own history
features are the right tool for that, and DRIFT does not duplicate them.

## Read next

- [Claims](/docs/concepts/claims) — what the unit of belief actually is
- [Build snapshots](/docs/content-model/build-snapshot) — the document, field by field
- [ADR-0002](/docs/decisions/knowledge-base-as-time-series) — the decision record
