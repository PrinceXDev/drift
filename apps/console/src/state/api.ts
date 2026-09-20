import {fixtures} from '@drift/fixtures'
import type {DriftData} from '@drift/fixtures'

import type {AuditEvent, GateDecision, Me, Mode} from './model'
import {OFFLINE_ME} from './model'

/**
 * The seam between the Control Room and the engine.
 *
 * # Three modes, honestly labelled
 *
 *   live       the Go engine, with real authorization and a real audit chain
 *   anonymous  the engine is there; nobody has signed in
 *   offline    the engine is not reachable; committed engine output, read-only
 *
 * `anonymous` exists because the first two used to be one. A running engine
 * with no credential presented to it was reported as `offline`, which told an
 * operator their engine was down while it was answering perfectly well — and
 * being confidently wrong about the state of the system is the specific
 * failure this whole product is an argument against.
 *
 * Offline is not a mock. `fixtures.json` is emitted by
 * `go run ./cmd/seed -format=fixtures`, which runs the actual diff and
 * blast-radius pipeline — so the UI is always developed against output the
 * engine really produces.
 *
 * What offline mode cannot do is authorize, audit, or publish, because those
 * require the engine. So it refuses those actions rather than simulating them.
 * A control room that pretends to have approved something is worse than one
 * that says it cannot.
 *
 * # Credentials
 *
 * The bearer token is held in memory for the session and sent on every request.
 * It is never written to localStorage: this token can approve publications, and
 * a credential in web storage is one XSS away from being someone else's.
 */

const BASE = '/api'

export type {Mode}

export class ApiError extends Error {
  constructor(
    readonly status: number,
    message: string,
    readonly correlationId?: string,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

let token: string | null = null

export function setToken(value: string | null) {
  token = value
}

export function hasToken(): boolean {
  return token !== null && token !== ''
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const headers = new Headers(init?.headers)
  headers.set('Content-Type', 'application/json')
  if (token) headers.set('Authorization', `Bearer ${token}`)

  const response = await fetch(BASE + path, {...init, headers})
  const correlationId = response.headers.get('X-Correlation-ID') ?? undefined

  if (!response.ok) {
    let message = `${response.status} ${response.statusText}`
    try {
      const body = (await response.json()) as {error?: string}
      if (body.error) message = body.error
    } catch {
      // A non-JSON error body is itself the message we have.
    }
    throw new ApiError(response.status, message, correlationId)
  }

  // 204 and friends.
  if (response.status === 204) return undefined as T
  return (await response.json()) as T
}

// ---------------------------------------------------------------------------
// Identity
// ---------------------------------------------------------------------------

/**
 * Is the engine there at all?
 *
 * `/healthz` is the one open route, and it discloses nothing but liveness —
 * which is exactly what makes it the right thing to ask before deciding
 * whether the absence of data means "down" or "not signed in".
 */
export async function engineReachable(): Promise<boolean> {
  try {
    const response = await fetch(`${BASE}/healthz`, {
      // A dead port should not leave the status bar thinking for thirty
      // seconds. If it cannot answer promptly it is not usable anyway.
      signal: AbortSignal.timeout(2500),
    })
    return response.ok
  } catch {
    return false
  }
}

/** Resolves who the current token belongs to, and how we are connected. */
export async function whoami(): Promise<{me: Me; mode: Mode}> {
  if (!hasToken()) {
    return {me: OFFLINE_ME, mode: (await engineReachable()) ? 'anonymous' : 'offline'}
  }
  try {
    return {me: await request<Me>('/v1/me'), mode: 'live'}
  } catch (err) {
    if (err instanceof ApiError && err.status === 401) throw err
    return {me: OFFLINE_ME, mode: (await engineReachable()) ? 'anonymous' : 'offline'}
  }
}

// ---------------------------------------------------------------------------
// Drift
// ---------------------------------------------------------------------------

export interface DriftResponse {
  events: DriftData['events']
  summary: DriftData['summary']
  from: string
  to: string
}

/**
 * Loads the ledger.
 *
 * Structural data — pages, sources, the assertion graph — comes from the
 * committed fixtures in both modes, because the engine does not yet have a
 * Sanity read client for it. The *drift events* come from the engine when it is
 * reachable, so what the Control Room shows as "what changed" is always the
 * engine's answer rather than the UI's.
 */
export async function loadDrift(): Promise<{data: DriftData; mode: Mode}> {
  const base = fixtures as unknown as DriftData

  // The drift ledger is a map of everything the organisation currently gets
  // wrong in public, so the engine will not serve it without a credential.
  // Anonymous therefore still renders fixtures — but says why, rather than
  // blaming a process that is running.
  if (!hasToken()) {
    return {data: base, mode: (await engineReachable()) ? 'anonymous' : 'offline'}
  }

  try {
    const live = await request<DriftResponse>('/v1/drift')
    return {data: {...base, events: live.events, summary: live.summary}, mode: 'live'}
  } catch (err) {
    if (err instanceof ApiError && (err.status === 401 || err.status === 403)) throw err
    return {data: base, mode: 'offline'}
  }
}

// ---------------------------------------------------------------------------
// Corrections
// ---------------------------------------------------------------------------

export interface Draft {
  assertionId: string
  proposedText: string
  draftedAgainstBuild: string
  draftedBlastRadius: string[]
  touchedFieldPath: string
  draftedBy: string
}

export interface Outcome {
  applied: boolean
  decision: GateDecision
  eventId: string
  duplicate: boolean
}

/** Runs the gate without deciding anything. */
export function previewCorrection(draft: Draft): Promise<GateDecision> {
  return request<GateDecision>('/v1/corrections/preview', {
    method: 'POST',
    body: JSON.stringify(draft),
  })
}

/**
 * Approves and publishes, subject to the gate.
 *
 * A 422 is a gate refusal, not a transport failure — the request was valid and
 * the answer was "not yet". It is returned as a normal outcome so the UI can
 * show the failed checks rather than an error toast.
 */
export async function approveCorrection(draft: Draft): Promise<Outcome> {
  const headers = new Headers({'Content-Type': 'application/json'})
  if (token) headers.set('Authorization', `Bearer ${token}`)

  const response = await fetch(`${BASE}/v1/corrections/approve`, {
    method: 'POST',
    headers,
    body: JSON.stringify(draft),
  })

  if (response.status === 200 || response.status === 422) {
    return (await response.json()) as Outcome
  }

  const body = (await response.json().catch(() => ({}))) as {error?: string}
  throw new ApiError(
    response.status,
    body.error ?? `${response.status} ${response.statusText}`,
    response.headers.get('X-Correlation-ID') ?? undefined,
  )
}

export function rejectCorrection(draft: Draft, reason: string): Promise<Outcome> {
  return request<Outcome>('/v1/corrections/reject', {
    method: 'POST',
    body: JSON.stringify({...draft, reason}),
  })
}

// ---------------------------------------------------------------------------
// Audit
// ---------------------------------------------------------------------------

export interface AuditResponse {
  events: AuditEvent[]
  count: number
}

/**
 * Reads the trail.
 *
 * `subject` is one object's timeline — this assertion, this incident. `claimId`
 * is one *fact's* timeline, across every assertion that ever expressed it,
 * which is what the Claim Lineage panel needs and what used to require a join
 * the log could not do.
 */
export function loadAudit(params?: {
  subject?: string
  claimId?: string
  upToSeq?: number
  limit?: number
}): Promise<AuditResponse> {
  const query = new URLSearchParams()
  if (params?.subject) query.set('subject', params.subject)
  if (params?.claimId) query.set('claimId', params.claimId)
  if (params?.upToSeq) query.set('upToSeq', String(params.upToSeq))
  if (params?.limit) query.set('limit', String(params.limit))
  const suffix = query.toString() ? `?${query}` : ''
  return request<AuditResponse>(`/v1/audit${suffix}`)
}

// ---------------------------------------------------------------------------
// Lineage
// ---------------------------------------------------------------------------

/**
 * Loads the claim timeline: every approval, block, publication and rejection
 * that touched this fact, on any surface.
 *
 * Returns an empty list rather than throwing when the caller lacks
 * `audit:read`. The other five branches of a lineage are readable by a viewer,
 * and failing the whole panel because one branch is privileged would tell
 * somebody nothing when it could tell them almost everything.
 */
export async function loadClaimTimeline(claimId: string): Promise<AuditEvent[]> {
  if (!hasToken()) return []
  try {
    return (await loadAudit({claimId, limit: 200})).events
  } catch (err) {
    if (err instanceof ApiError && (err.status === 403 || err.status === 503)) return []
    throw err
  }
}

export interface IntegrityReport {
  intact: boolean
  detail: string
}

/**
 * Walks the hash chain server-side and reports whether history is intact.
 *
 * Exposed as a button rather than a badge that is always green, because the
 * claim is only worth anything if the person who doubts it can run the check
 * themselves, on demand, and watch it happen.
 */
export function verifyAudit(): Promise<IntegrityReport> {
  return request<IntegrityReport>('/v1/audit/verify')
}

// ---------------------------------------------------------------------------
// Live updates
// ---------------------------------------------------------------------------

/**
 * Subscribes to the drift stream.
 *
 * EventSource cannot send an Authorization header, so the token travels as a
 * query parameter here. That is a real weakness — query strings reach access
 * logs — and it is the reason a production deployment would front this with a
 * short-lived stream ticket rather than the session token. Noted rather than
 * hidden; see docs/BUILD-LOG.md.
 */
export function subscribeToDrift(onEvent: (payload: DriftResponse) => void): () => void {
  if (!hasToken()) return () => {}

  const source = new EventSource(`${BASE}/v1/drift/stream?token=${encodeURIComponent(token ?? '')}`)
  source.addEventListener('drift', (event) => {
    try {
      onEvent(JSON.parse((event as MessageEvent).data) as DriftResponse)
    } catch {
      // A malformed frame should not take the Control Room down.
    }
  })
  return () => source.close()
}
