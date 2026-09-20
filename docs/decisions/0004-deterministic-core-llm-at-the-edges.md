# ADR-0004 — Deterministic core, LLM only at the edges

**Status:** accepted · **Date:** 2026-09-19

## Context

The easy version of this product asks a model "what changed between these two knowledge
bases?" and renders the answer. That version cannot be trusted, cannot be tested, and gives
a user no way to check its work — which is fatal for a tool whose entire pitch is integrity.

## Decision

No LLM call may occur in `internal/differ` or `internal/graph`. Those packages are pure
functions over data, golden-file tested, and produce byte-identical output for identical
input.

The model is confined to exactly three places:

1. **Claim extraction** — proposing atomic claims from Knowledge Base entry prose. Output
   enters a review queue; it never writes to the ledger directly.
2. **Remediation drafting** — an Agent Action `Transform` rewriting the minimum span of text
   at an assertion's declared `fieldPath`. Output is always a draft.
3. **Dissent** — the Path One agent, which presents disagreement rather than resolving it.

Every drift event carries a `confidence` and a `detectedBy`. A change detected by comparing
two typed values reports `1.0` / `typed_value`. A change inferred from prose reports `0.55` /
`semantic` and is routed to a human. The two are never conflated.

## Consequences

- "Why is this page flagged?" resolves to a reference path and a numeric comparison — two
  things a human can verify in five seconds without trusting a model at all.
- Claims need typed `value` + `unit` fields to get the deterministic path, which puts real
  pressure on the content model. That is the point: it is the same pressure that makes
  structured content worth having.
- Untyped prose claims are genuinely weaker, and the system says so rather than hiding it.
- Determinism is a **product** guarantee, not an implementation detail: the console can offer
  "re-run this diff" as evidence, which is why `TestDiff_IsDeterministic` exists.
