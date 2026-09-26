'use client'

import { useEffect } from 'react'

/**
 * AnimationProvider — Streamlined for maximum scrolling performance.
 * - All non-carousel scroll-reveal animations and IntersectionObserver instances removed.
 * - Cursor sparkle canvas, particle loops, and mousemove listeners removed.
 * - Simple passive scroll listener toggles navbar '.scrolled' state when window.scrollY > 60.
 */
export function AnimationProvider() {
  useEffect(() => {
    const nav = document.querySelector<HTMLElement>('.main-nav')
    if (!nav) return

    let rafPending = false
    const onScroll = () => {
      if (rafPending) return
      rafPending = true
      requestAnimationFrame(() => {
        nav.classList.toggle('scrolled', window.scrollY > 60)
        rafPending = false
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return null
}
