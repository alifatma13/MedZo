// NavLink.ts — types for nav items (label + href) and all brand/aria strings used by Nav.astro.
export interface NavLink {
  label: string;
  href: string;
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
