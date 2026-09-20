---
title: Decision records
description: Thirteen choices that could reasonably have gone the other way, each with the context that made it a choice at all.
group: Decisions
order: 90
updated: 2026-09-20
---

DRIFT is a project about the cost of decisions whose justification has been lost. Not recording
our own would be embarrassing.

Every non-obvious choice gets a short record here: context, decision, consequences. These pages
are imported verbatim from `docs/decisions` in the repository — they are the canonical artefact,
and maintaining a second, prettier copy would be exactly the failure mode this product exists to
detect.

## The thirteen

| # | Decision | Why it was a decision |
| --- | --- | --- |
| [0001](/docs/decisions/record-architecture-decisions) | Record architecture decisions | The alternative is losing the reasoning while keeping the code. |
| [0002](/docs/decisions/knowledge-base-as-time-series) | Treat the Knowledge Base as a time series, not a corpus | Five of the first eleven public submissions built the chat box. |
| [0003](/docs/decisions/pin-typescript-5) | Pin TypeScript 5.9.3 rather than take `latest` | The ecosystem currently spans three majors at once. |
| [0004](/docs/decisions/deterministic-core-llm-at-the-edges) | Deterministic core, LLM only at the edges | The easy version cannot be trusted, tested, or checked. |
| [0005](/docs/decisions/assertion-as-a-document) | Model assertions as documents rather than inferring them | Inference is free and unprovable; declaration costs an extraction step and is exact. |
| [0006](/docs/decisions/engine-owns-the-poll-tick) | The engine owns the poll tick, not a Scheduled Function | Scheduled Functions are not deployable via Blueprints yet. |
| [0007](/docs/decisions/address-blocks-by-key) | Address blocks by `_key`, never by position | A positional path rewrites the wrong paragraph after a reorder. |
| [0008](/docs/decisions/one-event-log-not-five-subsystems) | One append-only event log, not five subsystems | Five subsystems means five places to disagree about what happened. |
| [0009](/docs/decisions/grants-make-authorization-structural) | Authorization returns a capability, not a boolean | A forgotten check should fail to compile, not fail silently. |
| [0010](/docs/decisions/publication-gate) | Approval means "publish this if it is still right" | Between drafting and approval, the world moves. |
| [0011](/docs/decisions/one-transaction-for-page-and-assertion) | Publish the page and its assertion in one transaction | The half-failure is a false clean bill of health. |
| [0012](/docs/decisions/surfaces-are-assertions-too) | A non-page dependent is still an assertion | Completeness over pages is not completeness. |
| [0013](/docs/decisions/lineage-is-computed-not-stored) | Claim lineage is stamped by the ledger, never authored | A provenance field somebody can type into is one that will be wrong. |

## The four that matter most

If you read only a few, read these.

**[ADR-0002](/docs/decisions/knowledge-base-as-time-series)** is the product. Everything else is
a consequence of deciding that an immutable build makes a knowledge base diffable.

**[ADR-0005](/docs/decisions/assertion-as-a-document)** is the mechanism. It is the difference
between "these pages probably mention the returns policy" and "these eight surfaces assert this
claim, and the query cannot have missed one."

**[ADR-0004](/docs/decisions/deterministic-core-llm-at-the-edges)** is why anybody should
believe the output.

**[ADR-0012](/docs/decisions/surfaces-are-assertions-too)** is the one that was discovered
rather than designed — the bot was always wrong and always invisible, and fixing it without
adding a second graph is what kept the completeness argument true.

## Format

Each record states its status and date, the context that made the choice necessary, the
decision, and the consequences — including the ones that turned out badly. Several of them
document a first implementation that was wrong and what it cost, because that is the part a
reader six months from now actually needs.
