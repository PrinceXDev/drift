'use client'

import {useEffect} from 'react'

/**
 * Lenis smooth scrolling, driven by GSAP's ticker.
 *
 * Two libraries do this job and they fight if you run both: GSAP's
 * ScrollSmoother rewrites the document into a transformed wrapper, Lenis
 * intercepts wheel events and animates `window.scrollTo`. This project uses
 * Lenis — it is MIT-licensed rather than gated behind a Club GreenSock
 * membership, and it leaves the document structure alone, which matters because
 * the docs pages rely on ordinary sticky positioning and hash links.
 *
 * GSAP still does the work it is best at: ScrollTrigger drives the
 * scroll-linked animation. The two are married by three lines — Lenis raf runs
 * off `gsap.ticker`, and ScrollTrigger is told to update on every Lenis frame —
 * so there is exactly one requestAnimationFrame loop on the page and no
 * scroll-position disagreement between them.
 *
 * Mounted only on the landing page. Documentation keeps native scrolling:
 * hijacking the scroll of a page somebody is trying to read, search with
 * ctrl-F, or link into at an anchor is a cost with no matching benefit.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduced.matches) return

    let cleanup: (() => void) | undefined
    let cancelled = false

    void (async () => {
      const [{default: Lenis}, {gsap}, {ScrollTrigger}] = await Promise.all([
        import('lenis'),
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ])
      if (cancelled) return

      gsap.registerPlugin(ScrollTrigger)

      const lenis = new Lenis({
        // Long, soft glide. Anything snappier reads as jitter at 120Hz; anything
        // slower feels like the page is arguing with the wheel.
        duration: 1.05,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        // Touch devices already have momentum scrolling in the OS. Adding a
        // second one on top is the classic way to make a site feel broken on a
        // phone, so it stays off.
        syncTouch: false,
        touchMultiplier: 1.6,
      })

      lenis.on('scroll', ScrollTrigger.update)

      const raf = (time: number) => lenis.raf(time * 1000)
      gsap.ticker.add(raf)
      gsap.ticker.lagSmoothing(0)

      // Anchor links inside the landing page hand off to Lenis so the jump is
      // animated rather than instantaneous.
      const onClick = (event: MouseEvent) => {
        const anchor = (event.target as HTMLElement | null)?.closest('a[href^="#"]')
        if (!(anchor instanceof HTMLAnchorElement)) return
        const id = anchor.getAttribute('href')?.slice(1)
        if (!id) return
        const target = document.getElementById(id)
        if (!target) return
        event.preventDefault()
        lenis.scrollTo(target, {offset: -80})
      }
      document.addEventListener('click', onClick)

      cleanup = () => {
        document.removeEventListener('click', onClick)
        gsap.ticker.remove(raf)
        lenis.destroy()
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      }
    })()

    return () => {
      cancelled = true
      cleanup?.()
    }
  }, [])

  return null
}
