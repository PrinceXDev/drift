---
title: source
description: An authoritative input a Knowledge Base is built from — and the only writable truth in the system.
group: Content model
order: 21
updated: 2026-09-20
---

`source` is an authoritative input that a Knowledge Base is built from: a policy document, a
specification, a contract, a page.

Sources are the only writable truth in the system. Knowledge Base entries are immutable and
belong to a build, so the only way to change what the organisation asserts is to change a
source — or to add an [instruction](/docs/content-model/instruction).

## Fields

| Field | Type | Rules | Notes |
| --- | --- | --- | --- |
| `title` | string | required, ≤ 200 | |
| `kind` | string | required; `policy` `spec` `contract` `page` | Radio list, default `policy` |
| `uri` | url | required; `http` / `https` only | Where the source lives. Cited by every claim derived from it. |
| `owner` | string | required, email | Who is accountable for keeping this source correct. |
| `authority` | number | required, 1–5 | How much this source outranks others when they disagree. |
| `body` | text | required | The text the Knowledge Base indexes. **Editing this is what triggers drift.** |
| `lastChangedAt` | datetime | read-only | Set by the on-source-change Document Function, not by hand. |
| `kbSourceRef` | string | | The identifier this document carries inside the Knowledge Base, used to map entry citations back to this document. |

## Authority

`authority` is what lets the engine resolve a conflict deterministically when two sources
disagree. The higher-authority source wins by default, and a human is only asked when
authorities tie.

| Value | Typically |
| --- | --- |
| 5 | A signed contract or a published policy |
| 4 | A reviewed, versioned internal document |
| 3 | A maintained internal reference — the default |
| 2 | A help-centre article |
| 1 | A wiki page somebody wrote once |

The scale is coarse on purpose. A finer one invites arguments about whether something is a 6 or
a 7, which is time spent on the ranking rather than on the disagreement it was meant to settle.

## Why `owner` is required

Every dependent in this system has somebody accountable for it. A source with no owner produces
claims with no owner, which produces drift nobody can be asked to adjudicate — and the queue
quietly grows until people stop looking at it.

## Example

```json
{
  "_type": "source",
  "_id": "source.returns-policy-v4",
  "title": "Returns & Refunds Policy v4",
  "kind": "policy",
  "uri": "https://northwind.example/legal/returns-v4.pdf",
  "owner": "legal@northwind.example",
  "authority": 5,
  "body": "Customers may return any item within 45 days of delivery…",
  "kbSourceRef": "kb:src:returns-policy-v4"
}
```

## Related

- [Conflicts and instructions](/docs/concepts/conflicts-instructions)
- [The Knowledge Base corpus](/docs/sanity/knowledge-base)
