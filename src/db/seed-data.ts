import { db } from "./index";
import { certificates, jobOpenings, posts } from "./schema";

let seeded = false;

/** Idempotent seed — safe to call from server components on a fresh database. */
export async function ensureSeeded() {
  if (seeded) return;

  await db
    .insert(certificates)
    .values([
      {
        certificateNo: "EATL/CAL/2026/00123",
        clientName: "Shell Petroleum Development Company",
        instrument: "Rosemount 3051S Pressure Transmitter (0–100 barg)",
        serialNo: "RT-3051S-884210",
        laboratory: "Electrical & Instrumentation Laboratory (ISO/IEC 17025)",
        calibrationDate: "2026-01-14",
        dueDate: "2027-01-14",
        technician: "Engr. A. Udoh — Laboratory Manager",
        isValid: true,
      },
      {
        certificateNo: "EATL/FLW/2026/00045",
        clientName: "Seplat Energy Plc",
        instrument: "Micro Motion CMF300 Coriolis Flow Meter (3\")",
        serialNo: "CMF300-14479821",
        laboratory: "Multifaceted Flow Metering Laboratory",
        calibrationDate: "2026-02-28",
        dueDate: "2027-02-28",
        technician: "Engr. B. Okon — Metering Lead",
        isValid: true,
      },
      {
        certificateNo: "EATL/CAL/2024/00871",
        clientName: "ExxonMobil (Mobil Producing Nigeria)",
        instrument: "Megger MIT1025 Insulation Resistance Tester",
        serialNo: "MIT1025-22010034",
        laboratory: "Electrical & Instrumentation Laboratory (ISO/IEC 17025)",
        calibrationDate: "2024-09-02",
        dueDate: "2025-09-02",
        technician: "Engr. A. Udoh — Laboratory Manager",
        isValid: true,
      },
      {
        certificateNo: "EATL/CAL/2025/00402",
        clientName: "Withheld",
        instrument: "Fluke 754 Documenting Process Calibrator",
        serialNo: "FLK754-5571102",
        laboratory: "Electrical & Instrumentation Laboratory (ISO/IEC 17025)",
        calibrationDate: "2025-06-11",
        dueDate: "2026-06-11",
        technician: "Engr. A. Udoh — Laboratory Manager",
        isValid: false,
      },
    ])
    .onConflictDoNothing();

  await db
    .insert(jobOpenings)
    .values([
      {
        slug: "flow-metering-engineer",
        title: "Flow Metering Engineer",
        department: "Testing & Metering",
        location: "Eket, Akwa Ibom",
        type: "Full-time",
        summary:
          "Operate and develop Africa's first gravimetric flow metering facility: plan calibrations, prepare uncertainty budgets, prove custody-transfer meters and support client metering audits.",
        requirements:
          "B.Eng/B.Sc in Mechanical, Chemical or Instrumentation Engineering\n5+ years in flow measurement, meter proving or fiscal metering\nWorking knowledge of API MPMS, ISO 5167, ISO 17025 and OIML R117\nExperience with Coriolis, ultrasonic, turbine and PD meters\nCOREN registration is an advantage",
      },
      {
        slug: "calibration-technician",
        title: "Calibration Technician (Electrical & Instrumentation)",
        department: "Testing & Metering",
        location: "Eket, Akwa Ibom",
        type: "Full-time",
        summary:
          "Perform pressure, temperature and electrical calibrations in our ISO/IEC 17025 accredited laboratory and on client sites; maintain reference standards and laboratory records.",
        requirements:
          "HND/B.Tech in Electrical/Electronic or Instrumentation Engineering\n3+ years hands-on calibration experience\nFamiliarity with Fluke, Beamex, Druck or Megger equipment\nStrong documentation discipline and attention to detail\nWillingness to travel for on-site work",
      },
      {
        slug: "instrumentation-control-engineer",
        title: "Instrumentation & Control Engineer",
        department: "Instrumentation & Control",
        location: "Port Harcourt, Rivers",
        type: "Full-time",
        summary:
          "Design, configure and commission PLC/DCS, SCADA and ICSS solutions for oil & gas clients, including Emerson DeltaV and ROC platforms.",
        requirements:
          "B.Eng in Electrical/Electronic, Control or Instrumentation Engineering\n4+ years in automation / control systems engineering\nExperience with Emerson DeltaV, Allen-Bradley or Siemens platforms\nKnowledge of IEC 61511 and functional safety lifecycle\nExcellent client-facing communication",
      },
      {
        slug: "qa-qc-welding-inspector",
        title: "QA/QC Welding Inspector",
        department: "Construction & Maintenance",
        location: "Eket, Akwa Ibom (with offshore rotation)",
        type: "Contract",
        summary:
          "Oversee weld quality on fabrication and brownfield projects; review WPS/PQR, witness NDT and compile inspection dossiers for IOC clients.",
        requirements:
          "CSWIP 3.1 / AWS CWI certification\n5+ years QA/QC experience in oil & gas fabrication\nASNT Level II in at least two NDT methods\nFamiliar with ASME IX, API 1104 and client specifications\nBOSIET/HUET valid for offshore work",
      },
      {
        slug: "hse-officer",
        title: "HSE Officer",
        department: "QHSE",
        location: "Lagos / Eket",
        type: "Full-time",
        summary:
          "Drive Goal Zero across sites: lead toolbox talks, risk assessments, incident investigations and ISO 45001/14001 audits.",
        requirements:
          "B.Sc in Safety, Engineering or Environmental Science\nNEBOSH IGC and ISPON membership\n3+ years HSE experience in oil & gas projects\nStrong incident-investigation and reporting skills",
      },
    ])
    .onConflictDoNothing();


  await db
    .insert(posts)
    .values([
      {
        slug: "africas-first-gravimetric-flow-metering-facility",
        title: "Inside Africa's first gravimetric flow metering facility",
        excerpt:
          "EATL has commissioned a primary-standard gravimetric proving facility in Eket. Here is what it changes for custody-transfer and allocation metering in Nigeria.",
        content: `Custody-transfer and allocation meters are only as trustworthy as the standard they are proved against. Until now, operators in the region shipped meters overseas for proving — losing months of service time and paying in foreign currency.

## Why gravimetric proving

A gravimetric prover determines flow rate from **mass and time**, weighed on load cells traceable to national standards. It is a primary method: no reference meter sits between your device and the definition of the unit.

- Primary standard: mass, not a comparison meter
- Full uncertainty budget per calibration point
- Multi-point curves across the operating envelope

## What happens at the facility

1. Receive, log and inspect the meter, recording as-found condition
2. Stabilise the fluid loop and condition the meter
3. Run multi-point gravimetric calibration with uncertainty estimation
4. Issue a verifiable certificate and as-left data

> Turnaround is measured in days, not months — and the results are traceable in-country.

## Why it matters commercially

In-country proving removes shipping, insurance and re-import costs, and it keeps the audit trail within the operator's regulatory environment. Combined with our ISO/IEC 17025 accredited electrical and instrumentation laboratory, this closes the loop on measurement assurance.

If you are planning a proving campaign, our metering team can scope meter types, flow ranges and required uncertainty before you ship anything.`,
        coverImage: "/images/eatl/lap.png",
        coverAlt: "EATL gravimetric flow metering hall",
        category: "Metering & Calibration",
        tags: "flow metering, custody transfer, ISO 17025, NCDMB",
        author: "EATL Editorial",
        authorType: "human",
        source: "editorial",
        status: "published",
        featured: true,
        readMinutes: 5,
      },
      {
        slug: "composite-repair-vs-hot-work",
        title: "Composite repair vs hot work: choosing the safer route on live lines",
        excerpt:
          "Engineered composite systems can restore pressure containment without welding. We compare the trade-offs against conventional hot-work repair.",
        content: `Leaks, wall loss and mechanical damage on live hydrocarbon lines usually trigger a hot-work conversation. Increasingly, the better answer is engineered composite repair.

## When composite repair wins

- The line cannot be taken out of service
- Hot work permits would shut down production
- Damage is localised and the underlying defect is understood
- A qualified design with defined load transfer is available

## What a proper repair looks like

A compliant repair is not a wrap and hope. It starts with a defect assessment, then a design that accounts for the applied loads, followed by surface preparation to the specification and controlled application by trained technicians. Finally it is documented, tagged and added to the integrity register.

> The material is only half the system — qualification of the applicator is the other half.

## Where conventional repair still wins

Extensive corrosion, cracked welds requiring replacement, or damage beyond the validated repair envelope still need cut-out and weld. A good integrity programme uses both, selected on evidence.

EATL is an authorised Wrapmaster distributor and applicator, running PermaWrap™, PermaSeal™, PermaSleevez™ and WeldWrap™ systems with full documentation.`,
        coverImage: "/images/eatl/aim.png",
        coverAlt: "Composite wrap repair applied on a pipeline",
        category: "Engineering",
        tags: "asset integrity, Wrapmaster, composite repair",
        author: "EATL Editorial",
        authorType: "human",
        source: "editorial",
        status: "published",
        readMinutes: 4,
      },
      {
        slug: "ai-agents-in-metering-data-review",
        title: "Where AI agents genuinely help metering data review",
        excerpt:
          "An agent-published research note on using LLM agents for first-pass review of meter calibration records, uncertainty budgets and audit trails.",
        content: `*This article was written and published by a Marblism AI agent, then reviewed against EATL editorial standards.*

Metering teams sit on large volumes of structured records: calibration certificates, proving reports, flow-computer configurations and shift logs. Most of the review effort is not analysis — it is **triage**.

## Three tasks that suit an agent

1. **Completeness checks** — flag certificates missing a serial number, technician sign-off or recalibration due date
2. **Drift detection** — compare as-found against as-left across successive certificates and surface monotonic drift
3. **Narrative assembly** — turn a folder of records into a first-draft audit narrative

## Where agents must not replace judgement

- Deciding whether a meter is fit for fiscal service
- Setting a decision rule for conformity
- Signing off a certificate

> The agent writes the first draft; a competent person owns the conclusion.

## A pragmatic workflow

Run the agent on read-only exports, keep every output traceable to source records, and require human approval before anything enters the quality system. That gives the speed benefit without touching the accountability chain.

This is exactly the pattern EATL applies to its own blog: agents may draft and publish, but the publishing path is logged, keyed and reversible.`,
        coverImage: "/images/eatl/about.jpg",
        coverAlt: "Calibration laboratory bench with reference instruments",
        category: "AI & Automation",
        tags: "AI agents, metering, Marblism, data review",
        author: "Marblism Research Agent",
        authorType: "ai_agent",
        source: "marblism",
        sourceAgent: "marblism-content-agent",
        externalId: "marblism-seed-001",
        status: "published",
        readMinutes: 4,
      },
    ])
    .onConflictDoNothing();

  seeded = true;
}
