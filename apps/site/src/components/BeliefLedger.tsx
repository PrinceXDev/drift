'use client'

import {useEffect, useState} from 'react'

/**
 * The hero instrument: one claim moving between two Knowledge Base builds, and
 * the published surfaces that go stale the moment it does.
 *
 * It loops rather than waiting for a scroll, because it is the sentence the
 * page is making and somebody should be able to read it without touching
 * anything. The data is the project's own demo corpus — `support/returns`
 * moving from 30 days to 45 between build 46 and build 47 — so the animation is
 * a reproduction of a real run rather than an invented flourish.
 */

type Dependent = {name: string; kind: 'page' | 'agent'}

const DEPENDENTS: Dependent[] = [
  {name: 'Returns & Refunds', kind: 'page'},
  {name: 'Frequently asked questions', kind: 'page'},
  {name: 'Contact support', kind: 'page'},
  {name: 'Limited warranty', kind: 'page'},
  {name: 'Atlas Over-Ear — product', kind: 'page'},
  {name: 'Checkout reassurance strip', kind: 'page'},
  {name: 'EU distance selling addendum', kind: 'page'},
  {name: 'Support Bot', kind: 'agent'},
]

/** 0 quiet · 1 rebuilding · 2 contradiction shown · 3+ dependents flipping */
const LAST_PHASE = 3 + DEPENDENTS.length + 3

export function BeliefLedger() {
  const [phase, setPhase] = useState(0)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (query.matches) {
      // Straight to the state that carries the meaning. An animation somebody
      // asked not to see should still leave them the information.
      setReduced(true)
      setPhase(LAST_PHASE)
      return
    }

    const timer = setInterval(() => {
      setPhase((value) => (value >= LAST_PHASE ? 0 : value + 1))
    }, 620)
    return () => clearInterval(timer)
  }, [])

  const build = phase === 0 ? 46 : 47
  const contradicted = phase >= 2
  const flipped = Math.max(0, Math.min(DEPENDENTS.length, phase - 2))

  return (
    <div className="ledger" aria-hidden={!reduced}>
      <div className="ledger__bar">
        <div className="ledger__dots">
          <i />
          <i />
          <i />
        </div>
        <span className="ledger__title">drift · knowledge control room</span>
        <span className="ledger__tick">
          <i />
          {phase === 1 ? 'rebuilding…' : `build ${build}`}
        </span>
      </div>

      <div className="ledger__body">
        <div className="ledger__left">
          <span className="ledger__label">Claim</span>
          <div className="claim-card">
            <div className="claim-card__path">
              <span>support/returns</span>
              <span className="pill" data-tone={contradicted ? 'signal' : 'verified'}>
                {contradicted ? 'contradicted' : 'verified'}
              </span>
              <span className="pill">core</span>
            </div>

            <div className="claim-card__line" data-role="before" data-hidden={!contradicted}>
              <span className="claim-card__badge">before</span>
              <span>Returns are accepted within 30 days of delivery.</span>
            </div>

            <div className="claim-card__line" data-role="after">
              <span className="claim-card__badge">{contradicted ? 'after' : 'current'}</span>
              <span>
                Returns are accepted within {contradicted ? '45' : '30'} days of delivery.
              </span>
            </div>

            <div className="claim-card__meta">
              <span>value {contradicted ? '45' : '30'} days</span>
              <span>confidence 1.0</span>
              <span>detected by typed_value</span>
              <span>verified build.46</span>
              {contradicted ? <span>changed build.47</span> : null}
            </div>
          </div>
        </div>

        <div className="ledger__right">
          <span className="ledger__label">
            Blast radius — <code>*[_type == &quot;assertion&quot; &amp;&amp; references($claimId)]</code>
          </span>
          <div className="dependents">
            {DEPENDENTS.map((dependent, index) => (
              <div
                className="dependent"
                key={dependent.name}
                data-state={index < flipped ? 'stale' : 'verified'}
              >
                <span className="dependent__dot" />
                <span className="dependent__name">{dependent.name}</span>
                <span className="dependent__kind">{dependent.kind}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="ledger__foot">
        {flipped === 0 ? (
          <span>Everything published agrees with the current build.</span>
        ) : (
          <>
            <span className="ledger__count">
              {flipped} of {DEPENDENTS.length}
            </span>
            <span>
              surfaces now assert a retired fact — seven pages and one bot, found by one
              query, not guessed at.
            </span>
          </>
        )}
      </div>
    </div>
  )
}
