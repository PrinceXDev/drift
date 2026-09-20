import {useCallback, useEffect, useMemo, useState} from 'react'
import type {DriftData, DriftEvent} from '@drift/fixtures'

import * as api from './state/api'
import type {Me, Mode} from './state/model'
import type {SanityContent} from './state/sanity'
import {
  OFFLINE_ME,
  buildIndexes,
  buildsNewestFirst,
  currentBuild,
  feedOrder,
  objectives,
  openConflicts,
  remediationQueue,
} from './state/model'
import {DriftFeed} from './panels/DriftFeed'
import {ConflictRoom} from './panels/ConflictRoom'
import {ClaimLineage} from './panels/ClaimLineage'
import {RemediationQueue} from './panels/RemediationQueue'
import {AuditTrail} from './panels/AuditTrail'
import {Banner} from './ui/primitives'
import {Icon} from './ui/Icon'
import {SignIn} from './ui/SignIn'

/**
 * The Knowledge Control Room.
 *
 * # Why a rail and not tabs
 *
 * Tabs imply peers. These panels are not peers — they are stages of one
 * process, and an operator moves along them: something changed (Feed), why do
 * the sources disagree (Conflicts), fix the pages (Queue), prove what happened
 * (Audit). A persistent rail keeps every stage one keystroke away and keeps the
 * counts visible, which is how someone notices the queue filling up while they
 * are reading something else.
 *
 * # Why the status bar never moves
 *
 * Current build, integrity state and identity are the three things that make
 * every other number on screen meaningful. A count of stale pages without a
 * build number is unfalsifiable.
 */

/**
 * Where the documentation is served.
 *
 * A separate process on a separate port, so it has to be configurable: on a
 * developer's machine it is localhost, and in a deployment it is a hostname
 * this app has no way to guess.
 */
const DOCS_URL = import.meta.env.VITE_DOCS_URL ?? 'http://localhost:3100'

type PanelId = 'feed' | 'conflicts' | 'lineage' | 'queue' | 'audit'

interface PanelDef {
  id: PanelId
  label: string
  icon: 'feed' | 'conflict' | 'lineage' | 'queue' | 'audit'
  key: string
}

// Lineage sits third: after "what changed" and "who disagrees", before "fix
// it". That is the order the questions actually arrive in — you find out a
// fact moved, you find out the sources argue about it, and then you want to
// know where it came from and what depends on it *before* you approve anything.
const PANELS: PanelDef[] = [
  {id: 'feed', label: 'Drift feed', icon: 'feed', key: '1'},
  {id: 'conflicts', label: 'Conflict room', icon: 'conflict', key: '2'},
  {id: 'lineage', label: 'Claim lineage', icon: 'lineage', key: '3'},
  {id: 'queue', label: 'Remediation queue', icon: 'queue', key: '4'},
  {id: 'audit', label: 'Audit trail', icon: 'audit', key: '5'},
]

export function App({
  sanityContent,
  sanityPending,
}: {
  /**
   * Live content from Sanity, when the console was pointed at a project.
   *
   * Absent means the committed fixtures are the content. Either way the drift
   * events come from the engine, so this prop changes where *claims, pages and
   * assertions* come from and nothing else.
   */
  sanityContent?: SanityContent
  sanityPending?: boolean
} = {}) {
  const [data, setData] = useState<DriftData | null>(null)
  const [me, setMe] = useState<Me>(OFFLINE_ME)
  const [mode, setMode] = useState<Mode>('offline')
  const [panel, setPanel] = useState<PanelId>('feed')
  const [selected, setSelected] = useState<DriftEvent | null>(null)
  const [lineageClaim, setLineageClaim] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Reload after a mutation so the Control Room never shows a state the engine
  // has already moved past.
  const [revision, setRevision] = useState(0)
  const refresh = useCallback(() => setRevision((n) => n + 1), [])

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const [identity, drift] = await Promise.all([api.whoami(), api.loadDrift()])
        if (cancelled) return
        setMe(identity.me)
        setMode(drift.mode)
        setData(drift.data)
        setError(null)
      } catch (err) {
        if (cancelled) return
        setError(err instanceof Error ? err.message : String(err))
      }
    }

    void load()
    return () => {
      cancelled = true
    }
  }, [revision])

  // Panel switching from the keyboard. An operator watching this all day should
  // not need the mouse.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const target = e.target as HTMLElement | null
      if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return

      const match = PANELS.find((p) => p.key === e.key)
      if (match) {
        e.preventDefault()
        setPanel(match.id)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  /**
   * Content from Sanity wins over the fixture copy; computed drift never does.
   *
   * Merging here rather than in the API layer keeps one rule visible in one
   * place: Sanity owns what the organisation says, the engine owns what
   * changed. A panel that reached for `data` directly could not have told the
   * difference, and would eventually render a live claim beside a fixture
   * assertion that no longer refers to it.
   */
  const content = useMemo<DriftData | null>(() => {
    if (!data) return null
    if (!sanityContent) return data
    return {...data, ...sanityContent}
  }, [data, sanityContent])

  const derived = useMemo(() => {
    if (!content) return null
    const data = content
    const indexes = buildIndexes(data)
    return {
      indexes,
      events: feedOrder(data.events),
      conflicts: openConflicts(data, indexes),
      queue: remediationQueue(data, indexes),
      objectives: objectives(data, indexes),
      build: currentBuild(data),
      builds: buildsNewestFirst(data),
    }
  }, [content])

  // Open on the most consequential event: the operator should not have to click
  // to discover that seven pages are wrong.
  useEffect(() => {
    if (derived && !selected && derived.events.length > 0) {
      setSelected(derived.events[0] ?? null)
    }
  }, [derived, selected])

  if (error) {
    return (
      <div style={{padding: 32, maxWidth: 620}}>
        <Banner tone="crit">
          <div>
            <strong>Could not load the Control Room.</strong>
            <div className="muted" style={{marginTop: 4}}>{error}</div>
          </div>
        </Banner>
      </div>
    )
  }

  if (!derived || !content) {
    return (
      <div style={{padding: 32}} className="muted">
        Loading the ledger…
      </div>
    )
  }

  const counts: Record<PanelId, number> = {
    feed: derived.events.filter((e) => e.blastRadius.length > 0).length,
    conflicts: derived.conflicts.length,
    lineage: 0,
    queue: derived.queue.length,
    audit: 0,
  }

  // An empty ledger is a state, not an error — and it is the first thing a new
  // user sees, so it gets a sentence rather than an empty control room. Every
  // number in this UI is relative to a build; with none, there is nothing
  // truthful to render.
  const build = derived.build
  if (!build) {
    return <EmptyLedger source={sanityContent ? 'sanity' : 'fixtures'} />
  }

  return (
    <div className="shell">
      <div className="brand" title="DRIFT — version control for organisational truth">
        DFT
      </div>

      <StatusBar
        me={me}
        mode={mode}
        buildNumber={build.buildNumber}
        builtAt={build.builtAt}
        outlineHash={build.outlineHash}
        summary={content.summary}
        contentSource={sanityContent ? 'sanity' : 'fixtures'}
        contentPending={sanityPending === true}
        onIdentityChanged={refresh}
      />

      <nav className="rail" aria-label="Control room panels">
        {PANELS.map((p) => (
          <button
            key={p.id}
            type="button"
            className="rail-btn"
            aria-current={panel === p.id}
            aria-label={p.label}
            data-label={`${p.label}  ·  ${p.key}`}
            onClick={() => setPanel(p.id)}
          >
            <Icon name={p.icon} />
            {counts[p.id] > 0 && (
              <span className={`rail-count ${p.id === 'queue' ? 'quiet' : ''}`}>
                {counts[p.id]}
              </span>
            )}
          </button>
        ))}
      </nav>

      <main className="main">
        <PanelHeader panel={panel} counts={counts} />

        <div className="panel-body">
          {mode !== 'live' && <ReadOnlyBanner mode={mode} />}

          {panel === 'feed' && (
            <DriftFeed
              events={derived.events}
              indexes={derived.indexes}
              objectives={derived.objectives}
              selected={selected}
              onSelect={setSelected}
            />
          )}

          {panel === 'conflicts' && (
            <ConflictRoom conflicts={derived.conflicts} indexes={derived.indexes} me={me} />
          )}

          {panel === 'lineage' && (
            <ClaimLineage
              data={content}
              indexes={derived.indexes}
              me={me}
              mode={mode}
              // Follow the operator: if they were reading about a drift event,
              // open on that fact rather than making them find it again.
              selectedClaimId={lineageClaim ?? selected?.claimId ?? null}
              onSelectClaim={setLineageClaim}
            />
          )}

          {panel === 'queue' && (
            <RemediationQueue
              items={derived.queue}
              indexes={derived.indexes}
              me={me}
              mode={mode}
              buildId={build.id}
              onChanged={refresh}
            />
          )}

          {panel === 'audit' && <AuditTrail me={me} mode={mode} />}
        </div>
      </main>
    </div>
  )
}

// ---------------------------------------------------------------------------

/**
 * Connected, but there is no ledger to show.
 *
 * Reached when the dataset carries no `buildSnapshot` documents — almost always
 * a fresh project that has not been seeded. Worth its own screen rather than a
 * generic spinner: the previous behaviour was a thrown reduce and a blank page,
 * which tells somebody nothing except that the software is broken.
 */
function EmptyLedger({source}: {source: 'sanity' | 'fixtures'}) {
  return (
    <div style={{padding: 32, maxWidth: 680}}>
      <Banner tone="warn">
        <div>
          <strong>No Knowledge Base builds in this dataset.</strong>
          <div className="muted" style={{marginTop: 6, lineHeight: 1.6}}>
            {source === 'sanity' ? (
              <>
                You are connected to Sanity and authenticated, but the project holds no{' '}
                <code>buildSnapshot</code> documents — so there is no state of belief to diff
                against, and every number in the Control Room is relative to a build.
                <div style={{marginTop: 10}}>Import the seed dataset:</div>
                <pre style={{marginTop: 6, whiteSpace: 'pre-wrap'}}>
                  <code>npx sanity dataset import sanity/seed/northwind.ndjson production --replace</code>
                </pre>
              </>
            ) : (
              <>
                The committed fixtures carry no builds, which should not happen — regenerate
                them with <code>pnpm --filter @drift/fixtures generate</code>.
              </>
            )}
          </div>
        </div>
      </Banner>
    </div>
  )
}

function PanelHeader({panel, counts}: {panel: PanelId; counts: Record<PanelId, number>}) {
  const copy: Record<PanelId, {title: string; sub: string}> = {
    feed: {
      title: 'Drift feed',
      sub: 'What this organisation stopped believing, and what still says otherwise.',
    },
    conflicts: {
      title: 'Conflict room',
      sub: `${counts.conflicts} unresolved disagreement${counts.conflicts === 1 ? '' : 's'} between sources. Settling one writes a standing instruction back into the Knowledge Base.`,
    },
    queue: {
      title: 'Remediation queue',
      sub: 'Every correction passes a deterministic gate before a human can publish it.',
    },
    lineage: {
      title: 'Claim lineage',
      sub: 'Where a statement came from, who verified it, and every published surface that depends on it.',
    },
    audit: {
      title: 'Audit trail',
      sub: 'Append-only and hash-chained. Every entry names an actor, a build and its evidence.',
    },
  }

  return (
    <header className="panel-head">
      <h1>{copy[panel].title}</h1>
      <span className="sub">{copy[panel].sub}</span>
    </header>
  )
}

/**
 * Why the Control Room is read-only, which is two different reasons.
 *
 * Telling somebody their engine is unreachable when it is running and they
 * simply have not signed in sends them to check a process that is fine. The
 * two states get two messages.
 */
function ReadOnlyBanner({mode}: {mode: Mode}) {
  if (mode === 'anonymous') {
    return (
      <Banner tone="info">
        <div>
          <strong>Read-only — you are not signed in.</strong>
          <div className="muted" style={{marginTop: 3}}>
            The engine is running and answering. It will not serve the drift ledger without a
            credential, because that ledger is a map of everything this organisation currently
            gets wrong in public. Pick a principal above to see the live data, the audit chain
            and the publication gate. Until then this is committed engine output.
          </div>
        </div>
      </Banner>
    )
  }

  return (
    <Banner tone="warn">
      <div>
        <strong>Read-only — the engine is not reachable.</strong>
        <div className="muted" style={{marginTop: 3}}>
          Showing committed engine output from{' '}
          <code>go run ./cmd/seed -format=fixtures</code>, which runs the real diff and
          blast-radius pipeline. Approving, rejecting and the audit chain all require the
          engine, so those are disabled rather than simulated. Start it with{' '}
          <code>go run ./cmd/engine -fixtures</code>.
        </div>
      </div>
    </Banner>
  )
}

function StatusBar({
  me,
  mode,
  buildNumber,
  builtAt,
  outlineHash,
  summary,
  contentSource,
  contentPending,
  onIdentityChanged,
}: {
  me: Me
  mode: Mode
  buildNumber: number
  builtAt: string
  outlineHash: string
  summary: DriftData['summary']
  contentSource: 'sanity' | 'fixtures'
  contentPending: boolean
  onIdentityChanged: () => void
}) {
  return (
    <div className="statusbar">
      <div className="statusbar-metrics">
      <div className="stat">
        <span className="stat-k">Current build</span>
        <span className="stat-v big">#{buildNumber}</span>
      </div>
      <div className="stat">
        <span className="stat-k">Built</span>
        <span className="stat-v">
          {new Date(builtAt).toLocaleString(undefined, {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </div>
      <div className="stat" title="Content address of the outline and every entry in this build">
        <span className="stat-k">Outline</span>
        <span className="stat-v">{outlineHash.replace('sha256:', '').slice(0, 10)}</span>
      </div>
      <div
        className="stat"
        title="Published places still saying the old thing — pages, and any other surface that depends on a changed claim"
      >
        <span className="stat-k">Places wrong</span>
        <span className={`stat-v big ${summary.affectedDependents > 0 ? 'crit' : 'ok'}`}>
          {summary.affectedDependents}
        </span>
      </div>
      <div className="stat">
        <span className="stat-k">Awaiting a human</span>
        <span className="stat-v big">{summary.needingReview}</span>
      </div>
      <div className="stat">
        <span className="stat-k">Sources disagreeing</span>
        <span className={`stat-v big ${summary.unresolvedConflicts > 0 ? 'crit' : 'ok'}`}>
          {summary.unresolvedConflicts}
        </span>
      </div>

      <div className="stat spacer" />
      </div>

      <div className="statusbar-identity">
      <div className="stat" style={{padding: '0 8px'}} title={`Tenant ${me.tenant}`}>
        <SignIn me={me} mode={mode} onChanged={onIdentityChanged} />
      </div>
      {/* Where the claims and pages on screen actually came from. Two
          independent connections — Sanity for content, the engine for computed
          drift — so one badge could not honestly describe both. */}
      <div
        className="stat"
        title={
          contentSource === 'sanity'
            ? 'Claims, pages and assertions are live from your Sanity project and re-render when a document changes.'
            : 'Claims, pages and assertions are committed engine output. Set VITE_SANITY_PROJECT_ID to read a real project.'
        }
      >
        <span className="stat-k">Content</span>
        <span className={`stat-v ${contentSource === 'sanity' ? 'ok' : ''}`}>
          {contentSource === 'sanity' ? (contentPending ? 'syncing…' : 'Sanity live') : 'fixtures'}
        </span>
      </div>

      {/* Reachability, not identity. Saying "offline" because nobody has
          signed in reports a healthy process as a dead one. */}
      <div className="stat">
        <span className="stat-k">Engine</span>
        <span className={`stat-v ${mode === 'offline' ? '' : 'ok'}`}>
          {mode === 'offline' ? 'unreachable' : 'connected'}
        </span>
      </div>

      {/* Every number to the left of this is a term with a precise meaning —
          build, outline hash, places wrong, sources disagreeing — and an
          operator who does not yet know them has nowhere to go from here. The
          documentation is a separate process on a separate port, so the console
          is the only place that can say where it is. */}
      <a
        className="stat stat-link"
        style={{borderRight: 0}}
        href={DOCS_URL}
        target="_blank"
        rel="noreferrer noopener"
        title="What these numbers mean, the content model, the gate, the API — opens the documentation site"
      >
        <span className="stat-k">Reference</span>
        <span className="stat-v">Docs ↗</span>
      </a>
      </div>
    </div>
  )
}
