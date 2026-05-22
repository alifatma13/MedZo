// NavLink.ts — types for nav items (label + href) and all brand/aria strings used by Nav.astro.
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
