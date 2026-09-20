---
title: HTTP API
description: Fifteen routes, the permission each requires, the shapes they exchange, and an error contract that does not leak policy.
group: API
order: 50
updated: 2026-09-20
---

The engine serves its HTTP surface from `internal/api`. Every route is registered through
`guard`, which resolves the bearer token to an actor, authorizes a named permission, and hands
the handler an `*authz.Grant` — so **a route that skipped authorization does not compile**.

Base URL in fixture mode: `http://127.0.0.1:8080`.

## Routes

| Method | Path | Permission |
| --- | --- | --- |
| `GET` | `/healthz` | open — liveness only, discloses no content |
| `GET` | `/v1/me` | authenticated |
| `GET` | `/v1/drift` | `drift:read` |
| `GET` | `/v1/drift/stream` | `drift:read` (SSE) |
| `GET` | `/v1/claims/{id}/lineage` | `drift:read` |
| `GET` | `/v1/surfaces` | `drift:read` |
| `POST` | `/v1/dissent` | `drift:read` |
| `POST` | `/v1/builds/poll` | `build:poll` |
| `POST` | `/v1/assertions/reconcile` | `build:poll` |
| `POST` | `/v1/corrections/draft` | `correction:draft` |
| `POST` | `/v1/corrections/preview` | `simulation:run` |
| `POST` | `/v1/corrections/approve` | `correction:publish` — **humans only** |
| `POST` | `/v1/corrections/reject` | `correction:publish` — **humans only** |
| `GET` | `/v1/audit` | `audit:read` |
| `GET` | `/v1/audit/verify` | `audit:read` |

## Authentication

```http
Authorization: Bearer tok_your_actor_token
```

These are **not** Sanity credentials. They are actor tokens you invent and register in
`DRIFT_ACTORS`; the registry stores sha256 digests, never the tokens. See
[Environment variables](/docs/operations/environment).

Every response carries `X-Correlation-ID`, and the same ID appears on every log line and audit
event produced by the request.

## `GET /v1/me`

Lets a UI show a person their own capabilities, rather than letting them discover the
boundaries by being refused.

```json
{
  "id": "sam@northwind",
  "email": "sam@northwind.example",
  "roles": ["steward"],
  "tenant": "northwind",
  "isAgent": false,
  "permissions": {
    "drift:read": true,
    "correction:publish": true,
    "actor:manage": false
  }
}
```

## `GET /v1/drift`

The feed: drift events with their blast radius, plus a summary.

```bash
curl -s -H "Authorization: Bearer $TOKEN" localhost:8080/v1/drift | jq .summary
```

## `GET /v1/drift/stream`

Server-sent events, one per drift event as it is detected.

SSE rather than WebSockets deliberately: the stream is one-directional, it survives proxies
that mangle upgrades, and it reconnects on its own.

```bash
curl -N -H "Authorization: Bearer $TOKEN" localhost:8080/v1/drift/stream
```

## `GET /v1/claims/{id}/lineage`

Returns a [`ClaimLineage`](/docs/concepts/lineage): the claim, its sources highest-authority
first, the three builds resolved to actual builds, every dependent paired with the surface
carrying it, and the drift that moved it most recently.

## `GET /v1/surfaces`

The [surface registry](/docs/concepts/surfaces) — every registered dependent, its kind, owner
and locator.

## `POST /v1/dissent`

```json
{"question": "How long do I have to return something?"}
```

Answers, or refuses and presents the disagreement. See [the Dissent agent](/docs/apps/dissent).

## `POST /v1/builds/poll`

Captures the current build and diffs it against the previous snapshot.

```json
{"changed": true, "build": 47, "events": 3}
```

`changed: false` with no other fields means the outline hash was identical and the diff was
skipped — the common case.

## `POST /v1/assertions/reconcile`

```json
{"pageId": "page.returns", "trigger": "document-function"}
```

Called by the `on-assertion-change` Document Function when somebody edits a published page
directly. Re-checks the assertions on that page so the graph notices unilateral edits — a tool
that only stays accurate when everyone uses it is not an integrity tool.

It returns an **error** rather than a plausible zero when it cannot reconcile.

## `POST /v1/corrections/draft`

```json
{"assertionId": "assertion.returns-b01"}
```

Runs the [Agent Actions drafter](/docs/engine/agent) with `noWrite: true`, scoped to one block.

## `POST /v1/corrections/preview`

Requires `simulation:run`. Runs the gate without publishing, so an operator can see what would
happen — including which checks would block.

## `POST /v1/corrections/approve` and `/reject`

```json
{"assertionId": "assertion.returns-b01", "reason": "wording confirmed with legal"}
```

Both run the full [remediation sequence](/docs/engine/remediation): authorize → gate → record →
apply → record. Both are recorded with the gate's verdict at that moment.

A blocked approval returns the decision, not a bare failure:

```json
{
  "allowed": false,
  "buildId": "build.47",
  "checks": [
    {"name": "human_approval", "passed": true, "blocking": true, "detail": "actor sam@northwind is a person"},
    {"name": "no_unresolved_conflict", "passed": false, "blocking": true,
     "detail": "sources still disagree about support/returns (2 competing values)"}
  ],
  "blastRadius": ["assertion.returns-b01", "assertion.faq-b04", "…"]
}
```

## `GET /v1/audit` and `/v1/audit/verify`

The [append-only log](/docs/engine/eventlog), and a walk of the hash chain that recomputes every
content address. An altered or deleted entry breaks the chain and is reported with the sequence
number where the break occurs.

## The error contract

| Status | When | Body |
| --- | --- | --- |
| 401 | Unrecognised credential | `authentication required` — and nothing about why |
| 403 | Authenticated, not permitted | `your roles (viewer) do not include correction:publish` |
| 403 | An agent attempted a human-only action | `this action requires a human approver; agents may propose but never dispose` |
| **404** | **Cross-tenant attempt** | `not found` |
| **422** | **The gate refused** | The full `Decision`, with every check |

A gate refusal is **422, not 403**. The caller was allowed to ask; the content was not ready to
publish. A client deciding whether to retry needs that distinction, and so does anybody reading
the logs.

> [!NOTE]
> The 404 is deliberate. Telling an outsider that a resource exists but belongs to somebody else
> is itself a disclosure; as far as they are concerned it is simply not there.

Authentication failures log the credential's **shape and fingerprint**, never its value — an
auth-failure path is exactly where somebody reaches for "let me just log what was sent".

## What the edge is responsible for

- minting a correlation ID, putting it on the context and echoing it back
- resolving identity, and never logging the credential
- mapping authorization failures to statuses that do not leak policy
- bounding request bodies
