---
title: contentPage
description: Published, customer-facing content — kept deliberately thin, because the interesting structure lives elsewhere.
group: Content model
order: 23
updated: 2026-09-20
---

`contentPage` is published, customer-facing content. This is the stuff that drifts.

It is kept deliberately thin. The interesting structure lives in
[`assertion`](/docs/content-model/assertion), which points _into_ this document at a specific
block.

## Fields

| Field | Type | Rules | Notes |
| --- | --- | --- | --- |
| `title` | string | required, ≤ 200 | |
| `slug` | slug | required | Sourced from `title`, max length 96. |
| `summary` | text | | Two rows. Used in listings. |
| `body` | array of `block` | required | Portable Text. Assertions address paragraphs inside it. |
| `owner` | string | required, email | Who reviews corrections to this page. |

## A page does not declare its dependencies

This is the design point worth dwelling on. A page has no `claims` array, no `dependsOn` field,
nothing an author has to remember to fill in.

Assertions declare the dependency **on the page's behalf**. That means a page can be authored
completely normally — by somebody who has never heard of DRIFT — and still participate in the
integrity graph. The graph is a property of the system, not a burden on the editor.

It also means the traversal direction is the useful one. You never ask "what does this page
depend on?" at scale; you ask "what depends on this claim?", and that is exactly the query a
reference makes cheap:

```groq
*[_type == "assertion" && references($claimId)]
```

## Body blocks and addressing

The remediation agent rewrites a single block and nothing else. It targets the block by its
Portable Text `_key`, carried on the assertion — never by array index.

```text
fieldPath   body[3]                                 for humans, and for rendering
blockKey    b01                                     what the agent and publisher target
patch path  body[_key=="b01"].children[0].text      what actually gets written
```

Reordering two paragraphs changes `body[3]`. It does not change `_key`. See
[ADR-0007](/docs/decisions/address-blocks-by-key).

## Owner

`owner` is the person who approves a correction to this page in the
[review stage](/docs/sanity/workflows) of the workflow. It is required, because a page with no
owner produces a draft correction nobody has standing to approve, and the remediation queue
fills with work that cannot complete.

## Example

```json
{
  "_type": "contentPage",
  "_id": "page.returns",
  "title": "Returns & Refunds",
  "slug": {"current": "returns"},
  "summary": "How to send something back, and what happens next.",
  "owner": "sam@northwind.example",
  "body": [
    {
      "_type": "block",
      "_key": "b01",
      "children": [
        {"_type": "span", "text": "Returns are accepted within 30 days of delivery."}
      ]
    }
  ]
}
```

That `b01` block is the one the demo corrects — and `30` is the number that moved.

## Related

- [The public site](/docs/apps/web-and-studio)
- [The Content Lake publisher](/docs/engine/contentlake)
