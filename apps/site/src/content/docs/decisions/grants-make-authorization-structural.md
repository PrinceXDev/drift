---
title: ADR-0009 — Authorization returns a capability, not a boolean
description: The brief says "enforce authorization on every mutation". Writing the check is easy. Guaranteeing nobody ever forgets one is the actual problem, and a permission system that depends on each 
group: Decisions
order: 99
status: stable
updated: 2026-09-19
---
## Context

The brief says "enforce authorization on every mutation". Writing the check is
easy. Guaranteeing nobody ever forgets one is the actual problem, and a
permission system that depends on each handler remembering to call it will
eventually meet a handler that does not.

The usual mitigations — a code-review checklist, a lint rule, a middleware that
sets a flag on the request — all fail the same way: the *absence* of a check is
invisible. Nothing breaks. The endpoint just quietly works for everybody.

## Decision

`authz.Authorize` returns a `*Grant`: a struct with unexported fields and no
exported constructor. Handlers that perform mutations take a `*Grant` as an
argument.

```go
func (s *Service) Approve(ctx context.Context, grant *authz.Grant, draft Draft) (Outcome, error)
```

A caller cannot invoke this without a Grant, and cannot obtain a Grant without
passing an authorization check. The proof of permission and the permission are
the same object — a capability.

The HTTP layer follows the same shape: every route is registered through
`guard(permission, handler)`, and handler signatures require the grant the guard
produces. **A route that skipped authorization does not compile.**

## Consequences

- Forgetting a check becomes a build error rather than a silent hole.
- Audit entries get their actor, tenant and resource from the Grant, so a logged
  action always names what it touched, not merely what kind of action it was.
- Two independent barriers protect publication. `humanOnly` is checked inside
  `Authorize` *before* the role table, so an agent misconfigured with
  `RoleAdmin` still cannot publish; and `MustBeHuman` is checked again at the
  gate. Redundant on purpose: publication is unrecoverable once a customer has
  read the page.
- Cross-tenant checks run *before* permission checks, so an outsider cannot
  probe what they would have been allowed. Over HTTP this surfaces as 404 rather
  than 403 — confirming a resource exists but belongs to someone else is itself
  a disclosure.
- The role × permission matrix is data, not branching logic, and the tests
  enumerate it exhaustively rather than sampling. Widening a role has to be done
  deliberately, in one visible place.
- Cost: passing a Grant through call signatures is more verbose than reading a
  value off the context. That verbosity *is* the safety property, so it is not a
  cost worth optimising away.
