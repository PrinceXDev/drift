---
title: The Knowledge Base corpus
description: The two builds the demo is made of, why the sources are files rather than a crawl, and how the prose has to be shaped for a claim to carry a typed value.
group: Sanity integration
order: 62
updated: 2026-09-20
---

`sanity/knowledge-base/` holds the source documents the live Knowledge Base is built from, and
the edit between them that produces the drift the demo is about.

`internal/seeddata` defines the _claims_ DRIFT expects. This directory defines the _inputs_ that
should produce them. They are different artefacts and both are committed, because a demo whose
corpus exists only in somebody's Downloads folder is not reproducible.

## Why files, not a crawl

The Context app offers three source kinds. Only one of them is correct here.

**Files** — what this directory is for. The corpus is under version control, a rebuild is a
re-upload, and the diff between two builds is a diff between two directories.

**Website is wrong**, and wrong in a way worth stating plainly: the only crawlable Northwind
site is `apps/web`, which is the _published content that goes stale_. DRIFT's premise is that
the Knowledge Base holds what the organisation believes and the pages are dependents that fall
behind it. Crawl the pages into the Knowledge Base and the two collapse into one thing, with
nothing left to detect.

**Dataset is wrong** for a duller reason: the `source` documents in the project are metadata —
title, URI, owner, authority. The policy prose is not in them.

## The two builds

Upload `build-46/` first and build. Then replace the three documents in `build-47/` and build
again.

| # | Document | 46 | 47 |
| --- | --- | --- | --- |
| 1 | Returns & Refunds Policy | v3 | **v4 — the file is renamed** |
| 2 | Help Centre — Returns | unchanged | unchanged |
| 3 | EU Distance Selling Addendum | unchanged | unchanged |
| 4 | Limited Warranty Terms | unchanged | unchanged |
| 5 | Shipping & Dispatch Policy | — | **reworded, same numbers** |
| 6 | Brand Voice Guide | — | **reworded** |

`returns-refunds-policy-v3.md` becomes `returns-refunds-policy-v4.md`. Remove the v3 file when
you add v4, or the Knowledge Base will hold both and report a conflict that is really just a
superseded document sitting around.

> [!DANGER]
> **The Help Centre must not be edited.** In build 46 it agrees with the policy — both say 30
> days. In build 47 the policy says 45 and the Help Centre still says 30, and that disagreement
> is the entire Conflict Room. It is also what the Dissent agent refuses to answer over, and what
> blocks the publication gate in the workflow runner. Three features rest on one un-edited file.

## What each change is for

| Change | Claim | Detector | Confidence |
| --- | --- | --- | --- |
| 30 → 45 days | `support/returns` | `typed_value` | 1.0 |
| restocking clause deleted | `support/restocking-fee` | `outline_presence` | 1.0 |
| price-match clause added | `support/price-match` | `outline_presence` | 1.0 |
| tone reworded | `brand/tone` | `semantic` | 0.55 |
| dispatch reworded, **still 2 days** | `shipping/dispatch-time` | — | **must produce nothing** |

The last row is the one to watch. Anyone can demonstrate a detector that fires. **A reworded
sentence that correctly produces no drift event is the harder claim**, and it is the one that
decides whether an operator trusts the feed enough to read it.

## How the prose has to be shaped

`ledger.claimFromEntry` turns one Knowledge Base entry into one claim:

- the entry path becomes the claim path
- the **first sentence** of the entry markdown becomes the claim statement
- the typed value is extracted **from that statement only**, never from the rest of the entry,
  so an entry mentioning several numbers cannot attach an arbitrary one to the claim

So every commitment in these documents is the first sentence under its own heading, stated in
full, with its number and unit in that sentence. Prose that introduces a topic before committing
to it would cost the claim its typed value — dropping the comparison from `typed_value` at 1.0
to `semantic` at 0.55.

### Recognised units are a closed list

```text
days · months · years · hours · percent · % · USD · EUR · GBP
```

> [!WARNING]
> **Weeks is not among them.** "A 6 week warranty" extracts nothing. Durations in this corpus
> are always days, months or years.

One qualifier may sit between the number and the unit, from a closed list: `business`,
`working`, `calendar`. So "within 2 business days" types correctly.

Writing this corpus is what found that it did not, originally — the fixtures hand the differ
finished claims, so the extraction had never been exercised by a test. That is in
[the build log](/docs/operations/build-log).

## An assumption to check on the first build

These documents are written as one commitment per `##` section, assuming the build produces
roughly one entry per section with paths like `support/returns` and `shipping/dispatch-time`.

The outline shape is Sanity's decision, not ours, and the first capture will show what it
actually did. If the paths come out differently the claims still work — they are keyed on
whatever path the entry carries — but they will stop matching the fixture vocabulary the console
and golden files use, and **the corpus is the thing to adjust**.

`brand/tone` is deliberately left untyped. The weak path has to be visible in the demo, and
visibly weaker than the strong one.

## Related

- [Claims](/docs/concepts/claims)
- [ledger](/docs/engine/ledger)
- [Connecting Sanity](/docs/sanity/setup)
