// team.ts — GROQ query and fetcher for the team member collection.
// Members are ordered by the 'order' field set in Studio.
import { defineQuery } from 'groq'
import { sanityClient } from './sanity'

export const TEAM_QUERY = defineQuery(`
  *[_type == "teamMember"] | order(order asc){
    _id,
    name,
    role,
    bio,
    photo { asset->{ _id, url, metadata { lqip, dimensions } }, hotspot, crop, alt },
    order,
  }
`)

export async function getTeamMembers() {
  return sanityClient.fetch(TEAM_QUERY)
}
