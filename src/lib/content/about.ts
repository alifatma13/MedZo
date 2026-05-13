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
      "MedZo is a medical practice management company built by people who have worked inside Australian healthcare, not just consulted to it. We understand the back-office pressures that good practices face because we have lived them. The billing errors that pile up when no one has capacity to stay across them. The accreditation scrambles that happen without the right structure in place. The good doctors held back by bad systems. We know that most of these challenges are not inevitable; they are preventable with the right support in place from the beginning.",
      "That is what MedZo was built to provide. Across practice management, administration, compliance, healthcare finance, and records, we exist to give practices the operational foundation they need to run well, so the people inside them can focus on what they do best.",
    ],
  },

  founder: {
    sectionHeading: "Meet Zohra",
    intro: "A visionary with over a decade of experience inside Australian healthcare, not consulting to it, but working in it.",
    name: "Dr. Zohra",
    role: "CEO, Founder & Director",
    bio: [
      "She uniquely combines executive leadership with first-hand clinical insight. As a qualified doctor holding a Master's degree in Advanced Health Services Management, she deeply understands the real-world needs and pressures of medical practitioners running modern practices, and what it takes to build operations that support them. Renowned for her strategic clarity and strong people leadership, she streamlines workflows, optimises revenue cycles, and reduces administrative burden so doctors can focus on medicine.",
      "Skilled in billing, compliance, customer service, and record retention, she built MedZo on the belief that helping practices run well is one of the most meaningful ways to help patients. Her warm personality, strong interpersonal skills, and genuine passion for healthcare are reflected in everything MedZo does.",
    ],
    imageUrl: "/images/team/ZohraSaima.jpg",
  },
  

  mission: {
    heading: "What we are trying to achieve",
    body: "Our goal is straightforward. We want Australian medical practices to run well. Clean billing, stable teams, solid compliance, clear finances, and doctors who can concentrate on medicine without the operational side of things constantly pulling at their attention. When practices run well, everyone benefits. The practice is more viable. The staff are better off. And most importantly, patients get better care. That is the point of all of it.",
  },

  values: {
    heading: "What we stand for",
    items: [
      {
        title: "Patients first",
        body: "Every system we build and every process we put in place is ultimately about making things better for patients. That is the point of all of it.",
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
    body: "MedZo is an Australian medical practice management company that works as a genuine partner to the practices we support. If you would like to find out whether we are the right fit for your clinic, book a free, no-pressure conversation.",
    buttonLabel: "Book a conversation with MedZo",
    buttonHref: "/contact",
  },
};
