# DRIFT

**Your code has version control. Your beliefs don't.**

DRIFT is a knowledge-integrity control plane built on Sanity Knowledge Bases. It diffs
successive builds of your compiled knowledge, computes the blast radius of every changed
claim across your published content, and drives remediation through a Sanity Workflow with a
human in the loop.

It does not answer questions. It answers a different one:

> _What did this organisation stop believing — and what is still saying the old thing?_

---

## The idea in one paragraph

Sanity Knowledge Base entries **belong to a build and cannot be edited by hand**. That single
product decision means every build is an immutable, timestamped snapshot of what an
organisation currently asserts to be true. Two snapshots can be diffed. A knowledge base
stops being a corpus you read and becomes a **time series you can ask questions of**. DRIFT
is what you build once you notice that.

## How it works

```
source edited
   |
Knowledge Base rebuilds          immutable entries, conflicts detected at build time
   |
buildSnapshot captured           content-addressed; two snapshots are comparable
   |                             claims stamped: first seen / last verified / last changed
differ                           deterministic - no LLM - golden-file tested
   |  driftEvent{kind, before, after, confidence, detectedBy}
graph                            *[_type == "assertion" && references($claimId)]
   |  blastRadius: [assertion]   exact, not inferred - pages AND agents
Workflow: detected -> triage -> drafting -> review -> published
   |                             agent drafts - human approves - role-gated
assertions re-stamped with the build they were verified against
```

Every fact therefore has a lineage, and it is one query rather than five:

```
CLAIM  "Returns are accepted within 45 days of delivery."
  |
  +-- Source      Returns & Refunds Policy v4 (authority 5) · Help Centre (2)
  +-- Created     build 46 · 12 Sep
  +-- Verified    build 46 · 12 Sep · by whom, from the audit chain
  +-- Published   7 pages + the Support Bot
  +-- Changed     build 47 · 19 Sep · 30 days -> 45 days, typed value, confidence 1.0
```

## Why it needs Sanity specifically

Remove Sanity and you do not have a slightly worse DRIFT — you have a six-month data
engineering project to rebuild the substrate. Four things have to be true at once, and no
other product provides them together:

| Requirement                                                            | Sanity feature                                    |
| ---------------------------------------------------------------------- | ------------------------------------------------- |
| Immutable, timestamped knowledge snapshots                             | Knowledge Base builds (entries belong to a build) |
| Contradiction surfaced, not averaged away                              | Build-time conflict detection                     |
| Decisions that outlive a rebuild — and expire when their basis changes | Instructions (auto-archived on source change)     |
| A **provably complete** dependency walk over the same content          | Sanity references + GROQ                          |

That last row is the crux. Every alternative approach is forced into semantic search over
prose, which can only ever guess which pages are affected. A correction you cannot prove is
complete is a correction nobody can safely approve.

And a walk that is complete over _pages_ is not complete. A content page is one kind of
**surface**; an agent answering from the Knowledge Base is another. When the Dissent agent
tells a customer "30 days" and the policy moves to 45, that answer is wrong in exactly the
way the seven pages are wrong. So an agent registers as a dependent and its dependency is an
ordinary `assertion` — same document type, same GROQ query, one answer — rather than a
second, parallel graph that could each be complete while their union was not. See
[ADR-0012](docs/decisions/0012-surfaces-are-assertions-too.md).

Not every dependent can be corrected, and the system says so rather than pretending. A page
has a paragraph to patch; a bot does not, and stops repeating the old value when the
Knowledge Base rebuilds. The gate blocks a draft aimed at anything unpatchable, because
approving one would write nothing, record a completed publication, and mark the work done.

## Repository layout

```
apps/
  console/        the Knowledge Control Room - feed, conflicts, lineage, gate, audit
  dissent/        the Path One agent - answers only once sources agree
  web/            Next.js public site - the content that drifts
  studio/         Sanity Studio - where sources are edited, so where drift starts
packages/
  schema/         8 document types - the single source of truth
  fixtures/       engine output, committed - shared by console and web
services/
  drift-engine/
    cmd/engine/   HTTP API + poll ticker
    cmd/seed/     emits NDJSON for Sanity, and fixtures for the UIs
    internal/
      telemetry/  correlation IDs, redaction, fingerprinting
      resilience/ retry, backoff, jitter, circuit breaker
      contentlake/ the Sanity write client - one atomic transaction per publication
      authz/      roles, capability grants, hashed token registry
      eventlog/   the append-only spine: audit + idempotency + replay + time travel
      gate/       9 deterministic publication checks. no LLM
      remediation/ the orchestrated slice: authorize -> gate -> record -> publish
      mcp/        Context MCP client - initial_context, knowledge_base_read
      agent/      Agent Actions drafter - the only LLM call in the engine
      dissent/    the Dissent agent - finds disagreement structurally, no LLM
      surface/    the dependency registry - pages, agents, feeds, templates
      ledger/     build capture + content addressing + claim lineage
      differ/     the belief diff. no LLM. golden-file tested
      graph/      blast radius via Sanity references
      pipeline/   the three above, wired together
      api/        HTTP + SSE, per-route authorization
      seeddata/   the demo, defined exactly once
sanity/
  workflows/      drift-remediation workflow definition
  functions/      on-assertion-change (deployed), poll-kb-build (shim)
  seed/           northwind.ndjson - 35 documents
docs/
  BUILD-LOG.md    honest, live, unreconstructed
  decisions/      ADRs
```

## The content model

Read the seven types in this order and the product explains itself:

| Type            | What it is                                                        |
| --------------- | ----------------------------------------------------------------- |
| `source`        | What the organisation has written down                            |
| `claim`         | One atomic fact, mirrored from a Knowledge Base entry             |
| `contentPage`   | What the organisation has published                               |
| `assertion`     | A place where something depends on a claim — **the edge we walk** |
| `surface`       | A published place that can carry one — a page, or an agent        |
| `buildSnapshot` | One immutable Knowledge Base build — **the time dimension**       |
| `driftEvent`    | The diff between two builds, per claim — **the changelog**        |
| `instruction`   | A standing decision written back into the Knowledge Base          |

Every claim also carries a **lineage**: the build it first appeared in, the build it was
last re-asserted _unchanged_ in, and the build its substance last moved in. Those three are
stamped by the ledger on every capture, never authored, and the second deliberately does not
advance on a build that changed the claim — so they read as _"last confirmed at build 46,
moved at build 47"_. See [ADR-0013](docs/decisions/0013-lineage-is-computed-not-stored.md).

Claims carry an optional typed `value` + `unit`. When both builds have them, contradiction is
arithmetic and confidence is `1.0`. When they don't, it falls back to prose comparison at
`0.55` and routes to a human. The system never conflates the two — see
[ADR-0004](docs/decisions/0004-deterministic-core-llm-at-the-edges.md).

## Where the model is, and is not

No LLM runs in `internal/differ` or `internal/graph`. Those are pure functions, golden-file
tested, byte-identical across runs. The model appears in exactly three places: proposing
claims from entry prose, drafting a correction at an assertion's declared `fieldPath`, and
the `Dissent` agent.

The drafting agent cannot publish, and that rests on three independent guarantees rather
than one:

1. **`noWrite: true`** on every Agent Action call — Sanity returns the rewritten document
   without mutating anything. Enforced upstream, not by us.
2. **`target.path`** scoped to the single block the assertion declares, addressed by `_key`
   rather than by position (see [ADR-0007](docs/decisions/0007-address-blocks-by-key.md)).
   Even without `noWrite`, the blast radius of a bad draft is one paragraph.
3. **Role gating** — the only workflow action routing into `published` requires
   `administrator` or `editor`, and an unattended agent holds no role.

Any one of those could be misconfigured and the promise still holds. Document text also
reaches the model as typed `instructionParams`, never concatenated into the instruction, so
a source that reads like an instruction is just data.

## Security

Every property below is asserted by a test, not merely intended.

| Property                             | How it is enforced                                                                                                                                                                            |
| ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Organisation tokens stay server-side | The browser never sees one. The registry stores sha256 digests, never the tokens.                                                                                                             |
| Authorization on every mutation      | `Authorize` returns a `*Grant` with no exported constructor. A route that skipped the check **does not compile** — [ADR-0009](docs/decisions/0009-grants-make-authorization-structural.md).   |
| Agents never publish or resolve      | `humanOnly` is checked _before_ the role table, so an agent with `RoleAdmin` still cannot. `MustBeHuman` checks again at the gate. `TestAgentCanNeverDispose` covers every role exhaustively. |
| Human approval for publication       | The gate's `human_approval` check, independent of the permission table.                                                                                                                       |
| Append-only audit history            | Hash-chained events. `Verify` recomputes every content address; an altered or deleted entry breaks the chain and is reported.                                                                 |
| Prompt-injection defence             | Document text reaches the model as typed `instructionParams`, never concatenated into an instruction. Tested with a hostile fixture.                                                          |
| No cross-tenant leakage              | Tenant is checked _before_ permission, so an outsider cannot probe policy. Over HTTP this is **404, not 403** — confirming a resource exists is itself a disclosure.                          |
| Redaction                            | Logs and audit evidence carry fingerprints and truncated excerpts, never page content or credentials.                                                                                         |
| Full traceability                    | Every event names actor, role, build, subject, evidence and correlation ID. There is no way to append one that omits them.                                                                    |

## Scalability

| Property                            | How                                                                                                                                                                                                                                                                                |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Immutable, content-addressed builds | A snapshot is hashed over the raw outline and entries. Equal hashes mean the diff can be skipped entirely.                                                                                                                                                                         |
| Idempotent processing               | Approval is keyed on `(assertion, build, actor)`. Tested with 25 and 40 concurrent writers.                                                                                                                                                                                        |
| Replayable                          | Folding the event log again is the same operation as reading it.                                                                                                                                                                                                                   |
| Bounded concurrency                 | The graph walk fans out under a semaphore; MCP reads chunk at the documented 20-path ceiling.                                                                                                                                                                                      |
| Never fabricate on partial failure  | A short read from the Knowledge Base **aborts the snapshot** rather than reporting mass retirement. The gate fails closed when blast radius cannot be computed. `Reconcile` returns an error rather than a plausible zero. A one-patch mutation result is an error, not a success. |
| Retries, backoff, circuit breaking  | `internal/resilience`. Only operations marked `Retryable` are retried; `Retry-After` is honoured; backoff is interruptible; the breaker admits one probe in half-open.                                                                                                             |
| Atomic publication                  | Page text and assertion stamp travel in **one** Sanity transaction — [ADR-0011](docs/decisions/0011-one-transaction-for-page-and-assertion.md).                                                                                                                                    |
| Observability                       | Correlation IDs on every request and event, echoed in the `X-Correlation-ID` header. Structured logs throughout.                                                                                                                                                                   |

## Where determinism ends and AI begins

Deterministic, no model, golden-file tested: **claim comparison** (`differ`),
**dependency traversal** (`graph`), **blast-radius calculation** (`graph`),
**publication gates** (`gate`), **disagreement detection** (`dissent`).

A model runs in exactly three places, and each output carries evidence, source
references, a build ID, a confidence and a detector:

1. **Claim extraction** from entry prose — proposals enter a review queue.
2. **Correction drafting** — Agent Actions `Transform` with `noWrite: true`, scoped to one block.
3. **Conflict explanation** — phrasing only; the conflict itself is structural.

## Development

```bash
pnpm install
pnpm typecheck
```

```bash
cd services/drift-engine && go test ./...
```

Run the whole thing with no Sanity credentials at all:

```bash
go run ./cmd/engine -fixtures
```

Then open the Control Room and sign in as any of the demo principals — viewer,
editor, steward or agent — to watch least privilege work on the same screen:

```bash
pnpm --filter @drift/console dev
```

```bash
curl -s localhost:8080/v1/drift | jq .summary
```

Toolchain: Node 22.17 · pnpm 10.27 · Go 1.26 · TypeScript 5.9.3 (pinned — see
[ADR-0003](docs/decisions/0003-pin-typescript-5.md)).

## Status

| Component                                              | State                                                                               |
| ------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| `@drift/schema` — 8 document types                     | ✅ typechecks against `sanity@6.15.0`                                               |
| `drift-engine` — differ · graph · pipeline             | ✅ golden-file frozen                                                               |
| `drift-engine` — Context MCP client                    | ✅ `initial_context` + `knowledge_base_read`, tested against a fake endpoint        |
| `drift-engine` — ledger, API, engine binary            | ✅ runs end to end in fixture mode                                                  |
| `drift-engine` — Agent Actions drafter                 | ✅ verified against live Sanity: proposes, never writes, one block |
| `drift-engine` — Dissent agent                         | ✅ refuses to answer over an unresolved conflict                                    |
| Dissent UI                                             | ✅ builds and runs — all three behaviours verified in a browser                     |
| `drift-engine` — authz · eventlog · gate · remediation | ✅ security spine, fully tested                                                     |
| Knowledge Control Room                                 | ✅ feed · causal graph · conflict room · lineage · queue · audit · time travel      |
| `drift-engine` — surface registry                      | ✅ agents register as dependents; one walk covers pages and bots                    |
| Claim lineage                                          | ✅ source · created · verified · published · changed, plus the claim's own timeline |
| `drift-engine` — resilience · Content Lake publisher   | ✅ atomic writes, retry, breaker                                                    |
| Go test suite                                          | ✅ **233 tests passing** across 15 packages                                         |
| `drift-remediation` workflow                           | ✅ typechecks against `@sanity/workflow-engine@0.33.0`                              |
| Seed dataset (`cmd/seed`)                              | ✅ 35 documents of NDJSON + console fixtures, one source of truth                   |
| App SDK console                                        | ✅ real `@sanity/sdk-react` — Sanity auth, live `useQuery` over project content |
| Knowledge Base + Context MCP                           | ⏳ blocked on org Labs flag                                                         |
| Live Sanity data source                                | ⏳ blocked on org-level Context Viewer token                                        |
| Next.js public site                                    | ✅ 7 pages prerendering, integrity strip per page                                   |
| Sanity Studio                                          | ✅ builds, desk organised around sources                                            |
| Blueprint + Document Function                          | ✅ typechecks against `@sanity/blueprints`                                          |
| CI                                                     | ✅ gofmt · vet · race · typecheck · builds · fixture-drift guard                    |
| Agent Actions (remediation drafter)                    | ✅ **live** against project `ptz5jjjz`, `noWrite` Transform          |

Built for the [Sanity Challenge](https://dev.to/devteam/join-the-sanity-challenge-2500-in-prizes-for-five-winners-514m)
(September 2026).
