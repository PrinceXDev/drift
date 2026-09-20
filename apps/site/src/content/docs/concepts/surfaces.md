---
title: Surfaces
description: A page is not the only thing that repeats a fact to a customer. An agent is a dependent, and it registers as one.
group: Concepts
order: 13
updated: 2026-09-20
---

A **surface** is a published place that can depend on a claim. There are four kinds, and the
list is short on purpose: it exists to answer one question — _how would you correct this?_ —
and the answers are genuinely different.

| Kind | What it is | How it is corrected |
| --- | --- | --- |
| `page` | Editable published content | Patch the paragraph |
| `agent` | Something answering from the Knowledge Base | Fix the claim; the next build re-grounds it |
| `feed` | Syndicated output: a product feed, an API response, an export | Republish |
| `template` | Transactional copy: email, receipts, notifications | Re-render |

## Why this exists

The original model had exactly one kind of dependent: a content page, addressed by an assertion
at a field path. That was enough to make the argument — seven pages still say 30 days, and the
reference walk finds exactly seven — but it was not the whole truth about where a fact gets
repeated to a customer.

The Dissent agent answers questions from the same Knowledge Base. When it answered "you have 30
days to return it" and the claim then moved to 45, that answer was as wrong as the seven pages,
and it was invisible to the blast radius because it was not a page.

An honest answer to "which published surfaces depend on this claim?" cannot exclude a dependent
for being the wrong shape.

## The design in one line

**A dependency is an assertion either way.**

A page assertion carries a `page` reference and a block key. A surface assertion carries a
`surface` reference and a locator. Both are documents referencing a claim, so the blast-radius
walk is unchanged:

```groq
*[_type == "assertion" && references($claimId)]
```

That matters more than the extra document type. This project's central claim is that the
dependency walk is provably complete; adding a second, parallel way to depend on a claim would
have quietly falsified it.

## What a surface may do

Register, and depend. A surface **cannot**:

- mark itself correct
- resolve its own drift
- publish anything

Correction is only defined for pages, because only a page has a document to patch. Everything
else is downstream of the Knowledge Base and is fixed by fixing the claim and rebuilding. That
decision is encoded once, in the type itself:

```go
// Correctable reports whether a drafted correction can be published to this
// kind of surface. Only pages can: everything else is downstream of the
// Knowledge Base and is fixed by fixing the claim, not by rewriting the output.
func (k SurfaceKind) Correctable() bool { return k == SurfacePage }
```

and callers read it rather than assuming, so a new surface kind cannot quietly go unhandled.

## The gate check this turns on

`correctable_surface` is one of the [nine gate checks](/docs/engine/gate). It blocks a
publication aimed at anything that is not a page.

The reason is not tidiness. Approving a drafted paragraph for a bot would write nothing, record
a completed publication, and mark the work done — a false clean bill of health, which is
precisely the failure this product exists to catch. A queue item nobody can publish is worse
than no queue item at all.

So an agent in a blast radius is reported, attributed to an owner, and counted — and the
correction path for it is "the next build", not "click approve".

## Registration is required, and so is an owner

```json
{
  "_type": "surface",
  "surfaceId": "support-bot",
  "kind": "agent",
  "title": "Support Bot",
  "owner": "sam@northwind.example",
  "locator": "#support-live"
}
```

`owner` is required by the schema. A dependent with no owner is one nobody can be asked to fix,
which makes its appearance in a blast radius a piece of anxiety rather than a piece of work.

`surfaceId` is separate from the document ID so that a content page and a surface record for
the same thing can coexist without colliding.

## How the Dissent agent registers

Every time the agent answers from a claim, it writes an assertion naming itself as the surface.
It is not special-cased anywhere in the graph; it is a row like any other. That is why the walk
that finds the seven pages finds the bot in the same query, in the same result set, with the
same completeness guarantee.

## Read next

- [Assertions and blast radius](/docs/concepts/blast-radius)
- [The Dissent agent](/docs/apps/dissent)
- [ADR-0012](/docs/decisions/surfaces-are-assertions-too)
