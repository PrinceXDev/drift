---
title: ADR-0001 — Record architecture decisions
description: DRIFT is a project about the cost of decisions whose justification has been lost. Not recording our own would be embarrassing.
group: Decisions
order: 91
status: stable
updated: 2026-09-19
---
## Context

DRIFT is a project about the cost of decisions whose justification has been lost. Not
recording our own would be embarrassing.

## Decision

Every non-obvious choice gets a short ADR here. Format: context, decision, consequences.
An ADR is never edited after acceptance — it is superseded by a new one, which links back.

## Consequences

Slight overhead per decision. In return, a reviewer can reconstruct why the codebase looks
the way it does, and the decision record is itself a small demonstration of the thesis.
