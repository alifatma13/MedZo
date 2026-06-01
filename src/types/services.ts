// Service card and full service detail page types.

export interface ServiceCard {
  iconName: string;
  title: string;
  description: string;
  gentuNote?: string;
  href?: string;
}

export interface ServiceFeature {
  iconName: string;
  title: string;
  body: string;
}

export interface ServicePageContent {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  heroLabel: string;
  heroHeading: string;
  heroIntro: string;
  heroCtaLabel: string;
  heroCtaHref: string;
  heroImage: ImageMetadata;
  featuresEyebrow: string;
  featuresHeading: string;
  featuresIntro: string;
  features: ServiceFeature[];
  ctaHeading: string;
  ctaBody: string;
  ctaLabel: string;
  ctaHref: string;
}
