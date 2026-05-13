// home.ts — home page singleton (maps to a Sanity homePage document).
// Collections used by this page live in their own files: services.ts, testimonials.ts, faq.ts.
import type { HomeContent } from "../../types/HomeContent";

export const home: HomeContent = {
  hero: {
        heading: "Practice management\nthat makes your clinic run",
       // heading: "Practice management,\nsimplified",
    subheading:
      "Running a practice is hard, not the clinical side of things, that's what you've spent years training for. It's everything else. The billing that never quite adds up. The Medicare compliance update sitting unopened in your inbox. The endless admin pulling you away from the patients who need you most.",
    body: "At MedZo, we provide end-to-end medical practice management across Australia, so you can focus on delivering exceptional care.",
    ctaPrimary: { label: "Book a free consult", href: "/contact" },
    ctaSecondary: { label: "See how we work", href: "#services" },
  },

  ticker: {
    intro: "MedZo works with practices across all areas of Australian healthcare",
    specialties:
      "General Practice, medical specialists, allied health, dental, physiotherapy, telehealth providers, and multidisciplinary clinics.",
  },

  servicesSection: {
    title: "What does MedZo do?",
    body: "We offer tailored support that scales with your practice, ensuring clinical precision and administrative ease.",
  },

  metrics: [
    { value: 6,      suffix: "+", label: "Years of experience" },
    { value: 100000, suffix: "+", label: "Appointments booked virtually" },
    { value: 10,     suffix: "+", label: "Doctors who trust us" },
  ],

  whySection: {
    heading: "Why doctors choose MedZo",
    imageAlt: "MedZo team working with a medical practice",
    items: [
      {
        iconName: "activity",
        title: "Real healthcare expertise",
        description: "We aren't generic consultants. We understand the nuances of the Australian medical landscape.",
      },
      {
        iconName: "eye",
        title: "Full transparency",
        description: "Clear reporting and direct communication so you always know exactly how your practice is performing.",
      },
      {
        iconName: "trending-up",
        title: "We grow with you",
        description: "Scalable systems that work whether you're a solo practitioner or a large multidisciplinary clinic.",
      },
      {
        iconName: "heart",
        title: "Patients are the whole point",
        description: "Our management philosophy ensures administrative tasks never compromise patient care quality.",
      },
    ],
  },

  testimonialsSection: {
    heading: "Trusted by Australian GPs and Specialists",
    viewMore: { label: "View more stories", href: "#contact" },
  },

  faqSection: {
    heading: "Frequently Asked Questions",
  },

  finalCta: {
    heading: "Looking for expert medical practice management in Australia?",
    buttonLabel: "Book a free consult",
    buttonHref: "/contact",
  },
};
