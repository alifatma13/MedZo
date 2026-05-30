// FinalCta.ts — props for the bottom call-to-action banner: heading, optional subheading, and a single button.
export interface FinalCta {
  heading: string;
  subheading?: string;
  buttonLabel: string;
  buttonHref: string;
}
