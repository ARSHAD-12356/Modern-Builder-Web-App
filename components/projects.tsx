'use client'

import { ArrowLeft, ArrowRight, Building2, Grid2X2, Home, MapPin, Store } from 'lucide-react'
import { Header } from '@/components/site'

const projectStats = [
  { icon: Building2, value: '04', label: 'Towers' },
  { icon: Home, value: '189', label: 'Total Flats' },
  { icon: Store, value: '16', label: 'Shops' },
  { icon: Grid2X2, value: '70', label: '2BHK Flats' },
  { icon: Grid2X2, value: '73', label: '3BHK Flats' },
  { icon: Grid2X2, value: '12', label: '1BHK Flats' },
]

export function ProjectsPage() {
  return <main className="projects-page">
    <Header projectPage />
    <section className="projects-page-hero">
      <img className="projects-page-hero-image" src="/New Assets/Hero Building.png" alt="Premium residential building at sunset" />
      <div className="projects-page-hero-shade" aria-hidden="true" />
      <div className="projects-page-hero-copy">
        <span className="projects-page-eyebrow">BIGRAHPURM DEVELOPERS</span>
        <h1>Residential &amp;<br />Commercial Projects</h1>
        <p>Thoughtful architecture, refined spaces,<br className="projects-page-desktop-break" /> and everyday comfort.</p>
      </div>
    </section>
    <section className="projects-page-intro">
      <div className="projects-page-section-heading">
        <div className="projects-page-intro-heading">
          <span className="projects-page-eyebrow">OUR PROJECTS <i aria-hidden="true" /></span>
          <h2>Featured Projects</h2>
        </div>
        <p>Discover beautifully designed residential and commercial spaces<br className="projects-page-desktop-break" /> crafted for a better tomorrow.</p>
        <div className="projects-page-card-controls" aria-label="Featured project navigation">
          <button type="button" aria-label="Previous featured project"><ArrowLeft size={19} /></button>
          <button type="button" aria-label="Next featured project"><ArrowRight size={19} /></button>
        </div>
      </div>
      <article className="featured-project-card">
        <div className="featured-project-image-wrap">
          <img src="/B.S%20HITECH%20Images/BS%20HITECH%20building.png" alt="B.S. HITECH apartment building" />
          <span className="featured-project-status"><i /> Ongoing Project</span>
        </div>
        <div className="featured-project-info">
          <h3>B.S. HITECH APARTMENT</h3>
          <p className="featured-project-location"><MapPin size={17} /> Khemni Chak, Kankarbagh, Patna - 800027</p>
          <p className="featured-project-type">2 &amp; 3 BHK Luxurious Flats</p>
          <div className="featured-project-stats">
            {projectStats.map(({ icon: Icon, value, label }) => <div className="featured-project-stat" key={label}>
              <Icon size={21} />
              <strong>{value}</strong>
              <span>{label}</span>
            </div>)}
          </div>
          <div className="featured-project-footer">
            <p>Strategically located in one of the best residential areas of Patna with easy access to schools, hospitals, shopping hubs and more. Designed for modern living with essential lifestyle amenities.</p>
            <a href="/overview">View Project Details <ArrowRight size={17} /></a>
          </div>
        </div>
      </article>
    </section>
  </main>
}