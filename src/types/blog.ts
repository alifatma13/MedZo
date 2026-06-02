// blog.ts — TypeScript interfaces for the blogPost Sanity collection.
import type { SanityImage } from "./sanity";

export interface SanityBlogCard {
  _id: string;
  title: string;
  slug: string;
  href: string;
  publishedAt: string;
  author: string;
  category: string;
  excerpt: string;
  coverImage: SanityImage | null;
}

export interface SanityBlogPost extends SanityBlogCard {
  body: any[];
  seoTitle?: string;
  seoDescription?: string;
}

export interface BlogPostSlug {
  slug: string;
}
