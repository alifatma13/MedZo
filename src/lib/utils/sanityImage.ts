// sanityImage.ts — urlFor() helper for Sanity CDN image URLs.
// Wraps @sanity/image-url; respects hotspot and crop from the image asset metadata.
//
// Usage (Phase 2 — in Astro components):
//   import { urlFor } from '../lib/utils/sanityImage'
//   const src = urlFor(member.photo).width(400).height(400).fit('crop').url()
//   // Returns a CDN URL that:
//   //   • Serves WebP automatically
//   //   • Honours the hotspot focal point set in Studio
//   //   • Is correctly sized for the target element
import { createImageUrlBuilder as imageUrlBuilder } from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url'

const builder = imageUrlBuilder({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
})

/**
 * Returns an image URL builder chain for a Sanity image source.
 *
 * @example
 * urlFor(photo).width(400).height(400).fit('crop').url()
 * urlFor(photo).width(800).auto('format').url()
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}
