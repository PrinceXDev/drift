import type {DriftEvent} from '@drift/fixtures'

import type {Indexes, Objective} from '../state/model'
import {affectedPages, severityOf} from '../state/model'
import {
  BlastChip,
  Card,
  ConfidenceChip,
  Diff,
  Empty,
  Evidence,
  EvidenceRow,
  SeverityGlyph,
  TierChip,
} from '../ui/primitives'
import {CausalGraph} from './CausalGraph'

/**
 * The Drift Feed — what this organisation stopped believing.
 *
 * This is the landing surface, and it is deliberately not a chat box, not a
 * search field and not a chart. You arrive at a list of things your
 * organisation changed its mind about, ordered by how much trouble each one is
 * currently causing, and you have learned something about your own content
 * before clicking anything.
 */
export function DriftFeed({
  events,
  indexes,
  objectives,
  selected,
  onSelect,
}: {
  events: DriftEvent[]
  indexes: Indexes
  objectives: Objective[]
  selected: DriftEvent | null
  onSelect: (event: DriftEvent) => void
}) {
  return (
    <>
      <div className="objectives" style={{marginBottom: 14}}>
        {objectives.map((o) => (
          <ObjectiveTile key={o.label} objective={o} />
        ))}
      </div>

      {events.length === 0 ? (
        <Empty title="No drift detected.">
          <div className="muted">
            Every published statement agrees with the current build.
          </div>
        </Empty>
      ) : (
        <div className="split">
          <Card title={`Drift feed · ${events.length} belief changes`} flush>
            <div className="feed">
              {events.map((event) => (
                <FeedRow
                  key={`${event.claimPath}:${event.kind}`}
                  event={event}
                  selected={selected?.claimPath === event.claimPath}
                  onSelect={() => onSelect(event)}
                />
              ))}
            </div>
          </Card>

          {selected && <Detail event={selected} indexes={indexes} />}
        </div>
      )}
    </>
  )
}

/**
 * A content reliability objective.
 *
 * Borrowed from operations because the analogy holds: a page asserting a
 * retired fact is an error, and a target for how many of those are tolerable is
 * something a person can be accountable for. "94% verified" is a sentence an
 * executive acts on; "8 drift events" is not.
 */
function ObjectiveTile({objective}: {objective: Objective}) {
  const met = objective.value >= objective.target
  const pct = Math.round(objective.value * 100)

  return (
    <div className="objective">
      <div className="objective-label">{objective.label}</div>
      <div className={`objective-value ${met ? 'met' : 'missed'}`}>
        {pct}%
        <span className="faint" style={{fontSize: 11, fontWeight: 400, marginLeft: 6}}>
          target {Math.round(objective.target * 100)}%
        </span>
      </div>
      <div
        className="meter"
        role="meter"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={objective.label}
      >
        <div
          className={`meter-fill ${met ? 'met' : 'missed'}`}
          style={{width: `${Math.max(2, pct)}%`}}
        />
        <div className="meter-target" style={{left: `${objective.target * 100}%`}} />
      </div>
      <div className="objective-basis">{objective.basis}</div>
    </div>
  )
}

function FeedRow({
  event,
  selected,
  onSelect,
}: {
  event: DriftEvent
  selected: boolean
  onSelect: () => void
}) {
  const severity = severityOf(event)

  return (
    <button
      type="button"
      className={`feed-row sev-${severity}`}
      aria-current={selected}
      onClick={onSelect}
    >
      <SeverityGlyph severity={severity} />
      <span className="claim-path">{event.claimPath}</span>
      <Change event={event} />
      <span className="row-meta">
        <TierChip tier={event.tier} />
        <ConfidenceChip value={event.confidence} detector={event.detectedBy} />
        <BlastChip count={event.blastRadius.length} />
      </span>
    </button>
  )
}

/**
 * The change itself.
 *
 * Where a typed value moved we render the delta — `30 days → 45 days` — because
 * that is the entire story in four tokens. Where it did not, we show the prose
 * and let the confidence chip say how much to trust it.
 */
function Change({event}: {event: DriftEvent}) {
  const was = quantity(event.before)
  const now = quantity(event.after)

  if (was && now && was !== now) {
    return (
      <span className="delta">
        <span className="was">{was}</span>
        <span className="arrow" aria-hidden="true">
          →
        </span>
        <span className="now">{now}</span>
      </span>
    )
  }

  if (event.kind === 'retired') {
    return <span className="row-prose">withdrawn — {event.before}</span>
  }
  if (event.kind === 'added') {
    return <span className="row-prose">new — {event.after}</span>
  }
  return <span className="row-prose">{event.after ?? event.before}</span>
}

/**
 * Presentation only. The engine never parses prose to decide *whether*
 * something drifted — it compares the typed `value`/`unit` fields on the claim.
 * This just lets the feed render "30 days → 45 days" instead of two sentences
 * the reader has to diff by eye.
 */
function quantity(statement?: string): string | null {
  if (!statement) return null
  const m = statement.match(/(\d+(?:\.\d+)?)\s*(days?|months?|years?|hours?|percent|%|USD|EUR|GBP)/i)
  return m ? `${m[1]} ${m[2]}` : null
}

// ---------------------------------------------------------------------------
// Detail
// ---------------------------------------------------------------------------

function Detail({event, indexes}: {event: DriftEvent; indexes: Indexes}) {
  const affected = affectedPages(event, indexes)
  const claim = indexes.claimsById.get(event.claimId)

  return (
    <div>
      <Card title="Why we know">
        <Evidence>
          <EvidenceRow label={`Build ${num(event.fromBuild)} said`}>
            {event.before || <span className="faint">— nothing; this claim is new</span>}
          </EvidenceRow>
          <EvidenceRow label={`Build ${num(event.toBuild)} says`}>
            {event.after || <span className="faint">— nothing; this claim was retired</span>}
          </EvidenceRow>
          <EvidenceRow label="Method" prose>
            {explain(event.detectedBy)}
          </EvidenceRow>
          <EvidenceRow label="Confidence">
            <ConfidenceChip value={event.confidence} detector={event.detectedBy} />
          </EvidenceRow>
          {claim?.citations && claim.citations.length > 0 && (
            <EvidenceRow label="Cited sources" prose>
              {claim.citations
                .map((id) => indexes.sourcesById.get(id)?.title ?? id)
                .join(' · ')}
            </EvidenceRow>
          )}
        </Evidence>
        <p className="note">
          Nothing on this panel is a model's opinion. Two values were compared and these are
          the values. You can check it faster than you can ask anyone about it.
        </p>
      </Card>

      <Card title={`Blast radius · ${affected.length} affected`} flush>
        {affected.length === 0 ? (
          <div style={{padding: 13}}>
            <span className="muted">
              Nothing published depends on this claim. Recorded in the ledger; nobody is paged.
            </span>
          </div>
        ) : (
          <div style={{padding: 13}}>
            <CausalGraph event={event} indexes={indexes} />
          </div>
        )}
      </Card>

      {affected.length > 0 && (
        <Card title="Exactly which sentences are wrong">
          {affected.map(({page, assertion}) => (
            <div key={assertion.id} style={{marginBottom: 12}}>
              <div style={{marginBottom: 5}}>
                <strong>{page.title}</strong>{' '}
                <span className="mono faint">/{page.slug}</span>{' '}
                <span className="mono faint">· {assertion.fieldPath}</span>
              </div>
              <Diff before={assertion.renderedText} after={event.after ?? '—'} />
            </div>
          ))}
          <p className="note">
            The right-hand side is what the claim now says, not a drafted correction. Drafting
            happens in the Remediation Queue, where an Agent Action rewrites the minimum span
            and a human approves it.
          </p>
        </Card>
      )}
    </div>
  )
}

function num(buildId: string): string {
  return buildId.replace('build.', '')
}

function explain(detector: string): string {
  switch (detector) {
    case 'typed_value':
      return 'Both builds carried a typed value on this claim. The comparison is arithmetic, so the confidence is exactly 1.'
    case 'outline_presence':
      return 'The claim appeared in or vanished from the build outline. Presence itself is the evidence — no comparison was needed.'
    case 'semantic':
      return 'This claim carries no typed value, so the change was inferred from prose. Confidence is capped and a human decides.'
    case 'citation_graph':
      return 'The claim lost a citation or was demoted. Structural, so more trustworthy than prose.'
    default:
      return detector
  }
}
