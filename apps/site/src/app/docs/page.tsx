import type {Metadata} from 'next'
import Link from 'next/link'

import {Toc} from '@/components/DocsNav'
import {Markdown} from '@/components/Markdown'
import {docBySlug, navigation} from '@/lib/docs'

export const metadata: Metadata = {
  title: 'Documentation',
  description:
    'Every moving part of DRIFT, written down: the content model, the deterministic ' +
    'engine, the gate, the workflow, and the decisions behind each of them.',
}

export default async function DocsIndex() {
  const page = await docBySlug([])
  const groups = await navigation()

  return (
    <div className="docs__main">
      <article className="docs__article">
        <div className="docs__crumbs">
          <span>Docs</span>
        </div>

        <div className="docs__title-row">
          <h1>{page?.frontmatter.title ?? 'Documentation'}</h1>
        </div>

        {page?.frontmatter.description ? (
          <p className="docs__lede">{page.frontmatter.description}</p>
        ) : null}

        {page ? <Markdown>{page.body}</Markdown> : null}

        <h2 style={{marginTop: '3rem', fontSize: 25, letterSpacing: '-0.028em'}}>
          Everything, by section
        </h2>

        {groups.map((group) => (
          <section key={group.title}>
            <h3 style={{marginTop: '2rem', fontSize: 18.5}}>{group.title}</h3>
            <div className="card-grid">
              {group.items
                .filter((item) => item.href !== '')
                .map((item) => (
                  <Link className="doc-card" key={item.href} href={`/docs/${item.href}`}>
                    <div className="doc-card__title">{item.frontmatter.title}</div>
                    <div className="doc-card__desc">{item.frontmatter.description}</div>
                  </Link>
                ))}
            </div>
          </section>
        ))}
      </article>

      <Toc headings={page?.headings ?? []} />
    </div>
  )
}
