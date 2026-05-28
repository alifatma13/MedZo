// faq.ts — GROQ query and fetcher for the FAQ item collection.
// Items are ordered by the 'order' field set in Studio.
import { defineQuery } from 'groq'
import { sanityClient } from './sanity'

export const FAQ_QUERY = defineQuery(`
  *[_type == "faqItem"] | order(order asc){
    _id,
    question,
    answer,
    order,
  }
`)

export async function getFaqs() {
  return sanityClient.fetch(FAQ_QUERY)
}
