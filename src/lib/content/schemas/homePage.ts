// homePage.ts — singleton schema for the home page (/).
// Document ID is fixed to 'homePage' via the Studio structure — cannot be duplicated.
// Field groups: Hero | Specialty Ticker | How It Works | Services Section |
//               Why MedZo | Testimonials | Final CTA | SEO
import { defineField, defineType, defineArrayMember } from 'sanity'
import { HomeIcon } from '@sanity/icons'
import { seoFields } from './shared/seoFields'
import { CONTENT_ICONS } from './shared/iconsList'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: HomeIcon,
  groups: [
    { name: 'hero',            title: 'Hero',               default: true },
    { name: 'ticker',          title: 'Specialty Ticker'                  },
    { name: 'howItWorks',      title: 'How It Works'                      },
    { name: 'servicesSection', title: 'Services Section'                  },
    { name: 'whyMedzo',        title: 'Why MedZo'                         },
    { name: 'testimonials',    title: 'Testimonials'                      },
    { name: 'finalCta',        title: 'Final CTA'                         },
    { name: 'seo',             title: 'SEO'                               },
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
      name: 'heroSubheading',
      title: 'Hero Subheading',
      type: 'text',
      rows: 3,
      group: 'hero',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'heroBody',
      title: 'Hero Body',
      type: 'string',
      group: 'hero',
      description: 'Short supporting line shown below the subheading.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'heroPrimaryCtaLabel',
      title: 'Primary CTA Button Label',
      type: 'string',
      group: 'hero',
      description: 'e.g. "Book a free consult". Destination (/contact) is hardcoded.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'heroSecondaryCtaLabel',
      title: 'Secondary CTA Button Label',
      type: 'string',
      group: 'hero',
      description: 'e.g. "See how it works". Destination (/#how-it-works) is hardcoded.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      group: 'hero',
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

    // ── Specialty Ticker ────────────────────────────────────
    defineField({
      name: 'tickerIntro',
      title: 'Ticker Intro Text',
      type: 'string',
      group: 'ticker',
      description: 'Label before the scrolling specialties list. e.g. "Supporting"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'tickerSpecialties',
      title: 'Specialties',
      type: 'array',
      group: 'ticker',
      description: 'List of specialty names that scroll across the ticker.',
      of: [defineArrayMember({ type: 'string' })],
      validation: (r) => r.required().min(1),
    }),

    // ── How It Works ────────────────────────────────────────
    defineField({
      name: 'howItWorksEyebrow',
      title: 'Eyebrow Label',
      type: 'string',
      group: 'howItWorks',
      description: 'Small uppercase label above the heading. e.g. "HOW IT WORKS"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'howItWorksHeading',
      title: 'Section Heading',
      type: 'string',
      group: 'howItWorks',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'howItWorksSubheading',
      title: 'Section Subheading',
      type: 'text',
      rows: 2,
      group: 'howItWorks',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'howItWorksSteps',
      title: 'Steps',
      type: 'array',
      group: 'howItWorks',
      description: 'Each step has a label, title, description, and optional bullet points.',
      validation: (r) => r.required().min(1),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'step',
          title: 'Step',
          fields: [
            defineField({
              name: 'stepLabel',
              title: 'Step Label',
              type: 'string',
              description: 'e.g. "STEP 1: Discovery"',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'bullets',
              title: 'Bullet Points',
              type: 'array',
              description: 'Optional. Each item is one bullet point.',
              of: [defineArrayMember({ type: 'string' })],
            }),
          ],
          preview: {
            select: { title: 'stepLabel', subtitle: 'title' },
          },
        }),
      ],
    }),

    // ── Services Section ─────────────────────────────────────
    defineField({
      name: 'servicesEyebrow',
      title: 'Services Eyebrow Label',
      type: 'string',
      group: 'servicesSection',
      description: 'Small uppercase label above the heading.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'servicesTitle',
      title: 'Services Section Heading',
      type: 'string',
      group: 'servicesSection',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'servicesBody',
      title: 'Services Section Body',
      type: 'text',
      rows: 2,
      group: 'servicesSection',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'servicesBridgeText',
      title: 'Services Bridge Text',
      type: 'string',
      group: 'servicesSection',
      description: 'Text linking from the services section to the Why MedZo section.',
      validation: (r) => r.required(),
    }),

    // ── Why MedZo ────────────────────────────────────────────
    defineField({
      name: 'whyHeading',
      title: 'Why MedZo Heading',
      type: 'string',
      group: 'whyMedzo',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'whyImage',
      title: 'Why MedZo Image',
      type: 'image',
      group: 'whyMedzo',
      options: { hotspot: true },
      description: 'Large photo shown alongside the metrics and feature points.',
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
      name: 'whyMetrics',
      title: 'Metrics',
      type: 'array',
      group: 'whyMedzo',
      description: 'Stat callouts. e.g. "100,000+ Appointments booked"',
      validation: (r) => r.required().min(1),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'metric',
          title: 'Metric',
          fields: [
            defineField({
              name: 'value',
              title: 'Value',
              type: 'number',
              description: 'e.g. 100000',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'suffix',
              title: 'Suffix',
              type: 'string',
              description: 'e.g. "+" or "%"',
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'e.g. "Appointments booked virtually"',
              validation: (r) => r.required(),
            }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'value' },
          },
        }),
      ],
    }),
    defineField({
      name: 'whyItems',
      title: 'Why MedZo Points',
      type: 'array',
      group: 'whyMedzo',
      description: 'Feature points with icons shown alongside the image.',
      validation: (r) => r.required().min(1),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'whyItem',
          title: 'Point',
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
              name: 'description',
              title: 'Description',
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

    // ── Testimonials ─────────────────────────────────────────
    defineField({
      name: 'testimonialsHeading',
      title: 'Testimonials Section Heading',
      type: 'string',
      group: 'testimonials',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'testimonialsViewMoreLabel',
      title: '"View More" Button Label',
      type: 'string',
      group: 'testimonials',
      description: 'Label on the button that loads more testimonials.',
      validation: (r) => r.required(),
    }),

    // ── Final CTA ────────────────────────────────────────────
    defineField({
      name: 'finalCtaHeading',
      title: 'Final CTA Heading',
      type: 'string',
      group: 'finalCta',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'finalCtaButtonLabel',
      title: 'Final CTA Button Label',
      type: 'string',
      group: 'finalCta',
      description: 'Button text. Destination (/contact) is hardcoded.',
      validation: (r) => r.required(),
    }),

    // ── SEO ──────────────────────────────────────────────────
    ...seoFields.map((f) => ({ ...f, group: 'seo' })),
  ],
})
