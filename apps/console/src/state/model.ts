import type {
  Assertion,
  BuildSnapshot,
  Claim,
  Conflict,
  ContentPage,
  DriftEvent,
  DriftData,
  Source,
  Surface,
} from '@drift/fixtures'

/**
 * The Control Room's read model.
 *
 * Everything here is *derived* — indexes, graphs, timelines, severity — and
 * nothing is authored. The engine is the single source of truth; this file only
 * reshapes what it produced into the shapes the panels need.
 *
 * Keeping derivation here rather than in components matters for one specific
 * reason: several panels show the same numbers. If the Drift Feed counted
 * affected pages one way and the Blast Radius panel counted them another, the
 * product would be doing the exact thing it exists to prevent.
 */

// ---------------------------------------------------------------------------
// Identity
// ---------------------------------------------------------------------------

/**
 * Whether the Control Room is talking to the engine, and as whom.
 *
 * Three states, not two, because reachability and identity are different facts
 * and the console used to report them as one. An engine that is running but
 * has no credential presented to it was labelled `offline`, which told an
 * operator their engine was down when it was answering on the next port — the
 * kind of quietly wrong status this product exists to object to.
 *
 *   live       reachable, and a credential resolved to an actor
 *   anonymous  reachable, but nobody is signed in — read-only
 *   offline    not reachable at all; rendering committed fixtures
 *
 * Declared here rather than in the API layer because every panel branches on
 * it, and a panel importing a transport concern to decide what to render is
 * the wrong dependency direction.
 */
export type Mode = 'live' | 'anonymous' | 'offline'

export interface Me {
  id: string
  email: string
  roles: string[]
  tenant: string
  isAgent: boolean
  permissions: Record<string, boolean>
}

/** The operator when the engine is unreachable: can look, cannot touch. */
export const OFFLINE_ME: Me = {
  id: 'offline',
  email: 'offline',
  roles: ['viewer'],
  tenant: 'demo',
  isAgent: false,
  permissions: {'drift:read': true},
}

export function can(me: Me, permission: string): boolean {
  return me.permissions[permission] === true
}

// ---------------------------------------------------------------------------
// The publication gate
// ---------------------------------------------------------------------------

export interface GateCheck {
  name: string
  passed: boolean
  detail: string
  blocking: boolean
}

export interface GateDecision {
  allowed: boolean
  checks: GateCheck[]
  buildId: string
  blastRadius: string[] | null
}

/** Human-readable names. The engine's identifiers are stable; these are not. */
export const CHECK_LABELS: Record<string, string> = {
  human_approval: 'A person is approving this',
  build_current: 'Drafted against the current build',
  claim_active: 'The claim is still asserted',
  still_stale: 'The page still says the old thing',
  no_unresolved_conflict: 'No sources are in disagreement',
  no_contradiction: 'Agrees with every other current claim',
  blast_radius_stable: 'Nothing new started depending on this',
  scope_respected: 'Touches only the declared paragraph',
  correctable_surface: 'The dependent is something a patch can fix',
}

// ---------------------------------------------------------------------------
// Audit
// ---------------------------------------------------------------------------

export interface AuditEvent {
  id: string
  seq: number
  prevId: string
  type: string
  at: string
  actorId: string
  actorRole: string
  isAgent: boolean
  tenant: string
  subject: string
  buildId: string
  evidence?: Record<string, unknown>
  correlationId: string
}

/** Plain-English names for event types, for people who do not read our enums. */
export const EVENT_LABELS: Record<string, string> = {
  'build.captured': 'Knowledge Base rebuilt',
  'drift.detected': 'Belief changed',
  'incident.declared': 'Incident opened',
  'incident.closed': 'Incident closed',
  'correction.drafted': 'Correction drafted',
  'correction.approved': 'Correction approved',
  'correction.rejected': 'Correction rejected',
  'publication.blocked': 'Publication blocked',
  'publication.completed': 'Published',
  'conflict.resolved': 'Conflict settled',
  'instruction.written': 'Standing decision written',
  'instruction.archived': 'Standing decision expired',
  'simulation.run': 'Simulation run',
  'authorization.denied': 'Access refused',
}

// ---------------------------------------------------------------------------
// Severity — unresolved drift is a knowledge incident
// ---------------------------------------------------------------------------

export type Severity = 'critical' | 'major' | 'minor' | 'info'

/**
 * Severity of one drift event, derived deterministically.
 *
 * Deliberately not a score. An operator triaging at speed needs four buckets
 * they can act on, not a number they have to interpret — and a number invites
 * false precision about something that is really a judgement encoded once.
 *
 * The rules, in order:
 *   critical  a core claim is wrong on a published page
 *   major     any published page is wrong, or a core claim changed at all
 *   minor     something changed but nothing published depends on it
 *   info      no consequence and full confidence
 */
export function severityOf(event: DriftEvent): Severity {
  const published = event.blastRadius.length > 0
  if (event.tier === 'core' && published) return 'critical'
  if (published || event.tier === 'core') return 'major'
  if (event.confidence < 1) return 'minor'
  return 'info'
}

export const SEVERITY_ORDER: Record<Severity, number> = {
  critical: 0,
  major: 1,
  minor: 2,
  info: 3,
}

/** What the operator should understand from the severity, in one line. */
export const SEVERITY_MEANING: Record<Severity, string> = {
  critical: 'A load-bearing fact is wrong on live pages right now',
  major: 'Live pages are wrong, or a load-bearing fact moved',
  minor: 'Belief changed but nothing published depends on it',
  info: 'Recorded for the ledger; no action needed',
}

// ---------------------------------------------------------------------------
// Indexes
// ---------------------------------------------------------------------------

export interface Indexes {
  claimsById: Map<string, Claim>
  claimsByPath: Map<string, Claim>
  pagesById: Map<string, ContentPage>
  assertionsById: Map<string, Assertion>
  assertionsByClaim: Map<string, Assertion[]>
  sourcesById: Map<string, Source>
  buildsById: Map<string, BuildSnapshot>
  surfacesById: Map<string, Surface>
}

export function buildIndexes(data: DriftData): Indexes {
  const assertionsByClaim = new Map<string, Assertion[]>()
  for (const a of data.assertions) {
    const list = assertionsByClaim.get(a.claimId) ?? []
    list.push(a)
    assertionsByClaim.set(a.claimId, list)
  }

  return {
    claimsById: new Map(data.claims.map((c) => [c.id, c])),
    claimsByPath: new Map(data.claims.map((c) => [c.path, c])),
    pagesById: new Map(data.pages.map((p) => [p.id, p])),
    assertionsById: new Map(data.assertions.map((a) => [a.id, a])),
    assertionsByClaim,
    sourcesById: new Map(data.sources.map((s) => [s.id, s])),
    buildsById: new Map(data.builds.map((b) => [b.id, b])),
    surfacesById: new Map((data.surfaces ?? []).map((s) => [s.id, s])),
  }
}

// ---------------------------------------------------------------------------
// Surfaces
// ---------------------------------------------------------------------------

/**
 * Which dependent an assertion hangs off, page or otherwise.
 *
 * A single helper rather than `a.pageId ?? a.surfaceId` scattered through the
 * panels, so that adding a surface kind cannot leave one screen quietly
 * dropping dependents it does not recognise.
 */
export function dependentId(assertion: Assertion): string {
  return assertion.surfaceId ?? assertion.pageId ?? ''
}

/** Whether this dependency is editable page content — the only kind a drafted
 * correction can be published to. */
export function isPageAssertion(assertion: Assertion): boolean {
  return Boolean(assertion.pageId)
}

/**
 * Resolve the surface carrying an assertion.
 *
 * Falls back to synthesising one from the page when no surface document exists,
 * because a dependent must never disappear from a view for want of a lookup.
 * Under-reporting the blast radius is the exact failure this product exists to
 * prevent, and it would be a poor irony to introduce it in the rendering layer.
 */
export function surfaceFor(assertion: Assertion, ix: Indexes): Surface {
  const id = dependentId(assertion)
  const registered = ix.surfacesById.get(id)
  if (registered) return registered

  const page = assertion.pageId ? ix.pagesById.get(assertion.pageId) : undefined
  if (page) {
    return {id: page.id, kind: 'page', title: page.title, owner: page.owner, locator: `/${page.slug}`}
  }
  return {id, kind: 'page', title: id || 'unknown dependent', owner: 'unknown'}
}

/** Plain-English names for surface kinds, and what fixing one actually means. */
export const SURFACE_MEANING: Record<string, string> = {
  page: 'Published page content. A correction can be drafted, gated and published.',
  agent: 'An agent answering from the Knowledge Base. It stops repeating the old value when the next build lands — there is no paragraph to patch.',
  feed: 'Syndicated output. Corrected by republishing, not by editing text.',
  template: 'Transactional copy. Corrected by re-rendering against the current build.',
}

// ---------------------------------------------------------------------------
// Derived views
// ---------------------------------------------------------------------------

export interface AffectedPage {
  page: ContentPage
  assertion: Assertion
}

/**
 * The pages in a blast radius.
 *
 * Page-only on purpose: every caller of this renders something page-shaped — a
 * body excerpt, a field path, a correction to approve. Surface dependents have
 * none of those and are read through {@link affectedDependents} instead.
 *
 * The two are kept separate rather than merged behind an optional field because
 * a screen that half-renders a bot as if it were a page is worse than one that
 * says plainly there are two kinds of dependent and shows both.
 */
export function affectedPages(event: DriftEvent, ix: Indexes): AffectedPage[] {
  const out: AffectedPage[] = []
  for (const id of event.blastRadius) {
    const assertion = ix.assertionsById.get(id)
    if (!assertion?.pageId) continue
    const page = ix.pagesById.get(assertion.pageId)
    if (!page) continue
    out.push({page, assertion})
  }
  return out
}

export interface Dependent {
  assertion: Assertion
  surface: Surface
}

/**
 * Every published place affected by a drift event — pages and agents alike.
 *
 * This is the honest answer to "what still says the old thing?". `affectedPages`
 * answers the narrower question "what can I fix from here?", and the difference
 * between the two numbers is itself worth showing: it is the work that will not
 * be done by approving anything.
 */
export function affectedDependents(event: DriftEvent, ix: Indexes): Dependent[] {
  const out: Dependent[] = []
  for (const id of event.blastRadius) {
    const assertion = ix.assertionsById.get(id)
    if (!assertion) continue
    out.push({assertion, surface: surfaceFor(assertion, ix)})
  }
  return out
}

/**
 * Feed order: most consequential first.
 *
 * Severity, then blast radius, then path for stability. An operator opening the
 * Control Room should find the thing that matters at the top without sorting.
 */
export function feedOrder(events: DriftEvent[]): DriftEvent[] {
  return [...events].sort((a, b) => {
    const s = SEVERITY_ORDER[severityOf(a)] - SEVERITY_ORDER[severityOf(b)]
    if (s !== 0) return s
    const r = b.blastRadius.length - a.blastRadius.length
    if (r !== 0) return r
    return a.claimPath.localeCompare(b.claimPath)
  })
}

/**
 * The most recent build, or undefined when the ledger holds none.
 *
 * Total on purpose. This used to be `reduce` with no initial value, which is
 * correct for committed fixtures — they always carry two builds — and throws
 * `Reduce of empty array` against a live dataset that has not been seeded yet.
 * A thrown render unmounts the tree and shows a blank page, which is the worst
 * possible way to say "there is no content here".
 *
 * Returning undefined forces callers to say what an empty ledger looks like,
 * which is a sentence a new user needs to read.
 */
export function currentBuild(data: DriftData): BuildSnapshot | undefined {
  if (data.builds.length === 0) return undefined
  return data.builds.reduce((latest, b) => (b.buildNumber > latest.buildNumber ? b : latest))
}

export function buildsNewestFirst(data: DriftData): BuildSnapshot[] {
  return [...data.builds].sort((a, b) => b.buildNumber - a.buildNumber)
}

export interface OpenConflict {
  build: BuildSnapshot
  conflict: Conflict
  /** Undefined when a conflict names a path no current claim carries. */
  claim: Claim | undefined
}

export function openConflicts(data: DriftData, ix: Indexes): OpenConflict[] {
  return data.builds.flatMap((build) =>
    (build.conflicts ?? [])
      .filter((c) => !c.resolvedBy)
      .map((conflict) => ({build, conflict, claim: ix.claimsByPath.get(conflict.path)})),
  )
}

// ---------------------------------------------------------------------------
// Content reliability objectives
// ---------------------------------------------------------------------------

/**
 * A service-level view of content integrity.
 *
 * Borrowed from operations because the analogy actually holds: a page asserting
 * a retired fact is an error, the proportion of pages doing so is an error
 * rate, and a target for it is a budget somebody can be held to. "94% of
 * published claims verified against the current build" is a sentence an
 * executive can act on; "8 drift events" is not.
 */
export interface Objective {
  label: string
  /** 0..1 */
  value: number
  target: number
  /** What this number actually counts, for a tooltip. */
  basis: string
}

export function objectives(data: DriftData, ix: Indexes): Objective[] {
  const build = currentBuild(data)
  const total = data.assertions.length

  const stale = new Set<string>()
  for (const event of data.events) {
    for (const id of event.blastRadius) stale.add(id)
  }

  const verified = total - stale.size
  const conflicts = openConflicts(data, ix).length
  const coreClaims = data.claims.filter((c) => c.tier === 'core')
  const coreStale = data.events.filter((e) => e.tier === 'core' && e.blastRadius.length > 0).length

  return [
    {
      label: 'Published claims verified',
      value: total === 0 ? 1 : verified / total,
      target: 0.99,
      basis: `${verified} of ${total} published statements agree with ${
        build ? `build ${build.buildNumber}` : 'the current build'
      }`,
    },
    {
      label: 'Core claims uncontested',
      value: coreClaims.length === 0 ? 1 : 1 - coreStale / coreClaims.length,
      target: 1,
      basis: `${coreClaims.length - coreStale} of ${coreClaims.length} load-bearing facts are correct everywhere`,
    },
    {
      label: 'Sources in agreement',
      value: data.claims.length === 0 ? 1 : 1 - conflicts / data.claims.length,
      target: 1,
      basis:
        conflicts === 0
          ? 'No sources currently disagree'
          : `${conflicts} unresolved disagreement${conflicts === 1 ? '' : 's'} between sources`,
    },
  ]
}

// ---------------------------------------------------------------------------
// Remediation queue
// ---------------------------------------------------------------------------

/**
 * One unit of work: a stale assertion and the claim that superseded it.
 *
 * Derived from drift events rather than stored, so the queue cannot drift out
 * of sync with the ledger it is supposed to reflect.
 */
export interface QueueItem {
  id: string
  event: DriftEvent
  assertion: Assertion
  page: ContentPage
  /** Undefined when the claim was retired in this build. */
  claim: Claim | undefined
  severity: Severity
  /** What the correction would say, derived deterministically for the demo. */
  proposedText: string
}

export function remediationQueue(data: DriftData, ix: Indexes): QueueItem[] {
  const items: QueueItem[] = []

  for (const event of feedOrder(data.events)) {
    for (const {page, assertion} of affectedPages(event, ix)) {
      items.push({
        id: `${event.claimPath}:${assertion.id}`,
        event,
        assertion,
        page,
        claim: ix.claimsById.get(event.claimId),
        severity: severityOf(event),
        proposedText: proposeCorrection(assertion.renderedText, event),
      })
    }
  }
  return items
}

/**
 * A stand-in for the Agent Actions drafter.
 *
 * The real drafter is `internal/agent` in the engine, calling Sanity's Transform
 * action with `noWrite: true`. This substitutes a deterministic string
 * replacement so the Control Room is demonstrable before credentials exist —
 * and it is labelled as a substitute everywhere it surfaces, because a demo that
 * quietly fakes the AI step is the kind of thing this project exists to object to.
 */
export function proposeCorrection(original: string, event: DriftEvent): string {
  const before = firstQuantity(event.before)
  const after = firstQuantity(event.after)
  if (before && after) {
    return original.replace(new RegExp(`\\b${escapeRegExp(before)}\\b`, 'i'), after)
  }
  if (event.kind === 'retired') {
    return `${original} [this policy no longer exists — needs rewriting or removal]`
  }
  return original
}

function firstQuantity(text?: string): string | null {
  if (!text) return null
  const m = text.match(/(\d+(?:\.\d+)?)\s*(days?|months?|years?|hours?|percent|%|USD|EUR|GBP)/i)
  return m ? `${m[1]} ${m[2]}` : null
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// ---------------------------------------------------------------------------
// Claim lineage
// ---------------------------------------------------------------------------

/**
 * The provenance of one fact, in the six branches people actually ask about.
 *
 * ```
 * CLAIM  "Returns are accepted within 45 days of delivery."
 *   ├── Source      Returns & Refunds Policy v4  (authority 5)
 *   ├── Created     build 46 · 12 Sep
 *   ├── Verified    build 46 · 12 Sep · by whom
 *   ├── Published   7 pages + Support Bot
 *   └── Changed     build 47 · 19 Sep · 30 days → 45 days
 * ```
 *
 * Every branch is derived from the ledger, never stored. A provenance view with
 * its own table would be one more thing that can disagree with the feed beside
 * it, in a product whose entire argument is that nothing should.
 */
export interface Lineage {
  claim: Claim
  /** Cited sources, highest authority first — the order that settles a conflict. */
  sources: Source[]
  /** Undefined when a stamp names a build this ledger no longer holds. */
  created: BuildSnapshot | undefined
  verified: BuildSnapshot | undefined
  changed: BuildSnapshot | undefined
  /** Every published surface expressing this claim, pages and agents together. */
  published: Dependent[]
  /** The drift that moved it, when there is one. */
  drift: DriftEvent | undefined
}

export function lineageOf(claimId: string, data: DriftData, ix: Indexes): Lineage | null {
  const claim = ix.claimsById.get(claimId)
  if (!claim) return null

  const sources = claim.citations
    .map((id) => ix.sourcesById.get(id))
    .filter((s): s is Source => Boolean(s))
    .sort((a, b) => b.authority - a.authority)

  // Every assertion referencing the claim, not only the stale ones. Provenance
  // is "what depends on this", which does not stop being true because a
  // dependent happens to be correct today.
  const published = (ix.assertionsByClaim.get(claimId) ?? []).map((assertion) => ({
    assertion,
    surface: surfaceFor(assertion, ix),
  }))

  return {
    claim,
    sources,
    created: claim.firstSeenBuild ? ix.buildsById.get(claim.firstSeenBuild) : undefined,
    verified: claim.lastVerifiedBuild ? ix.buildsById.get(claim.lastVerifiedBuild) : undefined,
    changed: claim.lastChangedBuild ? ix.buildsById.get(claim.lastChangedBuild) : undefined,
    published,
    drift: data.events.find((e) => e.claimId === claimId),
  }
}

/**
 * Claims in the order somebody would want to inspect them: the ones that moved
 * first, then core facts, then the rest alphabetically.
 */
export function lineageOrder(data: DriftData): Claim[] {
  const moved = new Set(data.events.map((e) => e.claimId))
  return [...data.claims].sort((a, b) => {
    const m = Number(moved.has(b.id)) - Number(moved.has(a.id))
    if (m !== 0) return m
    const t = Number(b.tier === 'core') - Number(a.tier === 'core')
    if (t !== 0) return t
    return a.path.localeCompare(b.path)
  })
}

/**
 * Who verified a claim, read off the audit trail.
 *
 * The build stamp says *when* a fact was last confirmed; it cannot say who,
 * because a build is a machine event. A person enters the story when they
 * approve a correction, and that is an audit entry — which is why audit events
 * carry a `claimId`, and why this takes the events rather than the claim.
 *
 * Returns undefined rather than a placeholder when nobody has approved anything
 * for this claim. "Verified by —" is a true statement; inventing an approver is
 * the single worst thing a provenance view could do.
 */
export function verifiedBy(events: AuditEvent[]): AuditEvent | undefined {
  const approvals = events.filter(
    (e) => e.type === 'correction.approved' || e.type === 'publication.completed',
  )
  return approvals.length > 0 ? approvals[approvals.length - 1] : undefined
}
