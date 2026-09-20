---
title: Troubleshooting
description: Symptoms, causes and fixes — mostly credentials, version prefixes, and one file that must not be edited.
group: Reference
order: 111
updated: 2026-09-20
---

## The MCP client rejects my token

**`ErrProjectToken`** means exactly what it says: you supplied a **project** token where an
**organisation** token is required.

Dashboard → organisation → Manage → API → Tokens, with the grant
`sanity.knowledge-base.read` (the Context Viewer permission).

This is the single most common setup mistake in the system. → [Connecting
Sanity](/docs/sanity/setup)

## My Context endpoint returns the wrong kind of answer

A **malformed dataset ID in the endpoint's sources is silently skipped**, which can flip the
endpoint from GROQ mode to Knowledge Base mode with no error at all.

Check the endpoint's configured sources in the Context app. DRIFT pins `Mode` explicitly on
every request, but the endpoint's own configuration still decides what it can serve.

## Agent Actions return 404 "no Route matched"

The URL is missing the version prefix. Agent Actions are served only on a versioned path, and
the 404 message points away from the cause.

The same bug appeared independently in the Content Lake mutate client — it is worth grepping for
both if one turns up.

## Drafting fails with a key error mentioning `target.path`

`target.path` must be a **segment list**, not a GROQ string. The error names a key rather than
the shape, which is what makes it slow to diagnose.

## Drafting does nothing and falls back silently

Check the field name you are reading from the drafter's response. The drafter returns `after`;
reading `proposedText` yields undefined and a silent fallback.

More generally: call the endpoint once and look at the body. A fallback that reports a cause it
has not verified will confidently tell you the wrong thing.

## Nothing is flagged, and I expected something

Three possibilities, in order of likelihood:

1. **The outline hash is unchanged.** If nothing changed, the diff is skipped entirely. Check
   `POST /v1/builds/poll` — `{"changed": false}` is the normal, healthy answer.
2. **The claim never carried a typed value.** Recognised units are a closed list —
   `days` `months` `years` `hours` `percent` `%` `USD` `EUR` `GBP`. **Weeks is not among them.**
   Without a typed value the comparison falls back to prose at a lower confidence.
3. **The value is stated outside the first sentence.** The typed value is extracted from the
   claim statement only, which is the entry's first sentence. Prose that introduces a topic
   before committing to it costs the claim its typed value. → [The Knowledge Base
   corpus](/docs/sanity/knowledge-base)

## Everything is flagged as retired

Almost certainly a **short read** that was not caught. The ledger aborts a snapshot rather than
producing a partial one for exactly this reason, so if you are seeing mass retirement, check
whether something downstream is constructing snapshots by another route.

## Approve is refused with `no_unresolved_conflict`

Working as intended, and the most likely thing you will hit against the demo corpus.
`support/returns` has a live disagreement between the policy (authority 5) and the help centre
(authority 2). Settling it belongs in an [instruction](/docs/content-model/instruction), which
fixes the next build, not in a click on one paragraph.

Note that resolving a conflict is currently **display-only** — the permission and the UI exist,
the endpoint does not. → [Known limits](/docs/operations/limits)

## Approve is refused with `correctable_surface`

The dependent is not a page. An agent, feed or template has no paragraph to patch and is
corrected by the next Knowledge Base build. → [Surfaces](/docs/concepts/surfaces)

## The engine says it published nothing

Without `SANITY_WRITE_TOKEN`, the engine gates and audits the approval and then refuses to claim
a publication happened. That is deliberate. → [Fixture mode](/docs/operations/fixture-mode)

## The Studio complains about duplicate types

Schema types available from two places at once — the workspace package and a local copy — produce
duplicate definitions that typecheck individually and conflict when the Studio loads.
`@drift/schema` must be the only definition.

A related trap: duplicate `@sanity/types` pulled in by two `@types/react` versions. The
workspace pins both with a pnpm override.

## `pnpm install` warns about an unmet TypeScript peer

Expected. `@sanity/workflow-blueprint@0.33.0` wants `typescript@^6.0.3`; the workspace pins
5.9.3 deliberately. → [ADR-0003](/docs/decisions/pin-typescript-5)

## The conflict I rely on for the demo disappeared

Somebody edited the Help Centre file. In build 46 it agrees with the policy; in build 47 the
policy says 45 and the Help Centre still says 30, and that disagreement **is** the Conflict
Room, the Dissent refusal, and the gate block.

Three features rest on one un-edited file. → [The Knowledge Base
corpus](/docs/sanity/knowledge-base)

## Two builds hold the same policy twice

Remove `returns-refunds-policy-v3.md` when you add v4. Otherwise the Knowledge Base holds both
and reports a conflict that is really just a superseded document sitting around.

## A blank screen on a freshly seeded dataset

A `reduce` with no initial value over an empty build list. Fixed, and worth remembering as a
class: fixtures were never empty, so the empty case was never exercised.
