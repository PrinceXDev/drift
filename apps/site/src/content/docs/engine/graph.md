---
title: graph — blast radius
description: One GROQ query, bounded concurrency, and the argument the whole project rests on.
group: The engine
order: 33
updated: 2026-09-20
---

`internal/graph` computes blast radius: given a claim that changed, every place in published
content that still asserts it.

```groq
*[_type == "assertion" && references($claimId)]
```

This is the load-bearing argument of the entire project, so it is worth being explicit about
why it looks so unremarkable.

## Why one query is the point

One GROQ query against a real Sanity reference. Exact, instant, and provably complete — if a
page depends on a claim, an assertion says so, and the query cannot miss it.

The alternative that every other approach is forced into is a vector search over page prose to
guess which pages "probably mention" the returns policy. That is approximate, unprovable, and
cannot answer _did we get all of them?_

The difference between those two sentences is why DRIFT models assertions as documents instead
of inferring them. Structured content is the mechanism here, not decoration.

## AssertionReader

The package depends on a narrow interface rather than on a Sanity client:

```go
type AssertionReader interface {
	AssertionsReferencing(ctx context.Context, claimID string) ([]driftv1.Assertion, error)
}
```

Two implementations exist: a GROQ-backed one against the Content Lake, and a fixture-backed one
for tests and `-fixtures` mode. The gate takes a reader for the same reason — it recomputes the
radius itself rather than trusting what the drift event recorded.

## Bounded concurrency

A drift event can name many claims, and a claim can have many dependents. The walk fans out
under a semaphore rather than launching a goroutine per claim: an unbounded fan-out against a
hosted API is a self-inflicted rate limit, and the failure mode is indistinguishable from an
outage.

## Pages and agents in one result

An assertion hangs off a `page` **or** a [`surface`](/docs/concepts/surfaces). Both are
documents referencing a claim, so both come back from the same query.

```go
// DependentID returns whichever of PageID / SurfaceID this assertion carries.
// Callers that only need "what does this hang off" should use it rather than
// branching, so a new surface kind cannot quietly go unhandled.
func (a Assertion) DependentID() string {
	if a.SurfaceID != "" {
		return a.SurfaceID
	}
	return a.PageID
}
```

The Dissent agent is in the result set because it registered an assertion when it answered, not
because anything special-cased it.

## Fail closed

If the blast radius cannot be computed, the [gate](/docs/engine/gate) blocks. It does not
proceed with an empty list.

An empty blast radius and an unavailable one look identical in a naive implementation, and the
consequences could not be more different: the first means nothing is affected, the second means
we do not know what is affected. Publishing on the second is exactly the false clean bill of
health this product exists to prevent.

## Where it is called

| Caller | When | Why |
| --- | --- | --- |
| [`pipeline`](/docs/engine/resilience) | At diff time | So the console can render counts without a traversal per paint |
| [`gate`](/docs/engine/gate) | At approval time | Because a page may have started depending on the claim since drafting |

The two results are compared, and any growth fails `blast_radius_stable`.
