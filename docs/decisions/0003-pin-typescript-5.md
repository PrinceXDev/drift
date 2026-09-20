# ADR-0003 — Pin TypeScript 5.9.3 rather than take `latest`

**Status:** accepted · **Date:** 2026-09-19

## Context

`typescript@latest` is 7.0.2, the native port of the compiler. Separately,
`@sanity/workflow-blueprint@0.33.0` declares a peer dependency of `typescript@^6.0.3`.

So the ecosystem currently spans three majors: Sanity's newest beta wants 6.x, npm's default
gives 7.x, and most of the rest of the toolchain was built against 5.x.

## Decision

Pin **5.9.3** across the workspace and set `strict-peer-dependencies=false`.

## Consequences

- One loud but harmless peer warning on install, explained in the build log.
- We are not first to find compiler-rewrite bugs during a 15-day build.
- If `@sanity/workflow-blueprint` turns out to genuinely need 6.x features at runtime rather
  than just declaring it, this gets revisited. Nothing has broken so far.
