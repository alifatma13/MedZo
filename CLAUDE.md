# MedZo — Project Guidelines

## Astro Best Practices

- Use `.astro` components for all pages and layouts; prefer Astro's built-in features over client-side JS where possible.
- Keep components small and single-purpose. Place reusable UI pieces in `src/components/`.
- Use `src/layouts/` for shared page shells (head, nav, footer).
- Prefer static rendering (`output: 'static'`) unless a route genuinely requires SSR.
- Use Astro's `<Image />` component (`astro:assets`) for all images — never raw `<img>` tags — to get automatic optimization.
- Co-locate styles with components using scoped `<style>` blocks. Use `src/styles/` only for global/reset/typography CSS.
- Type all component props with TypeScript interfaces in the frontmatter.
- Use `import.meta.env` for environment variables; never hard-code secrets.

## Modularization

Every piece of code must be broken into the smallest meaningful unit that a developer can read, understand, and change in isolation. The goal is that any contributor can open a single file and immediately grasp its full responsibility — nothing more.

### Directory structure

```
src/
  components/       # One component per file; named after what it renders
    ui/             # Primitives: Button, Card, Badge, Input — no business logic
    layout/         # Structural wrappers: Section, Container, Grid
    sections/       # Page-level blocks: HeroSection, PricingTable, TestimonialSlider
  layouts/          # Page shells only: BaseLayout, MarketingLayout
  pages/            # Route files — thin orchestrators; no logic beyond composing sections
  lib/              # Pure utility functions and helpers, no Astro/UI imports
    utils/          # Generic helpers (formatDate, slugify, clamp…)
    api/            # Data-fetching abstractions
  styles/           # Global CSS only: reset, tokens, typography
  types/            # Shared TypeScript interfaces and type aliases
  content/          # Astro content collections — one folder per collection
```

### Component rules

- **One responsibility per file.** A component does one thing: it renders a specific piece of UI. If you find yourself writing "and also…" in a component's description, split it.
- **Max ~80 lines per `.astro` file** (frontmatter + template + style combined). If you exceed this, extract a sub-component.
- **Props interface at the top of every component frontmatter:**
  ```ts
  interface Props {
    title: string;
    description?: string;
  }
  const { title, description } = Astro.props;
  ```
- **No business logic in pages.** Pages only import and compose section components; data fetching belongs in `src/lib/api/`.
- **No cross-layer imports.** `ui/` components must not import from `sections/`; `sections/` must not import from `pages/`.

### Logic & utility rules

- Extract any function used in more than one place into `src/lib/utils/`.
- Each utility file covers one domain (e.g. `date.ts`, `string.ts`, `url.ts`) — do not create a catch-all `helpers.ts`.
- Utility functions must be pure: no side effects, no DOM access, no global state.
- Name files after what they export: `formatDate.ts` exports `formatDate`, `useScrollLock.ts` exports `useScrollLock`.

### Naming conventions

| Item | Convention | Example |
|---|---|---|
| Component files | PascalCase | `PricingCard.astro` |
| Utility files | camelCase | `formatDate.ts` |
| CSS class names | kebab-case | `.hero-title` |
| TypeScript interfaces | PascalCase prefixed | `Props`, `BlogPost` |
| Constants | SCREAMING_SNAKE | `MAX_ITEMS` |

### When NOT to split

Do not modularise for its own sake. A component that is only ever used once and has no reuse path should stay where it is — premature extraction creates indirection without benefit. The test: if deleting the extracted file would force you to inline its content back, the split added no value.

---

## CMS-Readiness

Text content lives directly in the codebase for now. It will migrate to a headless CMS later. Write all content so that migration only requires swapping the data source — no component rewrites.

### How to write content today

Keep all page text out of component templates. Instead, define it as a typed object at the top of the page or section file, then pass it down as props. This makes each piece of content a named field that maps 1-to-1 to a future CMS field.

```ts
// src/pages/index.astro  — frontmatter
const hero = {
  heading: "Your heading here",
  subheading: "Supporting copy goes here.",
  ctaLabel: "Get started",
  ctaHref: "/signup",
};
```

```astro
<!-- template -->
<HeroSection {...hero} />
```

When the CMS is connected, replace the `const hero = { … }` block with a fetcher call — the component stays identical.

### Content object rules

- Every page defines its own content object(s) at the top of the frontmatter — not scattered through the template.
- Field names must be descriptive and stable: `heading`, `subheading`, `body`, `ctaLabel`, `ctaHref`, `imageUrl`. These become the CMS field slugs — do not rename them later without updating both sides.
- All content objects must have a matching TypeScript interface in `src/types/`.

```ts
// src/types/HeroContent.ts
export interface HeroContent {
  heading: string;
  subheading: string;
  ctaLabel: string;
  ctaHref: string;
  imageUrl?: string;
}
```

### Data-access layer (prepare now, use later)

- Create `src/lib/content/` now as an empty folder with a placeholder `index.ts`. When CMS migration begins, fetchers go here — one file per content type (`hero.ts`, `pricing.ts`, `testimonials.ts`).
- When a page has more than one content object or content used on multiple pages, move it to a file in `src/lib/content/` immediately rather than duplicating it.

### Rules

- Never embed copy as bare text nodes directly in a template (`<h1>Hello world</h1>`). Always reference a variable (`<h1>{hero.heading}</h1>`).
- Images must be referenced as URL strings in the content object — not as `import` statements — so a CMS CDN URL can replace them with no component change.
- Do not use array indices to reference content items. Use named keys so CMS field mapping is unambiguous.

---

## Navigation & Link Integrity

- Every internal link must use a root-relative path (e.g. `/about`, not `../about`).
- After adding or removing pages, verify no dead links remain.
- Run `astro check` and treat broken-link warnings as errors — do not ship with any reported.
- If a linked page does not exist, create it or update the link before committing.
- Add a custom `src/pages/404.astro` page so broken URLs surface clearly during development and in production.

## UI Standards

- Design language: clean, modern, bright. Use generous whitespace, clear visual hierarchy, and a light colour palette with one vivid accent colour.
- Typography: use a system font stack or a single imported web font. Sizes must follow a defined scale (e.g. 1rem / 1.25rem / 1.5rem / 2rem / 3rem).
- Colour contrast must meet WCAG AA (4.5 : 1 for body text, 3 : 1 for large text).
- All interactive elements (buttons, links) must have visible `:focus-visible` styles.
- Layout must be fully responsive — test at 375 px, 768 px, and 1280 px breakpoints.
- No inline styles. All styling goes in scoped `<style>` blocks or global CSS files.
- Avoid heavy visual noise: no excessive shadows, gradients, or animations unless they serve a clear UX purpose.

## Animations

Use the `motion` package (`npm install motion`) — the framework-agnostic build of Framer Motion — for all animations. Do not use raw CSS `@keyframes` for anything beyond the simplest transitions; `motion` gives spring physics, sequencing, and scroll-driven animations that feel alive rather than mechanical.

### Setup

```ts
import { animate, scroll, inView, stagger } from "motion";
```

Import inside a `<script>` block in `.astro` files (Astro handles bundling automatically).

### Required patterns

- **Entrance animations** — every above-the-fold section must fade + slide in on load:
  ```ts
  animate("h1", { opacity: [0, 1], y: [24, 0] }, { duration: 0.6, easing: "ease-out" });
  ```
- **Scroll-reveal** — sections below the fold must animate in as they enter the viewport using `inView`:
  ```ts
  inView(".card", ({ target }) => {
    animate(target, { opacity: [0, 1], y: [32, 0] }, { duration: 0.5, easing: [0.22, 1, 0.36, 1] });
  });
  ```
- **Staggered lists** — any list of cards or items must stagger their entrance:
  ```ts
  animate(".card", { opacity: [0, 1], y: [20, 0] }, { delay: stagger(0.08) });
  ```
- **Button / interactive hover** — buttons must have a subtle scale response:
  ```ts
  animate(btn, { scale: 1.04 }, { duration: 0.15 });
  ```
- **Page transitions** — wrap `<slot />` in the layout with a fade-in so every route change feels smooth:
  ```ts
  animate("main", { opacity: [0, 1] }, { duration: 0.35 });
  ```

### Rules

- Prefer spring or custom cubic-bezier easings (`[0.22, 1, 0.36, 1]`) over linear — they feel natural.
- Keep durations short: entrance 0.4 – 0.7 s, micro-interactions 0.1 – 0.2 s.
- Always respect `prefers-reduced-motion`: wrap all `animate` calls with:
  ```ts
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) { /* animations */ }
  ```
- Never block interactivity — animations run alongside, not before, content being usable.
- Do not animate layout properties (`width`, `height`, `top`, `left`); animate `transform` and `opacity` only for GPU-composited performance.
