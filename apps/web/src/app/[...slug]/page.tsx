import {notFound} from 'next/navigation'
import type {Metadata} from 'next'

import {allPages, currentBuild, pageBySlug, pageIntegrity} from '@/lib/content'

// Every page is known at build time, so the whole site prerenders. The
// integrity strip is therefore accurate as of the build — which is exactly the
// failure mode the product is about, and worth saying out loud in the footer
// rather than pretending a static page is live.
export function generateStaticParams() {
  return allPages().map((page) => ({slug: page.slug.split('/')}))
}

type Params = {slug: string[]}

async function resolve(params: Promise<Params>) {
  const {slug} = await params
  return pageBySlug(slug.join('/'))
}

export async function generateMetadata({params}: {params: Promise<Params>}): Promise<Metadata> {
  const page = await resolve(params)
  if (!page) return {}
  return {title: page.title, description: page.summary}
}

export default async function ContentPageView({params}: {params: Promise<Params>}) {
  const page = await resolve(params)
  if (!page) notFound()

  const integrity = pageIntegrity(page)
  const build = currentBuild()

  return (
    <main>
      <article>
        <h1>{page.title}</h1>
        {page.summary && <p className="summary">{page.summary}</p>}

        {page.body.map((text, i) => {
          // Assertions address paragraphs by index — `body[1]` — which is the
          // same span the remediation agent is permitted to rewrite and nothing
          // more. Here it is what decides whether a sentence gets flagged.
          const status = integrity.byFieldPath.get(`body[${i}]`)
          const flagged = status?.stale ?? false

          return (
            <p key={i}>
              {flagged ? (
                <span className="flagged" title="This statement no longer matches current policy.">
                  {text}
                </span>
              ) : (
                text
              )}
            </p>
          )
        })}
      </article>

      <section className="integrity">
        <h2>Content integrity</h2>

        {integrity.clean ? (
          <span className="verdict fresh">
            Verified against build {build.buildNumber}
          </span>
        ) : (
          <span className="verdict stale">
            {integrity.staleCount} statement{integrity.staleCount === 1 ? '' : 's'} out of date
          </span>
        )}

        {integrity.statuses.length > 0 && (
          <ul className="claims">
            {integrity.statuses.map(({assertion, claim, drift, stale, verifiedBuild}) => (
              <li key={assertion.id} className={stale ? 'is-stale' : ''}>
                <div className="claim-path">
                  {claim?.path ?? assertion.claimId} · {assertion.fieldPath}
                </div>
                <div className="claim-statement">{claim?.statement ?? '—'}</div>
                {stale && drift ? (
                  <div className="claim-note">
                    {drift.kind === 'retired' ? (
                      <>
                        This policy was <strong>withdrawn</strong> in build{' '}
                        {drift.toBuild.replace('build.', '')}, but the paragraph above still
                        advertises it.
                      </>
                    ) : (
                      <>
                        Build {drift.toBuild.replace('build.', '')} changed this. The paragraph
                        above was verified against build {verifiedBuild} and still says the old
                        thing.
                      </>
                    )}
                  </div>
                ) : (
                  <div className="claim-note" style={{color: 'var(--ink-faint)'}}>
                    Verified against build {verifiedBuild}.
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}

        <p className="stamp">
          rendered from build {build.buildNumber} · outline {build.outlineHash.slice(0, 22)}…
        </p>
      </section>

      <p className="footnote">
        Staleness here is <em>derived</em>, not remembered. Each paragraph records the build it was
        verified against; comparing that to the current build is what produces the flag. Nobody has
        to notice, and nobody has to maintain a list.
      </p>
    </main>
  )
}
