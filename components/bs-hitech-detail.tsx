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

// --- Specification Icons (Matching Reference Line Art) ---
function StructureIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 7h2" /><path d="M14 7h2" />
      <path d="M8 11h2" /><path d="M14 11h2" />
      <path d="M8 15h2" /><path d="M14 15h2" />
      <path d="M10 21v-3h4v3" />
    </svg>
  )
}

function ChowkhatsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="5" y="3" width="14" height="18" rx="1" />
      <path d="M5 21h14" />
      <path d="M8 5v14" />
      <circle cx="16" cy="12" r="1" fill="currentColor" />
    </svg>
  )
}

function MainDoorIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 21h16" />
      <rect x="6" y="3" width="12" height="18" rx="1" />
      <circle cx="15" cy="12" r="1.2" fill="currentColor" />
      <path d="M9 7h3" />
      <path d="M9 17h3" />
    </svg>
  )
}

function OtherDoorIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 21h16" />
      <rect x="6" y="4" width="12" height="17" rx="1" />
      <circle cx="14.5" cy="12.5" r="1" fill="currentColor" />
    </svg>
  )
}

function WindowsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M12 4v16" />
      <path d="M4 12h16" />
    </svg>
  )
}

function FlooringIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="3" width="8" height="8" rx="1" />
      <rect x="13" y="3" width="8" height="8" rx="1" />
      <rect x="3" y="13" width="8" height="8" rx="1" />
      <rect x="13" y="13" width="8" height="8" rx="1" />
      <path d="M7 3v8" /><path d="M3 7h8" />
      <path d="M17 3v8" /><path d="M13 7h8" />
      <path d="M7 13v8" /><path d="M3 17h8" />
      <path d="M17 13v8" /><path d="M13 17h8" />
    </svg>
  )
}

function KitchenIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="10" width="18" height="11" rx="2" />
      <path d="M3 14h18" />
      <path d="M12 14v7" />
      <circle cx="7.5" cy="6" r="2.5" />
      <path d="M14 4h4v3h-4z" />
      <path d="M16 7v3" />
    </svg>
  )
}

function BathroomIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 12h16c0 4.418-3.582 8-8 8s-8-3.582-8-8z" />
      <path d="M6 12V5a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v2" />
      <path d="M10 7h2" />
      <path d="M5 20l-1 2" />
      <path d="M19 20l1 2" />
    </svg>
  )
}

function ElectricalIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9 3v4" /><path d="M15 3v4" />
      <rect x="6" y="7" width="12" height="7" rx="3" />
      <path d="M12 14v7" />
    </svg>
  )
}

function DiningSpaceIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M6 3v7a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V3" />
      <path d="M8 12v9" /><path d="M6 6h4" />
      <path d="M17 3v18" />
      <path d="M17 3c2 1.5 3 4 3 7s-1 4-3 4" />
    </svg>
  )
}

function InternalWallIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18" /><path d="M3 15h18" />
      <path d="M9 4v5" /><path d="M15 4v5" />
      <path d="M6 9v6" /><path d="M12 9v6" /><path d="M18 9v6" />
      <path d="M9 15v5" /><path d="M15 15v5" />
    </svg>
  )
}

function ExternalWallIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 10h12v10H3z" />
      <path d="M3 15h12" />
      <path d="M9 10v5" /><path d="M6 15v5" /><path d="M12 15v5" />
      <path d="M15 7l5-4v10l-5-4z" />
      <path d="M15 11l5 4" />
    </svg>
  )
}

function ParkingIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 9l9-6 9 6" />
      <path d="M4 10v10" /><path d="M20 10v10" />
      <rect x="7" y="13" width="10" height="6" rx="1.5" />
      <circle cx="9" cy="19" r="1" />
      <circle cx="15" cy="19" r="1" />
      <path d="M8 13l1-2h6l1 2" />
    </svg>
  )
}

function BoringIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M10 21V7a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v14" />
      <path d="M14 8h3a2 2 0 0 1 2 2v2" />
      <path d="M19 15v2" />
      <path d="M5 21h14" />
      <path d="M3 18c2.5-1 4.5 1 7 0s4.5-1 7 0 4.5 1 7 0" />
    </svg>
  )
}

function CommonToiletIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M7 4h10v6H7z" />
      <path d="M8 10v4a4 4 0 0 0 8 0v-4" />
      <path d="M10 18v3h4v-3" />
      <path d="M8 21h8" />
    </svg>
  )
}

function LiftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M12 3v18" />
      <path d="M8 7l1.5-1.5L11 7" />
      <path d="M13 17l1.5 1.5L16 17" />
    </svg>
  )
}

function GeneratorIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <circle cx="8.5" cy="12.5" r="2.5" />
      <path d="M14 9h4" /><path d="M14 13h4" /><path d="M14 16h2" />
      <path d="M6 6V4h4v2" />
      <path d="M5 19v2" /><path d="M19 19v2" />
    </svg>
  )
}

interface SpecItem {
  id: string
  title: string
  icon: React.FC<React.SVGProps<SVGSVGElement>>
  text?: string
  bullets?: string[]
}

const leftColumnSpecs: SpecItem[] = [
  {
    id: 'structure',
    title: 'Structure',
    icon: StructureIcon,
    text: 'R.C.C frame structure with brick work in cement mortar as per design and specification of the structural consultants.',
  },
  {
    id: 'chowkhats',
    title: 'Chowkhats',
    icon: ChowkhatsIcon,
    text: 'Door frames of Sal wood.',
  },
  {
    id: 'main-door',
    title: 'Main Door',
    icon: MainDoorIcon,
    text: 'Flush door with both side vinior & polish.',
  },
  {
    id: 'other-door',
    title: 'Other Door',
    icon: OtherDoorIcon,
    text: '30 MM thick ISI mark flush door with both side paint.',
  },
  {
    id: 'windows',
    title: 'Windows',
    icon: WindowsIcon,
    text: 'Two Track Aluminium sliding/openable NCL make window.',
  },
  {
    id: 'flooring',
    title: 'Flooring',
    icon: FlooringIcon,
    text: 'Vitrified Tiles flooring in all area of the flat.',
  },
  {
    id: 'kitchen',
    title: 'Kitchen',
    icon: KitchenIcon,
    bullets: [
      'Flooring : Tiles.',
      'Working Platform : Granite Slab Platform.',
      'Dado 24” high Tiles.',
      'Sink : Steel Sink.',
    ],
  },
  {
    id: 'bathroom',
    title: 'Bathroom',
    icon: BathroomIcon,
    bullets: [
      'Flooring : Flooring Tiles.',
      'Wall : Glazed tiles up to 7\' height.',
      'Fittings : Chromium plated fitting of Jaquar or equivalent.',
      'Cistern : Acrylic / Fibreglass cistern in white colour.',
    ],
  },
]

const rightColumnSpecs: SpecItem[] = [
  {
    id: 'electrical',
    title: 'Electrical',
    icon: ElectricalIcon,
    bullets: [
      'All internal wiring in concealed conduits with copper wires.',
      'All electrical switches and accessories are branded.',
    ],
  },
  {
    id: 'dining-space',
    title: 'Dining Space',
    icon: DiningSpaceIcon,
    text: 'Provision of one wash basin in related space.',
  },
  {
    id: 'internal-wall',
    title: 'Internal Wall',
    icon: InternalWallIcon,
    text: 'All internal walls shall be finished with plaster of paris.',
  },
  {
    id: 'external-wall',
    title: 'External Wall',
    icon: ExternalWallIcon,
    text: 'External wall shall be painted with weather coat / Texture after laying of Birla/Johnson Putty.',
  },
  {
    id: 'parking',
    title: 'Parking',
    icon: ParkingIcon,
    text: '12” X 12” Parking Tiles.',
  },
  {
    id: 'boring',
    title: 'Boring',
    icon: BoringIcon,
    text: 'Boring & Tube well of adequate capacity by direct / reserve circulation machine with adequate capacity KSB or equivalent make submersible pump.',
  },
  {
    id: 'common-toilet',
    title: 'Common Toilet',
    icon: CommonToiletIcon,
    text: 'Common Toilet for Servant.',
  },
  {
    id: 'lift',
    title: 'Lift',
    icon: LiftIcon,
    text: 'Elevator of a standard company like Kone / Otis / Johnson or equivalent of six passenger Capacity will be installed.',
  },
  {
    id: 'generator',
    title: 'Generator',
    icon: GeneratorIcon,
    text: 'Generator of adequate capacity of Cummins / Kirloskar or equivalent make for stand by power supply.',
  },
]

export function ProjectSpecifications() {
  return (
    <section id="specifications" className="project-specs-section" aria-labelledby="specs-heading">
      <div className="project-specs-bg-building" aria-hidden="true">
        <img src="/New Assets/Hero Building2.png" alt="Architectural Building Background" />
      </div>
      <div className="project-specs-inner">
        <header className="project-specs-header">
          <div className="project-specs-eyebrow">
            <i />
            <span>BUILT WITH EXCELLENCE</span>
            <i />
          </div>
          <h2 id="specs-heading" className="project-specs-title">
            Project <span>Specifications</span>
          </h2>
          <p className="project-specs-desc">
            Thoughtfully planned with premium materials and modern construction standards to deliver a home that is durable, elegant and future-ready.
          </p>
        </header>

        <div className="project-specs-grid">
          <div className="project-specs-col">
            {leftColumnSpecs.map((item) => {
              const Icon = item.icon
              return (
                <article key={item.id} className="project-spec-card">
                  <div className="project-spec-icon-wrap" aria-hidden="true">
                    <Icon />
                  </div>
                  <div className="project-spec-content">
                    <h3 className="project-spec-title">{item.title}</h3>
                    <div className="project-spec-accent-line" />
                    {item.text && <p className="project-spec-text">{item.text}</p>}
                    {item.bullets && (
                      <ul className="project-spec-bullets">
                        {item.bullets.map((b, idx) => (
                          <li key={idx}>{b}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </article>
              )
            })}
          </div>

          <div className="project-specs-col">
            {rightColumnSpecs.map((item) => {
              const Icon = item.icon
              return (
                <article key={item.id} className="project-spec-card">
                  <div className="project-spec-icon-wrap" aria-hidden="true">
                    <Icon />
                  </div>
                  <div className="project-spec-content">
                    <h3 className="project-spec-title">{item.title}</h3>
                    <div className="project-spec-accent-line" />
                    {item.text && <p className="project-spec-text">{item.text}</p>}
                    {item.bullets && (
                      <ul className="project-spec-bullets">
                        {item.bullets.map((b, idx) => (
                          <li key={idx}>{b}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
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
    <ProjectSpecifications />
    <ProjectBrandStrip />
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