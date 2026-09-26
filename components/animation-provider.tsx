'use client'

import { useEffect } from 'react'

/* ─────────────────────────────────────────────────────────────────────────────
   B.S. HITECH — Premium Animation Engine
   Handles:
     1. Navbar scroll effect
     2. Scroll-reveal (Intersection Observer)
     3. Image-first sequential reveal
     4. Cursor sparkle effect (desktop only)
   No external libraries — pure vanilla JS/CSS classes
───────────────────────────────────────────────────────────────────────────── */

export function AnimationProvider() {
  useEffect(() => {
    // Guard for reduced-motion preference
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    /* ── 1. NAVBAR SCROLL EFFECT ──────────────────────────────────────────── */
    const nav = document.querySelector('.main-nav')
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (nav) {
            if (window.scrollY > 60) {
              nav.classList.add('scrolled')
            } else {
              nav.classList.remove('scrolled')
            }
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    /* ── 2. SCROLL-REVEAL — INTERSECTION OBSERVER ─────────────────────────── */
    if (!prefersReduced) {
      // Elements to reveal (data-driven via class names on sections)
      const revealSelectors = [
        // Standard reveal elements already on the page
        '.anim-reveal',
        '.anim-reveal-left',
        '.anim-reveal-right',
        '.anim-reveal-scale',
        '.anim-fade',
        '.img-anim',
        '.section-wrapper-anim',
        '.footer-premium',
        '.stats-band',
      ]

      // Additionally, auto-inject reveal onto major sections
      // We add the class to direct children / key elements without touching markup
      const sectionsToReveal: Array<[string, string]> = [
        // [sectionSelector, animClass]
        ['#about .about-story',             'anim-reveal-left'],
        ['#about .about-composition',       'anim-reveal-right'],
        ['#about .about-stats > div',       'anim-reveal'],
        ['#overview .project-heading-row',  'anim-reveal'],
        ['#overview .project-visual',       'img-anim'],
        ['#overview .project-copy',         'anim-reveal-right'],
        ['#why-choose .why-intro',          'anim-reveal'],
        ['#why-choose .why-card',           'anim-reveal-scale'],
        ['#why-choose .why-metrics > div',  'anim-fade'],
        ['.testimonials-editorial .testimonials-heading', 'anim-reveal'],
        ['.testimonials-editorial .testimonial-stage',    'anim-reveal'],
        ['.testimonials-editorial .testimonial-trust',    'anim-fade'],
        ['.faq-editorial .faq-heading',     'anim-reveal'],
        ['.faq-editorial .faq-trust > div', 'anim-reveal'],
        ['.faq-editorial .faq-categories',  'anim-reveal-left'],
        ['.faq-editorial .faq-accordion',   'anim-reveal-right'],
        ['.faq-editorial .faq-right',       'anim-reveal-right'],
        ['.contact-editorial .contact-heading', 'anim-reveal'],
        ['.contact-editorial .contact-grid > *', 'anim-reveal-scale'],
        ['.location-editorial .location-heading', 'anim-reveal'],
        ['.location-editorial .location-map-wrap', 'img-anim'],
        ['#location .location-heading',     'anim-reveal'],
        ['#location .location-map',         'img-anim'],
        ['#location .location-copy',        'anim-reveal-right'],
        ['.home-amenities-marquee',         'anim-fade'],
        ['#contact .contact-heading',       'anim-reveal'],
        ['#contact .contact-grid',          'anim-reveal'],
        ['.payment-premium .payment-heading', 'anim-reveal'],
        ['.floorplans-premium .floor-heading', 'anim-reveal'],
        ['.floorplans-premium .floor-main',   'anim-reveal'],
        ['.amenities-showcase .amenities-heading', 'anim-reveal'],
        ['.amenities-showcase .amenities-layout',  'anim-reveal'],
        ['footer.footer-premium',           'footer-premium'],
        ['.stats-band',                     'stats-band'],
        ['.about-stats',                    'anim-reveal'],
      ]

      // Inject class only if not already present
      sectionsToReveal.forEach(([selector, cls]) => {
        const els = document.querySelectorAll(selector)
        els.forEach((el) => {
          if (!el.classList.contains(cls)) {
            el.classList.add(cls)
          }
        })
      })

      // Stagger child cards
      const cardStaggerSelectors = [
        '#why-choose .why-card',
        '#about .value-card',
        '.highlight-grid .highlight-card',
        '.amenities-showcase .amenity-card',
        '.testimonials-editorial .testimonial-side',
      ]

      cardStaggerSelectors.forEach((selector) => {
        const cards = document.querySelectorAll(selector)
        cards.forEach((card, i) => {
          const delayClass = `anim-d${Math.min(i + 1, 8)}`
          card.classList.add(delayClass)
        })
      })

      // Observer config
      const observerOptions: IntersectionObserverInit = {
        root: null,
        rootMargin: '0px 0px -8% 0px',
        threshold: 0.08,
      }

      const revealCallback: IntersectionObserverCallback = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target) // fire once only
          }
        })
      }

      const observer = new IntersectionObserver(revealCallback, observerOptions)

      // Observe all elements with our reveal classes
      const allRevealEls = document.querySelectorAll(revealSelectors.join(', '))
      allRevealEls.forEach((el) => observer.observe(el))

      // Cleanup
      return () => {
        observer.disconnect()
        window.removeEventListener('scroll', handleScroll)
      }
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  /* ── 3. CURSOR SPARKLE ──────────────────────────────────────────────────── */
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const hasPointer = window.matchMedia('(pointer: fine)').matches

    // Only on desktop (fine pointer), not touch, not reduced motion
    if (prefersReduced || !hasPointer) return

    const canvas = document.createElement('canvas')
    canvas.id = 'cursor-sparkle-canvas'
    canvas.setAttribute('aria-hidden', 'true')
    document.body.appendChild(canvas)
    const ctx = canvas.getContext('2d')!

    let raf: number
    let mouseX = -200
    let mouseY = -200

    // Particle pool
    interface Particle {
      x: number
      y: number
      vx: number
      vy: number
      life: number
      maxLife: number
      size: number
      hue: number
      alpha: number
    }

    const particles: Particle[] = []
    const MAX_PARTICLES = 38

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resize()
    window.addEventListener('resize', resize, { passive: true })

    let lastX = mouseX
    let lastY = mouseY
    let spawnThrottle = 0

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })

    const GOLD_HUES = [42, 46, 50, 38, 55] // gold/amber range
    const WHITE_CHANCE = 0.25 // 25% sparkles are white-ish

    const spawnParticle = () => {
      if (particles.length >= MAX_PARTICLES) {
        // Overwrite the oldest
        particles.shift()
      }
      const spread = 10
      const angle = Math.random() * Math.PI * 2
      const speed = 0.4 + Math.random() * 1.1
      const hue = Math.random() < WHITE_CHANCE ? 50 : GOLD_HUES[Math.floor(Math.random() * GOLD_HUES.length)]
      const saturation = Math.random() < WHITE_CHANCE ? 10 : 88
      particles.push({
        x: mouseX + (Math.random() - 0.5) * spread,
        y: mouseY + (Math.random() - 0.5) * spread,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.4, // slight upward drift
        life: 0,
        maxLife: 28 + Math.floor(Math.random() * 18),
        size: 1.1 + Math.random() * 2.2,
        hue,
        alpha: saturation,
      })
    }

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Spawn when mouse moved
      const dx = mouseX - lastX
      const dy = mouseY - lastY
      const moved = Math.hypot(dx, dy)
      spawnThrottle++

      if (moved > 2 && spawnThrottle >= 2) {
        spawnParticle()
        if (moved > 8) spawnParticle() // extra on fast move
        spawnThrottle = 0
      }

      lastX = mouseX
      lastY = mouseY

      // Update + draw
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.life++
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.03 // slight gravity
        p.vx *= 0.97

        const progress = p.life / p.maxLife
        const alpha = (1 - progress) * 0.8
        const size = p.size * (1 - progress * 0.5)

        if (p.life >= p.maxLife) {
          particles.splice(i, 1)
          continue
        }

        ctx.save()
        ctx.globalAlpha = alpha
        // Gold/white sparkle dot
        const sat = p.alpha // reused as saturation
        ctx.fillStyle = `hsl(${p.hue}, ${sat}%, ${sat > 30 ? 72 : 96}%)`
        ctx.beginPath()
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2)
        ctx.fill()

        // Tiny crosshair shine on larger particles
        if (size > 1.8) {
          ctx.strokeStyle = `hsla(${p.hue}, ${sat}%, 96%, ${alpha * 0.55})`
          ctx.lineWidth = 0.6
          ctx.beginPath()
          ctx.moveTo(p.x - size * 1.8, p.y)
          ctx.lineTo(p.x + size * 1.8, p.y)
          ctx.moveTo(p.x, p.y - size * 1.8)
          ctx.lineTo(p.x, p.y + size * 1.8)
          ctx.stroke()
        }

        ctx.restore()
      }

      raf = requestAnimationFrame(loop)
    }

    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', resize)
      canvas.remove()
    }
  }, [])

  return null
}
