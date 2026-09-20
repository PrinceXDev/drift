---
title: resilience, telemetry and the pipeline
description: Retry, backoff and circuit breaking; correlation IDs and redaction; and the forty lines that are the whole product.
group: The engine
order: 42
updated: 2026-09-20
---

Three small packages that everything else depends on.

## pipeline — the whole product in forty lines

`internal/pipeline` wires the deterministic stages together: diff two builds, resolve blast
radius, apply the routing policy.

It exists so that "what the engine does" is one readable function rather than something a
reader has to reconstruct from three packages.

```text
snapshots → differ → []DriftEvent
                       │
                       ├─ graph.BlastRadius(claimID) per event
                       │
                       └─ NeedsHumanReview(threshold) → route
```

The whole thing is forty lines once the pieces are in place, which is itself the point: **the
intelligence is in the content model, not in the code.**

## resilience — retry, backoff, breaker

There are three outbound dependencies — Context MCP, Agent Actions, and the Content Lake
mutation API — and they fail in the same ways: a transient 5xx, a 429, a connection reset, a
hung socket. Written per-caller, the retry policy drifts and only one of them ends up honouring
`Retry-After`.

### The rule that matters most

> [!DANGER]
> **Only idempotent operations are retried.**

A retry is a second attempt at the same effect, and that is only safe when repeating the effect
is harmless. The caller says so explicitly: `Do` takes an operation that returns a `Retryable`
error or not, rather than this package guessing from a status code.

A publication retried blindly could publish twice. The [write
client](/docs/engine/contentlake) therefore sends a deterministic transaction ID, so a repeat is
the _same_ transaction rather than a second one.

### What it provides

| Behaviour | Detail |
| --- | --- |
| Retry | Only for operations the caller marks `Retryable` |
| Backoff | Exponential with jitter, and **interruptible** — a cancelled context stops the wait immediately |
| `Retry-After` | Honoured when the server sends it, in preference to the computed backoff |
| Circuit breaker | Opens after repeated failures; admits exactly one probe in half-open |

An uninterruptible backoff is a shutdown that takes thirty seconds and a test suite that takes
minutes, so cancellation is threaded through rather than bolted on.

## telemetry — correlation and redaction

Every externally triggered action gets a correlation ID at the edge, and that ID travels with
the request context through authorization, the gate, the event log and out into the logs. It is
echoed back in the `X-Correlation-ID` response header.

When something goes wrong at 2am, one `grep` reconstructs the whole causal chain: which actor,
which build, which claim, which decision, which failure.

### Why redaction lives here

DRIFT indexes an organisation's policy documents. Those documents contain prices, contract
terms, customer names and occasionally things nobody intended to publish. Structured logs are
the easiest place to leak all of it by accident — a single

```go
slog.Info("claim", "statement", claim.Statement)
```

and a contract clause is in a log aggregator with a six-month retention.

So **the logger refuses to take free text**. Callers log identifiers, hashes, counts and enums.
When human-readable content genuinely must appear, `Excerpt` truncates and marks it, so the log
records that content existed without reproducing it in full.

The same discipline applies to audit evidence: fingerprints and truncated excerpts, never page
content or credentials.

## Related

- [Security properties](/docs/operations/security)
- [Scalability properties](/docs/operations/scalability)
- [eventlog](/docs/engine/eventlog)
