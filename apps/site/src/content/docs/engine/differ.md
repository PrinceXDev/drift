---
title: differ — the belief diff
description: The package that decides what changed. No model runs here, and the output is byte-identical every time.
group: The engine
order: 32
status: verified
updated: 2026-09-20
---

`internal/differ` computes the belief changelog between two Knowledge Base builds.

**Design rule: no LLM runs in this package.** Everything is deterministic and golden-file
tested, so the same two builds always produce byte-identical events. The model is confined to
proposing claims from entry prose and drafting a correction for a human to approve, and it is
never permitted to decide _that_ something drifted — only to describe it.

That separation is why DRIFT can show its working. A judge or an auditor can check "why is this
page flagged?" by comparing two numbers, without trusting a model at all.

## The algorithm

Claims are matched between builds by `path`. For each path:

| Situation | Emitted |
| --- | --- |
| In `to`, not in `from` | `added`, detector `outline_presence` |
| In `from`, not in `to` | `retired`, detector `outline_presence` |
| In both, typed values differ | `contradicted`, detector `typed_value`, confidence `1.0` |
| In both, fewer citations or a demoted tier | `weakened`, detector `citation_graph` |
| In both, a citation no longer resolves | `citation_broken`, detector `citation_graph` |
| An instruction was archived | `instruction_archived`, detector `instruction_lifecycle` |
| In both, prose differs and nothing above applied | `contradicted`, detector `semantic`, confidence below 1 |

The order matters: deterministic detectors are tried first, and `semantic` is genuinely the
fallback of last resort rather than the default path with exceptions.

## Sameness is decided once

Whether two versions of a claim are "the same" is `Claim.SameSubstanceAs` in `pkg/driftv1`,
and both this package and the [ledger's lineage stamping](/docs/concepts/lineage) call it.

1. Both sides carry a comparable typed value → the numbers decide, and nothing else does.
2. Otherwise, thinner evidence (a lost citation, a demoted tier) is a change.
3. Otherwise, compare the sentence.

> [!WARNING]
> If the differ and the lineage stamp ever disagreed, the console would show a claim marked
> "changed in build 47" beside a feed insisting build 47 changed nothing. `TestLineageAgreesWithDiffer`
> fails the build if they diverge — which is the only defence that survives somebody editing one
> of them in a hurry.

## Confidence

```text
1.0        both builds carried a typed value and a matching unit
< 1.0      the change was inferred from prose
```

Confidence is never produced by a model, because a model's confidence in its own output is the
least useful number available. It is a statement about _which mechanism_ reached the
conclusion.

## Golden files

`testdata/golden/diff-46-47.json` pins the exact output for the demo builds. The test compares
byte-for-byte.

That is a stronger guarantee than it looks. It means any change to detection ordering, event
field population, sort order or number formatting shows up as a diff in review, rather than as
a subtle behaviour change nobody notices until a customer asks why a page stopped being
flagged.

```bash
cd services/drift-engine && go test ./internal/differ/...
```

## What the differ does not do

- Resolve blast radius — that is [`graph`](/docs/engine/graph), called by
  [`pipeline`](/docs/engine/resilience).
- Decide who gets paged — that is `DriftEvent.NeedsHumanReview`, applied by the pipeline.
- Write anything. The differ is a pure function from two snapshots to a slice of events.

## A note from the build log

`DriftEvent` is not comparable in Go — it contains a slice — so the first version of the tests
could not use `==`. That is recorded in [the build log](/docs/operations/build-log) rather than
quietly worked around, because the fix (comparing with `reflect.DeepEqual` against a golden
file) is what produced the byte-identical guarantee in the first place.
