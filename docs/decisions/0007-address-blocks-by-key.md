# ADR-0007 — Address blocks by `_key`, never by position

**Status:** accepted · **Date:** 2026-09-19

## Context

An `assertion` records where in a page a claim is expressed. The first
implementation stored a positional path — `body[1]` — because that is the
natural thing to capture when extracting an assertion from a rendered page.

The remediation agent uses that path as its `target`, which is the mechanism
that stops it rewriting anything outside the sentence it was asked to fix.

Writing `SanityPath`, the flaw became obvious. `body[1]` means "whatever is
second on the page right now". Insert a paragraph above it and the same
assertion silently points at different text. The agent would then confidently
rewrite the wrong sentence, a human would approve a diff that looked plausible,
and a correct paragraph would be replaced with a policy update that does not
belong to it.

In a product about content going quietly out of date, an addressing scheme that
goes quietly out of date is not a defensible thing to ship — even documented.

## Decision

`assertion.blockKey` stores the Portable Text `_key` of the addressed block, and
`agent.TargetPath` uses it. `fieldPath` is retained for display and for
rendering the inline flag on the public site, where position is what a reader
actually sees.

Derivation from the positional path survives as a fallback for assertions
recorded before the key existed, clearly marked as such.

## Consequences

- Reordering a page no longer moves the target. Tested directly
  (`TestTargetPath_SurvivesReordering`).
- `blockKey` is required by schema validation, so a new assertion cannot be
  created without one.
- Extraction has to capture the key, which means reading the document rather
  than only its rendered text. That is a fair cost for the guarantee.
- Two addressing schemes now exist. They are not interchangeable, and the code
  says which is which: `fieldPath` for humans, `blockKey` for machines.
- The general lesson, worth stating because it recurs: a positional reference
  into a mutable array is a latent bug wherever it appears. This project simply
  makes the consequence unusually vivid.
