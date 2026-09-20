---
title: ADR-0002 — Treat the Knowledge Base as a time series, not a corpus
description: The obvious way to build on Sanity Context is to point an agent at a Knowledge Base and answer questions with citations. Within 24 hours of the challenge opening, five of the eleven public …
group: Decisions
order: 92
status: stable
updated: 2026-09-19
---
## Context

The obvious way to build on Sanity Context is to point an agent at a Knowledge Base and
answer questions with citations. Within 24 hours of the challenge opening, five of the
eleven public submissions were doing exactly that. It is what the product's own
documentation leads with, so it is what everyone reaches for.

Reading the Knowledge Base documentation closely, three properties stand out that nobody
appears to be using:

1. A build **detects conflicts** when the same fact appears with different values across
   sources, and raises them as issues for human review.
2. **Instructions** are standing decisions that persist between builds, and are
   **automatically archived when their anchoring source changes**.
3. **Entries belong to a build and cannot be edited by hand.**

Property 3 is the interesting one. Immutability is usually framed as a constraint — you
cannot fix a bad entry directly, you have to fix the source. But immutability is also what
makes two builds *comparable*.

## Decision

Treat each Knowledge Base build as an immutable snapshot of what the organisation currently
asserts, capture it as a `buildSnapshot` document, and make the **diff between successive
builds** the primary object in the system.

DRIFT does not answer questions about content. It answers a question no other tool can:
*what did this organisation stop believing, and what is still saying the old thing?*

## Consequences

- The product's core output is a changelog (`driftEvent`), not an answer.
- There is no chat interface. Adding one would actively weaken the positioning.
- We depend on builds actually being immutable and on being able to read successive builds.
  If Sanity ever made entries mutable, the thesis would need revisiting.
- Build cadence is not under our control, which constrains demo timing. Measured early.
- It gives us a defensible answer to "could this be built without Sanity?" — no, because no
  other system provides conflict-checked, source-cited, immutable knowledge builds *and* a
  queryable reference graph over the same content.
