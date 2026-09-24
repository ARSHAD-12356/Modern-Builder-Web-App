'use client'

import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Header } from '@/components/site'

const projectSlides = [
  { image: '/New Assets/Hero Building.png', title: 'Live Better. Live Brighter.', text: 'Premium residences crafted for modern living in Patna.' },
  { image: '/New Assets/Hero Building2.png', title: 'Designed For A Brighter Life.', text: 'Thoughtful architecture, refined spaces, and everyday comfort.' },
  { image: '/New Assets/Hero Building3.png', title: 'A Better Way To Come Home.', text: 'Elegant residences shaped around the way you want to live.' },
  { image: '/New Assets/Hero Building4.png', title: 'Your View Of Modern Living.', text: 'Discover a premium address made for meaningful moments.' },
]

export function ProjectsPage() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => setActive((current) => (current + 1) % projectSlides.length), 7000)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    const next = new Image()
    next.src = projectSlides[(active + 1) % projectSlides.length].image
  }, [active])

  const slide = projectSlides[active]

  return <main className="projects-showcase">
    <Header projectPage />
    <link rel="preload" as="image" href={projectSlides[0].image} />
    <div className="projects-showcase-media" aria-hidden="true">
      {projectSlides.map((item, index) => <div key={item.image} className={`projects-showcase-slide ${index === active ? 'is-active' : ''}`}><img src={item.image} alt="" loading={index === 0 ? 'eager' : 'lazy'} fetchPriority={index === 0 ? 'high' : 'auto'} /></div>)}
    </div>
    <div className="projects-showcase-shade" />
    <div className="projects-showcase-copy" key={slide.image}>
      <span className="projects-showcase-eyebrow">BIGRAHPURM DEVELOPERS</span>
      <h1>{slide.title}</h1>
      <p>{slide.text}</p>
      <a href="/#contact">Explore Project <ArrowRight size={16} /></a>
    </div>
    <div className="projects-showcase-meta"><span>Premium residences in Patna</span><span>Scroll to explore <b>↓</b></span></div>
    <div className="projects-showcase-controls" aria-label="Project slides">
      <span>{String(active + 1).padStart(2, '0')} <i /> {String(projectSlides.length).padStart(2, '0')}</span>
      <div className="projects-showcase-progress"><span key={active} /></div>
    </div>
  </main>
}