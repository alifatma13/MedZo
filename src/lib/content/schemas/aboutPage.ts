// aboutPage.ts — singleton schema for the About page (/about).
// Document ID is fixed to 'aboutPage' via the Studio structure — cannot be duplicated.
// Field groups: Hero | Founder | Mission | Values | Credentials | CTA | SEO
import { defineField, defineType, defineArrayMember } from 'sanity'
import { DocumentIcon } from '@sanity/icons'
import { seoFields } from './shared/seoFields'
import { CONTENT_ICONS } from './shared/iconsList'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  icon: DocumentIcon,
  groups: [
    { name: 'hero',        title: 'Hero',        default: true },
    { name: 'founder',     title: 'Founder'                    },
    { name: 'mission',     title: 'Mission'                    },
    { name: 'values',      title: 'Values'                     },
    { name: 'credentials', title: 'Credentials'                },
    { name: 'cta',         title: 'CTA'                        },
    { name: 'seo',         title: 'SEO'                        },
  ],
  fields: [
    // ── Hero ────────────────────────────────────────────────
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
      group: 'hero',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'heroBody',
      title: 'Hero Body',
      type: 'text',
      rows: 4,
      group: 'hero',
      description: 'Multi-paragraph body. Use line breaks to separate paragraphs.',
      validation: (r) => r.required(),
    }),

    // ── Founder ──────────────────────────────────────────────
    defineField({
      name: 'founderSectionHeading',
      title: 'Founder Section Heading',
      type: 'string',
      group: 'founder',
      description: 'e.g. "Meet Zohra"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'founderIntro',
      title: 'Founder Intro',
      type: 'text',
      rows: 2,
      group: 'founder',
      description: 'Italic introductory sentence shown above the founder name.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'founderName',
      title: 'Founder Name',
      type: 'string',
      group: 'founder',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'founderRole',
      title: 'Founder Role',
      type: 'string',
      group: 'founder',
      description: 'e.g. "CEO, Founder & Director"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'founderBio',
      title: 'Founder Bio',
      type: 'text',
      rows: 8,
      group: 'founder',
      description: 'Full biography. Use line breaks to separate paragraphs.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'founderPhoto',
      title: 'Founder Photo',
      type: 'image',
      group: 'founder',
      options: { hotspot: true },
      description: 'Set the hotspot so the face stays centred when cropped.',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          description: 'e.g. "Portrait of Dr. Zohra"',
          validation: (r) => r.required(),
        }),
      ],
      validation: (r) => r.required(),
    }),

    // ── Mission ──────────────────────────────────────────────
    defineField({
      name: 'missionHeading',
      title: 'Mission Heading',
      type: 'string',
      group: 'mission',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'missionBody',
      title: 'Mission Body',
      type: 'text',
      rows: 4,
      group: 'mission',
      validation: (r) => r.required(),
    }),

    // ── Values ───────────────────────────────────────────────
    defineField({
      name: 'valuesHeading',
      title: 'Values Section Heading',
      type: 'string',
      group: 'values',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'valuesItems',
      title: 'Values',
      type: 'array',
      group: 'values',
      description: 'Each value has an icon, a title, and a body.',
      validation: (r) => r.required().min(1),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'valueItem',
          title: 'Value',
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

    // ── Credentials ──────────────────────────────────────────
    defineField({
      name: 'credentialsHeading',
      title: 'Credentials Section Heading',
      type: 'string',
      group: 'credentials',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'credentialsItems',
      title: 'Credential Points',
      type: 'array',
      group: 'credentials',
      description: 'Each item is one bullet point in the credentials list.',
      validation: (r) => r.required().min(1),
      of: [defineArrayMember({ type: 'string' })],
    }),

    // ── CTA ──────────────────────────────────────────────────
    defineField({
      name: 'ctaBody',
      title: 'CTA Body',
      type: 'text',
      rows: 2,
      group: 'cta',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'ctaButtonLabel',
      title: 'CTA Button Label',
      type: 'string',
      group: 'cta',
      description: 'Button text. Destination (/contact) is hardcoded.',
      validation: (r) => r.required(),
    }),

    // ── SEO ──────────────────────────────────────────────────
    ...seoFields.map((f) => ({ ...f, group: 'seo' })),
  ],
})
