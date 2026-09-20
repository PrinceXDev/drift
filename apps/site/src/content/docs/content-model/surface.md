---
title: surface
description: A published place that can depend on a claim — a page, an agent, a feed, a template.
group: Content model
order: 25
updated: 2026-09-20
---

`surface` registers a published thing that can depend on a claim but is not a content page.
The concept page is [Surfaces](/docs/concepts/surfaces); this is the field reference.

## Fields

| Field | Type | Rules | Notes |
| --- | --- | --- | --- |
| `surfaceId` | string | required | Stable identifier an agent registers itself under. Separate from the document ID so a page and its surface record can coexist. |
| `kind` | string | required; `page` `agent` `feed` `template` | Default `page`. **Decides whether a correction can be drafted at all.** |
| `title` | string | required | What an operator would call it: "Support Bot", "Returns & Refunds". |
| `owner` | string | required | Who is accountable when this surface is wrong. |
| `locator` | string | | Where a human goes to see it — a path, a URL, a channel, a queue name. |

## Kind decides correctability

```go
func (k SurfaceKind) Correctable() bool { return k == SurfacePage }
```

Only `page` has a document to patch. Everything else is downstream of the Knowledge Base and is
fixed by fixing the claim and rebuilding.

The engine's `correctable_surface` gate check reads this rather than assuming, so adding a
fifth surface kind cannot quietly produce publications that write nothing.

| Kind | Corrected by |
| --- | --- |
| `page` | Patching the paragraph, through the gate |
| `agent` | The next Knowledge Base build re-grounding it |
| `feed` | Republishing the feed |
| `template` | Re-rendering the template |

## Why `owner` is required

A dependent with no owner is one nobody can be asked to fix. Its appearance in a blast radius
then produces anxiety rather than work, and after a few weeks people stop reading the list. The
schema requires it at registration time, which is the only moment somebody actually knows the
answer.

## What a surface cannot do

Mark itself correct. Resolve its own drift. Publish anything.

Those are not omissions. A bot stops repeating an old value when the Knowledge Base rebuilds,
not when somebody approves a paragraph, and letting it be "approved" would record completed
work that never happened.

## Example

```json
{
  "_type": "surface",
  "_id": "surface.support-bot",
  "surfaceId": "support-bot",
  "kind": "agent",
  "title": "Support Bot",
  "owner": "sam@northwind.example",
  "locator": "#support-live"
}
```

## Preview

```ts
prepare: ({title, kind, owner, locator}) => ({
  title,
  subtitle: `${kind} · ${owner}${locator ? ` · ${locator}` : ''}`,
})
```
