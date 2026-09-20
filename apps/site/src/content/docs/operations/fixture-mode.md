---
title: Fixture mode
description: The whole system, no credentials, no network — and the one thing it refuses to pretend to do.
group: Operations
order: 81
status: verified
updated: 2026-09-20
---

```bash
cd services/drift-engine && go run ./cmd/engine -fixtures
```

Fixture mode runs the **real** engine against a committed demo corpus: the real differ, the real
graph walk, the real gate, the real authorization, the real event log. Nothing is stubbed except
the two things that require an account — the Knowledge Base read and the Content Lake write.

## The four demo principals

| Token | Actor | Roles |
| --- | --- | --- |
| `tok_viewer` | Viewer | `viewer` |
| `tok_editor` | Editor | `editor` |
| `tok_steward` | Steward | `steward` |
| `tok_agent` | Agent | `agent`, marked unattended |

Sign into the Control Room as each in turn and watch least privilege work on one screen. The
console is not mocking this — it calls `GET /v1/me` and renders what the engine says.

## One definition of the demo

`internal/seeddata` defines the demo exactly once, and `cmd/seed` emits two artefacts from it:

```bash
go run ./cmd/seed
```

- `sanity/seed/northwind.ndjson` — 35 documents for `sanity dataset import`
- `packages/fixtures/src/fixtures.json` — the same data for the console and the public site

A fixture drift guard in [CI](/docs/operations/ci) regenerates and fails if the committed copy
differs, so the two cannot diverge quietly.

## What it refuses to pretend

> [!DANGER]
> **Fixture mode publishes nothing, loudly.**

Without `SANITY_WRITE_TOKEN` the engine gates and audits an approval, records the decision, and
then refuses to claim a publication happened.

The alternative was considered and rejected: returning success with no write would have made the
demo smoother and the audit trail a lie. In a product whose entire pitch is that its records can
be believed, that is not a trade available to us.

## What you can see anyway

Everything except the final write:

- the full [drift feed](/docs/concepts/drift-events) between builds 46 and 47
- the [conflict](/docs/concepts/conflicts-instructions) between the policy and the help centre
- complete [lineage](/docs/concepts/lineage) for every claim
- the [blast radius](/docs/concepts/blast-radius) — seven pages and one agent
- a real [Agent Actions](/docs/engine/agent) draft, if `SANITY_SCHEMA_ID` and a token are set
- the [gate](/docs/engine/gate) refusing on `no_unresolved_conflict`
- the hash-chained [audit trail](/docs/engine/eventlog), including the refusal

## Running the workflow against fixtures

```bash
pnpm workflow:demo
```

The workflow side runs against an in-memory client; the engine is the real
`@sanity/workflow-engine`, the real deployed definition, and the real `fireAction`. The run
exits non-zero if the agent ever gets through. See
[The remediation workflow](/docs/sanity/workflows).

## Why `published` is unreachable here

`published` means _corrections are live_. There is no project to write to, and the demo claim
has an unresolved source disagreement that the gate correctly blocks on.

That is correct rather than missing. A demo that reached `published` with nothing published
would be demonstrating the opposite of the product.
