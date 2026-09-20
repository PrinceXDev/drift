---
title: eventlog — the append-only spine
description: One hash-chained data structure that is simultaneously the audit trail, the idempotency store, the replay log and the time machine.
group: The engine
order: 36
updated: 2026-09-20
---

`internal/eventlog` is the append-only spine of DRIFT.

## Why one primitive instead of five

The requirements list append-only audit history, idempotent processing, replayability,
time-travel through organisational belief, and incident timelines as five separate
capabilities. They are one data structure looked at from five angles:

| Capability | What it actually is |
| --- | --- |
| Audit | the log, read |
| Idempotency | "have I already recorded this key?" |
| Replay | fold the log again from the start |
| Time travel | fold the log only up to sequence _N_ |
| Incident timeline | filter the log by subject |

Building five subsystems here would mean five places for them to disagree about what happened.
There is one. See [ADR-0008](/docs/decisions/one-event-log-not-five-subsystems).

## Tamper evidence

Every event carries the hash of its predecessor, so the log is a chain. An entry cannot be
altered or removed after the fact without breaking every hash after it, and `Verify` walks the
chain to prove it has not been.

That matters because the audit trail's whole purpose is to be believed by somebody who does not
trust the person showing it to them.

> [!NOTE]
> This is not a blockchain and makes no distributed-consensus claims. It is a hash chain:
> cheap, boring, and exactly sufficient for "prove this record was not edited after the fact".

`GET /v1/audit/verify` re-walks the chain and reports the first break, if any.

## Content-addressed IDs

An event's ID is the hash of its content plus its predecessor. Two identical events appended
twice produce the same ID, which is what makes replay safe: re-processing a build cannot create
duplicate history.

## What an event records

Every event names the actor, their role, the build, the subject, the evidence and the
correlation ID. There is no way to append one that omits them — the constructor requires them,
which is the same trick the [authorization package](/docs/engine/authz) uses for grants.

```json
{
  "seq": 1841,
  "id": "sha256:4c1f…",
  "prev": "sha256:91ab…",
  "kind": "publication.refused",
  "actor": "sam@northwind.example",
  "role": "editor",
  "tenant": "northwind",
  "buildId": "build.47",
  "subject": "assertion.returns-b01",
  "claimPath": "support/returns",
  "evidence": {"blocked": ["no_unresolved_conflict"], "competingValues": 2},
  "correlationId": "cid_01J8…"
}
```

`claimPath` is on the event because an audit entry that says only "assertion.returns-b01
refused" requires a second lookup to be meaningful — and the second lookup may return something
different months later.

## Idempotency

Approval is keyed on `(assertion, build, actor)`. Approving twice — a double click, a retried
request, a replayed queue message — records once and publishes once.

The key includes the build so that re-approving **after a rebuild** is correctly treated as a
new decision rather than a duplicate. That is not a subtlety: the whole point of the gate is
that the world may have moved, and a second approval against a new build is a genuinely
different act.

Tested with 25 and 40 concurrent writers.

## Redaction

Evidence carries fingerprints, counts, enums and truncated excerpts — never page content or
credentials. See [telemetry](/docs/engine/resilience) for why the logger refuses free text.

## Related

- [Security properties](/docs/operations/security)
- [remediation](/docs/engine/remediation) — which records the decision before acting on it
- [The audit API](/docs/api/http)
