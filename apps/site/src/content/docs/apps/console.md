---
title: The Knowledge Control Room
description: Five panels that are stages of one process, not peers — feed, conflicts, lineage, queue, audit.
group: Applications
order: 70
status: verified
updated: 2026-09-20
---

`apps/console` is the Control Room: a Sanity **App SDK** application that reads live project
content with `useQuery` and authenticates as a real Sanity user.

```bash
pnpm --filter @drift/console dev      # http://localhost:3333
```

![The Control Room's claim lineage panel: one claim, its sources, the build it was created in, the build it was last verified in, and the eight published surfaces that depend on it.](/shots/console-lineage.png)

## Why a rail and not tabs

Tabs imply peers. These panels are not peers — they are **stages of one process**, and an
operator moves along them:

```text
something changed    →  why do the sources disagree  →  where did it come from
     (Feed)                    (Conflicts)                     (Lineage)
                     →  fix the pages  →  prove what happened
                           (Queue)             (Audit)
```

A persistent rail keeps every stage one keystroke away (`1`–`5`) and keeps the **counts
visible**, which is how somebody notices the queue filling up while they are reading something
else.

## Why the status bar never moves

Current build, integrity state and identity are the three things that make every other number
on screen meaningful.

> A count of stale pages without a build number is unfalsifiable.

## The five panels

### 1 · Drift feed

_What this organisation stopped believing, and what still says otherwise._

![The drift feed: one row per drift event, with the claim path, before and after values, confidence, detector and blast-radius size.](/shots/console-feed.png)

One row per [drift event](/docs/concepts/drift-events): the claim path, the kind, before and
after, the confidence and detector, and the size of the blast radius. Live over
[SSE](/docs/api/http).

### 2 · Conflict room

_Unresolved disagreements between sources. Settling one writes a standing instruction back into
the Knowledge Base._

![The conflict room: the returns policy at authority 5 and the help centre at authority 2, disagreeing about the return window.](/shots/console-conflicts.png)

Each conflict shows its competing values with the authority of each source. Resolving one does
not patch a page — it writes an [instruction](/docs/content-model/instruction), so the next
build is correct by construction.

### 3 · Claim lineage

_Where a statement came from, who verified it, and every published surface that depends on it._

Lineage sits third deliberately: after "what changed" and "who disagrees", before "fix it". That
is the order the questions actually arrive in — you find out a fact moved, you find out the
sources argue about it, and then you want to know where it came from and what depends on it
**before** you approve anything.

Includes the causal graph: the claim at the centre, sources above, dependents below, with pages
and agents distinguished.

### 4 · Remediation queue

_Every correction passes a deterministic gate before a human can publish it._

![The remediation queue: drafted corrections with the gate verdict for each.](/shots/console-queue.png)

Drafts awaiting approval, each with the [gate's](/docs/engine/gate) current verdict. A blocked
item names the failed check and both values, so the operator can act rather than guess.

### 5 · Audit trail

_Append-only and hash-chained. Every entry names an actor, a build and its evidence._

![The audit trail: hash-chained entries naming actor, role, build, subject and evidence.](/shots/console-audit.png)

Includes chain verification, which re-walks every content address and reports the first break.

## Sign in as any principal

In fixture mode the console offers four demo principals — **viewer**, **editor**, **steward**
and **agent** — so least privilege is visible on one screen. Sign in as the agent and watch the
approve control disappear; sign in as the viewer and watch the audit panel refuse.

That is not a mock. The console is asking `GET /v1/me` and rendering what the engine says the
actor may do, and the engine enforces the same table on every route.

## Getting from here to the documentation

The last item in the status bar is a link to this documentation site. Every number to its left
is a term with a precise meaning — build, outline hash, places wrong, sources disagreeing — and
an operator who does not yet know them otherwise has nowhere to go.

The site is a separate process on a separate port, so the URL is configurable:

```bash
VITE_DOCS_URL=http://localhost:3100
```

In a deployment that is a hostname rather than a local port; the console has no way to guess
it, so it reads it rather than assuming.

## Live content versus fixtures

The `sanityContent` prop changes where **claims, pages and assertions** come from — live Sanity
project content, or the committed fixtures. Either way the **drift events come from the
engine**, because the diff is the engine's job and nothing else is allowed to compute it.

## Why the Control Room is read-only about its own health

Two different failure modes are kept distinct: an engine that is unreachable, and an engine that
is reachable and has nothing to report. Telling somebody their engine is down when it is running
and simply quiet is how an operator learns to distrust a status indicator.

## Related

- [HTTP API](/docs/api/http)
- [The publication gate](/docs/engine/gate)
- [Fixture mode](/docs/operations/fixture-mode)
