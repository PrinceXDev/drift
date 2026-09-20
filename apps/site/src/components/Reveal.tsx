'use client'

import {useEffect} from 'react'

/**
 * Scroll-linked reveals, driven by GSAP ScrollTrigger on the Lenis timeline.
 *
 * The `js-reveal` class is added from JavaScript, which means the pre-reveal
 * styles only ever apply when something is actually going to reveal them. A
 * page whose content is invisible until a script runs is a page that is blank
 * for anybody the script fails for, and that is a failure mode worth designing
 * out rather than apologising for.
 */
export function Reveal() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const root = document.documentElement
    let cleanup: (() => void) | undefined
    let cancelled = false

    void (async () => {
      const [{gsap}, {ScrollTrigger}] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ])
      if (cancelled) return

      gsap.registerPlugin(ScrollTrigger)

      if (reduced) return

      root.classList.add('js-reveal')

      const targets = gsap.utils.toArray<HTMLElement>('.reveal')
      const triggers = targets.map((target, index) =>
        ScrollTrigger.create({
          trigger: target,
          start: 'top 88%',
          once: true,
          onEnter: () => {
            // A short stagger inside a group reads as one movement rather than
            // a queue of individual animations.
            const delay = Math.min(index % 4, 3) * 70
            window.setTimeout(() => target.setAttribute('data-shown', 'true'), delay)
          },
        }),
      )

      // Anything already on screen — or already scrolled past — must not wait
      // for a scroll that will never come. Landing on `/#run`, restoring a
      // scroll position, or following a search result all start the page
      // part-way down, and a `once: true` trigger whose start is already behind
      // the viewport may never fire its onEnter. The result is a reader looking
      // at blank space above and below the section they asked for.
      const sweep = () => {
        for (const target of targets) {
          if (target.getBoundingClientRect().top < window.innerHeight) {
            target.setAttribute('data-shown', 'true')
          }
        }
      }

      ScrollTrigger.refresh()
      sweep()
      // Once more after layout settles: web fonts and the video's metadata both
      // change element positions after first paint.
      window.setTimeout(sweep, 300)

      // ScrollTrigger is normally updated from Lenis's own scroll event. Not
      // every scroll goes through Lenis: find-in-page, a restored scroll
      // position, `element.scrollIntoView` from an extension, and anything
      // driving the page from automation all move the document directly. When
      // that happens the triggers never fire and the reader is left looking at
      // a screen of invisible content — which is exactly the failure this
      // pattern is famous for. A passive native listener closes the gap.
      const onNativeScroll = () => ScrollTrigger.update()
      window.addEventListener('scroll', onNativeScroll, {passive: true})

      cleanup = () => {
        window.removeEventListener('scroll', onNativeScroll)
        triggers.forEach((trigger) => trigger.kill())
        root.classList.remove('js-reveal')
      }
    })()

    return () => {
      cancelled = true
      cleanup?.()
    }
  }, [])

  return null
}
