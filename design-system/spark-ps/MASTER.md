# Design System Master File

**Project:** Spark PS (B2B redesign)
**Category:** B2B engineering services
**Source of truth for tokens:** `src/app/globals.css` (`:root`)

The site should read as a serious engineering firm: clean, corporate and trustworthy. Every page
answers three questions: what SPS does, why they can be trusted, and how to contact them.

---

## Colour

Brand colours come from the logo (charcoal wordmark + orange `#F05A00`), paired with navy.

| Role | Hex | Token | Notes |
| --- | --- | --- | --- |
| Navy (dark bands, top bar, footer) | `#0F1B2D` | `--navy` | |
| Navy 700 (CTA band, hover) | `#1C2B40` | `--navy-700` | |
| Headings | `#0F1B2D` | `--ink` | |
| Body text | `#1F2937` | `--text` | |
| Muted text | `#4B5563` | `--muted` | 7.5:1 on white |
| Brand orange | `#F05A00` | `--accent` | Icons, rules, accents on navy. Not for small text on white (3.4:1). |
| Button orange | `#C84B00` | `--accent-strong` | White text 4.7:1 (AA) |
| Orange text | `#B33F00` | `--accent-text` | Links/eyebrows on white and light grey (5.3:1+) |
| Light section background | `#F4F6F8` | `--bg-alt` | |
| Borders | `#E2E6EB` / `#7B8794` | `--border` / `--border-strong` | Form fields use the strong border (3:1) |

No gradients, glows or glass effects.

## Typography

- One font: **Inter** (via `next/font/google`, self-hosted at build time).
- H1 `clamp(2rem → 3rem)`, H2 `clamp(1.625rem → 2.25rem)`, H3 `1.1875rem`, body `1rem / 1.6`.
- Exactly one H1 per page; headings do not skip levels.

## Layout

- Mobile-first. Breakpoints: 640px (2-column grids), 900px (split layouts), 1080px (desktop nav).
- Container 1200px, 20px gutter on mobile, 32px from 768px.
- Section padding 56px mobile, 80px tablet, 96px desktop.

## Header & calls to action

- Mobile/tablet: a sticky navy top bar with click-to-call `1300 425 498` and **Request a Quote**; logo + Menu button below.
- Desktop (1080px+): sticky white bar with nav, phone number and **Request a Quote**.
- Every page ends with the navy CTA band (Request a Quote + Call).
- The **24/7 Emergency HV Switching** button (`EmergencyButton`) appears on Home, the HV Switching page and Contact.

## Components

`Photo` (labelled placeholder until a real photo is supplied), `Todo` / `TodoBlock` (visible
content placeholders), cards (`ServiceCard`, `ProjectCard`, `IndustryTile`), `TestimonialGrid`,
`ClientLogos`, `CtaBand`, `Breadcrumbs` (with BreadcrumbList JSON-LD), `QuoteForm`.

## Motion

- A single 0.4s opacity fade-in on page content, inside `@media (prefers-reduced-motion: no-preference)`.
- Hover transitions 150ms on colour/border only. No transforms, parallax, particles, scroll effects or custom cursors.

## Rules

- No invented facts: no statistics, certifications, client names or service areas unless the client has supplied them. Use `<Todo>` instead.
- No stock or AI imagery presented as SPS work. Use `<Photo>` placeholders until the client supplies photos.
- Social links: LinkedIn only.
- Visible focus states (3px orange outline), 44px+ touch targets, 16px form inputs (no iOS zoom).
