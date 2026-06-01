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
