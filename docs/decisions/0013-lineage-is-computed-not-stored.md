# ADR-0013 — Claim lineage is stamped by the ledger, never authored

**Status:** accepted · **Date:** 2026-09-19

## Context

A claim needs a provenance a person can act on: where did this statement come
from, when did it appear, when was it last checked, and when did it move.

The schema already had `firstSeenBuild` and `lastVerifiedBuild` fields. Nothing
maintained them. `cmd/seed` wrote the literal strings `build.46` and `build.47`
onto every claim, so the Studio displayed a dataset in which nothing had ever
been re-verified and everything had changed at once — a lineage that was
uniform, confident and wrong. The Go `Claim` did not carry them at all.

## Decision

**Three stamps, applied by `driftv1.Claim.WithLineage` on every capture.**

```
prior == nil     first seen here; verified here; never changed
same substance   first seen carried; verified here; last change carried
moved            first seen carried; verified NOT advanced; changed here
```

`ledger.CaptureAgainst` calls it for every claim in every build. `seeddata`
calls the same function, so the demo's provenance is computed rather than typed,
and `TestSeedLineageMatchesLedger` fails the build if anyone hand-edits a stamp.

### Verified must not advance on a change

This is the load-bearing line. A build that changes a claim has not verified it
— it has replaced it. If both stamps advanced together, "last confirmed" and
"last altered" would collapse into one field, and the panel could no longer say
how long a fact stood before it moved. Read as a pair they produce the sentence
somebody actually wants: *last confirmed at build 46, moved at build 47.*

### It has to agree with the differ, exactly

`Claim.SameSubstanceAs` decides whether a stamp advances. `differ.compare`
decides whether a drift event is emitted. If the two ever disagreed, the console
would show a claim marked "changed in build 47" beside a feed insisting build 47
changed nothing — a knowledge-integrity tool contradicting itself about its own
knowledge.

So `SameSubstanceAs` implements the differ's rules in the differ's order: two
comparable typed values settle it outright (reworded prose around an unchanged
quantity is not a change of mind), and otherwise thinner evidence or altered
prose is a change. `TestLineageAgreesWithDiffer` runs both over the same pairs
and fails if they diverge.

### A stamp we cannot resolve is shown, not hidden

A build ID naming a snapshot the ledger no longer holds renders as the bare ID
with "snapshot not retained". The stamp is real even when the build is gone.
Rendering nothing would read as "this fact came from nowhere"; inventing a date
would be worse.

### Who verified it comes from the audit chain, not the stamp

A build stamp says *when* a fact was last confirmed. It cannot say who, because
a build is a machine event — and "verified" meaning only "a machine saw it
again" is the kind of reassurance that gets somebody into trouble.

A person enters the story when they approve a correction, and that is an audit
entry. So audit events now carry a `claimId` alongside `subject`, and a claim's
timeline is one query.

Denormalising the claim onto the event, rather than resolving it at read time
through the assertion graph, is deliberate twice over: it makes the timeline one
read instead of a join the log could not do, and it pins each event to the fact
it was about *at the moment it happened*. Resolved at read time, a claim's
history would depend on today's dependency set, and any assertion retired since
would silently drop out of its own past.

When nobody has approved anything, the panel says so. An invented approver would
be the single worst thing a provenance view could contain.
