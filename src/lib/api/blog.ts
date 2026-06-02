// blog.ts — GROQ queries and fetchers for the blogPost collection.
// getBlogPosts()        → used by /insights listing page
// getBlogPostBySlug()   → used by /insights/[slug] detail page
// getBlogPostSlugs()    → used by getStaticPaths() in [slug].astro
import { defineQuery } from 'groq'
import { sanityClient } from './sanity'
import type { SanityBlogCard, SanityBlogPost, BlogPostSlug } from '../../types/blog'

// ── Queries ───────────────────────────────────────────────────────────────────

export const BLOG_POSTS_QUERY = defineQuery(`
  *[_type == "blogPost"] | order(publishedAt desc){
    _id,
    title,
    "slug": slug.current,
    "href": "/insights/" + slug.current,
    publishedAt,
    author,
    category,
    excerpt,
    coverImage { asset->{ _id, url, metadata { lqip, dimensions } }, hotspot, crop, alt },
  }
`)

export const BLOG_POST_BY_SLUG_QUERY = defineQuery(`
  *[_type == "blogPost" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    "href": "/insights/" + slug.current,
    publishedAt,
    author,
    category,
    excerpt,
    coverImage { asset->{ _id, url, metadata { lqip, dimensions } }, hotspot, crop, alt },
    body[]{
      ...,
      _type == "image" => { ..., asset-> }
    },
    seoTitle,
    seoDescription,
  }
`)

export const BLOG_POST_SLUGS_QUERY = defineQuery(`
  *[_type == "blogPost"]{ "slug": slug.current }
`)

// ── Fetchers ──────────────────────────────────────────────────────────────────

export async function getBlogPosts(): Promise<SanityBlogCard[] | null> {
  return sanityClient.fetch<SanityBlogCard[]>(BLOG_POSTS_QUERY)
}

export async function getBlogPostBySlug(slug: string): Promise<SanityBlogPost | null> {
  return sanityClient.fetch<SanityBlogPost | null>(BLOG_POST_BY_SLUG_QUERY, { slug })
}

export async function getBlogPostSlugs(): Promise<BlogPostSlug[] | null> {
  return sanityClient.fetch<BlogPostSlug[]>(BLOG_POST_SLUGS_QUERY)
}
