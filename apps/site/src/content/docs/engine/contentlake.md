---
title: contentlake — the write client
description: The last mile. One transaction, addressed by key, with the credential that is easiest to get wrong.
group: The engine
order: 40
updated: 2026-09-20
---

`internal/contentlake` writes approved corrections back to Sanity. It is the only place in
DRIFT that mutates published content — everything upstream exists to decide whether this
package should run.

## One transaction, never two writes

Publishing a correction means two changes:

1. the page's paragraph gets the corrected text
2. the assertion is re-stamped with the build it was verified against

These go in a **single mutation request**, because Sanity's mutation API is transactional: if
the operation succeeds, every mutation submitted was executed.

If they were two requests, a failure between them would leave either:

- a page that has been corrected but an assertion that still says `stale` — so the Control Room
  keeps nagging about work already done; or
- an assertion marked verified against a page that was never updated.

The second is the dangerous one. It is a **false clean bill of health**, which is precisely the
failure this product exists to catch. See
[ADR-0011](/docs/decisions/one-transaction-for-page-and-assertion).

## Addressing by key, not by position

```text
body[_key=="b01"].children[0].text
```

The key comes from the assertion, not from an array index. A positional path would rewrite the
wrong paragraph the moment somebody reorders the page.

## The credential

> [!DANGER]
> This needs a **project** token with write access, which is a different credential from the
> **organisation** token Context MCP requires. Mixing them up is the most likely setup mistake
> in the whole system, so the error messages say which is which.

| Credential | Scope | Used by |
| --- | --- | --- |
| `SANITY_WRITE_TOKEN` | Project, Editor | This package — publishing corrections and instructions |
| `DRIFT_MCP_TOKEN` | Organisation, Context Viewer | [The MCP client](/docs/engine/mcp) — reading the Knowledge Base |

## Retries are not blind

A publication retried blindly could publish twice. The write client sends a **deterministic
transaction ID**, so a repeat is the _same_ transaction rather than a second one.

That is the concrete meaning of the rule in [`resilience`](/docs/engine/resilience): only
idempotent operations are retried, and the caller is responsible for making the operation
idempotent rather than the retry helper guessing from a status code.

## Failure is an error, not a success

A mutation result reporting one patch where two were submitted is treated as an **error**, not
a success. Partial application is exactly the state the single-transaction design exists to
prevent, so it is never quietly accepted.

## Fixture mode publishes nothing, loudly

Without a write token the engine gates and audits approvals but refuses to claim a publication
happened. The alternative — returning success with no write — would have made the demo smoother
and the audit trail a lie.

## Related

- [remediation](/docs/engine/remediation)
- [contentPage](/docs/content-model/content-page)
- [Environment variables](/docs/operations/environment)
