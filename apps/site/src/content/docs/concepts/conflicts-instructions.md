---
title: Conflicts and instructions
description: What happens when two sources disagree — and why resolving it writes a decision back into the Knowledge Base instead of patching a page.
group: Concepts
order: 15
updated: 2026-09-20
---

A Sanity Knowledge Base raises a **conflict** at build time when the same fact appears with
different values across sources. Most systems treat that as build noise. Here it is the
product.

## The shape of a conflict

```json
{
  "path": "support/returns",
  "competingValues": [
    {
      "statement": "Returns are accepted within 45 days of delivery.",
      "value": 45,
      "unit": "days",
      "sourceId": "source.returns-policy-v4",
      "authority": 5
    },
    {
      "statement": "You have 30 days to send an item back.",
      "value": 30,
      "unit": "days",
      "sourceId": "source.help-centre-returns",
      "authority": 2
    }
  ],
  "resolvedBy": null
}
```

Two sources, two numbers, and a note of which outranks which.

## Authority resolves the easy case

Every [`source`](/docs/content-model/source) carries an `authority` from 1 to 5:

| Authority | Typically |
| --- | --- |
| 5 | A signed contract or a published policy document |
| 3 | A maintained internal reference |
| 1 | A wiki page somebody wrote once |

When two sources disagree and their authorities differ, the higher-authority source wins by
default and nobody is interrupted. A human is only asked when authorities **tie** — which is
the case where there is genuinely no rule to apply, only a decision to make.

## The clever part: resolving writes a decision, not a patch

Resolving a conflict in the DRIFT console does not edit a page. It writes a plain-language
standing **instruction** back into the Knowledge Base, anchored to the sources that disagreed:

> When the returns policy PDF and the help centre disagree on the return window, the PDF is
> authoritative.

The _next build_ is then correct by construction, and nobody is ever asked again.

That inverts the usual relationship with a knowledge tool. Ordinarily, using an assistant
consumes the corpus. Here, using it **improves** the corpus: every adjudication is a permanent
narrowing of the space of future ambiguity.

## Instructions expire on their own

Sanity auto-archives an instruction when its anchoring source changes. DRIFT does not implement
that behaviour; it exploits it.

The result is **decision expiry for free**. A rule that has outlived the justification it was
written against stops applying, and surfaces as an
[`instruction_archived`](/docs/concepts/drift-events) drift event — a governing decision has
come unmoored from its basis, and somebody should look.

This is unusual enough to be worth stating plainly: most organisations accumulate standing
decisions with no expiry mechanism at all, and the cost is paid years later by somebody
enforcing a rule whose reason nobody remembers. The anchoring is what makes the difference, and
it is a platform feature rather than an application feature.

## The instruction document

| Field | Notes |
| --- | --- |
| `text` | Plain language, as the Knowledge Base expects. Capped at 1000 characters. |
| `anchoredTo` | At least one source. **Changing one of these archives the instruction.** |
| `createdFrom` | The drift event whose adjudication produced this decision — provenance. |
| `decidedBy` | The email of the human who made the call. |
| `status` | `active` or `archived`. |
| `archivedReason` | Read-only; set when Sanity archives it. |

Field-by-field reference: [the `instruction` document type](/docs/content-model/instruction).

## What the Dissent agent does with all this

[Dissent](/docs/apps/dissent) is the Path One agent, and it inverts the standard
grounded-answer design. Before answering, it asks whether its sources agree. When they do not,
it **does not answer**. It presents the disagreement, names which source outranks which and
why, and asks a human to settle it.

Finding the disagreement involves no model at all — the Knowledge Base raised the conflict at
build time, and the agent reads it. A model is needed only to phrase a final answer once the
facts are settled, and that happens in the caller. An agent whose central claim is "I found a
contradiction" should not be asking a language model whether there is one.

## The gate check this turns on

`no_unresolved_conflict` blocks publication of a correction to a claim whose sources still
disagree. If two sources contradict each other, nobody should be settling it by clicking
Approve on a paragraph — the decision belongs in an instruction, where it will apply to the
next build and to every future reader.

Against the committed fixtures this check is the one that refuses, which is the correct
outcome: `support/returns` has an unresolved disagreement, and resolving it is a deliberate act
rather than a side effect of publishing.

## Read next

- [Drift events](/docs/concepts/drift-events)
- [The publication gate](/docs/engine/gate)
- [The Dissent agent](/docs/apps/dissent)
