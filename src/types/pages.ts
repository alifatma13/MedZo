// Full page-level types. Each maps 1-to-1 to a Sanity singleton document.
import type {
  TickerContent,
  Metric,
  WhyItem,
  SectionHeading,
  FinalCta,
  HowItWorksContent,
  TeamMember,
} from "./content";

// --- Hero ---

export interface HeroActionCard {
  icon: string;
  label: string;
}

export interface HeroRevenueBar {
  height: string;
  active?: boolean;
}

export interface HeroVisual {
  appointments: {
    count: string;
    change: string;
    label: string;
    period: string;
  };
  actionCards: HeroActionCard[];
  insightPill: string;
  revenue: {
    title: string;
    period: string;
    bars: HeroRevenueBar[];
    months: string[];
  };
  profile: {
    initials: string;
    name: string;
    role: string;
    rating: string;
  };
}

export interface HeroContent {
  heading: string;
  subheading: string;
  body: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
  // visual is decorative UI mock data — see src/lib/content/heroVisual.ts
}

// --- Home page ---

export interface HomeContent {
  hero: HeroContent;
  ticker: TickerContent;
  howItWorks: HowItWorksContent;
  servicesSection: SectionHeading;
  /** Bridge link below the services strip pointing to the How It Works section. */
  servicesBridge?: { text: string; href: string; ariaLabel: string };
  whySection: {
    heading: string;
    imageAlt: string;
    metrics: Metric[];
    items: WhyItem[];
  };
  testimonialsSection: {
    heading: string;
    viewMore: { label: string; href: string };
  };
  faqSection: {
    heading: string;
    metaTitle: string;
    metaDescription: string;
  };
  finalCta: FinalCta;
}

// --- About page ---

export interface CEOContent {
  imageUrl: string;
  name: string;
  role: string;
  bio: string;
}

export interface AboutFounder {
  sectionHeading: string;
  intro: string;
  name: string;
  role: string;
  bio: string[];
  imageUrl?: string;
}

export interface AboutValue {
  title: string;
  body: string;
  icon?: string;
}

export interface AboutContent {
  metaTitle: string;
  metaDescription: string;
  hero: {
    title: string;
    heading: string;
    paragraphs: string[];
  };
  founder: AboutFounder;
  mission: {
    heading: string;
    body: string;
  };
  values: {
    heading: string;
    items: AboutValue[];
  };
  credentials: {
    heading: string;
    items: string[];
  };
  team: {
    heading: string;
    body: string;
    members: TeamMember[];
  };
  cta: {
    heading?: string;
    body: string;
    buttonLabel: string;
    buttonHref: string;
  };
}

// --- Contact page ---

export interface Office {
  state: string;
  suburb: string;
  address: string;
  phone: string;
  email: string;
}

export interface ContactFormErrors {
  nameRequired: string;
  nameMin: string;
  emailRequired: string;
  emailInvalid: string;
  phoneRequired: string;
  phoneInvalid: string;
  messageRequired: string;
  messageMin: string;
  suspicious: string;
  submitFailed: string;
}

export interface ContactFormFields {
  name: { label: string; placeholder: string };
  email: { label: string; placeholder: string };
  phone: { label: string; placeholder: string };
  message: { label: string; placeholder: string };
  defaultSubject: string;
  submit: string;
  sendingLabel: string;
  errors: ContactFormErrors;
  successHeading: string;
  successBody: string;
}

export interface ContactContent {
  hero: { trustAriaLabel: string };
  form: { heading: string; body: string; fields: ContactFormFields };
}

// --- Policy pages (Privacy + Terms) ---

export interface PolicySection {
  heading: string;
  body: string;
}

export interface PolicyBackLink {
  label: string;
  href: string;
}

export interface PolicyFAQ {
  question: string;
  answer: string;
}

export interface PolicyContent {
  metaTitle: string;
  metaDescription: string;
  title: string;
  lastUpdated: string;
  intro: string;
  /** Accessible label for the sidebar <nav> element. */
  sidebarAriaLabel: string;
  backLink: PolicyBackLink;
  sections: PolicySection[];
  faqs?: PolicyFAQ[];
  /** Heading shown above the FAQ accordion block (only rendered when faqs is non-empty). */
  faqsHeading?: string;
  /** Sidebar link label for the FAQs anchor (only rendered when faqs is non-empty). */
  faqsLinkLabel?: string;
}
