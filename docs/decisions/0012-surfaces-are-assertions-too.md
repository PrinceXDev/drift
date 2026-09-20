# ADR-0012 — A non-page dependent is still an assertion

**Status:** accepted · **Date:** 2026-09-19

## Context

DRIFT's central claim is that its dependency walk is **provably complete**:

```groq
*[_type == "assertion" && references($claimId)]
```

If a page depends on a claim, an assertion says so, and the query cannot miss
it. That is the argument for modelling assertions as documents instead of
inferring them from prose, and it is the reason a correction here can be
approved by somebody who has to be able to say "we got all of them".

It was also, until now, narrower than it sounded. `assertion.page` was required,
so the only thing that could depend on a claim was a content page. Meanwhile the
Dissent agent answers customer questions from the same Knowledge Base. When it
answered "you have 30 days to return it" and the claim moved to 45 days, that
answer was wrong in exactly the way the seven pages were wrong — and invisible
to the query that found them.

Completeness over pages is not completeness. The blast radius said seven; the
true answer was seven and a bot.

## Decision

Introduce a `surface` document — a published place that can depend on a claim —
and let an `assertion` hang off **either** a `page` or a `surface`, never both.

```
assertion.page     → editable content. A paragraph, addressed by Portable Text _key.
assertion.surface  → an agent, a feed, a template. Addressed by a locator.
```

The blast-radius query is unchanged. That is the entire point of the decision.

### Why not a second document type

The obvious alternative was a parallel `dependency` type for non-page
dependents, walked alongside assertions. It would have been a smaller diff and
it would have quietly falsified the sentence at the top of this file: two
queries can disagree, can be added to independently, and can each be complete
while the union of them is not. One document type means one query, and one query
means the answer is still provable.

### Why `kind` matters

Only a page can be *corrected*. There is a document to patch. An agent is not
fixed by rewriting a paragraph — it stops repeating the old value when the
Knowledge Base rebuilds, and nothing a human approves changes that.

So `SurfaceKind.Correctable()` gates it, and the publication gate grew a ninth
check, `correctable_surface`, which blocks a draft aimed at anything else.
Without it, approving a "correction" for the Support Bot would write nothing,
record a completed publication, and mark the work done — the audit trail
asserting a fix that never happened. That is a worse outcome than the stale
answer it was trying to correct.

The Control Room shows the same distinction in words: *"7 pages can be corrected
from the queue. The other surface is downstream of the Knowledge Base."*

### Registration, not inference

An agent calls `Register` once and `Depend` per answer, through a two-method
interface that is all it is given. It cannot read the graph, cannot see the
blast radius it is part of, and cannot mark itself correct. A dependent that can
edit the dependency graph is not a dependent.

Refusals record nothing: the agent published no fact, so no surface now depends
on one, and recording it would inflate every blast radius with places that are
already correct.

## Consequences

- The demo's headline number changed from "7 pages" to "7 pages and the Support
  Bot". The tests assert both halves separately, because a regression that
  dropped either would leave the total looking plausible.
- `pipeline.Summary.AffectedPages` became `AffectedDependents`. The old name had
  become a lie the moment the count included a bot, and a headline that quietly
  means something other than what it says is the failure this product is an
  argument against.
- A surface dependency has no `blockKey`, so `blockKey` is required only for
  page assertions. ADR-0007 still holds everywhere it applies.
- `Depend` on an unregistered surface is an error rather than an implicit
  create. A dependent that appeared without announcing itself has no owner, and
  an unowned surface is one nobody can be asked to fix.
