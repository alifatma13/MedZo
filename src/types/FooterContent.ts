export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterContent {
  tagline: string;
  services: string[];
  company: FooterLink[];
  contact: { email: string; location: string };
}
