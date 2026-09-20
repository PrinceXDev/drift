import type {ReactNode} from 'react'

import type {Severity} from '../state/model'
import {SEVERITY_MEANING} from '../state/model'

/**
 * Shared primitives.
 *
 * The rule every one of these follows: a state is never communicated by colour
 * alone. Each carries a word, a glyph, or both. A control room read in
 * greyscale, by a colour-blind operator, or through a compressed demo video has
 * to convey the same thing as one read on a calibrated monitor.
 */

// ---------------------------------------------------------------------------
// Severity
// ---------------------------------------------------------------------------

/** Glyphs chosen to be distinguishable by shape, not just by colour. */
const SEVERITY_GLYPH: Record<Severity, string> = {
  critical: '!',
  major: '▲',
  minor: '•',
  info: '·',
}

export function SeverityGlyph({severity}: {severity: Severity}) {
  return (
    <span
      className={`sev-glyph ${severity}`}
      role="img"
      aria-label={`${severity}: ${SEVERITY_MEANING[severity]}`}
      title={SEVERITY_MEANING[severity]}
    >
      {SEVERITY_GLYPH[severity]}
    </span>
  )
}

export function SeverityChip({severity}: {severity: Severity}) {
  const tone = severity === 'info' ? '' : severity
  return (
    <span className={`chip ${tone}`} title={SEVERITY_MEANING[severity]}>
      {severity}
    </span>
  )
}

// ---------------------------------------------------------------------------
// Chips
// ---------------------------------------------------------------------------

export function Chip({
  children,
  tone,
  title,
  mono,
}: {
  children: ReactNode
  tone?: 'critical' | 'major' | 'minor' | 'ok' | 'accent'
  title?: string
  mono?: boolean
}) {
  return (
    <span className={`chip ${tone ?? ''} ${mono ? 'mono' : ''}`} title={title}>
      {children}
    </span>
  )
}

/**
 * Confidence is always shown with the detector that produced it.
 *
 * "1.00" alone is a number the reader has to take on faith. "1.00 · typed
 * value" says *why* it is certain — two numbers were compared — and, more
 * importantly, "0.55 · semantic" says when it is not.
 */
export function ConfidenceChip({value, detector}: {value: number; detector: string}) {
  const certain = value >= 1
  const explanation = certain
    ? detector === 'typed_value'
      ? 'Both builds carried a typed value. This is arithmetic, not a model judgement.'
      : 'The claim appeared in or vanished from the build outline. Presence is the evidence.'
    : 'Inferred from prose. Routed to a human rather than acted on.'

  return (
    <span className={`chip ${certain ? 'ok' : 'major'} mono`} title={explanation}>
      {value.toFixed(2)} · {detector.replace(/_/g, ' ')}
    </span>
  )
}

export function BlastChip({count}: {count: number}) {
  if (count === 0) {
    return (
      <Chip title="Nothing published depends on this claim, so nobody is paged.">
        no pages affected
      </Chip>
    )
  }
  return (
    <Chip tone="critical" title="Published statements that still say the old thing.">
      {count} page{count === 1 ? '' : 's'} wrong
    </Chip>
  )
}

export function TierChip({tier}: {tier: string}) {
  // Two returns rather than a conditional prop: under exactOptionalPropertyTypes
  // an explicit `undefined` is not the same as an absent property.
  if (tier === 'core') {
    return (
      <Chip
        tone="critical"
        title="A load-bearing fact. Mirrors the [core] tag in the Knowledge Base outline."
      >
        {tier}
      </Chip>
    )
  }
  return <Chip title="Mirrors the tagging in the Knowledge Base outline.">{tier}</Chip>
}

// ---------------------------------------------------------------------------
// Evidence
// ---------------------------------------------------------------------------

export function Evidence({children}: {children: ReactNode}) {
  return <div className="evidence">{children}</div>
}

export function EvidenceRow({
  label,
  children,
  prose,
}: {
  label: string
  children: ReactNode
  prose?: boolean
}) {
  return (
    <div className="evidence-row">
      <div className="evidence-k">{label}</div>
      <div className={`evidence-v ${prose ? 'prose' : ''}`}>{children}</div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Diff
// ---------------------------------------------------------------------------

/**
 * A two-line before/after, in the shape a developer already knows how to read.
 *
 * Deliberately not a word-level diff. The operator's question is "is the new
 * sentence right?", not "which characters moved" — and a highlighted intra-word
 * diff makes a one-number change look like a rewrite.
 */
export function Diff({before, after}: {before: string; after: string}) {
  return (
    <div className="diff">
      <div className="diff-line removed">
        <span className="diff-mark" aria-hidden="true">
          −
        </span>
        <span className="diff-text">
          <span className="faint">was: </span>
          {before}
        </span>
      </div>
      <div className="diff-line added">
        <span className="diff-mark" aria-hidden="true">
          +
        </span>
        <span className="diff-text">
          <span className="faint">now: </span>
          {after}
        </span>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Layout
// ---------------------------------------------------------------------------

export function Card({
  title,
  action,
  children,
  flush,
}: {
  title?: string
  action?: ReactNode
  children: ReactNode
  flush?: boolean
}) {
  return (
    <section className="card">
      {title && (
        <header className="card-head">
          <h2>{title}</h2>
          <div style={{marginLeft: 'auto'}}>{action}</div>
        </header>
      )}
      <div className={`card-body ${flush ? 'flush' : ''}`}>{children}</div>
    </section>
  )
}

export function Empty({title, children}: {title: string; children?: ReactNode}) {
  return (
    <div className="empty">
      <strong>{title}</strong>
      {children}
    </div>
  )
}

export function Banner({
  tone = 'info',
  children,
}: {
  tone?: 'info' | 'warn' | 'crit'
  children: ReactNode
}) {
  return <div className={`banner ${tone}`}>{children}</div>
}

// ---------------------------------------------------------------------------
// Time
// ---------------------------------------------------------------------------

/** Absolute, in the reader's locale. Relative times hide staleness. */
export function When({iso}: {iso: string}) {
  const date = new Date(iso)
  return (
    <span className="mono faint" title={date.toISOString()}>
      {date.toLocaleString(undefined, {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })}
    </span>
  )
}
