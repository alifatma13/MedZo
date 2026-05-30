// about.ts — all content for the /about page: meta, hero, founder, mission, values, credentials, and CTA.
import type { AboutContent } from "../../types/AboutContent";
import { teamHeading, teamBody, teamMembers } from "./team";

export const about: AboutContent = {
  metaTitle: "About MedZo | Medical Practice Management Specialists",
  metaDescription: "MedZo is an Australian medical practice management company built by healthcare insiders, specialising in billing, compliance, HR, and operations for GPs and specialist clinics.",

  hero: {
    title: "",
    heading: "Australian medical practice management built by healthcare insiders",
    paragraphs: [
      "We have worked inside Australian healthcare, not just consulted to it. The billing errors, compliance gaps, and admin overload holding good doctors back are problems we know firsthand.",
      "MedZo exists to fix that. We give practices the operational foundation to run well, so the people inside them can focus on medicine.",
    ],
  },

  founder: {
    sectionHeading: "Meet Zohra",
    intro: "A qualified doctor with a Master's in Advanced Health Services Management and over a decade of experience working inside Australian healthcare.",
    name: "Dr. Zohra",
    role: "CEO, Founder & Director",
    bio: [
      "She uniquely combines executive leadership with first-hand clinical insight. A qualified doctor with a Master's degree in Advanced Health Services Management, she knows what practitioners need to run a modern practice. Renowned for her strategic clarity and strong people leadership, she streamlines workflows, optimises revenue cycles, and reduces administrative burden so doctors can focus on medicine.",
      "Skilled in billing, compliance, customer service, and record retention, she built MedZo on the belief that helping practices run well is one of the most meaningful ways to help patients. Her warm personality, strong interpersonal skills, and genuine passion for healthcare are reflected in everything MedZo does.",
    ],
    imageUrl: "/images/team/ZohraSaima.png",
  },
  

  mission: {
    heading: "What we are trying to achieve",
    body: "We want Australian medical practices to run well. Clean billing, stable teams, solid compliance, and doctors who can focus on medicine without the operational side pulling at their attention. When that happens, everyone benefits, most of all patients.",
  },

  values: {
    heading: "What we stand for",
    items: [
      {
        title: "Patients first",
        body: "Every system we build and every process we put in place is ultimately about making things better for patients.",
        icon: "users",
      },
      {
        title: "Honest about what we are good at",
        body: "We only work in areas where we have genuine expertise. We will not take on something just to fill a contract.",
        icon: "check-circle",
      },
      {
        title: "Transparent by default",
        body: "You will always know what we are doing, what it costs, and what it is delivering. No surprises.",
        icon: "file-text",
      },
      {
        title: "Long-term focus",
        body: "We are not interested in quick fixes. We want your practice to be in better shape in five years because of the work we have done together.",
        icon: "target",
      },
      {
        title: "Continuous improvement",
        body: "We hold ourselves to the same quality improvement standards we recommend for practices. We are always trying to get better at what we do.",
        icon: "refresh",
      },
    ],
  },

  credentials: {
    heading: "Our credentials and experience",
    items: [
      "Team members aligned with AAPM (Australian Association of Practice Management) standards and professional development requirements",
      "Collective experience across general practice, specialist clinics, allied health, dental, physiotherapy, and multidisciplinary settings",
      "Current knowledge of Medicare, AHPRA, Fair Work, and Privacy Act requirements maintained through ongoing professional development",
      "Hands-on experience with all major Australian practice management software platforms",
      "Track record supporting practices from solo practitioners through to large multidisciplinary groups",
    ],
  },

  team: {
    heading: teamHeading,
    body: teamBody,
    members: teamMembers,
  },

  cta: {
    heading: "Ready to find out if we are the right fit?",
    body: "If you would like to find out whether we are the right fit for your clinic, book a free, no-pressure conversation.",
    buttonLabel: "Book a conversation with MedZo",
    buttonHref: "/contact",
  },
};
