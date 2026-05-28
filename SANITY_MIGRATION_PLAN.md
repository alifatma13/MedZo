# MedZo — Sanity CMS Migration Plan

This document is the single source of truth for the Sanity CMS migration.
Complete Phase 1 fully before starting Phase 2. Complete Phase 2 fully before starting Phase 3.

---

## Table of Contents

- [Architecture Decisions](#architecture-decisions)
- [What Goes to Sanity vs Stays in Code](#what-goes-to-sanity-vs-stays-in-code)
- [Phase 1 — Schema & Studio Setup](#phase-1--schema--studio-setup)
- [Phase 2 — Astro Page Migration](#phase-2--astro-page-migration)
- [Phase 3 — Aggressive Testing & Content Visibility](#phase-3--aggressive-testing--content-visibility)
- [Sign-off Criteria](#sign-off-criteria)

---

## Architecture Decisions

Key decisions made during planning — reference these if anything is questioned later.

### Nav structure — three separate sources

| Nav element | Source | Who controls it |
|---|---|---|
| Services dropdown children | `service` Sanity collection — auto-populates | Team (publish a service = it appears) |
| Top-level links (Why MedZo, FAQ, About, Blog…) | `siteSettings.navigation[]` | Team (edit Site Settings in Studio) |
| CTA button ("Book a consult") | `nav.ts` — hardcoded | Developer |
| "Services" parent label | `nav.ts` — hardcoded | Developer |

Adding a new service = new nav dropdown entry automatically.
Adding a new top-level link (e.g. Blog) = team edits Site Settings → Navigation.

### Singletons enforced via Studio structure, not schema

There is no `singleton: true` in Sanity. Singletons are enforced by:
1. Assigning a fixed `documentId` in `src/structure/index.ts`
2. Keeping them out of the generic document list

### `iconName` fields are dropdowns, not free text

All `iconName` fields use `options: { list: CONTENT_ICONS }` mapping exactly to keys in
`src/lib/utils/icons.ts`. If a developer adds a new icon to `icons.ts`, they must also add it
to `src/lib/content/schemas/shared/iconsList.ts`.

### CTA hrefs stay in code

CTA button labels (`ctaLabel`, `ctaButtonLabel`, `heroPrimaryCtaLabel`) go to Sanity.
CTA destination hrefs (`/contact`) stay hardcoded in components — they must match real routes.

### Images

- All raster images move to Sanity (team uploads via Studio)
- The logo (`src/res/logo.png`) stays in code — brand asset, developer concern
- All image fields use `hotspot: true` — replaces the old CSS `imagePosition` string
- `src/lib/utils/sanityImage.ts` provides the `urlFor()` helper for CDN URLs

### Privacy/Terms FAQ stays in code

The Privacy Policy FAQ (`privacy.ts → faqs`) stays in code because:
1. Answers are legally coupled to the policy sections above them
2. Answers reference `${SITE_DOMAIN}` as a code variable
3. Incorrect edits have compliance implications

### `heroVisual.ts` stays in code

Mock decorative data for the hero dashboard widget. Explicitly not CMS content.

---

## What Goes to Sanity vs Stays in Code

### ✅ Sanity (8 document types)

| # | Type | Kind | Content |
|---|---|---|---|
| 1 | `teamMember` | Collection | Name, role, bio, photo, order |
| 2 | `testimonial` | Collection | Quote, name, role/practice, order |
| 3 | `faqItem` | Collection | Question, answer, order |
| 4 | `service` | Collection | Full service page + card + nav entry + SEO |
| 5 | `homePage` | Singleton | Hero, ticker, how it works, services labels, why section, testimonials heading, final CTA, SEO |
| 6 | `aboutPage` | Singleton | Hero, founder, mission, values, credentials, CTA, SEO |
| 7 | `contactPage` | Singleton | Hero, trust points, office details, SEO |
| 8 | `siteSettings` | Singleton | Default meta, footer tagline, contact email, location, acknowledgement, navigation[] |

### 🔒 Stays in `src/lib/content/` — developer-owned

| File | Why |
|---|---|
| `nav.ts` — CTA + brand strings | Structural identity |
| `nav.ts` — `navLinks[]` | Replaced by `siteSettings.navigation[]` in Phase 2 |
| `ui.ts` | Component UI labels, ARIA strings |
| `contact.ts` — all form fields | Labels, placeholders, all error/validation copy |
| `privacy.ts` | Legal document + `SITE_DOMAIN` variable coupling |
| `terms.ts` | Legal document + `SITE_DOMAIN` variable coupling |
| `heroVisual.ts` | Decorative mock data |
| `schema.ts` | JSON-LD structured data |
| `site.ts` | `SITE_NAME`, `SITE_DOMAIN` constants |
| `icons.ts` | SVG icon registry — developer-maintained |

---

## Phase 1 — Schema & Studio Setup

**Goal:** Sanity Studio is live at `/studio` with all schemas defined. The team can enter content.
No Astro pages are changed in this phase.

### Prerequisites — all packages already installed

| Package | Status |
|---|---|
| `@sanity/astro` | ✅ configured in `astro.config.mjs` |
| `@sanity/client` | ✅ installed |
| `sanity` v5 | ✅ installed |
| `@sanity/icons` | ✅ installed (dep of sanity) |
| `@sanity/image-url` | ✅ installed |
| `groq` | ✅ installed |
| `sanity.cli.ts` | ❌ missing — create in this phase |

### File manifest — 16 files

| # | File | Action |
|---|---|---|
| 1 | `sanity.cli.ts` | Create |
| 2 | `src/lib/content/schemas/shared/seoFields.ts` | Create |
| 3 | `src/lib/content/schemas/shared/iconsList.ts` | Create |
| 4 | `src/lib/content/schemas/teamMember.ts` | Create |
| 5 | `src/lib/content/schemas/testimonial.ts` | Create |
| 6 | `src/lib/content/schemas/faqItem.ts` | Create |
| 7 | `src/lib/content/schemas/service.ts` | Create |
| 8 | `src/lib/content/schemas/homePage.ts` | Create |
| 9 | `src/lib/content/schemas/aboutPage.ts` | Create |
| 10 | `src/lib/content/schemas/contactPage.ts` | Create |
| 11 | `src/lib/content/schemas/siteSettings.ts` | Create |
| 12 | `src/structure/index.ts` | Create |
| 13 | `src/lib/utils/sanityImage.ts` | Create |
| 14 | `sanity.config.ts` | Update — wire all schemas + structure plugin |
| 15 | `astro.config.mjs` | Update — add `cdn.sanity.io` to remotePatterns |
| 16 | `tsconfig.json` | Update — add `@sanity/astro/module` + `sanity.types.ts` |

---

### 1.1 `sanity.cli.ts`

TypeGen auto-generates `sanity.types.ts` on every `sanity dev` and `sanity build`.

```ts
import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: { projectId: 'j8vrs6gs', dataset: 'production' },
  typegen: {
    enabled: true,
    path: './src/**/*.{ts,tsx,astro}',
    generates: './sanity.types.ts',
    overloadClientMethods: true,
  },
})
```

---

### 1.2 `shared/seoFields.ts`

Spread into every page document. Never duplicate.

```ts
import { defineField } from 'sanity'

export const seoFields = [
  defineField({
    name: 'seoTitle',
    title: 'SEO Title',
    type: 'string',
    description: 'Overrides the page title in search results. 50–60 characters ideal.',
    validation: r => r.max(60).warning('Keep under 60 characters for best results'),
  }),
  defineField({
    name: 'seoDescription',
    title: 'SEO Description',
    type: 'text',
    rows: 3,
    description: 'Shown under the title in search results. 150–160 characters ideal.',
    validation: r => r.max(160).warning('Keep under 160 characters for best results'),
  }),
]
```

---

### 1.3 `shared/iconsList.ts`

Maps exactly to content-facing keys in `src/lib/utils/icons.ts`.
When a developer adds a new icon to `icons.ts`, add it here too.

```ts
export const CONTENT_ICONS = [
  // Service card + nav
  { title: 'Monitor',       value: 'monitor'       },
  { title: 'Users',         value: 'users'         },
  { title: 'File Text',     value: 'file-text'     },
  // Service features
  { title: 'Calendar',      value: 'calendar'      },
  { title: 'Phone Call',    value: 'phone-call'    },
  { title: 'Credit Card',   value: 'credit-card'   },
  { title: 'Video',         value: 'video'         },
  { title: 'Lock',          value: 'lock'          },
  { title: 'Settings',      value: 'settings'      },
  { title: 'Link',          value: 'link'          },
  { title: 'Bar Chart',     value: 'bar-chart'     },
  { title: 'Eye',           value: 'eye'           },
  { title: 'Sliders',       value: 'sliders'       },
  { title: 'Send',          value: 'send'          },
  { title: 'Dollar Sign',   value: 'dollar-sign'   },
  { title: 'Alert Circle',  value: 'alert-circle'  },
  { title: 'Clipboard',     value: 'clipboard'     },
  { title: 'Shield Check',  value: 'shield-check'  },
  { title: 'Plug',          value: 'plug'          },
  // About values + Why MedZo
  { title: 'Activity',      value: 'activity'      },
  { title: 'Trending Up',   value: 'trending-up'   },
  { title: 'Heart',         value: 'heart'         },
  { title: 'Check Circle',  value: 'check-circle'  },
  { title: 'Target',        value: 'target'        },
  { title: 'Refresh',       value: 'refresh'       },
]
```

---

### 1.4 `teamMember.ts` — collection

**Studio icon:** `UsersIcon`

| Field | Type | Validation | Notes |
|---|---|---|---|
| `name` | `string` | required | Full name |
| `role` | `string` | required | Job title |
| `bio` | `text` rows=5 | required | Multi-sentence biography |
| `photo` | `image` hotspot=true | required | Includes `alt` sub-field (required) |
| `order` | `number` | required, integer, positive | Carousel position. Use 1, 2, 3… |

**Dropped:** `imagePosition` CSS string — replaced by Sanity hotspot.
**Preview:** name + role + photo thumbnail.

---

### 1.5 `testimonial.ts` — collection

**Studio icon:** `StarIcon`

| Field | Type | Validation | Notes |
|---|---|---|---|
| `quote` | `text` rows=4 | required | |
| `name` | `string` | required | e.g. `"Dr. Sarah T."` |
| `role` | `string` | optional | e.g. `"General Practitioner, NSW"` |
| `order` | `number` | required, integer, positive | Display order |

**Preview:** name + role.

---

### 1.6 `faqItem.ts` — collection

**Studio icon:** `HelpCircleIcon`

| Field | Type | Validation | Notes |
|---|---|---|---|
| `question` | `string` | required | |
| `answer` | `text` rows=4 | required | |
| `order` | `number` | required, integer, positive | Display order |

**Preview:** question text.

---

### 1.7 `service.ts` — collection

**Studio icon:** `BriefcaseIcon`
**Field groups:** Card & Nav · Service Page · SEO

#### Card & Nav group

| Field | Type | Validation | Notes |
|---|---|---|---|
| `title` | `string` | required | Used on home card + nav label |
| `slug` | `slug` | required | Auto-generated from title. Determines `/services/[slug]` URL |
| `description` | `text` rows=3 | required | Longer card description for home page |
| `cardIconName` | `string` list=CONTENT_ICONS | required | Icon on home card and nav dropdown |
| `navDescription` | `string` max=80 | required | Short one-liner for nav dropdown only |
| `navOrder` | `number` | required, integer, positive | Order in nav dropdown and home page card grid |

#### Service Page group

| Field | Type | Validation | Notes |
|---|---|---|---|
| `heroLabel` | `string` | required | Badge above heading |
| `heroHeading` | `string` | required | Main headline |
| `heroIntro` | `text` rows=3 | required | Paragraph under heading |
| `heroCtaLabel` | `string` | required | CTA button text (href hardcoded to `/contact`) |
| `heroImage` | `image` hotspot=true | required | Includes `alt` sub-field (required) |
| `featuresHeading` | `string` | required | |
| `featuresIntro` | `text` rows=2 | required | |
| `features[]` | array of objects | required, min=1 | Each: `iconName` dropdown + `title` + `body` text |
| `ctaHeading` | `string` | required | |
| `ctaBody` | `text` rows=2 | required | |
| `ctaLabel` | `string` | required | CTA button text (href hardcoded to `/contact`) |

#### SEO group
`...seoFields`

**Slug validation:** custom — lowercase, hyphens only, unique across all service documents.
**Preview:** title + slug.current.

---

### 1.8 `homePage.ts` — singleton

**Studio icon:** `HomeIcon`
**Document ID:** `'homePage'`
**Field groups:** Hero · Specialty Ticker · How It Works · Services Section · Why MedZo · Testimonials · Final CTA · SEO

#### Hero group

| Field | Type | Source in `home.ts` |
|---|---|---|
| `heroHeading` | `string` | `hero.heading` |
| `heroSubheading` | `text` rows=3 | `hero.subheading` |
| `heroBody` | `string` | `hero.body` |
| `heroPrimaryCtaLabel` | `string` | `hero.ctaPrimary.label` |
| `heroSecondaryCtaLabel` | `string` | `hero.ctaSecondary.label` |
| `heroImage` | `image` hotspot=true + `alt` | `hero_image.png` (was hardcoded import in `index.astro`) |

#### Specialty Ticker group

| Field | Type | Source |
|---|---|---|
| `tickerIntro` | `string` | `ticker.intro` |
| `tickerSpecialties[]` | array of `string` | `ticker.specialties[]` |

#### How It Works group

| Field | Type | Source |
|---|---|---|
| `howItWorksEyebrow` | `string` | `howItWorks.eyebrow` |
| `howItWorksHeading` | `string` | `howItWorks.heading` |
| `howItWorksSubheading` | `text` rows=2 | `howItWorks.subheading` |
| `howItWorksSteps[]` | array of step objects | `howItWorks.steps[]` |
| └ `stepLabel` | `string` | e.g. `"STEP 1: Discovery"` |
| └ `title` | `string` | e.g. `"Practice Alignment"` |
| └ `description` | `text` rows=2 | |
| └ `bullets[]` | array of `string` | |

#### Services Section group

| Field | Type | Source |
|---|---|---|
| `servicesEyebrow` | `string` | `servicesSection.eyebrow` |
| `servicesTitle` | `string` | `servicesSection.title` |
| `servicesBody` | `text` rows=2 | `servicesSection.body` |
| `servicesBridgeText` | `string` | `servicesBridge.text` |

#### Why MedZo group

| Field | Type | Source |
|---|---|---|
| `whyHeading` | `string` | `whySection.heading` |
| `whyImage` | `image` hotspot=true + `alt` | `why_us.png` (was hardcoded import in `WhyChooseUs.astro`) |
| `whyMetrics[]` | array of metric objects | `whySection.metrics[]` |
| └ `value` | `number` | e.g. `100000` |
| └ `suffix` | `string` | e.g. `"+"` |
| └ `label` | `string` | e.g. `"Appointments booked virtually"` |
| `whyItems[]` | array of why item objects | `whySection.items[]` |
| └ `iconName` | `string` list=CONTENT_ICONS | |
| └ `title` | `string` | |
| └ `description` | `text` rows=2 | |

#### Testimonials group

| Field | Type | Source |
|---|---|---|
| `testimonialsHeading` | `string` | `testimonialsSection.heading` |
| `testimonialsViewMoreLabel` | `string` | `testimonialsSection.viewMore.label` |

#### Final CTA group

| Field | Type | Source |
|---|---|---|
| `finalCtaHeading` | `string` | `finalCta.heading` |
| `finalCtaButtonLabel` | `string` | `finalCta.buttonLabel` |

#### SEO group
`...seoFields` — home page currently uses `defaultMeta` fallback. Set these explicitly after migration.

---

### 1.9 `aboutPage.ts` — singleton

**Studio icon:** `DocumentIcon`
**Document ID:** `'aboutPage'`
**Field groups:** Hero · Founder · Mission · Values · Credentials · CTA · SEO

#### Hero group

| Field | Type | Note |
|---|---|---|
| `heroHeading` | `string` | `about.hero.heading` |
| `heroBody` | `text` rows=4 | Replaces `about.hero.paragraphs[]` — line breaks = paragraph breaks |

#### Founder group

| Field | Type | Source |
|---|---|---|
| `founderSectionHeading` | `string` | `"Meet Zohra"` |
| `founderIntro` | `text` rows=2 | The italic intro sentence |
| `founderName` | `string` | `"Dr. Zohra"` |
| `founderRole` | `string` | `"CEO, Founder & Director"` |
| `founderBio` | `text` rows=8 | Replaces `bio: string[]` — single text field |
| `founderPhoto` | `image` hotspot=true + `alt` | `ZohraSaima.png` |

#### Mission group

| Field | Type |
|---|---|
| `missionHeading` | `string` |
| `missionBody` | `text` rows=4 |

#### Values group

| Field | Type |
|---|---|
| `valuesHeading` | `string` |
| `valuesItems[]` | array of objects: `iconName` dropdown + `title` + `body` text |

#### Credentials group

| Field | Type |
|---|---|
| `credentialsHeading` | `string` |
| `credentialsItems[]` | array of `string` — each is one bullet point |

#### CTA group

| Field | Type | Note |
|---|---|---|
| `ctaBody` | `text` rows=2 | |
| `ctaButtonLabel` | `string` | Href hardcoded to `/contact` |

#### SEO group
`...seoFields`

---

### 1.10 `contactPage.ts` — singleton

**Studio icon:** `EnvelopeIcon`
**Document ID:** `'contactPage'`
**Field groups:** Hero · Offices · SEO

#### Hero group

| Field | Type | Source |
|---|---|---|
| `heroHeading` | `string` | `contact.hero.heading` |
| `heroBody` | `text` rows=3 | `contact.hero.body` |
| `heroTrustPoints[]` | array of `string` | `contact.hero.trust[]` |

#### Offices group

| Field | Type | Source |
|---|---|---|
| `officesHeading` | `string` | `contact.offices.heading` |
| `officesBody` | `text` rows=2 | `contact.offices.body` |
| `officeLocations[]` | array of location objects | `contact.offices.locations[]` |
| └ `state` | `string` | e.g. `"NSW"` |
| └ `suburb` | `string` | e.g. `"Sydney"` |
| └ `address` | `text` rows=3 | Multi-line street address |
| └ `phone` | `string` | optional |
| └ `email` | `string` email validation | optional |

#### SEO group
`...seoFields`

---

### 1.11 `siteSettings.ts` — singleton

**Studio icon:** `CogIcon`
**Document ID:** `'siteSettings'`
No groups needed — small enough to be a flat form.

| Field | Type | Source | Notes |
|---|---|---|---|
| `defaultMetaTitle` | `string` | `site.ts → defaultMeta.title` | Fallback SEO title for pages with no `seoTitle` |
| `defaultMetaDescription` | `text` rows=3 | `site.ts → defaultMeta.description` | Fallback SEO description |
| `footerTagline` | `text` rows=2 | `footer.ts → tagline` | |
| `contactEmail` | `string` email validation | `footer.ts → contact.email` | `hello@medzo.com.au` |
| `contactLocation` | `string` | `footer.ts → contact.location` | `"Australia-wide"` |
| `acknowledgementText` | `text` rows=5 | `footer.ts → acknowledgement` | Indigenous acknowledgement paragraph |
| `navigation[]` | array of nav link objects | `nav.ts → navLinks` (non-service items) | Services dropdown NOT included here — auto-populates from `service` collection |
| └ `label` | `string` | required | e.g. `"FAQ"` |
| └ `href` | `string` | required | e.g. `"/faq"` or `"/#why-medzo"` |
| └ `isVisible` | `boolean` default=true | | Toggle without deleting the item |

---

### 1.12 `src/structure/index.ts` — Studio structure

Singletons pinned at the top, dividers between groups, collections below.
Each singleton uses `S.document().documentId('fixedId')` — prevents duplication.

```
⚙️  Site Settings          ← singletons first
🏠  Home Page
📄  About Page
✉️  Contact Page
─────────────────────
💼  Services               ← collections
👥  Team Members
⭐  Testimonials
❓  FAQ
```

---

### 1.13 `src/lib/utils/sanityImage.ts`

```ts
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

const builder = imageUrlBuilder({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
})

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}
```

Usage in Astro components (Phase 2):
```ts
urlFor(member.photo).width(400).height(400).fit('crop').url()
// Respects hotspot focal point, auto-serves WebP
```

---

### 1.14 `sanity.config.ts` — updated

```ts
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { structure } from './src/structure'
import { teamMember }    from './src/lib/content/schemas/teamMember'
import { testimonial }   from './src/lib/content/schemas/testimonial'
import { faqItem }       from './src/lib/content/schemas/faqItem'
import { service }       from './src/lib/content/schemas/service'
import { homePage }      from './src/lib/content/schemas/homePage'
import { aboutPage }     from './src/lib/content/schemas/aboutPage'
import { contactPage }   from './src/lib/content/schemas/contactPage'
import { siteSettings }  from './src/lib/content/schemas/siteSettings'

export default defineConfig({
  name: 'medzo-studio',
  title: 'MedZo',
  projectId: 'j8vrs6gs',
  dataset: 'production',
  plugins: [structureTool({ structure })],
  schema: {
    types: [
      // Collections
      teamMember, testimonial, faqItem, service,
      // Singletons
      homePage, aboutPage, contactPage, siteSettings,
    ],
  },
})
```

---

### 1.15 `astro.config.mjs` — add Sanity CDN to remotePatterns

Add `cdn.sanity.io` so Astro's `<Image />` component can optimise Sanity CDN images:

```js
image: {
  remotePatterns: [
    { protocol: "https", hostname: "i.pravatar.cc" },
    { protocol: "https", hostname: "cdn.sanity.io" }, // ← add
  ],
},
```

---

### 1.16 `tsconfig.json` — add Sanity module types

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "types": ["@sanity/astro/module"]
  },
  "include": [".astro/types.d.ts", "**/*", "sanity.types.ts"],
  "exclude": ["dist"]
}
```

`@sanity/astro/module` enables the `sanity:client` virtual import in `.astro` files.
`sanity.types.ts` is explicitly included so TypeGen output is always picked up by the compiler.

---

## Phase 2 — Astro Page Migration

**Goal:** Every Astro page fetches content from Sanity. The static `src/lib/content/` files
for managed content become unused (but are kept as reference until Phase 3 passes).

### Query layer — `src/lib/api/`

One file per content type, each using `defineQuery` + `sanityClient`:

| File | Queries |
|---|---|
| `src/lib/api/homePage.ts` | `HOME_PAGE_QUERY` — full homePage singleton |
| `src/lib/api/aboutPage.ts` | `ABOUT_PAGE_QUERY` — full aboutPage singleton |
| `src/lib/api/contactPage.ts` | `CONTACT_PAGE_QUERY` — full contactPage singleton |
| `src/lib/api/siteSettings.ts` | `SITE_SETTINGS_QUERY` — siteSettings singleton |
| `src/lib/api/services.ts` | `SERVICES_QUERY` — all services ordered by navOrder; `SERVICE_BY_SLUG_QUERY` — single service |
| `src/lib/api/team.ts` | `TEAM_QUERY` — all team members ordered by order |
| `src/lib/api/testimonials.ts` | `TESTIMONIALS_QUERY` — all testimonials ordered by order |
| `src/lib/api/faq.ts` | `FAQ_QUERY` — all FAQ items ordered by order |

### GROQ query rules

- Always wrap in `defineQuery` from `groq` — enables TypeGen
- Always project only the fields needed — never `*[_type == "x"]` without projection
- Always include `_key` in array projections
- Always use `| order(field asc)` before any slice
- Use `coalesce(seoTitle, $defaultTitle)` for SEO fallbacks
- Image queries must include `asset->{ _id, url, metadata { lqip, dimensions } }` and `hotspot`, `crop`

### Page migration checklist

| File | Change | Notes |
|---|---|---|
| `src/pages/index.astro` | Import `getHomePage()`, `getServices()`, `getTestimonials()` | Remove static imports from `home.ts`, `services.ts`, `testimonials.ts` |
| `src/pages/about.astro` | Import `getAboutPage()`, `getTeamMembers()` | Remove static imports |
| `src/pages/contact.astro` | Import `getContactPage()` | Remove static imports |
| `src/pages/faq.astro` | Import `getFaqs()`, heading from `getHomePage()` | Remove static imports |
| `src/pages/services/[service].astro` | Import `getServices()` for `getStaticPaths()`, `getServiceBySlug()` for page data | Remove static imports |
| `src/components/layout/Nav.astro` | Fetch `siteSettings.navigation[]` + `service` collection for dropdown | Removes dependency on `nav.ts` navLinks |
| `src/components/layout/Footer.astro` | Fetch `siteSettings` for tagline, email, location, acknowledgement | Removes dependency on `footer.ts` for these fields |
| `src/components/sections/WhyChooseUs.astro` | Receives `whyImage` as prop instead of hardcoded import | Prop comes from homePage query |

### Component prop changes

**`WhyChooseUs.astro`** — add `whyImage` prop (Sanity image object), remove hardcoded `import whyImage`.

**`HeroSection.astro`** — receives `heroImage` as Sanity image URL from homePage, remove hardcoded import from `index.astro`.

**`TeamSection.astro`** — receives `members` from Sanity query; `photo` is now a Sanity image object. Use `urlFor(member.photo).width(400).height(400).fit('crop').url()` instead of `/images/team/` paths.

**`FounderSection.astro`** — `founder.imageUrl` becomes a Sanity image object. Use `urlFor`.

**`ServicePageHero.astro`** — `heroImage` becomes a Sanity image object. Use `urlFor`.

### `nav.ts` simplification

After Nav.astro fetches from Sanity, `nav.ts` shrinks to:
```ts
export const navBrand = { ... }   // unchanged
export const navCta = { ... }     // unchanged
// navLinks removed — now comes from siteSettings.navigation[] + service collection
```

### `footer.ts` simplification

After Footer.astro fetches from Sanity, `footer.ts` removes:
- `tagline` — comes from `siteSettings.footerTagline`
- `contact.email` — comes from `siteSettings.contactEmail`
- `contact.location` — comes from `siteSettings.contactLocation`
- `acknowledgement` — comes from `siteSettings.acknowledgementText`
- `services` map — comes from `service` collection

Retains: `columnHeadings`, `company` links, `legalLinks`, `logoAlt`, `wordmark`, `copyright`.

---

## Phase 3 — Aggressive Testing & Content Visibility

**Goal:** Every piece of content entered in Studio renders correctly on the site.
No visual regressions. Non-technical team can operate Studio without help.

### 3.1 Studio Schema Validation Tests

Run inside Studio at `localhost:4321/studio` before touching the site.

| Test | How | Pass |
|---|---|---|
| All required fields enforce on save | Leave each required field blank, attempt save | Studio blocks with clear error on the correct field |
| Slug auto-generates from title | Create a service, type title, click Generate | Slug populates: lowercase, hyphens only |
| Slug uniqueness | Create two services with same title | Studio warns slug is already taken |
| Icon dropdown shows only valid options | Open any `iconName` field | Dropdown shows only values from `iconsList.ts` — no free text |
| SEO character warnings fire | Enter 65 chars in any `seoTitle` | Warning: "Keep under 60 characters" |
| Image `alt` sub-field enforces | Upload image, attempt save without alt | Studio blocks: required |
| `order` field rejects decimals | Type `1.5` in any `order` field | Validation error: must be integer |
| Singleton cannot be duplicated | Inspect Home Page in structure | No "New document" button visible |
| Draft vs published indicator | Edit a field without publishing | Amber "Edited" indicator shown |

### 3.2 Content Entry Parity Test

Enter all existing content from `src/lib/content/` into Studio exactly as-is.
No rewrites — baseline only.

**Team Members** (8 from `team.ts`)
- [ ] All 8 created: name, role, bio, photo, order 1–8
- [ ] Photos uploaded — hotspot set to match old `imagePosition` value where applicable
- [ ] All published

**Testimonials** (1 from `testimonials.ts`)
- [ ] Quote, name, role, order=1
- [ ] Published

**FAQ Items** (5 from `faq.ts`)
- [ ] All 5 with correct order 1–5
- [ ] All published

**Services** (3 from `services.ts` + `servicepages.ts`)
- [ ] All 3 with all page fields, correct slug, navOrder, cardIconName
- [ ] Hero images uploaded from `src/res/`
- [ ] All published

**Home Page** (from `home.ts` + `hero_image.png` + `why_us.png`)
- [ ] All 8 field groups fully populated
- [ ] Both images uploaded with hotspot set
- [ ] Published

**About Page** (from `about.ts`)
- [ ] All 6 groups fully populated
- [ ] Founder photo uploaded
- [ ] Published

**Contact Page** (from `contact.ts`)
- [ ] Hero, trust points, office details entered
- [ ] Published

**Site Settings** (from `footer.ts`, `site.ts`, `nav.ts`)
- [ ] All fields populated
- [ ] Navigation: 4 items (Why MedZo, Testimonials, FAQ, About), `isVisible: true`
- [ ] Published

### 3.3 Visual Parity Test

**Method:** Run static site (`git stash` Phase 2 changes) in one tab, Sanity-driven in another.
Compare every page at **375px**, **768px**, **1280px**.

| Page | What to check |
|---|---|
| `/` | Hero text + image, ticker, how it works, services grid, why section (image + metrics + items), testimonials, final CTA |
| `/about` | Hero, founder (photo + bio), mission, values (5 items + correct icons), team carousel (8 members correct order), credentials, CTA |
| `/services/virtual-receptionist` | Hero, 6 feature cards (correct icons + text), CTA |
| `/services/managerial-support` | Hero, 6 feature cards, CTA |
| `/services/billing-support` | Hero, 5 feature cards, CTA |
| `/contact` | Hero + trust points, office address/phone/email |
| `/faq` | All 5 questions in correct order |
| Nav (all pages) | Services dropdown: 3 items with correct descriptions + icons. 4 top-level links visible |
| Footer (all pages) | Tagline, service links, company links, contact email, location, acknowledgement |

**Pass:** No visible difference between static and Sanity-driven output at any breakpoint.

### 3.4 Content Visibility & Ordering Tests

**Ordering:**

| Test | Action | Pass |
|---|---|---|
| FAQ reorder | Change FAQ item 1's `order` to 6, rebuild | Item moves to last position on `/faq` |
| Team reorder | Swap `order` values of members 1 and 2, rebuild | Carousel order changes correctly |
| Service nav order | Change billing support `navOrder` to 1, rebuild | Billing Support appears first in nav + home cards |

**Draft vs Published:**

| Test | Action | Pass |
|---|---|---|
| Draft not visible on site | Create a new FAQ item, save but do not publish, rebuild | Item does not appear on `/faq` |
| Published becomes visible | Publish the draft FAQ item, rebuild | Item appears in correct ordered position |
| Editing published document | Edit a published team member bio, save without publishing | Old bio still shows on site |
| Publish edit | Publish the team member edit | New bio appears on site after rebuild |

**Visibility toggle (nav):**

| Test | Action | Pass |
|---|---|---|
| Hide nav item | Set Testimonials `isVisible: false` in Site Settings, rebuild | Testimonials link disappears from nav |
| Restore nav item | Set `isVisible: true`, rebuild | Link reappears in correct position |
| Add new nav item | Add `{ label: "Blog", href: "/blog", isVisible: true }`, rebuild | "Blog" appears in nav (broken link — expected for now) |
| Remove nav item | Delete Blog item, rebuild | Blog disappears from nav |

**New service end-to-end:**

| Test | Action | Pass |
|---|---|---|
| New service in nav | Create + publish a 4th service with `navOrder: 4`, rebuild | Appears 4th in nav dropdown |
| New service on home | Same rebuild | Appears as 4th service card on home page |
| New service page | Navigate to `/services/[new-slug]` | Page renders with all content |

### 3.5 Image Rendering Tests

| Test | How | Pass |
|---|---|---|
| Team photos load | Visit `/about`, inspect all 8 team images | Load from `cdn.sanity.io`, no broken images |
| Hotspot respected | Set team member hotspot to top-left, rebuild | Focal point shifts in carousel |
| Service hero images load | Visit all 3 service pages | Hero images load correctly |
| Home hero image loads | Visit `/` | Hero image loads, LCP preload functions |
| Why section image loads | Scroll to Why MedZo section | Image loads from CDN |
| Alt text present | Inspect all images in DevTools | Every `<img>` has a non-empty `alt` attribute |
| Astro optimises CDN images | Check Network tab | Images served as WebP, correct sizes |
| No remotePatterns error | Run `astro build` | No "unrecognised remote image source" errors |

### 3.6 TypeGen & TypeScript Tests

| Test | How | Pass |
|---|---|---|
| TypeGen runs without error | `npx sanity typegen generate` | `sanity.types.ts` generated, no errors |
| No TypeScript errors | `npx tsc --noEmit` | Zero errors |
| Query return types inferred | Hover `sanityClient.fetch(QUERY)` in VS Code | Return type shown — not `any` |
| Required fields non-optional | `npx sanity schema extract --enforce-required-fields && npx sanity typegen generate` | Required fields are non-nullable in generated types |

### 3.7 Build & Deploy Tests

| Test | How | Pass |
|---|---|---|
| Dev server starts cleanly | `npm run dev` | No Sanity errors in terminal |
| Production build passes | `npm run build` | Zero errors, zero warnings |
| All static paths generated | Inspect build output | All 3 service pages present |
| New service path generated | Add 4th service, rebuild | New `/services/[slug]` in build output |
| Sitemap excludes Studio | Check `sitemap-*.xml` | No `/studio` URLs |
| No broken internal links | `npx astro check` | Zero broken-link warnings |

### 3.8 Null Safety & Edge Case Tests

| Scenario | Test | Expected behaviour |
|---|---|---|
| Testimonials collection empty | Unpublish all testimonials, rebuild | Section hides gracefully — no crash |
| Optional `seoTitle` blank | Leave `seoTitle` blank on About page | Falls back to `siteSettings.defaultMetaTitle` — no blank `<title>` |
| Service with empty features | Attempt to save service with no features | Studio blocks save (min 1 validation) |
| Team member with no photo | Attempt to save without photo | Studio blocks save (required) |
| Nav with 0 items | Remove all `navigation[]` items, rebuild | Nav renders without links — does not crash |
| Optional office phone blank | Leave phone blank, rebuild | Phone row does not render — no "undefined" text |
| `whyItems[]` empty | Remove all why items, rebuild | Section renders heading only — no crash |
| Unpublished singleton | Never publish `homePage`, rebuild | Build fails clearly — not a silent empty page |

### 3.9 Team Handover Readiness Test

Have someone unfamiliar with the CMS attempt each task **without guidance**.
If any task exceeds its time limit, add a `description` hint to the relevant Studio field.

| Task | Time limit |
|---|---|
| Add a new team member with photo | 3 min |
| Add a new testimonial | 1 min |
| Add a new FAQ question at position 3 | 2 min |
| Change the home page hero heading | 1 min |
| Update the office phone number | 1 min |
| Temporarily hide the Testimonials nav link | 1 min |
| Add a new nav link labelled "Blog" → `/blog` | 2 min |
| Change the footer acknowledgement text | 2 min |
| Update the appointments metric from 100,000 to 150,000 | 2 min |

**Pass:** All tasks completed within time limit, no developer assistance, no broken content after rebuild.

---

## Sign-off Criteria

All three must be true before handover:

| Criterion | How verified |
|---|---|
| **Zero visual regressions** | Static and Sanity-driven pages pixel-identical at 375px, 768px, 1280px |
| **Zero build errors** | `npm run build` and `npx tsc --noEmit` both exit clean |
| **Team can self-serve** | All 9 handover tasks completed without developer assistance |

---

## Future — Phase 4 (Blog & New Sections)

When the business is ready to add a blog or any new content section:

1. **Developer:** Create Astro routes (`/blog`, `/blog/[slug]`)
2. **Developer:** Add Sanity schemas (`blogPost`, `blogCategory`) to `sanity.config.ts`
3. **Developer:** Create query files in `src/lib/api/`
4. **Team:** Add "Blog" nav link in Studio → Site Settings → Navigation
5. **Team:** Write and publish all blog posts via Studio

The team handles steps 4 and 5 entirely on their own.
