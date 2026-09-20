import type {Indexes, Me, OpenConflict} from '../state/model'
import {can} from '../state/model'
import {Card, Chip, Empty} from '../ui/primitives'

/**
 * The Conflict Room.
 *
 * # Why this is a room and not a warning
 *
 * A Sanity Knowledge Base raises an issue at build time when the same fact
 * appears with different values across sources. Almost every system treats that
 * as build noise and suppresses it. Here it is a surface with a door on it,
 * because a disagreement between two sources is not a defect in the index — it
 * is a decision the organisation has not made yet.
 *
 * # What resolving actually does
 *
 * It does not patch a page. It writes a plain-language standing Instruction
 * back into the Knowledge Base, anchored to the sources that disagreed, so the
 * *next build* is correct by construction and nobody is asked again.
 *
 * Sanity then archives that instruction automatically if either anchoring
 * source changes — which surfaces as an `instruction.archived` event, because a
 * decision whose justification has moved is worth re-examining. That is the
 * instruction lineage: created by an adjudication, expired by a source edit,
 * both recorded.
 */
export function ConflictRoom({
  conflicts,
  indexes,
  me,
}: {
  conflicts: OpenConflict[]
  indexes: Indexes
  me: Me
}) {
  const mayResolve = can(me, 'conflict:resolve')

  if (conflicts.length === 0) {
    return (
      <Empty title="No unresolved conflicts.">
        <div className="muted">
          Every source agrees, or a standing instruction has already settled the disagreement.
        </div>
      </Empty>
    )
  }

  return (
    <>
      {!mayResolve && (
        <div className="banner info">
          <div>
            <strong>You can read this, but not settle it.</strong>
            <div className="muted" style={{marginTop: 3}}>
              Resolving a conflict writes a standing decision into the Knowledge Base and needs
              the <code>conflict:resolve</code> permission, which belongs to a steward. Your
              roles: {me.roles.join(', ')}.
            </div>
          </div>
        </div>
      )}

      {conflicts.map(({build, conflict, claim}) => {
        // Authority decides the default. A human confirms a decision rather
        // than making one from nothing.
        const sides = conflict.competingValues
          .map((cv) => ({
            ...cv,
            authority: cv.authority || (indexes.sourcesById.get(cv.sourceId)?.authority ?? 0),
            title: indexes.sourcesById.get(cv.sourceId)?.title ?? cv.sourceId,
          }))
          .sort((a, b) => b.authority - a.authority || a.sourceId.localeCompare(b.sourceId))

        const top = sides[0]
        const second = sides[1]
        const decisive = Boolean(top && second && top.authority > second.authority)
        const subject = conflict.path.split('/').pop()?.replace(/-/g, ' ') ?? conflict.path

        return (
          <Card
            key={`${build.id}:${conflict.path}`}
            title={conflict.path}
            action={
              <div className="btn-row">
                {claim?.tier === 'core' && <Chip tone="critical">core claim</Chip>}
                <Chip tone="major">unresolved</Chip>
              </div>
            }
          >
            <p className="muted" style={{marginTop: 0}}>
              Raised by build {build.buildNumber}. Two sources assert different values, and
              nothing on record says which one wins.
            </p>

            <div className="sides">
              {sides.map((side, i) => (
                <div key={side.sourceId} className={`side ${decisive && i === 0 ? 'wins' : ''}`}>
                  <div className="side-value">
                    {side.value !== undefined ? `${side.value} ${side.unit ?? ''}` : '—'}
                  </div>
                  <div className="side-quote">“{side.statement}”</div>
                  <div className="side-source">
                    {side.title}
                    <span className="authority"> · authority {side.authority}</span>
                  </div>
                  {decisive && i === 0 && (
                    <div style={{marginTop: 7}}>
                      <Chip tone="ok">higher authority</Chip>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <hr className="rule" />

            <div className="section-label">If you settle it this way</div>
            {decisive && top ? (
              <>
                <div className="instruction-preview">
                  “When {top.title} and {sides.slice(1).map((s) => s.title).join(', ')} disagree
                  about {subject}, {top.title} is authoritative.”
                </div>
                <div className="btn-row">
                  <button type="button" className="btn primary" disabled={!mayResolve}>
                    Write this instruction to the Knowledge Base
                  </button>
                  <button type="button" className="btn ghost" disabled={!mayResolve}>
                    Choose the other source instead
                  </button>
                </div>
                <p className="note">
                  This writes a standing decision anchored to {sides.length} sources — it does
                  not edit a page. Build {build.buildNumber + 1} will then be correct by
                  construction. Sanity archives the instruction automatically if either
                  anchoring source changes, which reappears here as an{' '}
                  <code>instruction.archived</code> event.
                </p>
              </>
            ) : (
              <>
                <div className="banner warn" style={{marginBottom: 0}}>
                  <div>
                    <strong>Equal authority. There is no default.</strong>
                    <div className="muted" style={{marginTop: 3}}>
                      Both sources carry the same weight, so the system has nothing useful to
                      suggest. Marking a favourite anyway would dress a coin-flip up as a
                      recommendation. A person has to decide, and record why.
                    </div>
                  </div>
                </div>
                <div className="btn-row" style={{marginTop: 10}}>
                  {sides.map((side) => (
                    <button
                      key={side.sourceId}
                      type="button"
                      className="btn"
                      disabled={!mayResolve}
                    >
                      {side.title} is authoritative
                    </button>
                  ))}
                </div>
              </>
            )}
          </Card>
        )
      })}
    </>
  )
}
