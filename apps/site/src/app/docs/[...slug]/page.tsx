import type {Metadata} from 'next'
import Link from 'next/link'
import {notFound} from 'next/navigation'

import {Toc} from '@/components/DocsNav'
import {Markdown} from '@/components/Markdown'
import {allDocs, docBySlug, neighbours} from '@/lib/docs'

type Params = {slug?: string[]}

export async function generateStaticParams(): Promise<Params[]> {
  const pages = await allDocs()
  return pages.filter((page) => page.slug.length > 0).map((page) => ({slug: page.slug}))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const {slug = []} = await params
  const page = await docBySlug(slug)
  if (!page) return {}

  return {
    title: page.frontmatter.title,
    ...(page.frontmatter.description ? {description: page.frontmatter.description} : {}),
  }
}

const STATUS_TONE = {
  stable: 'verified',
  verified: 'verified',
  beta: 'caution',
  planned: 'signal',
} as const

export default async function DocPage({params}: {params: Promise<Params>}) {
  const {slug = []} = await params
  const page = await docBySlug(slug)
  if (!page) notFound()

  const {previous, next} = await neighbours(page.href)

  return (
    <div className="docs__main">
      <article className="docs__article">
        <div className="docs__crumbs">
          <Link href="/docs">Docs</Link>
          <span>/</span>
          <span>{page.frontmatter.group ?? 'Reference'}</span>
        </div>

        <div className="docs__title-row">
          <h1>{page.frontmatter.title}</h1>
          {page.frontmatter.status ? (
            <span className="pill" data-tone={STATUS_TONE[page.frontmatter.status]}>
              {page.frontmatter.status}
            </span>
          ) : null}
        </div>

        {page.frontmatter.description ? (
          <p className="docs__lede">{page.frontmatter.description}</p>
        ) : null}

        <div className="docs__meta">
          <span>{page.headings.length} sections</span>
          <span>·</span>
          <span>{Math.max(1, Math.round(page.body.split(/\s+/).length / 220))} min read</span>
          {page.frontmatter.updated ? (
            <>
              <span>·</span>
              <span>Updated {page.frontmatter.updated}</span>
            </>
          ) : null}
        </div>

        <Markdown>{page.body}</Markdown>

        <nav className="pager" aria-label="Previous and next page">
          {previous ? (
            <Link
              className="pager__card"
              data-dir="prev"
              href={previous.href ? `/docs/${previous.href}` : '/docs'}
            >
              <span className="pager__dir">← Previous</span>
              <span className="pager__title">{previous.frontmatter.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link className="pager__card" data-dir="next" href={`/docs/${next.href}`}>
              <span className="pager__dir">Next →</span>
              <span className="pager__title">{next.frontmatter.title}</span>
            </Link>
          ) : null}
        </nav>
      </article>

      <Toc headings={page.headings} />
    </div>
  )
}
