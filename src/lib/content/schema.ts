// schema.ts — JSON-LD structured data object (MedicalBusiness) injected into every page's <head>.
import { SITE_NAME } from "./site";

export const siteSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: SITE_NAME,
  description: "End-to-end medical practice management across Australia.",
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
};
