// testimonials.ts — GROQ query and fetcher for the testimonial collection.
// Testimonials are ordered by the 'order' field set in Studio.
import { defineQuery } from 'groq'
import { sanityClient } from './sanity'

export const TESTIMONIALS_QUERY = defineQuery(`
  *[_type == "testimonial"] | order(order asc){
    _id,
    quote,
    name,
    role,
    order,
  }
`)

export async function getTestimonials() {
  return sanityClient.fetch(TESTIMONIALS_QUERY)
}
