// footer.ts — developer-owned footer strings only.
// CMS-managed fields (tagline, contact email/location, acknowledgement, services)
// are fetched exclusively from Sanity — edit them in Sanity Studio.
import type { FooterContent } from "../../types/FooterContent";
import { SITE_NAME } from "./site";

export const footerContent: FooterContent = {
  columnHeadings: {
    services: "Services",
    company: "Company",
    contact: "Contact",
  },
  company: [
    { label: "Why MedZo",      href: "/#why-medzo" },
    { label: "FAQ",            href: "/faq"         },
    { label: "Book a Consult", href: "/contact"     },
  ],
  copyright: "MedZo. All rights reserved.",
  legalLinks: [
    { label: "Privacy Policy",   href: "/privacy" },
    { label: "Terms of Service", href: "/terms"   },
  ],
  logoAlt:  "MedZo logo",
  wordmark: SITE_NAME,
};
