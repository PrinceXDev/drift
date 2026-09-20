import type {ClaimTier, Detector, DriftKind, WorkflowState} from '@drift/fixtures'

/**
 * Every state chip carries a text label as well as a colour.
 *
 * A screen where the only difference between "fine" and "seven pages are wrong"
 * is a hue fails for colour-blind reviewers, fails in a greyscale screenshot,
 * and fails in the demo video after compression.
 */

export function TierChip({tier}: {tier: ClaimTier}) {
  const tone = tier === 'core' ? 'core' : tier === 'standard' ? 'info' : ''
  return (
    <span className={`chip ${tone}`} title="Mirrors the Knowledge Base outline tagging">
      {tier}
    </span>
  )
}

export function KindChip({kind}: {kind: DriftKind}) {
  const tone: Record<DriftKind, string> = {
    contradicted: 'core',
    retired: 'warn',
    weakened: 'warn',
    citation_broken: 'warn',
    instruction_archived: 'warn',
    added: 'ok',
  }
  return (
    <span className={`chip ${tone[kind]}`}>
      <span className="dot" aria-hidden="true" />
      {kind.replace(/_/g, ' ')}
    </span>
  )
}

export function StateChip({state}: {state: WorkflowState}) {
  const tone: Record<WorkflowState, string> = {
    triage: 'core',
    drafting: 'warn',
    review: 'info',
    detected: 'info',
    published: 'ok',
    dismissed: '',
  }
  return <span className={`chip ${tone[state]}`}>{state}</span>
}

/**
 * Confidence is shown alongside the detector that produced it, always.
 *
 * "1.0" on its own is a claim the user has to take on faith. "1.0 · typed value"
 * tells them *why* it is certain — two numbers were compared — and, crucially,
 * "0.55 · semantic" tells them when it is not.
 */
export function ConfidenceChip({value, detector}: {value: number; detector: Detector}) {
  const certain = value >= 1
  return (
    <span
      className={`chip ${certain ? 'ok' : 'warn'}`}
      title={
        certain
          ? 'Both builds carried a typed value; this is an arithmetic comparison, not a model judgement.'
          : 'Inferred from prose. Routed to a human rather than acted on.'
      }
    >
      {value.toFixed(2)} · {detector.replace(/_/g, ' ')}
    </span>
  )
}

export function BlastChip({count}: {count: number}) {
  if (count === 0) {
    return <span className="chip">nothing published</span>
  }
  return (
    <span className="chip core">
      {count} page{count === 1 ? '' : 's'}
    </span>
  )
}
