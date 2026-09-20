---
title: Quickstart
description: The whole system running against committed fixtures in about a minute, with no Sanity credentials and no network.
group: Start here
order: 1
status: verified
updated: 2026-09-20
---

DRIFT has a fixture mode that exists for exactly this moment. It runs the real engine — the
real differ, the real graph walk, the real gate, the real authorization — against a committed
demo corpus, so you can see the whole product work before deciding whether to point it at a
Sanity project.

## What you need

| Tool | Version | Why |
| --- | --- | --- |
| Go | 1.26 | The engine |
| Node | 22.17 | The apps |
| pnpm | 10.27 | The workspace |

No Sanity project, no tokens, no internet connection.

## Run it

```bash
pnpm install
```

```bash
cd services/drift-engine && go run ./cmd/engine -fixtures
```

The engine comes up on `127.0.0.1:8080` with four demo principals registered — a viewer, an
editor, a steward and an agent — so you can watch least privilege work on one screen.

```bash
curl -s localhost:8080/v1/drift | jq .summary
```

In a second terminal, start the Control Room:

```bash
pnpm --filter @drift/console dev
```

Open <http://localhost:3333>, sign in as any of the four principals, and you are looking at the
diff between build 46 and build 47 of the demo Knowledge Base.

## What runs where

DRIFT is five processes. They are separate apps on separate ports, and only the engine is
required by the others.

| Process | Port | What it is | Start it with |
| --- | --- | --- | --- |
| **Engine** | 8080 | The Go service. Everything below reads from it. | `go run ./cmd/engine -fixtures` |
| Control Room | 3333 | The operator console | `pnpm --filter @drift/console dev` |
| Dissent | 3335 | The agent | `pnpm --filter @drift/dissent dev` |
| Northwind Audio | 3000 | The published site that drifts | `pnpm --filter @drift/web dev` |
| Sanity Studio | 3334 | Where sources are edited | `pnpm --filter @drift/studio dev` |
| This documentation | 3100 | The site you are reading | `pnpm --filter @drift/site dev` |

The landing page has a [live panel](/) listing all of them with a reachability dot, so you can
see at a glance which are up.

> [!NOTE]
> The Control Room mounts two different ways depending on configuration. With
> `VITE_SANITY_PROJECT_ID` set it boots as a real App SDK app and authenticates you through
> Sanity; with it unset it renders committed engine output and needs no account at all. If you
> land on a Sanity login screen and did not expect one, that variable is set.

If you deploy these somewhere other than localhost, point the documentation site at them:

```bash
NEXT_PUBLIC_DRIFT_ENGINE_URL=https://engine.example
NEXT_PUBLIC_CONSOLE_URL=https://console.example
NEXT_PUBLIC_DISSENT_URL=https://dissent.example
NEXT_PUBLIC_WEB_URL=https://northwind.example
NEXT_PUBLIC_STUDIO_URL=https://studio.example
```

## The ninety-second walkthrough

This is the sequence the recording on the home page follows.

1. **Open the Drift Feed.** One row: `support/returns` moved from 30 days to 45 between build
   46 and build 47. Confidence `1.0`, detected by `typed_value` — both builds carried a number
   and a unit, so the comparison was arithmetic rather than a judgement.
2. **Open the claim.** Its lineage reads *first seen build 41 · last verified build 46 · last
   changed build 47*. Those three stamps are written by the ledger on every capture and are
   never authored — see [Claim lineage](/docs/concepts/lineage).
3. **Look at the blast radius.** Eight dependents: seven content pages and the Support Bot.
   The bot is there because it registered its dependency as an ordinary assertion when it
   answered a customer, not because anything special-cased it.
4. **Open the Conflict Room.** `support/returns` also has an unresolved source disagreement —
   the policy PDF (authority 5) and the help centre (authority 2) do not agree. The Dissent
   agent refuses to answer questions about returns while that is true.
5. **Draft a correction.** The Agent Actions drafter rewrites one paragraph on one page. It
   calls Transform with `noWrite: true` and a `target.path` scoped to the single block the
   assertion declares, so the draft cannot touch anything else.
6. **Approve it.** The gate runs nine checks and refuses: `no_unresolved_conflict`. Sources
   still disagree, so nobody gets to settle it by clicking Approve.
7. **Read the audit trail.** The refusal is an appended, hash-chained event naming the actor,
   the role, the build, the claim, the failed check and the correlation ID.

> [!NOTE]
> Step 6 refusing is the correct outcome against the committed fixtures, not a bug in the
> demo. `published` means *corrections are live*, and there is no project to write to in
> fixture mode. See [Fixture mode](/docs/operations/fixture-mode).

## Run the workflow

With the engine up, drive one real drift event through the deployed workflow definition:

```bash
pnpm workflow:demo
```

The workflow side runs against an in-memory client; the engine is the real
`@sanity/workflow-engine`, the real deployed definition, and the real `fireAction`. Two
principals act: a robot token holding `viewer`, and a human holding `editor`. The run exits
non-zero if the agent ever gets through. See [Running the workflow](/docs/sanity/workflows).

## Run the tests

```bash
cd services/drift-engine && go test ./...
```

243 tests across 15 packages, including the golden-file diff that pins byte-identical output
for builds 46 and 47.

```bash
pnpm typecheck
```

## Then what

- Point it at a real project: [Connecting Sanity](/docs/sanity/setup)
- Understand the model: [The time dimension](/docs/concepts/time-dimension)
- See what is not yet proven: [Known limits](/docs/operations/limits)
