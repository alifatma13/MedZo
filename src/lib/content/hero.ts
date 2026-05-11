import type { HeroContent } from "../../types/HeroContent";

export const hero: HeroContent = {
  heading: "Practice management that actually makes your clinic run",
  subheading:
    "Running a practice is hard, not the clinical side of things, that's what you've spent years training for. It's everything else. The billing that never quite adds up. The Medicare compliance update sitting unopened in your inbox.",
  body:
    "That's where MedZo comes in. We provide end-to-end medical practice management across Australia, focusing on operational excellence while you focus on care.",
  ctaPrimary: { label: "Book a free consult", href: "#contact" },
  ctaSecondary: { label: "See how we work", href: "#services" },
  visual: {
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
  },
};
