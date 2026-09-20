---
title: dissent — answering by finding the disagreement
description: The agent that refuses to answer when its sources disagree — and writes the adjudication back into the Knowledge Base.
group: The engine
order: 41
updated: 2026-09-20
---

`internal/dissent` answers questions by finding the disagreement first.

## Why this exists

The standard grounded-answer agent retrieves a passage, cites it, and answers. That is honest
about _where_ an answer came from and silent about whether the organisation actually agrees
with itself.

When two sources say different things, retrieval picks one — usually whichever ranked higher —
and the disagreement disappears into a confident sentence with a citation on it.

Dissent inverts that. Before answering it asks: **do my sources agree about this?** When they
do not, it does not answer. It presents the disagreement, names which source outranks which and
why, and asks a human to settle it.

## The part that makes it worth building

Settling it does not just unblock the question. The adjudication is written back into the
Knowledge Base as a standing [instruction](/docs/content-model/instruction), anchored to the
sources that disagreed — so the **next build is correct by construction** and nobody is ever
asked again.

Using the agent improves the corpus. That is the whole idea.

## Where the model is, and is not

Nowhere in this package.

- Finding the disagreement is **structural**: Sanity's Knowledge Base raises a conflict at build
  time when the same fact appears with different values across sources, and this code reads
  those conflicts.
- Routing a question to candidate entries is **lexical scoring** over the outline.

A model is needed only to phrase a final answer in prose once the facts are settled, and that
happens in the caller. An agent whose central claim is "I found a contradiction" should not be
asking a language model whether there is one.

## The three behaviours

| Situation | What it does |
| --- | --- |
| Sources agree | Answers, with citations and the build it answered from. |
| Sources disagree, authorities differ | Answers using the higher-authority source, and says which it used and why. |
| Sources disagree, authorities tie | **Refuses.** Presents both values, both sources, and asks for an adjudication. |

## It registers as a dependent

Every time it answers from a claim, it writes an [assertion](/docs/content-model/assertion)
naming itself as the [surface](/docs/concepts/surfaces).

That is what puts the bot in the blast radius alongside the pages. When the claim later moves,
the walk that finds the seven pages finds the bot in the same query — not because anything
special-cased it, but because its dependency is an ordinary assertion.

Before this existed, the agent was "always wrong and always invisible", which is how
[the build log](/docs/operations/build-log) records it.

## Routing

Question → candidate entries is lexical scoring over the outline. That was tuned twice during
the build: once because it was too generous (returning candidates for questions the corpus said
nothing about), and once because the fix briefly broke it entirely. Both are in the build log,
with timestamps.

## Related

- [The Dissent app](/docs/apps/dissent)
- [Conflicts and instructions](/docs/concepts/conflicts-instructions)
- [Surfaces](/docs/concepts/surfaces)
