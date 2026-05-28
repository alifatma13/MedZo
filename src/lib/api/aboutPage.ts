// aboutPage.ts — GROQ query and fetcher for the about page singleton.
// Document ID is fixed to 'aboutPage' by the Studio structure.
import { defineQuery } from 'groq'
import { sanityClient } from './sanity'

export const ABOUT_PAGE_QUERY = defineQuery(`
  *[_type == "aboutPage" && _id == "aboutPage"][0]{
    heroHeading,
    heroBody,
    founderSectionHeading,
    founderIntro,
    founderName,
    founderRole,
    founderBio,
    founderPhoto { asset->{ _id, url, metadata { lqip, dimensions } }, hotspot, crop, alt },
    missionHeading,
    missionBody,
    valuesHeading,
    valuesItems[]{ _key, "icon": iconName, title, body },
    credentialsHeading,
    credentialsItems,
    ctaBody,
    ctaButtonLabel,
    seoTitle,
    seoDescription,
  }
`)

export async function getAboutPage() {
  return sanityClient.fetch(ABOUT_PAGE_QUERY)
}
