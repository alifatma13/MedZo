// contactPage.ts — GROQ query and fetcher for the contact page singleton.
// Document ID is fixed to 'contactPage' by the Studio structure.
import { defineQuery } from 'groq'
import { sanityClient } from './sanity'

export const CONTACT_PAGE_QUERY = defineQuery(`
  *[_type == "contactPage" && _id == "contactPage"][0]{
    heroHeading,
    heroBody,
    heroTrustPoints,
    officesHeading,
    officesBody,
    officeLocations[]{ _key, state, suburb, address, phone, email },
    seoTitle,
    seoDescription,
  }
`)

export async function getContactPage() {
  return sanityClient.fetch(CONTACT_PAGE_QUERY)
}
