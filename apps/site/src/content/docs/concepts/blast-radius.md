---
title: Assertions and blast radius
description: The single most important design decision in DRIFT — modelling the dependency between published text and the fact it rests on as a document.
group: Concepts
order: 12
status: stable
updated: 2026-09-20
---

An **assertion** is a specific place on a published surface where a claim is expressed. It
holds a real Sanity reference to the claim, which makes computing the blast radius of a changed
fact a traversal rather than an inference:

```groq
*[_type == "assertion" && references($claimId)]
```

One query. Exact, instant, and provably complete — if a page depends on a claim, an assertion
says so, and the query cannot miss it.

## The choice that was actually available

When a claim changes, you need every published page that depends on it. There were two ways to
get that list.

**A. Infer it.** Embed page content, semantic-search for pages that probably discuss the topic.
No authoring burden at all. Approximate, unprovable, and it cannot answer the only question
that matters at approval time: _did we get all of them?_

**B. Declare it.** Model `assertion` as a first-class document holding a real reference. Costs
an extraction step. Exact, and the completeness argument is a property of the data model rather
than a claim about a model's recall.

DRIFT chose B, and the whole product rests on it. A correction you cannot prove is complete is
a correction nobody can safely approve — which means option A does not produce a worse version
of this product, it produces a demo.

> [!NOTE]
> This is the concrete meaning of "structured content is the mechanism, not decoration". Remove
> the structure and the product does not degrade. It ceases to exist. See
> [ADR-0005](/docs/decisions/assertion-as-a-document).

## What an assertion holds

| Field | Purpose |
| --- | --- |
| `claim` | Reference to the fact this text depends on. Required. **This is the edge the product walks.** |
| `page` | The `contentPage` carrying it — set for page assertions. |
| `surface` | A non-page dependent: an agent, a feed, a template. Set instead of `page`. |
| `fieldPath` | Where inside the page the claim is expressed, e.g. `body[3]`. For humans, and for rendering. |
| `blockKey` | The Portable Text `_key` of the addressed block. **This is what the remediation agent targets.** |
| `renderedText` | The exact published sentence, as a reader sees it. |
| `verifiedAgainstBuild` | The build this text was last confirmed correct against. Read-only. |
| `state` | `verified`, `stale`, `contradicted` or `orphaned`. Read-only. |

An assertion addresses a page **or** a surface, never both and never neither. The schema
enforces that with a custom validation rule on each field, because an assertion hanging off
nothing is a dependency nobody can act on.

## Why the block key, and not the index

`fieldPath` looks sufficient. It is not.

The remediation agent uses the addressed span as its `target`, which is the mechanism that
stops it rewriting anything outside the sentence it was asked to fix. A positional path into a
mutable array points at **different text** the moment somebody reorders two paragraphs — and
then the agent rewrites the wrong sentence, inside the scope restriction, with the gate
satisfied.

So the assertion carries the block's `_key`, and the publisher patches by key:

```text
body[_key=="b01"].children[0].text
```

In a tool about content going quietly out of date, an addressing scheme that goes quietly out
of date would be a poor joke. The schema requires `blockKey` on every page assertion; a surface
has no Portable Text to key into, so it is not required there. See
[ADR-0007](/docs/decisions/address-blocks-by-key).

## State is derived, not remembered

`verifiedAgainstBuild` is what makes "approved" mean something. Staleness is computed by
comparing that build to the current one, rather than by remembering a boolean somebody set
once.

| State | Meaning |
| --- | --- |
| `verified` | The text agrees with the claim as of the current build. |
| `stale` | The claim has moved since this text was last verified. |
| `contradicted` | The text asserts something the current build actively denies. |
| `orphaned` | The claim it depended on no longer exists in the current build. |

## Completeness over pages is not completeness

A content page is one kind of dependent. An agent answering from the same Knowledge Base is
another, and so is a syndicated feed or an email template. They differ in how you correct them,
and not at all in how they go wrong.

When the Dissent agent tells a customer "you have 30 days to return it" and the policy moves to
45, that answer is wrong in exactly the way the seven pages are wrong. Before surfaces existed
in the model it was invisible to the query that found them.

The fix was **not** a second graph. A second, parallel way to depend on a claim would have
quietly falsified the completeness argument, because two walks that are each complete over
their own half do not compose into one complete answer. Instead a non-page dependent registers
as a [`surface`](/docs/concepts/surfaces), and its dependency is an ordinary assertion — so the
same query answers the whole question. See
[ADR-0012](/docs/decisions/surfaces-are-assertions-too).

## How the walk is executed

[`internal/graph`](/docs/engine/graph) fans out under a semaphore, so a claim with a thousand
dependents does not open a thousand concurrent requests. The blast radius is precomputed at
diff time onto the `driftEvent`, so the console can render "8 affected" without a traversal on
every paint — and then **recomputed again at the gate**, because a page that started depending
on the claim after drafting is exactly what the approver needs to know about before they click.

## Read next

- [Surfaces](/docs/concepts/surfaces)
- [The graph package](/docs/engine/graph)
- [The `assertion` document type](/docs/content-model/assertion)
