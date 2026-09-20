---
title: Known limits
description: What is verified, what is implemented but unverified, and what does not exist yet — stated rather than rounded up.
group: Operations
order: 86
updated: 2026-09-20
---

This page exists so that nothing on the rest of the site has to be read charitably.

## Verified against a live Sanity project

| Thing | Evidence |
| --- | --- |
| Agent Actions drafter | Live against a real project: proposes, never writes, touches one block |
| App SDK console | Real `@sanity/sdk-react`, Sanity auth, live `useQuery` over project content |
| Workflow definition | Instantiated with the real engine and two principals; the agent was refused twice |
| Go engine end to end | Fixture mode, 243 tests, golden-file diff |
| Public site | 7 pages prerendering with a per-page integrity strip |
| Studio | Builds; desk organised around sources |

## Implemented, not yet verified against a live endpoint

| Thing | Status |
| --- | --- |
| Context MCP response envelopes | Implemented against the documented contract; tested against a fake endpoint. Live verification blocked on an organisation-level Context Viewer token. |
| Knowledge Base build shape | The corpus assumes roughly one entry per `##` section with paths like `support/returns`. **The outline shape is Sanity's decision, and the first capture will show what it actually did.** |

If the paths come out differently, the claims still work — they are keyed on whatever path the
entry carries — but they will stop matching the fixture vocabulary the console and golden files
use, and the corpus is the thing to adjust.

## Not implemented

| Thing | State |
| --- | --- |
| Conflict resolution endpoint | `PermResolveConflict` exists and the Conflict Room renders, but **there is no endpoint behind it**. Resolving is display-only. |
| Scheduled Function poll | Not deployable via Blueprints; the shim in `sanity/functions/poll-kb-build` is kept for when the alpha lands. The engine's own ticker does the work — [ADR-0006](/docs/decisions/engine-owns-the-poll-tick). |
| `published` workflow stage, against fixtures | Unreachable by design; it means _corrections are live_, and there is nothing to publish to. |

## Deliberate limitations

These are choices rather than gaps.

**The contradiction check is conservative.** It requires the corrected text to mention something
_distinctive_ to another claim — a term from that claim's path that does not also appear in the
path of the claim being corrected. It will miss contradictions expressed purely in prose with no
distinguishing term.

That is the correct trade: a false positive blocks a legitimate publication, and operators who
are blocked spuriously learn to click through warnings, which costs more than a miss. The first
implementation flagged any same-unit number and produced three false positives on the demo data,
because return windows, dispatch times and cooling-off periods are all measured in days.

**Blast-radius growth warns rather than blocks.** It is a reason to look, not a reason to refuse.
Making everything blocking teaches operators to route around the gate.

**Recognised units are a closed list.** `days` `months` `years` `hours` `percent` `%` `USD`
`EUR` `GBP`. **Weeks is not among them** — "a 6 week warranty" extracts nothing and the claim
falls back to prose comparison.

**Time travel is fold-the-log, not point-in-time reconstruction.** Folding the event log to a
sequence number, and walking `supersededBy` between claims. The Content Lake's own history
features are the right tool for arbitrary dataset reconstruction, and DRIFT does not duplicate
them.

**Only pages are correctable.** An agent, feed or template in a blast radius is reported and
attributed, and the `correctable_surface` check blocks a drafted correction aimed at it. It is
fixed by fixing the claim and rebuilding.

## Things that will bite you in setup

- Using a **project** token where an **organisation** token is required, or the reverse. The two
  are not interchangeable and this is the most common mistake.
- A malformed dataset ID in the Context endpoint's sources is silently skipped, which can flip
  the endpoint from GROQ mode to Knowledge Base mode with no error.
- Forgetting `sanity schema deploy`, which leaves Agent Actions without a schema to bind to.
- Leaving `returns-refunds-policy-v3.md` in place when adding v4, which produces a conflict that
  is really just a superseded document sitting around.
- Editing the Help Centre file. [Three features rest on it not
  changing](/docs/sanity/knowledge-base).

## Related

- [The build log](/docs/operations/build-log)
- [Connecting Sanity](/docs/sanity/setup)
- [The publication gate](/docs/engine/gate)
