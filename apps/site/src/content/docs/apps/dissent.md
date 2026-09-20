---
title: Dissent — the agent
description: The Path One agent. It answers only once its sources agree, and turns every adjudication into a standing decision.
group: Applications
order: 71
status: verified
updated: 2026-09-20
---

`apps/dissent` is the agent, and it is deliberately not the agent everybody else built.

```bash
pnpm --filter @drift/dissent dev
```

![The Dissent agent presenting a disagreement instead of answering: two sources, two values, and the authority of each.](/shots/dissent.png)

## The inversion

A standard grounded-answer agent retrieves a passage, cites it, and answers. It is honest about
_where_ an answer came from and silent about whether the organisation agrees with itself.

Dissent asks a different question first: **do my sources agree about this?**

| Situation | What it does |
| --- | --- |
| Sources agree | Answers, with citations and the build it answered from. |
| Sources disagree, authorities differ | Answers from the higher-authority source, and says which it used and why. |
| Sources disagree, authorities tie | **Refuses.** Presents both values, both sources, and asks for an adjudication. |

All three behaviours are verified in a browser, not just in tests.

## Refusing is the feature

A refusal here is not a failure to answer. It is the only honest answer available: the
organisation has not decided, and inventing a decision on its behalf — by returning whichever
passage ranked higher — is how a customer ends up quoting a number nobody agreed to.

## Settling it improves the corpus

The adjudication is written back into the Knowledge Base as a standing
[instruction](/docs/content-model/instruction), anchored to the sources that disagreed. The
**next build** is then correct by construction, and nobody is ever asked again.

Ordinarily, using an assistant consumes the corpus. Here, using it improves the corpus. That is
the whole idea.

## It registers itself as a dependent

Every time it answers from a claim it writes an
[assertion](/docs/content-model/assertion) naming itself as the
[surface](/docs/concepts/surfaces).

So when the claim later moves, the bot appears in the blast radius alongside the pages — in the
same query, in the same result set, with the same completeness guarantee. Not because anything
special-cased it, but because its dependency is an ordinary assertion.

Before this existed the bot was, in the build log's words, **always wrong and always invisible**.

And it is honest about what can be done next: a bot has no paragraph to patch, so the
`correctable_surface` gate check blocks a drafted correction aimed at it. It is corrected by the
next build, and the UI says so rather than offering a button that would write nothing.

## No model finds the disagreement

- The conflict was raised by the Knowledge Base **at build time**, when the same fact appeared
  with different values across sources. The agent reads it.
- Routing a question to candidate entries is **lexical scoring** over the outline.

A model is needed only to phrase a final answer once the facts are settled. An agent whose
central claim is "I found a contradiction" should not be asking a language model whether there
is one.

## Try it

```bash
curl -s -X POST localhost:8080/v1/dissent \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{"question":"How long do I have to return something?"}' | jq
```

Against the committed fixtures this refuses, because `support/returns` has an unresolved
disagreement between the policy (authority 5) and the help centre (authority 2) — which is
exactly the state the demo corpus is designed to produce.

## Related

- [dissent — the package](/docs/engine/dissent)
- [Conflicts and instructions](/docs/concepts/conflicts-instructions)
- [Surfaces](/docs/concepts/surfaces)
