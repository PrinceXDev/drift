/**
 * The DRIFT engine's gate, over HTTP.
 *
 * # Why the workflow asks the gate rather than the other way round
 *
 * The workflow owns *where the work is*. The gate owns *whether the work may
 * land*. Those are different questions and they are answered by different
 * processes — one a deployed Sanity workflow definition, the other nine
 * deterministic checks in Go — so the wiring has to pick which one leads.
 *
 * The gate leads. A human in the `review` stage does not click `approve` and
 * have the system find out afterwards whether it was allowed; the click asks
 * `POST /v1/corrections/approve`, the gate re-derives everything against
 * current belief, and the *answer* picks the edge:
 *
 *   allowed, and the correction is live   -> fire `approve`   -> published
 *   blocked                               -> fire `send-back` -> drafting
 *
 * That ordering is what makes the workflow honest. `published` means
 * "corrections are live", so the instance may only enter it once something is
 * actually live. An approval that the Content Lake never applied leaves the
 * instance where it is, and the transcript says so.
 *
 * # Statuses
 *
 * The engine already draws the distinction this needs (`internal/api/server.go`):
 * 200 is a publication, 422 is a gate refusal — "the caller was allowed to ask,
 * the content was not ready" — and anything else is a failure to reach an
 * answer at all. A runner that collapsed 422 and 502 into "didn't work" would
 * lose the only difference that matters here.
 */

/** One gate condition, as the engine reports it. */
export interface GateCheck {
  name: string
  passed: boolean
  detail: string
  blocking: boolean
}

/** The gate's verdict. Mirrors `gate.Decision`. */
export interface GateDecision {
  allowed: boolean
  checks: GateCheck[]
  buildId: string
  blastRadius: string[]
}

/** What happened to an approval attempt. Mirrors `remediation.Outcome`. */
export interface ApprovalOutcome {
  applied: boolean
  decision: GateDecision
  eventId: string
  duplicate?: boolean
}

/** A proposed correction. Mirrors `remediation.Draft`. */
export interface Draft {
  assertionId: string
  proposedText: string
  draftedAgainstBuild: string
  draftedBlastRadius: string[]
  touchedFieldPath: string
  draftedBy: string
}

/**
 * The three answers the runner can act on.
 *
 * `unavailable` is separate from `blocked` on purpose. A gate refusal is a
 * decision about the content and the workflow should route on it. A transport
 * failure, a missing publisher, an unreachable engine — those are the absence
 * of a decision, and routing on them would move the instance for a reason
 * nobody decided.
 */
export type GateAnswer =
  | {kind: 'published'; outcome: ApprovalOutcome}
  | {kind: 'blocked'; outcome: ApprovalOutcome}
  | {kind: 'unavailable'; reason: string}

export interface GateClientOptions {
  /** Where the Go engine listens. `DRIFT_ENGINE_URL` in `.env.example`. */
  baseUrl: string
  /** A DRIFT actor token, not a Sanity credential. Must carry `correction:publish`. */
  token: string
}

export class GateClient {
  private readonly baseUrl: string
  private readonly token: string

  constructor(options: GateClientOptions) {
    this.baseUrl = options.baseUrl.replace(/\/$/, '')
    this.token = options.token
  }

  /** Is the engine up? Checked before a run, so a failure names the cause. */
  async reachable(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/healthz`)
      return response.ok
    } catch {
      return false
    }
  }

  /**
   * Evaluate the gate without deciding anything.
   *
   * Used for the transcript rather than for routing: showing the operator every
   * check before the approval is the same "preview the blast radius before
   * publishing" the Control Room offers, and it makes the refusal legible when
   * one comes.
   */
  async preview(draft: Draft): Promise<GateDecision> {
    const response = await this.post('/v1/corrections/preview', draft)
    if (!response.ok) {
      throw new Error(`gate preview failed (HTTP ${response.status}): ${await response.text()}`)
    }
    return (await response.json()) as GateDecision
  }

  /** Ask the gate to publish. The answer picks the workflow edge. */
  async approve(draft: Draft): Promise<GateAnswer> {
    let response: Response
    try {
      response = await this.post('/v1/corrections/approve', draft)
    } catch (error) {
      return {kind: 'unavailable', reason: `engine unreachable: ${describe(error)}`}
    }

    if (response.status === 200) {
      return {kind: 'published', outcome: (await response.json()) as ApprovalOutcome}
    }
    if (response.status === 422) {
      return {kind: 'blocked', outcome: (await response.json()) as ApprovalOutcome}
    }
    return {
      kind: 'unavailable',
      reason: `the gate returned no decision (HTTP ${response.status}): ${await response.text()}`,
    }
  }

  private post(path: string, body: unknown): Promise<Response> {
    return fetch(`${this.baseUrl}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify(body),
    })
  }
}

function describe(error: unknown): string {
  return error instanceof Error ? error.message : String(error)
}
