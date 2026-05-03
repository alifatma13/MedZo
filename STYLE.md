# Style Guide: MedZo Medical Practice Management

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

## Navigation Typography

**Font:** Plus Jakarta Sans
**Rationale:** Sits in the sweet spot between clinical precision and modern approachability. Geometric letterforms give the nav a polished SaaS feel; strong weight contrast between logo text and nav links reads well at small sizes.

| Element | Weight | Size |
| :--- | :--- | :--- |
| Logo text ("MedZo") | 700 (Bold) | 1.25rem |
| Nav links | 400 (Regular) | 1rem |
| CTA button ("Book a consult") | 600 (Semi-Bold) | 0.875rem |

---

## Colour Tokens

| Token | Value | Usage |
| :--- | :--- | :--- |
| `--color-primary` | `#00327d` | Headings, buttons, logo text, nav links hover |
| `--color-accent` | `#00c1fd` | Icon backgrounds, CTA accent button, focus rings |
| `--color-bg-hero` | `#f8f9ff` | Hero section, testimonials section, nav background |
| `--color-bg-ticker` | `#eff4ff` | Specialty ticker band |
| `--color-bg-why` | `#dce9ff` | Why Choose Us section |
| `--color-text-heading` | `#0b1c30` | FAQ questions, dark body text |
| `--color-text-body` | `#434653` | Body copy, descriptions, testimonial quotes |
| `--color-border` | `#c3c6d5` | Card borders, FAQ dividers |

---

## Navigation Style

- **Background:** matches hero (`--color-bg-hero`) at rest — no visible seam between nav and hero.
- **Border:** none by default.
- **On scroll:** a soft shadow (`0 1px 12px rgba(0,0,0,0.08)`) fades in once the user scrolls past 10px, lifting the nav above page content.
- **Transition:** `box-shadow 0.25s ease`.
- **Position:** `sticky top: 0`, `z-index: 100`.
- **Logo:** 44px tall PNG icon + "MedZo" wordmark side by side, 0.5rem gap.

---

## Visual Guidelines

- **Avoid Serifs:** Fonts like Times or Georgia can feel dated in a modern medical context.
- **No Decorative Fonts:** These undermine trust and professional authority.
- **Family Consistency:** Inter for all body/heading content; Plus Jakarta Sans reserved for navigation only.
