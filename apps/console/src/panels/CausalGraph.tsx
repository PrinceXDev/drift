import {useMemo} from 'react'
import type {DriftEvent} from '@drift/fixtures'

import type {Indexes} from '../state/model'
import {affectedPages} from '../state/model'

/**
 * Source → Claim → Assertion.
 *
 * # Why this diagram is the product
 *
 * Every other AI-and-content tool can show you a passage and a citation. What
 * none of them can show you is the *causal chain*: this document was edited,
 * which changed this fact, which makes these seven published sentences wrong.
 *
 * The chain is drawable only because each link is a real Sanity reference. The
 * edges here are not inferred, scored, or laid out by a force simulation
 * guessing at relatedness — they are the literal result of
 *
 *     *[_type == "assertion" && references($claimId)]
 *
 * That is why the layout is deterministic three-column rather than a physics
 * blob. A force-directed graph says "these things are somehow related". A
 * layered graph says "this caused that", which is the actual claim.
 *
 * # Layout
 *
 * Column 1  sources, ordered by authority (the tiebreaker in a conflict)
 * Column 2  the claim under inspection
 * Column 3  published assertions, stale ones marked
 *
 * Positions are computed, not animated into place, so the picture is identical
 * every time a judge opens it.
 */

const COL = {source: 24, claim: 312, assertion: 600} as const
const NODE_W = {source: 224, claim: 250, assertion: 300} as const
const ROW_H = 62
const TOP = 46

export function CausalGraph({
  event,
  indexes,
  animate = true,
}: {
  event: DriftEvent
  indexes: Indexes
  animate?: boolean
}) {
  const model = useMemo(() => {
    const claim = indexes.claimsById.get(event.claimId)
    const sources = (claim?.citations ?? [])
      .map((id) => indexes.sourcesById.get(id))
      .filter((s): s is NonNullable<typeof s> => Boolean(s))
      .sort((a, b) => b.authority - a.authority)

    const affected = affectedPages(event, indexes)

    // Assertions that reference this claim but are *not* in the blast radius
    // are already correct. Showing them keeps the picture honest: a graph where
    // everything is red proves nothing, because there is no contrast.
    const staleIds = new Set(event.blastRadius)
    const all = indexes.assertionsByClaim.get(event.claimId) ?? []
    // Page assertions only. A surface dependent — an agent, a feed — has no
    // page to name in the third column, and this diagram is specifically the
    // source → claim → *page* chain. The Claim Lineage panel is where the
    // non-page dependents are shown, rather than half-drawn here.
    const healthy = all
      .filter((a) => !staleIds.has(a.id) && a.pageId)
      .map((a) => ({assertion: a, page: indexes.pagesById.get(a.pageId ?? '')}))
      .filter((x): x is {assertion: typeof x.assertion; page: NonNullable<typeof x.page>} =>
        Boolean(x.page),
      )

    return {claim, sources, affected, healthy}
  }, [event, indexes])

  const {claim, sources, affected, healthy} = model
  const rightCount = affected.length + healthy.length
  const rows = Math.max(sources.length, rightCount, 1)
  const height = TOP + rows * ROW_H + 24
  const width = COL.assertion + NODE_W.assertion + 24

  const claimY = TOP + ((rows - 1) * ROW_H) / 2

  return (
    <div className="graph-wrap">
      <div className="graph-legend">
        <span>
          <b>Sources</b> what the organisation wrote down
        </span>
        <span aria-hidden="true">→</span>
        <span>
          <b>Claim</b> one atomic fact
        </span>
        <span aria-hidden="true">→</span>
        <span>
          <b>Assertions</b> where it is published
        </span>
        <span style={{marginLeft: 'auto'}} className="faint">
          Edges are Sanity references, not inferred similarity
        </span>
      </div>

      <div className="graph">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          width={width}
          height={height}
          role="img"
          aria-label={describe(event, affected.length, healthy.length)}
        >
          <text className="col-label" x={COL.source} y={22}>
            Sources
          </text>
          <text className="col-label" x={COL.claim} y={22}>
            Claim
          </text>
          <text className="col-label" x={COL.assertion} y={22}>
            Published assertions
          </text>

          {/* Source → Claim */}
          {sources.map((source, i) => {
            const y = TOP + i * ROW_H + 22
            return (
              <path
                key={`e-src-${source.id}`}
                className="edge"
                d={curve(COL.source + NODE_W.source, y, COL.claim, claimY + 26)}
              />
            )
          })}

          {/* Claim → stale assertions. These are the ones that turn red. */}
          {affected.map((item, i) => {
            const y = TOP + i * ROW_H + 22
            return (
              <path
                key={`e-bad-${item.assertion.id}`}
                className={`edge hot ${animate ? 'animate' : ''}`}
                style={{animationDelay: `${i * 90}ms`}}
                d={curve(COL.claim + NODE_W.claim, claimY + 26, COL.assertion, y)}
              />
            )
          })}

          {/* Claim → assertions that are already correct. */}
          {healthy.map((item, i) => {
            const y = TOP + (affected.length + i) * ROW_H + 22
            return (
              <path
                key={`e-ok-${item.assertion.id}`}
                className="edge cool"
                d={curve(COL.claim + NODE_W.claim, claimY + 26, COL.assertion, y)}
              />
            )
          })}

          {/* Source nodes */}
          {sources.map((source, i) => {
            const y = TOP + i * ROW_H
            return (
              <g key={source.id}>
                <rect
                  className="node-box"
                  x={COL.source}
                  y={y}
                  width={NODE_W.source}
                  height={44}
                />
                <text className="node-title" x={COL.source + 10} y={y + 18}>
                  {truncate(source.title, 26)}
                </text>
                <text className="node-sub" x={COL.source + 10} y={y + 33}>
                  {source.kind} · authority {source.authority}
                </text>
              </g>
            )
          })}

          {/* The claim */}
          <g>
            <rect
              className={`node-box focus ${event.tier === 'core' ? 'core' : ''}`}
              x={COL.claim}
              y={claimY}
              width={NODE_W.claim}
              height={52}
            />
            <text className="node-title" x={COL.claim + 10} y={claimY + 18}>
              {event.claimPath}
            </text>
            <text className="node-val" x={COL.claim + 10} y={claimY + 38}>
              {claim?.value !== undefined ? `${claim.value} ${claim.unit ?? ''}` : event.kind}
            </text>
          </g>

          {/* Stale assertions */}
          {affected.map((item, i) => {
            const y = TOP + i * ROW_H
            return (
              <g key={item.assertion.id} className={animate ? 'node-enter' : ''} style={{animationDelay: `${i * 90}ms`}}>
                <rect
                  className="node-box stale"
                  x={COL.assertion}
                  y={y}
                  width={NODE_W.assertion}
                  height={44}
                />
                <text className="node-title" x={COL.assertion + 10} y={y + 17}>
                  {truncate(item.page.title, 30)}
                </text>
                <text className="node-sub" x={COL.assertion + 10} y={y + 32}>
                  {item.assertion.fieldPath} · says the old thing
                </text>
              </g>
            )
          })}

          {/* Correct assertions */}
          {healthy.map((item, i) => {
            const y = TOP + (affected.length + i) * ROW_H
            return (
              <g key={item.assertion.id}>
                <rect
                  className="node-box verified"
                  x={COL.assertion}
                  y={y}
                  width={NODE_W.assertion}
                  height={44}
                />
                <text className="node-title" x={COL.assertion + 10} y={y + 17}>
                  {truncate(item.page.title, 30)}
                </text>
                <text className="node-sub" x={COL.assertion + 10} y={y + 32}>
                  {item.assertion.fieldPath} · already correct
                </text>
              </g>
            )
          })}
        </svg>
      </div>
    </div>
  )
}

/**
 * A cubic curve between two columns.
 *
 * Curves rather than straight lines for one practical reason: with seven edges
 * fanning out from a single node, straight lines overlap into an unreadable
 * star. The horizontal control points keep each edge's direction legible where
 * it leaves and where it arrives.
 */
function curve(x1: number, y1: number, x2: number, y2: number): string {
  const dx = Math.max(36, (x2 - x1) * 0.5)
  return `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`
}

function truncate(text: string, max: number): string {
  return text.length <= max ? text : `${text.slice(0, max - 1)}…`
}

/**
 * The alt text. A screen reader user should get the same finding as a sighted
 * one — which here is a sentence, not a list of node names.
 */
function describe(event: DriftEvent, stale: number, healthy: number): string {
  return (
    `Causal graph for ${event.claimPath}. ` +
    `${stale} published assertion${stale === 1 ? '' : 's'} still state the superseded value` +
    (healthy > 0 ? `, and ${healthy} already agree with current belief.` : '.')
  )
}
