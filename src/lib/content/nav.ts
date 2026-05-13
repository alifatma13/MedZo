// nav.ts — navigation links, CTA button copy, and brand/aria strings used by Nav.astro.
import type { NavLink, NavBrand } from "../../types/NavLink";
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

export const navLinks: NavLink[] = [
  { label: "Services", href: "/#services" },
  { label: "Why MedZo", href: "/#why-medzo" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "FAQ", href: "/#faq" },
  { label: "About", href: "/about" },
];

export const navCta: NavLink = { label: "Book a consult", href: "/contact" };
