---
title: ADR-0010 — Approval means "publish this if it is still right", not "publish this"
description: Between an agent drafting a correction and a human approving it, time passes. Minutes usually; occasionally a weekend. In that window:
group: Decisions
order: 100
status: stable
updated: 2026-09-19
---
## Context

Between an agent drafting a correction and a human approving it, time passes.
Minutes usually; occasionally a weekend. In that window:

- the Knowledge Base can rebuild
- the claim can change again, or be retired
- another page can start depending on it
- a new source can appear that contradicts the correction
- somebody can fix the sentence by hand

If "approve" means "apply the drafted text", every one of those is a way to
publish something wrong while an audit trail records that a human approved it.
That is worse than having no approval step, because it launders a stale decision
through a person's name.

## Decision

A deterministic gate sits in front of publication and **re-derives everything**
rather than trusting anything computed at drafting time. Eight checks:

| Check | Blocks | Catches |
|---|---|---|
| `human_approval` | yes | An unattended process approving |
| `build_current` | yes | A rebuild since drafting |
| `claim_active` | yes | The claim was retired meanwhile |
| `still_stale` | yes | Somebody already fixed it by hand |
| `no_unresolved_conflict` | yes | Publishing into a live source disagreement |
| `no_contradiction` | yes | The new text disagreeing with another current claim |
| `scope_respected` | yes | An edit outside the assertion's declared field |
| `blast_radius_stable` | **no** | A page that started depending on this since drafting |

Every check runs even after one fails, so an operator sees everything wrong at
once rather than fixing problems one resubmission at a time.

## Consequences

- **No model runs in the gate.** Every check compares values that already exist.
  A gate that asked an LLM "does this look safe?" would be unauditable at exactly
  the moment auditability matters most. When a publication is blocked the
  operator gets a named check and two values, not an opinion.
- **Fail closed.** If the blast radius cannot be recomputed, publication is
  refused. An unknown dependency set is not a small one.
- **One advisory, deliberately.** Blast-radius growth warns rather than blocks:
  it is a reason to look, not a reason to refuse, and making everything blocking
  teaches operators to route around the gate.
- Blocked attempts are **recorded**. "Somebody tried and the system said no" is
  precisely what an audit trail exists to remember.
- Over HTTP a gate refusal is **422, not 403**. The caller was allowed to ask;
  the content was not ready. A client deciding whether to retry needs that
  distinction.

## The contradiction check, and a false-positive it caused

The first implementation flagged a contradiction whenever the proposed text
stated a number in the same unit as some other claim. Correcting a return window
to "45 days" then contradicted dispatch time (2 days), the price-match window
(14 days) and the EU cooling-off period (14 days) — three false positives on our
own demo data, because they are all measured in days.

A unit is not a topic. The rule now requires the text to mention something
*distinctive* to the other claim: a term from its path that does not also appear
in the path of the claim being corrected. So correcting `support/returns` cannot
implicate `support/returns-eu` through the word they share — only through "eu",
which the text would have to actually say.

This is conservative and will miss contradictions expressed purely in prose with
no distinguishing term. That is the correct trade: a false positive blocks a
legitimate publication, and operators who are blocked spuriously learn to click
through warnings — which costs more than a miss.
