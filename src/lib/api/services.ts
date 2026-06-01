// services.ts — GROQ queries and fetchers for the service collection.
// getServices() is used by home page cards, nav dropdown, and footer links.
// getServiceBySlug() is used by the /services/[service] dynamic route.
import { defineQuery } from 'groq'
import { sanityClient } from './sanity'
import type { SanityImage } from '../../types/sanity'

// ── Result types ─────────────────────────────────────────────────────────────

export interface SanityServiceCard {
  _id: string;
  title: string;
  slug: string;
  href: string;
  description: string;
  cardIconName: string;
  navDescription: string;
  navOrder: number;
}

export interface SanityServicePage extends SanityServiceCard {
  heroLabel: string;
  heroHeading: string;
  heroIntro: string;
  heroCtaLabel: string;
  heroImage: SanityImage;
  featuresHeading: string;
  featuresIntro: string;
  features: Array<{ _key: string; iconName: string; title: string; body: string }>;
  ctaHeading: string;
  ctaBody: string;
  ctaLabel: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface ServiceSlug {
  slug: string;
}

// All services ordered by navOrder — used on home page, nav, and footer
export const SERVICES_QUERY = defineQuery(`
  *[_type == "service"] | order(navOrder asc){
    _id,
    title,
    "slug": slug.current,
    "href": "/services/" + slug.current,
    description,
    cardIconName,
    navDescription,
    navOrder,
  }
`)

// Single service by slug — used on /services/[service] page
export const SERVICE_BY_SLUG_QUERY = defineQuery(`
  *[_type == "service" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    heroLabel,
    heroHeading,
    heroIntro,
    heroCtaLabel,
    heroImage { asset->{ _id, url, metadata { lqip, dimensions } }, hotspot, crop, alt },
    featuresHeading,
    featuresIntro,
    features[]{ _key, iconName, title, body },
    ctaHeading,
    ctaBody,
    ctaLabel,
    seoTitle,
    seoDescription,
  }
`)

// All slugs — used by getStaticPaths() in [service].astro
export const SERVICE_SLUGS_QUERY = defineQuery(`
  *[_type == "service"]{ "slug": slug.current }
`)

export async function getServices(): Promise<SanityServiceCard[] | null> {
  return sanityClient.fetch<SanityServiceCard[]>(SERVICES_QUERY)
}

export async function getServiceBySlug(slug: string): Promise<SanityServicePage | null> {
  return sanityClient.fetch<SanityServicePage | null>(SERVICE_BY_SLUG_QUERY, { slug })
}

export async function getServiceSlugs(): Promise<ServiceSlug[] | null> {
  return sanityClient.fetch<ServiceSlug[]>(SERVICE_SLUGS_QUERY)
}
