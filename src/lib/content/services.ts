// services.ts — service card collection (icon, title, description, href). Section heading lives in home.ts.
import type { ServiceCard } from "../../types/ServiceCard";

export const services: ServiceCard[] = [
  {
    iconName: "monitor",
    title: "Virtual Medical Receptionist",
    description:
      "Your patients heard, your calendar full, your admin handled. A dedicated remote receptionist who becomes a seamless part of your practice.",
    href: "/services/virtual-receptionist",
  },
  {
    iconName: "users",
    title: "Managerial Support",
    description:
      "Focus on patient care while a dedicated practice manager leads your team, streamlines workflows, and keeps your operations running smoothly.",
    href: "/services/managerial-support",
  },
  {
    iconName: "file-text",
    title: "Billing Support",
    description:
      "Faster payments, fewer rejections, zero billing stress. Complete claims management across Medicare, DVA, WorkCover, and all private health funds.",
    href: "/services/billing-support",
  },
];
