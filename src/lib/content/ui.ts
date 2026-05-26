// ui.ts — shared UI strings used by multiple components.
// These are structural/navigational labels that are the same across every page instance.
// Changing a value here updates every component that references it with no component rewrite.
export const ui = {
  // Breadcrumb / navigation
  breadcrumbHome: "Home",

  // Service page hero
  serviceBackLink: "View all services",
  serviceBackHref: "/#services",
  heroBadge: "Australian Healthcare",

  // Service feature grid
  featuresEyebrow: "What we handle",

  // Service card
  gentuBadgeLabel: "Gentu",
  exploreServiceLabel: "Explore service",

  // Services section (home strip)
  exploreLabel: "Explore",

  // Team carousel
  scrollLeftLabel: "Scroll left",
  scrollRightLabel: "Scroll right",
  readMoreLabel: "Read more",
  readLessLabel: "Read less",
} as const;
