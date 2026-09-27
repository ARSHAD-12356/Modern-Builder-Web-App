/**
 * Centralized Knowledge Base for BD AI Assistant
 * Extracted 100% from actual website content, approved drawings, and legal disclosures.
 * DO NOT FABRICATE or hallucinate information.
 */

export interface ApartmentPlan {
  name: string
  eyebrow: string
  title: string
  desc: string
  carpetArea: string
  builtArea: string
  config: string
  price: string
  planImage: string
}

export interface SpecificationItem {
  category: string
  details: string
}

export interface PaymentPlanItem {
  planNumber: string
  title: string
  subtitle: string
  milestones: Array<{ milestone: string; percentage: string }>
  note?: string
}

export interface FaqItem {
  question: string
  answer: string
  category: string
}

export const AI_KNOWLEDGE_BASE = {
  company: {
    name: 'BIGRAHPURM DEVELOPERS PVT. LTD.',
    shortName: 'Bigrahpurm Developers',
    brandName: 'BD',
    taglines: [
      'BUILDING BETTER TOMORROW',
      'A Legacy of Trust. Built on values. Designed for life.',
      'Live Better. Live Brighter.',
    ],
    experienceYears: '15+',
    completedProjects: 'Multiple Projects Completed across residential & commercial sectors',
    happyCustomers: '50+ Happy Customers',
    reputation:
      'Bigrahpurm Developers Pvt. Ltd. is a trusted name in Patna\'s real estate sector with over 15 years of experience in delivering quality residential and commercial projects. Built on values of excellence, transparency, and customer satisfaction.',
    coreValues: [
      {
        title: 'Quality Construction',
        description: 'Using premium materials and latest construction technologies.',
      },
      {
        title: 'Timely Delivery',
        description: '100% track record of project completion on time.',
      },
      {
        title: 'Transparent Dealings',
        description: 'Clear documentation and strict RERA compliance.',
      },
      {
        title: 'Customer-Centric Approach',
        description: 'Dedicated relationship and after-sales service team.',
      },
    ],
    headOffice: 'Kankarbagh, Patna - 800020, Bihar',
  },

  project: {
    name: 'B.S. HITECH APARTMENT',
    shortName: 'B.S. HITECH',
    tagline: 'Designed For A Brighter Life.',
    status: 'Ongoing Project',
    propertyType: 'Residential & Commercial (1 BHK, 2 BHK, 3 BHK Luxurious Flats & Commercial Shops)',
    landArea: '4 Acres',
    greenArea: '60% Open & Landscaped Green Area',
    towersCount: 4,
    totalFlats: 189,
    shopsCount: 16,
    flatBreakdown: {
      '1BHK': 12,
      '2BHK': 70,
      '3BHK': 73,
      otherUnits: 'Tower II includes dedicated EWS units',
    },
    keyHighlights: [
      'Prime Location: Khemni Chak, Kankarbagh (3 km from Patna Junction)',
      'RERA Approved: BRERAP182628060325290629E00',
      'Vastu Compliant: Thoughtfully designed residential layouts',
      '60% Open Green Area: Landscaped gardens, jogging track, and breathing spaces',
      'Modern Amenities: Swimming pool, gym, club house, temple, indoor games & sports courts',
      '24/7 Security: Gated community, CCTV surveillance, and intercom facility',
      'Reliable Utilities: 24/7 water supply with borewell and 24/7 power backup with generator',
    ],
    overviewText:
      'B.S. HITECH APARTMENT is a flagship premium residential project by Bigrahpurm Developers Pvt. Ltd. located at Khemni Chak, Kankarbagh, Patna. Spread over 4 acres with 4 towers and 60% open green space, it offers 189 thoughtfully planned apartments (1, 2 & 3 BHK) and 16 commercial shops. The project harmonizes natural light, ventilation, Vastu compliance, and modern lifestyle amenities.',
  },

  location: {
    siteAddress: 'Khemni Chak, Kankarbagh, Patna - 800027, Bihar',
    officeAddress: 'Kankarbagh, Patna - 800020, Bihar',
    city: 'Patna',
    state: 'Bihar',
    pincode: '800027',
    keyDistances: [
      { landmark: 'Patna Junction Railway Station', distance: '3 to 8 Km' },
      { landmark: 'Patna Airport', distance: '14.3 Km' },
      { landmark: 'Nearest School', distance: 'Walking Distance' },
      { landmark: 'Nearest Hospital', distance: 'Walking Distance' },
      { landmark: 'Nearest Shopping Mall', distance: '1 Km' },
    ],
    connectivityDescription:
      'Strategically located in Khemni Chak, Kankarbagh — one of Patna\'s most prime residential hubs. Excellent connectivity to educational institutions, healthcare centers, shopping complexes, and major transport hubs, minimizing daily commute while offering tranquil living.',
    mapPageUrl: '/contact',
  },

  apartments: [
    {
      name: '1BHK',
      eyebrow: '1 BHK APARTMENT',
      title: 'Smart Living, Greater Possibilities',
      desc: 'Thoughtfully designed 1BHK home offering comfort, functionality and effortless modern living.',
      carpetArea: '550 sq.ft.',
      builtArea: '750 sq.ft.',
      config: '1 Bedroom, 1 Bathroom, Living/Dining, Kitchen',
      price: '₹37.5 – ₹41.25 Lakhs',
      planImage: '/images/floorplans/1bhk-plan.png',
    },
    {
      name: '2BHK',
      eyebrow: '2 BHK APARTMENT',
      title: 'Room to Grow, Designed for Life',
      desc: 'Considered 2BHK residence with generous proportions and flexible spaces for modern families.',
      carpetArea: '850 sq.ft.',
      builtArea: '1150 sq.ft.',
      config: '2 Bedrooms, 2 Bathrooms, Living/Dining, Kitchen, Balcony',
      price: '₹57.5 – ₹63.25 Lakhs',
      planImage: '/images/floorplans/2bhk-plan.png',
    },
    {
      name: '3BHK',
      eyebrow: '3 BHK APARTMENT',
      title: 'More Space, More Possibilities',
      desc: 'Expansive 3BHK residence crafted for family comfort, seamless living and effortless entertaining.',
      carpetArea: '1250 sq.ft.',
      builtArea: '1650 sq.ft.',
      config: '3 Bedrooms, 2 Bathrooms, Living/Dining, Kitchen, 2 Balconies, Utility',
      price: '₹82.5 – ₹90.75 Lakhs',
      planImage: '/images/floorplans/3bhk-plan.png',
    },
  ] as ApartmentPlan[],

  towerFloorPlans: [
    {
      tower: 'Tower I',
      title: 'TOWER - I',
      detail: 'Typical 1st to 6th Floor Plan',
      image: '/BS_Hitech_Required_Plans/Tower-I_Floor-Plan.jpg',
    },
    {
      tower: 'Tower II (EWS)',
      title: 'TOWER - II (EWS)',
      detail: 'EWS Floor Plan',
      image: '/BS_Hitech_Required_Plans/Tower-II_EWS_Floor-Plan.jpg',
    },
    {
      tower: 'Tower III',
      title: 'TOWER - III',
      detail: 'Typical Floor Plan',
      image: '/BS_Hitech_Required_Plans/Tower-III_Floor-Plan.jpg',
    },
    {
      tower: 'Tower IV',
      title: 'TOWER - IV',
      detail: '1st to 5th Floor Plan',
      image: '/BS_Hitech_Required_Plans/Tower-IV_1st-to-5th-Floor-Plan.jpg',
    },
    {
      tower: 'Parking Plan',
      title: 'Parking Plan (All Towers)',
      detail: 'Master Parking Layout for residents and visitors',
      image: '/BS_Hitech_Required_Plans/Parking-Plan_All-Towers.jpg',
    },
    {
      tower: 'Site Plan',
      title: 'Master Site Plan',
      detail: 'Master Landscape & Community Layout',
      image: '/BS_Hitech_Required_Plans/Site-Plan.jpg',
    },
  ],

  amenities: [
    'Swimming Pool (Olympic-size pool with kids section and trained lifeguards)',
    'Gym Facility (Fully equipped fitness center with modern equipment)',
    'Children Playing Area (Safe & modern equipment for kids)',
    'Club House (Spacious club house with banquet facilities & party hall)',
    'Temple in Campus',
    'Green Garden Area & Landscaped Spaces (60% open area)',
    'Fire Safety systems & equipment',
    'Earthquake Resistant RCC Frame Structure',
    'Intercom Facility for all flats',
    'High Speed Elevator (6-passenger capacity, Kone / Otis / Johnson or equivalent)',
    'Visitor Parking',
    '24X7 Water Supply (Deep tube well with submersible pump)',
    '24X7 Power Backup (Generator by Cummins / Kirloskar or equivalent)',
    'Garden & Jogging Track',
    'CCTV Security & 24/7 Guarded Gated Community',
    'Basketball Court',
    'Badminton Court',
    'Multipurpose Hall',
    'Party Lawn',
    'Guest House',
    'Landscaping & Green Area',
    'Ample Car Parking (Designated resident & visitor parking)',
    'Water Harvesting (Rainwater harvesting system)',
    'Indoor Game Facility',
  ],

  specifications: [
    {
      category: 'Structure',
      details: 'R.C.C frame structure with brick work in cement mortar as per structural consultant design.',
    },
    {
      category: 'Door Frames (Chowkhats)',
      details: 'Door frames made of durable Sal wood.',
    },
    {
      category: 'Main Door',
      details: 'Flush door with veneer & polish on both sides.',
    },
    {
      category: 'Other Doors',
      details: '30 MM thick ISI mark flush doors with paint on both sides.',
    },
    {
      category: 'Windows',
      details: 'Two-track aluminium sliding/openable NCL make windows.',
    },
    {
      category: 'Flooring',
      details: 'Premium Vitrified Tiles flooring across all flat areas.',
    },
    {
      category: 'Kitchen',
      details: 'Tile flooring, granite slab working platform, 24" high wall dado tiles, and stainless steel sink.',
    },
    {
      category: 'Bathroom',
      details: 'Tile flooring, glazed wall tiles up to 7 ft height, chromium-plated Jaquar (or equivalent) fittings, acrylic/fibreglass white cistern.',
    },
    {
      category: 'Electrical',
      details: 'Concealed conduits with copper wiring and branded electrical switches & accessories.',
    },
    {
      category: 'Dining Space',
      details: 'Provision of one dedicated wash basin.',
    },
    {
      category: 'Internal Walls',
      details: 'Finished smooth with Plaster of Paris (POP).',
    },
    {
      category: 'External Walls',
      details: 'Finished with Birla/Johnson putty and painted with weather coat / texture paint.',
    },
    {
      category: 'Parking Area',
      details: '12" x 12" heavy-duty parking tiles.',
    },
    {
      category: 'Water Boring',
      details: 'Boring & tube well of adequate capacity with direct/reserve circulation and KSB (or equivalent) submersible pump.',
    },
    {
      category: 'Common Toilet',
      details: 'Dedicated common toilet provided for servants/service staff.',
    },
    {
      category: 'Lifts / Elevators',
      details: 'High-speed 6-passenger capacity elevators from standard brands (Kone / Otis / Johnson or equivalent).',
    },
    {
      category: 'Power Backup / Generator',
      details: 'Generator of adequate capacity from Cummins / Kirloskar (or equivalent) for uninterrupted standby power.',
    },
  ] as SpecificationItem[],

  pricing: {
    baseRate: 'Starting at ₹5000 to ₹5500 per sq.ft.',
    apartments: [
      { type: '1 BHK (750 sq.ft. built-up)', priceRange: '₹37.5 – ₹41.25 Lakhs' },
      { type: '2 BHK (1150 sq.ft. built-up)', priceRange: '₹57.5 – ₹63.25 Lakhs' },
      { type: '3 BHK (1650 sq.ft. built-up)', priceRange: '₹82.5 – ₹90.75 Lakhs' },
    ],
    priceNote:
      'Exact pricing depends on unit size, tower, floor preference, and active payment plans. Our sales team provides customized quotations and payment schedules.',
    isNegotiable:
      'Our sales team can guide you through available festive offers, early bird concessions, and flexible payment plan options for your preferred apartment.',
  },

  paymentPlans: [
    {
      planNumber: '01',
      title: 'Standard Payment Plan',
      subtitle: 'A simple and straightforward construction-linked plan for comfortable home buying.',
      milestones: [
        { milestone: 'On Booking', percentage: '10%' },
        { milestone: 'Within 30 days of Booking', percentage: '15%' },
        { milestone: 'On Completion of Foundation', percentage: '15%' },
        { milestone: 'On Completion of Plinth', percentage: '10%' },
        { milestone: 'On Completion of Roof Slab', percentage: '25%' },
        { milestone: 'On Completion of Finishing', percentage: '20%' },
        { milestone: 'On Possession', percentage: '5%' },
      ],
    },
    {
      planNumber: '02',
      title: 'Early Bird Discount Plan',
      subtitle: 'Special benefits for early decision makers.',
      milestones: [
        { milestone: 'On Booking (with 5% Discount)', percentage: '20%' },
        { milestone: 'Within 60 days of Booking', percentage: '30%' },
        { milestone: 'On Completion of Structure', percentage: '30%' },
        { milestone: 'On Possession', percentage: '20%' },
      ],
      note: '5% discount applicable only on bookings before September 2025.',
    },
    {
      planNumber: '03',
      title: 'Bank Linked Plan',
      subtitle: 'Easy home loans with trusted banking partners.',
      milestones: [
        { milestone: 'On Booking', percentage: '10%' },
        { milestone: 'Within 30 days of Booking', percentage: '10%' },
        { milestone: 'Construction Linked (Bank Disbursement)', percentage: '75%' },
        { milestone: 'On Possession', percentage: '5%' },
      ],
      note: 'Bigrahpurm Developers has tie-ups with all major banks for home loans at attractive interest rates.',
    },
  ] as PaymentPlanItem[],

  bookingAndSiteVisit: {
    howToBookSiteVisit:
      'You can easily schedule a site visit by:\n1. Clicking "Book Site Visit" on the website homepage to open the site visit form.\n2. Submitting your enquiry on the Contact section.\n3. Calling or messaging on WhatsApp at +91 9204649875.',
    bookingProcess:
      '1. Choose your preferred apartment configuration (1, 2, or 3 BHK).\n2. Select a suitable payment plan (Standard, Early Bird, or Bank-Linked).\n3. Submit required KYC documentation.\n4. Complete the initial booking amount (10% to 20% based on chosen plan).',
    documentsRequired:
      'Government-issued ID Proof (Aadhaar Card, PAN Card), Address Proof, Passport-size photographs, and Cheque / Bank draft for booking payment. Our sales executive will assist you with the complete checklist.',
  },

  contact: {
    primaryPhone: '+91 9204649875',
    salesPhone: '+91 9204649875',
    whatsapp: '+91 9204649875',
    whatsappUrl: 'https://wa.me/919204649875',
    email: 'bigrahpurmdevelopersprivatelim@gmail.com',
    workingHours: 'Monday to Saturday: 10:00 AM – 6:00 PM',
    officeAddress: 'Sorangpur Main Rd, East Ram Krishna Nagar, Ramkrishna Nagar, Patna , Bihar 800027, India',
    siteAddress: 'Sorangpur Main Rd, East Ram Krishna Nagar, Ramkrishna Nagar, Patna , Bihar 800027, India',
    websiteUrl: '/',
  },

  reraAndLegal: {
    isReraApproved: true,
    authority: 'Real Estate Regulatory Authority (RERA), Bihar',
    reraRegistrationNumber: 'BRERAP182628060325290629E00',
    reraCertificateFile: '/New Assets/Revised Rera Certificate- RERAP09252024165145-1 (4).pdf',
    gstCertificateFile: '/New Assets/GST CERTIFICATE ( BIGRAHPURM DEVELOPERS).pdf',
    panCardFile: '/New Assets/PAN_CARD.pdf',
    legalDisclosuresPageUrl: '/legal-disclosures',
    availableDisclosures: [
      {
        title: 'RERA Registration Certificate',
        description:
          'Official registration certificate issued by the Real Estate Regulatory Authority (RERA), Bihar (2 pages, 193 KB PDF).',
        file: '/New Assets/Revised Rera Certificate- RERAP09252024165145-1 (4).pdf',
      },
      {
        title: 'Mandatory Disclosure (GST Certificate)',
        description:
          'Statutory GST registration certificate of Bigrahpurm Developers Pvt. Ltd. (3 pages, 824 KB PDF).',
        file: '/New Assets/GST CERTIFICATE ( BIGRAHPURM DEVELOPERS).pdf',
      },
      {
        title: 'Promoter PAN Card',
        description:
          'Permanent Account Number (PAN) identity document of the promoter for regulatory and statutory compliance (1 page, 60 KB PDF).',
        file: '/New Assets/PAN_CARD.pdf',
      },
    ],
    importantNotice:
      'All statutory documents are provided on the website for complete transparency and compliance. Project details and specifications are subject to regulatory approvals.',
  },

  faqs: [
    {
      question: 'Is BIGRAHPURM DEVELOPERS RERA approved?',
      answer:
        'Yes, B.S. HITECH by BIGRAHPURM DEVELOPERS is fully RERA approved with registration number BRERAP182628060325290629E00. All statutory approvals and clearances are in place, and you can view the official certificate on our Legal Disclosures page.',
      category: 'Project',
    },
    {
      question: 'Is the location good for my family?',
      answer:
        'Yes. The project is located at Khemni Chak, Kankarbagh, Patna-800027, just 3 km from Patna Junction. Reputed schools and multi-specialty hospitals are within walking distance, and shopping hubs are only 1 km away.',
      category: 'Location',
    },
    {
      question: 'Is the area safe?',
      answer:
        'The community is developed as a secure gated community with 24/7 CCTV surveillance, manned security personnel, and intercom facilities in every flat.',
      category: 'Location',
    },
    {
      question: 'Is the price negotiable?',
      answer:
        'Our sales team will guide you through the latest pricing, active festive offers, and flexible payment plan options for your preferred apartment configuration.',
      category: 'Pricing',
    },
    {
      question: 'Why costlier than others nearby?',
      answer:
        'The pricing reflects high-grade RCC construction, Sal wood door frames, branded fittings (Jaquar or equivalent), 60% open green space, 4 acres land parcel, and over 24 lifestyle amenities.',
      category: 'Pricing',
    },
    {
      question: 'Do you have flexible payment plans?',
      answer:
        'Yes. We offer 3 flexible plans: Standard Construction-Linked Plan (7 milestones), Early Bird Discount Plan (with 5% discount), and Bank-Linked Plan (75% bank disbursement).',
      category: 'Payments',
    },
    {
      question: 'What facilities will I get?',
      answer:
        'Residents enjoy 24 lifestyle amenities including a swimming pool, fitness gym, club house, children’s play area, temple on campus, jogging track, sports courts, visitor parking, power backup, and landscaped gardens.',
      category: 'Amenities',
    },
    {
      question: 'What are the maintenance charges?',
      answer:
        'Maintenance charges are shared transparently with buyers before booking and depend on the selected apartment configuration (1, 2, or 3 BHK) and common facilities.',
      category: 'Amenities',
    },
    {
      question: 'Is resale easy?',
      answer:
        'The prime Kankarbagh address, 4-acre gated layout, RERA approval, and quality construction ensure strong rental demand and long-term capital appreciation.',
      category: 'Project',
    },
    {
      question: 'Will my family be happy here?',
      answer:
        'With 60% open green areas, dedicated children\'s play zones, campus temple, community club house, and sports courts, B.S. HITECH is crafted for joyful community living.',
      category: 'Amenities',
    },
    {
      question: 'Will you help with renting/resale?',
      answer:
        'Yes. Our customer relationship team provides guidance and support to homeowners for renting or resale after possession.',
      category: 'Project',
    },
    {
      question: 'What is the expected possession date?',
      answer:
        'The expected possession schedule is clearly outlined in the agreement and shared transparently during booking. Please contact our sales team for the latest block-wise possession timelines.',
      category: 'Possession',
    },
    {
      question: 'Do you offer home loan assistance?',
      answer:
        'Yes. Bigrahpurm Developers has tie-ups with all major nationalized and private banks to assist you with hassle-free home loan approvals at attractive interest rates.',
      category: 'Payments',
    },
    {
      question: 'Can I customize my apartment?',
      answer:
        'Minor internal customizations can be discussed with our engineering and architecture team, subject to structural safety and regulatory guidelines.',
      category: 'Project',
    },
    {
      question: 'What documents are required for booking?',
      answer:
        'Standard KYC documents: Aadhaar card, PAN card, passport-size photographs, address proof, and booking payment. Our relationship team provides the full checklist.',
      category: 'Legal',
    },
  ] as FaqItem[],

  websiteNavigation: [
    { label: 'Overview', url: '/overview' },
    { label: 'Amenities', url: '/amenities' },
    { label: 'Floor Plans', url: '/floor-plans' },
    { label: 'Payment Plan', url: '/payment-plan' },
    { label: 'Gallery', url: '/gallery' },
    { label: 'Testimonials', url: '/testimonials' },
    { label: 'FAQ', url: '/faq' },
    { label: 'Contact', url: '/contact' },
    { label: 'Legal Disclosures', url: '/legal-disclosures' },
  ],
}
