export const company = {
  name: "Engineering Automation Technology Limited",
  short: "EATL",
  tagline: "Delivering Excellence in Oil & Gas Services",
  founded: 2007,
  email: "enquiries@eatlng.com",
  phone: "+234-901-033-6048",
  phoneHref: "tel:+2349010336048",
  altPhone: "+234-708-882-7367",
  linkedin: "https://www.linkedin.com/company/eatlng/",
  x: "https://x.com/Engr_Automation",
  summary:
    "EATL is an indigenous technological engineering company incorporated in 2007 under the laws of the Federal Republic of Nigeria. We deploy certified, qualified and experienced personnel to deliver quality services across the Oil & Gas value chain — from engineering and construction to instrumentation, testing, calibration and asset integrity.",
};

export const offices = [
  {
    name: "Operational Headquarters",
    city: "Eket, Akwa Ibom",
    address: "KM 1, Ikot Udoma – Ataidung Road, Eket, Akwa Ibom State, Nigeria",
    phone: "+234-810-337-5124",
    phoneHref: "tel:+2348103375124",
    note: "Fabrication yard, flow metering & calibration laboratories",
  },
  {
    name: "Corporate Office",
    city: "Lekki, Lagos",
    address: "3A Sule Onabiyi Street, Off Christ Avenue, Off Admiralty Road, Lekki Phase 1, Lagos State, Nigeria",
    phone: "+234-901-033-6048",
    phoneHref: "tel:+2349010336048",
    note: "Executive management, commercial & business development",
  },
  {
    name: "Project Office",
    city: "Port Harcourt, Rivers",
    address: "5 Apagodo Street, Off Ada George Road, Port Harcourt, Rivers State, Nigeria",
    phone: "+234-901-033-6050",
    phoneHref: "tel:+2349010336050",
    note: "Project delivery & client support for the Eastern operations",
  },
  {
    name: "US Office",
    city: "Houston, Texas",
    address: "Ten Plaza West, 15915 Katy Fwy, Houston, Texas 77094, USA",
    phone: "",
    phoneHref: "",
    note: "OEM liaison, procurement & international partnerships",
  },
];

export const stats = [
  { value: 17, suffix: "+", label: "Years of Quality Service" },
  { value: 1334, suffix: "+", label: "Completed Projects" },
  { value: 10000, suffix: "+", label: "Active Man-Hours" },
  { value: 9, suffix: "+", label: "International OEM Partners" },
  { value: 10, suffix: "+", label: "Awards & Recognition" },
  { value: 4, suffix: "", label: "ISO Certifications / Accreditations" },
];

export const certifications = [
  {
    code: "ISO 9001:2015",
    title: "Quality Management System",
    desc: "Our processes are periodically reviewed for continual improvement to deliver consistent, compliant service quality.",
  },
  {
    code: "ISO 45001:2018",
    title: "Occupational Health & Safety",
    desc: "A structured safety management system targeting zero fatalities and zero lost-time injuries.",
  },
  {
    code: "ISO 14001:2015",
    title: "Environmental Management",
    desc: "Preventing pollution and reducing environmental impact across all project sites and facilities.",
  },
  {
    code: "ISO/IEC 17025:2017",
    title: "Testing & Calibration Laboratories",
    desc: "Our Electrical & Instrumentation Laboratory is accredited for the competence of testing and calibration.",
  },
];

export const memberships = [
  { abbr: "NCDMB", name: "Nigerian Content Development & Monitoring Board — Project 100 Company" },
  { abbr: "ASNT", name: "American Society for Non-Destructive Testing" },
  { abbr: "OGTAN", name: "Oil & Gas Trainers Association of Nigeria" },
  { abbr: "ISPON", name: "Institute of Safety Professionals of Nigeria" },
  { abbr: "COREN", name: "Council for the Regulation of Engineering in Nigeria" },
];

export const coreValues = [
  { name: "Safety", desc: "Nothing is so urgent that it cannot be done safely." },
  { name: "Teamwork", desc: "We win together — across disciplines, sites and partners." },
  { name: "Respect", desc: "For our people, our clients, our host communities and the environment." },
  { name: "Integrity", desc: "We do what we say, with transparency and accountability." },
  { name: "Creativity", desc: "Fresh thinking applied to complex field challenges." },
  { name: "Leadership", desc: "Technical leadership that sets the standard for indigenous service companies." },
  { name: "Innovation", desc: "Investing in first-of-its-kind facilities and technologies for West Africa." },
];

export const milestones = [
  { year: "2007", title: "Incorporation", desc: "EATL is incorporated under the laws of the Federal Republic of Nigeria as an indigenous engineering services company." },
  { year: "2010", title: "Fabrication & Field Services", desc: "Operational base established in Eket, Akwa Ibom with fabrication, welding and mechanical installation capabilities." },
  { year: "2014", title: "OEM Partnerships", desc: "Authorised service-centre and distribution agreements signed with Emerson, Wrapmaster and Cygnus Instruments." },
  { year: "2017", title: "ISO Certification", desc: "Management system certified to ISO 9001, ISO 14001 and OHSAS/ISO 45001 standards." },
  { year: "2020", title: "ISO/IEC 17025 Accreditation", desc: "Electrical & Instrumentation Laboratory accredited for testing and calibration competence." },
  { year: "2023", title: "NCDMB Project 100", desc: "Recognised by the NCDMB as a Project 100 company, supporting Nigerian content growth." },
  { year: "2026", title: "Flow Metering Facility Launch", desc: "Africa's first gravimetric flow metering & calibration facility commissioned with NCDMB backing." },
];

export const leadership = [
  { role: "Managing Director / CEO", focus: "Corporate strategy, governance and client relationships", initials: "MD" },
  { role: "Executive Director, Operations", focus: "Field execution, HSE performance and project delivery", initials: "ED" },
  { role: "Head, Testing & Metering", focus: "Flow metering laboratory, calibration & metrology", initials: "TM" },
  { role: "Head, Engineering", focus: "FEED, detailed design & multidisciplinary engineering", initials: "HE" },
  { role: "Head, Instrumentation & Control", focus: "Automation, PLC/DCS, SCADA & ICSS systems", initials: "IC" },
  { role: "QHSE Manager", focus: "ISO management systems, audits & safety culture", initials: "QH" },
];

export type Service = {
  slug: string;
  name: string;
  short: string;
  tagline: string;
  intro: string;
  image: string;
  icon: string;
  services: string[];
  highlights: { title: string; desc: string }[];
  sectors: string[];
  cta: string;
};

export const services: Service[] = [
  {
    slug: "engineering",
    name: "Engineering",
    short: "Engineering",
    tagline: "Solutions that Fuel the Future",
    intro:
      "We provide end-to-end engineering solutions to support the full project lifecycle — from conceptual design and feasibility studies to detailed engineering and field execution. Our multidisciplinary expertise ensures technically sound, cost-effective and compliant solutions tailored to industrial, energy, infrastructure and manufacturing sectors.",
    image: "/images/eatl/engineering.jpg",
    icon: "drafting",
    services: [
      "Engineering Administration",
      "Basic Design, FEED & Tender Design",
      "Field Studies & Site Surveys",
      "Detailed Engineering",
      "Research & Development",
      "Technical Evaluation",
      "Process, Mechanical, Civil & Structural Engineering",
      "Piping, Chemical, Instrumentation & Electrical Engineering",
      "CAD, 3D Modelling & Drafting",
    ],
    highlights: [
      { title: "Lifecycle Coverage", desc: "Concept → FEED → Detailed Design → As-Built, with a single accountable team." },
      { title: "Multidisciplinary", desc: "Process, mechanical, civil, piping, E&I and chemical under one roof." },
      { title: "Standards-Driven", desc: "Designs compliant with API, ASME, IEC, ISO and client specifications." },
    ],
    sectors: ["Upstream", "Midstream", "Refining & Petrochemical", "Power", "Manufacturing"],
    cta: "We deliver precision-engineered solutions with a focus on safety, efficiency and operational excellence.",
  },
  {
    slug: "construction-and-maintenance",
    name: "Construction & Maintenance",
    short: "Construction",
    tagline: "Building Today, Sustaining Tomorrow",
    intro:
      "Delivering end-to-end industrial construction and maintenance services, this portfolio covers fabrication, installation and project execution with a strong emphasis on quality, safety and operational efficiency — onshore and offshore.",
    image: "/images/eatl/ec.jpg",
    icon: "wrench",
    services: [
      "Fabrication (Fit-up, CS/SS/CuNi Welding, Blasting, Painting, Machining)",
      "Green Field & Brown Field Projects",
      "Operation & Maintenance",
      "Facility Upgrade & Modification",
      "Civil Construction",
      "Mechanical Installation Services (Onshore / Offshore)",
      "Scaffolding & Equipment Leasing",
      "Drafting & Site Survey",
      "Turnaround Maintenance (TAM) Support",
    ],
    highlights: [
      { title: "Certified Welders", desc: "Coded welders for carbon steel, stainless and copper-nickel alloys." },
      { title: "Turnaround Ready", desc: "Proven support on complex turnarounds for IOC clients including Shell." },
      { title: "Own Fabrication Yard", desc: "Eket fabrication facility with blasting, painting and machining." },
    ],
    sectors: ["Offshore Platforms", "Flow Stations", "Gas Plants", "Terminals", "Refineries"],
    cta: "From fabrication to turnaround support, our crews build and sustain critical assets safely.",
  },
  {
    slug: "instrumentation-and-control",
    name: "Instrumentation & Control",
    short: "Instrumentation",
    tagline: "Precision at Every Stage",
    intro:
      "We provide comprehensive automation and control system solutions to enhance operational efficiency, safety and reliability across industrial and infrastructure applications. Our expertise covers design, installation, configuration and maintenance of advanced instrumentation and control systems.",
    image: "/images/eatl/ic.jpg",
    icon: "cpu",
    services: [
      "Custom Metering System & LACT Unit Design (Emerson Process Measurement partnership)",
      "Low Voltage Control Panels",
      "PLC / DCS Installation & Configuration",
      "Variable Frequency Drive & Motor Controls Installation",
      "SCADA / HMI Application Development",
      "Remote Monitoring Solutions",
      "Integrated Control & Safety Systems (ICSS)",
      "Energy & Transportation Systems (ETS)",
      "Process Automation & Instrumentation",
      "Process System & Solutions (PSS) and Reliability Solutions",
    ],
    highlights: [
      { title: "Emerson Partner", desc: "Authorised in-country service centre for Emerson Automation Solutions." },
      { title: "ICSS Expertise", desc: "Safety-instrumented systems engineered to IEC 61511 principles." },
      { title: "Remote Visibility", desc: "SCADA and remote monitoring for distributed assets." },
    ],
    sectors: ["Gas Processing", "Pipelines & Terminals", "Power Generation", "Water & Utilities"],
    cta: "Advanced instrumentation and control systems that keep your processes running without a hitch.",
  },
  {
    slug: "testing-and-calibration",
    name: "Testing & Metering",
    short: "Testing & Metering",
    tagline: "Ensuring Accuracy, Every Time",
    intro:
      "Specialised technical services designed to verify system integrity, ensure operational safety and maintain regulatory compliance. Our rigorous testing protocols and precision calibration services — delivered from West Africa's first gravimetric flow metering facility and an ISO/IEC 17025 accredited laboratory — provide reliable performance validation for critical assets and processes.",
    image: "/images/eatl/about.jpg",
    icon: "gauge",
    services: [
      "Flow Meter Calibration (Liquid & Gas, all meter types)",
      "ISO/IEC 17025 Accredited Calibration Laboratory & Process Instrument Services",
      "Comprehensive Metering System Validation",
      "OEM Authorised Repairs (Megger, Seta, Koehler, Cygnus)",
      "Hydrotest Services",
      "Nitrogen Purging Services",
      "Lube Oil Flushing Services",
      "Valve Maintenance & Repair",
      "Instrumentation System Upgrades & Commissioning",
      "Technical Personnel Provision",
    ],
    highlights: [
      { title: "First in West Africa", desc: "Gravimetric flow metering facility launched with NCDMB backing." },
      { title: "Traceable Results", desc: "Measurement traceability to international standards." },
      { title: "Fast Turnaround", desc: "In-country calibration eliminates costly overseas shipping and delays." },
    ],
    sectors: ["Custody Transfer", "Fiscal Metering", "Allocation Metering", "Laboratory Instruments"],
    cta: "For reliable performance validation and system optimisation, our technical team stands ready.",
  },
  {
    slug: "asset-integrity-management",
    name: "Asset Integrity Management",
    short: "Asset Integrity",
    tagline: "Protecting Your Assets, Preserving Your Value",
    intro:
      "Specialised engineering services combining advanced repair technologies with rigorous testing protocols to ensure operational reliability, regulatory compliance and extended asset lifespan across critical infrastructure.",
    image: "/images/eatl/aim.png",
    icon: "shield",
    services: [
      "Leak Repair & Corrosion Control using Fibre-Reinforced Composites (Wrapmaster)",
      "Nitrogen Purging",
      "GRE Pipe Fit-Up & Repair Services",
      "Coating Services (Corrosion Management)",
      "Flange Management (Torque & Hot Bolting)",
      "Lube Oil Flushing",
      "Production Operations Support",
      "Onshore / Offshore Maintenance",
      "Rig Condition Surveys & Facility Technical Audits",
    ],
    highlights: [
      { title: "Composite Repairs", desc: "Authorised Wrapmaster applicator for engineered composite repair systems." },
      { title: "Extend Asset Life", desc: "Reduce downtime and defer capex with engineered integrity programmes." },
      { title: "Audit & Survey", desc: "Rig condition surveys and technical audits by certified inspectors." },
    ],
    sectors: ["Pipelines", "Pressure Vessels", "Drilling Rigs", "Storage Tanks", "Offshore Structures"],
    cta: "Maximise equipment lifespan, reduce downtime and ensure peak performance.",
  },
];

export const labs = [
  {
    slug: "flow-metering-lab",
    name: "Multifaceted Flow Metering Laboratory",
    badge: "First of its kind in West Africa",
    image: "/images/eatl/lap.png",
    intro:
      "Discover precision you can trust. Our state-of-the-art gravimetric flow metering laboratory offers high-precision calibration for oil and gas meters of all types. With advanced technology, expert technicians and fast turnaround, we ensure unmatched accuracy, traceability and reliability.",
    services: [
      "Custom metering system & LACT unit design (through Emerson Process Measurement partnership)",
      "Professional flow meter installation & commissioning",
      "Certified flow meter calibration services",
      "Comprehensive metering system validation",
      "Meter proving & uncertainty analysis",
    ],
    specs: [
      { k: "Method", v: "Gravimetric (primary standard)" },
      { k: "Meter types", v: "Turbine, PD, Coriolis, Ultrasonic, Orifice, Vortex" },
      { k: "Fluids", v: "Liquid hydrocarbons, water, gas" },
      { k: "Traceability", v: "International standards" },
      { k: "Turnaround", v: "Days — not months" },
      { k: "Location", v: "Eket, Akwa Ibom State" },
    ],
  },
  {
    slug: "electrical-and-instrumentation-lab",
    name: "Electrical & Instrumentation Laboratory",
    badge: "ISO/IEC 17025:2017 Accredited",
    image: "/images/eatl/about.jpg",
    intro:
      "Comprehensive calibration and instrumentation solutions ensuring measurement accuracy, process reliability and compliance with international standards across industrial and laboratory applications.",
    services: [
      "ISO/IEC 17025 accredited calibration laboratory & process instrument services",
      "OEM authorised repairs (Megger, Seta, Koehler, Cygnus)",
      "Flow measurement / metering",
      "Instrumentation system upgrades & commissioning",
      "Technical personnel provision",
    ],
    specs: [
      { k: "Accreditation", v: "ISO/IEC 17025:2017" },
      { k: "Disciplines", v: "Electrical, Pressure, Temperature, Dimensional, Flow" },
      { k: "OEM repairs", v: "Megger · Seta · Koehler · Cygnus" },
      { k: "Certificates", v: "Verifiable online" },
      { k: "On-site", v: "Mobile calibration available" },
      { k: "Location", v: "Eket, Akwa Ibom State" },
    ],
  },
];

export const partners = [
  { slug: "emerson", name: "Emerson", type: "Automation Solutions", desc: "Flow measurement, LACT units, control valves, DCS and process automation. EATL is an authorised in-country service centre.", products: ["Micro Motion Coriolis meters", "Daniel ultrasonic & turbine meters", "Rosemount transmitters", "DeltaV / ROC controllers", "Fisher control valves"] },
  { slug: "wrapmaster", name: "Wrapmaster", type: "Composite Repair Systems", desc: "Engineered fibre-reinforced composite systems for leak repair, corrosion mitigation and pipe reinforcement. EATL is a proud distributor and authorised applicator.", products: ["Wrapmaster SealWrap", "Wrapmaster PermaWrap", "Structural reinforcement kits", "Emergency leak repair kits"] },
  { slug: "cygnus", name: "Cygnus Instruments", type: "Ultrasonic Thickness Gauges", desc: "Multiple-echo ultrasonic thickness gauges for corrosion monitoring — through coatings, underwater and in hazardous areas.", products: ["Cygnus 1 Ex / 2+ / 4+ / 6+ PRO", "Cygnus DIVE underwater gauge", "ROV-mountable systems", "Hatch Sure"] },
  { slug: "megger", name: "Megger", type: "Electrical Test Equipment", desc: "Insulation resistance testers, relay test sets, cable fault locators and power-quality analysers with authorised repair & calibration.", products: ["Insulation testers", "Relay & protection test sets", "Cable fault location", "Battery & transformer testing"] },
  { slug: "lenels2", name: "LenelS2", type: "Security & Access Control", desc: "Enterprise access control, video management and facility security platforms for critical infrastructure.", products: ["OnGuard access control", "NetBox", "Video management", "Visitor management"] },
  { slug: "lauris", name: "Lauris Technologies", type: "Industrial Solutions", desc: "Specialised industrial technologies supporting process reliability and asset performance.", products: ["Process equipment", "Spares & consumables"] },
  { slug: "technofink", name: "Technofink", type: "Industrial Fasteners & Tools", desc: "Bolting, torque and hot-bolting tooling for flange management programmes.", products: ["Hydraulic torque wrenches", "Bolt tensioners", "Flange spreaders"] },
  { slug: "blackpearl", name: "BlackPearl", type: "Specialty Products", desc: "Specialty products and consumables for oil & gas maintenance operations.", products: ["Specialty coatings", "Maintenance consumables"] },
  { slug: "drake", name: "Drake Specialties", type: "Pipeline Products", desc: "Pipeline integrity and specialty supply products for field operations.", products: ["Pipeline accessories", "Specialty fittings"] },
  { slug: "imenco", name: "Imenco Corrosion Technology", type: "Cathodic Protection", desc: "Corrosion technology and cathodic protection monitoring for offshore and subsea structures.", products: ["CP monitoring", "Anodes & reference electrodes"] },
];

export const testimonials = [
  {
    quote:
      "We express our profound gratitude, appreciation and commendation to Engineering Automation Technology Limited in recognition of the outstanding support provided during the execution of the most complex Turnaround in the 12-year history of the asset. The cooperation received from EATL staff in the delivery of safety goals, execution of the approved and discovery scope through effective management of work, good staff supervision, quality control, commitment and professionalism were noteworthy and contributed to the successful Turnaround.",
    author: "Shell",
    role: "Turnaround Maintenance Commendation",
  },
  {
    quote:
      "You have been awarded a certificate of competency for substantially completing the project of EDOP-QI Fuel Gas Line Piping Installation.",
    author: "Shell",
    role: "Certificate of Competency — EDOP-QI",
  },
  {
    quote:
      "The commissioning of an indigenous gravimetric flow metering facility is a significant milestone for Nigerian content. It reduces capital flight and builds in-country capacity for fiscal metering assurance.",
    author: "NCDMB",
    role: "Flow Metering Facility Launch",
  },
];

export const news = [
  {
    slug: "ncdmb-backs-eatl-flow-metering-facility",
    date: "2026-02-22",
    title: "NCDMB Backs EATL Launch as Nigeria Advances Local Content in Flow Metering Technology",
    excerpt:
      "EATL, an NCDMB Project 100 company, opens Africa's first gravimetric flow metering facility in Eket, Akwa Ibom — a landmark for in-country metering assurance and capital-flight reduction.",
    href: "https://rareviewnewsreport.com/2026/02/22/ncdmb-project-100-company-opens-africas-first-gravimetric-flow-metering-facility/",
    tag: "Press",
  },
  {
    slug: "iso-17025-reaccreditation",
    date: "2025-09-10",
    title: "Electrical & Instrumentation Laboratory Maintains ISO/IEC 17025:2017 Accreditation",
    excerpt: "Following a successful surveillance audit, the laboratory's scope of accreditation continues to cover electrical, pressure and temperature calibration.",
    href: "/labs/electrical-and-instrumentation-lab",
    tag: "Quality",
  },
  {
    slug: "zero-lti-milestone",
    date: "2025-05-02",
    title: "EATL Records Another Year of Zero Lost-Time Injuries Across All Sites",
    excerpt: "Our proactive risk management, training and safety culture continue to deliver on the goal of zero harm to people and the environment.",
    href: "/about#hse",
    tag: "HSE",
  },
];

export const faqs = [
  { q: "What services does EATL offer?", a: "We operate five Strategic Business Units: Engineering, Construction & Maintenance, Instrumentation & Control, Testing & Metering, and Asset Integrity Management. We also distribute and service OEM products from Emerson, Wrapmaster, Cygnus, Megger, LenelS2 and others." },
  { q: "Where are your facilities located?", a: "Our operational headquarters, fabrication yard and laboratories are in Eket, Akwa Ibom State. We also maintain a corporate office in Lekki, Lagos; a project office in Port Harcourt; and a liaison office in Houston, Texas." },
  { q: "Is your calibration laboratory accredited?", a: "Yes. Our Electrical & Instrumentation Laboratory is accredited to ISO/IEC 17025:2017. Our management system is also certified to ISO 9001:2015, ISO 45001:2018 and ISO 14001:2015." },
  { q: "What types of flow meters can you calibrate?", a: "Turbine, positive displacement, Coriolis, ultrasonic, orifice and vortex meters for liquid and gas service — using the first gravimetric flow metering facility in West Africa." },
  { q: "How can I verify a calibration certificate?", a: "Use the Verify Certificate tool on this website. Enter the certificate number printed on your calibration certificate to confirm its authenticity and validity date." },
  { q: "How quickly can you respond to a service request?", a: "Mobilisation depends on scope and location, but with teams based in Eket, Port Harcourt and Lagos we typically respond to urgent field requests within 24–72 hours." },
  { q: "Do you provide on-site calibration?", a: "Yes. Mobile calibration teams are available for pressure, temperature and electrical instruments, as well as meter proving and metering system validation on-site." },
  { q: "Are you NCDMB compliant?", a: "EATL is recognised as a Project 100 company by the Nigerian Content Development and Monitoring Board and fully complies with the Nigerian Oil & Gas Industry Content Development Act." },
];

export const serviceAreas = [
  "Engineering",
  "Construction & Maintenance",
  "Instrumentation & Control",
  "Flow Meter Calibration",
  "Electrical & Instrumentation Calibration",
  "Asset Integrity Management",
  "OEM Products (Emerson, Wrapmaster, Cygnus, Megger…)",
  "Technical Personnel Provision",
  "Other",
];

export type HeroSlide = {
  eyebrow: string;
  title: string;
  text: string;
  image: string;
  video?: { src: string; type: string };
  cta: { label: string; href: string };
};

export const heroSlides: HeroSlide[] = [
  {
    eyebrow: "Multifaceted Flow Metering Facility",
    title: "Africa's First Gravimetric Flow Metering Facility",
    text: "NCDMB backs EATL launch as Nigeria advances local content in flow metering technology — precision calibration now in-country.",
    image: "/images/eatl/gmc.png",
    video: { src: "/videos/facility.mp4", type: "video/mp4" },
    cta: { label: "Explore the Lab", href: "/labs/flow-metering-lab" },
  },
  {
    eyebrow: "Engineering",
    title: "Solutions that Fuel the Future",
    text: "Innovative designs, precise execution and sustainable results for the oil & gas industry.",
    image: "/images/eatl/engineering.jpg",
    video: { src: "/videos/engineering.mp4", type: "video/mp4" },
    cta: { label: "Engineering Services", href: "/services/engineering" },
  },
  {
    eyebrow: "Construction & Maintenance",
    title: "Building Today, Sustaining Tomorrow",
    text: "Reliable construction and proactive maintenance that ensure safety, efficiency and lasting performance.",
    image: "/images/eatl/ec.jpg",
    video: { src: "/videos/fabrication.mp4", type: "video/mp4" },
    cta: { label: "Construction Services", href: "/services/construction-and-maintenance" },
  },
  {
    eyebrow: "Asset Integrity Management",
    title: "Protecting Your Assets, Preserving Your Value",
    text: "Maximise equipment lifespan, reduce downtime and ensure peak performance with engineered integrity programmes.",
    image: "/images/eatl/aim.png",
    video: { src: "/videos/equipment.mp4", type: "video/mp4" },
    cta: { label: "Asset Integrity", href: "/services/asset-integrity-management" },
  },
  {
    eyebrow: "Instrumentation & Control",
    title: "Precision at Every Stage",
    text: "Advanced instrumentation and control systems that enhance operational efficiency and safety, ensuring your processes run without a hitch.",
    image: "/images/eatl/ic.jpg",
    cta: { label: "Instrumentation Services", href: "/services/instrumentation-and-control" },
  },
];
