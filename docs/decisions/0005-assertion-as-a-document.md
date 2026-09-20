# ADR-0005 — Model assertions as documents rather than inferring them

**Status:** accepted · **Date:** 2026-09-19

## Context

When a claim changes, we need every published page that depends on it. Two options:

**A. Infer.** Embed page content, semantic-search for pages that probably discuss the topic.
No authoring burden. Approximate, unprovable, and it cannot answer "did we get all of them?".

**B. Declare.** Model `assertion` as a first-class document holding a real Sanity reference
to the claim plus the `fieldPath` where it is expressed.

## Decision

Option B.

```groq
*[_type == "assertion" && references($claimId)]
```

One query. Exact, instant, provably complete.

## Consequences

- **This is the load-bearing argument of the submission.** It is the concrete answer to "why
  does this need structured content rather than a vector database?" — because a correction
  you cannot prove is complete is a correction nobody can safely approve.
- Assertions have to come from somewhere. The extraction agent proposes them; a human
  confirms. That authoring cost is real and we should not pretend otherwise.
- `fieldPath` gives the remediation agent a hard boundary: it may rewrite that span and
  nothing else, which is checkable rather than merely instructed.
- Pages stay ordinary documents. They do not declare dependencies; assertions declare them on
  the page's behalf, so authors are not asked to maintain a dependency list by hand.
- `graph.Resolve` fails the whole walk if any single query fails, rather than returning a
  partial radius. A human approving an incomplete fix while believing it complete is worse
  than an error.
