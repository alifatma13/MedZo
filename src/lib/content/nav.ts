import type { NavLink, NavBrand } from "../../types/NavLink";

export const navBrand: NavBrand = {
  wordmark: "MedZo",
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
];

export const navCta: NavLink = { label: "Book a consult", href: "/contact" };
