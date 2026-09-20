import Link from 'next/link'

import {siteIntegrity} from '@/lib/content'

/**
 * The index doubles as the demo's "before and after" shot.
 *
 * A visitor sees an ordinary retail site. The notice at the top is the only
 * hint that anything is wrong — and it is generated, not written: the counts
 * come from the same drift events the console renders.
 */
export default function HomePage() {
  const {perPage, affectedPages, totalPages, staleAssertions, build} = siteIntegrity()

  return (
    <main>
      <p className="lede">
        Reference-grade headphones and speakers, plus the policies that govern buying them.
      </p>

      {affectedPages > 0 ? (
        <div className="notice">
          <div className="headline">
            {staleAssertions} statement{staleAssertions === 1 ? '' : 's'} across {affectedPages} of{' '}
            {totalPages} pages no longer match current policy.
          </div>
          <div style={{marginTop: 4, color: 'var(--ink-dim)'}}>
            Knowledge Base build {build.buildNumber} changed what this company asserts. These pages
            were last verified against an earlier build and have not caught up. Nothing here is
            inferred — each one is a published sentence with a declared dependency on a claim that
            changed.
          </div>
        </div>
      ) : (
        <div className="notice">
          <div className="headline">
            Every published statement agrees with Knowledge Base build {build.buildNumber}.
          </div>
        </div>
      )}

      <ul className="index">
        {perPage.map(({page, integrity}) => (
          <li key={page.id}>
            <Link href={`/${page.slug}`}>
              <span>
                <span className="title">{page.title}</span>{' '}
                <span className="slug">/{page.slug}</span>
              </span>
              <span className={`flag ${integrity.staleCount === 0 ? 'ok' : ''}`}>
                {integrity.staleCount === 0
                  ? `${integrity.statuses.length} claim${integrity.statuses.length === 1 ? '' : 's'} · current`
                  : `⚑ ${integrity.staleCount} stale`}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <p className="footnote">
        This site is the content side of DRIFT. Every flagged sentence is an{' '}
        <code>assertion</code> document holding a real Sanity reference to the{' '}
        <code>claim</code> it depends on, so the list above is the exact result of a reference
        traversal — not a guess about which pages probably mention returns.
      </p>
    </main>
  )
}
