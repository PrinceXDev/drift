---
title: Determinism and the three model calls
description: Where determinism ends and AI begins, written down — and why the boundary is placed exactly there.
group: Concepts
order: 17
updated: 2026-09-20
---

The easy version of this product asks a model "what changed between these two knowledge
bases?" and renders the answer. That version cannot be trusted, cannot be tested, and gives a
user no way to check its work — which is fatal for a tool whose entire pitch is integrity.

So the boundary is drawn explicitly, and it is drawn in an unusual place.

## Deterministic: no model runs here

| Capability | Package | Tested by |
| --- | --- | --- |
| Claim comparison | `internal/differ` | Golden files — byte-identical output for the same two builds |
| Dependency traversal | `internal/graph` | Unit tests over a fixture graph |
| Blast-radius calculation | `internal/graph` | Unit tests, including the empty and fan-out cases |
| Publication gates | `internal/gate` | A test per check, plus fail-closed cases |
| Disagreement detection | `internal/dissent` | Conflict fixtures, including hostile ones |

Everything in that table is a comparison between values that already exist. A judge, an
auditor, or a nervous head of support can check any flag on this system by comparing two
numbers, without trusting a model at all.

That is what "show your working" means here, and it is why the diff path is defended so
aggressively: the moment a model decides _that_ something drifted, every downstream artefact
becomes an assertion nobody can verify.

## The model runs in exactly three places

Each output carries evidence, source references, a build ID, a confidence and a detector.

### 1. Claim extraction

Turning entry prose into a typed claim — `45`, `days` — is genuinely a language problem.
Proposals enter a review queue rather than the ledger.

### 2. Correction drafting

Given a published sentence and the claim that superseded it, rewrite that one sentence. It is
run through Sanity **Agent Actions** as a `Transform`, and it cannot publish. Three independent
guarantees stand behind that:

1. `noWrite: true` on every Transform call — the action returns the rewritten document without
   mutating anything. This is the strongest of the three because it is enforced by Sanity, not
   by us.
2. `target.path` is scoped to the single field the assertion declares. Even if `noWrite` were
   dropped, the blast radius of a bad draft is one paragraph.
3. The only workflow action routing into `published` is gated by
   `roles: ['administrator', 'editor']`, and an unattended agent holds no role.

Belt, braces, and a second pair of braces. The product's entire claim is that a human approves
every correction, so that claim should survive any one of these being misconfigured.

### 3. Conflict explanation

Phrasing only. The conflict itself is structural — the Knowledge Base raised it at build time,
and the engine read it.

## What the model is never permitted to do

- decide **that** something drifted
- decide **which** pages are affected
- decide **whether** a correction may publish
- set a confidence number
- write to the Content Lake

## Prompt injection

Indexed documents are attacker-influenced content in the general case: a supplier PDF, a wiki
page, a contract clause somebody pasted in. So document text reaches the model as typed
`instructionParams`, never concatenated into an instruction string, and there is a hostile
fixture in the test suite that asserts it.

Structurally, an injected instruction has nowhere useful to go even if it lands: the drafter
cannot publish, cannot widen its own scope, and cannot reach the workflow edge that publishes.
Defence in depth is the point — the input filter is the weakest of the layers, not the only one.

## Why this is the interesting part

A tool that flags content as stale is making an accusation. If the accusation is produced by a
model, the only available response is to trust it or ignore it, and at scale people ignore it.

If the accusation is produced by subtraction — `45 − 30`, against two immutable builds, with the
reference walk that found the pages printed beside it — the response is to check it, agree, and
act. The deterministic core is not an engineering preference. It is what makes the output
actionable.

## Read next

- [The differ](/docs/engine/differ)
- [The Agent Actions drafter](/docs/engine/agent)
- [ADR-0004](/docs/decisions/deterministic-core-llm-at-the-edges)
