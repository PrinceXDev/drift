import type {Metadata, Viewport} from 'next'
import {Inter, JetBrains_Mono} from 'next/font/google'
import Link from 'next/link'

import {Masthead, Mark, REPO_URL, themeScript} from '@/components/Chrome'
import {LIVE_APPS} from '@/lib/apps'
import {searchIndex} from '@/lib/docs'

import './globals.css'
import './docs.css'
import './landing.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono-face',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://drift.local'),
  title: {
    default: 'DRIFT — a knowledge-integrity control plane',
    template: '%s · DRIFT docs',
  },
  description:
    'Your code has version control. Your beliefs don’t. DRIFT diffs successive Sanity ' +
    'Knowledge Base builds, computes the blast radius of every changed claim across ' +
    'published content, and drives the correction through a human-approved workflow.',
  openGraph: {
    title: 'DRIFT — a knowledge-integrity control plane',
    description:
      'What did this organisation stop believing — and what is still saying the old thing?',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: [
    {media: '(prefers-color-scheme: dark)', color: '#07080a'},
    {media: '(prefers-color-scheme: light)', color: '#ffffff'},
  ],
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

const CONSOLE_URL = LIVE_APPS[0]?.href ?? '#'

export default async function RootLayout({children}: {children: React.ReactNode}) {
  const index = await searchIndex()

  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{__html: themeScript}} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>

        <Masthead index={index} />

        <main id="main">{children}</main>

        <footer className="footer">
          <div className="shell">
            <div className="footer__grid">
              <div>
                <Link href="/" className="masthead__brand" style={{marginBottom: 12}}>
                  <Mark className="masthead__mark" />
                  DRIFT
                </Link>
                <p className="footer__lede">
                  A knowledge-integrity control plane built on Sanity Knowledge Bases. It does
                  not answer questions. It answers a different one.
                </p>
                {/* Docs pages have no hero, so this is the only link to the app
                    that reaches them. Kept in the footer rather than the header,
                    where it would compete with the reading. */}
                <a
                  className="footer__app"
                  href={CONSOLE_URL}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Open the Control Room ↗
                </a>
              </div>

              <div>
                <h4>Documentation</h4>
                <ul>
                  <li>
                    <Link href="/docs">Overview</Link>
                  </li>
                  <li>
                    <Link href="/docs/start/quickstart">Quickstart</Link>
                  </li>
                  <li>
                    <Link href="/docs/content-model/overview">Content model</Link>
                  </li>
                  <li>
                    <Link href="/docs/api/http">HTTP API</Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4>Mechanism</h4>
                <ul>
                  <li>
                    <Link href="/docs/concepts/blast-radius">Blast radius</Link>
                  </li>
                  <li>
                    <Link href="/docs/engine/gate">Publication gate</Link>
                  </li>
                  <li>
                    <Link href="/docs/engine/differ">The differ</Link>
                  </li>
                  <li>
                    <Link href="/docs/concepts/lineage">Claim lineage</Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4>Honesty</h4>
                <ul>
                  <li>
                    <Link href="/docs/operations/build-log">Build log</Link>
                  </li>
                  <li>
                    <Link href="/docs/decisions">Decision records</Link>
                  </li>
                  <li>
                    <Link href="/docs/operations/limits">Known limits</Link>
                  </li>
                  <li>
                    <Link href="/docs/reference/glossary">Glossary</Link>
                  </li>
                  <li>
                    <a href={REPO_URL} rel="noreferrer noopener" target="_blank">
                      Source on GitHub
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="footer__base">
              <span>Built for the Sanity Challenge, September 2026.</span>
              <span>Deterministic core · model at the edges · human at the gate.</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
