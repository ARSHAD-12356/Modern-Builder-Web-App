'use client'

import { useState, useEffect } from 'react'
import { ArrowRight, Building2, CarFront, ChevronLeft, ChevronRight, Dumbbell, Download, Droplets, Home, MapPin, Maximize2, ShieldCheck, Sparkles, Trees, Waves, X } from 'lucide-react'
import { PaymentPlan, ProjectBrandStrip } from './site'

const projectImages = '/B.S%20HITECH%20Images'
const plans = '/BS_Hitech_Required_Plans'

const heroSlides = [
  { src: `${projectImages}/xref_9321_p1.jpeg`, alt: 'B.S. HITECH Apartment exterior' },
  { src: '/New%20Assets/WhatsApp%20Image%202026-09-23%20at%2016.30.52.jpeg', alt: 'B.S. HITECH architectural elevation view' },
  { src: '/New%20Assets/WhatsApp%20Image%202026-09-23%20at%2016.30.56.jpeg', alt: 'B.S. HITECH society front perspective' },
  { src: '/New%20Assets/WhatsApp%20Image%202026-09-23%20at%2016.30.512.jpeg', alt: 'B.S. HITECH modern residential tower' },
  { src: '/New%20Assets/WhatsApp%20Image%202026-09-23%20at%2016.30.523.jpeg', alt: 'B.S. HITECH towers exterior' },
  { src: '/New%20Assets/WhatsApp%20Image%202026-09-23%20at%2016.30.5234.jpeg', alt: 'B.S. HITECH green landscaping and entrance' },
  { src: '/New%20Assets/WhatsApp%20Image%202026-09-23%20at%2021.38..jpeg', alt: 'B.S. HITECH premium bathroom interior' },
  { src: '/New%20Assets/WhatsApp%20Image%202026-09-23%20at%2021.38.1.jpeg', alt: 'B.S. HITECH spacious living room' },
  { src: '/New%20Assets/WhatsApp%20Image%202026-09-23%20at%2021.38.19.jpeg', alt: 'B.S. HITECH luxury bedroom interior' },
  { src: '/New%20Assets/WhatsApp%20Image%202026-09-23%20at%2021.38.21.jpeg', alt: 'B.S. HITECH master bedroom and balcony' },
  { src: '/New%20Assets/WhatsApp%20Image%202026-093%20at%2021.38.22.jpeg', alt: 'B.S. HITECH contemporary modular kitchen' },
  { src: '/New%20Assets/WhatsApp%20Image%20202609-23%20at%2021.38.23.jpeg', alt: 'B.S. HITECH dining and lounge interior' },
  { src: `${plans}/Parking-Plan_All-Towers.jpg`, alt: 'B.S. HITECH Parking Plan for all towers' },
  { src: `${plans}/Site-Plan-Landscape.jpg`, alt: 'B.S. HITECH Master Site Plan Landscape' },
  { src: '/New%20Assets/WhatsApp%20Image%202026-09-23%20at%2021.38.20.jpeg', alt: 'B.S. HITECH luxury flat interiors' },
]

const amenities = [
  ['Swimming Pool', Waves], ['Gym Facility', Dumbbell], ['Children Playing Area', Sparkles], ['Club House', Home],
  ['Temple in Campus', Building2], ['Green Garden Area', Trees], ['Fire Safety', ShieldCheck], ['Earthquake Resistant', ShieldCheck],
  ['Intercom Facility', Home], ['High Speed Elevator', Building2], ['Visitor Parking', CarFront], ['24X7 Water Supply', Droplets],
  ['24X7 Power Backup', ShieldCheck], ['Garden & Jogging Track', Trees], ['CCTV Security', ShieldCheck], ['Basketball Court', Sparkles],
  ['Badminton Court', Sparkles], ['Multipurpose Hall', Building2], ['Party Lawn', Trees], ['Guest House', Home],
  ['Landscaping & Green Area', Trees], ['Ample Car Parking', CarFront], ['Water Harvesting', Droplets], ['Indoor Game Facility', Sparkles],
] as const

const towerPlans = [
  { label: 'Tower I', title: 'TOWER - I', detail: 'Typical 1st to 6th Floor Plan', image: `${plans}/Tower-I_Floor-Plan.jpg` },
  { label: 'Tower II (EWS)', title: 'TOWER - II (EWS)', detail: 'EWS Floor Plan', image: `${plans}/Tower-II_EWS_Floor-Plan.jpg` },
  { label: 'Tower III', title: 'TOWER - III', detail: 'Typical Floor Plan', image: `${plans}/Tower-III_Floor-Plan.jpg` },
  { label: 'Tower IV', title: 'TOWER - IV', detail: '1st to 5th Floor Plan', image: `${plans}/Tower-IV_1st-to-5th-Floor-Plan.jpg` },
]

const gallery = [
  ['xref_9321_p1.jpeg', 'B.S. HITECH exterior'], ['xref_9322_p1.jpeg', 'Residential architecture'], ['xref_9323_p1.jpeg', 'Project lifestyle'],
  ['xref_3_p2.jpeg', 'Community living'], ['xref_11_p3.jpeg', 'Landscaped spaces'], ['xref_15_p4.jpeg', 'Modern amenities'],
  ['xref_2872_p13.jpeg', 'Thoughtful planning'], ['xref_2989_p14.jpeg', 'Everyday moments'],
].map(([file, alt]) => ({ src: `${projectImages}/${file}`, alt }))

const stats = [['04', 'Towers', Building2], ['189', 'Total Flats', Home], ['16', 'Shops', Building2], ['70', '2BHK Flats', Home], ['73', '3BHK Flats', Home], ['12', '1BHK Flats', Home]] as const

function Eyebrow({ children }: { children: React.ReactNode }) { return <span className="bs-eyebrow">{children}<i /></span> }

function PlanImage({ src, alt, onClick }: { src: string; alt: string; onClick: () => void }) {
  return <button className="bs-plan-image" type="button" onClick={onClick} aria-label={`Enlarge ${alt}`}><img src={src} alt={alt} /><span><Maximize2 size={15} /> Enlarge plan</span></button>
}

export function BsHitechDetail() {
  const [heroIndex, setHeroIndex] = useState(0)
  const [tower, setTower] = useState(0)
  const [galleryIndex, setGalleryIndex] = useState(0)
  const [lightbox, setLightbox] = useState<string | null>(null)
  const currentPlan = towerPlans[tower]

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroSlides.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [heroIndex])

  const goPrevHero = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    setHeroIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  const goNextHero = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    setHeroIndex((prev) => (prev + 1) % heroSlides.length)
  }

  return <main className="bs-detail">
    <section className="bs-hero" id="top">
      <div className="bs-hero-slides">
        {heroSlides.map((slide, idx) => (
          <div
            key={slide.src}
            className={`bs-hero-slide ${idx === heroIndex ? 'is-active' : ''}`}
            aria-hidden={idx !== heroIndex}
          >
            <img src={slide.src} alt={slide.alt} />
          </div>
        ))}
      </div>
      <div className="bs-hero-overlay" />
      <div className="bs-hero-copy">
        <Eyebrow>B.S. HITECH APARTMENT</Eyebrow>
        <h1>B.S. HITECH<br />APARTMENT</h1>
        <p><MapPin size={16} /> Khemni Chak, Kankarbagh, Patna - 800027</p>
        <strong>2 &amp; 3 BHK Luxurious Flats</strong>
      </div>
      <button
        type="button"
        className="bs-hero-arrow bs-hero-arrow--prev"
        onClick={goPrevHero}
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        type="button"
        className="bs-hero-arrow bs-hero-arrow--next"
        onClick={goNextHero}
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>
    </section>
    <section className="bs-overview" id="overview"><div className="bs-overview-copy"><Eyebrow>PROJECT OVERVIEW</Eyebrow><h2>A Better<br />Way To Live</h2><p>B.S. HITECH APARTMENT is strategically located in one of the best residential locations of Patna Bihar with easy access to educational institutions, shopping malls, hospitals and important business and leisure hubs. The location is ideal for cutting down your commute time while enjoying a pleasantly relaxed lifestyle and natural surroundings.</p><strong><MapPin size={16} /> Khemni Chak, Kankarbagh, Patna - 800027</strong></div><img src={`${projectImages}/xref_9322_p1.jpeg`} alt="B.S. HITECH apartment architecture" /></section>
    <section className="bs-stats" aria-label="Project statistics">{stats.map(([value, label, Icon]) => <div key={label}><Icon size={23} /><b>{value}</b><span>{label}</span></div>)}</section>
    <section className="bs-amenities" id="amenities"><div className="bs-section-intro"><Eyebrow>AMENITIES</Eyebrow><h2>Services &amp; Facilities<br />That Will Blow Your Mind</h2><p>From wellness to recreation, security to convenience - every detail is designed for modern and comfortable lifestyle.</p></div><div className="bs-amenity-grid">{amenities.map(([label, Icon]) => <article key={label}><Icon size={21} /><span>{label}</span></article>)}</div></section>
    <>
      <section className="bs-plans" id="floor-plans"><div className="bs-section-intro"><Eyebrow>FLOOR PLANS</Eyebrow><h2>Tower Plans</h2><p>Spacious &amp; thoughtfully designed homes with ample ventilation and natural sunlight. Explore detailed floor plans for each tower.</p></div><div className="bs-tabs" role="tablist">{towerPlans.map((plan, index) => <button key={plan.label} type="button" role="tab" aria-selected={tower === index} className={tower === index ? 'active' : ''} onClick={() => setTower(index)}>{plan.label}</button>)}</div><div className="bs-plan-layout"><PlanImage src={currentPlan.image} alt={`${currentPlan.title} floor plan`} onClick={() => setLightbox(currentPlan.image)} /><div className="bs-plan-copy"><Eyebrow>{currentPlan.title}</Eyebrow><h3>{currentPlan.detail}</h3><p>Thoughtfully planned spaces bring natural light, ventilation and everyday comfort into every home.</p><span>Actual approved plan drawing</span></div></div></section>
      <ProjectBrandStrip />
    </>
    <>
      <section className="bs-parking"><div className="bs-section-intro"><Eyebrow>PARKING PLAN</Eyebrow><h2>Ample Parking Space</h2><p>Well-planned parking across all towers with easy access and smooth movement for residents and visitors.</p></div><div className="bs-plan-pair"><PlanImage src={`${plans}/Parking-Plan_All-Towers.jpg`} alt="B.S. HITECH parking plan for all towers" onClick={() => setLightbox(`${plans}/Parking-Plan_All-Towers.jpg`)} /></div></section>
      <ProjectBrandStrip />
    </>
    <>
      <section className="bs-site-plan"><div className="bs-section-intro"><Eyebrow>SITE PLAN</Eyebrow><h2>Everything Within Reach</h2><p>A thoughtfully planned layout with green spaces, modern amenities and seamless connectivity for a better everyday life.</p></div><PlanImage src={`${plans}/Site-Plan.jpg`} alt="B.S. HITECH site plan" onClick={() => setLightbox(`${plans}/Site-Plan.jpg`)} /></section>
      <ProjectBrandStrip />
    </>
    <PaymentPlan full />
    <>
      <section className="bs-gallery" id="gallery"><div className="bs-section-intro"><Eyebrow>PROJECT GALLERY</Eyebrow><h2>Life Beyond The Walls</h2><p>Take a closer look at the spaces, amenities and lifestyle that make B.S. HITECH Apartment a perfect place to call home.</p></div><div className="bs-gallery-controls"><button type="button" onClick={() => setGalleryIndex((galleryIndex - 1 + gallery.length) % gallery.length)} aria-label="Previous gallery image"><ChevronLeft /></button><button type="button" onClick={() => setGalleryIndex((galleryIndex + 1) % gallery.length)} aria-label="Next gallery image"><ChevronRight /></button></div><div className="bs-gallery-grid">{gallery.slice(galleryIndex, galleryIndex + 6).concat(gallery.slice(0, Math.max(0, galleryIndex + 6 - gallery.length))).map((item, index) => <button key={`${item.src}-${index}`} type="button" onClick={() => setLightbox(item.src)}><img src={item.src} alt={item.alt} /><span>{item.alt}</span></button>)}</div></section>
      <ProjectBrandStrip />
    </>
    <section className="bs-location" id="location"><div className="bs-section-intro"><Eyebrow>LOCATION</Eyebrow><h2>Located In The Heart Of Patna</h2></div><div className="bs-location-grid"><div className="bs-map"><iframe title="B.S. HITECH Apartment location map" src="https://www.openstreetmap.org/export/embed.html?bbox=85.135%2C25.585%2C85.19%2C25.625&layer=mapnik&marker=25.605%2C85.162" /></div><article className="bs-distances"><h3>Key Distances</h3>{[['Patna Junction', '8.8 Km'], ['Patna Airport', '14.3 Km'], ['Nearest School', 'Walking Distance'], ['Nearest Hospital', 'Walking Distance'], ['Nearest Shopping Mall', '1 Km']].map(([place, distance]) => <p key={place}><MapPin size={16} /><span>{place}</span><b>{distance}</b></p>)}</article></div></section>
    <section className="bs-cta" id="contact"><img src={`${projectImages}/xref_9323_p1.jpeg`} alt="B.S. HITECH Apartment at dusk" /><div><Eyebrow>GET IN TOUCH</Eyebrow><h2>Ready To Find Your Place?</h2><p>Book a site visit, get detailed pricing or download the brochure.</p></div><div className="bs-cta-actions"><a href="/#contact">Book A Site Visit <ArrowRight size={16} /></a><a href="/#contact">Get Price Details</a><a href={`${plans}/Site-Plan.jpg`} download>Download Brochure <Download size={15} /></a></div></section>
    {lightbox && <div className="bs-lightbox" role="dialog" aria-modal="true" onClick={() => setLightbox(null)}><button type="button" aria-label="Close image" onClick={() => setLightbox(null)}><X /></button><img src={lightbox} alt="Enlarged B.S. HITECH project plan or image" onClick={(event) => event.stopPropagation()} /></div>}
  </main>
}