// schema.ts — JSON-LD structured data (MedicalBusiness) injected into every page's <head>.
import { SITE_NAME, SITE_DOMAIN } from "./site";

export const siteSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: SITE_NAME,
  url: `https://${SITE_DOMAIN}`,
  description: "End-to-end medical practice management across Australia. Billing, compliance, scheduling, and operations for GPs, specialists, and allied health clinics.",
  logo: `https://${SITE_DOMAIN}/favicon.png`,
  image: `https://${SITE_DOMAIN}/og-image.png`,
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
  sameAs: [],
};
