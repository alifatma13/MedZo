# Technical Requirements Document — MedZo Website

**Version:** 1.0
**Date:** 2026-06-09
**Author:** Fatma Ali
**Status:** Live

---

## 1. Purpose

This document describes the technical architecture, requirements, and decisions for the MedZo marketing website (`medzo.com.au`). It is intended for developers maintaining or extending the site.

The site's single business goal is to convert Australian GPs, medical specialists, and practice owners into free consultation bookings. Every technical decision is evaluated against that goal.

---

## 2. System Overview

MedZo is a **statically generated marketing website** with a headless CMS. Content editors manage all content through Sanity Studio; GitHub Actions builds and deploys the site to Hostinger on every content change.

```
Content Editor
     │
     ▼
Sanity Studio (medzo.sanity.studio or /studio)
     │  webhook: repository_dispatch → sanity-content-update
     ▼
GitHub Actions (build-and-deploy)
     │  astro build → /dist
     ▼
Hostinger FTP → /public_html
     │
     ▼
medzo.com.au (static HTML/CSS/JS)
```

---

## 3. Technology Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Astro | 6.x |
| UI components | Astro (`.astro`) + React | 19.x |
| CMS | Sanity | v5 |
| Sanity Astro integration | `@sanity/astro` | 3.x |
| Sanity client | `@sanity/client` | 7.x |
| Animations | `motion` (Framer Motion) | 12.x |
| Forms | Web3Forms | — |
| Fonts | Inter Variable, Plus Jakarta Sans Variable, Bitter Variable, Podkova | — |
| TypeScript | strict mode | 5.x |
| Build output | Static (`output: 'static'`) | — |
| Hosting | Hostinger | — |
| CI/CD | GitHub Actions | — |
| Node requirement | `>=22.12.0` | — |
| Image CDN | Sanity CDN (`cdn.sanity.io`) | — |
| Sitemap | `@astrojs/sitemap` | 3.x |

React is included solely to render Sanity Studio at `/studio`. All site pages use `.astro` components.

---

## 4. Routes & Pages

| Route | File | Data source |
|---|---|---|
| `/` | `src/pages/index.astro` | Sanity: home page, services, testimonials, FAQs |
| `/about` | `src/pages/about.astro` | Sanity: about page, team, credentials |
| `/services/[service]` | `src/pages/services/[service].astro` | Sanity: service by slug (dynamic static paths) |
| `/insights` | `src/pages/insights.astro` | Sanity: blog post list |
| `/insights/[slug]` | `src/pages/insights/[slug].astro` | Sanity: blog post by slug |
| `/careers` | `src/pages/careers.astro` | Sanity: careers page |
| `/contact` | `src/pages/contact.astro` | Sanity: contact page |
| `/faq` | `src/pages/faq.astro` | Sanity: FAQ items |
| `/privacy` | `src/pages/privacy.astro` | Static content (`src/lib/content/privacy.ts`) |
| `/terms` | `src/pages/terms.astro` | Static content (`src/lib/content/terms.ts`) |
| `/studio` | Sanity Studio | — |
| `/404` | `src/pages/404.astro` | Static |

Dynamic routes (`[service]`, `[slug]`) use `getStaticPaths()` to enumerate all slugs from Sanity at build time. No SSR is required.

---

## 5. Content Architecture

### 5.1 Two-layer content model

The site uses a two-layer model to support both the current file-based state and future CMS-only state:

| Layer | Location | Purpose |
|---|---|---|
| Static fallback | `src/lib/content/*.ts` | Site-wide copy that rarely changes (nav, footer, privacy, terms, UI labels) |
| CMS-driven | `src/lib/api/*.ts` → Sanity | Page content, services, blog, team, testimonials, FAQs |

### 5.2 Content fetcher files

Each file in `src/lib/api/` covers exactly one Sanity document type:

| File | Sanity type | Exports |
|---|---|---|
| `sanity.ts` | — | `sanityClient` (pre-configured client) |
| `homePage.ts` | `homePage` | `getHomePage()` |
| `aboutPage.ts` | `aboutPage` | `getAboutPage()` |
| `services.ts` | `service` | `getServices()`, `getServiceBySlug()`, `getServiceSlugs()` |
| `blog.ts` | `blogPost` | `getBlogPosts()`, `getBlogPostBySlug()`, `getBlogPostSlugs()` |
| `careersPage.ts` | `careersPage` | `getCareersPage()` |
| `contactPage.ts` | `contactPage` | `getContactPage()` |
| `faq.ts` | `faq` | `getFAQs()` |
| `team.ts` | `teamMember` | `getTeam()` |
| `testimonials.ts` | `testimonial` | `getTestimonials()` |
| `siteSettings.ts` | `siteSettings` | `getSiteSettings()` |

All queries are defined with `defineQuery()` from `groq` and pinned to API version `2025-05-27`.

### 5.3 Static content files

| File | Contents |
|---|---|
| `site.ts` | `SITE_NAME`, `SITE_DOMAIN`, `defaultMeta` |
| `nav.ts` | Navigation labels and links |
| `footer.ts` | Footer copy, links, legal text |
| `layout.ts` | Skip-link label and other layout strings |
| `ui.ts` | Shared button labels and generic UI copy |
| `privacy.ts` | Full privacy policy text |
| `terms.ts` | Full terms of service text |
| `heroVisual.ts` | Hero visual data (metrics cards, etc.) |
| `schema.ts` | JSON-LD schema builders |
| `contact.ts` | Static contact details (phone, email) |

### 5.4 SVG icons

All SVG icons live in `src/lib/utils/icons.ts` in a named map. Components render icons via:

```astro
<Fragment set:html={icons["icon-name"]} />
```

No inline `<svg>` blocks are permitted in component files.

### 5.5 Images

Raster images are stored in `src/res/`. Uploaded media (blog covers, service hero images, team photos) are served from the Sanity CDN (`cdn.sanity.io`). The Astro `<Image />` component is used for all images; raw `<img>` tags are not permitted. The `astro.config.mjs` allowlists `cdn.sanity.io` as a remote image pattern.

---

## 6. Component Architecture

```
src/components/
  ui/           # Primitives: Button, ServiceCard, BlogCard, FAQItem, TestimonialCard, WhyItem
  layout/       # Nav, Footer
  sections/     # Page-level blocks (one responsibility each)
src/layouts/
  Layout.astro  # Base shell: <head>, Nav, <main>, Footer
src/pages/      # Route files — thin orchestrators only
```

### Rules enforced across the codebase

- Max ~80 lines per `.astro` file (frontmatter + template + style combined)
- Props interface declared at the top of every component frontmatter
- No cross-layer imports (`ui/` cannot import from `sections/`)
- No business logic in pages — data fetching belongs in `src/lib/api/`
- All visible copy referenced from a content variable, never hardcoded in templates

---

## 7. Layout Shell (`Layout.astro`)

Every page uses `Layout.astro` which provides:

- `<ClientRouter />` (Astro view transitions — eliminates full-page flash on navigation)
- Font preloads: Inter Variable, Plus Jakarta Sans Variable, Bitter Variable (normal + italic)
- Preconnect hint to `cdn.sanity.io`
- Full `<head>` metadata: title, description, canonical, sitemap link, Open Graph, Twitter Card
- Two JSON-LD blocks: `MedicalBusiness` schema and `WebSite` schema (injected on every page)
- Skip-link (`#main-content`) for keyboard accessibility
- `<Nav />` and `<Footer />`

Per-page JSON-LD (FAQPage, Service, BreadcrumbList) is injected via a `<slot name="head">` in each page file.

---

## 8. Animations

All animations use the `motion` package. The following patterns are mandatory:

| Pattern | Requirement |
|---|---|
| Entrance animations | Every above-fold section fades + slides in on load |
| Scroll-reveal | Below-fold sections animate in via `inView()` |
| Staggered lists | Card/item lists use `stagger(0.08)` |
| Button hover | Subtle `scale: 1.04` on hover |
| Page transitions | `<main>` fades in on every route change |

**ClientRouter rule:** Every `<script>` block wraps all code in `astro:page-load`:
```ts
document.addEventListener("astro:page-load", () => { ... });
```
This ensures animations replay on every navigation, not only on first load.

**No-flash rule:** Every element animated from `opacity: 0` must have `opacity: 0` set in CSS under `@media (prefers-reduced-motion: no-preference)` before the JS runs.

**Reduced motion:** All `animate()` calls are gated on:
```ts
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) { ... }
```

**TypeScript:** The `motion` package's TS overloads do not cover all valid runtime arguments. Cast `animate` as `(animate as any)(...)` rather than using `@ts-ignore`.

---

## 9. Forms

The contact form submits to [Web3Forms](https://web3forms.com). The access key is injected at build time via `PUBLIC_WEB3FORMS_KEY`. Rate-limit protection prevents rapid re-submissions on the client side.

---

## 10. SEO & AEO

| Signal | Implementation |
|---|---|
| Structured data | JSON-LD: `MedicalBusiness`, `WebSite`, `FAQPage`, `Service`, `BreadcrumbList` |
| Sitemap | Auto-generated by `@astrojs/sitemap`; `/404` excluded |
| Canonical URLs | Set on every page via `<link rel="canonical">` |
| Open Graph | Full OG tags on every page; default `og-image.webp` (1080×1080) |
| Twitter Card | `summary_large_image` on every page |
| `lang` attribute | `<html lang="en">` |
| `og:locale` | `en_AU` |
| `sameAs` | Placeholder in `schema.ts` — add LinkedIn and other verified profiles once live |

---

## 11. Accessibility

Target standard: **WCAG 2.1 AA**.

| Requirement | Implementation |
|---|---|
| Semantic HTML | Correct landmark elements (`<nav>`, `<main>`, `<header>`, `<footer>`, `<section>`) |
| Single `<h1>` per page | Enforced in page templates |
| Sequential heading levels | No levels skipped for visual styling |
| Skip link | `<a href="#main-content">` in every layout |
| Focus styles | `:focus-visible` on all interactive elements; browser default never removed without replacement |
| Keyboard navigation | All interactions operable by keyboard |
| Alt text | All `<Image />` components have meaningful `alt`; decorative images use `alt=""` |
| Colour contrast | Minimum 4.5:1 for body text, 3:1 for large text |
| Form labels | Every input has an associated `<label>` |
| Reduced motion | All animations gated on `prefers-reduced-motion` media query |

---

## 12. Performance

| Technique | Detail |
|---|---|
| Static generation | All pages pre-rendered at build time — zero server runtime |
| Image optimisation | Astro `<Image />` generates optimised formats and sizes |
| Font preloads | WOFF2 files preloaded in `<head>` for Inter, Jakarta Sans, and Bitter |
| CDN preconnect | `<link rel="preconnect" href="https://cdn.sanity.io">` reduces DNS/TLS time |
| Inline stylesheets | `build.inlineStylesheets: "auto"` in `astro.config.mjs` |
| Animate only composited properties | Only `opacity` and `transform` are animated — no layout-triggering properties |

---

## 13. CI/CD Pipeline

Workflow file: `.github/workflows/deploy.yml`

**Trigger events:**
- Push to `main`
- Manual `workflow_dispatch`
- `repository_dispatch` with type `sanity-content-update` (fired by Sanity webhook on content publish)

**Steps:**
1. Checkout repository
2. Set up Node 22 with npm cache
3. `npm ci`
4. `astro build` (with Sanity and Web3Forms secrets injected as env vars)
5. FTP deploy `./dist/` → Hostinger `/public_html/`

Git and dotfiles are excluded from the FTP upload.

---

## 14. Environment Variables

| Variable | Required | Purpose |
|---|---|---|
| `PUBLIC_SANITY_PROJECT_ID` | Yes | Sanity project identifier |
| `PUBLIC_SANITY_DATASET` | Yes | Sanity dataset name (e.g. `production`) |
| `PUBLIC_WEB3FORMS_KEY` | Yes | Web3Forms access key for contact form |
| `FTP_SERVER` | CI only | Hostinger FTP hostname |
| `FTP_USERNAME` | CI only | Hostinger FTP username |
| `FTP_PASSWORD` | CI only | Hostinger FTP password |

In development, variables are loaded from `.env`. In CI, they are injected from GitHub repository secrets. A `.env.sample` file is committed to the repo documenting all required variables.

---

## 15. Sanity CMS

- **Studio URL:** `medzo.sanity.studio` (also accessible at `/studio` in development)
- **API version pinned:** `2025-05-27` — update intentionally, not automatically
- **CDN usage:** Enabled in production (`PROD: true`), disabled in development for live data
- **Content update flow:** Editor publishes in Studio → Sanity fires webhook → GitHub Actions rebuilds and deploys

### Document types

| Type | Purpose |
|---|---|
| `homePage` | Home page singleton |
| `aboutPage` | About page singleton |
| `service` | Service pages (one document per service) |
| `blogPost` | Insights/blog articles |
| `careersPage` | Careers page singleton |
| `contactPage` | Contact page singleton |
| `faq` | FAQ items (list) |
| `teamMember` | Team member profiles |
| `testimonial` | Client testimonials |
| `siteSettings` | Global site settings |

---

## 16. Naming Conventions

| Item | Convention | Example |
|---|---|---|
| Component files | PascalCase | `PricingCard.astro` |
| Utility files | camelCase | `formatDate.ts` |
| CSS class names | kebab-case | `.hero-title` |
| TypeScript interfaces | PascalCase | `Props`, `SanityServicePage` |
| Constants | SCREAMING_SNAKE_CASE | `SITE_NAME`, `MAX_ITEMS` |

---

## 17. Open Items / Known Constraints

| Item | Status | Notes |
|---|---|---|
| `sameAs` in JSON-LD | Pending | Add LinkedIn and other verified social/directory URLs to `src/lib/content/schema.ts` once profiles are live |
| Prose body fields | Pending | 5 Sanity text fields need migrating from `string` to `array-of-text` (Portable Text) after content entry is complete |
| Service page content | Pending | Service documents in Sanity need content entry before service pages render fully |
| LinkedIn company page | Pending | Not yet created (~2026-06-02); add URL to `sameAs` when live |
| Careers apply form | Pending | CareersApplySection currently has no backend; Web3Forms or similar to be wired up |
