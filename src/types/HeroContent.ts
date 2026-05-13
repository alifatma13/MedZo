// HeroContent.ts — types for the home page hero: heading, CTAs, and the floating dashboard visual data.
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
