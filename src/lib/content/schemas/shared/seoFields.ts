// seoFields.ts — reusable SEO fields spread into every page document.
// Usage: ...seoFields (or ...seoFields.map(f => ({ ...f, group: 'seo' })) when using field groups).
// Never duplicate these fields — always import from here.
import { defineField } from 'sanity'

export const seoFields = [
  defineField({
    name: 'seoTitle',
    title: 'SEO Title',
    type: 'string',
    description: 'Overrides the page title in search results. 50–60 characters ideal.',
    validation: (r) => r.max(60).warning('Keep under 60 characters for best results'),
  }),
  defineField({
    name: 'seoDescription',
    title: 'SEO Description',
    type: 'text',
    rows: 3,
    description: 'Shown under the title in search results. 150–160 characters ideal.',
    validation: (r) => r.max(160).warning('Keep under 160 characters for best results'),
  }),
]
