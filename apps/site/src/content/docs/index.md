---
title: DRIFT documentation
description: A knowledge-integrity control plane built on Sanity Knowledge Bases — every moving part, written down.
group: Start here
order: 0
updated: 2026-09-20
---

DRIFT watches a Sanity Knowledge Base rebuild itself, diffs build _N_ against build _N−1_ into
a claim-level changelog, traces every retired or contradicted claim through a reference graph
to the published content that depends on it, and routes that content into a workflow where an
agent drafts the correction and a human approves it.

It does not answer questions. It answers a different one:

> What did this organisation stop believing — and what is still saying the old thing?

## Read these five pages first

If you have twenty minutes and want the whole idea, this is the path:

1. **[The time dimension](/docs/concepts/time-dimension)** — why an immutable build makes a
   knowledge base into a time series, and why that is the only interesting property nobody was
   using.
2. **[Claims](/docs/concepts/claims)** — what an atomic fact is, and why a typed `value` and
   `unit` are the difference between a provable contradiction and a model's opinion.
3. **[Assertions and blast radius](/docs/concepts/blast-radius)** — the single most important
   design decision in the system, and the one GROQ query the whole product rests on.
4. **[The publication gate](/docs/engine/gate)** — why "approve" cannot mean "publish what was
   drafted", and the nine checks that make it mean something else.
5. **[The build log](/docs/operations/build-log)** — an unreconstructed record of what broke,
   including the parts where the documentation was wrong and the parts where we were.

## How this documentation is organised

**Concepts** explain the model: claims, assertions, surfaces, builds, drift, instructions,
lineage. Read them in order and the product explains itself, because the content model _is_ the
product.

**Content model** is the field-by-field reference for the eight Sanity document types —
every validation rule, every read-only field, and why each one is read-only.

**The engine** documents the Go service package by package: the ledger that turns a live
Knowledge Base into a comparable snapshot, the differ, the graph walk, the gate, the event log,
the authorization spine, and the three places a language model is allowed to run.

**API** is the HTTP surface: fifteen routes, their permissions, their request and response
shapes, the SSE stream, and the error contract.

**Sanity integration** covers the parts that touch the platform — Context MCP, tokens,
Knowledge Base corpus layout, Agent Actions, Functions, Blueprints and Workflows — including
the setup mistakes that cost the most time.

**Operations** is how to run it: environment variables, fixture mode, CI, the security and
scalability properties and how each is enforced, the honest build log, and what is still not
proven.

**Decisions** is the thirteen architecture decision records, each one a choice that could
reasonably have gone the other way.

> [!NOTE]
> Every code reference in these pages points at a real file in the repository. Where a claim
> about behaviour is not yet verified against a live Sanity endpoint, the page says so in as
> many words rather than rounding it up.
