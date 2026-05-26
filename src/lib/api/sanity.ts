// sanity.ts — pre-configured Sanity client for fetching content in Astro pages.
// Usage: import { sanityClient } from "@lib/api/sanity"; then sanityClient.fetch(query).
import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  apiVersion: "2025-05-27", // today's date — pin this so queries stay stable
  useCdn: import.meta.env.PROD, // CDN in production for speed; live data in dev
});
