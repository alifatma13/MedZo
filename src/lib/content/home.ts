// home.ts — home page singleton (maps to a Sanity homePage document).
// Collections used by this page live in their own files: services.ts, testimonials.ts, faq.ts.
import type { HomeContent } from "../../types/HomeContent";

export const home: HomeContent = {
  hero: {
    heading: "Practice management,\nsimplified.",
    subheading:
      "Running a practice is hard. Not the clinical side. That's what you trained for. It's the billing, the compliance updates, the endless admin pulling you away from patients.",
    body: "At MedZo, we handle it all so you can focus on exceptional care.",
    ctaPrimary: { label: "Book a free consult", href: "/contact" },
    ctaSecondary: { label: "See how we work", href: "#services" },
  },

  ticker: {
    intro: "Supporting practices across all areas of Australian healthcare",
    specialties: [
      "General Practice",
      "Medical Specialists",
      "Allied Health",
      "Dental",
      "Physiotherapy",
      "Telehealth Providers",
      "Multidisciplinary Clinics",
      "Pathology",
      "Radiology",
      "Psychology",
    ],
  },

  howItWorks: {
    eyebrow: "Our Process",
    heading: "From Consultation to Continuity",
    subheading: "Every engagement follows three steps: understand your practice, build the right team, and stay involved as you grow.",
    steps: [
      {
        stepLabel: "STEP 1: Discovery",
        title: "Practice Alignment",
        description: "A structured consultation to map your workflows, systems, and pain points before anything else moves.",
        bullets: [
          "Day-to-day on-site team operations",
          "Practice management systems and software",
          "Patient volumes and appointment patterns",
          "Administrative bottlenecks",
        ],
      },
      {
        stepLabel: "STEP 2: Recruitment",
        title: "Training and Onboarding",
        description: "We build a tailored support plan, then handle all recruitment, training, and onboarding end-to-end.",
        bullets: [
          "Virtual Medical Receptionists with healthcare experience",
          "Onboarding matched to your systems",
          "Training to Australian healthcare standards",
          "Privacy and data security protocols",
        ],
      },
      {
        stepLabel: "STEP 3: Integration",
        title: "Ongoing Support",
        description: "Your Virtual Receptionist joins as a genuine team extension, backed by Medzo's active governance.",
        bullets: [
          "Performance monitoring and quality assurance",
          "Workflow refinement and efficiency reviews",
          "Coaching and operational support",
          "Clear escalation and continuity planning",
        ],
      },
    ],
  },

  servicesSection: {
    eyebrow: "Our Services",
    title: "What does MedZo do?",
    body: "From the first patient call to the final invoice, we handle the operational work so your clinical team does not have to.",
  },

  whySection: {
    heading: "Why doctors choose MedZo",
    imageAlt: "MedZo team working with a medical practice",
    metrics: [
      { value: 6,      suffix: "+", label: "Years of experience" },
      { value: 100000, suffix: "+", label: "Appointments booked virtually" },
      { value: 10,     suffix: "+", label: "Doctors who trust us" },
    ],
    items: [
      {
        iconName: "activity",
        title: "Real healthcare expertise",
        description: "We aren't generic consultants. We know Medicare billing rules, AHPRA requirements, and the pressure bulk billing puts on a practice.",
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
    heading: "Take the admin off your plate.",
    buttonLabel: "Book a free consult",
    buttonHref: "/contact",
  },
};
