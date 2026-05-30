// homePage.ts — GROQ query and fetcher for the home page singleton.
// Document ID is fixed to 'homePage' by the Studio structure.
import { defineQuery } from 'groq'
import { sanityClient } from './sanity'

export const HOME_PAGE_QUERY = defineQuery(`
  *[_type == "homePage" && _id == "homePage"][0]{
    heroHeading,
    heroSubheading,
    heroBody,
    heroPrimaryCtaLabel,
    heroSecondaryCtaLabel,
    heroImage { asset->{ _id, url, metadata { lqip, dimensions } }, hotspot, crop, alt },
    tickerIntro,
    tickerSpecialties,
    howItWorksEyebrow,
    howItWorksHeading,
    howItWorksSubheading,
    howItWorksSteps[]{ _key, stepLabel, title, description, bullets },
    servicesEyebrow,
    servicesTitle,
    servicesBody,
    servicesBridgeText,
    whyHeading,
    whyImage { asset->{ _id, url, metadata { lqip, dimensions } }, hotspot, crop, alt },
    whyMetrics[]{ _key, value, suffix, label },
    whyItems[]{ _key, iconName, title, description },
    testimonialsVisible,
    testimonialsHeading,
    testimonialsViewMoreLabel,
    finalCtaHeading,
    finalCtaButtonLabel,
    seoTitle,
    seoDescription,
  }
`)

export async function getHomePage() {
  return sanityClient.fetch(HOME_PAGE_QUERY)
}
