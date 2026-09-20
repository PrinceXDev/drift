---
title: The remediation workflow
description: Six stages, role-gated edges, and the bug that only appeared when somebody actually ran it.
group: Sanity integration
order: 63
status: verified
updated: 2026-09-20
---

`drift-remediation` is what happens after the engine notices the organisation changed its mind.

The deterministic work — diffing two builds, walking the reference graph — has already happened
in the Go engine before an instance is ever started. This workflow exists for the part that
genuinely needs judgement: deciding whether a change is real, and approving the words that
replace it.

## The stage map

```text
detected  → triage      a drift event with a non-empty blast radius
triage    → drafting    a human confirmed the change is real
triage    → dismissed   a human rejected it (false positive, or intended)
drafting  → review      the Transform agent rewrote the affected spans
review    → published   an owner approved; assertions are re-stamped
review    → drafting    an owner sent the draft back
```

| Stage | What it means |
| --- | --- |
| `detected` | The engine found a claim that changed. Blast radius is already computed. |
| `triage` | A human decides whether the organisation really changed its mind. Core claims and low-confidence detections always land here. |
| `drafting` | The Transform agent rewrites the minimum span on each affected page. |
| `review` | The page owner approves the wording. Nothing reaches the public site without passing through here. |
| `published` | Corrections are live and every affected assertion has been re-stamped. |
| `dismissed` | The change was intended, or the detection was wrong. Kept in the ledger either way. |

A dismissed event is still a record of what the organisation looked at and decided. Deleting it
would mean the ledger only remembers the changes somebody agreed with.

## The agent can never reach `published`

The only action routing into `published` is gated:

```ts
defineAction({
  name: 'approve',
  title: 'Approve and publish',
  status: 'done',
  roles: ['administrator', 'editor'],
  ops: [
    {
      type: 'field.set',
      target: {scope: 'workflow', field: 'reviewDecision'},
      value: {type: 'literal', value: 'approved'},
    },
  ],
})
```

`roles` desugars to an actor-role membership condition the engine evaluates. An unattended agent
carries no such role, so **the edge is closed to it by the deployed definition** rather than by
a prompt asking it nicely.

Observed, not asserted — from the runner output:

```text
7 · the agent tries to approve, from `review`
availableActions: offered, allowed=false
  reason={"kind":"filter-failed",
          "filter":"count($actor.roles[@ in [\"administrator\",\"editor\"]]) > 0"}
  fireAction refused: Action "approve:approve" is not allowed: action filter returned false
```

## The bug that only appeared when it ran

Every transition in the original definition had defaulted to `$allActivitiesDone`.

Two such transitions leaving one stage are therefore **both** satisfied the moment the stage's
activity resolves, and the engine takes the first — so `reject` routed to `drafting` and
`send-back` **published**.

That is not hypothetical. It is what the definition did, discovered the first time anything
actually ran it. The types had been correct throughout.

### The fix: a decision is a value, not an implication

Each adjudicating action now records what was decided in a workflow field, and each transition
reads it:

```ts
defineTransition({
  name: 'to-published',
  title: 'Publish',
  to: 'published',
  when: '$allActivitiesDone && $fields.reviewDecision == "approved"',
})
```

A stage can then only leave by the edge somebody chose, and the instance carries the reason it
went that way.

> [!NOTE]
> This is the argument for **instantiating** a workflow rather than typechecking one. A
> definition that compiles is not a definition that routes correctly.

## Fields on the instance

| Field | Purpose |
| --- | --- |
| `subject` | The `driftEvent` document this instance moves through the stages. Required. |
| `triageDecision` | `confirmed` or `dismissed` — written by the action, read by the transitions. |
| `reviewDecision` | `approved` or `sent-back` — and the DRIFT gate decides which the owner is allowed to record. |

## Properties that do not exist

The stage-level `requireAssignment` / `requireValidation` properties that several write-ups
mention **do not exist in `@sanity/workflow-engine@0.33.0`**. Gating is expressed on actions via
`roles`.

## Running it for real

```bash
pnpm workflow:demo
```

No Sanity project and no token. The workflow side runs against an in-memory `WorkflowClient`;
the engine is the real `@sanity/workflow-engine@0.33.0`, the real deployed definition, and the
real `fireAction`. Two principals act: a robot token holding `viewer`, and Sam holding
`editor`.

```text
5 · the agent tries to approve, from `drafting`
availableActions: withheld entirely
  fireAction refused: Activity "approve" not found in current stage "drafting"

8 · the gate decides the edge
  BLOCK no_unresolved_conflict  sources still disagree about support/returns (2 competing values)
gate          refused
              the click becomes a redraft, not a publication

result
final stage   drafting
```

The last step is the wiring. **The human does not choose the transition** —
`POST /v1/corrections/approve` does. An allowed-and-published answer fires `approve`; a refusal
fires `send-back`; anything that is not a decision at all (an unreachable engine, no Content
Lake to write to) moves nothing, because a workflow that advanced on a transport failure would
be asserting an outcome nobody decided.

The run exits non-zero if the agent ever gets through, or if the instance lands somewhere the
gate did not choose. CI runs it on every push.

## Why `published` is unreachable against fixtures

`support/returns` has an unresolved source disagreement, and resolving one is not yet wired to
an endpoint. `published` means _corrections are live_, so it is reachable only against a project
the engine can actually write to. That is correct rather than missing.

## Deploying

```bash
npx sanity-workflows deploy
```

`sanity.workflow.ts` names the dataset explicitly rather than reading it from the environment,
because a workflow definition is deployed infrastructure: it should be obvious from the file
which dataset a given deployment targets.

## Related

- [gate](/docs/engine/gate)
- [remediation](/docs/engine/remediation)
- [driftEvent](/docs/content-model/drift-event)
