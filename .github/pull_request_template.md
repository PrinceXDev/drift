<!--
DRIFT pull request template.

The sections below are the ones a reviewer of this codebase actually needs.
Delete any that genuinely do not apply — an honest "n/a" beats a section padded
to look complete.

Two of these are not optional, because they are the properties this project
claims about itself:

  · Determinism boundary — did anything move across the line between the
    deterministic core and the three places a model is allowed to run?
  · Security & safety     — did anything touch authorization, the audit chain,
    or the human-approval guarantee?

If a PR changes neither, say so in one line and move on.
-->

## What this changes

<!-- One paragraph. What a reviewer should hold in their head before reading the diff. -->

## Why

<!--
The problem, not the solution. If this fixes a real failure, describe the
failure: what went wrong, or would have.
-->

## How it works

<!--
The mechanism, and the one or two decisions that were not obvious. If a
reasonable engineer would have done it differently, say why you did not.
-->

---

## Determinism boundary

<!--
DRIFT's core claim is that claim comparison, dependency traversal,
blast-radius calculation, publication gates and workflow validation are
deterministic, and that a model only runs in three places: claim extraction,
correction drafting, and conflict explanation.
-->

- [ ] No model call was added to `differ`, `graph`, `gate`, `pipeline` or `dissent`
- [ ] Any new AI output carries evidence, source refs, build ID, confidence and assumptions
- [ ] Any new inference reports a confidence below 1.0 and routes to a human

> _If a model call was added outside the three sanctioned places, justify it here._

## Security & safety

- [ ] Every new mutation takes an `*authz.Grant` (a route that skips authorization should not compile)
- [ ] No new path lets an agent publish, resolve a conflict, or write an instruction
- [ ] Tenant is checked before permission on any new resource access
- [ ] No credential, page content or claim statement reaches a log — use `telemetry.Excerpt` / `Fingerprint` / `RedactToken`
- [ ] New audit events name actor, build, subject and evidence
- [ ] Untrusted content reaches a model as a typed parameter, never concatenated into an instruction

> _n/a is a fine answer. Say it rather than ticking boxes that were not considered._

## Failure behaviour

- [ ] New outbound calls have a timeout, and retry only where the effect is safe to repeat
- [ ] Partial failure aborts rather than reporting a partial result as success
- [ ] Nothing fabricates a number, a count, or a success it did not verify

## Reproducibility

- [ ] `packages/fixtures` regenerated if engine output changed (`pnpm --filter @drift/fixtures generate`)
- [ ] Golden files updated deliberately, and the diff reviewed rather than accepted
- [ ] Claim IDs, event IDs and build hashes remain stable for unchanged input

---

## Verification

<!--
What you actually ran and saw. Not what should pass — what did.
Paste the counts.
-->

```
go test ./...        →
pnpm -r typecheck    →
pnpm -r build        →
```

**Checked in a browser:** <!-- which screens, at what widths, or "no UI change" -->

## Screenshots

<!-- Before / after for any UI change. Include a narrow width if layout moved. -->

## Decisions worth recording

<!--
Did this PR make a choice a future maintainer would want explained? If so it
needs an ADR in docs/decisions/. Link it here, or say why one is not warranted.
-->

- ADR: <!-- docs/decisions/00XX-....md, or "none needed" -->

## Known gaps

<!--
What this deliberately does not do, and anything unverified against a live
Sanity project. Be specific — "unverified" with no detail helps nobody.
-->

## Build log

<!--
Anything surprising, any Sanity beta rough edge, any bug you caused and caught.
docs/BUILD-LOG.md is a scored artifact for the challenge submission, so keep it
honest rather than tidy.
-->

- [ ] `docs/BUILD-LOG.md` updated
