/**
 * The two principals that move one draft through `drift-remediation`.
 *
 * # Why the agent is a robot token and the human is a user
 *
 * The engine classifies a principal id by its prefix: `g…` is an account-global
 * user, `p-…` is a robot token, and anything else is project-scoped and
 * refused outright. That is not decoration — it is the same distinction DRIFT's
 * Go authz layer draws with `Actor.IsAgent`, arrived at independently by
 * Sanity, and the ids below use it rather than inventing a parallel one.
 *
 * # Roles are Sanity project roles, not DRIFT roles
 *
 * `drift-remediation` gates its `approve` action on `['administrator', 'editor']`.
 * Those are Sanity's project role names, matched by literal string membership
 * against whatever `/users/me` reports for the acting token. DRIFT's own role
 * vocabulary (viewer · agent · editor · steward · admin) lives in the Go
 * engine and is a different table for a different boundary.
 *
 * Sam is a steward in DRIFT and an `editor` in the Sanity project — that is
 * genuinely how the deployment is configured, and the mapping is worth stating
 * once rather than discovering during an incident.
 *
 * The drafting agent holds `viewer`, which is what an unattended Transform
 * token is given: enough to read the content it rewrites, and nothing that
 * matches the `approve` gate.
 */
import type {Principal} from './memory-client.ts'

/** Token the drafting agent is bound to. Invented, like DRIFT's demo tokens. */
export const AGENT_TOKEN = 'wf-token-transform-agent'

/** Token the approving human is bound to. */
export const HUMAN_TOKEN = 'wf-token-sam'

/**
 * The Transform agent that rewrites stale spans.
 *
 * It holds no role named by the `approve` action, so the edge into `published`
 * is closed to it by the deployed definition. Nothing in the run asks it
 * politely not to publish.
 */
export const TRANSFORM_AGENT: Principal = {
  id: 'p-drift-transform-agent',
  label: 'DRIFT Transform agent',
  roles: ['viewer'],
  isRobot: true,
}

/** Sam, the content steward who owns the pages the corrections land on. */
export const STEWARD: Principal = {
  id: 'gSamNorthwind',
  label: 'Sam (steward)',
  roles: ['editor'],
}

export const PRINCIPALS: Record<string, Principal> = {
  [AGENT_TOKEN]: TRANSFORM_AGENT,
  [HUMAN_TOKEN]: STEWARD,
}

/**
 * The project's role catalog.
 *
 * `deployDefinitions` refuses a definition that gates an action on a role the
 * project does not define, so this list is what makes the deploy gate
 * meaningful rather than decorative. It contains `administrator` even though
 * nobody in this run holds it — the engine then warns that work routed there
 * has no recipient, which is true, and which a catalog trimmed to the roles in
 * use would have hidden.
 */
export const ROLE_CATALOG = ['administrator', 'editor', 'viewer']
