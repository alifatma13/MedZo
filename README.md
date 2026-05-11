# MedZo — Medical Practice Management

Marketing website for MedZo, built with Astro. Static site, fully CMS-ready, all content separated from components.

## Project Structure

```text
src/
├── components/
│   ├── layout/          # Nav.astro, Footer.astro
│   ├── sections/        # Page-level blocks (HeroSection, ServicesSection, …)
│   └── ui/              # Primitives (Button, Card, FAQItem, …)
├── layouts/
│   └── Layout.astro     # Base page shell (head, nav, footer, JSON-LD)
├── lib/
│   ├── content/         # ← ALL site copy lives here (one file per section/page)
│   │   ├── hero.ts
│   │   ├── services.ts
│   │   ├── testimonials.ts
│   │   ├── faq.ts
│   │   ├── metrics.ts
│   │   ├── whyChooseUs.ts
│   │   ├── ticker.ts
│   │   ├── finalCta.ts
│   │   ├── nav.ts
│   │   ├── footer.ts
│   │   ├── privacy.ts
│   │   ├── terms.ts
│   │   ├── notFound.ts
│   │   ├── layout.ts
│   │   ├── schema.ts    # JSON-LD structured data
│   │   └── index.ts     # Barrel export
│   └── utils/
│       └── icons.ts     # ← ALL SVG icons live here (keyed map)
├── pages/               # Route files — thin orchestrators only
│   ├── index.astro
│   ├── privacy.astro
│   ├── terms.astro
│   └── 404.astro
├── res/                 # ← ALL raster images live here (PNG, JPG, WebP)
│   ├── hero_image.png
│   ├── logo.png
│   ├── logo_white_bg.png
│   └── why_us.png
├── styles/
│   └── global.css       # Reset, tokens, typography only
└── types/               # TypeScript interfaces for every content shape
```

**Where things live:**

| Asset type                        | Location                 | How to use                                     |
| :-------------------------------- | :----------------------- | :--------------------------------------------- |
| Text, labels, ARIA strings, links | `src/lib/content/*.ts`   | Import and pass as props                       |
| SVG icons                         | `src/lib/utils/icons.ts` | `icons["key"]` → `<Fragment set:html={...} />` |
| Raster images                     | `src/res/`               | Import the file; pass via typed prop           |
| TypeScript interfaces             | `src/types/`             | One file per content shape                     |

## Dependencies

| Package                                  | Purpose                                     |
| :--------------------------------------- | :------------------------------------------ |
| `astro` ^6.2.1                           | Static site framework                       |
| `motion` ^12.38.0                        | Animations (scroll-reveal, entrance, hover) |
| `@fontsource-variable/inter`             | Inter variable font                         |
| `@fontsource-variable/plus-jakarta-sans` | Plus Jakarta Sans variable font             |
| `@fontsource/podkova`                    | Podkova serif font                          |
| `@astrojs/check`                         | Astro TypeScript checker (dev)              |
| `typescript` ^5.9.3                      | Type checking (dev)                         |

Requires **Node ≥ 22.12.0**.

## Commands

All commands are run from the root of the project:

| Command           | Action                                                  |
| :---------------- | :------------------------------------------------------ |
| `npm install`     | Install dependencies                                    |
| `npm run dev`     | Start local dev server at `localhost:4321`              |
| `npm run build`   | Build production site to `./dist/`                      |
| `npm run preview` | Preview production build locally                        |
| `npx astro check` | Type-check all `.astro` files — run before every commit |

## Deployment

Hosted on **Netlify**. Deploys automatically when changes are pushed to the `main` branch.

**A redeploy is required whenever you change:**

- Any file in `src/` (components, content, pages, styles, types)
- Any file in `src/res/` (images)
- `public/` (favicon, OG image, robots.txt)
- `astro.config.mjs`, `package.json`, `tsconfig.json`

**A redeploy is NOT required for:**

- Changes to `README.md`, `CLAUDE.md`, or other documentation-only files
- Changes to `.gitignore`

To trigger a manual redeploy without a code change: go to the Netlify dashboard → **Deploys** → **Trigger deploy**.

## Common Tasks

### Update existing copy

1. Find the relevant file in `src/lib/content/` (e.g. `hero.ts` for the hero section)
2. Edit the field value — field names map directly to what appears on screen
3. Run `npm run dev` and verify the change in the browser
4. Run `npx astro check` — must pass with no errors
5. Commit and push to `main` — Netlify deploys automatically

### Add a new page

1. Create `src/pages/your-page.astro`
2. Create `src/lib/content/yourPage.ts` with all copy as a typed object
3. Create `src/types/YourPageContent.ts` with the matching interface
4. Add the page link to `src/lib/content/nav.ts` and/or `src/lib/content/footer.ts` if it should appear in navigation
5. Run `npx astro check` before committing

### Add a new SVG icon

1. Open `src/lib/utils/icons.ts`
2. Add a new entry to the `icons` map with a kebab-case key
3. Paste the SVG string with `stroke`, `fill`, `width`, and `height` as **inline attributes** on the `<svg>` element — do not rely on CSS classes, as Astro's scoped styles do not apply to `set:html`-injected markup
4. Reference it in a component with `<Fragment set:html={icons["your-key"]} />`

### Replace an image

1. Add the new file to `src/res/`
2. Update the `import` in the component or content file that references the old image
3. Delete the old file from `src/res/` if it is no longer used

## Troubleshooting

| Symptom                                            | Cause                                                                 | Fix                                                                                              |
| :------------------------------------------------- | :-------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------- |
| Font import TypeScript errors in `Layout.astro`    | `@fontsource` packages lack type declarations                         | Pre-existing, safe to ignore — does not affect the build                                         |
| SVG icon renders but is invisible                  | Stroke/fill set via scoped CSS which doesn't reach `set:html` content | Add `stroke="currentColor"` (or explicit colour) directly on the `<svg>` element in `icons.ts`   |
| `astro check` fails after adding a content field   | New field not added to the matching interface in `src/types/`         | Add the field to the interface, then re-run `astro check`                                        |
| Netlify deploy succeeds but site shows old content | Browser cache                                                         | Hard-refresh (`Ctrl+Shift+R`) or check Netlify deploy log to confirm the latest commit was built |
