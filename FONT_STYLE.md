# Font Style Guide: MedZo Medical Practice Management

## Primary Typography (Headings) — Trust & Authority

**Font:** Inter
**Rationale:** Clean, geometric, and highly readable. Designed for screen legibility at all sizes.

| Role | Weight | Size | Usage |
| :--- | :--- | :--- | :--- |
| **H1** | 700 (Bold) | 2.5–3.5rem | Main Page Titles / Hero Section |
| **H2** | 600 (Semi-Bold) | 1.75–2rem | Section Headers |
| **H3** | 600 (Semi-Bold) | 1.25–1.5rem | Subsection Headers / Cards |

---

## Secondary Typography (Body) — Readability

**Font:** Inter
**Rationale:** Optimized for long-form clinical text with a neutral, professional tone.

- **Weight:** 400 (Regular) for body, 500 (Medium) for emphasis.
- **Line Height:** 1.6–1.75 — ensures comfort during extended reading.
- **Size:** 1rem (16px) standard.

---

## Accents & UI Elements

**Font:** Inter

- **Labels/Badges:** Weight 600–700, uppercase + letter-spacing for data callouts.
- **CTA Buttons:** Weight 700, Size 0.95rem.
- **Small Labels:** Weight 500, Size 0.85rem.

---

## Why Inter for MedZo?

1. **Clinical Precision:** Excellent number rendering for data and statistics.
2. **Neutrality:** Professional aesthetic that doesn't compete with critical healthcare content.
3. **Accessibility:** High legibility makes it the standard for major health platforms like the NHS.

---

## Visual Guidelines

- **Avoid Serifs:** Fonts like Times or Georgia can feel dated in a modern medical context.
- **No Decorative Fonts:** These undermine trust and professional authority.
- **Family Consistency:** Stick to the Inter family to minimise visual noise.

---

## CSS Implementation

Import Inter from Google Fonts in your global stylesheet:

```css
/* src/styles/global.css */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

:root {
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;

  /* Size scale */
  --text-sm:   0.85rem;   /* Small labels     */
  --text-base: 1rem;      /* Body             */
  --text-cta:  0.95rem;   /* CTA buttons      */
  --text-h3:   1.25rem;   /* H3 lower bound   */
  --text-h3-lg:1.5rem;    /* H3 upper bound   */
  --text-h2:   1.75rem;   /* H2 lower bound   */
  --text-h2-lg:2rem;      /* H2 upper bound   */
  --text-h1:   2.5rem;    /* H1 lower bound   */
  --text-h1-lg:3.5rem;    /* H1 upper bound   */

  /* Line heights */
  --leading-body: 1.7;
  --leading-heading: 1.2;
}

body {
  font-family: var(--font-sans);
  font-size: var(--text-base);
  line-height: var(--leading-body);
  font-weight: 400;
}

h1 { font-size: clamp(var(--text-h1), 5vw, var(--text-h1-lg)); font-weight: 700; line-height: var(--leading-heading); }
h2 { font-size: clamp(var(--text-h2), 3vw, var(--text-h2-lg)); font-weight: 600; line-height: var(--leading-heading); }
h3 { font-size: clamp(var(--text-h3), 2vw, var(--text-h3-lg)); font-weight: 600; line-height: var(--leading-heading); }
```
