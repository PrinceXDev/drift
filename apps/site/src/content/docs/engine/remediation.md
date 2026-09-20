---
title: remediation — the vertical slice
description: Turning a detected drift into a published, verified correction, with a human in the middle. The order of operations is the design.
group: The engine
order: 37
updated: 2026-09-20
---

`internal/remediation` is the vertical slice: detected drift in, published correction out, human
in the middle.

## The order of operations

```text
authenticate  →  who is this
authorize     →  may they, in this tenant, for this resource
gate          →  should this still be published at all
record        →  append the decision before acting on it
apply         →  perform the publication
record        →  append the outcome
```

Two details in that list are deliberate and easy to get wrong.

### The gate runs after authorization

An unauthorized caller must not be able to learn what the gate would have said. The checks
disclose which pages depend on a claim, which is exactly the map an attacker would want — so
authorization comes first, and a failure there never reaches the gate.

### The decision is recorded before the publication is applied

If the process dies mid-publish, the audit trail says _"we decided to publish and then
something happened"_, which is recoverable: an operator can look at the page and reconcile.

The reverse ordering loses the fact that a decision was ever made. A crash between "apply" and
"record" would leave a corrected page with no record of who approved it, which is the one thing
an audit trail exists to prevent.

## Idempotency

Approval is keyed on `(assertion, build, actor)`. Approving twice records once and publishes
once — a double click, a retried request, a replayed queue message.

The key includes the build so that re-approving after a rebuild is treated as a **new** decision
rather than a duplicate, which is correct: the gate may reach a different answer against a
different build.

## Approve and reject are the same path

`POST /v1/corrections/approve` and `/reject` both run the full sequence. A rejection is a
decision, and decisions are recorded with the same evidence as approvals — including the gate's
verdict at that moment.

This is what lets the workflow runner say something honest. The human does not choose the
workflow transition; the endpoint does:

- allowed and published → fire `approve`
- refused → fire `send-back`
- neither — an unreachable engine, no Content Lake to write to → **move nothing**

A workflow that advanced on a transport failure would be asserting an outcome nobody decided.

## What it refuses to claim

Without `SANITY_WRITE_TOKEN`, the engine gates and audits approvals but **refuses to claim a
publication happened**. Fixture mode publishes nothing, loudly.

That behaviour was added deliberately after the alternative was considered: returning success
with no write would have made the demo smoother and the audit trail a lie.

## Related

- [gate](/docs/engine/gate)
- [contentlake](/docs/engine/contentlake)
- [The remediation workflow](/docs/sanity/workflows)
