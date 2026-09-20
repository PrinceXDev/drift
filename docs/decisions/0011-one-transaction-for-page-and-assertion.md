# ADR-0011 — Publish the page and its assertion in one transaction

**Status:** accepted · **Date:** 2026-09-19

## Context

Publishing an approved correction means two changes:

1. the page's paragraph gets the corrected text
2. the `assertion` is re-stamped with the build it was verified against

The obvious implementation is two calls. That has two failure modes, and one of
them is dangerous.

**Page written, assertion not.** The content is correct but its integrity record
still says stale, so the Control Room keeps listing work that is already done.
Annoying, self-correcting once someone notices.

**Assertion written, page not.** The record says "verified against build 47" and
the page still says 30 days. This is a *false clean bill of health* — DRIFT
reporting that everything is fine while a customer reads the wrong number. It is
precisely the failure this product exists to catch, produced by the product.

## Decision

Both patches go in a single request to the Content Lake mutation API, which is
transactional: *"if the operation succeeds you can rest assured that every
mutation you submitted was executed."*

The response is checked for **two** results. One result means a partial apply,
which is reported as an error naming the consequence ("the page and its
integrity record may now disagree") rather than as success.

Other decisions that came with it:

- **`visibility=sync`.** The Control Room refreshes immediately after an
  approval; an async write would let it read back the pre-correction state and
  report the page as still stale.
- **`transactionId` derived from the idempotency key.** Sanity requires
  transaction IDs to be unique per dataset, so a retry of the same logical
  publication is the *same* transaction rather than a second one. A duplicate is
  reported as `ErrAlreadyApplied` and treated as success by the caller.
- **`blockKey` is required, with no positional fallback.** Falling back to
  `body[1]` when the key is missing is how the wrong paragraph gets rewritten —
  see ADR-0007. The request is refused instead.
- **Auth failures are never retried** and never log the credential. The error
  names which token is needed, because the likeliest setup mistake is using the
  organisation Context token where a project write token belongs.

## Consequences

- Publication is all-or-nothing. There is no state where content and its
  integrity record disagree because of a partial write.
- `remediation.Publisher` takes a struct rather than five positional strings.
  The previous signature — `Publish(ctx, assertionID, blockKey, text, buildID)` —
  was five same-typed arguments in an order nothing enforced; transposing two
  would have compiled and written the wrong thing to the wrong place.
- The adapter lives in `cmd/engine`, so `internal/remediation` imports nothing
  beneath it. Business logic declares the shape it needs; infrastructure
  satisfies it at the composition root.
- **In fixture mode the publisher is nil, not a fake.** A no-op that logged
  "published!" would put a completed publication in the audit trail for content
  that was never touched. `Approve` reports `ErrNoPublisher`, so the trail
  records an approval and no publication — which is exactly what happened.

## Unverified

The duplicate-transaction response shape has not been checked against a live
project. `looksLikeDuplicateTransaction` matches on response text and is
deliberately conservative: an unrecognised 409 is reported as a conflict rather
than assumed to be a duplicate, because wrongly reporting "already published"
would mean a correction silently never lands. First job once credentials exist
is to capture a real duplicate response and replace the heuristic.
