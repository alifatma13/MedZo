// service.ts — schema for individual service documents.
// Each service is both a nav dropdown entry, a home page card, AND a full /services/[slug] page.
// Publishing a service automatically adds it to the nav and home page — no developer needed.
// Field groups: Card & Nav | Service Page | SEO
import { defineField, defineType, defineArrayMember } from 'sanity'
import { CaseIcon } from '@sanity/icons'
import { seoFields } from './shared/seoFields'
import { CONTENT_ICONS } from './shared/iconsList'

export const service = defineType({
  name: 'service',
  title: 'Services',
  type: 'document',
  icon: CaseIcon,
  groups: [
    { name: 'cardNav',  title: 'Card & Nav',    default: true },
    { name: 'page',     title: 'Service Page'                 },
    { name: 'seo',      title: 'SEO'                          },
  ],
  fields: [
    // ── Card & Nav ───────────────────────────────────────────
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'cardNav',
      description: 'Used as the home page card title and the nav dropdown label.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      group: 'cardNav',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      description: 'Auto-generated from title. Determines the /services/[slug] URL. Lowercase, hyphens only.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'description',
      title: 'Card Description',
      type: 'text',
      rows: 3,
      group: 'cardNav',
      description: 'Full description shown on the home page service card.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'cardIconName',
      title: 'Card Icon',
      type: 'string',
      group: 'cardNav',
      options: { list: CONTENT_ICONS },
      description: 'Icon shown on the home page service card and in the nav dropdown.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'navDescription',
      title: 'Nav Description',
      type: 'string',
      group: 'cardNav',
      description: 'Short one-liner shown in the nav dropdown only. Max 80 characters.',
      validation: (r) => r.required().max(80),
    }),
    defineField({
      name: 'navOrder',
      title: 'Nav Order',
      type: 'number',
      group: 'cardNav',
      description: 'Order in the nav dropdown and home page card grid. 1 = first. Use whole numbers.',
      validation: (r) => r.required().integer().positive(),
    }),

    // ── Service Page ─────────────────────────────────────────
    defineField({
      name: 'heroLabel',
      title: 'Hero Badge',
      type: 'string',
      group: 'page',
      description: 'Small badge text above the main heading. e.g. "Virtual Receptionist"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
      group: 'page',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'heroIntro',
      title: 'Hero Intro',
      type: 'text',
      rows: 3,
      group: 'page',
      description: 'Paragraph shown below the heading on the service page.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'heroCtaLabel',
      title: 'Hero CTA Button Label',
      type: 'string',
      group: 'page',
      description: 'Button text. The destination (/contact) is hardcoded.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      group: 'page',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          description: 'Describe the image for screen readers.',
          validation: (r) => r.required(),
        }),
      ],
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'featuresHeading',
      title: 'Features Section Heading',
      type: 'string',
      group: 'page',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'featuresIntro',
      title: 'Features Section Intro',
      type: 'text',
      rows: 2,
      group: 'page',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'features',
      title: 'Feature Cards',
      type: 'array',
      group: 'page',
      description: 'Each card shows an icon, title, and body. Minimum 1 required.',
      validation: (r) => r.required().min(1),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'feature',
          title: 'Feature',
          fields: [
            defineField({
              name: 'iconName',
              title: 'Icon',
              type: 'string',
              options: { list: CONTENT_ICONS },
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'body',
              title: 'Body',
              type: 'text',
              rows: 2,
              validation: (r) => r.required(),
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'iconName' },
          },
        }),
      ],
    }),
    defineField({
      name: 'ctaHeading',
      title: 'CTA Section Heading',
      type: 'string',
      group: 'page',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'ctaBody',
      title: 'CTA Section Body',
      type: 'text',
      rows: 2,
      group: 'page',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA Button Label',
      type: 'string',
      group: 'page',
      description: 'Button text. The destination (/contact) is hardcoded.',
      validation: (r) => r.required(),
    }),

    // ── SEO ──────────────────────────────────────────────────
    ...seoFields.map((f) => ({ ...f, group: 'seo' })),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
    },
    prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
      return {
        title: title ?? 'Untitled service',
        subtitle: subtitle ? `/services/${subtitle}` : 'No slug yet',
      }
    },
  },
})
