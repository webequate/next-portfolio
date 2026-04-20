# Project: next-portfolio (Portfolio — portfolio.webequate.com)

This is one of a family of 9 similar Next.js projects managed by Webequate. The projects share the same stack and architecture but are not identical.

**Purpose:** Allen Johnson's personal portfolio site. Visitors can browse featured and active projects, read an about/bio page, view the resume and skills, and send a contact message via a form that delivers email through Gmail SMTP.

---

## Stack

| Layer | Version | Notes |
|---|---|---|
| Node.js | 24 LTS (24.15.0) | Pinned in `.nvmrc` and `vercel.json` |
| Next.js | 16 | App Router only; Turbopack enabled |
| React | 19 | Automatic JSX runtime (`react-jsx`) |
| TypeScript | 5.x | strict mode, `moduleResolution: bundler` |
| Tailwind CSS | 3.x | PostCSS pipeline |
| ESLint | 9 | Flat config (`eslint.config.mjs`) |
| Prettier | 3.x | Semi, double quotes, 2-space indent |
| Nodemailer | 8 | Contact form email (Gmail SMTP) |
| Deployment | Vercel | Node 24, no custom build command |

---

## Architecture

- **App Router only.** There is no `pages/` directory (excluded in `tsconfig.json`). All routes live under `app/`.
- **Turbopack** is the bundler for both dev and build. Do not add webpack configuration — it will be ignored and may cause errors.
- **SVG imports** are handled natively by Turbopack via `resolveExtensions` in `next.config.js`. No `@svgr/webpack` loader needed.
- **CSS `@import`** statements must appear before all `@tailwind` directives in `globals.css` — Turbopack enforces this.
- **All content is static.** No database or CMS. Site content lives in `data/*.json`. Pages are statically generated at build time with 60-second ISR revalidation.
- **Server + Client split.** All routes are server components by default. Client-facing interactivity is isolated into co-located `*Client.tsx` files (e.g. `ProjectClient.tsx`, `FeaturedClient.tsx`, `ContactClient.tsx`).
- **Email** is sent via `nodemailer` (Gmail SMTP) through an App Router API route at `app/api/send-email/route.tsx`. The files in `lib/` (`sendEmail.ts`, `contactEmailTemplate.ts`) are unused — they are dead code. Do not add imports from `lib/` to the API route; the route has its own inline implementations.

---

## Directory structure

```
next-portfolio/
├── app/                                  # All routes (App Router)
│   ├── layout.tsx                        # Root layout: HTML shell, ThemeProvider, Layout, UseScrollToTop, GTM
│   ├── page.tsx                          # Home: hero (name, titles, summary, social, CV) + featured projects
│   ├── not-found.tsx                     # 404 page with link home
│   ├── about/
│   │   └── page.tsx                      # About: intro + about items text + AI photo
│   ├── skills/
│   │   └── page.tsx                      # Skills: two-column (featured skills list + animated rated skill bars)
│   ├── resume/
│   │   └── page.tsx                      # Resume: education (schools.json) + work history (jobs.json)
│   ├── projects/
│   │   ├── page.tsx                      # All active projects grid
│   │   └── [id]/
│   │       ├── page.tsx                  # Server: static params, metadata, prev/next logic → ProjectClient
│   │       └── ProjectClient.tsx         # Client: project image + swipe nav + header/footer
│   ├── featured/
│   │   └── [id]/
│   │       ├── page.tsx                  # Server: static params (featured only), robots noindex → FeaturedClient
│   │       └── FeaturedClient.tsx        # Client: identical to ProjectClient but routes to /featured
│   ├── contact/
│   │   ├── page.tsx                      # Server: passes basics data → ContactClient
│   │   └── ContactClient.tsx             # Client: layout wrapper for ContactForm + ContactDetails
│   ├── testimonials/
│   │   └── page.tsx                      # Testimonials list (robots noindex)
│   └── api/
│       └── send-email/
│           └── route.tsx                 # POST: contact form → Nodemailer. GET: health ping
│
├── components/                           # Shared UI components
│   ├── AboutContent.tsx                  # About intro heading (gradient) + aboutItems list
│   ├── AboutDetails.tsx                  # Renders allen-ai.jpg (accepts but ignores name/location/phone/website props)
│   ├── AllenJohnson.tsx                  # SVG text display — currently unused
│   ├── ContactDetails.tsx                # Contact info card: name, location, phone, email, website, CV download
│   ├── ContactForm.tsx                   # Contact form: fields, honeypot, loading/success/error state
│   ├── Copyright.tsx                     # Year + copyright text
│   ├── DownloadCV.tsx                    # Resume download button (FaDownload icon)
│   ├── ExternalLink.tsx                  # External link with FaExternalLinkAlt icon
│   ├── Footer.tsx                        # Footer nav (nav-secondary), social links, copyright, WebEquate credit
│   ├── FormInput.tsx                     # Reusable labeled input field
│   ├── Hamburger.tsx                     # Mobile menu toggle (FiMenu / FiX icons)
│   ├── Header.tsx                        # Responsive nav: desktop links, hamburger, theme switcher
│   ├── Heading.tsx                       # Section heading with gradient text
│   ├── HomeButton.tsx                    # Logo link to / (allen.png image)
│   ├── Layout.tsx                        # Client wrapper: adds flex/bg classes to body; wraps in PageTransition
│   ├── PageTransition.tsx                # Fade in/out (0.9s) on route change via pathname ref + setTimeout
│   ├── ProjectFooter.tsx                 # Project description, tag list, live/detail links, screenshot device links
│   ├── ProjectGrid.tsx                   # Responsive grid of project thumbnails with hover overlay
│   ├── ProjectHeader.tsx                 # Project title + prev/next arrow navigation
│   ├── ScreenshotLink.tsx                # Device screenshot link (FaMobileAlt/FaTabletAlt/FaLaptop/FaDesktop)
│   ├── SkillBar.tsx                      # Animated progress bar; scroll-triggered via IntersectionObserver
│   ├── SkillsFeatured.tsx                # Bulleted list of featured skill descriptions
│   ├── SkillsRated.tsx                   # Renders SkillBar for each rated skill
│   ├── Social.tsx                        # Maps socialLinks array → SocialButton list
│   ├── SocialButton.tsx                  # Individual social icon link (new tab)
│   ├── TagLink.tsx                       # Tag display with FaTag icon (href="#" — tag routing not implemented)
│   ├── ThemeSwitcher.tsx                 # Theme toggle button (FaSun / FaMoon) via next-themes
│   ├── ThemedImage.tsx                   # Renders allen.png; uses next-themes for hydration safety
│   └── WebEquate.tsx                     # "Website by WebEquate" footer credit link
│
├── hooks/
│   ├── useScrollToTop.tsx                # Returns scroll-to-top JSX (FiChevronUp); shows after 400px scroll
│   └── useThemeSwitcher.tsx              # Custom theme hook: reads/writes localStorage, toggles <html> class
│
├── interfaces/
│   └── ContactForm.ts                    # ContactForm interface (name, email, subject, message, website?)
│
├── lib/                                  # ⚠ DEAD CODE — nothing imports from here
│   ├── sendEmail.ts                      # Module-level nodemailer transport (unused)
│   └── contactEmailTemplate.ts          # HTML/text email template generators (unused)
│
├── types/
│   ├── basics.ts                         # Basics and SocialLink types (matches data/basics.json)
│   ├── experience.ts                     # School and Job types (matches data/schools.json, data/jobs.json)
│   ├── project.ts                        # Project, ProjectScreenshots, ProjectStatus types
│   ├── skills.ts                         # FeaturedSkill and RatedSkill types
│   └── testimonial.ts                   # Testimonial type
│
├── data/                                 # Static JSON content (single source of truth)
│   ├── basics.json                       # Name, titles, summaryItems, aboutIntro, aboutItems, resumeLink, socialLinks, contact info
│   ├── projects.json                     # All projects with status flags (active/featured) and screenshot URLs
│   ├── jobs.json                         # Work history (17 entries, 2000–present), ordered desc
│   ├── schools.json                      # Education (Carnegie Mellon, BS CS, 2000)
│   ├── featuredSkills.json               # 18 skill descriptions for the featured skills list
│   ├── ratedSkills.json                  # 9 skills with numeric levels (1–5) for the animated bars
│   └── testimonials.json                 # 2 testimonial entries
│
├── styles/
│   └── globals.css                       # Tailwind directives, nav classes, gradient helpers, page transition, scrollbar-gutter
│
├── public/
│   ├── allen.png                         # Profile photo (home button, hero image)
│   ├── assets/                           # Brand logos (logo-webequate-light.png)
│   ├── fonts/                            # Custom fonts
│   ├── images/                           # Page images (allen-ai.jpg, portfolio-og.jpg, etc.)
│   ├── resume/                           # Resume PDF
│   ├── robots.txt                        # Generated by next-sitemap
│   └── sitemap*.xml                      # Generated by next-sitemap
│
├── scripts/
│   └── sort-sitemap.js                   # Post-build: deduplicates and sorts sitemap-0.xml by URL
│
├── next.config.js                        # Turbopack resolveExtensions, image formats, strict mode
├── tsconfig.json                         # Target ES2022, react-jsx, @/* alias, bundler resolution
├── tailwind.config.js                    # Custom palette, dark mode: class, @tailwindcss/forms
├── eslint.config.mjs                     # ESLint v9 flat config
├── postcss.config.js                     # tailwindcss + autoprefixer
├── .prettierrc.json                      # semi, double quotes, trailingComma: es5, tabWidth: 2
├── next-sitemap.config.js                # Excludes /featured/** and /testimonials; generates robots.txt
├── vercel.json                           # NODE_VERSION: 24.15.0
├── .nvmrc                                # Node 24
└── .env.template                         # Environment variable keys with empty values
```

---

## Key files

| File | Purpose |
|---|---|
| `next.config.js` | Turbopack extensions, AVIF/WebP image formats, strict mode |
| `tsconfig.json` | `jsx: react-jsx`, no `baseUrl`, `moduleResolution: bundler` |
| `eslint.config.mjs` | ESLint v9 flat config with native `@typescript-eslint` rules |
| `styles/globals.css` | `@import` first, then `@tailwind` directives |
| `.nvmrc` | Node 24 |
| `vercel.json` | `NODE_VERSION: 24.15.0` |
| `app/api/send-email/route.tsx` | Contact form API handler (all email logic is inline here) |
| `data/basics.json` | Site identity, bio, contact info, social links |
| `data/projects.json` | All project content; `status` flags control visibility |

---

## Environment variables

Copy `.env.template` to `.env.local` for local development. All variables are required in production unless marked optional.

| Variable | Required | Description |
|---|---|---|
| `GMAIL_USER` | Yes | Gmail account used as the SMTP sender |
| `GMAIL_APP_PASS` | Yes | Gmail app-specific password (not the account password) |
| `EMAIL_FROM` | Yes | `From:` address in outgoing emails |
| `EMAIL_TO` | Yes | Recipient address for contact form submissions |
| `EMAIL_CC` | No | CC address for contact form submissions |
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical site URL (`https://portfolio.webequate.com`) |
| `NEXT_PUBLIC_ASSET_URL` | Yes | Base URL for public assets |
| `NEXT_PUBLIC_GTM_ID` | Yes | Google Tag Manager container ID (e.g. `GTM-XXXXXXX`) |
| `NEXT_PUBLIC_GA_ID` | No | Google Analytics measurement ID |

`NEXT_PUBLIC_*` variables are embedded at build time and exposed to the browser. Never put secrets in `NEXT_PUBLIC_*` variables.

---

## Third-party services

| Service | How used |
|---|---|
| **Gmail SMTP** | Nodemailer connects on port 465 (TLS) using `GMAIL_USER` + `GMAIL_APP_PASS`. Configure a Gmail App Password — standard account passwords are rejected. The transport is created on-demand inside the API route handler to avoid build-time `fs` module scans. |
| **Google Tag Manager** | Injected via `@next/third-parties` `<GoogleTagManager>` in the root layout. Controlled by `NEXT_PUBLIC_GTM_ID`. |
| **Vercel** | Deployment platform. No custom build command — Vercel auto-detects Next.js. Node version set in `vercel.json`. |
| **next-sitemap** | Generates `sitemap.xml` and `robots.txt` at build time via `npm run build:sitemap`. Excludes `/featured/**` and `/testimonials`. Config in `next-sitemap.config.js`. |
| **next-themes** | `ThemeProvider` in root layout (`attribute="class"`, `defaultTheme="dark"`). Used by `ThemeSwitcher` and `ThemedImage` components for hydration-safe rendering. |

---

## Data model

### `data/basics.json` → `types/basics.ts`

Single object with site-wide identity and contact info. Imported directly in server components.

```ts
type SocialLink = {
  name: string;
  handle: string;
  url: string;
};

type Basics = {
  name: string;
  titles: string[];         // Displayed as stacked h2 elements on the home page
  summaryItems: string[];   // Paragraph text below titles on home page
  aboutIntro: string;       // Heading for the about page
  aboutItems: string[];     // Paragraphs for the about page
  resumeLink: string;       // URL to PDF resume
  socialLinks: SocialLink[];
  location: string;
  phone: string;
  website: string;
  contactIntro: string;     // Intro text for the contact page
};
```

### `data/projects.json` → `types/project.ts`

Array of all projects. The `status` object controls where each project appears.

```ts
type ProjectScreenshots = {
  path?: string;     // Base path under public/ for screenshot images
  mobile?: string;
  tablet?: string;
  laptop?: string;
  desktop?: string;
};

type ProjectStatus = {
  active?: boolean;       // Shown on /projects page
  activeOrder?: number;   // Sort order on /projects page (ascending)
  featured?: boolean;     // Shown on home page featured grid
  featuredOrder?: number; // Sort order on home page featured grid (ascending)
};

type Project = {
  id: string;             // URL segment: /projects/my-project-id
  name: string;
  type: string;           // e.g. "Website", "Web App"
  company: string;
  thumbImage: string;     // Path to thumbnail (used in ProjectGrid)
  tags: string;           // Comma-separated tag list
  description: string;
  mainImage: string;      // Path to main display image in project detail
  details?: string;       // URL to further details page
  link?: string;          // URL to live site
  screenshots?: ProjectScreenshots;
  status?: ProjectStatus;
};
```

A project can be both `active` and `featured` simultaneously. `generateStaticParams` on `/projects/[id]` uses `status.active`; on `/featured/[id]` it uses `status.featured`.

### `data/jobs.json` → `types/experience.ts`

```ts
type Job = {
  company: string;
  role: string;
  city: string;
  startDate: string;
  endDate: string;
  achievements: string[];
  order: number;  // Sorted descending (highest = most recent)
};
```

17 entries spanning 2000–present. Current position: WebEquate, Founder & Full Stack Developer.

### `data/schools.json` → `types/experience.ts`

```ts
type School = {
  school: string;
  program: string;
  city: string;
  endDate: string;
  order: number;
};
```

Single entry: Carnegie Mellon University, BS Computer Science, May 2000.

### `data/featuredSkills.json` + `data/ratedSkills.json` → `types/skills.ts`

```ts
type FeaturedSkill = {
  description: string;  // Full sentence describing the skill
  order: number;
};

type RatedSkill = {
  name: string;
  level: number;  // 1–5; rendered as (level * 20)% width in SkillBar
  order: number;
};
```

18 featured skills (prose descriptions); 9 rated skills (JavaScript 5, HTML 5, React 4, CSS/Sass 4, TypeScript 3, Next.js 3, Redux 3, PHP 3, MySQL 3).

### `data/testimonials.json` → `types/testimonial.ts`

```ts
type Testimonial = {
  description: string;
  name: string;
  order: number;
};
```

### `interfaces/ContactForm.ts`

```ts
interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
  website?: string;  // Honeypot — must be empty; bots fill it in
}
```

---

## Routing

| URL pattern | Source file | Server/Client | Notes |
|---|---|---|---|
| `/` | `app/page.tsx` | Server | Hero + featured projects grid |
| `/about` | `app/about/page.tsx` | Server | Bio text + AI photo |
| `/skills` | `app/skills/page.tsx` | Server | Two-column skills layout |
| `/resume` | `app/resume/page.tsx` | Server | Education + work history |
| `/projects` | `app/projects/page.tsx` | Server | All active projects grid |
| `/projects/[id]` | `app/projects/[id]/page.tsx` → `ProjectClient.tsx` | Server → Client | Active projects only; prev/next by activeOrder |
| `/featured/[id]` | `app/featured/[id]/page.tsx` → `FeaturedClient.tsx` | Server → Client | Featured projects only; robots noindex |
| `/contact` | `app/contact/page.tsx` → `ContactClient.tsx` | Server → Client | Contact form + details |
| `/testimonials` | `app/testimonials/page.tsx` | Server | Testimonials list; robots noindex |
| `/api/send-email` | `app/api/send-email/route.tsx` | Server (API) | POST: send email. GET: health ping |

All non-API pages use `export const revalidate = 60` (ISR). Dynamic project pages call `generateStaticParams` to pre-render all valid slugs at build time.

---

## Theming

Dark mode is class-based (set on `<html>`). Two parallel theme systems coexist:

1. **`next-themes`** (`ThemeProvider` in `app/layout.tsx`) — manages `ThemeSwitcher` and `ThemedImage`. Use `useTheme()` from `next-themes` for any new components that need theme awareness.
2. **`useThemeSwitcher.tsx`** — custom hook that directly reads/writes `localStorage` and manipulates `document.documentElement.classList`. This is a legacy approach; do not add new uses of this hook.

**Custom Tailwind palette:**

| Token | Value | Usage |
|---|---|---|
| `light-1` | `#f5f5f5` | Backgrounds, borders |
| `light-2` | `#a3a3a3` | Body text in dark mode |
| `light-3` | `#404040` | Subtle borders |
| `dark-1` | `#262626` | Backgrounds in dark mode |
| `dark-2` | `#525252` | Body text in light mode |
| `dark-3` | `#d4d4d4` | Borders in dark mode |
| `accent-light` | `#5588ee` | Accent in light mode |
| `accent-dark` | `#346ac2` | Accent in dark mode |

The `gray` scale maps to Tailwind's `neutral` palette.

Use `dark:` prefix variants for dark-mode styles. The `ThemeSwitcher` and `ThemedImage` components guard their render with a `mounted` check to avoid hydration mismatches.

---

## Coding conventions

### Imports

All imports use the `@/` alias (maps to project root). No relative imports.

```ts
import basics from "@/data/basics.json";
import { Project } from "@/types/project";
import Header from "@/components/Header";
```

### Server vs client components

The default is server component. Add `"use client"` only when the component needs browser APIs, event handlers, or React hooks. The pattern in this project is:

- **Route file** (`page.tsx`) — server component: fetches/filters data from JSON, passes props down
- **Co-located `*Client.tsx`** — client component: handles interactivity (swipe, forms, routing)

### TypeScript

- Strict mode is on. Avoid `any` — the ESLint config allows it only in API route files (`**/api/**/*.{ts,tsx}`).
- Type data shapes in `types/` (matching JSON structure). Put component prop interfaces inline at the top of the component file.
- Use the `interfaces/` directory only for interfaces that are shared across multiple files.

### Styling

- Tailwind utility classes only — no inline styles, no CSS modules.
- Dark mode via `dark:` prefix on every element that needs it.
- Page transitions use the `.page-transition` and `.fade-out` classes defined in `globals.css` — managed by `PageTransition.tsx`. Do not recreate the fade logic.
- Nav class hierarchy: `.nav-primary` (desktop header nav), `.nav-secondary` (footer nav), `.nav-mobile` (hamburger drawer).
- Gradient helpers: `.text-gradient-dark` / `.text-gradient-light` (text), `.bg-gradient-dark` / `.bg-gradient-light` (backgrounds).

### Forms

- All form state lives in the client `ContactForm.tsx` component using `useState`.
- Submit handler POSTs JSON to `/api/send-email`, reads `{ message }` response.
- Always include the honeypot `website` field (hidden via CSS, not `type="hidden"`).
- Reset form fields on successful submission.
- Show loading state on the submit button during the request.

### Email API route

The entire email flow is self-contained in `app/api/send-email/route.tsx`. Do not extract to `lib/` — the on-demand transport creation avoids build-time `fs` module scans. The route:

1. Rejects requests with a filled honeypot field (returns 400 with validation error).
2. Validates all required fields and email format with a regex.
3. Escapes HTML in all user-supplied strings before embedding in the HTML email body.
4. Sends both an HTML version (inline dark-themed template) and a plain-text fallback.
5. In development, includes `error.message` in the 500 response; omits it in production.

### Project navigation

Both `/projects/[id]` and `/featured/[id]` use the same swipe + arrow pattern:
- The server page (`page.tsx`) computes `prevProject` / `nextProject` by sorting the relevant set and finding neighbours by index.
- `ProjectClient.tsx` / `FeaturedClient.tsx` receive prev/next as props and pass the IDs to `ProjectHeader` for arrow links.
- Swipe (via `react-swipeable`) is mobile-only — guarded by a `window.innerWidth < 640` check.
- The `path` prop (`"projects"` or `"featured"`) controls the URL prefix for navigation links.

### Animated skill bars

`SkillBar.tsx` uses `IntersectionObserver` to trigger the fill animation only when the bar scrolls into view. The bar width is `level * 20`% (level is 1–5). The animation uses Tailwind transition classes (`transition-all delay-700 duration-1000`). Do not use JavaScript animation for this — the CSS transition handles it.

### SEO / metadata

Every route exports a `metadata` object or `generateMetadata` function. Required fields for public pages:

```ts
export const metadata: Metadata = {
  title: "...",
  description: "...",
  robots: "index, follow",
  alternates: { canonical: "https://portfolio.webequate.com/route" },
};
```

Non-public pages (`/featured/*`, `/testimonials`) use `robots: "noindex, nofollow"`. Dynamic project pages use `generateMetadata` to produce per-project titles.

---

## Component conventions

- **File names:** PascalCase matching the exported component name (`ProjectGrid.tsx`, not `project-grid.tsx`).
- **Hook files:** camelCase prefixed with `use` (`useScrollToTop.tsx`).
- **Co-located client components:** page-scoped client sub-components (`ProjectClient.tsx`, `FeaturedClient.tsx`, `ContactClient.tsx`) live in the same directory as their parent `page.tsx`.
- **Props:** Inline interface at the top of the file. No separate props files.
- **Icons:** Use `react-icons` subpackages — `fi` (Feather Icons), `fa` (Font Awesome). Import only what is used. `@heroicons/react` is installed but not used; do not add new heroicon imports.
- **`framer-motion`** is installed but not imported anywhere. Do not use it — use the existing CSS transition classes in `globals.css` instead.

---

## Commands

```bash
npm run dev            # dev server on port 3333 (Turbopack)
npm run build          # production build
npm run lint           # eslint . (ESLint v9 flat config)
npm run format         # prettier --write on all source files
npm run build:sitemap  # next-sitemap + custom sort/dedup script
```

---

## What to avoid

- Do not add a `webpack()` function to `next.config.js` — Turbopack is active.
- Do not add `baseUrl` to `tsconfig.json` — deprecated in TS 6.0.
- Do not use `next/head` or `next/router` — App Router uses `export const metadata` and `next/navigation`.
- Do not use `.eslintrc.*` files — ESLint v9 reads only `eslint.config.mjs`.
- Do not use `next lint` in scripts — replaced by `eslint .`.
- Do not downgrade Node below 24 — `package.json` `engines` enforces `>=24.0.0`.
- Do not use relative imports — use the `@/` alias.
- Do not import from `lib/sendEmail.ts` or `lib/contactEmailTemplate.ts` — they are dead code; the API route has its own inline implementations.
- Do not use `useThemeSwitcher.tsx` for new components — use `useTheme()` from `next-themes` instead.
- Do not use `framer-motion` or `@heroicons/react` — they are installed but unused; use `react-icons` and CSS transitions.
- Do not put secrets in `NEXT_PUBLIC_*` environment variables — they are embedded in the client bundle.
- Do not implement tag routing on `TagLink.tsx` — it currently links to `#`; the feature is intentionally deferred.

---

## Upgrade history (condensed)

The following changes were made to reach the current state from a Next.js 15 / Node 22 baseline:

1. **Next.js 16 + Turbopack** — removed webpack SVG loader, added `turbopack.resolveExtensions`, fixed `globals.css` import order, set `jsx: react-jsx`.
2. **ESLint v9 flat config** — deleted `.eslintrc.json`, created `eslint.config.mjs`, changed lint script from `next lint` to `eslint .`.
3. **Security audit pass** — `nodemailer` 6→8, various ReDoS/injection fixes.
4. **Dependency refresh** — all packages to current stable, `@typescript-eslint` parser + plugin added.
5. **Dead code removal** — deleted unused components (`Instructions.tsx`, `LayoutWidget.tsx`), unused state, unused variables.
6. **tsconfig cleanup** — removed redundant include paths, removed deprecated `baseUrl`, target `es2020`→`es2022`.
7. **Node.js 24 LTS** — `.nvmrc`, `vercel.json`, `engines` all updated.
