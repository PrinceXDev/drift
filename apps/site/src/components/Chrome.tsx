'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {useCallback, useEffect, useState} from 'react'

import {Search} from './Search'
import type {SearchEntry} from '@/lib/docs'

/** The DRIFT mark: a claim, and the moment it moved. */
export function Mark({className}: {className?: string}) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="6" cy="12" r="3" fill="var(--verified)" />
      <path
        d="M9 12h6"
        stroke="var(--fg-faint)"
        strokeWidth="1.5"
        strokeDasharray="2 2.5"
        strokeLinecap="round"
      />
      <circle cx="18" cy="12" r="3" fill="var(--signal)" />
    </svg>
  )
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <circle cx="12" cy="12" r="4" />
      <path strokeLinecap="round" d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path strokeLinejoin="round" d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.8 6.8 0 0 0 10.5 10.5Z" />
    </svg>
  )
}

function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    const stored = document.documentElement.getAttribute('data-theme')
    if (stored === 'light') setTheme('light')
  }, [])

  const toggle = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    try {
      localStorage.setItem('drift-theme', next)
    } catch {
      // Private browsing, blocked storage. The toggle still works for this
      // page view; it simply will not be remembered.
    }
  }, [theme])

  return (
    <button
      type="button"
      className="icon-btn"
      onClick={toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}

function MenuIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  )
}

const NAV = [
  {href: '/docs', label: 'Docs'},
  {href: '/docs/concepts/time-dimension', label: 'Concepts'},
  {href: '/docs/api/http', label: 'API'},
  {href: '/docs/operations/build-log', label: 'Build log'},
] as const

export const REPO_URL = 'https://github.com/PrinceXDev/drift'

export function Masthead({index}: {index: SearchEntry[]}) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <>
      <header className="masthead">
        <Link href="/" className="masthead__brand">
          <Mark className="masthead__mark" />
          DRIFT
        </Link>

        <nav className="masthead__nav">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} data-active={pathname === item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="masthead__spacer" />

        <div className="masthead__tools">
          <Search index={index} />
          <ThemeToggle />
          <a
            className="icon-btn"
            href={REPO_URL}
            aria-label="DRIFT on GitHub"
            title="DRIFT on GitHub"
            rel="noreferrer noopener"
            target="_blank"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.26-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.39.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
            </svg>
          </a>
          <button
            type="button"
            className="icon-btn masthead__menu"
            onClick={() => setOpen((value) => !value)}
            aria-label="Menu"
            aria-expanded={open}
          >
            <MenuIcon />
          </button>
        </div>
      </header>

      {open ? (
        <nav className="mobile-nav" onClick={() => setOpen(false)}>
          {NAV.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </>
  )
}

/**
 * Applies the stored theme before first paint.
 *
 * Inlined as a blocking script in the document head on purpose: doing it in an
 * effect means a light-theme reader gets a full dark frame first, which is the
 * kind of detail that separates a site somebody trusts from one they do not.
 */
export const themeScript = `(function(){try{var t=localStorage.getItem('drift-theme');if(t==='light'){document.documentElement.setAttribute('data-theme','light')}}catch(e){}})()`
