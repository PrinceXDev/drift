---
title: Engine architecture
description: A Go service in fifteen packages — what each one owns, and the one rule that decides where code goes.
group: The engine
order: 30
updated: 2026-09-20
---

`services/drift-engine` is the deterministic core. It reads a Knowledge Base over Context MCP,
diffs successive builds, walks the reference graph, gates publications, and appends an
audit trail. It is a plain Go service with no framework.

## The rule that decides where code goes

**Everything downstream of the ledger is a pure function over data. Everything upstream is
network and Markdown.**

That seam is what makes the interesting parts testable without a Sanity project, and it is why
the ledger is where an external, prose-shaped system becomes something the core can diff.

## The packages

```text
cmd/
  engine/       HTTP API + poll ticker
  seed/         emits NDJSON for Sanity, and fixtures for the UIs

internal/
  mcp/          Context MCP client — initial_context, knowledge_base_read
  ledger/       build capture, content addressing, claim lineage
  differ/       the belief diff. no LLM. golden-file tested
  graph/        blast radius via Sanity references
  pipeline/     the three above, wired together
  gate/         9 deterministic publication checks. no LLM
  authz/        roles, capability grants, hashed token registry
  eventlog/     the append-only spine: audit + idempotency + replay + time travel
  remediation/  the orchestrated slice: authorize → gate → record → publish
  agent/        Agent Actions drafter — the only LLM call in the engine
  contentlake/  the Sanity write client — one atomic transaction per publication
  dissent/      the Dissent agent — finds disagreement structurally, no LLM
  surface/      the dependency registry — pages, agents, feeds, templates
  api/          HTTP + SSE, per-route authorization
  telemetry/    correlation IDs, redaction, fingerprinting
  resilience/   retry, backoff, jitter, circuit breaker
  seeddata/     the demo, defined exactly once

pkg/driftv1/    the exported contract — types and enums, mirrored to TypeScript
```

## Data flow

```text
Context MCP ──► ledger ──► BuildSnapshot(N)
                              │
                 BuildSnapshot(N-1)
                              │
                              ▼
                           differ ──► []DriftEvent
                              │
                              ▼
                           graph  ──► blast radius per event
                              │
                              ▼
                          pipeline ──► routing policy (core / confidence)
                              │
              ┌───────────────┴───────────────┐
              ▼                               ▼
        workflow instance                 SSE stream ──► console
              │
        human triage → agent drafts → human approves
              │
              ▼
       remediation: authorize → gate → record → publish → record
              │
              ▼
        contentlake: ONE transaction (page text + assertion stamp)
```

## Where a model is allowed to run

Once, in `internal/agent`, and only to rewrite a single sentence it was handed. Everything in
the path that *decides* anything — differ, graph, gate, dissent — is deterministic and tested
against golden files. See [Determinism](/docs/concepts/determinism).

## Cross-cutting concerns

Two packages are used by almost everything else:

- **`telemetry`** mints a correlation ID at the edge and carries it through authorization, the
  gate, the event log and the logs. Its logger refuses free text, so page content and
  credentials cannot be leaked into a log aggregator by accident.
- **`resilience`** holds the retry, backoff and circuit-breaker primitives for the three
  outbound dependencies — Context MCP, Agent Actions, and the Content Lake mutation API. Only
  operations the caller marks `Retryable` are retried.

## The exported contract

`pkg/driftv1` is the boundary. Everything in it is mirrored into TypeScript for the console and
the Sanity schema, and the mirror is checked by a contract test rather than maintained by hand:

```go
// The irony of a knowledge-integrity tool whose own types silently diverge was
// not lost on us.
```

## Running it

```bash
cd services/drift-engine && go run ./cmd/engine -fixtures
```

```bash
go test ./...
```

243 tests across 15 packages, including a golden-file diff, concurrency tests with 25 and 40
writers, and an exhaustive check that no combination of roles lets an agent publish.
