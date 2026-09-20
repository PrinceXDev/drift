---
title: agent — the Agent Actions drafter
description: The only language-model call in the engine, and the three independent guarantees that it cannot publish.
group: The engine
order: 39
status: verified
updated: 2026-09-20
---

`internal/agent` drafts corrections for stale assertions using Sanity **Agent Actions**.

Its job is narrow on purpose: given a published sentence and the claim that superseded it,
rewrite that one sentence. It does not decide what drifted, it does not choose which pages to
fix, and it cannot publish.

## Three independent guarantees that it cannot publish

1. **`noWrite: true` on every Transform call.** The action returns the rewritten document
   without mutating anything. This is the strongest of the three because it is enforced by
   Sanity, not by us.
2. **`target.path` is scoped to the single field the assertion declares.** Even if `noWrite`
   were dropped, the blast radius of a bad draft is one paragraph.
3. **The only workflow action routing into `published` is gated by
   `roles: ['administrator', 'editor']`,** and an unattended agent holds no role.

Belt, braces, and a second pair of braces. The product's entire claim is that a human approves
every correction, so that claim should survive any one of these being misconfigured.

## Why Agent Actions rather than a raw model call

Agent Actions are **schema-aware**. That is what stops a Transform writing a string into a
number field, and it is why `SANITY_SCHEMA_ID` is required rather than optional for drafting:

```bash
sanity schema deploy
sanity schema list     # gives you _.schemas.<workspace>
```

The drafter binds to the deployed schema. Without it, the action has no idea what shape the
document is.

## Prompt injection

Document text reaches the model as typed `instructionParams`, **never concatenated into an
instruction string**. There is a hostile fixture in the test suite that asserts this.

Indexed documents are attacker-influenced content in the general case — a supplier PDF, a wiki
page, a contract clause somebody pasted in. Structurally, an injected instruction has nowhere
useful to go even if it lands: the drafter cannot publish, cannot widen its own scope, and
cannot reach the workflow edge that publishes. The input filter is the weakest of the layers,
not the only one.

## What the model actually did

Verified live against a real Sanity project: the Transform proposed a rewritten sentence,
mutated nothing, and touched exactly one block. That verification is recorded in
[the build log](/docs/operations/build-log) rather than asserted here — the difference between
"designed to" and "observed doing" is the difference this documentation tries to keep visible.

## Addressing

The target is the assertion's `blockKey`, not its `fieldPath` index:

```text
body[_key=="b01"].children[0].text
```

A positional path would let a paragraph reorder redirect the rewrite to the wrong sentence,
inside the scope restriction, with the gate satisfied. See
[ADR-0007](/docs/decisions/address-blocks-by-key).

## Resilience

Calls go through [`internal/resilience`](/docs/engine/resilience). Drafting is idempotent in
the sense that matters — it writes nothing — so it is safe to retry.

## Related

- [Determinism and the three model calls](/docs/concepts/determinism)
- [Agent Actions setup](/docs/sanity/setup)
- [gate](/docs/engine/gate)
