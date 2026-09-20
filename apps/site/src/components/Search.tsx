'use client'

import {useRouter} from 'next/navigation'
import {useCallback, useEffect, useMemo, useRef, useState} from 'react'

import type {SearchEntry} from '@/lib/docs'

/**
 * Search, entirely in the browser.
 *
 * The whole corpus is a few dozen pages, so it ships with the page and is
 * scored in memory. No index service, no network round trip per keystroke, and
 * it works with the laptop lid shut on a train — which is where people read
 * documentation.
 *
 * Scoring is a small weighted sum rather than anything clever: a term in the
 * title is worth more than a term in a heading, which is worth more than a term
 * in the body. Every term must appear somewhere, so multi-word queries narrow
 * rather than widen.
 */
type Scored = {entry: SearchEntry; score: number}

function score(entry: SearchEntry, terms: string[]): number {
  const title = entry.title.toLowerCase()
  const headings = entry.headings.join(' \n ').toLowerCase()
  const description = entry.description.toLowerCase()
  const text = entry.text.toLowerCase()

  let total = 0
  for (const term of terms) {
    let termScore = 0
    if (title === term) termScore += 60
    if (title.includes(term)) termScore += 30
    if (title.startsWith(term)) termScore += 10
    if (headings.includes(term)) termScore += 12
    if (description.includes(term)) termScore += 8
    if (text.includes(term)) termScore += 4
    // Every term has to land somewhere, or the page is not a match at all.
    if (termScore === 0) return 0
    total += termScore
  }
  return total
}

export function Search({index}: {index: SearchEntry[]}) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [cursor, setCursor] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const results = useMemo<Scored[]>(() => {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean)
    if (terms.length === 0) {
      return index.slice(0, 8).map((entry) => ({entry, score: 0}))
    }
    return index
      .map((entry) => ({entry, score: score(entry, terms)}))
      .filter((hit) => hit.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 12)
  }, [index, query])

  const go = useCallback(
    (entry: SearchEntry) => {
      setOpen(false)
      setQuery('')
      router.push(entry.href ? `/docs/${entry.href}` : '/docs')
    },
    [router],
  )

  // ⌘K / Ctrl-K to open, / to open when not already typing, Escape to close.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const typing =
        event.target instanceof HTMLElement &&
        ['INPUT', 'TEXTAREA'].includes(event.target.tagName)

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOpen((value) => !value)
        return
      }
      if (event.key === '/' && !typing && !open) {
        event.preventDefault()
        setOpen(true)
        return
      }
      if (event.key === 'Escape' && open) setOpen(false)
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    if (open) {
      setCursor(0)
      // The input is mounted in the same commit; focusing on the next frame
      // avoids losing it to the overlay animation.
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  const onInputKey = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setCursor((value) => Math.min(value + 1, results.length - 1))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setCursor((value) => Math.max(value - 1, 0))
    } else if (event.key === 'Enter') {
      const hit = results[cursor]
      if (hit) go(hit.entry)
    }
  }

  return (
    <>
      <button type="button" className="search-trigger" onClick={() => setOpen(true)}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="11" cy="11" r="7" />
          <path strokeLinecap="round" d="m20 20-3.5-3.5" />
        </svg>
        <span>Search the docs</span>
        <kbd>⌘K</kbd>
      </button>

      {open ? (
        <div
          className="search-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Search documentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpen(false)
          }}
        >
          <div className="search-panel">
            <div className="search-panel__input">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="11" cy="11" r="7" />
                <path strokeLinecap="round" d="m20 20-3.5-3.5" />
              </svg>
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value)
                  setCursor(0)
                }}
                onKeyDown={onInputKey}
                placeholder="Search claims, gates, routes, decisions…"
                aria-label="Search query"
              />
              <kbd style={{fontSize: 11, color: 'var(--fg-faint)'}}>esc</kbd>
            </div>

            <div className="search-results">
              {results.length === 0 ? (
                <p className="search-empty">
                  Nothing matches “{query}”. Try <code>blast radius</code>, <code>gate</code> or{' '}
                  <code>lineage</code>.
                </p>
              ) : (
                results.map((hit, position) => (
                  <a
                    key={hit.entry.href || 'index'}
                    className="search-result"
                    data-active={position === cursor}
                    href={hit.entry.href ? `/docs/${hit.entry.href}` : '/docs'}
                    onMouseEnter={() => setCursor(position)}
                    onClick={(event) => {
                      event.preventDefault()
                      go(hit.entry)
                    }}
                  >
                    <span className="search-result__group">{hit.entry.group}</span>
                    <div className="search-result__title">{hit.entry.title}</div>
                    <div className="search-result__desc">{hit.entry.description}</div>
                  </a>
                ))
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
