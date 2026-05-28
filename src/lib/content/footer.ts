// footer.ts — developer-owned footer strings (structural/legal content).
// Fields now managed in Sanity (team-owned):
//   tagline          → siteSettings.footerTagline
//   contact.email    → siteSettings.contactEmail
//   contact.location → siteSettings.contactLocation
//   acknowledgement  → siteSettings.acknowledgementText
//   services         → service collection (auto-populates from Sanity)
// These are kept below as fallback values during local development before Studio content is entered.
import type { FooterContent } from "../../types/FooterContent";
import { SITE_NAME } from "./site";

export const footerContent: FooterContent = {
  columnHeadings: {
    services: "Services",
    company: "Company",
    contact: "Contact",
  },
  // ── Fallback values — replaced by Sanity at runtime ─────────────────
  tagline:
    "End-to-end medical practice management across Australia. Operational excellence so you can focus on care.",
  services: [
    { label: "Virtual Medical Receptionist", href: "/services/virtual-receptionist" },
    { label: "Managerial Support",           href: "/services/managerial-support"   },
    { label: "Billing Support",              href: "/services/billing-support"      },
  ],
  contact: {
    email:    "hello@medzo.com.au",
    location: "Australia-wide",
  },
  acknowledgement:
    "We acknowledge the Traditional Owners and Custodians of Country throughout Australia. We recognise their continuing connection to land, waters and community and acknowledge their ongoing contribution to the health system and community. We pay our respects to Elders past, present and emerging.",
  // ── Always in code — structural/legal ────────────────────────────────
  company: [
    { label: "Why MedZo",      href: "/#why-medzo"    },
    { label: "Testimonials",   href: "/#testimonials" },
    { label: "FAQ",            href: "/faq"           },
    { label: "Book a Consult", href: "/contact"       },
  ],
  copyright: "MedZo. All rights reserved.",
  legalLinks: [
    { label: "Privacy Policy",    href: "/privacy" },
    { label: "Terms of Service",  href: "/terms"   },
  ],
  logoAlt:  "MedZo logo",
  wordmark: SITE_NAME,
};
