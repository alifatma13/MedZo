// nav.ts — developer-owned navigation strings.
// navLinks has been removed — top-level links now come from siteSettings.navigation[] in Sanity
// and services dropdown children come from the service collection in Sanity.
// Only structural identity strings and the Services parent label stay here.
// The Insights link visibility is controlled by "Show Insights (Blog)" in Sanity Site Settings.
import type { NavBrand } from "../../types/layout";
import { SITE_NAME } from "./site";

export const navBrand: NavBrand = {
  wordmark: SITE_NAME,
  tagline: "Care Streamlined",
  drawerTagline: "Care Streamlined",
  logoAlt: "MedZo logo",
  ariaOpenMenu: "Open menu",
  ariaCloseMenu: "Close menu",
  ariaDialog: "Navigation",
};

// "Services" parent item — label and anchor href stay hardcoded because they are
// structural UI (the dropdown trigger), not team-managed content.
export const navServicesItem = {
  label: "Services",
  href:  "/#services",
} as const;

export const navCta = { label: "Book a consult", href: "/contact" } as const;

// Insights nav link — rendered in Nav.astro only when BLOG_ENABLED is true
export const blogNavItem = { label: "Insights", href: "/insights" } as const;
