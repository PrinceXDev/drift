---
title: Why Sanity specifically
description: Four things have to be true at once. Remove Sanity and this is not a worse product — it is a six-month data-engineering project.
group: Sanity integration
order: 60
updated: 2026-09-20
---

DRIFT is not a general-purpose tool that happens to have a Sanity adapter. Four properties have
to hold simultaneously for it to work at all, and no other product provides them together.

| Requirement | Sanity feature |
| --- | --- |
| Immutable, timestamped knowledge snapshots | Knowledge Base builds — entries belong to a build and cannot be hand-edited |
| Contradiction surfaced, not averaged away | Build-time conflict detection |
| Decisions that outlive a rebuild — and expire when their basis changes | Instructions, auto-archived when their anchoring source changes |
| A **provably complete** dependency walk over the same content | Sanity references + GROQ |

## The last row is the crux

Every alternative approach is forced into semantic search over prose, which can only ever guess
which pages are affected.

A correction you cannot prove is complete is a correction nobody can safely approve. That is
not a quality difference; it is the difference between a product and a demonstration.

Because the dependency is a real reference in a real document, the walk is:

```groq
*[_type == "assertion" && references($claimId)]
```

## The first row is what makes the product conceivable

"Entries belong to a build and cannot be edited by hand" is the sentence the entire design
rests on. Without immutability, two builds are not comparable, there is no time dimension, and
there is nothing to diff. See [The time dimension](/docs/concepts/time-dimension).

## The second row is usually thrown away

Most retrieval systems treat a contradiction between sources as a ranking problem: score both,
return the winner, move on. The disagreement disappears into a confident sentence.

Sanity raises it at build time as a **conflict**, with the competing values attached. DRIFT
renders that as a product surface — the Conflict Room — and the
[Dissent agent](/docs/apps/dissent) refuses to answer over an unresolved one.

## The third row is the one nobody asks for

Instructions are standing decisions written in plain language. Sanity archives one
automatically when a source it is anchored to changes.

That gives **decision expiry for free**: a rule that has outlived its justification stops
applying and surfaces as an `instruction_archived` drift event. Organisations accumulate
standing decisions with no expiry mechanism at all, and the cost is paid years later.

## What the rest of the platform contributes

| Capability | Used for |
| --- | --- |
| Context MCP | Reading the Knowledge Base — [`internal/mcp`](/docs/engine/mcp) |
| Agent Actions | Drafting one corrected sentence, `noWrite`, schema-aware |
| Workflows | The human-in-the-loop remediation path, with role-gated edges |
| Functions | Reacting the instant an editor changes a page |
| Blueprints | Deploying that function |
| App SDK | The Control Room, authenticated as a real Sanity user |
| Content Lake + GROQ | The graph, and the atomic publish |

Each of those is load-bearing rather than a checkbox: remove any one and a specific,
describable capability disappears.

## The honest version

Two things are worth stating plainly rather than glossed:

- Scheduled Functions are **not deployable via Blueprints** today, so the poll tick lives in the
  engine. See [Functions and Blueprints](/docs/sanity/functions).
- Several stage-level Workflow properties that appear in write-ups do not exist in
  `@sanity/workflow-engine@0.33.0`. Gating is expressed on actions via `roles`. See
  [The remediation workflow](/docs/sanity/workflows).

Both are recorded with timestamps in [the build log](/docs/operations/build-log).
