import {useState} from 'react'

import {ask, sourceTitle, SAMPLE_QUESTIONS, type Mode, type Verdict} from './agent'

/**
 * Dissent — an agent that isn't allowed to answer until it finds the disagreement.
 *
 * The interface is a question box, which is the one conventional thing about it.
 * What comes back is not: when the sources disagree, there is no answer at all.
 * There is a disagreement, the authority behind each side, and one button that
 * settles it permanently.
 */
export function App() {
  const [question, setQuestion] = useState('')
  const [verdict, setVerdict] = useState<Verdict | null>(null)
  const [mode, setMode] = useState<Mode>('local')
  const [busy, setBusy] = useState(false)
  const [resolved, setResolved] = useState(false)

  async function submit(q: string) {
    const trimmed = q.trim()
    if (!trimmed || busy) return
    setBusy(true)
    setResolved(false)
    setQuestion(trimmed)
    const result = await ask(trimmed)
    setVerdict(result.verdict)
    setMode(result.mode)
    setBusy(false)
  }

  return (
    <div className="page">
      <header>
        <h1>Dissent</h1>
        <p className="strap">
          An agent that isn&rsquo;t allowed to answer until it finds the disagreement.
        </p>
      </header>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          void submit(question)
        }}
      >
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask about returns, warranty, shipping&hellip;"
          aria-label="Your question"
          autoFocus
        />
        <button type="submit" disabled={busy || !question.trim()}>
          {busy ? 'Checking sources…' : 'Ask'}
        </button>
      </form>

      {!verdict && (
        <section className="samples">
          <p className="hint">
            Three things can happen. The sources agree and you get an answer; they disagree
            and you get an argument; nothing covers it and the agent says so.
          </p>
          <ul>
            {SAMPLE_QUESTIONS.map((q) => (
              <li key={q}>
                <button type="button" className="link" onClick={() => void submit(q)}>
                  {q}
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {verdict?.adjudication && !resolved && (
        <Disagreement verdict={verdict} onResolve={() => setResolved(true)} />
      )}

      {verdict?.adjudication && resolved && <Resolved verdict={verdict} />}

      {verdict?.answer && <AnswerPanel verdict={verdict} />}

      {verdict && (
        <footer>
          <span className="stamp">
            build {verdict.buildId.replace('build.', '')} ·{' '}
            {mode === 'live' ? 'answered by the engine' : 'answered in-browser (engine offline)'}
          </span>
        </footer>
      )}
    </div>
  )
}

function Disagreement({verdict, onResolve}: {verdict: Verdict; onResolve: () => void}) {
  const adj = verdict.adjudication
  if (!adj) return null

  return (
    <section className="verdict refused" aria-live="polite">
      <div className="verdict-head">
        <span className="badge refused">No answer</span>
        <span className="path">{adj.path}</span>
        {adj.tier === 'core' && <span className="badge core">core claim</span>}
      </div>

      <p className="reason">{adj.reason}</p>

      <div className="sides">
        {adj.sides.map((side) => (
          <div key={side.sourceId} className={`side ${side.favoured ? 'favoured' : ''}`}>
            {side.value !== undefined && (
              <div className="side-value">
                {side.value} {side.unit}
              </div>
            )}
            <blockquote>{side.statement}</blockquote>
            <div className="side-source">
              {sourceTitle(side.sourceId)}
              <span className="authority"> · authority {side.authority}</span>
            </div>
            {side.favoured && <span className="badge ok">higher authority</span>}
          </div>
        ))}
      </div>

      {adj.proposedInstruction.text && (
        <div className="resolve">
          <div className="resolve-label">Settle it permanently</div>
          <p className="instruction">&ldquo;{adj.proposedInstruction.text}&rdquo;</p>
          <button type="button" onClick={onResolve}>
            Write this instruction to the Knowledge Base
          </button>
          <p className="note">
            This does not edit a page. It writes a standing decision anchored to{' '}
            {adj.proposedInstruction.anchoredTo.length} sources, so the next build is correct
            by construction and nobody is asked again.
          </p>
        </div>
      )}
    </section>
  )
}

function Resolved({verdict}: {verdict: Verdict}) {
  const adj = verdict.adjudication
  if (!adj) return null
  const winner = adj.sides.find((s) => s.favoured) ?? adj.sides[0]
  if (!winner) return null

  return (
    <section className="verdict settled" aria-live="polite">
      <div className="verdict-head">
        <span className="badge ok">Settled</span>
        <span className="path">{adj.path}</span>
      </div>
      <p className="reason">
        Instruction written, anchored to {adj.proposedInstruction.anchoredTo.length} sources.
        The next build will carry {sourceTitle(winner.sourceId)}&rsquo;s figure and this
        question will simply be answered.
      </p>
      <blockquote className="instruction">{adj.proposedInstruction.text}</blockquote>
      <p className="note">
        Sanity archives this instruction automatically if either anchoring source changes —
        which surfaces as an <code>instruction_archived</code> event, because a decision whose
        justification moved is worth re-examining.
      </p>
    </section>
  )
}

function AnswerPanel({verdict}: {verdict: Verdict}) {
  const answer = verdict.answer
  if (!answer) return null

  if (!answer.claims || answer.claims.length === 0) {
    return (
      <section className="verdict empty" aria-live="polite">
        <span className="badge">Nothing on record</span>
        <p className="reason">
          No entry in the Knowledge Base covers this. Saying so is the answer — stretching an
          unrelated claim to fit is how a grounded agent produces its most confident nonsense.
        </p>
      </section>
    )
  }

  return (
    <section className="verdict answered" aria-live="polite">
      <div className="verdict-head">
        <span className="badge ok">Sources agree</span>
        <span className="path">{answer.paths?.join(' · ')}</span>
      </div>

      {answer.claims.map((claim) => (
        <div key={claim.id} className="claim">
          <p className="statement">{claim.statement}</p>
          {claim.value !== undefined && (
            <span className="typed">
              {claim.value} {claim.unit} — a typed value, so this is checkable by comparison
              rather than by reading
            </span>
          )}
        </div>
      ))}

      {answer.citations && answer.citations.length > 0 && (
        <div className="citations">
          <div className="resolve-label">Checked against</div>
          <ul>
            {answer.citations.map((id) => (
              <li key={id}>{sourceTitle(id)}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}
