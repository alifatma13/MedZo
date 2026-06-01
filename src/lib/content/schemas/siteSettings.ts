// siteSettings.ts — singleton schema for global site settings.
// Document ID is fixed to 'siteSettings' via the Studio structure — cannot be duplicated.
// Covers: default SEO fallbacks, footer content, contact details, acknowledgement,
//         and the top-level navigation links the team manages.
// The Services dropdown is NOT here — it auto-populates from published service documents.
import { defineField, defineType, defineArrayMember } from 'sanity'
import { CogIcon } from '@sanity/icons'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  // No field groups — this form is small enough to stay flat.
  fields: [
    // ── Default SEO ──────────────────────────────────────────
    defineField({
      name: 'defaultMetaTitle',
      title: 'Default SEO Title',
      type: 'string',
      description: 'Fallback page title for any page that has no specific SEO title set.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'defaultMetaDescription',
      title: 'Default SEO Description',
      type: 'text',
      rows: 3,
      description: 'Fallback meta description for any page without a specific SEO description.',
      validation: (r) => r.required(),
    }),

    // ── Footer ───────────────────────────────────────────────
    defineField({
      name: 'footerTagline',
      title: 'Footer Tagline',
      type: 'text',
      rows: 2,
      description: 'Short tagline shown in the footer below the logo.',
      validation: (r) => r.required(),
    }),

    // ── Contact Details ──────────────────────────────────────
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      description: 'Shown in the footer. e.g. "info@medzo.com.au"',
      validation: (r) => r.required().email(),
    }),
    defineField({
      name: 'contactLocation',
      title: 'Contact Location',
      type: 'string',
      description: 'Short location label shown in the footer. e.g. "Australia-wide"',
      validation: (r) => r.required(),
    }),

    // ── Acknowledgement ──────────────────────────────────────
    defineField({
      name: 'acknowledgementText',
      title: 'Acknowledgement of Country',
      type: 'text',
      rows: 5,
      description: 'Indigenous acknowledgement paragraph shown at the bottom of the footer.',
      validation: (r) => r.required(),
    }),

    // ── Navigation ───────────────────────────────────────────
    defineField({
      name: 'navigation',
      title: 'Navigation Links',
      type: 'array',
      description:
        'Top-level nav links managed by the team. The Services dropdown is separate — it auto-populates from published service documents. To hide a link without deleting it, set Visible to off.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'navLink',
          title: 'Nav Link',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'e.g. "FAQ" or "About"',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'href',
              title: 'Link (href)',
              type: 'string',
              description: 'e.g. "/faq" or "/#why-medzo". Always use a root-relative path.',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'isVisible',
              title: 'Visible',
              type: 'boolean',
              description: 'Toggle off to hide this link from the nav without deleting it.',
              initialValue: true,
            }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'href', isVisible: 'isVisible' },
            prepare({ title, subtitle, isVisible }: { title?: string; subtitle?: string; isVisible?: boolean }) {
              return {
                title: title ?? 'Untitled link',
                subtitle: isVisible === false ? `${subtitle} (hidden)` : subtitle,
              }
            },
          },
        }),
      ],
    }),
  ],
})
