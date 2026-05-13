// footer.ts — all text content for the site footer: tagline, link columns, contact info, and legal copy.
import type { FooterContent } from "../../types/FooterContent";
import { services } from "./services";
import { SITE_NAME } from "./site";

export const footerContent: FooterContent = {
  tagline:
    "End-to-end medical practice management across Australia. Operational excellence so you can focus on care.",
  services: services.map((s) => s.title),
  company: [
    { label: "Why MedZo", href: "#why-medzo" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "FAQ", href: "#faq" },
    { label: "Book a Consult", href: "/contact" },
  ],
  contact: {
    email: "hello@medzo.com.au",
    location: "Australia-wide",
  },
  acknowledgement:
    "We acknowledge the Traditional Owners and Custodians of Country throughout Australia. We recognise their continuing connection to land, waters and community and acknowledge their ongoing contribution to the health system and community. We pay our respects to Elders past, present and emerging.",
  copyright: "MedZo. All rights reserved.",
  legalLinks: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
  logoAlt: "MedZo logo",
  wordmark: SITE_NAME,
};
