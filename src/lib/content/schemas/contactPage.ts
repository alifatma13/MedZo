// contactPage.ts — singleton schema for the Contact page (/contact).
// Document ID is fixed to 'contactPage' via the Studio structure — cannot be duplicated.
// Covers: hero copy, trust points, office locations, SEO.
// Form field labels and validation copy stay in src/lib/content/contact.ts (developer-owned).
// Field groups: Hero | Offices | SEO
import { defineField, defineType, defineArrayMember } from 'sanity'
import { EnvelopeIcon } from '@sanity/icons'
import { seoFields } from './shared/seoFields'

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  icon: EnvelopeIcon,
  groups: [
    { name: 'hero',    title: 'Hero',    default: true },
    { name: 'offices', title: 'Offices'                },
    { name: 'seo',     title: 'SEO'                    },
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
      rows: 3,
      group: 'hero',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'heroTrustPoints',
      title: 'Trust Points',
      type: 'array',
      group: 'hero',
      description: 'Short trust signals shown below the hero body. e.g. "We respond within 1 business day"',
      of: [defineArrayMember({ type: 'string' })],
      validation: (r) => r.required().min(1),
    }),

    // ── Offices ──────────────────────────────────────────────
    defineField({
      name: 'officesHeading',
      title: 'Office Section Heading',
      type: 'string',
      group: 'offices',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'officesBody',
      title: 'Office Section Body',
      type: 'text',
      rows: 2,
      group: 'offices',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'officeLocations',
      title: 'Office Locations',
      type: 'array',
      group: 'offices',
      description: 'Add one entry per physical office location.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'location',
          title: 'Location',
          fields: [
            defineField({
              name: 'state',
              title: 'State',
              type: 'string',
              description: 'e.g. "NSW"',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'suburb',
              title: 'Suburb / City',
              type: 'string',
              description: 'e.g. "Sydney"',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'address',
              title: 'Street Address',
              type: 'text',
              rows: 3,
              description: 'Multi-line address. e.g. "330 Church Street\\nParramatta NSW 2150"',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'phone',
              title: 'Phone Number',
              type: 'string',
              description: 'Optional. e.g. "0478 811 242"',
            }),
            defineField({
              name: 'email',
              title: 'Email Address',
              type: 'string',
              description: 'Optional. e.g. "info@medzo.com.au"',
              validation: (r) => r.email(),
            }),
          ],
          preview: {
            select: { title: 'suburb', subtitle: 'state' },
          },
        }),
      ],
    }),

    // ── SEO ──────────────────────────────────────────────────
    ...seoFields.map((f) => ({ ...f, group: 'seo' })),
  ],
})
