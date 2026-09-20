/**
 * Move one real drift event through `drift-remediation`, with two principals
 * and the DRIFT gate deciding the last edge.
 *
 * # What this is for
 *
 * Until now `drift-remediation.ts` typechecked and nothing instantiated it. A
 * definition that is never run is a document, and the claim it makes —
 * *the drafting agent cannot reach `published`* — was a comment rather than a
 * demonstrated fact. This script is the demonstration, and it is deliberately
 * hostile to its own thesis: it has the agent *try* to approve, twice, and
 * reports what the engine does about it.
 *
 * # The run
 *
 *   1. deploy the definition                              (steward)
 *   2. start an instance on a real drift event            (steward)
 *   3. `open`                            detected  -> triage
 *   4. `confirm`                         triage    -> drafting   (steward)
 *   5. the agent attempts `approve`                       REFUSED, and why
 *   6. `drafted`                         drafting  -> review     (agent)
 *   7. the agent attempts `approve` again                 REFUSED, and why
 *   8. the steward asks the DRIFT gate, and the answer picks the edge:
 *        published   -> `approve`        review    -> published
 *        blocked     -> `send-back`      review    -> drafting
 *
 * Step 8 is the wiring. The human does not decide the transition; the gate
 * does, and the human's click is the request that asks it. See
 * `engine-gate.ts` for why that ordering is the honest one.
 *
 * # What the run needs
 *
 * The Go engine, on `DRIFT_ENGINE_URL`. Nothing else: the workflow side runs
 * against an in-memory Sanity (`memory-client.ts`), so there is no project id
 * and no token to find.
 *
 *     go run ./cmd/engine -fixtures          # in services/drift-engine
 *     pnpm --filter @drift/workflow-runner demo
 *
 * Against committed fixtures and no Content Lake credentials the run ends at
 * step 8 without reaching `published`, for a reason it prints in full. That is
 * the correct outcome, not a broken one: `published` means "corrections are
 * live", and nothing can be live without somewhere to write it.
 */
import {
  createEngine,
  gdrFromResource,
  type Engine,
  type WorkflowClient,
  type WorkflowResource,
} from '@sanity/workflow-engine'

import {GateClient, type Draft, type GateDecision} from './engine-gate.ts'
import {MemoryClient, MemoryStore} from './memory-client.ts'
import {
  AGENT_TOKEN,
  HUMAN_TOKEN,
  PRINCIPALS,
  ROLE_CATALOG,
  STEWARD,
  TRANSFORM_AGENT,
} from './principals.ts'
import {driftRemediation} from '../../../sanity/workflows/drift-remediation.ts'

/**
 * Must match `sanity.workflow.ts`'s `dev` deployment.
 *
 * Stated as a literal rather than imported, because the engine's deploy gate
 * reads it as a *reviewed* number: a dependency upgrade that changed it
 * automatically would defeat the gate.
 */
const EXPECTED_MIN_READER_MODEL = 10

/** The engine's own partition. Reads and writes never cross it. */
const TAG = 'dev'

const PROJECT_ID = 'memory'
const DATASET = 'development'

/** Where the engine's own documents live. */
const WORKFLOW_RESOURCE: WorkflowResource = {type: 'dataset', id: `${PROJECT_ID}.${DATASET}`}

/** The claim whose drift this run follows: the 30 -> 45 day return window. */
const CLAIM_ID = 'claim.returns-window'

/** The assertion the correction lands on: `page.returns`, block `b01`. */
const ASSERTION_ID = 'assert.returns-1'

/**
 * The corrected sentence, used only when the drafter cannot be reached.
 *
 * The script asks `POST /v1/corrections/draft` first and reports which of the
 * two it got, because a transcript showing a model-authored correction when no
 * model ran would be the exact category of lie this product exists to prevent.
 *
 * The first version of this got that backwards and is worth recording. It read
 * the response's `proposedText`, which does not exist — `agent.Draft` calls the
 * field `after` — so a successful Agent Actions call fell through to the
 * fallback, under a line reading "Agent Actions are not configured". They were
 * configured. The model had drafted. The transcript said otherwise, confidently,
 * because the failure path had been written to state a cause rather than report
 * one. The fallback now says exactly what went wrong instead of guessing why.
 */
const FALLBACK_TEXT = 'You have 45 days from delivery to start a return.'

/** The field the fallback correction touches. The drafter reports its own. */
const FALLBACK_FIELD_PATH = 'body[1]'

// ---------------------------------------------------------------------------

interface DriftEvent {
  claimId: string
  claimPath: string
  kind: string
  before?: string
  after?: string
  confidence: number
  tier: string
  blastRadius: string[]
  fromBuild: string
  toBuild: string
  workflowState: string
}

interface DriftResponse {
  events: DriftEvent[]
  to: string
}

async function main(): Promise<number> {
  const baseUrl = process.env['DRIFT_ENGINE_URL'] ?? 'http://127.0.0.1:8080'
  const token = process.env['DRIFT_ENGINE_TOKEN'] ?? 'demo-steward'
  const gate = new GateClient({baseUrl, token})

  heading('DRIFT · drift-remediation, instantiated')

  if (!(await gate.reachable())) {
    fail(
      `the DRIFT engine is not answering on ${baseUrl}.\n` +
        `  Start it first:  cd services/drift-engine && go run ./cmd/engine -fixtures\n` +
        `  Or point this run somewhere else with DRIFT_ENGINE_URL.`,
    )
    return 1
  }
  line(`engine        ${baseUrl}`)

  // The subject is a real drift event read from the engine, not a fixture
  // invented here. If the engine stops reporting it, this run stops too.
  const event = await loadDriftEvent(baseUrl, token)
  if (event === undefined) {
    fail(`the engine reports no drift for ${CLAIM_ID}; there is nothing to remediate.`)
    return 1
  }
  line(`drift         ${event.claimPath}  ${event.fromBuild} -> ${event.toBuild}  (${event.kind})`)
  line(`              ${event.before ?? '—'}`)
  line(`              ${event.after ?? '—'}`)
  line(`blast radius  ${event.blastRadius.length} dependent(s)`)

  // -------------------------------------------------------------------------
  // Two principals, two clients, two engines.
  //
  // One engine per actor, because the engine resolves identity from its
  // client's token once and caches it. Sharing one engine and swapping the
  // token would produce a run where both "actors" were the same principal —
  // and it would still pass a careless assertion.
  // -------------------------------------------------------------------------
  const store = new MemoryStore({
    projectId: PROJECT_ID,
    dataset: DATASET,
    principals: PRINCIPALS,
    roleCatalog: ROLE_CATALOG,
  })
  const humanEngine = engineFor(new MemoryClient(store, HUMAN_TOKEN))
  const agentEngine = engineFor(new MemoryClient(store, AGENT_TOKEN))

  line(`human         ${STEWARD.label}  id=${STEWARD.id}  roles=[${STEWARD.roles.join(', ')}]`)
  line(`agent         ${TRANSFORM_AGENT.label}  id=${TRANSFORM_AGENT.id}  roles=[${TRANSFORM_AGENT.roles.join(', ')}]`)

  // The document the instance is about. Created in the memory store so the
  // `subject` field entry has something to point at, with the engine's own
  // numbers copied onto it.
  const subjectId = `driftEvent-${event.claimId}-${event.toBuild}`.replace(/\./g, '-')
  await new MemoryClient(store, HUMAN_TOKEN).create({
    _id: subjectId,
    _type: 'driftEvent',
    claimId: event.claimId,
    claimPath: event.claimPath,
    kind: event.kind,
    confidence: event.confidence,
    tier: event.tier,
    fromBuild: event.fromBuild,
    toBuild: event.toBuild,
    blastRadius: event.blastRadius,
  })

  // -------------------------------------------------------------------------
  heading('1 · deploy')
  const deployed = await humanEngine.deployDefinitions({
    expectedMinReaderModel: EXPECTED_MIN_READER_MODEL,
    definitions: [driftRemediation],
  })
  for (const result of deployed.results) {
    line(`${result.name}  version ${result.version}  ${result.status}`)
    // Surfaced rather than swallowed. The deploy gate checks every role the
    // definition names against the project's catalog, and says so when a role
    // exists but nobody holds it — which is exactly the failure mode of a
    // review stage routed to a role that quietly emptied.
    for (const warning of result.warnings ?? []) line(`              warning: ${warning}`)
  }

  // -------------------------------------------------------------------------
  heading('2 · start')
  const started = await humanEngine.startInstance({
    definition: 'drift-remediation',
    initialFields: [
      {
        type: 'subject',
        name: 'subject',
        // A bare document id is refused: the engine addresses documents by
        // global reference so an instance can name a subject in a resource
        // other than its own.
        value: {id: gdrFromResource(WORKFLOW_RESOURCE, subjectId), type: 'driftEvent'},
      },
    ],
  })
  const instanceId = started.instance._id
  line(`instance      ${instanceId}`)
  line(`stage         ${started.instance.currentStage}`)

  // -------------------------------------------------------------------------
  heading('3 · detected -> triage')
  await fire(humanEngine, instanceId, 'acknowledge', 'open', STEWARD.label)

  // -------------------------------------------------------------------------
  heading('4 · triage -> drafting')
  await fire(humanEngine, instanceId, 'adjudicate', 'confirm', STEWARD.label)

  // -------------------------------------------------------------------------
  heading('5 · the agent tries to approve, from `drafting`')
  const earlyAttempt = await attemptApprove(agentEngine, instanceId)
  line(earlyAttempt.summary)
  if (earlyAttempt.allowed) {
    // Stop here rather than carrying on. Once the agent is through, every later
    // step reports the state of a run whose premise has already failed, and the
    // first confusing error would be mistaken for the actual problem.
    fail('the agent was allowed to approve from `drafting`')
    return 1
  }

  // -------------------------------------------------------------------------
  heading('6 · drafting -> review')
  const draftText = await draftCorrection(baseUrl, token, event.toBuild)
  line(`drafted by    ${draftText.source}`)
  line(`proposal      ${draftText.text}`)
  line(`field         ${draftText.fieldPath}  against ${draftText.buildId}`)
  await fire(agentEngine, instanceId, 'draft', 'drafted', TRANSFORM_AGENT.label)

  // -------------------------------------------------------------------------
  heading('7 · the agent tries to approve, from `review`')
  const reviewAttempt = await attemptApprove(agentEngine, instanceId)
  line(reviewAttempt.summary)
  if (reviewAttempt.allowed) {
    fail('the agent was allowed to approve from `review` — the edge into `published` is open')
    return 1
  }

  // -------------------------------------------------------------------------
  heading('8 · the gate decides the edge')
  const draft: Draft = {
    assertionId: ASSERTION_ID,
    proposedText: draftText.text,
    draftedAgainstBuild: draftText.buildId,
    draftedBlastRadius: event.blastRadius,
    touchedFieldPath: draftText.fieldPath,
    draftedBy: TRANSFORM_AGENT.id,
  }

  const preview = await gate.preview(draft)
  printChecks(preview)

  const answer = await gate.approve(draft)
  let finalStage: string
  let published = false

  if (answer.kind === 'published') {
    line(`gate          allowed, and the correction is live (audit ${answer.outcome.eventId})`)
    const result = await humanEngine.fireAction({
      instanceId,
      activity: 'approve',
      action: 'approve',
    })
    finalStage = result.instance.currentStage
    published = true
  } else if (answer.kind === 'blocked') {
    line(`gate          refused (audit ${answer.outcome.eventId})`)
    line(`              the click becomes a redraft, not a publication`)
    const result = await humanEngine.fireAction({
      instanceId,
      activity: 'approve',
      action: 'send-back',
    })
    finalStage = result.instance.currentStage
  } else {
    // No decision was reached, so nothing moves. Leaving the instance where it
    // stands is the whole point: a workflow that advanced on a transport
    // failure would be asserting an outcome nobody decided.
    line(`gate          no decision: ${answer.reason}`)
    line(`              the instance stays where it is`)
    finalStage = (await humanEngine.getInstance({instanceId})).currentStage
  }

  // -------------------------------------------------------------------------
  heading('result')
  line(`final stage   ${finalStage}`)

  const failures: string[] = []
  if (finalStage === 'published' && !published) {
    failures.push('the instance reached `published` without a gate-allowed publication')
  }
  if (answer.kind === 'blocked' && finalStage !== 'drafting') {
    failures.push(`the gate refused but the instance went to \`${finalStage}\``)
  }
  if (answer.kind === 'published' && finalStage !== 'published') {
    failures.push(`the gate allowed but the instance stopped at \`${finalStage}\``)
  }

  if (failures.length > 0) {
    for (const failure of failures) fail(failure)
    return 1
  }

  line('the agent never reached `published`, and the stage the instance landed in')
  line('is the one the gate chose.')
  if (answer.kind !== 'published') {
    line('')
    line('`published` is reachable only when the approval actually publishes —')
    line('that needs a Content Lake the engine can write to.')
  }
  return 0
}

// ---------------------------------------------------------------------------

function engineFor(client: MemoryClient): Engine {
  return createEngine({
    client: client as unknown as WorkflowClient,
    tag: TAG,
    workflowResource: WORKFLOW_RESOURCE,
  })
}

/** Fire an action and report where the instance ended up. */
async function fire(
  engine: Engine,
  instanceId: string,
  activity: string,
  action: string,
  who: string,
): Promise<void> {
  const before = (await engine.getInstance({instanceId})).currentStage
  const result = await engine.fireAction({instanceId, activity, action})
  line(`${who} fired \`${action}\``)
  line(`stage         ${before} -> ${result.instance.currentStage}  (${result.cascaded} cascaded)`)
}

/**
 * Have the agent try to approve, and report what the engine said.
 *
 * Both halves are checked, because they fail differently and a run that only
 * checked one could pass while the other was broken:
 *
 *   - `availableActions` is what a UI renders. A role-gated action the actor
 *     cannot fire is withheld under filter-existence semantics, so a console
 *     built on this never draws the button.
 *   - `fireAction` is what an actor with its own HTTP client would call
 *     directly, having never seen a button. That is the path that matters for
 *     an unattended agent, and it must throw.
 */
async function attemptApprove(
  engine: Engine,
  instanceId: string,
): Promise<{allowed: boolean; summary: string}> {
  const {actions} = await engine.availableActions({instanceId})
  const offered = actions.find((candidate) => candidate.action === 'approve')

  let threw: string | undefined
  try {
    await engine.fireAction({instanceId, activity: 'approve', action: 'approve'})
  } catch (error) {
    threw = error instanceof Error ? error.message : String(error)
  }

  const rendered = offered === undefined ? 'withheld entirely' : `offered, allowed=${offered.allowed}`
  const reason = offered?.disabledReason
  const detail = reason === undefined ? '' : `  reason=${JSON.stringify(reason)}`

  if (threw === undefined) {
    return {
      allowed: true,
      summary: `fireAction SUCCEEDED for the agent — the edge into \`published\` is open (${rendered})`,
    }
  }

  return {
    allowed: offered?.allowed === true,
    summary:
      `availableActions: ${rendered}${detail}\n` +
      `              fireAction refused: ${firstLine(threw)}`,
  }
}

async function loadDriftEvent(baseUrl: string, token: string): Promise<DriftEvent | undefined> {
  const response = await fetch(`${baseUrl}/v1/drift`, {
    headers: {Authorization: `Bearer ${token}`},
  })
  if (!response.ok) {
    throw new Error(`reading drift failed (HTTP ${response.status}): ${await response.text()}`)
  }
  const body = (await response.json()) as DriftResponse
  return body.events.find((candidate) => candidate.claimId === CLAIM_ID)
}

/**
 * Ask the engine's Agent Actions drafter for the correction.
 *
 * Returns the drafter's own `fieldPath` and `buildId` rather than the constants
 * above: those are what the model actually wrote against, and the gate's
 * `scope_respected` and `build_current` checks compare against exactly them. A
 * runner that asserted its own guesses instead would pass its own checks and
 * tell nobody when the two had diverged.
 */
async function draftCorrection(
  baseUrl: string,
  token: string,
  fallbackBuild: string,
): Promise<{text: string; fieldPath: string; buildId: string; source: string}> {
  const fallback = (reason: string) => ({
    text: FALLBACK_TEXT,
    fieldPath: FALLBACK_FIELD_PATH,
    buildId: fallbackBuild,
    source: `this script, because ${reason}`,
  })

  let response: Response
  try {
    response = await fetch(`${baseUrl}/v1/corrections/draft`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json', Authorization: `Bearer ${token}`},
      body: JSON.stringify({assertionId: ASSERTION_ID}),
    })
  } catch (error) {
    return fallback(`the drafter could not be reached: ${describe(error)}`)
  }

  // 503 is the engine saying Agent Actions are genuinely not configured. Every
  // other status is a different problem and must not be reported as that one.
  if (response.status === 503) {
    return fallback('Agent Actions are not configured, so no model ran')
  }
  if (!response.ok) {
    return fallback(
      `the drafter answered HTTP ${response.status}: ${excerpt(await response.text())}`,
    )
  }

  const body = (await response.json()) as {
    after?: unknown
    fieldPath?: unknown
    buildId?: unknown
  }
  if (typeof body.after !== 'string' || body.after.length === 0) {
    return fallback(`the drafter returned no \`after\` text: ${excerpt(JSON.stringify(body))}`)
  }

  return {
    text: body.after,
    fieldPath: typeof body.fieldPath === 'string' ? body.fieldPath : FALLBACK_FIELD_PATH,
    buildId: typeof body.buildId === 'string' ? body.buildId : fallbackBuild,
    source: 'Sanity Agent Actions (Transform, noWrite) — a model wrote this',
  }
}

function printChecks(decision: GateDecision): void {
  line(`build         ${decision.buildId}`)
  for (const check of decision.checks) {
    const mark = check.passed ? 'pass' : check.blocking ? 'BLOCK' : 'warn'
    line(`  ${mark.padEnd(5)} ${check.name.padEnd(22)} ${check.detail}`)
  }
}

function heading(text: string): void {
  process.stdout.write(`\n${text}\n${'-'.repeat(text.length)}\n`)
}

function line(text: string): void {
  process.stdout.write(`${text}\n`)
}

function fail(text: string): void {
  process.stderr.write(`FAIL  ${text}\n`)
}

function firstLine(text: string): string {
  return text.split('\n')[0] ?? text
}

/** Enough of a response body to diagnose it, not enough to fill the terminal. */
function excerpt(text: string): string {
  const flat = text.replace(/\s+/g, ' ').trim()
  return flat.length > 200 ? `${flat.slice(0, 200)}…` : flat
}

function describe(error: unknown): string {
  return error instanceof Error ? error.message : String(error)
}

main()
  .then((code) => {
    process.exitCode = code
  })
  .catch((error: unknown) => {
    fail(error instanceof Error ? (error.stack ?? error.message) : String(error))
    process.exitCode = 1
  })
