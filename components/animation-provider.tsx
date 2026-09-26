'use client'

import { useEffect } from 'react'

/* ═══════════════════════════════════════════════════════════════════════════════
   B.S. HITECH — Optimised Animation Engine v2
   
   Architecture:
   ─ ONE IntersectionObserver for all scroll-reveals (zero scroll listeners)
   ─ ONE scroll listener for navbar only (passive, rAF-throttled)
   ─ data-reveal attribute system (not class injection) — easier to reason about
   ─ Cursor sparkle on a canvas (desktop only, fine pointer, no reduced-motion)
   ─ Fully cleaned up on unmount
   
   Performance rules followed:
   ─ Only opacity + translate3d animated (compositor-only, no layout/paint)
   ─ scale only on enter, then removed — no ongoing scale animations
   ─ No will-change on bulk elements (only canvas gets it via CSS)
   ─ No continuous RAF loops except the sparkle canvas (desktop only)
   ─ IntersectionObserver unobserves each element after reveal (fire-once)
   ─ Passive event listeners throughout
═══════════════════════════════════════════════════════════════════════════════ */

/* ─── Target map ────────────────────────────────────────────────────────────────
   Each entry: [CSS selector, reveal-type, stagger-child-selector | null]
   reveal-type maps to data-reveal attribute values:
     ''      → up (default, translateY)
     'left'  → slide from left
     'right' → slide from right
     'scale' → up + subtle scale
     'img'   → image specific (subtle scale + up)
     'fade'  → opacity only
──────────────────────────────────────────────────────────────────────────────── */

type RevealType = '' | 'left' | 'right' | 'scale' | 'img' | 'fade'

interface RevealTarget {
  selector: string
  type: RevealType
  /** If set, children matching this sub-selector get stagger delays */
  staggerChildren?: string
}

const REVEAL_TARGETS: RevealTarget[] = [
  // ── About ──────────────────────────────────────────────────────────────────
  { selector: '#about .about-story',          type: 'left' },
  { selector: '#about .about-composition',    type: 'img' },
  { selector: '#about .about-stats',          type: '',
    staggerChildren: '> div' },
  { selector: '#about .value-grid',           type: 'scale',
    staggerChildren: '.value-card' },

  // ── Project Overview ────────────────────────────────────────────────────────
  { selector: '#overview .project-heading-row', type: '' },
  { selector: '#overview .project-visual',      type: 'img' },
  { selector: '#overview .project-copy',        type: 'right' },

  // ── Amenities marquee ───────────────────────────────────────────────────────
  { selector: '.home-amenities-marquee',       type: 'fade' },

  // ── Stats band ──────────────────────────────────────────────────────────────
  { selector: '.stats-band',                  type: '' },

  // ── Why Choose ──────────────────────────────────────────────────────────────
  { selector: '#why-choose .why-heading-block', type: '' },
  { selector: '#why-choose .why-cards-grid',    type: 'scale',
    staggerChildren: '.why-ref-card' },
  { selector: '#why-choose .why-trust',         type: 'fade' },

  // ── Project Brand Strip ─────────────────────────────────────────────────────
  { selector: '.project-brand-strip',          type: 'fade' },

  // ── Amenities Showcase ──────────────────────────────────────────────────────
  { selector: '#amenities .amenities-heading', type: '' },
  { selector: '#amenities .amenities-layout',  type: '',
    staggerChildren: '.amenity-card' },
  { selector: '#amenities .amenities-building', type: 'img' },
  { selector: '#amenities .amenities-strip',   type: 'fade' },

  // ── Testimonials ────────────────────────────────────────────────────────────
  { selector: '.testimonials-editorial .testimonials-heading', type: '' },
  { selector: '.testimonials-editorial .testimonials-building', type: 'img' },
  { selector: '.testimonials-editorial .testimonial-stage',     type: 'scale' },
  { selector: '.testimonials-editorial .testimonial-trust',     type: 'fade' },

  // ── FAQ ─────────────────────────────────────────────────────────────────────
  { selector: '.faq-editorial .faq-building',         type: 'img' },
  { selector: '.faq-editorial .faq-heading',          type: '' },
  { selector: '.faq-editorial .faq-trust',            type: 'scale',
    staggerChildren: '> div' },
  { selector: '.faq-editorial .faq-category-nav-wrapper', type: '' },
  { selector: '.faq-editorial .faq-main-cta-card',    type: 'scale' },

  // ── Contact ─────────────────────────────────────────────────────────────────
  { selector: '#contact .contact-heading',    type: '' },
  { selector: '#contact .contact-grid',       type: 'scale',
    staggerChildren: '> *' },
  { selector: '#contact .contact-image-col', type: 'img' },

  // ── Location ────────────────────────────────────────────────────────────────
  { selector: '.location-editorial .location-heading',     type: '' },
  { selector: '.location-editorial .location-map-landscape', type: 'img' },

  // ── Floor Plans (when on dedicated page) ────────────────────────────────────
  { selector: '.floorplans-premium .floor-heading', type: '' },
  { selector: '.floorplans-premium .floor-visual',  type: 'img' },
  { selector: '.floorplans-premium .floor-copy',    type: 'right' },

  // ── Payment Plan ────────────────────────────────────────────────────────────
  { selector: '.payment-premium .payment-heading',      type: '' },
  { selector: '.payment-premium .payment-building-col', type: 'img' },
  { selector: '.payment-premium .payment-main-row',     type: 'right' },

  // ── Footer ──────────────────────────────────────────────────────────────────
  { selector: 'footer.footer-premium',       type: '' },
]

export function AnimationProvider() {
  /* ── 1. SCROLL-REVEAL + NAVBAR ─────────────────────────────────────────────── */
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    /* ── Navbar scroll effect (one passive listener, rAF-throttled) ── */
    const nav = document.querySelector<HTMLElement>('.main-nav')
    let rafPending = false

    const onScroll = () => {
      if (rafPending) return
      rafPending = true
      requestAnimationFrame(() => {
        if (nav) {
          nav.classList.toggle('scrolled', window.scrollY > 60)
        }
        rafPending = false
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    /* ── Scroll-reveal (IntersectionObserver only, no scroll handler) ── */
    if (!prefersReduced) {
      /* Mark each target with data-reveal and optional stagger children */
      REVEAL_TARGETS.forEach(({ selector, type, staggerChildren }) => {
        const els = document.querySelectorAll<HTMLElement>(selector)
        els.forEach((el) => {
          // Skip if already marked (in case component re-mounts)
          if (el.hasAttribute('data-reveal')) return

          el.setAttribute('data-reveal', type)

          // Stagger immediate children
          if (staggerChildren) {
            // Prefix bare child combinators (e.g. "> div") with ":scope"
            // so they work correctly on element.querySelectorAll()
            const scopedSelector = staggerChildren.startsWith('>')
              ? `:scope ${staggerChildren}`
              : staggerChildren
            const children = el.querySelectorAll<HTMLElement>(scopedSelector)
            children.forEach((child, i) => {
              // Cap at 6 to avoid very long delays
              child.setAttribute('data-delay', String(Math.min(i + 1, 6)))
            })
          }
        })
      })

      /* Single observer for every [data-reveal] element */
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible')
              observer.unobserve(entry.target)
            }
          })
        },
        {
          root: null,
          // Trigger when 10% of element enters viewport
          threshold: 0.10,
          // Start slightly before element is fully in view
          rootMargin: '0px 0px -5% 0px',
        }
      )

      // Observe all marked elements
      document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el))

      return () => {
        observer.disconnect()
        window.removeEventListener('scroll', onScroll)
      }
    }

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  /* ── 2. CURSOR SPARKLE (desktop + fine pointer + no reduced-motion) ────────── */
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches

    if (prefersReduced || !hasFinePointer) return

    /* Canvas setup */
    const canvas = document.createElement('canvas')
    canvas.id = 'cursor-sparkle-canvas'
    canvas.setAttribute('aria-hidden', 'true')
    document.body.appendChild(canvas)

    const ctx = canvas.getContext('2d', { alpha: true })!

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = window.innerWidth + 'px'
      canvas.style.height = window.innerHeight + 'px'
      ctx.scale(dpr, dpr)
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    /* Particle pool — fixed-size array, no Array.shift() (costly) */
    const MAX = 24
    const pool = new Array(MAX).fill(null).map(() => ({
      x: 0, y: 0, vx: 0, vy: 0,
      life: 0, maxLife: 0, size: 0, hue: 0, alive: false,
    }))
    let poolIdx = 0

    let mouseX = -500, mouseY = -500
    let lastX = -500, lastY = -500
    let moved = 0
    let rafId = 0
    let frameTick = 0

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })

    // Gold/amber hues
    const HUES = [42, 45, 48, 52, 38]

    const spawn = () => {
      const p = pool[poolIdx % MAX]
      poolIdx++
      const angle = Math.random() * Math.PI * 2
      const speed = 0.3 + Math.random() * 0.9
      p.x = mouseX + (Math.random() - 0.5) * 8
      p.y = mouseY + (Math.random() - 0.5) * 8
      p.vx = Math.cos(angle) * speed
      p.vy = Math.sin(angle) * speed - 0.35
      p.life = 0
      p.maxLife = 22 + Math.floor(Math.random() * 16)
      p.size = 1 + Math.random() * 2
      p.hue = HUES[Math.floor(Math.random() * HUES.length)]
      p.alive = true
    }

    const loop = () => {
      rafId = requestAnimationFrame(loop)
      frameTick++

      // Only spawn every 2 frames to halve GPU work
      const dx = mouseX - lastX
      const dy = mouseY - lastY
      moved = dx * dx + dy * dy // squared distance (no sqrt needed)
      lastX = mouseX
      lastY = mouseY

      // Spawn if cursor moved enough
      if (moved > 9 && frameTick % 2 === 0) {
        spawn()
        if (moved > 100) spawn() // fast move → extra sparkle
      }

      // Draw
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let i = 0; i < MAX; i++) {
        const p = pool[i]
        if (!p.alive) continue

        p.life++
        if (p.life >= p.maxLife) { p.alive = false; continue }

        p.x += p.vx
        p.y += p.vy
        p.vy += 0.025   // gentle gravity
        p.vx *= 0.96

        const progress = p.life / p.maxLife
        const alpha = (1 - progress) * 0.75
        const sz = p.size * (1 - progress * 0.45)

        ctx.globalAlpha = alpha
        ctx.fillStyle = `hsl(${p.hue}, 82%, 68%)`
        ctx.beginPath()
        ctx.arc(p.x, p.y, sz, 0, 6.2832)
        ctx.fill()

        // Tiny cross-shine on larger particles only
        if (sz > 1.6) {
          ctx.globalAlpha = alpha * 0.4
          ctx.strokeStyle = `hsl(${p.hue}, 60%, 92%)`
          ctx.lineWidth = 0.5
          const arm = sz * 1.6
          ctx.beginPath()
          ctx.moveTo(p.x - arm, p.y); ctx.lineTo(p.x + arm, p.y)
          ctx.moveTo(p.x, p.y - arm); ctx.lineTo(p.x, p.y + arm)
          ctx.stroke()
        }
      }
      ctx.globalAlpha = 1
    }

    rafId = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', resize)
      canvas.remove()
    }
  }, [])

  return null
}
