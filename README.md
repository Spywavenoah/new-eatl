# EATL — Engineering Automation Technology Limited (Website Rebuild)

A full-stack rebuild of **eatlng.com** using **Next.js 16 (App Router)**, **PostgreSQL** and **Drizzle ORM**, with Tailwind CSS v4.

> **Option B build** — the final iteration in this delivery, which includes:
> - Text-only service listings (title, short description, “Read more” — no images)
> - Medium-sized (`max-w-3xl`) service pop-up modals with a **full-width photo slider and content beneath**
> - Hero slides that accept **lightweight background video** (with still-image fallbacks)
> - Reduced hero carousel height (62svh mobile → 72svh desktop)
> - Top utility bar (email / phone / locations) in **brand red `#ae2832`**
> - Navigation labels renamed to **SBUs** and **Our Labs**
> - Compact inner-page breadcrumb band with smaller type
> - Mobile drawer that **slides in from the left**
> - Mobile header with **only the logo and an icon menu toggle** (no Request Quote button)
> - Hero secondary “Request a Quote” (option B) and the SBU-header quote button **hidden on phones**
> - Core layout rules (`.max-w-7xl`, `.sm:px-6`, `.lg:py-28`, `.lg:-mt-12`) declared explicitly in `globals.css` so the layout never depends on generated utility comments

---

## Brand palette (taken from the original site)

| Token | Hex | Usage |
|---|---|---|
| Brand green | `#026839` | Header bar, primary surfaces, links |
| Brand red | `#ae2832` | Accents, CTAs, eyebrow rules |
| Dark green | `#002815` | Footer, dark bands |
| Surface | `#F2F3F5` | Section backgrounds |
| Ink | `#19232B` | Body text |
| Muted | `#757F95` | Secondary text |
| Gold | `#d6b161` | Accent on dark backgrounds |

All tokens are declared in `src/app/globals.css` via Tailwind v4 `@theme`.

---

## Getting started

```bash
npm install

# 1. Configure the database
cp .env.example .env         # then edit DATABASE_URL if needed

# 2. Create the tables
npx drizzle-kit push

# 3. (Optional) seed sample certificates + job openings
npx tsx src/db/seed.ts

# 4. Run
npm run dev                  # http://localhost:3000
```

Production:

```bash
npm run build
npm start
```

Environment variables:

```env
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:5432/app_db
```

---

## Routes

| Route | Description |
|---|---|
| `/` | Hero slider (images + video), SBU cards with modal chips, stats, flow-lab spotlight, certifications, HSE, testimonials, partners, news |
| `/about` | Expanded company profile: mission/vision/values tabs, 2007→2026 timeline, certifications, policies, leadership, field gallery |
| `/services/[slug]` | 5 SBUs — Engineering, Construction & Maintenance, Instrumentation & Control, Testing & Metering, Asset Integrity Management |
| `/labs/[slug]` | Flow Metering Laboratory, Electrical & Instrumentation Laboratory |
| `/oem-products` | 10 OEM partners with real logos and Wrapmaster/Emerson product imagery |
| `/request-quote` | 2-step quote wizard → writes to `quote_requests` |
| `/contact` | 4 offices, map, contact form → `contact_messages` |
| `/verify-certificate` | Live certificate lookup → `certificates` |
| `/careers` | DB-driven vacancies + application form → `job_applications` |
| `/faq`, `/news`, `/calibration-terms` | Supporting content pages |
| `/api/health` | Health check |

### API endpoints

`POST /api/quote` · `POST /api/contact` · `POST /api/newsletter` · `GET /api/certificates/verify?no=…` · `POST /api/careers/apply` · `GET /api/health`

Legacy eatlng.com URLs (`/engineering`, `/career`, `/wrapmaster-products`, …) permanently redirect via `next.config.ts`.

---

## Database schema (`src/db/schema.ts`)

- `quote_requests`, `contact_messages`, `newsletter_subscribers`
- `certificates` (certificate verification), `job_openings`, `job_applications`

Sample certificate numbers for testing:

- `EATL/CAL/2026/00123` — valid
- `EATL/FLW/2026/00045` — valid
- `EATL/CAL/2024/00871` — expired
- `EATL/CAL/2025/00402` — revoked

---

## Content & media notes

- Service modal content (47 services across 5 SBUs) lives in `src/lib/services-detail.ts`.
- Company data, SBUs, labs, partners, FAQs, news and hero slides live in `src/lib/content.ts`.
- All photography is the original imagery from eatlng.com, stored under `public/images/eatl`, `public/images/partners` and `public/images/products`.
- Background clips in `public/videos` are 540p (0.9–3.1 MB) and only mount for the active hero slide; `prefers-reduced-motion` and `Save-Data` are respected, and posters always render first.

---

## Quality checks

```bash
npx next typegen
npm exec tsc -- --noEmit
npm run build
npm run lint
```

All four pass on this build.

---

## Accessibility & mobile

- Skip-to-content link, semantic landmarks, labelled form fields, visible focus styles.
- Service modal: `role="dialog"`, `aria-modal`, Escape to close, focus restore, arrow-key and swipe navigation.
- Mobile drawer: slides from the left, closes on Escape/backdrop, `inert` when hidden, 44px tap targets.
- Mobile typography and button scales are reduced at `≤1023px` and `≤640px`; `svh` units handle mobile browser chrome.

© Engineering Automation Technology Limited (EATL). Content reproduced for the purpose of this rebuild.
