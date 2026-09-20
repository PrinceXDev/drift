---
title: mcp — the Context MCP client
description: JSON-RPC over HTTP against a Sanity Knowledge Base, and the two authentication facts that cost the most time to discover.
group: The engine
order: 38
status: beta
updated: 2026-09-20
---

`internal/mcp` is a Context MCP client for Sanity Knowledge Bases. Context MCP speaks JSON-RPC
2.0 over HTTP, and the endpoint is created in the Context app in the Sanity Dashboard:

```text
https://api.sanity.io/v1/context/organizations/:organizationId/mcp/:mcpEndpointName
```

## Two things about authentication

Both cost time to discover, so they are stated loudly here and in the error messages.

> [!DANGER]
> The token must be an **organisation-level** API token with the Context Viewer permission
> (grant `sanity.knowledge-base.read`). Project-level tokens are rejected. `ErrProjectToken`
> tries to say so in as many words.

> [!WARNING]
> The endpoint derives its mode from its configured sources, and **a malformed dataset ID is
> silently skipped** — which can flip an endpoint from GROQ mode to Knowledge Base mode without
> warning. `Mode` is therefore pinned explicitly on the request rather than left to inference.

The second is the more dangerous of the two, because nothing fails. You get a working endpoint
answering the wrong kind of question.

## The tool surface in Knowledge Base mode

| Tool | Returns |
| --- | --- |
| `initial_context` | The outline — entry paths plus one-line summaries, with `[core]` / `[peripheral]` tags |
| `knowledge_base_read` | Full entries, up to **20 paths per call** |

The outline is small by design — small enough for an agent to hold in context for an entire
conversation — which is also what makes it cheap for DRIFT to fetch on every build and diff.

## Chunking

Reads chunk at the documented 20-path ceiling. A short read aborts the snapshot rather than
producing a partial one; see [ledger](/docs/engine/ledger).

## Parsing the outline

The outline is served as Markdown rather than structured JSON, so the client parses prose — the
one place in the engine where that is unavoidable. It is kept narrow, heavily tested, and
`Outline.Raw` preserves the original so nothing downstream depends solely on the parse
(including the content address, which is taken over the raw text).

```go
type OutlineEntry struct {
	Path    string    `json:"path"`
	Summary string    `json:"summary"`
	Tier    EntryTier `json:"tier"`
}
```

## Envelope handling

`decodeToolResult` is deliberately **lenient about envelope shape and strict about JSON-RPC
errors**, so a shape surprise produces a clear parse failure rather than silently empty data.

Silently empty data is the worst possible outcome here: zero entries diffed against a full build
reads as an organisation that retired everything.

## Verification status

The response envelopes are implemented against the documented contract and tested against a
fake endpoint. Live-endpoint verification is tracked in
[the build log](/docs/operations/build-log) and [Known limits](/docs/operations/limits) — where
three live-endpoint findings from one hour of testing are recorded, including a `v`-prefix
problem that appeared in two different clients.

## Resilience

All calls go through [`internal/resilience`](/docs/engine/resilience): retry with interruptible
backoff, `Retry-After` honoured, and a circuit breaker that admits one probe in half-open. Only
operations marked `Retryable` are retried — reads are, writes are not.

## Related

- [Connecting Sanity](/docs/sanity/setup)
- [ledger](/docs/engine/ledger)
- [Environment variables](/docs/operations/environment)
