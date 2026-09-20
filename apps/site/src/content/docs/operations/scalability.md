---
title: Scalability and failure modes
description: Eight properties, and the rule that matters most — never fabricate on partial failure.
group: Operations
order: 83
updated: 2026-09-20
---

| Property | How |
| --- | --- |
| Immutable, content-addressed builds | A snapshot is hashed over the raw outline and entries. Equal hashes mean the diff can be skipped entirely. |
| Idempotent processing | Approval is keyed on `(assertion, build, actor)`. Tested with 25 and 40 concurrent writers. |
| Replayable | Folding the event log again is the same operation as reading it. |
| Bounded concurrency | The graph walk fans out under a semaphore; MCP reads chunk at the documented 20-path ceiling. |
| Never fabricate on partial failure | See below. |
| Retries, backoff, circuit breaking | `internal/resilience`. Only operations marked `Retryable` are retried; `Retry-After` is honoured; backoff is interruptible; the breaker admits one probe in half-open. |
| Atomic publication | Page text and assertion stamp travel in **one** Sanity transaction — [ADR-0011](/docs/decisions/one-transaction-for-page-and-assertion). |
| Observability | Correlation IDs on every request and event, echoed in the `X-Correlation-ID` header. Structured logs throughout. |

## Never fabricate on partial failure

This is the rule the system is most careful about, because every violation of it produces
confident, wrong output — which is worse than an outage.

| Situation | What happens | What must never happen |
| --- | --- | --- |
| A short read from the Knowledge Base | **Aborts the snapshot** | A snapshot with fewer claims, which diffs as mass retirement |
| Blast radius cannot be computed | The gate **fails closed** | Publishing against an unknown dependency set |
| `Reconcile` cannot complete | Returns an **error** | A plausible zero |
| A mutation reports one patch where two were sent | Treated as an **error** | Recording a successful publication |

The first row is the one with teeth. A snapshot missing half its entries, diffed against a
complete one, is indistinguishable from an organisation that retired half its policies
overnight — and the system's response to mass retirement is to flag every page that depends on
any of them. A transport error would become a red screen and a hundred false corrections.

## Skipping the work

Knowledge Base rebuilds are frequent and mostly uneventful. The content address makes the common
case free:

```text
outlineHash(N) == outlineHash(N-1)   →  no diff, no graph walk, no events
```

## Bounded fan-out

A claim can have many dependents, and a diff can name many claims. The graph walk runs under a
semaphore rather than launching a goroutine per claim: an unbounded fan-out against a hosted API
is a self-inflicted rate limit, and the failure mode is indistinguishable from an outage.

MCP reads chunk at the documented ceiling of 20 paths per call.

## Idempotency under concurrency

Approval is keyed on `(assertion, build, actor)` in the [event log](/docs/engine/eventlog).
Approving twice records once and publishes once — a double click, a retried request, a replayed
queue message.

Including the build in the key means re-approving **after a rebuild** is correctly treated as a
new decision, because the gate may reach a different answer against a different build.

Tested with 25 and 40 concurrent writers.

## Retries that cannot double-publish

Only operations the caller marks `Retryable` are retried. A publication retried blindly could
publish twice, so the write client sends a **deterministic transaction ID** — a repeat is the
_same_ transaction rather than a second one.

Backoff is interruptible: a cancelled context stops the wait immediately, which is the
difference between a thirty-second shutdown and an instant one.

## The poll tick

The engine owns it, not a Scheduled Function. Sanity Functions cap at 10 seconds by default,
where a full capture plus diff plus blast-radius walk can exceed that on a large content lake —
and the engine already holds the MCP client and the previous snapshot in memory, so a poll is a
hash comparison against state it has. See [ADR-0006](/docs/decisions/engine-owns-the-poll-tick).

> Drift that goes unnoticed for five minutes is not a problem. Drift that goes unnoticed for
> five months is the problem this product exists for.

## Related

- [resilience, telemetry and the pipeline](/docs/engine/resilience)
- [Security properties](/docs/operations/security)
- [Known limits](/docs/operations/limits)
