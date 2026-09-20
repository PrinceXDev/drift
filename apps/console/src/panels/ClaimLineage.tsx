import {useEffect, useMemo, useState} from 'react'
import type {Claim, DriftData} from '@drift/fixtures'

import * as api from '../state/api'
import type {AuditEvent, Indexes, Lineage, Me, Mode} from '../state/model'
import {
  EVENT_LABELS,
  SURFACE_MEANING,
  can,
  lineageOf,
  lineageOrder,
  verifiedBy,
} from '../state/model'
import {Card, Chip, Diff, Empty, TierChip, When} from '../ui/primitives'

/**
 * Claim Lineage — where a statement came from, and what still depends on it.
 *
 * # Why this panel exists
 *
 * The Drift Feed answers "what changed?". The Conflict Room answers "who
 * disagrees?". Neither answers the question somebody actually asks when they
 * are about to act on a fact, which is: *where did this come from, who checked
 * it, and what breaks if it moves?*
 *
 * Every other part of DRIFT already held a piece of that answer — the claim's
 * citations, the build stamps, the assertion graph, the audit trail — and
 * nowhere put them on one screen. This is the half that was missing.
 *
 * # Six branches
 *
 *   Claim      the statement, its typed value, its tier
 *   Source     what the organisation wrote down, highest authority first
 *   Created    the build it first appeared in
 *   Verified   the build it was last re-confirmed in, and the person who signed
 *   Published  every surface expressing it — pages and agents together
 *   Changed    the build it last moved in, and what it moved from
 *
 * # Why Verified names a person
 *
 * A build stamp says *when* a fact was last confirmed. It cannot say who,
 * because a build is a machine event — and "verified" that means only "a
 * machine saw it again" is the kind of reassurance that gets somebody into
 * trouble. A person enters the story when they approve a correction, and that
 * is an audit entry, which is why this panel reads the claim's timeline as well
 * as its stamps.
 *
 * When nobody has approved anything, it says so. An invented approver would be
 * the single worst thing a provenance view could contain.
 */
export function ClaimLineage({
  data,
  indexes,
  me,
  mode,
  selectedClaimId,
  onSelectClaim,
}: {
  data: DriftData
  indexes: Indexes
  me: Me
  mode: Mode
  selectedClaimId: string | null
  onSelectClaim: (claimId: string) => void
}) {
  const claims = useMemo(() => lineageOrder(data), [data])
  const movedIds = useMemo(() => new Set(data.events.map((e) => e.claimId)), [data.events])

  const activeId = selectedClaimId ?? claims[0]?.id ?? null
  const lineage = useMemo(
    () => (activeId ? lineageOf(activeId, data, indexes) : null),
    [activeId, data, indexes],
  )

  const [timeline, setTimeline] = useState<AuditEvent[]>([])
  const [timelineError, setTimelineError] = useState<string | null>(null)

  const live = mode === 'live'
  const mayReadAudit = can(me, 'audit:read')

  useEffect(() => {
    let cancelled = false
    setTimeline([])
    setTimelineError(null)

    if (!activeId || !live || !mayReadAudit) return

    void api
      .loadClaimTimeline(activeId)
      .then((events) => {
        if (!cancelled) setTimeline(events)
      })
      .catch((err: unknown) => {
        if (!cancelled) setTimelineError(err instanceof Error ? err.message : String(err))
      })

    return () => {
      cancelled = true
    }
  }, [activeId, live, mayReadAudit])

  if (claims.length === 0) {
    return <Empty title="No claims in this build." />
  }

  return (
    <div className="split">
      <div>
        {lineage ? (
          <LineageDetail
            lineage={lineage}
            timeline={timeline}
            timelineError={timelineError}
            live={live}
            anonymous={mode === 'anonymous'}
            mayReadAudit={mayReadAudit}
          />
        ) : (
          <Empty title="Select a claim." />
        )}
      </div>

      {/* The picker scrolls on its own. Both columns here are long — eight
          claims beside a six-branch lineage — and sharing one page scroll
          means reaching the list at the bottom of the detail you are already
          reading, then losing your place when you pick something. */}
      <div className="lineage-picker">
        <Card title={`Claims · ${claims.length}`} flush>
          <div className="claim-list">
            {claims.map((claim) => (
              <ClaimRow
                key={claim.id}
                claim={claim}
                moved={movedIds.has(claim.id)}
                dependents={(indexes.assertionsByClaim.get(claim.id) ?? []).length}
                selected={claim.id === activeId}
                onSelect={() => onSelectClaim(claim.id)}
              />
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------

function ClaimRow({
  claim,
  moved,
  dependents,
  selected,
  onSelect,
}: {
  claim: Claim
  moved: boolean
  dependents: number
  selected: boolean
  onSelect: () => void
}) {
  // Stacked rather than columnar. A claim path is a slash-separated string of
  // unpredictable length and a statement is a whole sentence; side by side in
  // fixed columns one of them is always either clipped or colliding with the
  // other. Down the row they simply both fit.
  return (
    <button
      type="button"
      className={`claim-row ${moved ? 'moved' : ''}`}
      aria-current={selected}
      onClick={onSelect}
    >
      <span className="claim-path">{claim.path}</span>
      <span className="claim-row-statement">{claim.statement}</span>
      <span className="claim-row-meta">
        <TierChip tier={claim.tier} />
        {claim.status !== 'active' && <Chip tone="major">{claim.status}</Chip>}
        <Chip title="Published places expressing this claim">
          {dependents} dependent{dependents === 1 ? '' : 's'}
        </Chip>
        {moved && <Chip tone="critical">moved</Chip>}
      </span>
    </button>
  )
}

function LineageDetail({
  lineage,
  timeline,
  timelineError,
  live,
  anonymous,
  mayReadAudit,
}: {
  lineage: Lineage
  timeline: AuditEvent[]
  timelineError: string | null
  live: boolean
  anonymous: boolean
  mayReadAudit: boolean
}) {
  const {claim, sources, created, verified, changed, published, drift} = lineage
  const approver = verifiedBy(timeline)

  const pages = published.filter((d) => d.surface.kind === 'page')
  const others = published.filter((d) => d.surface.kind !== 'page')

  return (
    <>
      <Card title="Claim">
        <div className="lineage-claim">
          <div className="claim-path">{claim.path}</div>
          <p className="lineage-statement">{claim.statement}</p>
          <div className="btn-row">
            <TierChip tier={claim.tier} />
            <Chip tone={claim.status === 'active' ? 'ok' : 'major'}>{claim.status}</Chip>
            {claim.value !== undefined && (
              <Chip mono title="A typed quantity. Contradiction here is arithmetic, not opinion.">
                {claim.value} {claim.unit}
              </Chip>
            )}
            <Chip mono>{claim.id}</Chip>
          </div>
        </div>
      </Card>

      <Card title="Lineage" flush>
        <div className="lineage">
          <Branch
            label="Source"
            count={sources.length}
            hint="What the organisation wrote down. Authority is what settles a disagreement."
          >
            {sources.length === 0 ? (
              <Nothing>
                No cited source. A claim without one is a bug in extraction, not a fact.
              </Nothing>
            ) : (
              sources.map((source) => (
                <div key={source.id} className="lineage-item">
                  <div className="lineage-item-title">{source.title}</div>
                  <div className="lineage-item-sub">
                    {source.kind} · authority {source.authority} · {source.owner}
                  </div>
                  <div className="lineage-item-sub faint">
                    last edited <When iso={source.changedAt} />
                  </div>
                </div>
              ))
            )}
          </Branch>

          <Branch label="Created" hint="The build this claim first appeared in.">
            <BuildRef
              id={claim.firstSeenBuild}
              build={created}
              detail="the earliest build this ledger holds it in"
            />
          </Branch>

          <Branch
            label="Verified"
            hint="The build it was last re-asserted unchanged in — and the person who signed off on it."
          >
            <BuildRef
              id={claim.lastVerifiedBuild}
              build={verified}
              detail="re-asserted without change"
            />
            <div className="lineage-item">
              <div className="lineage-item-title">
                {approver ? (
                  <>
                    {approver.actorId}{' '}
                    <span className="faint">({approver.actorRole})</span>
                  </>
                ) : (
                  <span className="faint">No person has approved a change to this claim</span>
                )}
              </div>
              <div className="lineage-item-sub">
                {approver ? (
                  <>
                    {EVENT_LABELS[approver.type] ?? approver.type} · <When iso={approver.at} /> ·{' '}
                    <span className="mono">{approver.id}</span>
                  </>
                ) : !live ? (
                  'The approving actor comes from the audit chain, which needs a signed-in session to read.'
                ) : !mayReadAudit ? (
                  'Naming the approver needs audit:read, which your roles do not include.'
                ) : (
                  'A build confirmed the fact; nobody has had to act on it.'
                )}
              </div>
            </div>
          </Branch>

          <Branch
            label="Published"
            count={published.length}
            hint="Every surface expressing this claim. The walk is one GROQ reference query, so this list cannot be short."
          >
            {published.length === 0 ? (
              <Nothing>Nothing published depends on this claim.</Nothing>
            ) : (
              <>
                {pages.map((dependent) => (
                  <SurfaceRow key={dependent.assertion.id} dependent={dependent} />
                ))}
                {others.map((dependent) => (
                  <SurfaceRow key={dependent.assertion.id} dependent={dependent} />
                ))}
                {others.length > 0 && (
                  <div className="lineage-note">
                    {pages.length} page{pages.length === 1 ? '' : 's'} can be corrected from the
                    queue.{' '}
                    {others.length === 1
                      ? 'The other surface is downstream of the Knowledge Base: it stops'
                      : `The other ${others.length} surfaces are downstream of the Knowledge Base: they stop`}{' '}
                    repeating the old value when the next build lands, and no approval changes
                    that.
                  </div>
                )}
              </>
            )}
          </Branch>

          <Branch
            label="Changed"
            hint="The build its substance last moved in — which is deliberately not the same as when it was last verified."
            last
          >
            {claim.lastChangedBuild ? (
              <>
                <BuildRef
                  id={claim.lastChangedBuild}
                  build={changed}
                  detail="the claim's substance moved"
                />
                {drift?.before && drift.after && (
                  <div className="lineage-item">
                    <Diff before={drift.before} after={drift.after} />
                    <div className="lineage-item-sub faint">
                      detected by {drift.detectedBy.replace(/_/g, ' ')} at confidence{' '}
                      {drift.confidence.toFixed(2)}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <Nothing>
                Never changed since it first appeared. It has been re-asserted identically in every
                build since.
              </Nothing>
            )}
          </Branch>
        </div>
      </Card>

      <ClaimTimeline
        events={timeline}
        error={timelineError}
        live={live}
        anonymous={anonymous}
        mayReadAudit={mayReadAudit}
      />
    </>
  )
}

/**
 * One branch of the tree.
 *
 * Drawn with a rule and a label rather than as an actual tree diagram. The
 * ASCII sketch this panel came from reads beautifully in a terminal and badly
 * in a browser at 1200px, where the connectors cost horizontal room that the
 * content needs — and the tree adds nothing, because the branches are siblings
 * with no nesting between them.
 */
function Branch({
  label,
  count,
  hint,
  last,
  children,
}: {
  label: string
  count?: number
  hint: string
  last?: boolean
  children: React.ReactNode
}) {
  return (
    <section className={`lineage-branch ${last ? 'last' : ''}`}>
      <div className="lineage-branch-head">
        <span className="lineage-branch-label">{label}</span>
        {count !== undefined && <span className="lineage-branch-count">{count}</span>}
        <span className="lineage-branch-hint">{hint}</span>
      </div>
      <div className="lineage-branch-body">{children}</div>
    </section>
  )
}

/**
 * A build stamp, resolved to a date where possible.
 *
 * A stamp naming a build this ledger no longer holds renders as the bare ID
 * with a note, rather than as a guess or as nothing at all. "build.31,
 * snapshot not retained" is true; a fabricated timestamp is not, and an empty
 * row would read as "this fact came from nowhere".
 */
function BuildRef({
  id,
  build,
  detail,
}: {
  id: string | undefined
  build: {id: string; buildNumber: number; builtAt: string; outlineHash: string} | undefined
  detail: string
}) {
  if (!id) {
    return <Nothing>Not recorded.</Nothing>
  }
  if (!build) {
    return (
      <div className="lineage-item">
        <div className="lineage-item-title mono">{id}</div>
        <div className="lineage-item-sub faint">
          snapshot not retained — the stamp is real, the build is no longer held
        </div>
      </div>
    )
  }
  return (
    <div className="lineage-item">
      <div className="lineage-item-title">
        Build #{build.buildNumber} <span className="faint">· {detail}</span>
      </div>
      <div className="lineage-item-sub">
        <When iso={build.builtAt} /> ·{' '}
        <span className="mono faint" title="Content address of the outline and every entry">
          {build.outlineHash.replace('sha256:', '').slice(0, 10)}
        </span>
      </div>
    </div>
  )
}

function SurfaceRow({
  dependent,
}: {
  dependent: {assertion: {id: string; fieldPath: string; renderedText: string; state: string}; surface: {id: string; kind: string; title: string; owner: string; locator?: string}}
}) {
  const {assertion, surface} = dependent
  const correctable = surface.kind === 'page'

  return (
    <div className="lineage-item">
      <div className="lineage-item-title">
        {surface.title}{' '}
        {/* Two returns rather than a conditional prop: under
            exactOptionalPropertyTypes an explicit `undefined` is not the same
            as an absent property. */}
        {correctable ? (
          <Chip title={SURFACE_MEANING[surface.kind] ?? surface.kind}>{surface.kind}</Chip>
        ) : (
          <Chip tone="major" title={SURFACE_MEANING[surface.kind] ?? surface.kind}>
            {surface.kind}
          </Chip>
        )}
      </div>
      <div className="lineage-item-sub">
        {assertion.fieldPath}
        {surface.locator ? ` · ${surface.locator}` : ''} · {surface.owner}
      </div>
      <div className="lineage-quote">{assertion.renderedText}</div>
    </div>
  )
}

/**
 * The claim's own history: every approval, block, publication and rejection
 * that touched this fact, on any surface.
 *
 * One query. Audit events carry the claim they concern alongside the assertion
 * they were subjected to, so a fact's history does not have to be reassembled
 * from today's dependency graph — which would quietly drop any assertion that
 * has since been retired, exactly the ones worth reading about.
 */
function ClaimTimeline({
  events,
  error,
  live,
  anonymous,
  mayReadAudit,
}: {
  events: AuditEvent[]
  error: string | null
  live: boolean
  anonymous: boolean
  mayReadAudit: boolean
}) {
  if (!live) {
    return (
      <Card title="Claim timeline">
        <span className="muted">
          The timeline is the audit chain filtered to this fact, and the chain lives in the
          engine — it is append-only and hash-chained, so it cannot be served from committed
          fixtures.{' '}
          {anonymous
            ? 'The engine is running; sign in to read it.'
            : 'Start the engine and sign in.'}
        </span>
      </Card>
    )
  }

  if (!mayReadAudit) {
    return (
      <Card title="Claim timeline">
        <span className="muted">
          Reading the trail needs <code>audit:read</code>. The rest of this claim&rsquo;s lineage
          is visible to you; only the record of who did what is not.
        </span>
      </Card>
    )
  }

  return (
    <Card title={`Claim timeline · ${events.length} event${events.length === 1 ? '' : 's'}`}>
      {error && <div className="banner crit"><div>{error}</div></div>}
      {events.length === 0 ? (
        <span className="muted">
          Nothing has happened to this claim yet. Approve or reject a correction and it appears
          here, whichever page it was on.
        </span>
      ) : (
        <div className="timeline">
          {[...events].reverse().map((event) => (
            <div key={event.id} className="tl-item accent">
              <div className="tl-head">
                <span className="tl-type">{EVENT_LABELS[event.type] ?? event.type}</span>
                <span className="mono faint">{event.subject}</span>
                {event.isAgent && <Chip tone="major">agent</Chip>}
              </div>
              <div className="tl-meta">
                seq {event.seq} · {event.actorId} ({event.actorRole}) · build{' '}
                {event.buildId.replace('build.', '')} · <When iso={event.at} />
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}

function Nothing({children}: {children: React.ReactNode}) {
  return <div className="lineage-item faint">{children}</div>
}
