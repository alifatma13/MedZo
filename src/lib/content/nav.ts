// nav.ts — developer-owned navigation strings.
// navLinks has been removed — top-level links now come from siteSettings.navigation[] in Sanity
// and services dropdown children come from the service collection in Sanity.
// Only structural identity strings and the Services parent label stay here.
import type { NavBrand } from "../../types/NavLink";
import { SITE_NAME } from "./site";

export const navBrand: NavBrand = {
  wordmark: SITE_NAME,
  tagline: "Care Streamlined",
  drawerTagline: "Care Streamlined.",
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
