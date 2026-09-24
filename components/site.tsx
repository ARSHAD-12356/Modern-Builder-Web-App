'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, Award, Baby, Bath, Building2, CalendarDays, CarFront, Check, ChevronDown, ChevronLeft, ChevronRight, Compass, Download, Dumbbell, Home, KeyRound, Leaf, LockKeyhole, Mail, MapPin, Maximize2, Menu, PanelTop, Phone, Play, Rotate3d, ShieldCheck, Sofa, Sprout, Star, Sun, Tag, TreePine, Trophy, TrendingUp, GraduationCap, Hospital, ShoppingCart, UserRound, Users, Utensils, Waves, Wine, X } from 'lucide-react'

export const heroImage = '/assets/hero/bs-hitech-hero.png'
export const officeImage = '/assets/about/bigrahpuram-office.png'
export const logoImage = '/assets/BIGRAHPURM LOGO1.jpg.jpeg'

const nav = [['Home','top'],['About','about'],['Amenities','amenities'],['Floor Plans','floor-plans'],['Gallery','gallery'],['Location','location'],['Contact','contact']]

export function Header({ projectPage = false }: { projectPage?: boolean }) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('top')
  useEffect(() => { const sections = nav.map(([, id]) => document.getElementById(id)).filter(Boolean) as HTMLElement[]; const observer = new IntersectionObserver((entries) => { const visible = entries.filter((entry) => entry.isIntersecting).sort((a,b) => b.intersectionRatio-a.intersectionRatio)[0]; if (visible) setActive(visible.target.id) }, {rootMargin:'-38px 0px -55% 0px', threshold:[0.1,0.4,0.7]}); sections.forEach((section) => observer.observe(section)); return () => observer.disconnect() }, [])
  const scrollTo = (id:string) => { const target = document.getElementById(id); if (target) target.scrollIntoView({behavior:'smooth', block:'start'}); else window.scrollTo({top:0, behavior:'smooth'}); setActive(id); setOpen(false) }
  const projectHref = (id:string) => id === 'top' ? '/' : `/#${id}`
  return <>
    <header className="main-nav" style={{background:'transparent', backdropFilter:'none', WebkitBackdropFilter:'none', filter:'none', boxShadow:'none'}}><button className="brand" type="button" onClick={() => projectPage ? window.location.assign('/') : scrollTo('top')}><img className="brand-logo" src={logoImage} alt="Bigrahpurm Developers Pvt. Ltd."/><span><strong>BIGRAHPURM <b>DEVELOPERS</b></strong><small>PVT. LTD.</small></span></button><div className="hero-header-actions"><div className="hero-header-contact"><Phone size={25}/><span><b>+91 98765 43210</b><small>Mon - Sat: 9AM - 7PM</small></span><button type="button" onClick={() => projectPage ? window.location.assign('/#contact') : scrollTo('contact')}>Book Site Visit <ArrowRight size={16}/></button></div><button className={`menu-toggle ${open ? 'is-open' : ''}`} type="button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} onClick={() => setOpen(!open)}><span/><span/><span/></button></div></header>
    <div className={`cinematic-menu ${open ? 'is-open' : ''}`} aria-hidden={!open}><div className="cinematic-menu-inner"><span className="cinematic-menu-eyebrow">BIGRAHPURM DEVELOPERS</span><nav>{nav.map(([label, id], index) => <a href={projectPage ? projectHref(id) : `#${id}`} key={label} className={active === id ? 'active' : ''} style={{'--menu-index': index} as React.CSSProperties} tabIndex={open ? 0 : -1} onClick={(event) => { if (projectPage) { setOpen(false); return } event.preventDefault(); scrollTo(id) }}><span>0{index + 1}</span>{label}<ArrowRight size={19}/></a>)}</nav></div></div>
  </>
}

export function PageHero({eyebrow, title, text, image = heroImage}: {eyebrow:string; title:React.ReactNode; text:string; image?:string}) { return <section className="page-hero" style={{backgroundImage:`linear-gradient(90deg,rgba(8,37,31,.92),rgba(8,37,31,.42)),url(${image})`}}><div><div className="breadcrumb"><a href="/">Home</a><span>/</span><span>{eyebrow.split(' / ')[0]}</span></div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{text}</p><span className="hero-rule"/></div></section> }
export function SectionHeading({eyebrow,title,text,light=false}:{eyebrow:string;title:React.ReactNode;text?:string;light?:boolean}) { return <div className={light?'section-heading light':'section-heading'}><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{text && <p>{text}</p>}</div> }
export function Reveal({children,className=''}:{children:React.ReactNode;className?:string}) { return <div className={`reveal ${className}`}>{children}</div> }

const heroSlides = [
  { image: '/New Assets/Hero Building.png', title: 'Live Better. Live Brighter.', text: 'Premium residences crafted for modern living in Patna.' },
  { image: '/New Assets/Hero Building2.png', title: 'Designed For A Brighter Life.', text: 'Thoughtful architecture, refined spaces, and everyday comfort.' },
  { image: '/New Assets/Hero Building3.png', title: 'A Better Way To Come Home.', text: 'Elegant residences shaped around the way you want to live.' },
  { image: '/New Assets/Hero Building4.png', title: 'Your View Of Modern Living.', text: 'Discover a premium address made for meaningful moments.' },
]

export function Hero() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => setActive((current) => (current + 1) % heroSlides.length), 7000)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    const next = new Image()
    next.src = heroSlides[(active + 1) % heroSlides.length].image
  }, [active])

  const slide = heroSlides[active]

  return <section id="top" className="hero-carousel">
    <div className="hero-carousel-media" aria-hidden="true">
      {heroSlides.map((item, index) => <div key={item.image} className={`hero-carousel-slide ${index === active ? 'is-active' : ''}`} style={{ backgroundImage: `url("${item.image}")` }} />)}
    </div>
    <div className="hero-carousel-shade" />
    <div className="hero-carousel-copy" key={slide.image}>
      <span className="hero-carousel-eyebrow">BIGRAHPURM DEVELOPERS</span>
      <h1>{slide.title}</h1>
      <p>{slide.text}</p>
      <a href="/projects">Explore Project <ArrowRight size={16} /></a>
    </div>
    <div className="hero-carousel-meta"><span>Premium residences in Patna</span><span className="hero-carousel-scroll">Scroll to explore <span>↓</span></span></div>
    <div className="hero-carousel-controls" aria-label="Hero slides">
      <span className="hero-carousel-count">{String(active + 1).padStart(2, '0')} <i /> {String(heroSlides.length).padStart(2, '0')}</span>
      <div className="hero-carousel-progress"><span key={active} /></div>
      <div className="hero-carousel-dots">{heroSlides.map((item, index) => <button key={item.image} type="button" aria-label={`Show slide ${index + 1}`} className={index === active ? 'is-active' : ''} onClick={() => setActive(index)} />)}</div>
    </div>
  </section>
}

export function Stats() { return <section className="stats-band"><div className="stats-intro"><span className="eyebrow">A legacy of trust</span><h2>Built on values.<br/><em>Designed for life.</em></h2></div>{[['15+','Years Experience'],['4 Acres','Project Area'],['4','Towers'],['60%','Green Area'],['3 KM','From Patna Junction']].map(([n,l])=><div className="stat" key={l}><strong>{n}</strong><span>{l}</span></div>)}</section> }

const values=[['01','Quality Construction','Using premium materials and latest technologies',Home],['02','Timely Delivery','100% track record of project completion on time',CalendarDays],['03','Transparent Dealings','Clear documentation and RERA compliance',Check],['04','Customer-Centric Approach','Dedicated after-sales service',Sprout]]
export function About() { return <section className="about-premium"><div className="about-orbit orbit-one"/><div className="about-dots"/><div className="about-premium-inner"><div className="about-editorial"><div className="about-story"><span className="about-eyebrow">OUR STORY <i/></span><h2>About<br/><em>Bigrahpurm Developers</em></h2><span className="about-tagline">BUILDING BETTER TOMORROW</span><p><strong>Bigrahpurm Developers Pvt. Ltd.</strong> is a trusted name in Patna&apos;s real estate sector with over 15 years of experience in delivering quality residential and commercial projects. Our commitment to excellence, transparency, and customer satisfaction has made us one of the most reliable developers in Bihar.</p><div className="value-grid">{values.map(([n,title,desc,Icon])=><div className="value-card" key={n}><span className="value-number">{n}</span><span className="value-icon"><Icon size={23}/></span><div><h3>{title}</h3><p>{desc}</p></div></div>)}</div><div className="about-highlight"><strong>B.S. HITECH</strong> is our flagship project in the prime location of Kankarbagh, designed to redefine luxury living in Patna with world-class amenities and thoughtful design.</div><div className="about-actions"><a className="about-primary" href="/overview">KNOW MORE ABOUT US <ArrowRight size={16}/></a><button className="journey-button"><span><Play size={16} fill="currentColor"/></span><b>Our Journey<small>WATCH VIDEO</small></b></button></div></div><div className="about-composition"><div className="about-image-frame"><img src={officeImage} alt="Bigrahpurm Developers office"/><span className="about-experience"><b>15+</b><small>Years of<br/>Excellence</small></span><div className="project-float"><img src={heroImage} alt="B.S. HITECH project"/></div></div><div className="about-side-label"><i/>PEOPLE<br/>SPACES<br/>BETTER<br/>LIVES</div></div></div></div><div className="about-stats">{[['15+','Years of Experience',Home],['50+','Happy Customers',Sprout],['Multiple','Projects Completed',Home],['Stronger','Bihar Tomorrow',Sprout]].map(([n,l,Icon])=><div key={l}><Icon size={31}/><span><b>{n}</b><small>{l}</small></span></div>)}</div></section> }

const projectHighlights = [['Prime Location','3km from Patna Junction, near major landmarks',MapPin],['RERA Approved','BH-RERA Registration No: BR/Patna/123456',Check],['Vastu Compliant','Thoughtfully designed layouts',Sprout],['Premium Specifications','High-quality materials and finishes',Home],['Green Living','60% open and green area',Sprout],['Security','24/7 surveillance and gated community',ShieldCheck]]
export function ProjectOverview() {
  return (
    <section id="overview" className="project-overview">
      <div className="project-overview-inner">
        <div className="project-heading-row">
          <div>
            <span className="project-eyebrow">THE PROJECT <i /></span>
            <h2>Project <em>Overview</em></h2>
          </div>
        </div>
        <div className="project-overview-grid">
          <div className="project-visual">
            <img src="/assets/overview/project-building.png" alt="B.S. HITECH modern apartment towers" />
            <span className="project-script">A Better<br />Tomorrow</span>
            <div className="towers-badge">
              <Home size={18} />
              <b>4</b>
              <span>TOWERS</span>
              <small>A GRAND<br />LIFESTYLE</small>
            </div>
            <div className="project-image-bar">
              <div>
                <Sprout size={18} />
                <b>60%<small>Green Area</small></b>
              </div>
              <div>
                <Home size={18} />
                <b>4 Acres<small>Land Area</small></b>
              </div>
              <div>
                <Home size={18} />
                <b>1BHK 2BHK 3BHK<small>Premium Apartments</small></b>
              </div>
            </div>
          </div>
          <div className="project-copy">
            <span className="project-eyebrow">ABOUT THE PROJECT <i /></span>
            <h3>B.S. HITECH <em>- Luxury Redefined</em></h3>
            <p>
              Located in the heart of Kankarbagh, Patna, B.S. HITECH offers premium 1BHK, 2BHK and 3BHK apartments designed for modern living. Spread across 4 acres with 4 towers, the project boasts 60% green area and world-class amenities.
            </p>
            <div className="highlights-title">
              <h4>Project Highlights</h4>
              <i />
            </div>
            <div className="highlight-grid">
              {projectHighlights.map(([title, desc, Icon]) => (
                <article className="highlight-card" key={title as string}>
                  <span className="highlight-icon">
                    <Icon size={17} />
                  </span>
                  <div className="highlight-body">
                    <b>{title as string}</b>
                    <p>{desc as string}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className="project-price">
              With prices starting at just ₹5000/sqft and flexible payment plans, B.S. HITECH offers the perfect blend of luxury, location and lifestyle.
            </div>
            <div className="project-actions">
              <a href="/floor-plans">
                EXPLORE FLOOR PLANS <ArrowRight size={15} />
              </a>
              <button type="button">
                <span>
                  <Play size={16} fill="currentColor" />
                </span>
                <b>
                  Watch Project Video
                  <small>A CLOSER LOOK</small>
                </b>
              </button>
            </div>
          </div>
        </div>
      </div>
      <ProjectBrandStrip />
    </section>
  )
}

export function ProjectBrandStrip() {
  return (
    <div className="project-brand-strip" role="region" aria-label="Project Highlights">
      <div className="project-brand-strip-inner">
        <div className="project-brand-strip-brand">
          <b>BIGRAHPURM DEVELOPERS</b>
          <small>KANKARBAGH, PATNA</small>
        </div>
        <div className="project-brand-strip-divider" />
        <div className="project-brand-strip-features">
          <div className="project-brand-strip-item">
            <Home size={22} />
            <div>
              <b>Thoughtful</b>
              <small>Designs</small>
            </div>
          </div>
          <div className="project-brand-strip-item">
            <Award size={22} />
            <div>
              <b>Premium</b>
              <small>Quality</small>
            </div>
          </div>
          <div className="project-brand-strip-item">
            <MapPin size={22} />
            <div>
              <b>Prime</b>
              <small>Location</small>
            </div>
          </div>
          <div className="project-brand-strip-divider" />
          <div className="project-brand-strip-item">
            <ShieldCheck size={22} />
            <div>
              <b>Great</b>
              <small>Value</small>
            </div>
          </div>
        </div>
        <div className="project-brand-strip-slogan">
          <span>LIVE</span>
          <i>|</i>
          <span>GROW</span>
          <i>|</i>
          <span>BELONG</span>
        </div>
      </div>
    </div>
  )
}

const whyCardsData = [
  {
    num: '01',
    title: 'Trusted\nDeveloper',
    desc: '15+ years of experience with a proven track record of quality construction and timely delivery.',
    badgeType: 'gold',
    Icon: Award,
    image: '/images/why-choose/trusted-developer.jpg'
  },
  {
    num: '02',
    title: 'Prime\nLocation',
    desc: 'Strategic location in Kankarbagh with excellent connectivity to all parts of Patna.',
    badgeType: 'green',
    Icon: MapPin,
    image: '/images/why-choose/prime-location.jpg'
  },
  {
    num: '03',
    title: 'Green\nLiving',
    desc: '60% open green area with landscaped gardens and ample breathing space.',
    badgeType: 'gold',
    Icon: TreePine,
    image: '/images/why-choose/green-living.jpg'
  },
  {
    num: '04',
    title: 'RERA\nApproved',
    desc: 'Full compliance with RERA regulations ensuring transparency and buyer protection.',
    badgeType: 'green',
    Icon: ShieldCheck,
    image: '/images/why-choose/rera-approved.jpg'
  },
  {
    num: '05',
    title: 'Premium\nSpecifications',
    desc: 'High-quality construction materials and premium finishes throughout the project.',
    badgeType: 'gold',
    Icon: Home,
    image: '/images/why-choose/premium-specs.jpg'
  },
  {
    num: '06',
    title: 'Value for\nMoney',
    desc: 'Competitive pricing starting at ₹5500/sqft with flexible payment options.',
    badgeType: 'green',
    Icon: Sprout,
    image: '/images/why-choose/value-money.jpg'
  }
]

export function WhyChoose() {
  return (
    <section id="why-choose" className="why-choose-luxury">
      {/* Decorative foliage accents at top */}
      <div className="why-top-foliage" aria-hidden="true">
        <svg viewBox="0 0 450 120" fill="none" className="why-foliage-svg">
          <path d="M0 0 C60 40 140 20 220 5 C300 -10 380 30 450 0 L450 0 L0 0 Z" fill="#1b4d42" opacity="0.08"/>
          <path d="M120 0 C150 35 180 50 240 30 C200 65 150 45 120 0 Z" fill="#1b4d42" opacity="0.25"/>
          <path d="M210 0 C235 42 270 52 320 25 C280 60 230 48 210 0 Z" fill="#1b4d42" opacity="0.2"/>
        </svg>
      </div>

      {/* Top right vertical branding */}
      <div className="why-top-tagline">
        <i className="why-tagline-line" />
        <span>LIVE<br/>GROW<br/>BELONG</span>
      </div>

      <div className="why-luxury-container">
        {/* Main 2-column editorial structure */}
        <div className="why-main-layout">
          {/* Left column: Editorial intro + building architectural curve */}
          <div className="why-editorial-col">
            <div className="why-eyebrow-luxury">
              <i />
              <span>A SMARTER TOMORROW</span>
              <i />
            </div>

            <h2 className="why-hero-title">
              <span className="why-title-small">Why Choose</span>
              <span className="why-title-brand-gold">BIGRAHPURM</span>
              <span className="why-title-brand-green">DEVELOPERS</span>
            </h2>

            <p className="why-hero-desc">
              More than a home, it&apos;s a better way of living. Discover the advantages that make Bigrahpurm Developers the perfect choice for your future.
            </p>

            {/* Architectural building visual composition */}
            <div className="why-arch-composition">
              <div className="why-arch-backdrop" />
              <img
                src="/images/why-choose/building-entrance.jpg"
                alt="Bigrahpurm Developers luxury residential building"
                className="why-arch-img"
              />
            </div>
          </div>

          {/* Right column: 3 columns x 2 rows = 6 feature cards */}
          <div className="why-cards-col">
            <div className="why-cards-grid">
              {whyCardsData.map((item) => {
                const IconComponent = item.Icon
                const isGold = item.badgeType === 'gold'
                return (
                  <article className="why-ref-card" key={item.num}>
                    {/* Left text content panel */}
                    <div className="why-card-content">
                      <div className="why-card-header">
                        <div className={`why-card-badge ${isGold ? 'badge-gold' : 'badge-green'}`}>
                          <IconComponent size={20} strokeWidth={2.2} />
                        </div>
                        <span className="why-card-num">{item.num}</span>
                      </div>

                      <h3 className="why-card-title">
                        {item.title.split('\n').map((line, idx) => (
                          <span key={idx} className="block">{line}</span>
                        ))}
                      </h3>
                      <i className="why-card-rule" />

                      <p className="why-card-desc">{item.desc}</p>

                      <div className="why-card-footer">
                        <span className="why-card-learn">LEARN MORE</span>
                        <button className="why-card-arrow" aria-label={`Learn more about ${item.title.replace('\n', ' ')}`}>
                          <ArrowRight size={13} strokeWidth={2.2} />
                        </button>
                      </div>
                    </div>

                    {/* Right side organic curved image */}
                    <div className="why-card-image-wrap">
                      <img src={item.image} alt="" className="why-card-img" />
                      <svg className="why-card-s-curve" viewBox="0 0 44 140" preserveAspectRatio="none" aria-hidden="true">
                        <path d="M 0 0 C 30 35, 2 85, 28 140 L 0 140 Z" fill="#FFFFFF" />
                      </svg>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </div>

        {/* Bottom statistics bar spanning under cards */}
        <div className="why-stats-bar-wrapper">
          <div className="why-stats-bar">
            <div className="why-stat-unit">
              <span className="why-stat-badge-icon">
                <Award size={34} strokeWidth={1.8} />
              </span>
              <div className="why-stat-copy">
                <b className="why-stat-large">15+</b>
                <span className="why-stat-label">Years of Trust</span>
              </div>
            </div>

            <i className="why-stat-sep" />

            <div className="why-stat-unit">
              <span className="why-stat-badge-icon">
                <Users size={32} strokeWidth={1.8} />
              </span>
              <div className="why-stat-copy">
                <strong className="why-stat-head">Happy</strong>
                <span className="why-stat-label">Families</span>
              </div>
            </div>

            <i className="why-stat-sep" />

            <div className="why-stat-unit">
              <span className="why-stat-badge-icon">
                <Leaf size={32} strokeWidth={1.8} />
              </span>
              <div className="why-stat-copy">
                <strong className="why-stat-head">Stronger</strong>
                <span className="why-stat-label">Communities</span>
              </div>
            </div>

            <i className="why-stat-sep" />

            <div className="why-stat-unit">
              <span className="why-stat-badge-icon">
                <Sun size={32} strokeWidth={1.8} />
              </span>
              <div className="why-stat-copy">
                <strong className="why-stat-head">Brighter</strong>
                <span className="why-stat-label">Bihar</span>
              </div>
            </div>
          </div>

          {/* Bottom right delicate gold leaf line art */}
          <div className="why-bottom-leaf-art" aria-hidden="true">
            <svg viewBox="0 0 120 120" fill="none" className="why-leaf-line-svg">
              <path d="M10 110 C30 70, 70 30, 110 10 C100 50, 60 90, 10 110 Z" stroke="#D6A84F" strokeWidth="1.2" opacity="0.65"/>
              <path d="M10 110 Q 55 55 110 10" stroke="#D6A84F" strokeWidth="1" opacity="0.5"/>
              <path d="M45 75 Q 65 65 80 50" stroke="#D6A84F" strokeWidth="0.8" opacity="0.45"/>
              <path d="M30 90 Q 50 82 60 70" stroke="#D6A84F" strokeWidth="0.8" opacity="0.45"/>
              <path d="M65 55 Q 85 45 95 32" stroke="#D6A84F" strokeWidth="0.8" opacity="0.45"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}

const amenityImages = ['/images/amenities/swimming-pool.png','/images/amenities/gym.png','/images/amenities/clubhouse.png','/images/amenities/childrens-play-area.png','/images/amenities/sports-facilities.png','/images/amenities/parking.png','/images/amenities/landscaped-gardens.png','/images/amenities/security.png']
const amenityCards = [['Swimming Pool','Olympic-size swimming pool with separate kids’ section and trained lifeguards.',Waves],['Fully Equipped Gym','State-of-the-art fitness center with modern equipment and trained instructors.',Dumbbell],['Club House','Spacious club house with party hall, indoor games and banquet facilities.',Wine],["Children's Play Area",'Safe and fun play zone with modern play equipment for kids of all ages.',Baby],['Sports Facilities','Badminton court, basketball and more for an active lifestyle.',Trophy],['Ample Parking','Designated parking spaces for residents and visitors with 24/7 access.',CarFront],['Landscaped Gardens','Beautifully designed green spaces for relaxation and a healthier environment.',Leaf],['24/7 Security','Gated community with CCTV surveillance and trained security personnel.',ShieldCheck]]
export function AmenitiesShowcase() { return <section id="amenities" className="amenities-showcase"><div className="amenities-bg"/><div className="amenities-foliage amenities-foliage-left"/><div className="amenities-foliage amenities-foliage-top"/><div className="amenities-building"><img src="/assets/overview/project-building.png" alt=""/></div><div className="amenities-side-note"><i/>PEOPLE<br/>SPACES<br/>COMMUNITY<br/>HAPPIER LIVES</div><div className="amenities-inner"><div className="amenities-heading"><span className="amenities-eyebrow">EXPLORE A BRIGHTER TOMORROW</span><h2>World-Class <em>Amenities</em></h2><p>Thoughtfully designed spaces for a healthier, happier and more fulfilling lifestyle.</p></div><div className="amenities-layout"><aside className="amenities-rail"><span>OUR AMENITIES <i/></span>{[['Live Better',Waves],['Stay Active',Dumbbell],['Feel Secure',ShieldCheck],['Grow Together',Users]].map(([label,Icon])=><div className="amenity-rail-item" key={label}><Icon/><span>{label}</span></div>)}<button className="amenities-cta"><b><ArrowRight/></b><span>EXPLORE AMENITIES<small>A RICHER EVERYDAY</small></span></button><div className="amenities-rail-panel">More<br/>Than Amenities<br/><em>A Better Life</em><i/></div></aside><div className="amenities-grid">{amenityCards.map(([title,desc,Icon],i)=><article className="amenity-card" key={title}><div className="amenity-card-image" style={{backgroundImage:`url(${amenityImages[i]})`,backgroundPosition:'center',backgroundSize:'cover'}}><strong>0{i+1}</strong></div><div className="amenity-icon"><Icon/></div><div className="amenity-card-copy"><h3>{title}</h3><p>{desc}</p><button aria-label={`Explore ${title}`}><ArrowRight/></button></div></article>)}</div></div><div className="amenities-strip">{[['Premium','Lifestyle',Award],['Happy','Families',Users],['Healthy','Living',Leaf],['Safer','Community',ShieldCheck],['Brighter','Tomorrow',Home]].map(([a,b,Icon])=><div key={a}><Icon/><span>{a}<small>{b}</small></span></div>)}<button><ArrowRight/></button></div><div className="amenities-footer"><span>B.S. HITECH<small>KANKARBAGH, PATNA</small></span><b>AMENITIES TODAY&nbsp; | &nbsp; A BRIGHTER TOMORROW</b></div></div></section> }

export function OverviewSection() { return <section className="section overview-grid"><Reveal><SectionHeading eyebrow="B.S. HITECH / KANKARBAGH" title={<>A considered address<br/><em>for a considered life.</em></>} text="A premium gated community in Khemni Chak, Kankarbagh, Patna — shaped around space, light and everyday connection."/><div className="spec-list">{['1 / 2 / 3 BHK residences','Vastu compliant homes','Premium specifications','24/7 surveillance'].map((x,i)=><div key={x}><b>0{i+1}</b><span>{x}</span><Check size={16}/></div>)}</div></Reveal><Reveal className="overview-visual"><img src={heroImage} alt="B.S. HITECH residences"/><div className="floating-spec"><b>4</b><span>Towers<br/>of distinction</span></div></Reveal></section> }

const amenities=['Swimming Pool','Fully Equipped Gym','Club House',"Children's Play Area",'Sports Facilities','Ample Parking','Landscaped Gardens','24/7 Security']
export function Amenities({full=false}) { const [active,setActive]=useState(0); return <section className={full?'section amenities full':'section amenities'}><div className="amenity-visual"><img src={heroImage} alt={amenities[active]}/><div className="amenity-caption"><span>0{active+1} / 08</span><h3>{amenities[active]}</h3><p>A thoughtfully planned amenity that makes everyday living more rewarding.</p></div></div><div className="amenity-nav"><SectionHeading eyebrow="Designed around you" title={<>More room<br/><em>to live well.</em></>}/>{amenities.map((item,i)=><button key={item} className={i===active?'active':''} onClick={()=>setActive(i)}><span>0{i+1}</span>{item}<ArrowRight size={15}/></button>)}</div></section> }

const floorPlansData=[{name:'1BHK',eyebrow:'1 BHK APARTMENT',title:'Smart Living,',accent:'Greater Possibilities',desc:'Thoughtfully designed 1BHK home offering comfort, functionality and effortless modern living.',carpet:'550 sq.ft.',built:'750 sq.ft.',config:'1 Bedroom, 1 Bathroom, Living/Dining, Kitchen',price:'₹37.5 – ₹41.25 Lakhs',plan:'/images/floorplans/1bhk-plan.png',phrase:'Compact\\nSmart\\nBeautiful'},{name:'2BHK',eyebrow:'2 BHK APARTMENT',title:'Room to Grow,',accent:'Designed for Life',desc:'Considered 2BHK residence with generous proportions and flexible spaces for modern families.',carpet:'850 sq.ft.',built:'1150 sq.ft.',config:'2 Bedrooms, 2 Bathrooms, Living/Dining, Kitchen, Balcony',price:'₹57.5 – ₹63.25 Lakhs',plan:'/images/floorplans/2bhk-plan.png',phrase:'Thoughtful\\nWarm\\nWelcoming'},{name:'3BHK',eyebrow:'3 BHK APARTMENT',title:'More Space,',accent:'More Possibilities',desc:'Expansive 3BHK residence crafted for family comfort, seamless living and effortless entertaining.',carpet:'1250 sq.ft.',built:'1650 sq.ft.',config:'3 Bedrooms, 2 Bathrooms, Living/Dining, Kitchen, 2 Balconies, Utility',price:'₹82.5 – ₹90.75 Lakhs',plan:'/images/floorplans/3bhk-plan.png',phrase:'Open\\nElevated\\nExceptional'}]
const galleryItems = [
  ['3D Floor Plan', 'plan'],
  ['Living Room', '/images/floorplans/interior-living.png'],
  ['Bedroom', '/images/floorplans/interior-bedroom.png'],
  ['Kitchen', '/images/floorplans/interior-kitchen.png'],
  ['Bathroom', '/images/amenities/clubhouse.png'],
  ['Balcony', '/images/amenities/landscaped-gardens.png']
]

export function FloorPlans({ full = false }: { full?: boolean }) {
  const [active, setActive] = useState(0)
  const [view, setView] = useState('3D')
  const [gallery, setGallery] = useState(0)
  const [modal, setModal] = useState(false)
  const p = floorPlansData[active]
  const visual = gallery === 0 || view === '3D' ? p.plan : (galleryItems[gallery][1] as string)
  const changeBhk = (i: number) => {
    setActive(i)
    setGallery(0)
    setView('3D')
  }

  return (
    <section id="floor-plans" className="floorplans-premium">
      <div className="floor-bg-building">
        <img src={heroImage} alt="B.S. HITECH residential building" />
      </div>
      <div className="floor-leaf floor-leaf-top" />
      <div className="floor-leaf floor-leaf-bottom" />
      <div className="floor-left-note">
        <i />SPACES<br />PLANNED<br />FOR A BRIGHTER<br />TOMORROW<i />
      </div>
      <div className="floor-right-note">
        <i />MODERN<br />HOMES<br />HAPPIER<br />PEOPLE
      </div>
      <div className="floor-floating-note">
        A<br />BETTER<br />WAY OF<br />LIVING<i />
      </div>
      <div className="floor-inner">
        <div className="floor-heading">
          <span><i />THE RESIDENCES<i /></span>
          <h2>Floor <em>Plans</em></h2>
          <p>Designed around your needs, built for a better life.</p>
          <div className="floor-tabs">
            {floorPlansData.map((x, i) => (
              <button
                key={x.name}
                className={i === active ? 'active' : ''}
                onClick={() => changeBhk(i)}
              >
                {x.name}
              </button>
            ))}
          </div>
        </div>
        <div className="floor-main">
          <div className="floor-visual">
            <div className="floor-visual-label">
              {p.phrase.split('\\n').map((line) => (
                <span key={line}>{line}</span>
              ))}
            </div>
            <div className="floor-image-wrap">
              <img
                key={`${active}-${gallery}-${view}`}
                src={visual}
                alt={`${p.name} ${galleryItems[gallery][0]}`}
              />
            </div>
            <div className="floor-view-controls">
              {[
                ['3D', Rotate3d],
                ['2D', PanelTop],
                ['Interior', Sofa],
                ['360°', Compass]
              ].map(([label, Icon]) => (
                <button
                  key={label as string}
                  className={view === label ? 'active' : ''}
                  onClick={() => {
                    setView(label as string)
                    if (label === 'Interior') setGallery(1)
                  }}
                >
                  <Icon />
                  <span>
                    {label === '3D'
                      ? '3D View'
                      : label === '2D'
                      ? '2D Plan'
                      : label === '360°'
                      ? '360° Tour'
                      : 'Interior View'}
                  </span>
                </button>
              ))}
            </div>
            <div className="floor-compass">
              <Compass />
              <span>N</span>
              <b>E</b>
              <i>S</i>
              <em>W</em>
            </div>
            <button className="floor-larger" onClick={() => setModal(true)}>
              <Maximize2 /> View Larger
            </button>
            {view === '360°' && (
              <div className="tour-overlay">
                <Compass />
                <b>360° immersive tour</b>
                <span>Drag to explore the residence</span>
              </div>
            )}
          </div>
          <div className="floor-info">
            <span className="floor-info-eyebrow">
              <i />{p.eyebrow}
            </span>
            <h3>
              {p.title}<em>{p.accent}</em>
            </h3>
            <p>{p.desc}</p>
            <div className="floor-specs">
              <div>
                <span><PanelTop />Carpet Area</span>
                <b>{p.carpet}</b>
              </div>
              <div>
                <span><Building2 />Super Built-up Area</span>
                <b>{p.built}</b>
              </div>
              <div>
                <span><Home />Configuration</span>
                <b>{p.config}</b>
              </div>
              <div>
                <span><Tag />Price Range</span>
                <b>{p.price}</b>
              </div>
              <div>
                <span><Compass />Facing</span>
                <b>East / West / North / South</b>
              </div>
            </div>
            <div className="floor-actions">
              <a href="#floor-plan-download">
                <Download /> Download Floor Plan <ArrowRight />
              </a>
              <a href="/contact">
                <Mail /> Book Site Visit <ArrowRight />
              </a>
            </div>
          </div>
        </div>
        <div className="floor-gallery">
          <button
            aria-label="Previous gallery image"
            onClick={() =>
              setGallery((gallery + galleryItems.length - 1) % galleryItems.length)
            }
          >
            <ChevronLeft />
          </button>
          <div>
            {galleryItems.map(([label, src], i) => (
              <button
                key={label}
                className={gallery === i ? 'active' : ''}
                onClick={() => {
                  setGallery(i)
                  setView(i === 0 ? '3D' : 'Interior')
                }}
              >
                <img
                  src={i === 0 ? p.plan : (src as string)}
                  alt={`${p.name} ${label}`}
                />
                <span>{label}</span>
              </button>
            ))}
          </div>
          <button
            aria-label="Next gallery image"
            onClick={() => setGallery((gallery + 1) % galleryItems.length)}
          >
            <ChevronRight />
          </button>
        </div>
      </div>
      <ProjectBrandStrip />
      {modal && (
        <div
          className="floor-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Expanded floor plan"
        >
          <button onClick={() => setModal(false)} aria-label="Close expanded floor plan">
            <X />
          </button>
          <img src={p.plan} alt={`${p.name} expanded 3D floor plan`} />
        </div>
      )}
    </section>
  )
}

const paymentPlans=[{number:'01',title:'Standard Payment Plan',subtitle:'A simple and straightforward plan for comfortable home buying.',image:'/images/payment-plans/standard-lifestyle.png',overlay:['A','Smarter','Way to','Own'],rows:[['On Booking','10%'],['Within 30 days of Booking','15%'],['On Completion of Foundation','15%'],['On Completion of Plinth','10%'],['On Completion of Roof Slab','25%'],['On Completion of Finishing','20%'],['On Possession','5%']]},{number:'02',title:'Early Bird Discount Plan',subtitle:'Special benefits for early decision makers.',image:'/images/payment-plans/early-bird-lifestyle.png',overlay:['A','Brighter','Way to','Choose'],rows:[['On Booking (5% Discount)','20%'],['Within 60 days of Booking','30%'],['On Completion of Structure','30%'],['On Possession','20%']],note:'5% discount applicable only on bookings before September 2025'},{number:'03',title:'Bank Linked Plan',subtitle:'Easy home loans with our trusted banking partners.',image:'/images/payment-plans/bank-linked-lifestyle.png',overlay:['A','Trusted','Way to','Own'],rows:[['On Booking','10%'],['Within 30 days of Booking','10%'],['Construction Linked (Bank Disbursement)','75%'],['On Possession','5%']],note:'We have tie-ups with all major banks for home loans at attractive interest rates'}]
const paymentIcons=[CalendarDays,Sun,Building2,Building2,Home,Tag,KeyRound]
export function PaymentPlan({full=false}:{full?:boolean}) {
  const [activePlan, setActivePlan] = useState<number | null>(null);

  const togglePlan = (index: number) => {
    setActivePlan((prev) => (prev === index ? null : index));
  };

  const activeItem = activePlan !== null ? paymentPlans[activePlan] : null;
  const secondaryPlans = activePlan !== null 
    ? paymentPlans.filter((_, i) => i !== activePlan)
    : [];

  return (
    <section id="payment-plan" className="payment-premium">
      {/* Left: Full-Height Architectural Building Tower Visual */}
      <div className="payment-building-col">
        <img
          src="/images/payment-plans/building-tower.png"
          alt="B.S. HITECH luxury apartment building"
        />
      </div>

      <div className="payment-main-row">
        {/* Center Column: Heading + Subtitle + Focused Accordion Viewport */}
        <div className="payment-center-col">
          <div className="payment-heading">
            <h2>Flexible <em>Payment Plans</em></h2>
            <p>Transparent. Convenient. Designed Around You.</p>
            <div className="payment-heading-line" />
          </div>

          <div className="payment-accordion-viewport">
            {activePlan === null ? (
              /* DEFAULT STATE: All 3 collapsed */
              <div className="payment-accordion-stack default-stack">
                {paymentPlans.map((plan, i) => (
                  <button
                    key={plan.number}
                    type="button"
                    className="payment-card-collapsed"
                    onClick={() => togglePlan(i)}
                    aria-label={`Open ${plan.title}`}
                  >
                    <b className="payment-card-num">{plan.number}</b>
                    <div className="payment-card-info">
                      <h3>{plan.title}</h3>
                      <p>{plan.subtitle}</p>
                    </div>
                    <span className="payment-card-arrow">
                      <ChevronDown />
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              /* FOCUSED VIEWPORT STATE: Active plan moves to PRIMARY TOP position with expanded content */
              <div className="payment-accordion-stack active-stack" key={`active-${activePlan}`}>
                {/* PRIMARY ACTIVE ACCORDION */}
                <div className="payment-card-primary">
                  <button
                    type="button"
                    className="payment-card-primary-header"
                    onClick={() => togglePlan(activePlan)}
                    aria-label={`Collapse ${activeItem!.title}`}
                  >
                    <b className="payment-card-num active">{activeItem!.number}</b>
                    <div className="payment-card-info">
                      <h3>{activeItem!.title}</h3>
                      <p>{activeItem!.subtitle}</p>
                    </div>
                    <span className="payment-card-arrow rotated">
                      <ChevronDown />
                    </span>
                  </button>

                  <div className="payment-card-primary-body">
                    <div className="payment-expanded">
                      <div className="payment-interior">
                        <img
                          src={activeItem!.image}
                          alt={`${activeItem!.title} lifestyle interior`}
                        />
                        <div>
                          <span>
                            {activeItem!.overlay.map((line) => (
                              <span key={line}>{line}<br /></span>
                            ))}
                          </span>
                          <i />
                          <small>Invest in<br />Happiness</small>
                        </div>
                      </div>

                      <div className="payment-table">
                        <div className="payment-table-head">
                          <b>Milestone</b>
                          <b>Percentage</b>
                        </div>
                        {activeItem!.rows.map(([label, value], rowIndex) => {
                          const Icon = paymentIcons[rowIndex] || KeyRound;
                          return (
                            <div className="payment-row" key={label}>
                              <span><Icon />{label}</span>
                              <b>{value}</b>
                            </div>
                          );
                        })}
                        {activeItem!.note && (
                          <p className="payment-note">
                            <strong>!</strong> Note: {activeItem!.note}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* SECONDARY COLLAPSED ITEMS */}
                <div className="payment-secondary-list">
                  {secondaryPlans.map((plan) => {
                    const originalIndex = paymentPlans.findIndex((p) => p.number === plan.number);
                    return (
                      <button
                        key={plan.number}
                        type="button"
                        className="payment-card-collapsed secondary"
                        onClick={() => togglePlan(originalIndex)}
                        aria-label={`Switch to ${plan.title}`}
                      >
                        <b className="payment-card-num">{plan.number}</b>
                        <div className="payment-card-info">
                          <h3>{plan.title}</h3>
                          <p>{plan.subtitle}</p>
                        </div>
                        <span className="payment-card-arrow">
                          <ChevronDown />
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Large Lifestyle Feature Panel */}
        <aside className="payment-side">
          <div className="payment-side-photo">
            <img
              src="/images/payment-plans/right-lifestyle.png"
              alt="Luxury home interior"
            />
            <div className="payment-side-copy">
              <h3>Flexible<br />Plans<br /><em>Brighter<br />Futures</em></h3>
              <div className="payment-side-benefit">
                <span><Check /></span>
                <p>Easy &amp; Transparent<br />Process</p>
              </div>
              <div className="payment-side-benefit">
                <span><Tag /></span>
                <p>Multiple Payment<br />Options</p>
              </div>
              <div className="payment-side-benefit">
                <span><Building2 /></span>
                <p>Trusted Banking<br />Partners</p>
              </div>
              <div className="payment-side-benefit">
                <span><ShieldCheck /></span>
                <p>Hassle-Free Home Buying</p>
              </div>
            </div>

            <a href="/contact" className="payment-side-cta">
              <Phone />
              <span>
                <b>Need a Custom Plan?</b>
                <small>Talk to Our Experts</small>
              </span>
              <ArrowRight />
            </a>
          </div>
        </aside>
      </div>

      {/* Bottom Feature Benefits Bar */}
      <div className="payment-feature-bar">
        {[
          ['Flexible', 'Options', Award],
          ['Greater', 'Affordability', Users],
          ['Secure', 'Investment', ShieldCheck],
          ['A Better', 'Tomorrow', Leaf],
        ].map(([a, b, Icon]) => (
          <div key={a as string}>
            <Icon />
            <span>{a}<br />{b}</span>
          </div>
        ))}
        <button aria-label="Begin your journey"><ArrowRight /></button>
        <span className="payment-feature-cta">BEGIN YOUR<br />JOURNEY TODAY</span>
      </div>
    </section>
  );
}

export function Location() { return <section className="section location"><div className="location-map"><div className="map-grid"/><div className="map-pin"><MapPin fill="currentColor"/></div><span className="map-label">B.S. HITECH</span></div><div className="location-copy"><SectionHeading eyebrow="Where life connects" title={<>Close to what<br/><em>matters most.</em></>} text="Khemni Chak, Kankarbagh, Patna-800027"/><div className="nearby"><div><b>3 KM</b><span>Patna Junction</span></div><div><b>NEARBY</b><span>Schools & hospitals</span></div><div><b>EASY</b><span>Shopping & connectivity</span></div></div><a className="text-link" href="/contact">Get directions <ArrowRight size={16}/></a></div></section> }

export function Gallery({full=false}) { const [active,setActive]=useState(0); const imgs=[heroImage,heroImage,heroImage]; return <section className={full?'section gallery full':'section gallery'}><SectionHeading eyebrow="A glimpse of better living" title={<>See the<br/><em>difference.</em></>}/><div className="gallery-grid">{imgs.map((img,i)=><button key={i} className={`gallery-item g${i}`} onClick={()=>setActive(i)}><img src={img} alt={`B.S. HITECH view ${i+1}`}/><span>View {String(i+1).padStart(2,'0')} <ArrowRight size={15}/></span></button>)}</div>{full&&<div className="lightbox-note">Project imagery can be replaced with approved gallery assets.</div>}</section> }

const testimonialData=[{name:'Priya Singh',role:'Investor',review:'The location of B.S. HITECH is perfect with all amenities nearby. The construction quality is superior to other projects we considered. The team was very professional throughout the buying process.',image:'/images/testimonials/priya-singh.png'},{name:'Anil Mishra',role:'Future Resident',review:"We're extremely satisfied with our decision to invest in B.S. HITECH. The payment plans were flexible, and the customer service team was always available to address our queries. The amenities are world-class.",image:'/images/testimonials/anil-mishra.png'},{name:'Sunita Roy',role:'Homeowner',review:"The after-sales service at B.S. HITECH is exceptional. They've been very responsive to all our requests even after possession. The community they've built here is wonderful with great neighbors.",image:'/images/testimonials/sunita-roy.png'},{name:'Rajesh Kumar',role:'Resident',review:'A thoughtfully planned community with excellent construction quality and a location that makes daily life effortless.',image:'/images/testimonials/rajesh-kumar.png'},{name:'Vikram Patel',role:'NRI Investor',review:'The transparency and attention to detail gave our family complete confidence in choosing our new home.',image:'/images/testimonials/vikram-patel.png'}]
export function Testimonials({full=false}) {
  const [active,setActive]=useState(1);
  const [paused,setPaused]=useState(false);
  const [direction,setDirection]=useState(1);
  const total=testimonialData.length;
  const go=(nextDirection:number)=>{setDirection(nextDirection);setActive((active+nextDirection+total)%total)};
  const card=(index:number)=>testimonialData[(active+index+total)%total];
  return (
    <>
    <section id="testimonials" className="testimonials-editorial" onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)}>
      <div className="testimonials-building">
        <img src="/whychoosebuilding.png" alt="B.S. HITECH luxury apartment building"/>
      </div>
      <div className="testimonials-inner">
        <div className="testimonials-main-group">
          <div className="testimonials-heading">
            <span className="testimonials-eyebrow"><i/>REAL PEOPLE. REAL EXPERIENCES<i/></span>
            <h2>What Our <em>Customers</em> Say</h2>
            <p>Homes that create smiles, stories and stronger futures.</p>
            <div className="testimonials-divider"/>
          </div>
          <div className={`testimonial-stage swipe-${direction}`} key={active}>
            <button className="testimonial-arrow prev" onClick={()=>go(-1)} aria-label="Previous testimonial"><ChevronLeft size={20}/></button>
            <article className="testimonial-side testimonial-side-left"><TestimonialCard data={card(-1)} side/></article>
            <article className="testimonial-featured">
              <div className="featured-ribbon"><Star size={11} fill="currentColor"/> FEATURED<br/>STORY</div>
              <span className="testimonial-quote">“</span>
              <StarRow/>
              <p>{card(0).review}</p>
              <div className="testimonial-author">
                <img src={card(0).image} alt={card(0).name}/>
                <span><b>{card(0).name}</b><small>{card(0).role}</small></span>
                <strong>99<small>HAPPY<br/>CUSTOMER</small></strong>
              </div>
            </article>
            <article className="testimonial-side testimonial-side-right"><TestimonialCard data={card(1)} side/></article>
            <button className="testimonial-arrow next" onClick={()=>go(1)} aria-label="Next testimonial"><ChevronRight size={20}/></button>
          </div>
          <div className="testimonial-community-block">
            <div className="testimonial-avatars">
              {testimonialData.map((item,i)=><button key={item.name} className={i===active?'active':''} onClick={()=>setActive(i)} aria-label={`Show ${item.name}`}><img src={item.image} alt=""/></button>)}
              <span>+100<br/><small>More</small></span>
            </div>
            <div className="testimonial-community">JOIN OUR HAPPY COMMUNITY</div>
            <div className="testimonial-dots">
              {testimonialData.map((item,i)=><button key={item.name} className={i===active?'active':''} onClick={()=>setActive(i)} aria-label={`Go to ${item.name}`}/>)}
            </div>
          </div>
        </div>
        <div className="testimonial-trust">
          <div><Users size={20}/><b>15+<small>Years of Experience</small></b></div>
          <div><Star size={20}/><b>50+<small>Happy Customers</small></b></div>
          <div><Building2 size={20}/><b>Multiple<small>Projects Completed</small></b></div>
          <div><HeartIcon/><b>Stronger<small>Bihar Tomorrow</small></b></div>
          <a href="/contact"><ArrowRight size={15}/>BECOME A PART<br/>OF OUR STORY</a>
        </div>
      </div>
      {!paused&&<AutoRotate onRotate={()=>go(1)}/>}
    </section>
    <ProjectBrandStrip />
    </>
  );
}
function TestimonialCard({data,side=false}:{data:typeof testimonialData[number];side?:boolean}){return <><span className="testimonial-quote">“</span><StarRow/><p>{data.review}</p><div className="testimonial-author"><img src={data.image} alt={data.name}/><span><b>{data.name}</b><small>{data.role}</small></span><strong>”</strong></div></>}
function StarRow(){return <div className="testimonial-stars"><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/></div>}
function AutoRotate({onRotate}:{onRotate:()=>void}){useEffect(()=>{const timer=window.setInterval(onRotate,2200);return()=>window.clearInterval(timer)},[onRotate]);return null}
function HeartIcon(){return <span className="heart-icon">♡</span>}
const faqData=[{q:'Is BIGRAHPURM DEVELOPERS RERA approved?',a:'Yes, BIGRAHPURM DEVELOPERS is fully RERA approved with registration number BH-RERA/Patna/123456. All necessary approvals and clearances are in place.',c:'Project'},{q:'Is the location good for my family?',a:'BIGRAHPURM DEVELOPERS is located at Khemni Chak, Kankarbagh, Patna-800027, approximately 3 km from Patna Junction with convenient access to schools, hospitals and daily essentials.',c:'Location'},{q:'Is the area safe?',a:'The community is designed as a secure, gated development with 24/7 surveillance and trained security personnel.',c:'Location'},{q:'Is the price negotiable?',a:'Our team will guide you through the latest pricing, offers and available payment options for your preferred apartment.',c:'Pricing'},{q:'Why costlier than others nearby?',a:'The pricing reflects premium specifications, thoughtful planning, generous green areas and world-class amenities.',c:'Pricing'},{q:'Do you have flexible payment plans?',a:'Yes. Standard, Early Bird and Bank Linked plans are available with construction-linked milestones.',c:'Payments'},{q:'What facilities will I get?',a:'Residents can enjoy a swimming pool, gym, club house, children’s play area, sports facilities, parking, landscaped gardens and 24/7 security.',c:'Amenities'},{q:'What are the maintenance charges?',a:'Maintenance charges are shared transparently before booking and depend on the apartment configuration and selected services.',c:'Amenities'},{q:'Is resale easy?',a:'The prime location, thoughtful planning and strong project specifications support long-term livability and resale value.',c:'Project'},{q:'Will my family be happy here?',a:'With open green areas, family-friendly amenities and connected everyday spaces, BIGRAHPURM DEVELOPERS is planned around happier living.',c:'Amenities'},{q:'Will you help with renting/resale?',a:'Our relationship team will support homeowners with guidance for renting or resale after possession.',c:'Project'},{q:'What is the expected possession date?',a:'The expected possession schedule is shared clearly with buyers as part of the booking and agreement process.',c:'Possession'},{q:'Do you offer home loan assistance?',a:'Yes. We work with trusted banking partners and help buyers understand suitable home loan options.',c:'Payments'},{q:'Can I customize my apartment?',a:'Customization options may be discussed with the project team subject to design, construction and approval guidelines.',c:'Project'},{q:'What documents are required for booking?',a:'The booking process generally requires identity, address and payment documentation. Our team will provide the complete checklist.',c:'Legal'}]
const faqCategories=[['All',15,Home],['Project',4,Building2],['Location',2,MapPin],['Pricing',2,Tag],['Amenities',3,Users],['Payments',2,PanelTop],['Legal',1,ShieldCheck],['Possession',1,KeyRound]] as const
export function FAQ({full=false}) { const [active,setActive]=useState(0); const [category,setCategory]=useState('All'); const visible=category==='All'?faqData:faqData.filter(item=>item.c===category); const open=visible.findIndex((item)=>faqData.indexOf(item)===active); return <section id="faq" className="faq-editorial"><div className="faq-building"><img src={heroImage} alt="BIGRAHPURM DEVELOPERS modern apartment building"/><div className="faq-building-label"><b>BIGRAHPURM DEVELOPERS</b><small>KANKARBAGH, PATNA</small><span>LIVE | GROW | BELONG</span></div></div><div className="faq-inner"><div className="faq-heading"><span><i/>ANSWERS FOR A BRIGHTER TOMORROW<i/></span><h2>Frequently Asked <em>Questions</em></h2><p>Get all the information you need about BIGRAHPURM DEVELOPERS —<br/> clear answers, complete transparency.</p></div><div className="faq-trust">{[['Trusted','Information',ShieldCheck],['Transparent','Process',PanelTop],['Dedicated','Support',Phone],['A Better','Tomorrow',Home]].map(([a,b,Icon])=><div key={a as string}><span><Icon/></span><b>{a as string}<small>{b as string}</small></b></div>)}</div><div className="faq-layout"><aside className="faq-categories"><nav>{faqCategories.map(([label,count,Icon])=><button key={label} className={category===label?'active':''} onClick={()=>{setCategory(label);setActive(0)}}><Icon/><span>{label}</span><b>{count}</b></button>)}</nav><div className="faq-quote">“<p>Informed<br/>buyers make<br/>happier<br/>homeowners.</p><i/></div></aside><div className="faq-accordion">{visible.map((item,i)=>{const index=faqData.indexOf(item); const isOpen=active===index; return <div className={`faq-row ${isOpen?'open':''}`} key={item.q}><button onClick={()=>setActive(isOpen?-1:index)}><span>{String(index+1).padStart(2,'0')}</span><b>{item.q}</b><ChevronDown/></button><div className="faq-answer"><p>{item.a}</p></div></div>})}</div><div className="faq-right"><article className="faq-contact"><Leaf size={38}/><h3>Still Have<br/>Questions?</h3><p>Our team is happy to help you with any other queries.</p><a href="/contact">Contact Us <ArrowRight/></a><i/><div><Phone/><span>+91 98765 43210<small>Mon - Sat: 9AM - 7PM</small></span></div><div><Mail/><span>info@bshitech.com<small>We reply within 24 hrs</small></span></div><div><MapPin/><span>Kankarbagh, Patna<small>Visit our site office</small></span></div></article><article className="faq-tour"><h3>Let&apos;s Find<br/>Your Answers<br/>Together.</h3><i/><div><img src="/images/floorplans/interior-living.png" alt="Luxury apartment interior"/><button aria-label="Play virtual tour"><Play fill="currentColor"/></button></div><b>Take a<br/>Virtual Tour</b><small>EXPLORE YOUR<br/>FUTURE HOME</small><a href="/gallery"><ArrowRight/></a></article></div></div></div><ProjectBrandStrip /></section> }

export function Contact({full=false}) { const [sent,setSent]=useState(false); return <section id="contact" className="contact-editorial"><div className="contact-bg"><img src={heroImage} alt="B.S. HITECH luxury residential building"/></div><div className="contact-side-label">HOMES<br/>PEOPLE<br/>PROGRESS<br/>TOGETHER<i/></div><div className="contact-inner"><div className="contact-heading"><span><i/>LET&apos;S CONNECT<i/></span><h2>Contact <em>Us</em></h2><p>We&apos;d love to hear from you! Whether you have questions, want a site visit,<br/>or are ready to book your dream home — our team is here to help.</p></div><div className="contact-grid"><article className="contact-info-card"><span className="contact-eyebrow">GET IN TOUCH</span><h3>We&apos;re Here<br/>For You</h3><button className="talk-button" aria-label="Call our sales team"><Phone/><small>LET&apos;S<br/>TALK</small></button><p>Have questions about B.S. HITECH? Our team is ready to assist you with all your queries regarding the project, pricing, availability and more.</p><hr/><div className="contact-info-grid"><div><MapPin/><span><b>Site Address</b>Khemni Chak,<br/>Kankarbagh, Patna-800027</span></div><div><Phone/><span><b>Phone</b>+91 8757911159<br/>(Sales Team)</span></div><div><Mail/><span><b>Email</b>sales@bshightech.com</span></div><div><CalendarDays/><span><b>Office Hours</b>Monday to Saturday<br/>10:00 AM - 7:00 PM</span></div></div><div className="contact-map"><div><MapPin size={32}/><button>Open in Maps <ArrowRight size={16}/></button></div><span><b>Visit Our Site</b>See the location and<br/>explore the neighbourhood.<button>Open in Maps <ArrowRight size={16}/></button></span></div></article><form className="contact-form-card" onSubmit={(e)=>{e.preventDefault();setSent(true)}}>{sent?<div className="contact-success"><Check/><h3>Thank you for reaching out.</h3><p>Our team will get in touch shortly.</p><button type="button" onClick={()=>setSent(false)}>Send another enquiry</button></div>:<><span className="contact-eyebrow">ENQUIRE NOW</span><h3>Tell Us About Your Interest</h3><p className="form-subtitle">Fill out the form and our team will get in touch with you shortly.</p><div className="form-fields"><label>Full Name*<input required placeholder="Enter your name"/></label><label>Email*<input required type="email" placeholder="Enter your email"/></label><label>Phone*<input required placeholder="10-digit number"/></label><label>Interested In*<select defaultValue="" required><option value="" disabled>Select Option</option><option>1 BHK</option><option>2 BHK</option><option>3 BHK</option><option>Site Visit</option><option>General Enquiry</option></select></label><label className="message-field">Message<textarea required rows={3} placeholder="Type your message here..."/></label></div><div className="form-submit"><label className="consent"><input type="checkbox" required/>I agree to be contacted by B.S. HITECH team.</label><button type="submit">Send Enquiry <ArrowRight/></button></div><div className="privacy"><ShieldCheck/><span><b>Your information is safe with us.</b>We respect your privacy and will never share your details with third parties.</span></div></>}</form></div><div className="contact-trust"><span>Quick<br/><b>Response</b></span><span>Dedicated<br/><b>Support</b></span><span>Transparent<br/><b>Process</b></span><span>Your Dream<br/><b>Our Priority</b></span><span>Have a Quick Question?<small>Chat with our team on WhatsApp</small></span><a href="https://wa.me/918757911159" aria-label="Chat on WhatsApp">◔</a></div></div><div className="contact-bottom-script">A<br/>Brighter<br/>Tomorrow<br/>Together</div><div className="contact-brand"><b>B.S. HITECH</b><small>KANKARBAGH, PATNA</small><i/></div><ProjectBrandStrip /></section> }

export function Footer(){const links=[['Project Overview','/overview'],['Amenities','/amenities'],['Floor Plans','/floor-plans'],['Payment Plans','/payment-plan'],['Testimonials','/testimonials'],['FAQ','/faq']];return <footer className="footer-premium"><div className="footer-cta"><div><span className="footer-eyebrow"><i/>READY TO TAKE THE NEXT STEP?</span><h2>Book a Site Visit Today</h2><p>Experience B.S. HITECH in person and see what makes it the right choice for your future.</p></div><div className="footer-benefits"><span><b>◫</b>Flexible<small>Scheduling</small></span><span><b>♧</b>Dedicated<small>Support</small></span><span><b>♢</b>Hassle-Free<small>Assistance</small></span><a href="/contact">Book a Site Visit <ArrowRight/></a><small>Our team will get in touch with you shortly.</small></div></div><div className="footer-main"><div className="footer-leaf footer-leaf-left">〰</div><div className="footer-brand-block"><div className="footer-brand-lockup"><img className="brand-logo" src={logoImage} alt="Bigrahpurm Developers logo"/><h3>BIGRAHPURM <em>DEVELOPERS</em></h3></div><i/><small>BUILDING BETTER TOMORROW</small><div className="footer-description">Premium luxury apartments in the heart of Kankarbagh, Patna by Bigrahpurm Developers. RERA approved project with world-class amenities and thoughtful design.</div><div className="footer-socials"><a href="#" aria-label="Facebook">f</a><a href="#" aria-label="Instagram">◎</a><a href="#" aria-label="YouTube">▶</a><a href="https://wa.me/918757911159" aria-label="WhatsApp">◔</a></div><label>STAY CONNECTED WITH US</label></div><nav className="footer-links"><h4>Quick Links<i/></h4>{links.map(([label,href])=><a key={label} href={href}>› <span>{label}</span></a>)}</nav><div className="footer-contact"><h4>Contact Info<i/></h4><a href="https://www.google.com/maps/search/?api=1&query=Kankarbagh+Patna"><b>⌖</b>Kankarbagh, Patna - 800020</a><a href="tel:+918757911159"><b>◔</b>+91 8757911159</a><a href="mailto:sales@bshightech.com"><b>✉</b>sales@bshightech.com</a><span><b>◷</b>Mon-Sat: 10AM - 7PM</span></div><div className="footer-branding"><span>HOMES<br/>PEOPLE<br/>PROGRESS<br/>TOGETHER<i/></span><strong>A Brighter<br/>Tomorrow<br/>Together</strong><em>More Than Homes<br/>Relationships</em></div><div className="footer-bottom"><span>© 2025 B.S. HITECH by Bigrahpurm Developers. All Rights Reserved. | RERA No: BH-RERA/Patna/123456</span><div><a href="/privacy-policy">Privacy Policy</a><b>|</b><a href="/terms">Terms &amp; Conditions</a><b>|</b><a href="/sitemap.xml">Sitemap</a></div><button onClick={()=>window.scrollTo({top:0,behavior:'smooth'})} aria-label="Back to top">⌃<small>Back to Top</small></button></div></div></footer>}

export function LocationSection(){const features=[[MapPin,'Prime','Location'],[Compass,'Excellent','Connectivity'],[Building2,'Surrounded by','Key Amenities'],[TrendingUp,'High Growth','Potential']];const benefits=[[GraduationCap,'Schools','Within Minutes'],[Hospital,'Hospitals','Nearby'],[ShoppingCart,'Markets','& Daily Needs'],[Compass,'Well-Connected','to Major Roads']];return <section className="location-editorial"><div className="location-side-label">HOMES<br/>PEOPLE<br/>PROGRESS<br/>TOGETHER<i/></div><div className="location-script">A<br/>Better Location<br/>Brighter<br/>Tomorrows<i/></div><div className="location-inner"><div className="location-heading"><span><i/>OUR LOCATION<i/></span><h2>In the Heart of <em>Patna</em></h2><p>Well-connected. Well-developed. A location that keeps you close to everything<br/>that matters — today and tomorrow.</p></div><div className="location-features">{features.map(([Icon,a,b])=><div key={a as string}><span><Icon/></span><b>{a as string}<small>{b as string}</small></b></div>)}</div><div className="location-cards"><article className="location-card"><header><span><MapPin/></span><div><h3>Our Exact Location</h3><p>Find us on Google Maps</p></div><a href="https://www.google.com/maps/search/?api=1&query=Khemni+Chak+Kankarbagh+Patna">Open in Google Maps <ArrowRight/></a></header><div className="location-map-frame"><iframe title="B.S. HITECH location map" src="https://www.openstreetmap.org/export/embed.html?bbox=85.135%2C25.585%2C85.19%2C25.625&layer=mapnik&marker=25.605%2C85.162"/></div></article><article className="location-card"><header><span><Compass/></span><div><h3>Location Map</h3><p>Key landmarks and connectivity</p></div><a href="/images/location-connectivity-map.png" download="bshitech-location-map.png"><Download/> DOWNLOAD MAP</a></header><div className="connectivity-map"><img src="/images/location-connectivity-map.png" alt="Connectivity map showing Kankarbagh, Patna landmarks and nearby roads"/><div><b>Kankarbagh, Patna</b><small>Connected to schools, hospitals, markets and major roads</small></div></div></article></div><div className="location-benefits"><h3>You&apos;re<br/>Never Far<br/>From What Matters<i/></h3>{benefits.map(([Icon,a,b])=><div key={a as string}><span><Icon/></span><b>{a as string}<small>{b as string}</small></b></div>)}<a href="/contact">Plan Your Visit <ArrowRight/></a></div></div></section>}
export function SiteFrame({children}:{children:React.ReactNode}){return <><Header/>{children}<Footer/></>}
export function HomePage(){return <SiteFrame><Hero/><About/><ProjectOverview/><WhyChoose/><AmenitiesShowcase/><FloorPlans/><PaymentPlan/><Testimonials/><FAQ/><Contact/><LocationSection/></SiteFrame>}
export const pageData:Record<string,{eyebrow:string;title:React.ReactNode;text:string}>={overview:{eyebrow:'The project / Kankarbagh',title:<>A considered address<br/><em>for a considered life.</em></>,text:'Discover B.S. HITECH — premium residences shaped around space, light and everyday connection.'},amenities:{eyebrow:'Life, elevated',title:<>More room<br/><em>to live well.</em></>,text:'Explore the experiences and amenities designed around the rhythm of your everyday.'},'floor-plans':{eyebrow:'Find your fit',title:<>Space that feels<br/><em>like yours.</em></>,text:'Thoughtfully planned 1BHK, 2BHK and 3BHK residences.'},'payment-plan':{eyebrow:'A clear path home',title:<>Clarity from booking<br/><em>to possession.</em></>,text:'Flexible, construction-linked payment milestones designed for confidence.'},gallery:{eyebrow:'A glimpse of better living',title:<>See the<br/><em>difference.</em></>,text:'A visual story of thoughtful architecture and life at B.S. HITECH.'},testimonials:{eyebrow:'Words from our residents',title:<>A home is better<br/><em>when it feels yours.</em></>,text:'Hear from the people who chose B.S. HITECH.'},faq:{eyebrow:'Questions, answered',title:<>The details<br/><em>made simple.</em></>,text:'Everything you need to know before taking the next step.'},contact:{eyebrow:'Start a conversation',title:<>Your next chapter<br/><em>starts here.</em></>,text:'Visit us, speak to our team, and find the address that feels like home.'}}
export function DetailPage({slug}:{slug:string}){const d=pageData[slug]||pageData.overview; return slug==='floor-plans'?<FloorPlans full/>:<SiteFrame><PageHero {...d}/>{slug==='overview'?<><OverviewSection/><About/></>:slug==='amenities'?<Amenities full/>:slug==='payment-plan'?<PaymentPlan full/>:slug==='gallery'?<Gallery full/>:slug==='testimonials'?<Testimonials full/>:slug==='faq'?<FAQ full/>:<Contact full/>}</SiteFrame>}
