---
title: Environment variables
description: Every variable, what reads it, whether it is a secret, and which of the two Sanity credentials it is.
group: Operations
order: 80
updated: 2026-09-20
---

Copy `.env.example` to `.env` and fill it in. `.env` is gitignored and is read by nothing in
this repository except the processes listed below.

```bash
cp .env.example .env
```

> [!DANGER]
> Two different Sanity credentials are needed and they are **not interchangeable**.
> `SANITY_WRITE_TOKEN` is a **project** token that writes documents to the Content Lake.
> `DRIFT_MCP_TOKEN` is an **organisation** token that reads the Knowledge Base over Context MCP.
> A project token is rejected outright by the MCP client.

## Project — not secrets, these appear in the browser

| Variable | Read by | Notes |
| --- | --- | --- |
| `SANITY_STUDIO_PROJECT_ID` | Studio | From the Dashboard, beside **PROJECT ID** |
| `SANITY_STUDIO_DATASET` | Studio | Usually `production` |
| `SANITY_PROJECT_ID` | Engine | The same project, under the engine's own names — it is a separate process that may run where the Studio does not |
| `SANITY_DATASET` | Engine | |
| `VITE_SANITY_PROJECT_ID` | Console | Vite only exposes `VITE_*`, so the App SDK console reads these at build time |
| `VITE_SANITY_DATASET` | Console | |

## Credentials — secrets

### `SANITY_WRITE_TOKEN`

A **project** token with Editor permission. Dashboard → project → API → Tokens → Add API token.

Used by [`internal/contentlake`](/docs/engine/contentlake) to publish an approved correction and
to write a standing instruction back. Without it the engine gates and audits approvals but
**refuses to claim a publication happened**.

### `SANITY_SCHEMA_ID`

The deployed schema Agent Actions bind to, from `sanity schema deploy`. List it with
`sanity schema list`; it looks like `_.schemas.your_workspace_name`.

Agent Actions are schema-aware — that is what stops a Transform writing a string into a number
field — so this is **required, not optional**, for drafting.

### `DRIFT_MCP_TOKEN`

An **organisation** token with the Context Viewer permission (grant
`sanity.knowledge-base.read`). Dashboard → organisation → Manage → API → Tokens.

### `DRIFT_MCP_ENDPOINT`

The Context MCP endpoint created in the Context app:

```text
https://api.sanity.io/v1/context/organizations/<orgId>/mcp/<endpointName>
```

## Engine identity

### `DRIFT_TENANT`

Every grant and every audit entry is scoped to a tenant. Required in live mode.

### `DRIFT_ACTORS`

The actor registry. **Not a Sanity credential — you invent these tokens.**

```text
token:id:tenant:roles[:agent]
```

- roles are **pipe-separated**, from `viewer` `agent` `editor` `steward` `admin`
- a fifth field of literally `agent` marks an unattended principal
- entries are separated by semicolons

```bash
DRIFT_ACTORS=tok_a:sam@northwind:northwind:steward;tok_b:bot:northwind:agent:agent
```

The registry stores **sha256 digests, never the tokens themselves**.

Leave it blank and run the engine with `-fixtures` to get the four demo principals against
committed demo data.

## Public site

| Variable | Notes |
| --- | --- |
| `DRIFT_ENGINE_URL` | Where `apps/web` reads the drift ledger from, for its per-page integrity strip. Default `http://127.0.0.1:8080` |
| `DRIFT_ENGINE_TOKEN` | One of the tokens from `DRIFT_ACTORS` — **not** a Sanity credential. A viewer-role actor is enough; the site only reads. Leave blank while the engine runs with `-fixtures`. |

The same two variables are read by the `on-assertion-change` and `poll-kb-build`
[Functions](/docs/sanity/functions), which call the engine over HTTP.

## Quick reference

| Variable | Secret | Scope |
| --- | :-: | --- |
| `SANITY_STUDIO_PROJECT_ID` · `SANITY_PROJECT_ID` · `VITE_SANITY_PROJECT_ID` | | public |
| `SANITY_STUDIO_DATASET` · `SANITY_DATASET` · `VITE_SANITY_DATASET` | | public |
| `SANITY_WRITE_TOKEN` | ● | Sanity **project** |
| `SANITY_SCHEMA_ID` | | public |
| `DRIFT_MCP_TOKEN` | ● | Sanity **organisation** |
| `DRIFT_MCP_ENDPOINT` | | public |
| `DRIFT_TENANT` | | public |
| `DRIFT_ACTORS` | ● | DRIFT only |
| `DRIFT_ENGINE_URL` | | public |
| `DRIFT_ENGINE_TOKEN` | ● | DRIFT only |

## Related

- [Connecting Sanity](/docs/sanity/setup)
- [Fixture mode](/docs/operations/fixture-mode)
- [authz](/docs/engine/authz)
