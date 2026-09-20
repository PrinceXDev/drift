---
title: ADR-0006 — The engine owns the poll tick, not a Scheduled Function
description: DRIFT needs to notice when the Knowledge Base rebuilds. The obvious home is a Sanity Scheduled Function (sanity.function.cron) — it is listed in the Functions documentation as a supported fu
group: Decisions
order: 96
status: stable
updated: 2026-09-19
---
## Context

DRIFT needs to notice when the Knowledge Base rebuilds. The obvious home is a Sanity
Scheduled Function (`sanity.function.cron`) — it is listed in the Functions documentation
as a supported function type, and keeping the trigger inside Sanity would be tidy.

`@sanity/blueprints` does export `defineScheduledFunction`. Its own doc comment says:

> `@alpha` Deploying Scheduled Functions via Blueprints is experimental. This feature is
> not available publicly yet.

Verified in both 0.24.0 and 0.26.1. So it cannot be deployed.

## Decision

The poll ticker lives in the Go engine (`cmd/engine`, `-poll` flag). `sanity.blueprint.ts`
deploys only the document function.

## Consequences

- One fewer deployed Sanity resource, which slightly weakens the "uses Functions deeply"
  story. Accepted: claiming a capability that cannot be deployed would be worse.
- The tick is arguably better placed here anyway:
  - The engine is a long-running process that already holds the MCP client and the
    previous snapshot, so an uneventful poll is one outline fetch and a hash comparison
    against memory.
  - Functions cap at 10s by default (900s maximum). A capture plus diff plus blast-radius
    walk across a large content lake can exceed that, and a webhook is a poor place to
    discover it.
  - Failures retry on the next tick with full context, rather than as an isolated
    invocation with none.
- The engine becomes a required always-on component. It already was — it serves the
  console's SSE stream.
- `sanity/functions/poll-kb-build/` is kept as the HTTP shim for when the alpha lands. It
  already calls the same endpoint the ticker does, so adopting it is a blueprint change
  and nothing else.
- **The document function stays.** Reacting the instant an editor changes a page is
  something a five-minute poll genuinely cannot do, and it is what keeps the integrity
  graph honest when somebody fixes a sentence without going near DRIFT.
