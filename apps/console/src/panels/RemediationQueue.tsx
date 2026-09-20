import {useState} from 'react'

import * as api from '../state/api'
import type {GateDecision, Indexes, Me, Mode, QueueItem} from '../state/model'
import {CHECK_LABELS, can} from '../state/model'
import {
  Card,
  Chip,
  Diff,
  Empty,
  SeverityGlyph,
  TierChip,
} from '../ui/primitives'

/**
 * The Remediation Queue — where a correction meets a person.
 *
 * # The gate is the feature
 *
 * Between an agent drafting a correction and a human approving it, time passes.
 * In that window the Knowledge Base can rebuild, the claim can change again,
 * another page can start depending on it, or a second source can appear that
 * contradicts the fix.
 *
 * So "approve" cannot mean "publish what was drafted". It means "publish this,
 * if it is still the right thing to publish" — and the gate re-derives every
 * check rather than trusting anything computed earlier. The checklist below is
 * that re-derivation, shown before the operator commits, in the same shape as a
 * CI run because that is a shape engineers already know how to read.
 *
 * # Nothing here is a model's opinion
 *
 * Every check is a comparison between values that already exist. When a
 * publication is blocked the operator gets a named check and two values.
 */
export function RemediationQueue({
  items,
  indexes,
  me,
  mode,
  buildId,
  onChanged,
}: {
  items: QueueItem[]
  indexes: Indexes
  me: Me
  mode: Mode
  buildId: string
  onChanged: () => void
}) {
  const [selected, setSelected] = useState<QueueItem | null>(items[0] ?? null)

  if (items.length === 0) {
    return (
      <Empty title="Nothing to remediate.">
        <div className="muted">
          Every published statement agrees with the current build.
        </div>
      </Empty>
    )
  }

  const active = items.find((i) => i.id === selected?.id) ?? items[0] ?? null

  return (
    <div className="split">
      <Card title={`${items.length} stale assertion${items.length === 1 ? '' : 's'}`} flush>
        <div className="feed">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`feed-row sev-${item.severity}`}
              aria-current={active?.id === item.id}
              onClick={() => setSelected(item)}
            >
              <SeverityGlyph severity={item.severity} />
              <span className="claim-path">{item.event.claimPath}</span>
              <span className="row-prose">
                {item.page.title} · {item.assertion.fieldPath}
              </span>
              <span className="row-meta">
                <TierChip tier={item.event.tier} />
              </span>
            </button>
          ))}
        </div>
      </Card>

      {active && (
        <Remediate
          key={active.id}
          item={active}
          indexes={indexes}
          me={me}
          mode={mode}
          buildId={buildId}
          onChanged={onChanged}
        />
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------

type Phase = 'idle' | 'checking' | 'checked' | 'publishing' | 'done' | 'failed'

function Remediate({
  item,
  indexes,
  me,
  mode,
  buildId,
  onChanged,
}: {
  item: QueueItem
  indexes: Indexes
  me: Me
  mode: Mode
  buildId: string
  onChanged: () => void
}) {
  const [text, setText] = useState(item.proposedText)
  const [decision, setDecision] = useState<GateDecision | null>(null)
  const [phase, setPhase] = useState<Phase>('idle')
  const [message, setMessage] = useState<string | null>(null)

  const live = mode === 'live'
  const mayPublish = can(me, 'correction:publish')
  const maySimulate = can(me, 'simulation:run')

  const draft: api.Draft = {
    assertionId: item.assertion.id,
    proposedText: text,
    draftedAgainstBuild: buildId,
    draftedBlastRadius: item.event.blastRadius,
    touchedFieldPath: item.assertion.fieldPath,
    draftedBy: 'agent.drafter',
  }

  async function runGate() {
    setPhase('checking')
    setMessage(null)
    try {
      setDecision(await api.previewCorrection(draft))
      setPhase('checked')
    } catch (err) {
      setPhase('failed')
      setMessage(err instanceof Error ? err.message : String(err))
    }
  }

  async function approve() {
    setPhase('publishing')
    setMessage(null)
    try {
      const outcome = await api.approveCorrection(draft)
      setDecision(outcome.decision)
      if (outcome.applied) {
        setPhase('done')
        setMessage(
          outcome.duplicate
            ? 'Already published — this approval had been processed before.'
            : `Published. Audit entry ${outcome.eventId}.`,
        )
        onChanged()
      } else {
        setPhase('checked')
        setMessage(
          `The gate refused. The attempt is recorded as ${outcome.eventId} — a blocked ` +
            'publication is a fact the audit trail keeps.',
        )
      }
    } catch (err) {
      setPhase('failed')
      setMessage(err instanceof Error ? err.message : String(err))
    }
  }

  return (
    <div>
      <Card title="The correction">
        <div style={{marginBottom: 9}}>
          <strong>{item.page.title}</strong>{' '}
          <span className="mono faint">/{item.page.slug}</span>
          <div className="faint mono" style={{fontSize: 11, marginTop: 2}}>
            {item.assertion.fieldPath} · block {item.assertion.blockKey ?? '—'} · claim{' '}
            {item.event.claimPath}
          </div>
        </div>

        <Diff before={item.assertion.renderedText} after={text} />

        <div className="field" style={{marginTop: 11}}>
          <label htmlFor="proposed">Proposed text</label>
          <textarea
            id="proposed"
            value={text}
            onChange={(e) => {
              setText(e.target.value)
              // Any edit invalidates the previous verdict. Showing a stale green
              // checklist next to changed text is exactly the kind of quiet lie
              // this product exists to catch.
              setDecision(null)
              setPhase('idle')
            }}
          />
        </div>

        <p className="note">
          Drafted deterministically in the browser for this demo. In the engine this is a
          Sanity Agent Action <code>Transform</code> with <code>noWrite: true</code>, scoped by{' '}
          <code>target.path</code> to block <code>{item.assertion.blockKey ?? '—'}</code> and
          nothing else — so the agent is structurally incapable of publishing, not merely
          instructed not to.
        </p>
      </Card>

      <Card
        title="Publication gate"
        action={
          <button
            type="button"
            className="btn"
            onClick={runGate}
            disabled={!live || !maySimulate || phase === 'checking'}
          >
            {phase === 'checking' ? 'Running checks…' : 'Run the gate'}
          </button>
        }
        flush
      >
        {!live ? (
          <div style={{padding: 13}} className="muted">
            The gate runs in the engine.{' '}
            {mode === 'anonymous' ? (
              <>It is running; sign in to evaluate a correction.</>
            ) : (
              <>
                Start it with <code>go run ./cmd/engine -fixtures</code> and sign in to
                evaluate a correction.
              </>
            )}
          </div>
        ) : !decision ? (
          <div style={{padding: 13}} className="muted">
            Nine deterministic checks, re-derived against the current build. Nothing is
            published until every blocking one passes.
          </div>
        ) : (
          <>
            <div className="gate">
              {decision.checks.map((check) => {
                const state = check.passed ? 'pass' : check.blocking ? 'block' : 'warn'
                return (
                  <div key={check.name} className="gate-item">
                    <span className={`gate-mark ${state}`} aria-hidden="true">
                      {check.passed ? '✓' : check.blocking ? '✕' : '!'}
                    </span>
                    <div>
                      <div className="gate-label">
                        {CHECK_LABELS[check.name] ?? check.name}
                        {!check.passed && !check.blocking && (
                          <Chip tone="major">advisory</Chip>
                        )}
                      </div>
                      <div className="gate-detail">{check.detail}</div>
                      <div className="gate-id">{check.name}</div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className={`verdict ${decision.allowed ? 'allow' : 'block'}`}>
              {decision.allowed
                ? `Ready to publish · verified against ${decision.buildId}`
                : `Blocked · ${decision.checks.filter((c) => c.blocking && !c.passed).length} check(s) failed`}
              <span className="faint mono" style={{marginLeft: 'auto', fontWeight: 400}}>
                {decision.blastRadius?.length ?? 0} dependent assertion(s)
              </span>
            </div>
          </>
        )}
      </Card>

      <Card title="Decision">
        {!mayPublish && (
          <div className="banner info" style={{marginBottom: 10}}>
            <div>
              <strong>You cannot publish.</strong>
              <div className="muted" style={{marginTop: 3}}>
                Publication needs <code>correction:publish</code>. Your roles:{' '}
                {me.roles.join(', ')}.
                {me.isAgent &&
                  ' You are an unattended process — agents may propose but never dispose.'}
              </div>
            </div>
          </div>
        )}

        <div className="btn-row">
          <button
            type="button"
            className="btn primary"
            onClick={approve}
            disabled={!live || !mayPublish || phase === 'publishing' || phase === 'done'}
          >
            {phase === 'publishing' ? 'Publishing…' : 'Approve and publish'}
          </button>
          <button type="button" className="btn danger" disabled={!live || !mayPublish}>
            Reject with a reason
          </button>
        </div>

        {message && (
          <div
            className={`banner ${phase === 'done' ? 'info' : phase === 'failed' ? 'crit' : 'warn'}`}
            style={{marginTop: 11, marginBottom: 0}}
          >
            <div>{message}</div>
          </div>
        )}

        <p className="note">
          Approving is recorded in the append-only log <em>before</em> the write is attempted.
          If the process dies mid-publish, the trail still says a decision was made — which is
          recoverable. The reverse ordering would lose that fact entirely.
        </p>
      </Card>
    </div>
  )
}
