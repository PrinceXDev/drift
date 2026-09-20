'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {useEffect, useState} from 'react'

import type {Heading, NavGroup} from '@/lib/docs'

export function Sidebar({groups}: {groups: NavGroup[]}) {
  const pathname = usePathname()

  return (
    <nav className="docs__sidebar" aria-label="Documentation">
      {groups.map((group) => (
        <div className="nav-group" key={group.title}>
          <span className="nav-group__title">{group.title}</span>
          <ul>
            {group.items.map((item) => {
              const href = item.href ? `/docs/${item.href}` : '/docs'
              return (
                <li key={href}>
                  <Link className="nav-link" href={href} data-active={pathname === href}>
                    {item.frontmatter.title}
                    {item.frontmatter.status === 'planned' ? (
                      <span className="nav-link__badge">planned</span>
                    ) : null}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </nav>
  )
}

/**
 * On this page, with scroll spy.
 *
 * IntersectionObserver rather than a scroll listener: it fires only when a
 * heading actually crosses the band, costs nothing while the reader is still,
 * and does not need throttling. The band is the top third of the viewport, so
 * the highlighted entry is the section being read rather than the one just
 * leaving.
 */
export function Toc({headings}: {headings: Heading[]}) {
  const [active, setActive] = useState<string>(headings[0]?.id ?? '')

  useEffect(() => {
    if (headings.length === 0) return

    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((element): element is HTMLElement => element !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]?.target.id) setActive(visible[0].target.id)
      },
      {rootMargin: '-80px 0px -66% 0px', threshold: 0},
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [headings])

  if (headings.length < 2) return <div className="toc" />

  return (
    <aside className="toc" aria-label="On this page">
      <div className="toc__title">On this page</div>
      <ul>
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              data-depth={heading.depth}
              data-active={active === heading.id}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  )
}
