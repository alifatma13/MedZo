// heroVisual.ts — decorative UI mock data for the hero dashboard widget.
// This is NOT CMS content — these values are illustrative and not managed by editors.
import type { HeroVisual } from "../../types/HeroContent";

export const heroVisual: HeroVisual = {
  appointments: {
    count: "24",
    change: "+4.2%",
    label: "Appointments",
    period: "This week",
  },
  actionCards: [
    { icon: "hero-patients", label: "Patients" },
    { icon: "hero-followups", label: "Follow-ups" },
    { icon: "hero-billing", label: "Billing" },
    { icon: "hero-virtual", label: "Virtual" },
  ],
  insightPill: "Last 6 month revenue insights",
  revenue: {
    title: "Revenue Insights",
    period: "Last 6 mo",
    bars: [
      { height: "22%" },
      { height: "36%" },
      { height: "48%" },
      { height: "78%", active: true },
      { height: "42%" },
      { height: "58%" },
    ],
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  },
  profile: {
    initials: "SJ",
    name: "Sarah Jones",
    role: "Practice manager",
    rating: "4.9",
  },
};
