// FooterContent.ts — developer-owned footer fields only.
// CMS-managed fields (tagline, services, contact, acknowledgement) live in Sanity.
export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumnHeadings {
  services: string;
  company: string;
  contact: string;
}

export interface FooterContent {
  columnHeadings: FooterColumnHeadings;
  company: FooterLink[];
  copyright: string;
  legalLinks: FooterLink[];
  logoAlt: string;
  wordmark: string;
}
