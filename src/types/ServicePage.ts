// ServicePage.ts — shape of a full service detail page. Maps 1-to-1 to future CMS fields.
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
