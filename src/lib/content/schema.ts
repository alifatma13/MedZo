// schema.ts — JSON-LD structured data injected into page <head> tags for entity recognition and AEO.
import { SITE_NAME, SITE_DOMAIN } from "./site";

export const siteSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: SITE_NAME,
  url: `https://${SITE_DOMAIN}`,
  description: "End-to-end medical practice management across Australia. Billing, compliance, scheduling, and operations for GPs, specialists, and allied health clinics.",
  logo: `https://${SITE_DOMAIN}/favicon.png`,
  image: `https://${SITE_DOMAIN}/og-image.webp`,
  telephone: "+61478811242",
  email: "info@medzo.com.au",
  address: {
    "@type": "PostalAddress",
    addressCountry: "AU",
  },
  areaServed: {
    "@type": "Country",
    name: "Australia",
  },
  serviceType: [
    "Medical Practice Management",
    "Healthcare Billing",
    "Medicare Compliance",
    "Allied Health Administration",
    "Telehealth Support",
  ],
  knowsAbout: [
    "General Practice",
    "Medical Specialists",
    "Allied Health",
    "Dental",
    "Physiotherapy",
    "Telehealth",
    "Multidisciplinary Clinics",
  ],
  // sameAs: add verified social/directory profile URLs here so AI can resolve MedZo
  // to its Knowledge Graph entity. Examples:
  //   "https://www.linkedin.com/company/medzo",
  //   "https://www.facebook.com/medzo",
  //   "https://g.co/kgs/<id>",   ← Google Business Profile URL
  sameAs: [],
};

// WebSite schema — emitted on every page so AI understands site structure and search capability.
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: `https://${SITE_DOMAIN}`,
  description: "End-to-end medical practice management for Australian clinics. Billing, compliance, scheduling, virtual reception, and recruitment.",
  inLanguage: "en-AU",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `https://${SITE_DOMAIN}/faq?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

// FAQPage schema — pass the fetched FAQ items to generate a machine-readable Q&A block.
export function buildFaqSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

// Service schema — one per service page so AI can identify individual offerings.
export function buildServiceSchema(
  title: string,
  description: string,
  serviceUrl: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: title,
    description,
    provider: {
      "@type": "MedicalBusiness",
      name: SITE_NAME,
      url: `https://${SITE_DOMAIN}`,
    },
    areaServed: {
      "@type": "Country",
      name: "Australia",
    },
    url: serviceUrl,
  };
}

// BreadcrumbList schema — tells AI (and Google) the page hierarchy.
export function buildBreadcrumbSchema(
  items: Array<{ name: string; url: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
