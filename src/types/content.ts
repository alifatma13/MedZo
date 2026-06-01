// Reusable content building blocks shared across sections and pages.

export interface SectionHeading {
  eyebrow?: string;
  title: string;
  body: string;
}

export interface Metric {
  value: number;
  suffix: string;
  label: string;
}

export interface FinalCta {
  heading: string;
  subheading?: string;
  buttonLabel: string;
  buttonHref: string;
}

export interface TickerContent {
  intro: string;
  specialties: string[];
}

export interface HowItWorksStep {
  stepLabel: string;
  title: string;
  description: string;
  bullets: string[];
}

export interface HowItWorksContent {
  eyebrow: string;
  heading: string;
  subheading: string;
  steps: HowItWorksStep[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface WhyItem {
  iconName: string;
  title: string;
  description: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  /** Path under /images/team/ e.g. "/images/team/Jane.jpeg". Omit to show auto-initials. */
  imageUrl?: string;
  /** CSS object-position for the photo crop. Defaults to "center 20%". */
  imagePosition?: string;
}

export interface TestimonialCard {
  quote: string;
  name: string;
  role: string;
}
