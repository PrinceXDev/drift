'use client'

import {useEffect, useRef, useState} from 'react'

/**
 * The mechanism, scrubbed by scroll.
 *
 * A single diagram sits still while the reader moves through seven steps, and
 * each step lights the part of it that is running. Building one scene that
 * accumulates — rather than seven illustrations that replace each other — is
 * the whole idea: by the last step the reader is looking at the entire system
 * at once, and they watched it assemble.
 *
 * GSAP's ScrollTrigger only decides which step is current. Everything visual is
 * CSS keyed off `data-step`, so the diagram is correct with JavaScript disabled,
 * correct at the top of the section, and cheap to paint.
 */

const STEPS = [
  {
    title: 'Somebody edits a source',
    body: 'A policy PDF is updated: the return window moves from 30 days to 45. One person, one field, no announcement.',
    foot: 'source · Returns & Refunds Policy · authority 5',
  },
  {
    title: 'The Knowledge Base rebuilds',
    body: 'Sanity re-indexes the corpus. Entries belong to that build and cannot be hand-edited, and conflicts between disagreeing sources are raised at build time.',
    foot: 'build 47 · 41 entries · 1 unresolved conflict',
  },
  {
    title: 'The build is captured as a snapshot',
    body: 'The ledger reads the outline and every entry over Context MCP and content-addresses what came back. Identical hash, identical belief — the diff can be skipped entirely.',
    foot: 'outlineHash sha256:9f2c…  ·  two snapshots are comparable',
  },
  {
    title: 'The differ compares two builds',
    body: 'No model runs here. Both sides carry a typed value and a unit, so contradiction is arithmetic and confidence is exactly 1.0.',
    foot: 'driftEvent{kind: contradicted, before: 30, after: 45, detectedBy: typed_value}',
  },
  {
    title: 'The graph walks the blast radius',
    body: 'Every dependency is a real Sanity reference, so one GROQ query returns every published place that still asserts the old fact — pages and agents alike.',
    foot: '*[_type == "assertion" && references($claimId)]  →  8 dependents',
  },
  {
    title: 'The gate re-derives everything',
    body: 'Between drafting and approval the world can move. Nine deterministic checks run again at the click: still stale, still current, still in scope, still a human.',
    foot: 'human_approval · build_current · still_stale · blast_radius_stable · …',
  },
  {
    title: 'A human approves; one transaction publishes',
    body: 'The paragraph is patched and the assertion re-stamped with the build it was verified against, in a single Sanity mutation. Never one without the other.',
    foot: 'workflow: review → published · audit event appended, hash-chained',
  },
] as const

export function Pipeline() {
  const [step, setStep] = useState(0)
  const stepsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = stepsRef.current
    if (!container) return

    const nodes = Array.from(container.querySelectorAll<HTMLElement>('[data-step-index]'))
    if (nodes.length === 0) return

    // IntersectionObserver is enough for "which step is in the reading band",
    // and it keeps the scroll-driven part of this page free of a scroll
    // listener. GSAP still owns the reveal animations elsewhere.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        const first = visible[0]?.target as HTMLElement | undefined
        const index = first?.dataset.stepIndex
        if (index !== undefined) setStep(Number(index))
      },
      {rootMargin: '-40% 0px -45% 0px', threshold: 0},
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  const current = STEPS[step] ?? STEPS[0]

  return (
    <div className="pipeline">
      <div className="pipeline__steps" ref={stepsRef}>
        {STEPS.map((item, index) => (
          <div
            className="step"
            key={item.title}
            data-step-index={index}
            data-active={index === step}
          >
            <span className="step__n">{String(index + 1).padStart(2, '0')}</span>
            <div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="pipeline__stage">
        <div className="stage__bar">
          <b>drift-engine</b>
          <span>·</span>
          <span>step {step + 1} / {STEPS.length}</span>
        </div>
        <PipelineScene step={step} />
        <div className="stage__foot">
          <code>{current.foot}</code>
        </div>
      </div>
    </div>
  )
}

/**
 * One scene, seven states. Groups carry `data-from`, the step at which they
 * become live; CSS dims anything the reader has not reached yet.
 */
function PipelineScene({step}: {step: number}) {
  const live = (from: number) => (step >= from ? 'true' : 'false')

  return (
    <svg className="stage__canvas" viewBox="0 0 420 326" role="img" data-step={step}>
      <title>How a source edit becomes a published correction</title>

      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 10 5 0 10z" fill="currentColor" />
        </marker>
      </defs>

      {/* 1 — the source document */}
      <g className="scene__node" data-live={live(0)}>
        <rect x="22" y="20" width="96" height="60" rx="7" />
        <text className="scene__label" x="34" y="41">
          source
        </text>
        <text className="scene__value" x="34" y="60">
          30 → 45
        </text>
        <text className="scene__unit" x="34" y="73">
          days
        </text>
      </g>

      <path className="scene__link" data-live={live(1)} d="M118 50h56" markerEnd="url(#arrow)" />

      {/* 2 — the knowledge base build */}
      <g className="scene__node" data-live={live(1)}>
        <rect x="182" y="20" width="106" height="60" rx="7" />
        <text className="scene__label" x="194" y="41">
          knowledge base
        </text>
        <text className="scene__value" x="194" y="60">
          build 47
        </text>
        <text className="scene__unit" x="194" y="73">
          conflict raised
        </text>
      </g>

      {/* 3 — two snapshots */}
      <path className="scene__link" data-live={live(2)} d="M235 80v22" markerEnd="url(#arrow)" />
      <g className="scene__node scene__node--chip" data-live={live(2)}>
        <rect x="152" y="104" width="72" height="30" rx="6" />
        <text className="scene__chip" x="168" y="123">
          build 46
        </text>
      </g>
      <g className="scene__node scene__node--chip" data-live={live(2)}>
        <rect x="246" y="104" width="72" height="30" rx="6" />
        <text className="scene__chip" x="262" y="123">
          build 47
        </text>
      </g>

      {/* 4 — the differ */}
      <path className="scene__link" data-live={live(3)} d="M188 134v16h94v-16" />
      <path className="scene__link" data-live={live(3)} d="M235 150v14" markerEnd="url(#arrow)" />
      <g className="scene__node scene__node--diff" data-live={live(3)}>
        <rect x="160" y="166" width="150" height="40" rx="7" />
        <text className="scene__label" x="172" y="184">
          differ · no model
        </text>
        <text className="scene__value scene__value--signal" x="172" y="199">
          contradicted · 1.0
        </text>
      </g>

      {/* 5 — blast radius */}
      <path className="scene__link" data-live={live(4)} d="M235 206v18" markerEnd="url(#arrow)" />
      <g className="scene__fan" data-live={live(4)}>
        {Array.from({length: 8}).map((_, index) => (
          <circle
            key={index}
            cx={50 + index * 46}
            cy={244}
            r={7}
            style={{transitionDelay: `${index * 55}ms`}}
            data-kind={index === 7 ? 'agent' : 'page'}
          />
        ))}
        <text className="scene__unit" x="22" y="266">
          7 pages + 1 agent · one query
        </text>
      </g>

      {/* 6 — the gate */}
      <g className="scene__gate" data-live={live(5)}>
        <rect x="22" y="276" width="240" height="30" rx="7" />
        {Array.from({length: 9}).map((_, index) => (
          <rect
            key={index}
            x={34 + index * 25}
            y={286}
            width={16}
            height={10}
            rx={2}
            style={{transitionDelay: `${index * 45}ms`}}
          />
        ))}
      </g>

      {/* 7 — publication */}
      <path className="scene__link" data-live={live(6)} d="M262 291h28" markerEnd="url(#arrow)" />
      <g className="scene__node scene__node--published" data-live={live(6)}>
        <rect x="296" y="276" width="102" height="30" rx="7" />
        <text className="scene__chip scene__chip--ok" x="310" y="295">
          published ✓
        </text>
      </g>
    </svg>
  )
}
