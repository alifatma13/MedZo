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
  {
    label: "Services",
    href: "/#services",
    children: [
      {
        label: "Virtual Medical Receptionist",
        href: "/services/virtual-receptionist",
        description: "Remote patient coordination and front-desk support",
        iconName: "monitor",
      },
      {
        label: "Managerial Support",
        href: "/services/managerial-support",
        description: "Practice operations, staff leadership and reporting",
        iconName: "users",
      },
      {
        label: "Billing Support",
        href: "/services/billing-support",
        description: "End-to-end claims, payments and reconciliation",
        iconName: "file-text",
      },
    ],
  },
  { label: "Why MedZo", href: "/#why-medzo" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "FAQ", href: "/faq" },
  { label: "About", href: "/about" },
];

export const navCta: NavLink = { label: "Book a consult", href: "/contact" };
