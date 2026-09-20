---
title: ledger — capturing a build
description: Where an external, prose-shaped system becomes something the deterministic core can diff.
group: The engine
order: 31
updated: 2026-09-20
---

`internal/ledger` turns a live Knowledge Base into a comparable snapshot. It is the seam of the
whole system: everything downstream of here is pure functions over data, everything upstream is
network and Markdown.

## What a capture does

1. Fetch the outline with `initial_context`.
2. Fetch every entry with `knowledge_base_read`, chunked at the documented 20-path ceiling.
3. Content-address the result.
4. Extract claims, and stamp each one's [lineage](/docs/concepts/lineage) against the previous
   snapshot.
5. Return a `BuildSnapshot`.

## Content addressing

A snapshot's identity is the hash of what the endpoint **actually returned** — the raw outline
text plus each entry's raw Markdown, in sorted path order.

Two consequences that matter:

- If nothing changed, the hash is identical and the whole diff can be skipped. Knowledge Base
  rebuilds are frequent and mostly uneventful.
- Re-running any historical diff reproduces byte-identical output, because the inputs are pinned
  by content rather than by timestamp. The console can therefore offer "re-run this diff" as
  evidence rather than as a slogan.

The hash covers the _raw_ text rather than the parsed claims deliberately. If the parser
changes, that should be visible as a different snapshot, not silently absorbed.

## Lineage stamping

`CaptureAgainst` takes the previous snapshot and applies `Claim.WithLineage` to every claim:

```text
prior == nil      first seen here · verified here · never changed
same substance    first seen carried · verified here · last change carried
moved             first seen carried · verified NOT advanced · changed here
```

The logic lives on the type rather than in this package so that every producer of a snapshot —
the live capture path, the seed fixtures, a future importer — applies identical rules. A demo
dataset whose lineage was stamped by hand would eventually disagree with the engine that reads
it.

## Never fabricate on partial failure

This is the rule the package is most careful about.

> [!DANGER]
> A short read from the Knowledge Base **aborts the snapshot**. It does not produce a snapshot
> with fewer claims.

The reason is severe. A snapshot missing half its entries, diffed against a complete one, is
indistinguishable from an organisation that retired half its policies overnight — and the
product's response to mass retirement is to flag every page that depends on any of them. A
transport error would become a red screen and a hundred false corrections.

So the capture either returns a snapshot it can stand behind, or it returns an error.

## Claim extraction

Entry prose becomes typed claims here. That is one of the [three places a model
runs](/docs/concepts/determinism), and the proposals enter a review queue rather than the
ledger directly.

The outline parser is the one place in the engine that parses prose out of necessity: the
outline is served as Markdown rather than structured JSON. It is a single narrow regular
expression, heavily tested, and `Outline.Raw` preserves the original so nothing downstream
depends solely on the parse.

```go
var outlineLine = regexp.MustCompile(
	`^\s*[-*]?\s*` +                          // optional bullet
		"`?([a-z0-9][a-z0-9\\-]*(?:/[a-z0-9][a-z0-9\\-]*)*)`?" + // path
		`\s*[-–—:]\s*` +                      // separator
		`(.+?)` +                             // summary
		`\s*(?:\[(core|peripheral)\])?\s*$`,  // optional tier tag
)
```

## Related

- [The Context MCP client](/docs/engine/mcp)
- [buildSnapshot](/docs/content-model/build-snapshot)
- [Claim lineage](/docs/concepts/lineage)
