---
title: Functions and Blueprints
description: One deployed Document Function, one shim waiting on an alpha, and why the poll tick lives in the engine instead.
group: Sanity integration
order: 64
updated: 2026-09-20
---

`sanity/sanity.blueprint.ts` declares the deployed compute. There is exactly one function in it,
and the reason there is only one is worth stating.

## Why only one

The original design had two: a `sanity.function.cron` poller asking whether the Knowledge Base
rebuilt, and a document function reacting to page edits.

**The cron half is not deployable.** `defineScheduledFunction` exists in `@sanity/blueprints`
(checked in 0.24.0 and 0.26.1), but its own doc comment says:

> `@alpha` Deploying Scheduled Functions via Blueprints is experimental. This feature is not
> available publicly yet.

So the periodic poll lives in the Go engine's own ticker (`cmd/engine`, `-poll`). That is a
better home for it regardless:

- the engine is a long-running service that already holds the MCP client and the previous
  snapshot
- a poll is a hash comparison against state it has **in memory**
- Sanity Functions cap at **10 seconds** by default, where a full capture plus diff plus
  blast-radius walk can exceed that on a large content lake

`sanity/functions/poll-kb-build/` is kept as the HTTP shim for when the alpha lands — it already
calls the same engine endpoint the ticker does. See
[ADR-0006](/docs/decisions/engine-owns-the-poll-tick).

## The one function that is deployed

`on-assertion-change` does something a long-running service genuinely cannot: **react the
instant an editor changes a page.**

```ts
defineDocumentFunction({
  name: 'on-assertion-change',
  src: './functions/on-assertion-change',
  memory: 1,
  timeout: 30,
  event: {
    on: ['create', 'update'],
    filter: "_type == 'contentPage'",
    projection: '{_id, _type, title}',
  },
})
```

### The case it exists for

An editor notices "30 days" is wrong and fixes it directly in the Studio, without going near
DRIFT. Without this function the assertion stays flagged stale for ever, the console keeps
listing the page, and the remediation queue holds a draft for work that is already done.

> A tool that only stays accurate when everyone uses it is not an integrity tool. So the graph
> has to notice unilateral edits and quietly settle up.

### What the handler does

```ts
const pageId = (event.data as {_id?: string} | undefined)?._id

// Draft ids are prefixed. Reconcile against the published document: a draft
// edit is not yet a claim about what the public site says.
if (pageId.startsWith('drafts.')) return

await fetch(`${url}/v1/assertions/reconcile`, {
  method: 'POST',
  headers: {'Content-Type': 'application/json', Authorization: `Bearer ${token}`},
  body: JSON.stringify({pageId, trigger: 'document-function'}),
})
```

Skipping drafts is deliberate: a draft edit is not yet a claim about what the public site says,
and reconciling against one would mark an assertion verified against text no reader can see.

## The poll shim

```ts
/**
 * Deliberately thin. All this does is wake the engine, which fetches the
 * outline, content-addresses it, and returns early if the hash is unchanged.
 * Putting the comparison here instead would mean doing it inside a 10-second
 * function budget with no ability to retry usefully.
 */
```

It **throws** on a non-OK response rather than swallowing it:

> Throwing marks the invocation failed so it shows up in Sanity's function logs. Swallowing it
> would make a silently dead poller look healthy, which is the one failure this system must not
> have.

## Configuration

Both functions read the same two variables:

```bash
DRIFT_ENGINE_URL=http://127.0.0.1:8080
DRIFT_ENGINE_TOKEN=    # an actor token from DRIFT_ACTORS, not a Sanity credential
```

If either is unset the handler logs and returns rather than crashing the invocation.

## How long is acceptable

> Drift that goes unnoticed for five minutes is not a problem. Drift that goes unnoticed for
> five months is the problem this product exists for.

That is the sizing argument for the poll interval, and it is why a cron function was never
load-bearing in the first place.

## Related

- [HTTP API](/docs/api/http)
- [Scalability](/docs/operations/scalability)
- [ADR-0006](/docs/decisions/engine-owns-the-poll-tick)
