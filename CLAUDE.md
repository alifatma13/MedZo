# MedZo — Project Guidelines

## Maintainability — Core Principle

**All code written for this project must prioritise long-term maintainability.** Every decision — naming, structure, content placement, type coverage — should make the next developer's job easier, not harder.

Concretely, this means:

- Any visible word on the site can be changed by editing only `src/lib/content/` — no component rewrites required.
- Any component can be understood in isolation by reading a single file.
- Any TypeScript type mismatch is caught at build time, not at runtime.
- Any new page follows the same patterns as existing pages — no one-off approaches.

If a change requires touching more than two files to update a single piece of copy, the architecture is wrong — fix the structure, not the symptom.

See [No hardcoding — ever](#no-hardcoding--ever) for the specific rules on where content, SVGs, and images must live.

---

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

| Item                  | Convention          | Example             |
| --------------------- | ------------------- | ------------------- |
| Component files       | PascalCase          | `PricingCard.astro` |
| Utility files         | camelCase           | `formatDate.ts`     |
| CSS class names       | kebab-case          | `.hero-title`       |
| TypeScript interfaces | PascalCase prefixed | `Props`, `BlogPost` |
| Constants             | SCREAMING_SNAKE     | `MAX_ITEMS`         |

### When NOT to split

Do not modularise for its own sake. A component that is only ever used once and has no reuse path should stay where it is — premature extraction creates indirection without benefit. The test: if deleting the extracted file would force you to inline its content back, the split added no value.

---

## CMS-Readiness

**Every page created in this project must be CMS-ready by design — no exceptions.** Text content lives directly in the codebase for now. It will migrate to a headless CMS later. Write all content so that migration only requires swapping the data source — no component rewrites.

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

### No hardcoding — ever

Every piece of content in a component template must come from an external source. No exceptions:

| Content type                      | Where it lives           | How to use it                                                              |
| --------------------------------- | ------------------------ | -------------------------------------------------------------------------- |
| Text, labels, ARIA strings, links | `src/lib/content/*.ts`   | Export a typed object; import and pass as props                            |
| SVG icons                         | `src/lib/utils/icons.ts` | Add to the `icons` map; render with `<Fragment set:html={icons["key"]} />` |
| Raster images (PNG, JPG, WebP)    | `src/res/`               | Import the file; pass via a typed prop                                     |

**Violations to catch before committing:**

- A bare string inside a template tag: `<h2>Our Services</h2>` — move to a content file.
- An inline `<svg>` block in a component — move to `icons.ts`.
- A hardcoded `src="..."` on an `<img>` or `<Image />` — import from `src/res/` and pass as a prop.
- A hardcoded `href`, `aria-label`, or `alt` containing real copy — move to a content file.

The test: if you can change any visible word or icon on the page by editing only files in `src/lib/` and `src/res/`, the component is clean.

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

## Accessibility

Every page and component must meet **WCAG 2.1 AA** as a baseline. Accessibility is not optional — treat any violation as a bug.

### Semantic HTML

- Use the correct element for the job: `<button>` for actions, `<a>` for navigation, `<nav>`, `<main>`, `<header>`, `<footer>`, `<section>`, `<article>` for landmarks.
- Heading levels must be sequential (`h1` → `h2` → `h3`) — never skip a level for visual styling; use CSS instead.
- Every page must have exactly one `<h1>`.

### Keyboard & focus

- All interactive elements must be reachable and operable by keyboard alone (Tab, Shift+Tab, Enter, Space, arrow keys where applicable).
- Never remove the browser's default focus outline without replacing it with a visible `:focus-visible` style.
- Modals and drawers must trap focus while open and return focus to the trigger on close.
- Avoid `tabindex` values greater than `0`.

### Images & media

- Every `<Image />` (or `<img>`) must have a meaningful `alt` attribute. Decorative images use `alt=""`.
- Videos must have captions; audio must have a transcript.
- Do not use colour alone to convey meaning — pair it with an icon or label.

### Forms

- Every input must have an associated `<label>` (via `for`/`id` or `aria-label`).
- Error messages must be programmatically associated with the field (`aria-describedby`).
- Required fields must be marked both visually and with `aria-required="true"`.

### ARIA

- Prefer native HTML semantics over ARIA roles. Only add ARIA when native semantics are insufficient.
- Dynamic content that updates without a page reload must announce changes via `aria-live` regions where appropriate.
- Interactive custom components (dropdowns, accordions, tabs) must implement the correct ARIA pattern from the [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/).

### Colour & contrast

- Body text: minimum 4.5 : 1 contrast ratio against its background.
- Large text (≥ 18 pt / 14 pt bold) and UI components: minimum 3 : 1.
- Use a contrast checker before shipping any new colour combination.

### Testing checklist (run before every PR)

- [ ] Keyboard-navigate the full page — no traps, no unreachable elements.
- [ ] Run Axe or Lighthouse accessibility audit — zero critical or serious violations.
- [ ] Test with a screen reader (NVDA/VoiceOver) on at least the main user flow.
- [ ] Verify all images have appropriate `alt` text.
- [ ] Confirm colour contrast for any new palette additions.

---

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
  animate(
  	"h1",
  	{ opacity: [0, 1], y: [24, 0] },
  	{ duration: 0.6, easing: "ease-out" },
  );
  ```
- **Scroll-reveal** — sections below the fold must animate in as they enter the viewport using `inView`:
  ```ts
  inView(".card", ({ target }) => {
  	animate(
  		target,
  		{ opacity: [0, 1], y: [32, 0] },
  		{ duration: 0.5, easing: [0.22, 1, 0.36, 1] },
  	);
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
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  	/* animations */
  }
  ```
- Never block interactivity — animations run alongside, not before, content being usable.
- Do not animate layout properties (`width`, `height`, `top`, `left`); animate `transform` and `opacity` only for GPU-composited performance.

### ClientRouter compatibility — mandatory rule

This project uses Astro's `ClientRouter` for page transitions. **`<script>` blocks only execute once** across navigations — they do not re-run when the user navigates between pages. Any animation code that runs at the top level of a `<script>` block will break on the second visit.

**Every animation script must be wrapped in `astro:page-load`:**

```ts
document.addEventListener("astro:page-load", () => {
	if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
		// your animate / inView calls here
	}
});
```

`astro:page-load` fires on both the initial page load and after every View Transition — so animations always replay correctly.

**Additional rules for `requestAnimationFrame` loops** (e.g. canvas animations):

- Store the RAF id in a variable outside the listener.
- Cancel the previous loop at the start of each `astro:page-load` to prevent duplicate loops stacking up across navigations:

```ts
let rafId: number | null = null;

document.addEventListener("astro:page-load", () => {
	if (rafId !== null) {
		cancelAnimationFrame(rafId);
		rafId = null;
	}
	// start new loop, assign to rafId
	rafId = requestAnimationFrame(draw);
});
```

**Violation to catch:** any `animate(...)`, `inView(...)`, or `requestAnimationFrame(...)` call at the top level of a `<script>` block (outside `astro:page-load`) — it will not work after the first navigation.

### motion type errors

The `motion` package's TypeScript overloads do not cover all valid runtime arguments (e.g. CSS selector strings with comma-separated selectors, `clipPath`, `x`, `y` shorthands on `Element` references). When the correct runtime call produces a TS error, cast `animate` to `any` rather than using `@ts-ignore`:

```ts
// ✅ correct — suppresses overload error on the full call
(animate as any)(
	".selector",
	{ opacity: [0, 1], y: [24, 0] },
	{ duration: 0.5 },
);

// ❌ wrong — @ts-ignore only suppresses the line it's on; the error shifts to the next line
// @ts-ignore
animate(".selector", { opacity: [0, 1] }, { duration: 0.5 });
```
