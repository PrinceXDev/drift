---
title: The content model
description: Eight document types. Read them in this order and the product explains itself.
group: Content model
order: 20
updated: 2026-09-20
---

The content model **is** the product. Every clever behaviour in DRIFT is a consequence of a
modelling decision rather than of code, which is why this section is a reference to eight
document types rather than to a class hierarchy.

| Type | What it is |
| --- | --- |
| [`source`](/docs/content-model/source) | What the organisation has written down |
| [`claim`](/docs/content-model/claim) | One atomic fact, mirrored from a Knowledge Base entry |
| [`contentPage`](/docs/content-model/content-page) | What the organisation has published |
| [`assertion`](/docs/content-model/assertion) | A place where something depends on a claim — **the edge we walk** |
| [`surface`](/docs/content-model/surface) | A published place that can carry one — a page, or an agent |
| [`buildSnapshot`](/docs/content-model/build-snapshot) | One immutable Knowledge Base build — **the time dimension** |
| [`driftEvent`](/docs/content-model/drift-event) | The diff between two builds, per claim — **the changelog** |
| [`instruction`](/docs/content-model/instruction) | A standing decision written back into the Knowledge Base |

## How they fit together

```text
source ────────────┐
  authority 1..5   │ cited by
                   ▼
              claim ◄──────────── buildSnapshot
                │  ▲                (immutable, content-addressed)
     references │  │ subject of
                │  └──────────── driftEvent ──► workflow instance
                ▼
           assertion ──► contentPage   (a paragraph to patch)
                    └──► surface       (an agent, a feed, a template)

instruction ──anchored to──► source    (archived when the source changes)
```

## Four rules that hold across all eight

**Sources are the only writable truth.** Knowledge Base entries are immutable and belong to a
build, so the only way to change what the organisation asserts is to change a source or add an
instruction.

**Provenance is never authored.** `firstSeenBuild`, `lastVerifiedBuild`, `lastChangedBuild`,
`verifiedAgainstBuild`, `state` and `supersededBy` are all read-only and written by the engine.
A provenance field an editor can type into is one that will eventually be wrong.

**Two types are read-only documents entirely.** `buildSnapshot` and `driftEvent` are
observations about immutable inputs. Correcting one means correcting the detector and re-running
a reproducible diff, not editing the record.

**Enumerations live in one file.** `packages/schema/src/constants.ts` is the single source of
truth for every enumerated value. The Go engine mirrors them in `pkg/driftv1/enums.go`, and a
contract test fails the build if the two diverge — because the irony of a knowledge-integrity
tool whose own types silently drift was not lost on anybody.

## The shared vocabulary

```ts
export const CLAIM_STATUSES = ['active', 'retired', 'contested'] as const
export const CLAIM_TIERS = ['core', 'standard', 'peripheral'] as const
export const SURFACE_KINDS = ['page', 'agent', 'feed', 'template'] as const
export const ASSERTION_STATES = ['verified', 'stale', 'contradicted', 'orphaned'] as const
export const DRIFT_KINDS = [
  'added', 'retired', 'contradicted',
  'weakened', 'citation_broken', 'instruction_archived',
] as const
export const WORKFLOW_STATES = [
  'detected', 'triage', 'drafting', 'review', 'published', 'dismissed',
] as const
export const SOURCE_KINDS = ['policy', 'spec', 'contract', 'page'] as const
export const INSTRUCTION_STATUSES = ['active', 'archived'] as const
```

`asOptions()` turns any of these tuples into Sanity's `{title, value}` option list, so a Studio
dropdown cannot offer a value the engine does not know about.

## Where the types live

```text
packages/schema/src/
  index.ts                 the eight, exported in reading order
  constants.ts             every enumerated value, once
  documents/
    source.ts   claim.ts    contentPage.ts  assertion.ts
    surface.ts  buildSnapshot.ts  driftEvent.ts  instruction.ts
```

The package typechecks against `sanity@6.15.0` and is consumed by the Studio, by the seed
generator, and by the contract test that compares it against the Go enums.
