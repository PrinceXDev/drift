# ADR-0008 — One append-only event log, not five subsystems

**Status:** accepted · **Date:** 2026-09-19

## Context

The revamp brief lists these as separate requirements:

- append-only audit history
- idempotent, replayable processing
- time-travel through organisational belief
- incident timelines
- traceability to actor, build, source and evidence

The obvious reading is five features. Built that way, they become five places
that can disagree about what happened — and an audit trail that disagrees with
the incident timeline is worth less than either alone.

## Decision

Build one primitive: an **append-only, hash-chained, content-addressed event
log**. The five requirements are five reads of it.

| Requirement | How it is served |
|---|---|
| Audit history | The log, read |
| Idempotency | "Have I already recorded this key?" |
| Replay | Fold the log again from the start |
| Time travel | Fold only up to sequence *N* |
| Incident timeline | Filter by subject |
| Traceability | `Record` takes an `*authz.Grant`, so actor/tenant/permission cannot be omitted |

Each event carries the hash of its predecessor. `Verify` walks the chain and
recomputes every content address, so an altered, inserted or deleted entry
breaks every hash after it and is detectable.

## Consequences

- One mechanism to get right, one to test, one to reason about. The eleven tests
  in `internal/eventlog` cover all five features because they are the same code.
- `Log.Record` requires a `*Grant`. An audit entry therefore cannot exist for an
  unauthorized action — not by convention, but because the caller has no way to
  produce a Grant without passing authorization.
- Sequences are **per tenant**. A shared counter would leak one tenant's activity
  level to another through the gaps in its own numbering.
- The idempotency check happens twice: once in `Record` and again inside the
  store's lock. Checking only in `Record` leaves a race where two concurrent
  retries both miss and both append. Tested with 40 concurrent writers.
- This is a hash chain, not a blockchain, and makes no distributed-consensus
  claim. It is exactly sufficient for "prove this record was not edited after
  the fact", which is the actual requirement.
- `MemStore` carries `Overwrite` and `Delete` so the integrity tests can do what
  an attacker with store access would. They are deliberately *not* on the `Store`
  interface: a production store must offer no way to rewrite history, so the
  ability cannot be part of the contract every store implements.
