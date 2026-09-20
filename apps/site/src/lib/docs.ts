import {readdir, readFile} from 'node:fs/promises'
import path from 'node:path'

/**
 * The docs content layer.
 *
 * Pages are plain Markdown on disk under `src/content/docs`, read at build time
 * and rendered statically. Headings are extracted from the same source the page
 * renders from rather than maintained in a parallel manifest — a table of
 * contents that has to be remembered is a table of contents that goes out of
 * date, which is a bad look in this particular repository.
 */

export const CONTENT_ROOT = path.join(process.cwd(), 'src', 'content', 'docs')

export type Frontmatter = {
  title: string
  description?: string
  group?: string
  order?: number
  updated?: string
  /** Rendered as a coloured pill beside the page title. */
  status?: 'stable' | 'beta' | 'planned' | 'verified'
}

export type Heading = {
  /** 2 for `##`, 3 for `###`. `#` is the page title and is never listed. */
  depth: 2 | 3
  text: string
  id: string
}

export type DocPage = {
  slug: string[]
  /** `concepts/claims`, or `''` for the docs index. */
  href: string
  frontmatter: Frontmatter
  headings: Heading[]
  body: string
}

export type DocSummary = Omit<DocPage, 'body'>

/** Group ordering. Anything not named here sorts to the end, alphabetically. */
export const GROUP_ORDER = [
  'Start here',
  'Concepts',
  'Content model',
  'The engine',
  'API',
  'Sanity integration',
  'Applications',
  'Operations',
  'Decisions',
  'Reference',
] as const

// ---------------------------------------------------------------------------
// Frontmatter
// ---------------------------------------------------------------------------

/**
 * A deliberately small YAML subset: `key: value` lines between `---` fences.
 * Nothing in these docs needs nesting, and a full YAML parser would be a
 * dependency bought to solve a problem nobody has.
 */
function parseFrontmatter(raw: string): {frontmatter: Frontmatter; body: string} {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw)
  if (!match) return {frontmatter: {title: 'Untitled'}, body: raw}

  const fields: Record<string, string> = {}
  for (const line of (match[1] ?? '').split(/\r?\n/)) {
    const pair = /^([A-Za-z][\w-]*):\s*(.*)$/.exec(line.trim())
    if (!pair) continue
    const key = pair[1] as string
    fields[key] = (pair[2] ?? '').replace(/^['"]|['"]$/g, '')
  }

  const frontmatter: Frontmatter = {title: fields.title ?? 'Untitled'}
  if (fields.description) frontmatter.description = fields.description
  if (fields.group) frontmatter.group = fields.group
  if (fields.order) frontmatter.order = Number(fields.order)
  if (fields.updated) frontmatter.updated = fields.updated
  if (fields.status) frontmatter.status = fields.status as NonNullable<Frontmatter['status']>

  return {frontmatter, body: raw.slice(match[0].length)}
}

// ---------------------------------------------------------------------------
// Headings
// ---------------------------------------------------------------------------

/**
 * `rehype-slug` generates the ids in the rendered page; this has to produce the
 * same string for the in-page nav to link to anything. Both are
 * `github-slugger` semantics: lowercase, strip punctuation, spaces to hyphens.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[`*_~]/g, '')
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .trim()
    .replace(/\s+/g, '-')
}

/** Strips inline markdown so a heading reads the same in the TOC as on the page. */
function plain(text: string): string {
  return text
    .replace(/`([^`]*)`/g, '$1')
    .replace(/\*\*([^*]*)\*\*/g, '$1')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .trim()
}

function extractHeadings(body: string): Heading[] {
  const headings: Heading[] = []
  let inFence = false

  for (const line of body.split(/\r?\n/)) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence
      continue
    }
    if (inFence) continue

    const match = /^(#{2,3})\s+(.*)$/.exec(line)
    if (!match) continue

    const text = plain(match[2] ?? '')
    headings.push({depth: (match[1] ?? '##').length as 2 | 3, text, id: slugify(text)})
  }

  return headings
}

// ---------------------------------------------------------------------------
// Loading
// ---------------------------------------------------------------------------

async function walk(dir: string): Promise<string[]> {
  const entries = await readdir(dir, {withFileTypes: true})
  const files = await Promise.all(
    entries.map(async (entry) => {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) return walk(full)
      return entry.name.endsWith('.md') ? [full] : []
    }),
  )
  return files.flat()
}

/**
 * Parsed pages are cached for the life of the process in production, where the
 * content is fixed at build time. In development the cache is skipped, because
 * a documentation site that needs restarting to notice a new page is a
 * documentation site nobody keeps up to date.
 */
let cache: DocPage[] | null = null

export async function allDocs(): Promise<DocPage[]> {
  if (cache && process.env.NODE_ENV === 'production') return cache

  const files = await walk(CONTENT_ROOT)
  const pages = await Promise.all(
    files.map(async (file): Promise<DocPage> => {
      const raw = await readFile(file, 'utf8')
      const {frontmatter, body} = parseFrontmatter(raw)
      // `index.md` inside a folder is that folder's page, so `decisions/index.md`
      // is served at `/docs/decisions` rather than at a path nobody would guess.
      const rel = path
        .relative(CONTENT_ROOT, file)
        .replace(/\\/g, '/')
        .replace(/\.md$/, '')
        .replace(/(^|\/)index$/, '')
      const slug = rel === '' ? [] : rel.split('/')
      return {slug, href: slug.join('/'), frontmatter, headings: extractHeadings(body), body}
    }),
  )

  cache = pages.sort((a, b) => (a.frontmatter.order ?? 999) - (b.frontmatter.order ?? 999))
  return cache
}

export async function docBySlug(slug: string[]): Promise<DocPage | undefined> {
  const pages = await allDocs()
  const href = slug.join('/')
  return pages.find((page) => page.href === href)
}

export type NavGroup = {title: string; items: DocSummary[]}

/** The sidebar: groups in `GROUP_ORDER`, pages in frontmatter `order`. */
export async function navigation(): Promise<NavGroup[]> {
  const pages = await allDocs()
  const groups = new Map<string, DocSummary[]>()

  for (const page of pages) {
    const group = page.frontmatter.group ?? 'Reference'
    const {body: _body, ...summary} = page
    const bucket = groups.get(group)
    if (bucket) bucket.push(summary)
    else groups.set(group, [summary])
  }

  const rank = (title: string) => {
    const index = (GROUP_ORDER as readonly string[]).indexOf(title)
    return index === -1 ? GROUP_ORDER.length : index
  }

  return [...groups.entries()]
    .map(([title, items]) => ({title, items}))
    .sort((a, b) => rank(a.title) - rank(b.title) || a.title.localeCompare(b.title))
}

/** Previous / next across the flattened sidebar order. */
export async function neighbours(
  href: string,
): Promise<{previous?: DocSummary; next?: DocSummary}> {
  const flat = (await navigation()).flatMap((group) => group.items)
  const index = flat.findIndex((item) => item.href === href)
  if (index === -1) return {}

  const previous = index > 0 ? flat[index - 1] : undefined
  const next = index < flat.length - 1 ? flat[index + 1] : undefined
  return {...(previous ? {previous} : {}), ...(next ? {next} : {})}
}

/**
 * The client-side search index. Headings are weighted separately from body
 * text, and the body is truncated: the whole index ships to the browser, and a
 * search box that costs a megabyte is a search box nobody waits for.
 */
export type SearchEntry = {
  href: string
  title: string
  group: string
  description: string
  headings: string[]
  text: string
}

export async function searchIndex(): Promise<SearchEntry[]> {
  const pages = await allDocs()
  return pages.map((page) => ({
    href: page.href,
    title: page.frontmatter.title,
    group: page.frontmatter.group ?? 'Reference',
    description: page.frontmatter.description ?? '',
    headings: page.headings.map((heading) => heading.text),
    text: page.body
      .replace(/```[\s\S]*?```/g, ' ')
      .replace(/[#>*_`|-]/g, ' ')
      .replace(/\s+/g, ' ')
      .slice(0, 2000),
  }))
}
