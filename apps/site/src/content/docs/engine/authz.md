---
title: authz — permission as a capability
description: Five roles, eleven permissions, and a type system that makes a forgotten check fail to compile.
group: The engine
order: 35
status: stable
updated: 2026-09-20
---

`internal/authz` decides who may do what.

## The design constraint

The hard part of "enforce authorization on every mutation" is not writing the check. It is
guaranteeing nobody forgets one. A permission system that relies on each handler remembering to
call it will eventually have a handler that does not.

So a mutation here **cannot be performed with a boolean**. It requires a `*Grant` — a value
that only `Authorize` can mint, with no exported constructor and unexported fields. Handlers
take a `Grant` as an argument, so a route that skipped authorization **does not compile**.

It is the same trick as a capability: the proof of permission and the permission itself are the
same object. See [ADR-0009](/docs/decisions/grants-make-authorization-structural).

## The roles

| Role | What it is for |
| --- | --- |
| `viewer` | Read the drift ledger and the graph. Nothing else. |
| `agent` | An unattended process — the claim extractor and the remediation drafter. |
| `editor` | Owns pages and approves corrections to them. |
| `steward` | Owns the knowledge base: resolves conflicts, writes standing instructions, declares incidents. |
| `admin` | Everything a steward can do, plus managing actors. |

## The permissions

`drift:read` · `audit:read` · `build:poll` · `correction:draft` · `correction:publish` ·
`conflict:resolve` · `instruction:write` · `incident:declare` · `incident:close` ·
`simulation:run` · `actor:manage`

## The whole policy, in one table

| Permission | viewer | agent | editor | steward | admin |
| --- | :-: | :-: | :-: | :-: | :-: |
| `drift:read` | ● | ● | ● | ● | ● |
| `audit:read` | | | ● | ● | ● |
| `build:poll` | | | | ● | ● |
| `correction:draft` | | ● | ● | ● | ● |
| `correction:publish` | | | ● | ● | ● |
| `conflict:resolve` | | | | ● | ● |
| `instruction:write` | | | | ● | ● |
| `incident:declare` | | | | ● | ● |
| `incident:close` | | | | ● | ● |
| `simulation:run` | | ● | ● | ● | ● |
| `actor:manage` | | | | | ● |

Roles are additive and deliberately narrow. The important line is between `agent` and every
human role: an agent can draft and propose, and there is **no combination of roles** that lets
it publish or resolve a core conflict.

## Human-only permissions are checked first

```go
// humanOnly is checked BEFORE the role table, so a misconfigured agent with
// RoleAdmin still cannot publish.
var humanOnly = map[Permission]bool{ /* … */ }
```

This ordering is the point. A human-only gate applied after the role lookup would be defeated
by giving an agent an administrative role — which is exactly the misconfiguration most likely
to happen in a hurry. `TestAgentCanNeverDispose` covers every role exhaustively, because it is
the product's central promise.

`Actor.IsAgent` marks unattended principals as belt-and-braces alongside `RoleAgent`.

## Tenancy is checked before permission

An outsider must not be able to probe policy. Tenant is checked first, and over HTTP the answer
is **404, not 403** — confirming that a resource exists is itself a disclosure.

## The token registry

Tokens are never stored. The registry holds sha256 digests and resolves a bearer token to an
`Actor`. The registry is configured through `DRIFT_ACTORS`:

```text
token:id:tenant:roles[:agent]        roles are pipe-separated
tok_a:sam@northwind:northwind:steward;tok_b:bot:northwind:agent:agent
```

These are **not** Sanity credentials — you invent them. See
[Environment variables](/docs/operations/environment).

## How a route uses it

```go
mux.Handle("POST /v1/corrections/approve",
	guard(authz.PermApprovePublish, func(w http.ResponseWriter, r *http.Request, grant *authz.Grant) {
		// `grant` cannot be manufactured here; it came from the middleware.
	}))
```

`guard` resolves the bearer token to an actor, authorizes the named permission, and hands the
handler a grant. A handler's signature therefore requires a proof it cannot fabricate.

## Related

- [The HTTP API](/docs/api/http)
- [remediation](/docs/engine/remediation)
- [Security properties](/docs/operations/security)
