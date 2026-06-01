# MedZo — Medical Practice Management

Marketing website for MedZo, built with Astro. Static site, CMS-driven via Sanity, all content separated from components.

## Project Structure

```text
src/
├── components/
│   ├── layout/          # Nav.astro, Footer.astro
│   ├── sections/        # Page-level blocks (HeroSection, ServicesSection, FAQSection, …)
│   └── ui/              # Primitives (Button, ServiceCard, TestimonialCard, FAQItem, WhyItem)
├── layouts/
│   └── Layout.astro     # Base page shell (head, nav, footer, JSON-LD)
├── lib/
│   ├── api/             # ← Sanity data fetchers (one file per content type)
│   │   ├── sanity.ts    # Shared Sanity client
│   │   ├── homePage.ts
│   │   ├── aboutPage.ts
│   │   ├── contactPage.ts
│   │   ├── services.ts
│   │   ├── team.ts
│   │   ├── testimonials.ts
│   │   ├── faq.ts
│   │   └── siteSettings.ts
│   ├── content/         # ← Static copy that does NOT come from Sanity
│   │   ├── nav.ts       # Navigation links
│   │   ├── footer.ts    # Footer links and legal text
│   │   ├── layout.ts    # Shared layout strings (meta defaults)
│   │   ├── site.ts      # Global site constants
│   │   ├── schema.ts    # JSON-LD structured data
│   │   ├── heroVisual.ts
│   │   ├── contact.ts
│   │   ├── privacy.ts
│   │   ├── terms.ts
│   │   ├── notFound.ts
│   │   └── ui.ts        # Shared UI labels (buttons, ARIA strings)
│   └── utils/
│       ├── icons.ts         # ← ALL SVG icons live here (keyed map)
│       └── sanityImage.ts   # Sanity image URL builder helper
├── pages/               # Route files — thin orchestrators only
│   ├── index.astro
│   ├── about.astro
│   ├── contact.astro
│   ├── faq.astro
│   ├── privacy.astro
│   ├── terms.astro
│   ├── 404.astro
│   └── services/
│       └── [service].astro  # Dynamic route — one page per service from Sanity
├── res/                 # ← Raster images (PNG, JPG, WebP)
│   └── logo.png
├── structure/
│   └── index.ts         # Sanity schema definitions (document types, fields)
├── styles/
│   ├── global.css       # Reset, tokens, typography
│   ├── fonts-inter.css
│   ├── fonts-jakarta.css
│   └── fonts-podkova.css
└── types/               # TypeScript interfaces for every content shape
    ├── content.ts
    ├── layout.ts
    ├── pages.ts
    ├── sanity.ts
    └── services.ts
```

**Where things live:**

| Asset type                        | Location                  | How to use                                     |
| :-------------------------------- | :------------------------ | :--------------------------------------------- |
| CMS-managed content               | Sanity Studio             | Fetched at build time via `src/lib/api/`       |
| Static copy (nav, footer, legal)  | `src/lib/content/*.ts`    | Import and pass as props                       |
| SVG icons                         | `src/lib/utils/icons.ts`  | `icons["key"]` → `<Fragment set:html={...} />` |
| Raster images                     | `src/res/`                | Import the file; pass via typed prop           |
| TypeScript interfaces             | `src/types/`              | One file per content shape                     |
| Sanity schemas                    | `src/structure/index.ts`  | Consumed by `sanity.config.ts`                 |

**Root config files:**

| File                | Purpose                                    |
| :------------------ | :----------------------------------------- |
| `astro.config.mjs`  | Astro config — Sanity + sitemap integrations |
| `sanity.config.ts`  | Sanity Studio config (schema, plugins)     |
| `sanity.cli.ts`     | Sanity CLI config (project ID, dataset)    |
| `sanity.types.ts`   | Auto-generated TypeScript types from Sanity schema |
| `schema.json`       | Exported Sanity schema snapshot            |

## Dependencies

| Package                                  | Purpose                                     |
| :--------------------------------------- | :------------------------------------------ |
| `astro` ^6.2.1                           | Static site framework                       |
| `@sanity/astro` ^3.4.0                   | Astro integration for Sanity                |
| `@sanity/client` ^7.22.0                 | Sanity API client                           |
| `sanity` ^5.27.0                         | Sanity Studio + schema toolkit              |
| `motion` ^12.38.0                        | Animations (scroll-reveal, entrance, hover) |
| `@astrojs/sitemap` ^3.7.2                | Auto-generated sitemap                      |
| `@astrojs/react` ^5.0.5                  | React support (used by Sanity Studio)       |
| `react` ^19.2.6                          | React runtime                               |
| `@fontsource-variable/inter`             | Inter variable font                         |
| `@fontsource-variable/plus-jakarta-sans` | Plus Jakarta Sans variable font             |
| `@fontsource/podkova`                    | Podkova serif font                          |
| `@astrojs/check`                         | Astro TypeScript checker (dev)              |
| `typescript` ^5.9.3                      | Type checking (dev)                         |

Requires **Node ≥ 22.12.0**.

## Environment Variables

Create a `.env` file at the project root:

```env
PUBLIC_SANITY_PROJECT_ID=your_project_id
PUBLIC_SANITY_DATASET=production
```

These are required at build time. Without them, Sanity queries will fail.

## Commands

All commands are run from the root of the project:

| Command           | Action                                                  |
| :---------------- | :------------------------------------------------------ |
| `npm install`     | Install dependencies                                    |
| `npm run dev`     | Start local dev server at `localhost:4321`              |
| `npm run build`   | Build production site to `./dist/`                      |
| `npm run preview` | Preview production build locally                        |
| `npx astro check` | Type-check all `.astro` files — run before every commit |

## Content Management

All page content is managed via **Sanity Studio**, hosted at [medzo.sanity.studio](https://medzo.sanity.studio). The site fetches content at build time — a new Netlify deploy is required to publish changes.

**What lives in Sanity:**
- Home page sections (hero, services, metrics, testimonials, FAQ, how it works)
- About page (team, CEO, founder, mission, values, credentials, offices)
- Contact page
- Individual service pages (dynamic route `/services/[slug]`)
- Site settings (global metadata, social links)

**What stays in code (`src/lib/content/`):**
- Navigation links
- Footer links and legal text
- Privacy policy and terms of service
- 404 page copy
- JSON-LD structured data
- Shared UI labels and ARIA strings

## Deployment

Hosted on **Netlify**. Deploys automatically when changes are pushed to the `main` branch.

**A redeploy is required whenever you change:**

- Any file in `src/` (components, content, pages, styles, types)
- `public/` (favicon, OG image, robots.txt)
- `astro.config.mjs`, `package.json`, `tsconfig.json`
- Content in Sanity Studio (requires manual redeploy — see below)

**A redeploy is NOT required for:**

- Changes to `README.md`, `CLAUDE.md`, or other documentation-only files
- Changes to `.gitignore`

To trigger a manual redeploy without a code change: go to the Netlify dashboard → **Deploys** → **Trigger deploy**.

## Common Tasks

### Update content

Most content is managed in Sanity Studio — log in, edit, then trigger a Netlify redeploy to publish.

For static copy that lives in code (nav, footer, legal pages):

1. Find the relevant file in `src/lib/content/` (e.g. `footer.ts`)
2. Edit the field value
3. Run `npm run dev` and verify the change
4. Run `npx astro check` — must pass with no errors
5. Commit and push to `main`

### Add a new page

1. Create `src/pages/your-page.astro`
2. If the page pulls from Sanity, create `src/lib/api/yourPage.ts` with the GROQ query and fetcher
3. If the page has static copy, create `src/lib/content/yourPage.ts` with a typed content object
4. Add matching TypeScript interfaces to the appropriate file in `src/types/`
5. Add the page link to `src/lib/content/nav.ts` and/or `src/lib/content/footer.ts` if it should appear in navigation
6. Run `npx astro check` before committing

### Add a new Sanity document type

1. Define the schema in `src/structure/index.ts`
2. Run `npx sanity schema deploy` or `npx sanity deploy` to push the schema to Sanity
3. Add a fetcher in `src/lib/api/` using the new document type
4. Regenerate TypeScript types: `npx sanity typegen generate` → updates `sanity.types.ts`

### Add a new SVG icon

1. Open `src/lib/utils/icons.ts`
2. Add a new entry to the `icons` map with a kebab-case key
3. Paste the SVG string with `stroke`, `fill`, `width`, and `height` as **inline attributes** on the `<svg>` element — scoped styles do not apply to `set:html`-injected markup
4. Reference it in a component: `<Fragment set:html={icons["your-key"]} />`

### Replace an image

1. Add the new file to `src/res/`
2. Update the `import` in the component or content file that references the old image
3. Delete the old file from `src/res/` if it is no longer used

## Troubleshooting

| Symptom                                            | Cause                                                                 | Fix                                                                                              |
| :------------------------------------------------- | :-------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------- |
| Sanity queries return `null` or empty arrays       | Missing or incorrect env vars                                         | Check `.env` has `PUBLIC_SANITY_PROJECT_ID` and `PUBLIC_SANITY_DATASET` set correctly            |
| Site shows stale content after Sanity edit         | Netlify serves the previous build                                     | Trigger a manual redeploy from the Netlify dashboard                                             |
| Font import TypeScript errors in `Layout.astro`    | `@fontsource` packages lack type declarations                         | Pre-existing, safe to ignore — does not affect the build                                         |
| SVG icon renders but is invisible                  | Stroke/fill set via scoped CSS which doesn't reach `set:html` content | Add `stroke="currentColor"` (or explicit colour) directly on the `<svg>` element in `icons.ts`  |
| `astro check` fails after adding a content field   | New field not added to the matching interface in `src/types/`         | Add the field to the interface, then re-run `astro check`                                        |
| Netlify deploy succeeds but site shows old content | Browser cache                                                         | Hard-refresh (`Ctrl+Shift+R`) or check Netlify deploy log to confirm the latest commit was built |
| `sanity.types.ts` is out of date                   | Schema changed without regenerating types                             | Run `npx sanity typegen generate`                                                                |
