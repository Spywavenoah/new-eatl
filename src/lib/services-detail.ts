export type GalleryImage = { src: string; caption: string };

export type ServiceDetail = {
  name: string;
  summary: string;
  capabilities: string[];
  gallery: GalleryImage[];
  meta: { label: string; value: string }[];
};

/* Exact photography from eatlng.com plus authentic OEM product imagery */
export const IMG = {
  design: { src: "/images/eatl/engineering.jpg", caption: "Multidisciplinary design review — piping, structural and instrumentation interfaces" },
  fab: { src: "/images/eatl/ec.jpg", caption: "Coded pipe welding in the EATL fabrication workshop, Eket" },
  weld: { src: "/images/eatl/welding.jpg", caption: "On-site surface preparation and grinding, live facility" },
  field: { src: "/images/eatl/contact.jpg", caption: "Piping fit-up, flanging and welding on a production facility" },
  instr: { src: "/images/eatl/ic.jpg", caption: "Field instrumentation installation and commissioning" },
  wrap: { src: "/images/eatl/aim.png", caption: "Engineered composite wrap repair applied by EATL technicians" },
  bench: { src: "/images/eatl/about.jpg", caption: "Mass work bench in the ISO/IEC 17025 calibration laboratory" },
  hall: { src: "/images/eatl/lap.png", caption: "Gravimetric flow metering hall — the first of its kind in West Africa" },
  facility: { src: "/images/eatl/gmc.png", caption: "Multifaceted flow metering facility, Eket, Akwa Ibom" },
  team: { src: "/images/eatl/flw.png", caption: "Client and project review session" },
  permaWrap: { src: "/images/products/PermaWrapTM.png", caption: "Wrapmaster PermaWrap™ structural repair system" },
  permaSeal: { src: "/images/products/PermaSealTM.png", caption: "Wrapmaster PermaSeal™ live-leak repair system" },
  permaGlass: { src: "/images/products/permaglasstm.png", caption: "Wrapmaster PermaGlass™ composite repair system" },
  weldWrap: { src: "/images/products/WeldWrapTM.png", caption: "Wrapmaster WeldWrap™ weld reinforcement system" },
  tuffCote: { src: "/images/products/PermaTuffCoteTM.png", caption: "Wrapmaster PermaTuffCote™ protective coating system" },
  sleevz: { src: "/images/products/PermaSleevzTM.png", caption: "Wrapmaster PermaSleevz™ pipeline repair sleeve" },
  deltaV: { src: "/images/products/Delta_v.png", caption: "Emerson DeltaV distributed control system" },
  emerson: { src: "/images/products/Energy_emerson.jpg", caption: "Emerson process measurement technology" },
  lady: { src: "/images/eatl/lady.png", caption: "EATL engineer on site — certified, qualified and experienced" },
} satisfies Record<string, GalleryImage>;

const g = (...items: GalleryImage[]) => items;

export const serviceDetails: Record<string, ServiceDetail[]> = {
  engineering: [
    {
      name: "Engineering Administration",
      summary:
        "Structured project administration that keeps engineering deliverables, document control and client interfaces aligned from kick-off to close-out. EATL provides a single accountable point of contact, controlled registers and reporting cadence.",
      capabilities: ["Document control & transmittal registers", "Deliverable schedules and progress measurement", "Interface management with OEMs and subcontractors", "Weekly progress reporting and design review minutes"],
      gallery: g(IMG.design, IMG.team, IMG.field),
      meta: [{ label: "Typical duration", value: "Project dependent" }, { label: "Delivery model", value: "Embedded or remote" }],
    },
    {
      name: "Basic Design, FEED & Tender Design",
      summary:
        "Concept and front-end engineering design that converts an operating need into a costed, technically robust scope. We develop design basis, heat and material balances, equipment lists and MTOs suitable for tender or FID.",
      capabilities: ["Design basis memoranda & option screening", "Heat & material balance, PFD and P&ID development", "Equipment sizing, datasheets and MTOs", "CAPEX/OPEX estimates and tender documentation"],
      gallery: g(IMG.design, IMG.hall, IMG.team),
      meta: [{ label: "Standards", value: "API · ASME · ISO · IEC" }, { label: "Output", value: "Tender-ready package" }],
    },
    {
      name: "Field Studies & Site Surveys",
      summary:
        "Discipline-led surveys that capture the as-found condition of facilities before any design work begins, including dimensional, process, electrical and integrity data. Survey outputs feed directly into engineering and construction planning.",
      capabilities: ["3D scanning, dimensional and tie-in surveys", "Process and utilities data capture", "Hazardous area and electrical classification checks", "As-built verification and red-line mark-ups"],
      gallery: g(IMG.instr, IMG.field, IMG.weld),
      meta: [{ label: "Mobilisation", value: "24–72 hours" }, { label: "Coverage", value: "Onshore & offshore" }],
    },
    {
      name: "Detailed Engineering",
      summary:
        "Full multidisciplinary detailed design to construction-issue status, including drawings, calculations, specifications and vendor data incorporation. Our engineers work under client and international standards with formal checking and approval cycles.",
      capabilities: ["P&IDs, general arrangements and isometrics", "Structural, piping and foundation calculations", "Electrical load lists, cable schedules and loop drawings", "Vendor document review and design assurance"],
      gallery: g(IMG.design, IMG.fab, IMG.instr),
      meta: [{ label: "Disciplines", value: "7 in-house" }, { label: "Issue status", value: "IFC / IFR" }],
    },
    {
      name: "Research & Development",
      summary:
        "Applied R&D that answers specific operational questions — from metering uncertainty studies to composite repair qualification and automation proof-of-concepts. Work is documented so results can be audited and repeated.",
      capabilities: ["Metering and uncertainty studies", "Composite repair qualification testing", "Automation and remote-monitoring pilots", "Technical papers and client test reports"],
      gallery: g(IMG.hall, IMG.bench, IMG.wrap),
      meta: [{ label: "Facilities", value: "Flow & E&I labs" }, { label: "Output", value: "Test reports & procedures" }],
    },
    {
      name: "Technical Evaluation",
      summary:
        "Independent evaluation of equipment, vendors and designs so procurement and asset decisions are made on evidence rather than assumption. We combine documentation review with physical inspection and testing where required.",
      capabilities: ["Bid and vendor technical bid evaluation", "Fitness-for-service and design reviews", "Equipment condition assessment", "Technical due diligence reports"],
      gallery: g(IMG.bench, IMG.instr, IMG.team),
      meta: [{ label: "Deliverable", value: "Evaluation report" }, { label: "Basis", value: "Client specification" }],
    },
    {
      name: "Process, Mechanical, Civil & Structural Engineering",
      summary:
        "Core discipline engineering covering process simulation, mechanical equipment selection, and civil/structural design for industrial facilities — including foundations, pipe racks and equipment supports.",
      capabilities: ["Process simulation, relief and hydraulic studies", "Pump, compressor and vessel specification", "Structural steel and concrete design", "Fabrication drawings and constructability reviews"],
      gallery: g(IMG.design, IMG.fab, IMG.field),
      meta: [{ label: "Tools", value: "Industry-standard CAD/CAE" }, { label: "Codes", value: "ASME · AISC · API" }],
    },
    {
      name: "Piping, Chemical, Instrumentation & Electrical Engineering",
      summary:
        "Specialist engineering across piping systems, chemical/process chemistry, instrumentation and electrical power distribution — integrated so interfaces are resolved on paper, not in the field.",
      capabilities: ["Piping layout, stress analysis and material selection", "Corrosion, chemical treatment and fluid compatibility", "Loop diagrams, instrument index and control philosophy", "Load flow, protection coordination and hazardous area design"],
      gallery: g(IMG.instr, IMG.field, IMG.deltaV),
      meta: [{ label: "Integration", value: "Clash-checked model" }, { label: "Deliverables", value: "IFC drawings & datasheets" }],
    },
    {
      name: "CAD, 3D Modelling & Drafting",
      summary:
        "Accurate drafting and 3D modelling services that produce intelligent, clash-checked models and construction-ready drawings for brownfield and greenfield work.",
      capabilities: ["3D plant and piping modelling", "Clash detection and model reviews", "Isometrics, spool drawings and BOMs", "As-built drawing updates"],
      gallery: g(IMG.design, IMG.facility, IMG.fab),
      meta: [{ label: "Deliverables", value: "DWG · PDF · BOM" }, { label: "Model reviews", value: "30/60/90%" }],
    },
  ],
  "construction-and-maintenance": [
    {
      name: "Fabrication (Fit-up, CS/SS/CuNi Welding, Blasting, Painting, Machining)",
      summary:
        "In-house fabrication at our Eket workshop covering carbon steel, stainless and copper-nickel welding, with blasting, painting and machining under one roof. Every job is backed by WPS/PQR, coded welders and inspection records.",
      capabilities: ["WPS/PQR qualified CS, SS and CuNi welding", "Structural and pipe spool fabrication", "Abrasive blasting and protective coating application", "Machining, fit-up and dimensional control"],
      gallery: g(IMG.fab, IMG.weld, IMG.field),
      meta: [{ label: "Location", value: "Eket fabrication yard" }, { label: "Inspection", value: "CSWIP / ASNT Level II" }],
    },
    {
      name: "Green Field & Brown Field Projects",
      summary:
        "Full project execution for new-build facilities and live-plant modifications. Brownfield work is planned around production, with isolation, permit-to-work and phased cut-overs agreed with operations.",
      capabilities: ["Construction planning and sequencing", "Brownfield tie-ins and hot-work control", "Site supervision, QA/QC and HSE management", "Mechanical completion and handover dossiers"],
      gallery: g(IMG.field, IMG.fab, IMG.instr),
      meta: [{ label: "Sectors", value: "Oil & gas, power, industrial" }, { label: "Execution", value: "EPC / construct-only" }],
    },
    {
      name: "Operation & Maintenance",
      summary:
        "Planned and reactive maintenance of rotating equipment, static equipment, utilities and instrumentation, delivered by resident or call-out crews with defined KPIs and response times.",
      capabilities: ["Preventive and predictive maintenance regimes", "Rotating equipment servicing and alignment", "Instrument and electrical maintenance", "Spares and consumables management"],
      gallery: g(IMG.instr, IMG.field, IMG.team),
      meta: [{ label: "Coverage", value: "Resident & call-out" }, { label: "Reporting", value: "CMMS-backed" }],
    },
    {
      name: "Facility Upgrade & Modification",
      summary:
        "Debottlenecking, capacity upgrades, obsolescence replacement and facility modifications engineered and executed to minimise production deferment.",
      capabilities: ["Debottlenecking and capacity studies", "Control system and equipment replacements", "Piping and structural modifications", "Phased cut-over planning"],
      gallery: g(IMG.field, IMG.design, IMG.instr),
      meta: [{ label: "Typical driver", value: "Debottleneck / obsolescence" }, { label: "Approach", value: "Phased cut-overs" }],
    },
    {
      name: "Civil Construction",
      summary:
        "Civil and building works for industrial facilities — foundations, equipment plinths, drainage, roads and accommodation blocks — delivered with surveyed setting-out and quality-controlled concrete.",
      capabilities: ["Reinforced concrete foundations and plinths", "Drainage, culverts and hardstanding", "Blockwork, roofing and finishing", "Setting-out and concrete quality control"],
      gallery: g(IMG.fab, IMG.field, IMG.team),
      meta: [{ label: "Materials", value: "Client-approved sources" }, { label: "QC", value: "Cube testing & records" }],
    },
    {
      name: "Mechanical Installation Services (Onshore / Offshore)",
      summary:
        "Installation of pumps, compressors, vessels, heat exchangers and piping systems, including alignment, torqueing and commissioning support onshore and offshore.",
      capabilities: ["Equipment setting, alignment and grouting", "Piping installation, flushing and pressure testing", "Offshore campaign execution with marine interfaces", "Commissioning and punch-list close-out"],
      gallery: g(IMG.field, IMG.fab, IMG.hall),
      meta: [{ label: "Certifications", value: "BOSIET / HUET crews" }, { label: "Scope", value: "Onshore & offshore" }],
    },
    {
      name: "Scaffolding & Equipment Leasing",
      summary:
        "Scaffold design, erection and dismantling by certified scaffolders, plus leasing of access towers, lifting gear and site equipment with inspection certification.",
      capabilities: ["Designed scaffolding with load calculations", "Certified scaffolders and tagging regime", "Access towers and mobile platforms", "Equipment leasing with inspection certificates"],
      gallery: g(IMG.weld, IMG.field, IMG.fab),
      meta: [{ label: "Compliance", value: "Weekly inspections" }, { label: "Availability", value: "Lagos · PH · Eket" }],
    },
    {
      name: "Drafting & Site Survey",
      summary:
        "As-built drafting and site survey support during construction, ensuring installed work is measured, recorded and handed over with accurate documentation.",
      capabilities: ["As-built measurement and drafting", "Spool and support drawings", "Quantity take-off for progress claims", "Red-line mark-up to as-built"],
      gallery: g(IMG.design, IMG.field, IMG.facility),
      meta: [{ label: "Deliverable", value: "As-built packs" }, { label: "Survey", value: "Total station / 3D scan" }],
    },
    {
      name: "Turnaround Maintenance (TAM) Support",
      summary:
        "Turnaround support proven on complex shutdowns — manpower, fabrication, flange management and inspection support delivered to tight windows with daily safety and progress reporting.",
      capabilities: ["Turnaround manpower and supervision", "Heat exchanger and vessel internals works", "Flange management and torqueing", "Daily progress and HSE reporting"],
      gallery: g(IMG.weld, IMG.field, IMG.fab),
      meta: [{ label: "Recognised by", value: "Shell commendation" }, { label: "Planning", value: "Window-driven" }],
    },
  ],
  "instrumentation-and-control": [
    {
      name: "Custom Metering System & LACT Unit Design (Emerson Process Measurement partnership)",
      summary:
        "Design and build of fiscal, custody-transfer and allocation metering systems and Lease Automatic Custody Transfer (LACT) units under our Emerson Process Measurement partnership — engineered for uncertainty, not just flow.",
      capabilities: ["Meter selection, sizing and uncertainty analysis", "LACT skid design and fabrication", "Prover and sampler integration", "Commissioning and metering validation"],
      gallery: g(IMG.hall, IMG.facility, IMG.emerson),
      meta: [{ label: "Partnership", value: "Emerson Process Measurement" }, { label: "Standards", value: "API MPMS · OIML" }],
    },
    {
      name: "Low Voltage Control Panels",
      summary:
        "Design and assembly of LV control and distribution panels built to IEC standards, with type-tested assemblies, labelled schematics and factory acceptance testing before delivery.",
      capabilities: ["MCC, distribution and control panel assembly", "IEC 61439 compliant builds", "FAT with client witness and test records", "On-site installation and termination"],
      gallery: g(IMG.instr, IMG.deltaV, IMG.fab),
      meta: [{ label: "Standard", value: "IEC 61439" }, { label: "Testing", value: "FAT + site SAT" }],
    },
    {
      name: "PLC / DCS Installation & Configuration",
      summary:
        "Installation, configuration and migration of PLC and DCS platforms — including Emerson DeltaV — covering hardware assembly, logic development, graphics and commissioning.",
      capabilities: ["I/O checking, marshalling and termination", "Control logic and interlock configuration", "Graphics and alarm rationalisation", "System migration and cut-over"],
      gallery: g(IMG.deltaV, IMG.instr, IMG.hall),
      meta: [{ label: "Platforms", value: "Emerson DeltaV · PLC families" }, { label: "Delivery", value: "Configure → commission" }],
    },
    {
      name: "Variable Frequency Drive & Motor Controls Installation",
      summary:
        "VFD and motor control installation for pumps, compressors and fans, with correct cable sizing, earthing, harmonic consideration and protection coordination.",
      capabilities: ["VFD sizing, installation and parameterisation", "Motor protection and control cabling", "Harmonic and power quality assessment", "Commissioning with load testing"],
      gallery: g(IMG.instr, IMG.deltaV, IMG.field),
      meta: [{ label: "Typical loads", value: "Pumps, fans, compressors" }, { label: "Testing", value: "Loaded commissioning" }],
    },
    {
      name: "SCADA / HMI Application Development",
      summary:
        "SCADA and HMI applications that give operators clear, timely visibility of their process — built with intuitive graphics, rationalised alarms and secure remote access.",
      capabilities: ["Graphic and navigation design", "Alarm management and historisation", "Tag database and driver configuration", "User management and audit trails"],
      gallery: g(IMG.deltaV, IMG.instr, IMG.team),
      meta: [{ label: "Focus", value: "Operator usability" }, { label: "Security", value: "Role-based access" }],
    },
    {
      name: "Remote Monitoring Solutions",
      summary:
        "Remote monitoring for distributed and unmanned assets, combining field instrumentation, secure communications and dashboards that support proactive intervention.",
      capabilities: ["Sensor selection and field installation", "Cellular / satellite backhaul options", "Dashboarding, alerting and reporting", "Managed support and uptime monitoring"],
      gallery: g(IMG.instr, IMG.facility, IMG.deltaV),
      meta: [{ label: "Use cases", value: "Unmanned flow stations" }, { label: "Alerting", value: "SMS / email / dashboard" }],
    },
    {
      name: "Integrated Control & Safety Systems (ICSS)",
      summary:
        "Integrated control and safety system scope covering SIS design principles, cause-and-effect development and integration with the plant control system under IEC 61511 thinking.",
      capabilities: ["Cause-and-effect matrix development", "SIS logic and trip testing", "Integration with DCS/SCADA", "Functional safety documentation support"],
      gallery: g(IMG.deltaV, IMG.instr, IMG.hall),
      meta: [{ label: "Framework", value: "IEC 61511 principles" }, { label: "Deliverable", value: "C&E + test records" }],
    },
    {
      name: "Energy & Transportation Systems (ETS)",
      summary:
        "Electrical energy and transportation system solutions for facilities — generation, distribution, UPS and mobility power interfaces — engineered for reliability and safe transfer.",
      capabilities: ["Power generation and distribution designs", "UPS and critical power installations", "Changeover and interlock schemes", "Load studies and protection settings"],
      gallery: g(IMG.deltaV, IMG.facility, IMG.instr),
      meta: [{ label: "Scope", value: "Design → energisation" }, { label: "Studies", value: "Load & protection" }],
    },
    {
      name: "Process Automation & Instrumentation",
      summary:
        "Field instrumentation and automation packages: transmitter selection, installation, loop checking and calibration, integrated into the plant control strategy.",
      capabilities: ["Instrument datasheets and selection", "Installation, impulse lines and mounting", "Loop checking and calibration", "Control valve and actuated valve setup"],
      gallery: g(IMG.instr, IMG.bench, IMG.deltaV),
      meta: [{ label: "Traceability", value: "Accredited calibration" }, { label: "Coverage", value: "Field → control room" }],
    },
    {
      name: "Process System & Solutions (PSS) and Reliability Solutions",
      summary:
        "Process system packages and reliability improvement services that reduce trips, extend equipment life and improve overall asset effectiveness.",
      capabilities: ["Reliability-centred maintenance reviews", "Bad-actor analysis and root cause studies", "Critical spares strategy", "Performance monitoring and KPIs"],
      gallery: g(IMG.facility, IMG.team, IMG.bench),
      meta: [{ label: "Approach", value: "RCM / RCA" }, { label: "Outcome", value: "Availability improvement" }],
    },
  ],
  "testing-and-calibration": [
    {
      name: "Flow Meter Calibration (Liquid & Gas, all meter types)",
      summary:
        "Primary-standard gravimetric calibration at West Africa's first flow metering facility. Turbine, positive displacement, Coriolis, ultrasonic, orifice and vortex meters are calibrated across their operating range with traceable uncertainty statements.",
      capabilities: ["Gravimetric calibration to primary standard", "Multi-point calibration across flow range", "Meter proving and repeatability checks", "As-found / as-left reporting with uncertainty"],
      gallery: g(IMG.hall, IMG.facility, IMG.bench),
      meta: [{ label: "Location", value: "Eket, Akwa Ibom" }, { label: "Turnaround", value: "Days, not months" }],
    },
    {
      name: "ISO/IEC 17025 Accredited Calibration Laboratory & Process Instrument Services",
      summary:
        "Accredited electrical, pressure, temperature and dimensional calibration in our ISO/IEC 17025:2017 laboratory, plus on-site calibration of process instruments on live plants.",
      capabilities: ["Pressure, temperature, electrical and dimensional calibration", "On-site / mobile calibration service", "Verifiable digital certificates", "Instrument repair and adjustment"],
      gallery: g(IMG.bench, IMG.instr, IMG.lady),
      meta: [{ label: "Accreditation", value: "ISO/IEC 17025:2017" }, { label: "Certificates", value: "Verifiable online" }],
    },
    {
      name: "Comprehensive Metering System Validation",
      summary:
        "End-to-end validation of metering systems — not just individual meters — including meter runs, prover checks, instrumentation, sampling and flow computers, with a system-level uncertainty assessment.",
      capabilities: ["Meter run and prover validation", "Flow computer and correction-factor checks", "Sampling system verification", "System uncertainty budget and report"],
      gallery: g(IMG.hall, IMG.facility, IMG.emerson),
      meta: [{ label: "Basis", value: "API MPMS" }, { label: "Output", value: "Validation report" }],
    },
    {
      name: "OEM Authorised Repairs (Megger, Seta, Koehler, Cygnus)",
      summary:
        "Authorised in-country repair and service for Megger, Seta, Koehler and Cygnus instruments — genuine spares, factory procedures and calibration on return, without overseas shipping delays.",
      capabilities: ["Diagnosis and authorised repair", "Genuine OEM spares", "Post-repair calibration and certificate", "Firmware and software updates"],
      gallery: g(IMG.bench, IMG.instr, IMG.wrap),
      meta: [{ label: "Brands", value: "Megger · Seta · Koehler · Cygnus" }, { label: "Warranty", value: "OEM-backed" }],
    },
    {
      name: "Hydrotest Services",
      summary:
        "Hydrostatic pressure testing of pipework, vessels and skids with calibrated gauges, recorded pressure-hold data and controlled water disposal.",
      capabilities: ["Test pack preparation and witnessing", "Calibrated test gauges and chart recorders", "Pressure-hold documentation", "Safe draining and drying"],
      gallery: g(IMG.field, IMG.fab, IMG.hall),
      meta: [{ label: "Records", value: "Signed test packs" }, { label: "Gauges", value: "In-date, traceable" }],
    },
    {
      name: "Nitrogen Purging Services",
      summary:
        "Nitrogen purging and inerting of tanks, pipelines and process systems to eliminate flammable atmospheres before hot work or commissioning, with oxygen monitoring.",
      capabilities: ["Purging plan and nitrogen quantity calculations", "Oxygen and flammable gas monitoring", "Pipeline and vessel inerting", "Documented completion records"],
      gallery: g(IMG.field, IMG.instr, IMG.wrap),
      meta: [{ label: "Monitoring", value: "Calibrated O₂ analysers" }, { label: "Use", value: "Pre-hot-work / pre-start-up" }],
    },
    {
      name: "Lube Oil Flushing Services",
      summary:
        "Flushing of lube oil and hydraulic systems to target cleanliness levels on new or overhauled machinery, protecting bearings and extending equipment life.",
      capabilities: ["Flushing rig setup and filtration", "ISO cleanliness target achievement", "Particle count verification", "Post-flush oil sampling"],
      gallery: g(IMG.instr, IMG.field, IMG.fab),
      meta: [{ label: "Verification", value: "ISO 4406 particle counts" }, { label: "Typical use", value: "Commissioning & overhaul" }],
    },
    {
      name: "Valve Maintenance & Repair",
      summary:
        "Inspection, servicing and repair of gate, globe, ball, butterfly and control valves, including actuator overhaul, seat replacement and pressure testing.",
      capabilities: ["Strip-down, inspection and reconditioning", "Seat and seal replacement", "Actuator and positioner servicing", "Post-repair pressure testing"],
      gallery: g(IMG.field, IMG.facility, IMG.instr),
      meta: [{ label: "Types", value: "Manual & actuated" }, { label: "Testing", value: "Shell & seat" }],
    },
    {
      name: "Instrumentation System Upgrades & Commissioning",
      summary:
        "Upgrade and commissioning packages that replace obsolete instrumentation and control hardware with minimum production impact, including loop checks and start-up support.",
      capabilities: ["Obsolete instrument replacement", "Loop checking and functional testing", "Control system interface updates", "Start-up and performance verification"],
      gallery: g(IMG.instr, IMG.deltaV, IMG.bench),
      meta: [{ label: "Cut-over", value: "Planned windows" }, { label: "Records", value: "Loop check sheets" }],
    },
    {
      name: "Technical Personnel Provision",
      summary:
        "Certified engineers and technicians deployed to client projects — metering specialists, calibration technicians, instrument technicians, inspectors and supervisors.",
      capabilities: ["Metering and calibration specialists", "Instrument and electrical technicians", "QA/QC and welding inspectors", "Supervisors and project engineers"],
      gallery: g(IMG.instr, IMG.team, IMG.lady),
      meta: [{ label: "Basis", value: "Daily / monthly rates" }, { label: "Coverage", value: "Onshore & offshore" }],
    },
  ],
  "asset-integrity-management": [
    {
      name: "Leak Repair & Corrosion Control using Fibre-Reinforced Composites (Wrapmaster)",
      summary:
        "Engineered composite repair for leaks, wall loss and mechanical damage using Wrapmaster systems, applied by trained technicians to restore pressure containment and structural strength without hot work.",
      capabilities: ["Live-leak sealing with PermaSeal™", "Structural repair with PermaWrap™ and PermaGlass™", "Weld reinforcement using WeldWrap™", "Repair design, fitter qualification and documentation"],
      gallery: g(IMG.wrap, IMG.permaWrap, IMG.permaSeal),
      meta: [{ label: "System", value: "Wrapmaster (authorised)" }, { label: "Advantage", value: "No hot work on live lines" }],
    },
    {
      name: "Nitrogen Purging",
      summary:
        "Inerting and purging of process systems to enable safe maintenance and repair, with oxygen concentration monitoring and documented completion as part of our integrity scope.",
      capabilities: ["System isolation and purging plans", "Continuous O₂ monitoring", "Vessel, tank and pipeline inerting", "Completion certification"],
      gallery: g(IMG.field, IMG.wrap, IMG.instr),
      meta: [{ label: "Scope", value: "Onshore & offshore" }, { label: "Records", value: "Purge completion log" }],
    },
    {
      name: "GRE Pipe Fit-Up & Repair Services",
      summary:
        "Gre pipe installation, fit-up and repair for corrosion-resistant service lines, including spool preparation, adhesive jointing and pressure testing.",
      capabilities: ["GRE spool fit-up and jointing", "Repair of damaged GRE sections", "Support and clamp installation", "Pressure testing and records"],
      gallery: g(IMG.field, IMG.fab, IMG.wrap),
      meta: [{ label: "Application", value: "Water, chemicals, utilities" }, { label: "QC", value: "Joint records" }],
    },
    {
      name: "Coating Services (Corrosion Management)",
      summary:
        "Surface preparation and protective coating application, including Wrapmaster PermaTuffCote™ and conventional systems, to control external corrosion across structures and pipework.",
      capabilities: ["Surface preparation and blasting", "Protective and epoxy coating application", "Coating condition surveys", "Holiday testing and DFT checks"],
      gallery: g(IMG.tuffCote, IMG.weld, IMG.fab),
      meta: [{ label: "Inspection", value: "DFT & holiday test" }, { label: "Systems", value: "Wrapmaster + conventional" }],
    },
    {
      name: "Flange Management (Torque & Hot Bolting)",
      summary:
        "Controlled bolted-joint management — flange inspection, torque/tension procedures and hot bolting of live systems using calibrated equipment and documented sequences.",
      capabilities: ["Flange integrity assessment and tagging", "Calibrated torque and tension execution", "Hot bolting on live systems", "Joint completion records and tagging"],
      gallery: g(IMG.instr, IMG.field, IMG.fab),
      meta: [{ label: "Equipment", value: "Calibrated torque tools" }, { label: "Deliverable", value: "Joint register" }],
    },
    {
      name: "Lube Oil Flushing",
      summary:
        "Flushing of lube and hydraulic systems to achieve target cleanliness before start-up or after overhaul, verified by particle counting.",
      capabilities: ["Flushing methodology and filtration", "Kick-out and witness checks", "ISO 4406 particle count verification", "Oil analysis reporting"],
      gallery: g(IMG.instr, IMG.bench, IMG.field),
      meta: [{ label: "Verification", value: "ISO 4406" }, { label: "Typical use", value: "Commissioning" }],
    },
    {
      name: "Production Operations Support",
      summary:
        "Operations support to keep production flowing — wellsite and flow station support, operators, maintenance crews and integrity surveillance.",
      capabilities: ["Production operators and technicians", "Flow station and wellsite support", "Integrity surveillance rounds", "Shutdown and start-up support"],
      gallery: g(IMG.facility, IMG.instr, IMG.team),
      meta: [{ label: "Coverage", value: "24/7 rosters" }, { label: "Model", value: "Resident / rotation" }],
    },
    {
      name: "Onshore / Offshore Maintenance",
      summary:
        "Planned maintenance campaigns executed offshore and onshore with certified crews, including mechanical, piping, structural and coating works in live-plant environments.",
      capabilities: ["Offshore campaign planning and logistics", "Mechanical and piping maintenance", "Structural inspection and repair", "Coating and composite repair scopes"],
      gallery: g(IMG.field, IMG.instr, IMG.wrap),
      meta: [{ label: "Certification", value: "BOSIET / HUET" }, { label: "Campaigns", value: "Window-based" }],
    },
    {
      name: "Rig Condition Surveys & Facility Technical Audits",
      summary:
        "Independent condition surveys and technical audits of rigs and facilities, identifying integrity gaps, obsolescence and HSE exposure with a prioritised action plan.",
      capabilities: ["Rig condition and equipment surveys", "Facility technical and integrity audits", "Obsolescence and critical spares assessment", "Prioritised remediation roadmap"],
      gallery: g(IMG.facility, IMG.instr, IMG.team),
      meta: [{ label: "Output", value: "Survey report + register" }, { label: "Approach", value: "Evidence-based" }],
    },
  ],
};

export const totalServiceCount = Object.values(serviceDetails).reduce((n, list) => n + list.length, 0);
