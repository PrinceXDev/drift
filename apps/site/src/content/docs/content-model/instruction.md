---
title: instruction
description: A standing decision written back into the Knowledge Base — and the reason using the agent improves the corpus.
group: Content model
order: 28
updated: 2026-09-20
---

`instruction` is a standing decision, mirrored from the Knowledge Base. It is what resolving a
conflict in DRIFT actually produces.

Resolving a conflict does **not** patch a page. It writes a plain-language decision back into
the Knowledge Base, anchored to the sources that disagreed, so the _next_ build is correct by
construction and nobody is asked again.

## Fields

| Field | Type | Rules | Notes |
| --- | --- | --- | --- |
| `text` | text | required, ≤ 1000 | Plain language, as the Knowledge Base expects. |
| `anchoredTo` | array of refs to `source` | required, ≥ 1 | The sources this decision governs. **Changing one archives the instruction.** |
| `createdFrom` | ref to `driftEvent` | | Provenance: which adjudication produced this decision. |
| `decidedBy` | string | email | The human who made the call. |
| `status` | string | `active` or `archived` | Default `active`. |
| `archivedReason` | string | read-only | Set when Sanity archives it. |

## What good instruction text looks like

> When the returns policy PDF and the help centre disagree on the return window, the PDF is
> authoritative.

It names the sources, names the field of disagreement, and states a rule. It does not restate
the current value — a decision that says "the answer is 45 days" expires the moment the policy
changes to 60, whereas a decision about _precedence_ keeps working.

## Auto-archival is the feature

Sanity archives an instruction when one of its anchoring sources changes. DRIFT does not
implement that; it exploits it, and the result is **decision expiry for free**.

```text
source edited
   └─► instruction anchored to it is archived by Sanity
         └─► differ emits driftEvent{kind: instruction_archived}
               └─► a governing rule has come unmoored from its justification
```

Most organisations accumulate standing decisions with no expiry mechanism at all, and the cost
is paid years later by somebody enforcing a rule whose reason nobody remembers. Anchoring is
what closes that loop, and it is a platform feature rather than an application feature.

## Why `anchoredTo` requires at least one source

An instruction anchored to nothing can never expire. It would be a permanent rule with no
stated basis — exactly the artefact this product exists to detect elsewhere in an organisation.

## Provenance

`createdFrom` points at the drift event whose adjudication produced the decision, and
`decidedBy` records who made it. Between them, a reader six months later can reconstruct not
just what the rule is but the argument that produced it.

## Example

```json
{
  "_type": "instruction",
  "_id": "instruction.returns-precedence",
  "text": "When the returns policy PDF and the help centre disagree on the return window, the PDF is authoritative.",
  "anchoredTo": [
    {"_ref": "source.returns-policy-v4"},
    {"_ref": "source.help-centre-returns"}
  ],
  "createdFrom": {"_ref": "drift.46-47.support-returns"},
  "decidedBy": "sam@northwind.example",
  "status": "active"
}
```

## Related

- [Conflicts and instructions](/docs/concepts/conflicts-instructions)
- [The Dissent agent](/docs/apps/dissent)
- [buildSnapshot](/docs/content-model/build-snapshot)
