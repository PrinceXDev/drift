import {useCallback, useEffect, useState} from 'react'

import * as api from '../state/api'
import type {AuditEvent, Me, Mode} from '../state/model'
import {EVENT_LABELS, can} from '../state/model'
import {Card, Chip, Empty, When} from '../ui/primitives'

/**
 * The Audit Trail — and the time machine, which are the same thing.
 *
 * # One structure, four features
 *
 * The append-only log is read four ways and no new machinery is needed for any
 * of them: audit is the log; an incident timeline is the log filtered by
 * subject; replay is folding it again; time-travel is folding it only up to a
 * sequence number. The scrubber below is literally a bound on a read.
 *
 * # Why "verify" is a button
 *
 * Every event carries the hash of its predecessor, so the log is a chain: alter
 * or remove an entry and every hash after it breaks. A badge that always says
 * "verified" is worth nothing, because the person who doubts the trail has no
 * way to test it. A button they press, that walks the chain server-side and
 * reports what it found, is worth something.
 */
export function AuditTrail({me, mode}: {me: Me; mode: Mode}) {
  const [events, setEvents] = useState<AuditEvent[]>([])
  const [upToSeq, setUpToSeq] = useState<number | null>(null)
  const [integrity, setIntegrity] = useState<api.IntegrityReport | null>(null)
  const [checking, setChecking] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [subject, setSubject] = useState<string | null>(null)

  const live = mode === 'live'
  const mayRead = can(me, 'audit:read')

  const load = useCallback(async () => {
    if (!live || !mayRead) return
    try {
      const params: {upToSeq?: number; subject?: string} = {}
      if (upToSeq) params.upToSeq = upToSeq
      if (subject) params.subject = subject
      const response = await api.loadAudit(params)
      setEvents(response.events)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    }
  }, [live, mayRead, upToSeq, subject])

  useEffect(() => {
    void load()
  }, [load])

  async function verify() {
    setChecking(true)
    try {
      setIntegrity(await api.verifyAudit())
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setChecking(false)
    }
  }

  if (!live) {
    return (
      <Empty title="The audit trail lives in the engine.">
        <div className="muted">
          It is append-only and hash-chained, so it cannot be served from committed fixtures —
          a trail you can regenerate is not a trail.{' '}
          {mode === 'anonymous' ? (
            <>The engine is running; sign in to read it.</>
          ) : (
            <>
              Start the engine with <code>go run ./cmd/engine -fixtures</code> and sign in.
            </>
          )}
        </div>
      </Empty>
    )
  }

  if (!mayRead) {
    return (
      <Empty title="You do not have audit access.">
        <div className="muted">
          Reading the trail needs <code>audit:read</code>, which belongs to editors, stewards
          and admins. Your roles: {me.roles.join(', ')}.
        </div>
      </Empty>
    )
  }

  // The scrubber's range is the full history; the newest event is its maximum.
  const maxSeq = events.length > 0 ? Math.max(...events.map((e) => e.seq)) : 0
  const historical = upToSeq !== null && upToSeq < maxSeq

  return (
    <>
      <div className="timetravel">
        <span className="section-label" style={{margin: 0}}>
          Time travel
        </span>
        <input
          className="scrubber"
          type="range"
          min={1}
          max={Math.max(1, maxSeq)}
          value={upToSeq ?? Math.max(1, maxSeq)}
          onChange={(e) => setUpToSeq(Number(e.target.value))}
          aria-label="View the ledger as of a point in history"
          disabled={maxSeq === 0}
        />
        <span className="mono faint nowrap">
          as of event {upToSeq ?? maxSeq} of {maxSeq}
        </span>
        {historical && (
          <button type="button" className="btn ghost" onClick={() => setUpToSeq(null)}>
            Return to now
          </button>
        )}
      </div>

      {historical && (
        <div className="banner warn">
          <div>
            <strong>Viewing history.</strong>
            <div className="muted" style={{marginTop: 3}}>
              This is the ledger as it stood at event {upToSeq}, not as it stands now. Nothing
              here reflects decisions taken after that point.
            </div>
          </div>
        </div>
      )}

      {subject && (
        <div className="banner info">
          <div>
            <strong>Filtered to one subject.</strong>{' '}
            <code>{subject}</code> — this is the incident timeline for that object.
          </div>
          <button
            type="button"
            className="btn ghost"
            style={{marginLeft: 'auto'}}
            onClick={() => setSubject(null)}
          >
            Clear
          </button>
        </div>
      )}

      <Card
        title="Chain integrity"
        action={
          <button type="button" className="btn" onClick={verify} disabled={checking}>
            {checking ? 'Walking the chain…' : 'Verify now'}
          </button>
        }
      >
        {integrity ? (
          <div className="btn-row">
            <Chip tone={integrity.intact ? 'ok' : 'critical'}>
              {integrity.intact ? 'intact' : 'TAMPERED'}
            </Chip>
            <span className="muted">{integrity.detail}</span>
          </div>
        ) : (
          <span className="muted">
            Each entry carries the hash of the one before it. Press verify and the engine walks
            the whole chain, recomputing every content address — an altered or deleted entry
            breaks every hash after it and is reported here.
          </span>
        )}
      </Card>

      {error && (
        <div className="banner crit">
          <div>{error}</div>
        </div>
      )}

      <Card title={`History · ${events.length} event${events.length === 1 ? '' : 's'}`}>
        {events.length === 0 ? (
          <span className="muted">
            Nothing recorded yet. Approve or reject a correction and it appears here.
          </span>
        ) : (
          <div className="timeline">
            {[...events].reverse().map((event) => (
              <Entry key={event.id} event={event} onFilter={() => setSubject(event.subject)} />
            ))}
          </div>
        )}
      </Card>
    </>
  )
}

function Entry({event, onFilter}: {event: AuditEvent; onFilter: () => void}) {
  const tone =
    event.type.startsWith('publication.blocked') || event.type.includes('rejected')
      ? 'crit'
      : event.type.includes('completed') || event.type.includes('approved')
        ? 'ok'
        : 'accent'

  return (
    <div className={`tl-item ${tone}`}>
      <div className="tl-head">
        <span className="tl-type">{EVENT_LABELS[event.type] ?? event.type}</span>
        <button type="button" className="btn ghost" onClick={onFilter} title="Show only this subject">
          <span className="mono">{event.subject}</span>
        </button>
        {event.isAgent && <Chip tone="major">agent</Chip>}
      </div>

      <div className="tl-meta">
        seq {event.seq} · {event.actorId} ({event.actorRole}) · build{' '}
        {event.buildId.replace('build.', '')} · <When iso={event.at} />
      </div>

      {event.evidence && Object.keys(event.evidence).length > 0 && (
        <div className="tl-evidence">
          {Object.entries(event.evidence).map(([key, value]) => (
            <div key={key}>
              <span className="faint">{key}: </span>
              {Array.isArray(value) ? value.join(', ') : String(value)}
            </div>
          ))}
        </div>
      )}

      <div className="tl-meta" style={{marginTop: 4}}>
        <span title="Content address of this event">{event.id}</span>
        {event.prevId && (
          <>
            {' ← '}
            <span title="The event this one chains to">{event.prevId.slice(0, 14)}…</span>
          </>
        )}
        {' · '}
        <span title="Ties this entry to the request that caused it">{event.correlationId}</span>
      </div>
    </div>
  )
}
