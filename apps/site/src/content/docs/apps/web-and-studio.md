---
title: The public site and the Studio
description: The content that drifts, and the place drift starts.
group: Applications
order: 72
updated: 2026-09-20
---

Two of the four apps exist to make the demo real rather than to demonstrate anything themselves.

## apps/web — the content that drifts

A Next.js site for Northwind Audio: seven pages, prerendered.

```bash
pnpm --filter @drift/web dev      # http://localhost:3000
```

This is the published content DRIFT watches. When `support/returns` moves from 30 days to 45,
these are the pages still saying 30.

![A published Returns page with its integrity strip: the claims it depends on, and whether each is still verified against the current build.](/shots/web-returns.png)

### The integrity strip

Each page renders a strip showing the claims it depends on and whether each is currently
verified, stale or contradicted — read from `GET /v1/drift` with a viewer-role token.

That is a small thing with a large implication: **the integrity state is publishable**. A
company confident enough to show "this page was last verified against build 46" is making a
claim it can be held to, which is a different posture from the usual silent staleness.

### A retired claim must still resolve

An early bug: a page depending on a **retired** claim failed to resolve it and rendered an
error rather than a warning.

A fact nobody believes any more is still a fact somebody published, and the page that published
it is exactly the page a reader needs to be warned about. Retired claims are resolvable for that
reason.

### Configuration

```bash
DRIFT_ENGINE_URL=http://127.0.0.1:8080
DRIFT_ENGINE_TOKEN=        # an actor token, viewer role is enough
```

Leave the token blank while the engine runs with `-fixtures`.

## apps/studio — where drift starts

Sanity Studio, organised around sources.

```bash
pnpm --filter @drift/studio dev
```

The desk structure leads with `source`, because sources are the only writable truth in the
system: editing a source body is what triggers a rebuild, which is what produces drift. Every
other type in the Studio is either read-only or maintained by the engine.

| Type | Editable in the Studio |
| --- | --- |
| `source` | Yes — this is the input |
| `contentPage` | Yes — normal editorial work |
| `instruction` | Yes — text and anchors |
| `surface` | Yes — registration |
| `claim` | Fields yes; all lineage read-only |
| `assertion` | Fields yes; `state` and `verifiedAgainstBuild` read-only |
| `buildSnapshot` | **No** — the whole type is read-only |
| `driftEvent` | **No** — the whole type is read-only |

### Schema deployment

Agent Actions bind to the deployed schema, which is what stops a Transform writing a string into
a number field:

```bash
sanity schema deploy
sanity schema list      # → _.schemas.<workspace>
```

That ID goes in `SANITY_SCHEMA_ID`. It is required for drafting, not optional.

### A trap worth knowing about

Having the schema types available from two places at once — the workspace package and a local
copy — produces duplicate type definitions that typecheck individually and conflict when the
Studio loads. The fix is that `@drift/schema` is the only definition, imported everywhere. It is
recorded in [the build log](/docs/operations/build-log) because the error message does not say
that.

## Related

- [contentPage](/docs/content-model/content-page)
- [The Knowledge Base corpus](/docs/sanity/knowledge-base)
- [Connecting Sanity](/docs/sanity/setup)
