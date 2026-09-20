---
title: Glossary
description: Every term this documentation uses in a specific sense, defined once.
group: Reference
order: 110
updated: 2026-09-20
---

## Assertion

A specific place on a published surface where a [claim](#claim) is expressed, held as a Sanity
document with a real reference to that claim. **The edge the blast-radius walk follows.** An
assertion addresses either a page (with a block key) or a [surface](#surface), never both.
→ [Assertions and blast radius](/docs/concepts/blast-radius)

## Authority

An integer 1–5 on a [source](#source), used to resolve a [conflict](#conflict) deterministically
when two sources disagree. The higher-authority source wins by default; a human is asked only
when authorities tie. → [source](/docs/content-model/source)

## Blast radius

Every published place that still asserts a claim that has changed. Computed by one GROQ query
over real references — `*[_type == "assertion" && references($claimId)]` — so it is exact rather
than inferred. Precomputed at diff time and **recomputed at the gate**.

## Build (Knowledge Base build)

One compilation of a Sanity Knowledge Base. Entries belong to a build and cannot be hand-edited,
which is what makes two builds comparable. → [The time dimension](/docs/concepts/time-dimension)

## Build snapshot

A build captured as a DRIFT document, content-addressed over the raw outline and entries.
→ [buildSnapshot](/docs/content-model/build-snapshot)

## Claim

One atomic, checkable fact mirrored from a Knowledge Base entry, with an optional typed `value`
and `unit`. Never authored by hand. → [Claims](/docs/concepts/claims)

## Confidence

A number 0–1 on a [drift event](#drift-event) recording **how much of the conclusion came from
arithmetic rather than prose**. `1.0` means both builds carried a comparable typed value. Never
produced by a model.

## Conflict

Raised by the Knowledge Base build itself when the same fact appears with different values
across sources. Rendered as a product surface rather than suppressed as build noise.
→ [Conflicts and instructions](/docs/concepts/conflicts-instructions)

## Content address

A hash over what an endpoint actually returned, used as a snapshot's identity. Equal hashes mean
nothing changed and the diff can be skipped; they also make any historical diff reproducible
byte-for-byte.

## Correctable

Whether a drafted correction can be published to a surface at all. Only `page` is — everything
else is downstream of the Knowledge Base and is fixed by fixing the claim.

## Detector

Which mechanism found a change: `outline_presence`, `typed_value`, `citation_graph`,
`instruction_lifecycle`, or `semantic`. Deterministic detectors are tried first.

## Dissent

The Path One agent, which answers only once its sources agree and writes the adjudication back
as an [instruction](#instruction). → [Dissent](/docs/apps/dissent)

## Drift event

The diff between two builds, for one claim. A stream of them is the changelog of organisational
truth. → [Drift events](/docs/concepts/drift-events)

## Gate

The deterministic checkpoint in front of publication: nine checks, re-derived at the moment of
approval. No model runs in it, and it fails closed.
→ [The publication gate](/docs/engine/gate)

## Grant

A value returned by `Authorize` with no exported constructor. Handlers take one as an argument,
so a route that skipped authorization does not compile.
→ [authz](/docs/engine/authz)

## Instruction

A standing decision written back into the Knowledge Base in plain language, anchored to the
sources it governs. Sanity auto-archives one when an anchoring source changes, which gives
decision expiry for free. → [instruction](/docs/content-model/instruction)

## Lineage

Three build stamps on a claim: first seen, last verified **unchanged**, last changed. Written by
the ledger on every capture, never authored. → [Claim lineage](/docs/concepts/lineage)

## Outline

What `initial_context` returns: entry paths plus one-line summaries, with `[core]` /
`[peripheral]` tags. Small enough to hold in context for a whole conversation.

## Path

A claim's identity, mirroring the Knowledge Base outline path — `support/returns`. Lowercase and
slash-separated, enforced by schema validation.

## Source

An authoritative input a Knowledge Base is built from, and the only writable truth in the
system. → [source](/docs/content-model/source)

## Surface

A published place that can depend on a claim: a `page`, an `agent`, a `feed` or a `template`.
The list exists to answer "how would you correct this?"
→ [Surfaces](/docs/concepts/surfaces)

## Tier

`core`, `standard` or `peripheral`, mirroring the Knowledge Base outline tagging and used as a
routing signal — core drift always pages a human.

## Workflow state

Where a drift event is in `drift-remediation`: `detected`, `triage`, `drafting`, `review`,
`published`, `dismissed`. → [The remediation workflow](/docs/sanity/workflows)
