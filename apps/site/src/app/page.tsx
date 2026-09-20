import {existsSync} from 'node:fs'
import path from 'node:path'
import Link from 'next/link'

import {BeliefLedger} from '@/components/BeliefLedger'
import {LiveApps} from '@/components/LiveApps'
import {ENGINE_URL, LIVE_APPS} from '@/lib/apps'
import {Pipeline} from '@/components/Pipeline'
import {Reveal} from '@/components/Reveal'
import {SmoothScroll} from '@/components/SmoothScroll'

const GATE_CHECKS = [
  {name: 'human_approval', desc: 'The approving actor is a person. Checked independently of the permission table, so a misconfigured role still cannot publish.'},
  {name: 'build_current', desc: 'The draft was written against the build it is being published against. A weekend in between is not a detail.'},
  {name: 'still_stale', desc: 'The assertion still disagrees with current belief. Somebody may have already fixed it by hand.'},
  {name: 'claim_active', desc: 'The claim being published is still asserted at all. Publishing a retired fact is the failure this product exists to catch.'},
  {name: 'no_unresolved_conflict', desc: 'No source disagreement covers this claim. If two sources still contradict each other, nobody should be picking a winner by clicking.'},
  {name: 'no_contradiction', desc: 'The corrected text does not contradict a different current claim. Fixing one page into a new inconsistency is not a fix.'},
  {name: 'blast_radius_stable', desc: 'No page started depending on this claim since drafting. The approver needs to know before the click, not after.'},
  {name: 'scope_respected', desc: 'The correction touches only the field the assertion declared. One paragraph, addressed by key.'},
  {name: 'correctable_surface', desc: 'The dependent is something a patch can actually fix. A bot has no paragraph, and a queue item nobody can publish is worse than none.'},
]

const PROOF = [
  {n: '243', k: 'Go tests across 15 packages'},
  {n: '0', k: 'models in the detection path'},
  {n: '1', k: 'GROQ query for the whole blast radius'},
  {n: '9', k: 'deterministic gate checks'},
  {n: '13', k: 'architecture decision records'},
]

export default function Landing() {
  const videoPath = path.join(process.cwd(), 'public', 'media', 'control-room.webm')
  const hasVideo = existsSync(videoPath)

  return (
    <div className="landing">
      <SmoothScroll />
      <Reveal />

      {/* ------------------------------------------------------------------ */}
      <section className="hero">
        <div className="shell hero__inner">
          <span className="eyebrow">Knowledge integrity · built on Sanity Knowledge Bases</span>

          <h1>
            Your code has <em>version control</em>. Your beliefs don’t.
          </h1>

          <p className="hero__lede">
            DRIFT diffs successive builds of your compiled knowledge, computes the{' '}
            <strong>blast radius</strong> of every changed claim across everything you have
            published, and drives the correction through a workflow with a human at the gate.
            It does not answer questions. It answers a different one:{' '}
            <strong>what did this organisation stop believing — and what is still saying the
            old thing?</strong>
          </p>

          <div className="hero__cta">
            <a
              className="btn"
              data-variant="primary"
              href={LIVE_APPS[0]?.href ?? '#run'}
              target="_blank"
              rel="noreferrer noopener"
            >
              Open the Control Room
              <span aria-hidden="true">↗</span>
            </a>
            <Link className="btn" href="/docs">
              Read the documentation
            </Link>
            <a className="btn" data-variant="ghost" href="#run">
              What runs where
            </a>
          </div>

          <div className="hero__run">
            <span>$</span> go run ./cmd/engine -fixtures
            <span style={{color: 'var(--fg-faint)'}}>
              # no Sanity credentials, no network
            </span>
          </div>

          <BeliefLedger />
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      <section className="proof">
        <div className="shell">
          <div className="proof__grid">
            {PROOF.map((item) => (
              <div className="proof__item" key={item.k}>
                <span className="proof__n">{item.n}</span>
                <span className="proof__k">{item.k}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      <section className="section">
        <div className="shell split">
          <div className="reveal">
            <span className="eyebrow">The layer down</span>
            <h2 className="statement">
              Everybody built the <em>chat box</em>.
            </h2>
          </div>

          <div className="contrast reveal">
            <div className="contrast__row" data-tone="them">
              <span className="contrast__tag">the field</span>
              <div className="contrast__body">
                <b>An agent that cites its sources</b>
                Retrieve a passage, attach a citation, answer confidently. Honest about where
                an answer came from, and silent about whether the organisation agrees with
                itself.
              </div>
            </div>

            <div className="contrast__row" data-tone="us">
              <span className="contrast__tag">drift</span>
              <div className="contrast__body">
                <b>A ledger of what changed, and what it broke</b>
                Knowledge Base entries belong to a build and cannot be hand-edited. That single
                product decision makes every build an immutable, timestamped snapshot of what
                an organisation asserts. Two snapshots can be diffed. A corpus becomes a{' '}
                <strong>time series</strong>.
              </div>
            </div>

            <div className="contrast__row" data-tone="us">
              <span className="contrast__tag">the test</span>
              <div className="contrast__body">
                <b>“Did we get all of them?”</b>
                Semantic search over prose can guess which pages probably mention a policy. It
                cannot answer that question. A correction you cannot prove is complete is a
                correction nobody can safely approve.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      <section className="section" id="how">
        <div className="shell">
          <div className="section__head reveal">
            <span className="eyebrow">The mechanism</span>
            <h2>From one edited sentence to seven corrected pages.</h2>
            <p className="section__sub">
              Seven steps, and a model runs in exactly one of them — and not the one that
              decides anything. Scroll; the diagram assembles as you go.
            </p>
          </div>

          <Pipeline />
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      <section className="section section--tight">
        <div className="shell">
          <div className="section__head reveal">
            <span className="eyebrow">Ninety seconds</span>
            <h2>No chat window appears at any point.</h2>
            <p className="section__sub">
              Edit one number in one source document. A graph turns red. Eight published
              surfaces are flagged as asserting a retired fact. One click drafts the
              corrections; a human approves; the gate has the last word.
            </p>
          </div>

          <div className="reel reveal">
            {hasVideo ? (
              <video
                controls
                muted
                loop
                playsInline
                preload="metadata"
                poster="/media/control-room-poster.png"
              >
                <source src="/media/control-room.webm" type="video/webm" />
                Your browser cannot play this recording. The same walkthrough is written out
                in the Quickstart.
              </video>
            ) : (
              <p className="reel__missing">
                The walkthrough recording has not been captured in this checkout yet. Run{' '}
                <code>pnpm --filter @drift/site capture</code> with the engine and console
                running to record it, or read the same sequence step by step in the{' '}
                <Link href="/docs/start/quickstart">Quickstart</Link>.
              </p>
            )}
            <div className="reel__caption">
              <span className="pill" data-tone="signal">recorded, not mocked</span>
              <span>
                Captured from the running Control Room with Playwright — the same fixtures the
                test suite uses.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      <section className="section section--tight" id="run">
        <div className="shell">
          <div className="section__head reveal">
            <span className="eyebrow">Where the rest of it runs</span>
            <h2>This page is documentation. The product is four other processes.</h2>
            <p className="section__sub">
              DRIFT is an engine plus three interfaces, and on your machine each one is a
              different port. These links go to your own machine — they work once the matching
              dev server is running, and the dot says whether anything is answering right now.
            </p>
          </div>

          <div className="reveal">
            <LiveApps apps={LIVE_APPS} engineUrl={ENGINE_URL} />
          </div>

          <p className="section__sub" style={{marginTop: 18}}>
            Start with the engine in fixture mode — no Sanity account, no network — then open the
            Control Room. The full sequence is in the{' '}
            <Link href="/docs/start/quickstart">Quickstart</Link>.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      <section className="section">
        <div className="shell split">
          <div className="reveal">
            <span className="eyebrow">Why structured content is the product</span>
            <h2>One query. Provably complete.</h2>
            <p className="section__sub">
              Every dependency between published text and the fact it rests on is a real Sanity
              reference held in a document of its own. So “which pages assert this claim?” is a
              traversal, not an inference — exact, instant, and impossible to miss a row.
            </p>
            <p className="section__sub" style={{marginTop: 16}}>
              Remove the structure and the product does not degrade. It ceases to exist.
            </p>
          </div>

          <div className="reveal">
            <div className="code-moment">
              <div className="code-moment__head">blast radius · internal/graph</div>
              <pre>
                <code>
                  <span className="tok-dim">*[</span>
                  <span className="tok-var">_type</span> == <span className="tok-str">&quot;assertion&quot;</span>{' '}
                  <span className="tok-kw">&amp;&amp;</span>{' '}
                  <span className="tok-var">references</span>(<span className="tok-str">$claimId</span>)
                  <span className="tok-dim">]</span>
                </code>
              </pre>
              <div className="code-moment__foot">
                A content page is one kind of surface. An agent answering from the same
                Knowledge Base is another — and it registers its dependency as an ordinary
                assertion, so the walk that finds the seven pages finds the bot in the same
                query. Completeness over pages is not completeness.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      <section className="section">
        <div className="shell">
          <div className="section__head reveal">
            <span className="eyebrow">The boundary</span>
            <h2>Where determinism ends and AI begins — written down.</h2>
            <p className="section__sub">
              A judge, an auditor or a nervous head of support can check any flag on this system
              by comparing two numbers, without trusting a model at all.
            </p>
          </div>

          <div className="grid-3">
            <div className="card reveal" data-tone="verified">
              <span className="card__rule">No model runs here</span>
              <h3>Detection</h3>
              <p>
                Claim comparison, dependency traversal, blast-radius calculation, publication
                gates and disagreement detection. Deterministic and golden-file tested: the same
                two builds always produce byte-identical events.
              </p>
            </div>

            <div className="card reveal" data-tone="caution">
              <span className="card__rule">Exactly three places</span>
              <h3>The model</h3>
              <p>
                Proposing claims from entry prose, drafting one corrected sentence via Agent
                Actions with <code>noWrite: true</code>, and phrasing an explanation of a
                conflict it did not find. It is never permitted to decide <em>that</em>{' '}
                something drifted.
              </p>
            </div>

            <div className="card reveal" data-tone="signal">
              <span className="card__rule">Always</span>
              <h3>The human</h3>
              <p>
                Approval is role-gated in the deployed workflow definition, not by a prompt
                asking nicely. An unattended agent holds no role, so the edge into{' '}
                <code>published</code> is closed to it — and the gate checks again anyway.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      <section className="section section--tight">
        <div className="shell">
          <div className="section__head reveal">
            <span className="eyebrow">The gate</span>
            <h2>Approval means “publish this, if it is still the right thing to publish.”</h2>
            <p className="section__sub">
              Nine checks, re-derived at the moment of the click rather than trusted from
              drafting time. Every one is a comparison between two values that already exist —
              and when a publication is blocked, the operator gets a named check and both
              values, not an opinion.
            </p>
          </div>

          <div className="checks reveal">
            {GATE_CHECKS.map((check) => (
              <div className="check" key={check.name}>
                <span className="check__name">{check.name}</span>
                <span className="check__desc">{check.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      <section className="section">
        <div className="shell">
          <div className="section__head reveal">
            <span className="eyebrow">Why Sanity specifically</span>
            <h2>Four things have to be true at once.</h2>
            <p className="section__sub">
              Remove Sanity and you do not have a slightly worse DRIFT. You have a six-month
              data-engineering project to rebuild the substrate.
            </p>
          </div>

          <div className="reveal">
            <table className="matrix">
              <thead>
                <tr>
                  <th>What the product requires</th>
                  <th>The feature that provides it</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Immutable, timestamped knowledge snapshots</td>
                  <td>Knowledge Base builds — entries belong to a build and cannot be hand-edited</td>
                </tr>
                <tr>
                  <td>Contradiction surfaced, not averaged away</td>
                  <td>Build-time conflict detection across disagreeing sources</td>
                </tr>
                <tr>
                  <td>Decisions that outlive a rebuild — and expire when their basis changes</td>
                  <td>Instructions, auto-archived when their anchoring source changes</td>
                </tr>
                <tr>
                  <td>A provably complete dependency walk over the same content</td>
                  <td>
                    Real references and GROQ — <code>references($claimId)</code>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      <section className="closer">
        <div className="shell">
          <h2>Every fact you publish has a lineage. Most of you cannot see it.</h2>
          <p>
            Where it came from, the build it first appeared in, the last build it was confirmed
            unchanged in, the build it moved in, and every page and bot still repeating it.
            One query, five answers.
          </p>
          <div className="closer__cta">
            <Link className="btn" data-variant="primary" href="/docs">
              Read the documentation
            </Link>
            <Link className="btn" href="/docs/concepts/lineage">
              See how lineage works
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
