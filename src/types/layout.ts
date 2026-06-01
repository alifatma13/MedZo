// Navigation and footer types — the site chrome.

export interface NavDropdownItem {
  label: string;
  href: string;
  description: string;
  iconName: string;
}

export interface NavLink {
  label: string;
  href: string;
  children?: NavDropdownItem[];
}

export interface NavBrand {
  wordmark: string;
  tagline: string;
  drawerTagline: string;
  logoAlt: string;
  ariaOpenMenu: string;
  ariaCloseMenu: string;
  ariaDialog: string;
}

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
