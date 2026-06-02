// careersPage.ts — GROQ query and fetcher for the careers page singleton.
// Document ID is fixed to 'careersPage' by the Studio structure.
import { defineQuery } from 'groq'
import { sanityClient } from './sanity'

export const CAREERS_PAGE_QUERY = defineQuery(`
  *[_type == "careersPage"][0]{
    heroHeading,
    heroBody,
    whyHeading,
    whyBody,
    applyHeading,
    applyBody,
    applicationEmail,
    seoTitle,
    seoDescription,
  }
`)

export async function getCareersPage() {
  return sanityClient.fetch(CAREERS_PAGE_QUERY)
}
