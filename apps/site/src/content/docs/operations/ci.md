---
title: Testing and CI
description: 243 tests, a golden file, a fixture-drift guard, and a workflow run that fails the build if an agent ever publishes.
group: Operations
order: 84
status: verified
updated: 2026-09-20
---

## Running the tests

```bash
cd services/drift-engine && go test ./...
```

```bash
pnpm typecheck
```

```bash
pnpm workflow:demo
```

243 tests across 15 packages. On Windows without gcc, run plain `go test ./...`; the race
detector needs cgo.

## What CI runs

| Job | Step | Why |
| --- | --- | --- |
| Go engine | `gofmt -l .` | Fails if anything is unformatted |
| | `go vet ./...` | |
| | `go test -race ./...` | `CGO_ENABLED=1` is set explicitly so a future runner change cannot silently drop the race detector |
| | Fixture-drift guard | See below |
| Workspace | `pnpm typecheck` | Every package, including the Sanity schema against `sanity@6.15.0` |
| | Builds | Console, web, studio, site |
| Workflow | `pnpm workflow:demo` | Instantiates the real workflow with two principals |

Superseded runs on the same ref are cancelled — a fifteen-day build does not need to burn
minutes finishing CI for a commit that has already been replaced.

## The fixture-drift guard

```bash
go run ./cmd/seed -format=fixtures > /tmp/fixtures.json
diff -q /tmp/fixtures.json packages/fixtures/src/fixtures.json
```

> The golden file is the demo, frozen. If the committed fixtures no longer match what the engine
> produces, the console and the public site are rendering something the engine cannot actually
> do — which is precisely the failure this project exists to catch, so it fails the build.

That comment is in the workflow file, and it is the single most on-brand piece of CI in the
repository: the project refuses to let its own demo data drift from its own engine.

## The golden diff

`testdata/golden/diff-46-47.json` pins the exact output of the differ for the demo builds,
compared byte-for-byte.

Any change to detection ordering, event field population, sort order or number formatting shows
up as a diff in review rather than as a subtle behaviour change nobody notices until a page
stops being flagged.

## The tests worth knowing about

| Test | What it defends |
| --- | --- |
| `TestAgentCanNeverDispose` | Exhaustive over every role combination: no agent can publish or resolve |
| `TestLineageAgreesWithDiffer` | The lineage stamp and the differ cannot disagree about whether a claim moved |
| Concurrency tests (25 and 40 writers) | Approval idempotency under load |
| Hostile prompt fixture | Document text never reaches the model as instruction text |
| Gate fail-closed cases | An uncomputable check blocks rather than passes |
| Workflow runner exit code | Non-zero if the agent gets through, or if the instance lands where the gate did not choose |

## The workflow run in CI

`pnpm workflow:demo` is not a smoke test. It drives a real
`@sanity/workflow-engine@0.33.0` instance through the deployed definition with two principals,
and asserts on the refusals:

```text
5 · the agent tries to approve, from `drafting`   → activity not in stage
7 · the agent tries to approve, from `review`     → action filter returned false
8 · the gate decides the edge                     → BLOCK no_unresolved_conflict
```

It runs on every push, because a role gate that is only checked by reading the definition is a
role gate nobody has checked.

## Toolchain

```text
Node 22.17 · pnpm 10.27 · Go 1.26 · TypeScript 5.9.3 (pinned)
```

TypeScript is pinned rather than taken from `latest` because the ecosystem currently spans three
majors: `typescript@latest` is 7.x, `@sanity/workflow-blueprint@0.33.0` wants `^6.0.3`, and most
of the toolchain was built against 5.x. See [ADR-0003](/docs/decisions/pin-typescript-5). The
unmet-peer warning on install is expected and documented rather than suppressed.
