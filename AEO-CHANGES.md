# AEO Implementation Changes

Answer Engine Optimization (AEO) changes made to help MedZo appear when users query AI assistants (Google AI Overviews, ChatGPT, Perplexity, Claude, etc.) about medical practice management in Australia.

---

## 1. WebSite Schema — every page

**File:** `src/lib/content/schema.ts` + `src/layouts/Layout.astro`

Added a `WebSite` JSON-LD block emitted on every page alongside the existing `MedicalBusiness` schema. Includes a `SearchAction` potentialAction so AI systems understand the site has a searchable FAQ.

```json
{
  "@type": "WebSite",
  "name": "MedZo",
  "url": "https://medzo.com.au",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://medzo.com.au/faq?q={search_term_string}"
  }
}
```

**Why it matters:** AI Mode reads `WebSite` schema to understand site structure and purpose during source selection.

---

## 2. FAQPage Schema — /faq page

**File:** `src/pages/faq.astro`

Dynamically generates a `FAQPage` JSON-LD block from the FAQ items fetched from Sanity. Injected into `<head>` via the layout's head slot.

```json
{
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "...",
      "acceptedAnswer": { "@type": "Answer", "text": "..." }
    }
  ]
}
```

**Why it matters:** Even though FAQ rich results were removed from Google SERPs in May 2026, AI systems (Google AI Overviews, ChatGPT, Perplexity) still read `FAQPage` markup to extract Q&A pairs for direct citation. Having structured FAQs is one of the highest-value AEO signals.

---

## 3. Service Schema — every service page

**File:** `src/pages/services/[service].astro`

Each service page now emits a `Service` JSON-LD block generated from Sanity page data. Uses `seoDescription` with fallback to `heroIntro` as the description.

```json
{
  "@type": "Service",
  "name": "Medical Billing",
  "description": "...",
  "provider": { "@type": "MedicalBusiness", "name": "MedZo" },
  "areaServed": { "@type": "Country", "name": "Australia" },
  "url": "https://medzo.com.au/services/medical-billing"
}
```

**Why it matters:** Tells AI exactly what each service covers, who provides it, and where — enabling precise citation when users ask about specific healthcare services.

---

## 4. BreadcrumbList Schema — every service page

**File:** `src/pages/services/[service].astro`

Each service page also emits a `BreadcrumbList` JSON-LD block (Home → Service Name).

```json
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://medzo.com.au" },
    { "@type": "ListItem", "position": 2, "name": "Medical Billing", "item": "https://medzo.com.au/services/medical-billing" }
  ]
}
```

**Why it matters:** Establishes page hierarchy so AI understands service pages are children of the main site, reinforcing entity relationships.

---

## 5. llms.txt — AI crawler index

**File:** `public/llms.txt`  
**URL:** `https://medzo.com.au/llms.txt`

A plain-text file describing MedZo, its services, target audience, and key page URLs. AI crawlers (Perplexity, Claude, Bing Copilot) read this file — similar to how `robots.txt` guides web crawlers — to understand the site before indexing.

**Why it matters:** Google officially says `llms.txt` is optional, but Perplexity and other non-Google AI engines actively use it. Low-effort, high-upside.

---

## 6. Schema helper functions

**File:** `src/lib/content/schema.ts`

Three new exported functions centralise structured-data generation:

| Function | Output type | Used by |
|---|---|---|
| `buildFaqSchema(faqs)` | `FAQPage` | `faq.astro` |
| `buildServiceSchema(title, desc, url)` | `Service` | `[service].astro` |
| `buildBreadcrumbSchema(items)` | `BreadcrumbList` | `[service].astro` |

---

## What still needs manual action

### Fill `sameAs` in `src/lib/content/schema.ts`

The `sameAs` array on the `MedicalBusiness` schema is currently empty. This is the **most impactful remaining AEO signal** — it links MedZo's entity to its Knowledge Graph record so AI can confidently attribute answers to the right business.

Add the verified URLs for each profile:

```ts
sameAs: [
  "https://www.linkedin.com/company/medzo",   // verify exact URL in LinkedIn admin
  "https://www.facebook.com/medzo",            // verify exact URL in Facebook page settings
  // "https://g.co/kgs/<id>",                 // Google Business Profile share URL
  // "https://www.instagram.com/medzo",
],
```

Steps:
1. Log in to each platform and copy the public profile URL.
2. Paste the verified URL into the `sameAs` array.
3. Submit the updated sitemap in Google Search Console.

---

## Verification tools

| Tool | What to check |
|---|---|
| [Google Rich Results Test](https://search.google.com/test/rich-results) | Validates all JSON-LD on any page |
| [Schema Markup Validator](https://validator.schema.org) | Deep schema validation |
| [Google Search Console](https://search.google.com/search-console) | Structured data coverage report after deploy |

---

*Changes implemented: 2026-06-01*
