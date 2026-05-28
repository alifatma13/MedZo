// siteSettings.ts — GROQ query and fetcher for the global site settings singleton.
// Document ID is fixed to 'siteSettings' by the Studio structure.
// Used by Nav.astro (navigation[]) and Footer.astro (tagline, contact, acknowledgement).
import { defineQuery } from 'groq'
import { sanityClient } from './sanity'

export interface SanitySiteSettings {
  defaultMetaTitle?: string;
  defaultMetaDescription?: string;
  footerTagline?: string;
  contactEmail?: string;
  contactLocation?: string;
  acknowledgementText?: string;
  navigation?: Array<{ _key: string; label: string; href: string; isVisible?: boolean }>;
}

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings" && _id == "siteSettings"][0]{
    defaultMetaTitle,
    defaultMetaDescription,
    footerTagline,
    contactEmail,
    contactLocation,
    acknowledgementText,
    navigation[]{ _key, label, href, isVisible },
  }
`)

export async function getSiteSettings(): Promise<SanitySiteSettings | null> {
  return sanityClient.fetch<SanitySiteSettings | null>(SITE_SETTINGS_QUERY)
}
