---
title: The build log
description: An unreconstructed record of what broke, what it cost, and which of it was avoidable — including the parts where the documentation was wrong and the parts where we were.
group: Operations
order: 85
updated: 2026-09-20
---

`docs/BUILD-LOG.md` is kept honest and live rather than written afterwards. It is timestamped,
it records dead ends, and it records the entries where the mistake was mine rather than the
platform's.

This page is a guide to it. The log itself is 1,100 lines and is the canonical copy.

## The running tally

Every entry names a cost, a cause, and whether it was avoidable. A selection, unedited:

| Cost | Cause | Avoidable? |
| --- | --- | --- |
| ~20 min | Workflows stage API described online does not exist in the shipped package | Only by reading `.d.ts` first — now the default |
| ~15 min | Scheduled Functions not deployable via Blueprints (alpha, undocumented as such) | No |
| ~10 min | Agent Actions URL missing the `v` version prefix | No — the 404 "no Route matched" points away from the cause |
| ~15 min | Content Lake mutate URL missing the `v` prefix — **the same bug as Agent Actions, in the other client** | Yes — I had already written this exact entry once |
| ~20 min | `target.path` sent as a GROQ string, not a segment list | Partly — the error named a key, not a shape |
| ~25 min | Positional block paths break under reordering | Yes — caught by rereading my own comment |
| ~20 min | Contradiction check flagged any same-unit number as a conflict | Yes — caught by my own happy-path test |
| ~20 min | `SameSubstanceAs` compared prose, disagreeing with the differ on a reworded claim | Yes — caught by writing the agreement test I had already decided I needed |
| ~20 min | Every transition defaulted to `$allActivitiesDone`, so `send-back` published and `reject` drafted | Yes — **only ever found by running the definition**, which is the point |
| ~10 min | Runner read `proposedText`; the drafter returns `after`, so a live model call silently fell back | Yes — I never once called the endpoint and looked at its body |
| ~10 min | Concluded an import had failed from an unauthenticated empty read | Yes — I verified with a method that cannot distinguish empty from forbidden |
| ~15 min | "2 business days" never typed, which would have fired the deliberate non-event live | Yes — fixtures hand the differ typed claims, so extraction was never under test |
| ~5 min | `fakeLake` served any path, so the URL bug survived twelve publisher tests | Yes — assert the request line, not only the body |
| ~5 min | `affectedPages` kept its name after it started counting a bot | Yes — the rename was the honest fix, not a bigger label |
| ~10 min | Claim picker reused the feed's 4-column grid; the path landed in the 22px glyph column | Yes — caught by a user opening a browser, which is worse than catching it myself |

## Patterns worth extracting

**The same bug twice, in two clients.** A missing `v` version prefix in the Agent Actions URL,
and then again in the Content Lake mutate URL. The second entry says so plainly: _I had already
written this exact entry once._

**Tests that pass because the fake is too permissive.** `fakeLake` served any path, so a wrong
URL survived twelve tests. The fix is to assert the request line, not only the body.

**Fixtures hiding the code that produces them.** The differ's tests hand it finished, typed
claims — so the extraction that produces those claims was never under test. Writing the real
corpus found two extraction bugs immediately, including one that would have fired the demo's
deliberate non-event.

**An error path that asserted a cause it had not checked.** A fallback reported _why_ something
failed without verifying it. Error paths report; they do not assert.

**Verifying with a method that cannot distinguish two outcomes.** An unauthenticated read
returning empty was read as "the import failed". Empty and forbidden look identical through that
instrument.

## Things the platform got wrong, honestly reported

These are the entries that are genuinely product feedback rather than self-criticism:

- The Workflows stage API described in several write-ups (`requireAssignment`,
  `requireValidation`) **does not exist** in `@sanity/workflow-engine@0.33.0`.
- Workflow package names were not findable by search, and not in the announcement.
- `defineScheduledFunction` exists in `@sanity/blueprints` but its own doc comment says
  deploying Scheduled Functions via Blueprints is experimental and not publicly available.
- Agent Actions are served only on a versioned path, and the 404 message points away from the
  cause.
- A malformed dataset ID in a Context endpoint is **silently skipped**, which can flip the
  endpoint's mode without any error.

## What is still not proven

> `published` is reachable only when the approval actually publishes, and that needs a Content
> Lake the engine can write to. Against committed fixtures the gate refuses anyway — the
> `support/returns` conflict is unresolved and resolving one is display-only everywhere:
> `PermResolveConflict` exists, the Conflict Room renders, and there is no endpoint behind it.
> So the run exercises five of the six transitions, and says which one it did not.
>
> That is the correct outcome rather than a missing feature. `published` means _corrections are
> live_. An instance that entered it on a publication which 404ed would be the audit trail
> asserting a fix that never happened — the precise thing this product exists to prevent.

See [Known limits](/docs/operations/limits) for the full list.

## Why this is in the documentation at all

A tool that claims to detect dishonest content should not ship a dishonest account of its own
construction. The log also happens to be the most useful page for anybody building on the same
beta surfaces, which is the other reason it is here rather than in a drawer.
