/**
 * Retrieval & Response Engine for BD AI Assistant
 * Interacts cleanly with AI_KNOWLEDGE_BASE to provide accurate, factual, and concise answers.
 * Handles natural language variations, greetings, and unknown query fallbacks without hallucinating.
 */

import { AI_KNOWLEDGE_BASE } from './ai-knowledge-base'

export interface AssistantResponse {
  text: string
  actionLink?: { label: string; url: string }
  quickSuggestions?: string[]
}

const GREETING_PATTERNS = [
  /^(hi|hii|hiii|hello|hey|heyy|hey there|hola|namaste|greetings)[\s!.,?]*$/i,
  /^(good\s+(morning|afternoon|evening|day))[\s!.,?]*$/i,
  /^(hello\s+bd|hi\s+bd|hey\s+bd|namaste\s+bd)[\s!.,?]*$/i,
  /^(who\s+are\s+you|what\s+is\s+your\s+name|what\s+can\s+you\s+do)[\s!.,?]*$/i,
]

const THANKS_PATTERNS = [
  /^(thanks|thank\s+you|thx|thank\s+you\s+so\s+much|great\s+thanks)[\s!.,?]*$/i,
  /^(bye|goodbye|see\s+you|ok\s+bye|have\s+a\s+good\s+day)[\s!.,?]*$/i,
]

const EXTERNAL_LOCATIONS = [
  'london', 'dubai', 'mumbai', 'delhi', 'bangalore', 'bengaluru', 'kolkata', 'hyderabad', 'chennai', 'pune', 'noida', 'gurgaon', 'usa', 'america', 'uk', 'canada', 'australia'
]

const FALLBACK_MESSAGE =
  "I don't have that information available in my current project knowledge base. Please contact the project team for the latest details."

/**
 * Normalizes query string for robust fuzzy & keyword detection.
 */
function cleanQuery(query: string): string {
  return query
    .toLowerCase()
    .replace(/[^\w\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Main response generation function.
 * Matches user query to Knowledge Base facts with high precision.
 */
export async function getAiResponse(userQuery: string): Promise<string> {
  const raw = userQuery.trim()
  if (!raw) {
    return 'How can I assist you with the project today?'
  }

  const q = cleanQuery(raw)
  const kb = AI_KNOWLEDGE_BASE

  // 1. Check for Greetings
  for (const pattern of GREETING_PATTERNS) {
    if (pattern.test(raw)) {
      if (/who\s+are\s+you|what\s+is\s+your\s+name|what\s+can\s+you\s+do/i.test(raw)) {
        return `Hello! 👋 I am the **BD AI Assistant** for Bigrahpurm Developers.\n\nI can help you with factual details about **B.S. HITECH APARTMENT**, including:\n• Project overview, towers, and green space\n• 1, 2 & 3 BHK apartment layouts & sizes\n• Pricing & flexible payment plans\n• 24 lifestyle amenities & project specifications\n• Prime Kankarbagh location & key distances\n• RERA approvals & mandatory legal disclosures\n• Scheduling a site visit`
      }
      return 'Hello! 👋 Welcome to BD AI Assistant. How can I help you with the project today?'
    }
  }

  // 2. Check for Gratitude / Bye
  for (const pattern of THANKS_PATTERNS) {
    if (pattern.test(raw)) {
      if (/bye|goodbye|see\s+you/i.test(raw)) {
        return 'Goodbye! Have a wonderful day! Feel free to ask anytime if you need more details about B.S. HITECH.'
      }
      return "You're welcome! Let me know if you'd like to check floor plans, pricing, amenities, or book a site visit."
    }
  }

  // 3. Check for external/irrelevant cities or countries
  for (const extCity of EXTERNAL_LOCATIONS) {
    const wordPattern = new RegExp(`\\b${extCity}\\b`, 'i')
    if (wordPattern.test(q)) {
      return `Bigrahpurm Developers specializes in prime developments in **Patna, Bihar**. Our featured project **B.S. HITECH** is situated at Khemni Chak, Kankarbagh, Patna. We do not have projects or apartments in ${extCity.charAt(0).toUpperCase() + extCity.slice(1)}.`
    }
  }

  // 4. Predefined Chips / Direct Button Matches
  if (q === 'project details' || q === 'project' || q === 'about project' || q === 'details') {
    return formatProjectOverview()
  }
  if (q === 'amenities' || q === 'amenity' || q === 'facilities') {
    return formatAmenities()
  }
  if (q === 'floor plans' || q === 'floor plan' || q === 'plans' || q === 'layout' || q === 'layouts') {
    return formatFloorPlans()
  }
  if (q === 'location' || q === 'site location' || q === 'address' || q === 'where') {
    return formatLocation()
  }
  if (q === 'pricing' || q === 'price' || q === 'cost' || q === 'rate') {
    return formatPricing()
  }
  if (q === 'site visit' || q === 'book visit' || q === 'visit') {
    return formatSiteVisit()
  }

  // 5. Intent: What type of property is this?
  if (
    q.includes('type of property') ||
    q.includes('kind of property') ||
    q.includes('property type') ||
    q.includes('what type') ||
    q.includes('commercial or residential')
  ) {
    const p = kb.project
    return `**Property Type:**\n**${p.name}** is a combined **Residential & Commercial** project.\n\n• **Residential:** 189 Flats comprising 1 BHK, 2 BHK, and 3 BHK luxurious apartments (plus EWS units in Tower II).\n• **Commercial:** 16 Commercial Shops catering to resident and community needs.\n• **Campus:** 4 High-Rise Towers across a 4-acre gated campus with 60% open green space.`
  }

  // 6. Intent: What makes this project special? / Why choose / Key highlights
  if (
    q.includes('special') ||
    q.includes('why choose') ||
    q.includes('stand out') ||
    q.includes('why should i buy') ||
    q.includes('advantages') ||
    q.includes('usp')
  ) {
    const p = kb.project
    return `**What Makes B.S. HITECH Special:**\n\n• **Sprawling 4-Acre Campus:** Rare large land parcel in central Kankarbagh with 60% open, green landscaped space.\n• **100% RERA Approved:** Registration No. **${kb.reraAndLegal.reraRegistrationNumber}** with clear titles and transparent documentation.\n• **Unmatched Connectivity:** Only 3 km from Patna Junction; schools and multi-specialty hospitals are within walking distance.\n• **24 World-Class Amenities:** Olympic-size swimming pool, gym, club house, campus temple, jogging tracks, sports courts, and 24/7 power backup.\n• **Vastu-Compliant Architecture:** Designed for optimal ventilation, natural daylight, and positive energy.\n• **Premium Build Quality:** Sal wood door frames, branded fittings (Jaquar or equivalent), and Earthquake Resistant RCC design.\n\nLearn more on our [Project Overview](/overview).`
  }

  // 7. Intent: Tell me about the project / Project overview / Main features
  if (
    q.includes('tell me about the project') ||
    q.includes('about the project') ||
    q.includes('tell me about project') ||
    q.includes('main project features') ||
    q.includes('project features') ||
    q.includes('main features') ||
    q.includes('project info') ||
    q.includes('project details') ||
    q.includes('tell about project') ||
    q === 'project'
  ) {
    return formatProjectOverview()
  }

  // 8. Intent: Specific Project Stats (Towers count, total flats, land area, green area, vastu)
  if (q.includes('how many tower') || q.includes('number of tower') || q.includes('how many block')) {
    return `**B.S. HITECH** consists of **4 Towers** (Tower I, Tower II [EWS], Tower III, and Tower IV) built across a 4-acre campus.`
  }
  if (q.includes('how many flat') || q.includes('total flat') || q.includes('number of flat') || q.includes('total units')) {
    const f = kb.project.flatBreakdown
    return `**B.S. HITECH** has a total of **189 Flats** and **16 Commercial Shops**:\n• **1 BHK:** 12 Flats\n• **2 BHK:** 70 Flats\n• **3 BHK:** 73 Flats\n• Plus dedicated EWS units in Tower II.`
  }
  if (q.includes('land area') || q.includes('green area') || q.includes('total area') || q.includes('acres')) {
    return `**B.S. HITECH** is spread over a **4-Acre Land Parcel** with **60% Open & Landscaped Green Area**, featuring manicured gardens, jogging tracks, and open-air recreational zones.`
  }
  if (q.includes('vastu') || q.includes('vaastu')) {
    return `Yes! All apartments and tower orientations at **B.S. HITECH** are designed in compliance with **Vastu** principles to ensure harmony, abundance of natural light, and healthy air flow.`
  }

  // 9. Intent: RERA & Legal Disclosures
  if (
    q.includes('rera') ||
    q.includes('legal') ||
    q.includes('disclosure') ||
    q.includes('approval') ||
    q.includes('approved') ||
    q.includes('certificate') ||
    q.includes('pan card') ||
    q.includes('gst')
  ) {
    return formatReraAndLegal(q)
  }

  // 10. Intent: Site Visit / Booking / Scheduling Visit
  if (
    q.includes('site visit') ||
    q.includes('book a visit') ||
    q.includes('visit the project') ||
    q.includes('schedule a visit') ||
    q.includes('want to visit') ||
    q.includes('visit') ||
    q.includes('booking') ||
    q.includes('how to book')
  ) {
    return formatSiteVisit()
  }

  // 11. Intent: Pricing & Rates & Negotiation
  if (
    q.includes('price') ||
    q.includes('pricing') ||
    q.includes('cost') ||
    q.includes('rate') ||
    q.includes('per sqft') ||
    q.includes('sq ft') ||
    q.includes('lakh') ||
    q.includes('negotiable') ||
    q.includes('offer') ||
    q.includes('discount')
  ) {
    return formatPricing()
  }

  // 12. Intent: Payment Plans & Home Loans / Banks
  if (
    q.includes('payment') ||
    q.includes('installment') ||
    q.includes('milestone') ||
    q.includes('bank') ||
    q.includes('loan') ||
    q.includes('early bird')
  ) {
    return formatPaymentPlans()
  }

  // 13. Intent: Specific Amenities & Queries (Parking, Elevator, Safety, Generator, Power Backup, Gym, Pool)
  if (
    q.includes('parking') ||
    q.includes('car park') ||
    q.includes('elevator') ||
    q.includes('lift') ||
    q.includes('power backup') ||
    q.includes('generator') ||
    q.includes('backup') ||
    q.includes('safety') ||
    q.includes('security') ||
    q.includes('cctv') ||
    q.includes('swimming') ||
    q.includes('pool') ||
    q.includes('gym') ||
    q.includes('fitness') ||
    q.includes('temple') ||
    q.includes('garden') ||
    q.includes('jogging') ||
    q.includes('water supply') ||
    q.includes('water harvest') ||
    q.includes('badminton') ||
    q.includes('basketball') ||
    q.includes('club house') ||
    q.includes('amenities') ||
    q.includes('amenity') ||
    q.includes('facilities')
  ) {
    return handleAmenityQueries(q)
  }

  // 14. Intent: Floor Plans & Apartments Layout (1BHK, 2BHK, 3BHK, Sizes, Carpet, Built-up)
  if (
    q.includes('floor plan') ||
    q.includes('floor plans') ||
    q.includes('apartment') ||
    q.includes('apartments') ||
    q.includes('flat') ||
    q.includes('flats') ||
    q.includes('layout') ||
    q.includes('bhk') ||
    q.includes('carpet') ||
    q.includes('built-up') ||
    q.includes('built up') ||
    q.includes('tower plan')
  ) {
    return formatFloorPlans(q)
  }

  // 15. Intent: Location & Distances (Where is it, Patna Junction, Airport, Khemni Chak, Kankarbagh)
  if (
    q.includes('location') ||
    q.includes('where is') ||
    q.includes('where it is') ||
    q.includes('where are you located') ||
    q.includes('address') ||
    q.includes('reach') ||
    q.includes('distance') ||
    q.includes('airport') ||
    q.includes('junction') ||
    q.includes('railway') ||
    q.includes('station') ||
    q.includes('hospital') ||
    q.includes('school') ||
    q.includes('mall') ||
    q.includes('kankarbagh') ||
    q.includes('patna')
  ) {
    return formatLocation(q)
  }

  // 16. Intent: Contact Information / Enquire
  if (
    q.includes('contact') ||
    q.includes('phone') ||
    q.includes('mobile') ||
    q.includes('call') ||
    q.includes('email') ||
    q.includes('mail') ||
    q.includes('whatsapp') ||
    q.includes('number') ||
    q.includes('enquire') ||
    q.includes('inquire') ||
    q.includes('office') ||
    q.includes('working hours') ||
    q.includes('timing')
  ) {
    return formatContact()
  }

  // 17. Intent: Developer / Company Profile / Bigrahpurm Developers
  if (
    q.includes('developer') ||
    q.includes('builder') ||
    q.includes('bigrahpurm') ||
    q.includes('company') ||
    q.includes('experience') ||
    q.includes('track record') ||
    q.includes('who are') ||
    q.includes('about developer') ||
    q.includes('about company')
  ) {
    return formatCompanyDetails()
  }

  // 18. Intent: Construction Specifications / Materials
  if (
    q.includes('specification') ||
    q.includes('specifications') ||
    q.includes('material') ||
    q.includes('structure') ||
    q.includes('flooring') ||
    q.includes('door') ||
    q.includes('window') ||
    q.includes('fitting') ||
    q.includes('plaster') ||
    q.includes('wall') ||
    q.includes('boring') ||
    q.includes('electrical')
  ) {
    return formatSpecifications(q)
  }

  // 19. Intent: Possession Date & Maintenance
  if (q.includes('possession') || q.includes('handover') || q.includes('completion date')) {
    return `The expected possession schedule is clearly outlined in the agreement and shared transparently with buyers during booking.\n\nBecause handover depends on individual tower progress, please contact our project sales team at **${kb.contact.primaryPhone}** for the latest verified timeline for your preferred tower.`
  }
  if (q.includes('maintenance')) {
    return `Maintenance charges are shared transparently before booking and depend on your chosen apartment configuration (1, 2, or 3 BHK) and common utility services.\n\nPlease contact our sales team at **${kb.contact.primaryPhone}** to receive the complete maintenance breakdown.`
  }
  if (q.includes('customize') || q.includes('customization')) {
    return `Internal customization options can be discussed with the engineering and architecture team, subject to structural safety and regulatory guidelines.`
  }
  if (q.includes('resale') || q.includes('rent') || q.includes('rental')) {
    return `Yes, the prime Kankarbagh location, RERA approval, and quality construction support long-term livability and strong rental/resale value. Our relationship team also provides guidance to homeowners for renting or resale after possession.`
  }

  // 20. Check FAQs
  for (const item of kb.faqs) {
    const cleanQ = cleanQuery(item.question)
    const keywords = cleanQ.split(' ').filter(w => w.length > 3)
    const matches = keywords.filter(k => q.includes(k))
    if (matches.length >= 2 || (keywords.length === 1 && matches.length === 1)) {
      return item.answer
    }
  }

  // 21. Fallback if outside knowledge base
  return FALLBACK_MESSAGE
}

// ─────────────────────────────────────────────────────────────
// Formatters for high quality, structured answers
// ─────────────────────────────────────────────────────────────

function formatProjectOverview(): string {
  const p = AI_KNOWLEDGE_BASE.project
  return `**${p.name}**\n*${p.tagline}*\n\n${p.overviewText}\n\n**Key Project Facts:**\n• **Status:** ${p.status}\n• **Land Area:** ${p.landArea} (Spread over 4 acres)\n• **Green Area:** ${p.greenArea}\n• **Towers:** ${p.towersCount} Towers\n• **Flats:** ${p.totalFlats} Total Flats (12 of 1BHK, 70 of 2BHK, 73 of 3BHK, plus EWS units in Tower II)\n• **Commercial:** ${p.shopsCount} Commercial Shops\n• **RERA Registration:** ${AI_KNOWLEDGE_BASE.reraAndLegal.reraRegistrationNumber}\n\nFor more details, visit our [Project Overview](/overview) or [Legal Disclosures](/legal-disclosures).`
}

function formatCompanyDetails(): string {
  const c = AI_KNOWLEDGE_BASE.company
  return `**${c.name}**\n*Tagline: ${c.taglines[0]}*\n\n${c.reputation}\n\n**Developer Highlights:**\n• **${c.experienceYears} Years** of Excellence in Bihar real estate\n• **${c.happyCustomers}**\n• **${c.completedProjects}**\n\n**Core Values:**\n${c.coreValues.map(v => `• **${v.title}:** ${v.description}`).join('\n')}\n\n• **Office Address:** ${c.headOffice}`
}

function formatLocation(q = ''): string {
  const loc = AI_KNOWLEDGE_BASE.location
  let response = `**Project Location:**\n📍 **${loc.siteAddress}**\n\n${loc.connectivityDescription}\n\n**Key Distances:**\n`
  for (const d of loc.keyDistances) {
    response += `• **${d.landmark}:** ${d.distance}\n`
  }
  response += `\nYou can explore directions and contact details on our [Contact Page](/contact).`
  return response
}

function formatAmenities(): string {
  const list = AI_KNOWLEDGE_BASE.amenities
  return `**B.S. HITECH World-Class Amenities (24 Features):**\n\n${list.map(a => `• ${a}`).join('\n')}\n\nExplore visual representations on our [Amenities Page](/amenities).`
}

function handleAmenityQueries(q: string): string {
  if (q.includes('parking') || q.includes('car park')) {
    return `Yes! **B.S. HITECH** offers dedicated **Ample Car Parking** with designated parking bays for both residents and visitors, surfaced with 12" x 12" heavy-duty parking tiles. We also have an approved Master Parking Plan covering all 4 towers.`
  }
  if (q.includes('lift') || q.includes('elevator')) {
    return `Yes! High-speed 6-passenger elevators from standard, reputed brands (**Kone / Otis / Johnson** or equivalent) are installed in each tower for seamless and reliable vertical transit.`
  }
  if (q.includes('power backup') || q.includes('generator') || q.includes('backup')) {
    return `Yes! We provide **24X7 Power Backup** powered by heavy-duty generators from **Cummins / Kirloskar** (or equivalent make) to guarantee continuous power to homes and common utilities.`
  }
  if (q.includes('safety') || q.includes('security') || q.includes('cctv')) {
    return `Safety is paramount at **B.S. HITECH**:\n• Gated community with 24/7 security personnel\n• CCTV surveillance across campus\n• Comprehensive Fire Safety systems & equipment\n• Earthquake Resistant RCC frame structure\n• Intercom facility in all apartments`
  }
  if (q.includes('water')) {
    return `The project features **24X7 Water Supply** equipped with deep boring/tube well and submersible pumps (KSB or equivalent), alongside an integrated **Rainwater Harvesting** system.`
  }
  if (q.includes('gym') || q.includes('fitness')) {
    return `Yes, the project includes a fully equipped **Gym Facility** with state-of-the-art fitness equipment for an active lifestyle.`
  }
  if (q.includes('pool') || q.includes('swimming')) {
    return `Yes! An Olympic-size **Swimming Pool** with a separate kids' pool section and trained lifeguards is included.`
  }
  if (q.includes('temple')) {
    return `Yes, an auspicious **Temple in Campus** is integrated for residents and daily prayer.`
  }

  return formatAmenities()
}

function formatFloorPlans(q = ''): string {
  const apts = AI_KNOWLEDGE_BASE.apartments

  if (q.includes('1bhk') || q.includes('1 bhk')) {
    const f = apts[0]
    return `**${f.eyebrow} - ${f.title}**\n\n• **Carpet Area:** ${f.carpetArea}\n• **Built-up Area:** ${f.builtArea}\n• **Configuration:** ${f.config}\n• **Estimated Price:** ${f.price}\n• **Overview:** ${f.desc}\n\nView 2D and 3D drawings on our [Floor Plans Page](/floor-plans).`
  }
  if (q.includes('2bhk') || q.includes('2 bhk')) {
    const f = apts[1]
    return `**${f.eyebrow} - ${f.title}**\n\n• **Carpet Area:** ${f.carpetArea}\n• **Built-up Area:** ${f.builtArea}\n• **Configuration:** ${f.config}\n• **Estimated Price:** ${f.price}\n• **Overview:** ${f.desc}\n\nView 2D and 3D drawings on our [Floor Plans Page](/floor-plans).`
  }
  if (q.includes('3bhk') || q.includes('3 bhk')) {
    const f = apts[2]
    return `**${f.eyebrow} - ${f.title}**\n\n• **Carpet Area:** ${f.carpetArea}\n• **Built-up Area:** ${f.builtArea}\n• **Configuration:** ${f.config}\n• **Estimated Price:** ${f.price}\n• **Overview:** ${f.desc}\n\nView 2D and 3D drawings on our [Floor Plans Page](/floor-plans).`
  }

  let text = `**B.S. HITECH Apartment Options & Floor Plans:**\n\n`
  for (const f of apts) {
    text += `**${f.name} (${f.builtArea} built-up / ${f.carpetArea} carpet)**\n• Config: ${f.config}\n• Price: ${f.price}\n\n`
  }
  text += `**Tower Layouts Available:**\n• Tower I: Typical 1st to 6th Floor Plan\n• Tower II: EWS Floor Plan\n• Tower III: Typical Floor Plan\n• Tower IV: 1st to 5th Floor Plan\n\nExplore interactive 2D, 3D, and interior views on our [Floor Plans Page](/floor-plans).`
  return text
}

function formatPricing(): string {
  const p = AI_KNOWLEDGE_BASE.pricing
  return `**B.S. HITECH Pricing Details:**\n\n• **Base Rate:** ${p.baseRate}\n\n**Apartment Pricing:**\n${p.apartments.map(a => `• **${a.type}:** ${a.priceRange}`).join('\n')}\n\n*${p.priceNote}*\n\nFlexible payment plans and home loan tie-ups are available. Contact our team at **${AI_KNOWLEDGE_BASE.contact.primaryPhone}** for a custom quote or [Book a Site Visit](/#contact).`
}

function formatPaymentPlans(): string {
  const plans = AI_KNOWLEDGE_BASE.paymentPlans
  let text = `**Flexible Payment Plans:**\n\n`
  for (const p of plans) {
    text += `**Plan ${p.planNumber}: ${p.title}**\n*${p.subtitle}*\n`
    for (const m of p.milestones) {
      text += `• ${m.milestone}: **${m.percentage}**\n`
    }
    if (p.note) text += `*Note: ${p.note}*\n`
    text += '\n'
  }
  text += `We have tie-ups with all major nationalized and private banks for hassle-free home loan disbursements. Learn more on our [Payment Plan Page](/payment-plan).`
  return text
}

function formatSiteVisit(): string {
  const sv = AI_KNOWLEDGE_BASE.bookingAndSiteVisit
  const c = AI_KNOWLEDGE_BASE.contact
  return `**Schedule a Site Visit to B.S. HITECH:**\n\n${sv.howToBookSiteVisit}\n\n**Contact Directly:**\n• **Phone:** ${c.primaryPhone} / ${c.salesPhone}\n• **WhatsApp:** [Chat on WhatsApp](${c.whatsappUrl})\n• **Timings:** ${c.workingHours}\n• **Site Address:** ${c.siteAddress}\n\nYou can also click the **"Book Site Visit"** button on the homepage to send an instant request!`
}

function formatReraAndLegal(q = ''): string {
  const leg = AI_KNOWLEDGE_BASE.reraAndLegal

  let text = `**RERA & Legal Disclosures:**\n\n`
  text += `• **RERA Approved:** Yes, registered with ${leg.authority}.\n`
  text += `• **RERA Registration No:** **${leg.reraRegistrationNumber}**\n\n`
  text += `**Official Statutory Documents Available on Website:**\n`
  for (const doc of leg.availableDisclosures) {
    text += `• **${doc.title}:** ${doc.description}\n`
  }
  text += `\nYou can view and download all official PDFs directly on our [Legal & Mandatory Disclosures Page](${leg.legalDisclosuresPageUrl}).`
  return text
}

function formatContact(): string {
  const c = AI_KNOWLEDGE_BASE.contact
  return `**Contact Bigrahpurm Developers:**\n\n• **Primary Phone:** ${c.primaryPhone}\n• **Sales Phone:** ${c.salesPhone}\n• **WhatsApp:** [${c.whatsapp}](${c.whatsappUrl})\n• **Email:** ${c.email}\n• **Office Address:** ${c.officeAddress}\n• **Site Address:** ${c.siteAddress}\n• **Hours:** ${c.workingHours}\n\nFeel free to submit an enquiry anytime on our [Contact Page](/contact).`
}

function formatSpecifications(q = ''): string {
  const specs = AI_KNOWLEDGE_BASE.specifications
  let text = `**B.S. HITECH Construction Specifications:**\n\n`
  for (const s of specs.slice(0, 8)) {
    text += `• **${s.category}:** ${s.details}\n`
  }
  text += `\nPlus branded 6-passenger lifts (Kone/Otis/Johnson), Cummins/Kirloskar backup generator, deep tube well boring, and servant common toilets. All details are available on the [Project Overview](/overview).`
  return text
}
