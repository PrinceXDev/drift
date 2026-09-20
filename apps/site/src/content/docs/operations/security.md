---
title: Security properties
description: Nine properties, each asserted by a test rather than merely intended.
group: Operations
order: 82
status: verified
updated: 2026-09-20
---

Every property below is asserted by a test, not merely intended.

| Property | How it is enforced |
| --- | --- |
| Organisation tokens stay server-side | The browser never sees one. The registry stores sha256 digests, never the tokens. |
| Authorization on every mutation | `Authorize` returns a `*Grant` with no exported constructor. A route that skipped the check **does not compile** — [ADR-0009](/docs/decisions/grants-make-authorization-structural). |
| Agents never publish or resolve | `humanOnly` is checked _before_ the role table, so an agent with `RoleAdmin` still cannot. `MustBeHuman` checks again at the gate. `TestAgentCanNeverDispose` covers every role exhaustively. |
| Human approval for publication | The gate's `human_approval` check, independent of the permission table. |
| Append-only audit history | Hash-chained events. `Verify` recomputes every content address; an altered or deleted entry breaks the chain and is reported. |
| Prompt-injection defence | Document text reaches the model as typed `instructionParams`, never concatenated into an instruction. Tested with a hostile fixture. |
| No cross-tenant leakage | Tenant is checked _before_ permission, so an outsider cannot probe policy. Over HTTP this is **404, not 403** — confirming a resource exists is itself a disclosure. |
| Redaction | Logs and audit evidence carry fingerprints and truncated excerpts, never page content or credentials. |
| Full traceability | Every event names actor, role, build, subject, evidence and correlation ID. There is no way to append one that omits them. |

## The three defences on the drafter

The product's central promise is that a human approves every correction. Three independent
mechanisms protect it, so the promise survives any one of them being misconfigured:

1. **`noWrite: true`** on every Agent Actions Transform. Enforced by Sanity, not by us.
2. **`target.path` scoped** to the single field the assertion declares. A bad draft's blast
   radius is one paragraph.
3. **The workflow edge into `published` is role-gated** to `administrator` / `editor`, and an
   unattended agent holds no role.

Observed, from the workflow runner:

```text
reason={"kind":"filter-failed",
        "filter":"count($actor.roles[@ in [\"administrator\",\"editor\"]]) > 0"}
fireAction refused: Action "approve:approve" is not allowed: action filter returned false
```

## Why authentication failures say nothing

```go
// The response says nothing about why. The log records the credential's shape
// and fingerprint, never its value — an auth-failure path is exactly where
// somebody reaches for "let me just log what was sent".
```

401 with `authentication required`, and `WWW-Authenticate: Bearer realm="drift"`. No hint about
whether the token was unknown, expired, or belonged to another tenant.

## Why a cross-tenant attempt is 404

Telling an outsider that a resource exists but belongs to somebody else is itself a disclosure.
As far as they are concerned, it is simply not there.

This is checked **before** permission, so the shape of the policy cannot be probed by comparing
403s against 404s.

## Why the gate is separate from permissions

`correction:publish` says an actor is _allowed to try_. The gate says whether the thing they are
trying to publish is _still the right thing to publish_. Conflating the two produces a system
where a legitimate operator can publish a stale correction and the audit trail records that a
human approved it — which launders a stale decision through a person's name.

## Prompt injection, structurally

Indexed documents are attacker-influenced content in the general case: a supplier PDF, a wiki
page, a clause somebody pasted in.

The input filter — typed `instructionParams` rather than string concatenation — is the weakest of
the layers, not the only one. An injected instruction has nowhere useful to go: the drafter
cannot publish, cannot widen its own scope, and cannot reach the workflow edge that publishes.

## Related

- [authz](/docs/engine/authz)
- [eventlog](/docs/engine/eventlog)
- [Scalability properties](/docs/operations/scalability)
