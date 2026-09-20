/**
 * Shared vocabulary for the DRIFT content model.
 *
 * These lists are the single source of truth for every enumerated value in the
 * system. The Go engine mirrors them in `pkg/driftv1/enums.go`; the mirror is
 * verified by a contract test so the two cannot silently diverge.
 */

/** How a claim's lifecycle is represented over successive Knowledge Base builds. */
export const CLAIM_STATUSES = ['active', 'retired', 'contested'] as const
export type ClaimStatus = (typeof CLAIM_STATUSES)[number]

/**
 * Mirrors the `[core]` / `[peripheral]` tagging that a Sanity Knowledge Base
 * applies to entries in its outline. We reuse it as a routing signal: drift in
 * a `core` claim pages a human, drift in a `peripheral` claim batches to a digest.
 */
export const CLAIM_TIERS = ['core', 'standard', 'peripheral'] as const
export type ClaimTier = (typeof CLAIM_TIERS)[number]

/**
 * What sort of published thing depends on a claim.
 *
 * The list is short on purpose. It exists to answer "how would you correct
 * this?", and the answers are genuinely different: a page is patched, an agent
 * is re-grounded, a feed is republished, a template is re-rendered. Only `page`
 * has a document to patch, which is what the engine's `correctable_surface`
 * gate check turns on.
 */
export const SURFACE_KINDS = ['page', 'agent', 'feed', 'template'] as const
export type SurfaceKind = (typeof SURFACE_KINDS)[number]

/** Whether a published assertion still agrees with the current build's claim. */
export const ASSERTION_STATES = ['verified', 'stale', 'contradicted', 'orphaned'] as const
export type AssertionState = (typeof ASSERTION_STATES)[number]

/**
 * The taxonomy of belief change. This is the core output of the diff engine:
 * the vocabulary in which "what did this organisation stop believing" is expressed.
 */
export const DRIFT_KINDS = [
  'added',
  'retired',
  'contradicted',
  'weakened',
  'citation_broken',
  'instruction_archived',
] as const
export type DriftKind = (typeof DRIFT_KINDS)[number]

/** Stages of the remediation workflow, mirrored from `sanity/workflows/drift-remediation.ts`. */
export const WORKFLOW_STATES = [
  'detected',
  'triage',
  'drafting',
  'review',
  'published',
  'dismissed',
] as const
export type WorkflowState = (typeof WORKFLOW_STATES)[number]

/** Kinds of authoritative input a Knowledge Base is built from. */
export const SOURCE_KINDS = ['policy', 'spec', 'contract', 'page'] as const
export type SourceKind = (typeof SOURCE_KINDS)[number]

/** Lifecycle of a standing decision written back into the Knowledge Base. */
export const INSTRUCTION_STATUSES = ['active', 'archived'] as const
export type InstructionStatus = (typeof INSTRUCTION_STATUSES)[number]

/** Helper: turn a const tuple into Sanity's `{title, value}` option list. */
export function asOptions<T extends readonly string[]>(
  values: T,
  titles?: Partial<Record<T[number], string>>,
): {title: string; value: T[number]}[] {
  return values.map((value) => ({
    title: titles?.[value as T[number]] ?? toTitleCase(value),
    value: value as T[number],
  }))
}

function toTitleCase(value: string): string {
  return value
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
