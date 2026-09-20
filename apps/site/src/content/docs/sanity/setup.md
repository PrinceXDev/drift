---
title: Connecting Sanity
description: Two credentials that are not interchangeable, one Context endpoint, and the setup mistakes that cost the most time.
group: Sanity integration
order: 61
status: beta
updated: 2026-09-20
---

Fixture mode needs nothing. Pointing DRIFT at a real project needs two credentials, and they
are **not interchangeable**.

> [!DANGER]
> `SANITY_WRITE_TOKEN` is a **project** token. `DRIFT_MCP_TOKEN` is an **organisation** token.
> Mixing them up is the single most common setup mistake in this system.

## 1. Project and dataset

From the Sanity Dashboard, take the project ID shown beside **PROJECT ID**.

```bash
SANITY_STUDIO_PROJECT_ID=your_project_id
SANITY_STUDIO_DATASET=production

# the engine reads the same project under its own names, because it is a
# separate process that may run where the Studio does not
SANITY_PROJECT_ID=your_project_id
SANITY_DATASET=production

# Vite only exposes VITE_*, so the console reads these at build time
VITE_SANITY_PROJECT_ID=your_project_id
VITE_SANITY_DATASET=production
```

## 2. A project token with write access

Dashboard → project → **API** → **Tokens** → Add API token, with **Editor** permission.

```bash
SANITY_WRITE_TOKEN=your_project_write_token
```

Used by [`internal/contentlake`](/docs/engine/contentlake) to publish an approved correction and
to write a standing instruction back. Without it the engine gates and audits approvals but
**refuses to claim a publication happened**.

## 3. Deploy the schema, for Agent Actions

```bash
sanity schema deploy
sanity schema list
```

```bash
SANITY_SCHEMA_ID=_.schemas.your_workspace_name
```

Agent Actions are schema-aware — that is what stops a Transform writing a string into a number
field — so this is **required, not optional**, for drafting.

## 4. An organisation token with Context Viewer

Dashboard → organisation → **Manage** → **API** → **Tokens**, with the grant
`sanity.knowledge-base.read`.

```bash
DRIFT_MCP_TOKEN=your_organisation_context_viewer_token
```

Project-level tokens are rejected outright; the client says so in as many words via
`ErrProjectToken`.

## 5. A Context MCP endpoint

Create it in the Context app in the Dashboard. The URL has this shape:

```text
https://api.sanity.io/v1/context/organizations/<orgId>/mcp/<endpointName>
```

```bash
DRIFT_MCP_ENDPOINT=https://api.sanity.io/v1/context/organizations/your_org_id/mcp/your_endpoint
```

> [!WARNING]
> The endpoint derives its **mode** from its configured sources, and a malformed dataset ID is
> silently skipped — which can flip an endpoint from GROQ mode to Knowledge Base mode with no
> error at all. DRIFT pins `Mode` explicitly on every request rather than trusting inference,
> and you should check the endpoint's sources if results look like the wrong kind of answer.

## 6. Engine identity

```bash
DRIFT_TENANT=northwind

# the actor registry — NOT a Sanity credential; you invent these
# token:id:tenant:roles[:agent]     roles are pipe-separated
DRIFT_ACTORS=tok_a:sam@northwind:northwind:steward;tok_b:bot:northwind:agent:agent
```

The registry stores sha256 digests, never the tokens themselves. Leave it blank and run with
`-fixtures` to get the four demo principals.

## 7. Seed the dataset

```bash
cd services/drift-engine && go run ./cmd/seed
```

Emits 35 documents of NDJSON for Sanity, and the fixtures the console and public site use — from
**one** definition in `internal/seeddata`, so the demo cannot disagree with itself.

```bash
sanity dataset import sanity/seed/northwind.ndjson production
```

## 8. Build the Knowledge Base

Upload `sanity/knowledge-base/build-46/` as **file** sources and build; then swap in
`build-47/` and build again. Full instructions, including which file must not be edited, are in
[The Knowledge Base corpus](/docs/sanity/knowledge-base).

## Checklist

| Thing | Where it comes from | Scope |
| --- | --- | --- |
| Project ID | Dashboard, project | public |
| `SANITY_WRITE_TOKEN` | Project → API → Tokens | secret, **project** |
| `SANITY_SCHEMA_ID` | `sanity schema list` | public |
| `DRIFT_MCP_TOKEN` | Organisation → Manage → API | secret, **organisation** |
| `DRIFT_MCP_ENDPOINT` | Context app | public |
| `DRIFT_ACTORS` | You invent them | secret, not Sanity |

## Related

- [Environment variables](/docs/operations/environment)
- [The Context MCP client](/docs/engine/mcp)
- [Known limits](/docs/operations/limits)
