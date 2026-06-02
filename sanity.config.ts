import { defineConfig, defineType, defineField, defineArrayMember } from 'sanity'
import { structureTool } from 'sanity/structure'

// ── Singletons ────────────────────────────────────────────────────────────────

const homePage = defineType({
  name: 'homePage',
  type: 'document',
  title: 'Home Page',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({ name: 'heroHeading', type: 'string', title: 'Hero Heading' }),
    defineField({ name: 'heroSubheading', type: 'string', title: 'Hero Subheading' }),
    defineField({ name: 'heroBody', type: 'text', title: 'Hero Body', rows: 3 }),
    defineField({ name: 'heroPrimaryCtaLabel', type: 'string', title: 'Primary CTA Label' }),
    defineField({ name: 'heroSecondaryCtaLabel', type: 'string', title: 'Secondary CTA Label' }),
    defineField({
      name: 'heroImage', type: 'image', title: 'Hero Image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', type: 'string', title: 'Alt Text' })],
    }),
    defineField({ name: 'tickerIntro', type: 'string', title: 'Ticker Intro' }),
    defineField({
      name: 'tickerSpecialties', type: 'array', title: 'Ticker Specialties',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({ name: 'howItWorksEyebrow', type: 'string', title: 'How It Works — Eyebrow' }),
    defineField({ name: 'howItWorksHeading', type: 'string', title: 'How It Works — Heading' }),
    defineField({ name: 'howItWorksSubheading', type: 'string', title: 'How It Works — Subheading' }),
    defineField({
      name: 'howItWorksSteps', type: 'array', title: 'How It Works Steps',
      of: [defineArrayMember({
        type: 'object',
        name: 'step',
        fields: [
          defineField({ name: 'stepLabel', type: 'string', title: 'Step Label' }),
          defineField({ name: 'title', type: 'string', title: 'Title' }),
          defineField({ name: 'description', type: 'text', title: 'Description' }),
          defineField({ name: 'bullets', type: 'array', title: 'Bullets', of: [defineArrayMember({ type: 'string' })] }),
        ],
      })],
    }),
    defineField({ name: 'servicesEyebrow', type: 'string', title: 'Services Section — Eyebrow' }),
    defineField({ name: 'servicesTitle', type: 'string', title: 'Services Section — Title' }),
    defineField({ name: 'servicesBody', type: 'text', title: 'Services Section — Body' }),
    defineField({ name: 'servicesBridgeText', type: 'string', title: 'Services Bridge Text' }),
    defineField({ name: 'whyHeading', type: 'string', title: 'Why Section — Heading' }),
    defineField({
      name: 'whyImage', type: 'image', title: 'Why Section — Image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', type: 'string', title: 'Alt Text' })],
    }),
    defineField({
      name: 'whyMetrics', type: 'array', title: 'Why Metrics',
      of: [defineArrayMember({
        type: 'object',
        name: 'metric',
        fields: [
          defineField({ name: 'value', type: 'number', title: 'Value' }),
          defineField({ name: 'suffix', type: 'string', title: 'Suffix' }),
          defineField({ name: 'label', type: 'string', title: 'Label' }),
        ],
      })],
    }),
    defineField({
      name: 'whyItems', type: 'array', title: 'Why Items',
      of: [defineArrayMember({
        type: 'object',
        name: 'whyItem',
        fields: [
          defineField({ name: 'iconName', type: 'string', title: 'Icon Name' }),
          defineField({ name: 'title', type: 'string', title: 'Title' }),
          defineField({ name: 'description', type: 'text', title: 'Description' }),
        ],
      })],
    }),
    defineField({ name: 'testimonialsVisible', type: 'boolean', title: 'Show Testimonials' }),
    defineField({ name: 'testimonialsHeading', type: 'string', title: 'Testimonials — Heading' }),
    defineField({ name: 'testimonialsViewMoreLabel', type: 'string', title: 'Testimonials — View More Label' }),
    defineField({ name: 'finalCtaHeading', type: 'string', title: 'Final CTA — Heading' }),
    defineField({ name: 'finalCtaSubheading', type: 'string', title: 'Final CTA — Subheading' }),
    defineField({ name: 'finalCtaButtonLabel', type: 'string', title: 'Final CTA — Button Label' }),
    defineField({ name: 'seoTitle', type: 'string', title: 'SEO Title' }),
    defineField({ name: 'seoDescription', type: 'string', title: 'SEO Description' }),
  ],
})

const siteSettings = defineType({
  name: 'siteSettings',
  type: 'document',
  title: 'Site Settings',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({ name: 'defaultMetaTitle', type: 'string', title: 'Default Meta Title' }),
    defineField({ name: 'defaultMetaDescription', type: 'string', title: 'Default Meta Description' }),
    defineField({ name: 'footerTagline', type: 'text', title: 'Footer Tagline' }),
    defineField({ name: 'contactEmail', type: 'string', title: 'Contact Email' }),
    defineField({ name: 'contactLocation', type: 'string', title: 'Contact Location' }),
    defineField({ name: 'acknowledgementText', type: 'text', title: 'Acknowledgement Text' }),
    defineField({ name: 'blogEnabled', type: 'boolean', title: 'Show Insights (Blog)', initialValue: false }),
    defineField({
      name: 'navigation', type: 'array', title: 'Navigation Links',
      of: [defineArrayMember({
        type: 'object',
        name: 'navLink',
        fields: [
          defineField({ name: 'label', type: 'string', title: 'Label' }),
          defineField({ name: 'href', type: 'string', title: 'URL' }),
          defineField({ name: 'isVisible', type: 'boolean', title: 'Visible', initialValue: true }),
        ],
      })],
    }),
  ],
})

const aboutPage = defineType({
  name: 'aboutPage',
  type: 'document',
  title: 'About Page',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({ name: 'heroHeading', type: 'string', title: 'Hero Heading' }),
    defineField({ name: 'heroBody', type: 'text', title: 'Hero Body' }),
    defineField({ name: 'founderSectionHeading', type: 'string', title: 'Founder Section — Heading' }),
    defineField({ name: 'founderIntro', type: 'text', title: 'Founder — Intro' }),
    defineField({ name: 'founderName', type: 'string', title: 'Founder — Name' }),
    defineField({ name: 'founderRole', type: 'string', title: 'Founder — Role' }),
    defineField({ name: 'founderBio', type: 'text', title: 'Founder — Bio' }),
    defineField({
      name: 'founderPhoto', type: 'image', title: 'Founder — Photo',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', type: 'string', title: 'Alt Text' })],
    }),
    defineField({ name: 'missionHeading', type: 'string', title: 'Mission — Heading' }),
    defineField({ name: 'missionBody', type: 'text', title: 'Mission — Body' }),
    defineField({ name: 'valuesHeading', type: 'string', title: 'Values — Heading' }),
    defineField({
      name: 'valuesItems', type: 'array', title: 'Values',
      of: [defineArrayMember({
        type: 'object',
        name: 'valueItem',
        fields: [
          defineField({ name: 'iconName', type: 'string', title: 'Icon Name' }),
          defineField({ name: 'title', type: 'string', title: 'Title' }),
          defineField({ name: 'body', type: 'text', title: 'Body' }),
        ],
      })],
    }),
    defineField({ name: 'teamSectionHeading', type: 'string', title: 'Team Section — Heading' }),
    defineField({ name: 'teamSectionBody', type: 'text', title: 'Team Section — Body' }),
    defineField({ name: 'credentialsHeading', type: 'string', title: 'Credentials — Heading' }),
    defineField({
      name: 'credentialsItems', type: 'array', title: 'Credentials',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({ name: 'ctaHeading', type: 'string', title: 'CTA — Heading' }),
    defineField({ name: 'ctaBody', type: 'text', title: 'CTA — Body' }),
    defineField({ name: 'ctaButtonLabel', type: 'string', title: 'CTA — Button Label' }),
    defineField({ name: 'seoTitle', type: 'string', title: 'SEO Title' }),
    defineField({ name: 'seoDescription', type: 'string', title: 'SEO Description' }),
  ],
})

const contactPage = defineType({
  name: 'contactPage',
  type: 'document',
  title: 'Contact Page',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({ name: 'heroHeading', type: 'string', title: 'Hero Heading' }),
    defineField({ name: 'heroBody', type: 'text', title: 'Hero Body' }),
    defineField({
      name: 'heroTrustPoints', type: 'array', title: 'Trust Points',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({ name: 'officesHeading', type: 'string', title: 'Offices — Heading' }),
    defineField({ name: 'officesBody', type: 'text', title: 'Offices — Body' }),
    defineField({
      name: 'officeLocations', type: 'array', title: 'Office Locations',
      of: [defineArrayMember({
        type: 'object',
        name: 'location',
        fields: [
          defineField({ name: 'state', type: 'string', title: 'State' }),
          defineField({ name: 'suburb', type: 'string', title: 'Suburb' }),
          defineField({ name: 'address', type: 'string', title: 'Address' }),
          defineField({ name: 'phone', type: 'string', title: 'Phone' }),
          defineField({ name: 'email', type: 'string', title: 'Email' }),
        ],
      })],
    }),
    defineField({ name: 'seoTitle', type: 'string', title: 'SEO Title' }),
    defineField({ name: 'seoDescription', type: 'string', title: 'SEO Description' }),
  ],
})

const careersPage = defineType({
  name: 'careersPage',
  type: 'document',
  title: 'Careers Page',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({ name: 'heroHeading', type: 'string', title: 'Hero Heading' }),
    defineField({ name: 'heroBody', type: 'text', title: 'Hero Body', rows: 3 }),
    defineField({ name: 'whyHeading', type: 'string', title: 'Why Join Us — Heading' }),
    defineField({ name: 'whyBody', type: 'text', title: 'Why Join Us — Body', rows: 4 }),
    defineField({ name: 'applyHeading', type: 'string', title: 'How to Apply — Heading' }),
    defineField({ name: 'applyBody', type: 'text', title: 'How to Apply — Body', rows: 4 }),
    defineField({ name: 'applicationEmail', type: 'string', title: 'Application Email Address' }),
    defineField({ name: 'seoTitle', type: 'string', title: 'SEO Title' }),
    defineField({ name: 'seoDescription', type: 'string', title: 'SEO Description' }),
  ],
})

// ── Collections ───────────────────────────────────────────────────────────────

const service = defineType({
  name: 'service',
  type: 'document',
  title: 'Service',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title' }),
    defineField({ name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title' } }),
    defineField({ name: 'description', type: 'text', title: 'Card Description' }),
    defineField({ name: 'cardIconName', type: 'string', title: 'Card Icon Name' }),
    defineField({ name: 'navDescription', type: 'string', title: 'Nav Description' }),
    defineField({ name: 'navOrder', type: 'number', title: 'Nav Order' }),
    defineField({ name: 'heroLabel', type: 'string', title: 'Hero Label' }),
    defineField({ name: 'heroHeading', type: 'string', title: 'Hero Heading' }),
    defineField({ name: 'heroIntro', type: 'text', title: 'Hero Intro' }),
    defineField({ name: 'heroCtaLabel', type: 'string', title: 'Hero CTA Label' }),
    defineField({
      name: 'heroImage', type: 'image', title: 'Hero Image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', type: 'string', title: 'Alt Text' })],
    }),
    defineField({ name: 'featuresHeading', type: 'string', title: 'Features — Heading' }),
    defineField({ name: 'featuresIntro', type: 'text', title: 'Features — Intro' }),
    defineField({
      name: 'features', type: 'array', title: 'Features',
      of: [defineArrayMember({
        type: 'object',
        name: 'feature',
        fields: [
          defineField({ name: 'iconName', type: 'string', title: 'Icon Name' }),
          defineField({ name: 'title', type: 'string', title: 'Title' }),
          defineField({ name: 'body', type: 'text', title: 'Body' }),
        ],
      })],
    }),
    defineField({ name: 'ctaHeading', type: 'string', title: 'CTA — Heading' }),
    defineField({ name: 'ctaBody', type: 'text', title: 'CTA — Body' }),
    defineField({ name: 'ctaLabel', type: 'string', title: 'CTA — Label' }),
    defineField({ name: 'seoTitle', type: 'string', title: 'SEO Title' }),
    defineField({ name: 'seoDescription', type: 'string', title: 'SEO Description' }),
  ],
})

const testimonial = defineType({
  name: 'testimonial',
  type: 'document',
  title: 'Testimonial',
  fields: [
    defineField({ name: 'quote', type: 'text', title: 'Quote' }),
    defineField({ name: 'name', type: 'string', title: 'Name' }),
    defineField({ name: 'role', type: 'string', title: 'Role / Practice' }),
    defineField({ name: 'order', type: 'number', title: 'Display Order' }),
  ],
})

const faqItem = defineType({
  name: 'faqItem',
  type: 'document',
  title: 'FAQ Item',
  fields: [
    defineField({ name: 'question', type: 'string', title: 'Question' }),
    defineField({ name: 'answer', type: 'text', title: 'Answer' }),
    defineField({ name: 'order', type: 'number', title: 'Display Order' }),
  ],
})

const teamMember = defineType({
  name: 'teamMember',
  type: 'document',
  title: 'Team Member',
  fields: [
    defineField({ name: 'name', type: 'string', title: 'Name' }),
    defineField({ name: 'role', type: 'string', title: 'Role' }),
    defineField({ name: 'bio', type: 'text', title: 'Bio' }),
    defineField({
      name: 'photo', type: 'image', title: 'Photo',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', type: 'string', title: 'Alt Text' })],
    }),
    defineField({ name: 'order', type: 'number', title: 'Display Order' }),
  ],
})

const blogPost = defineType({
  name: 'blogPost',
  type: 'document',
  title: 'Blog Post',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title' }),
    defineField({ name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title' } }),
    defineField({ name: 'publishedAt', type: 'datetime', title: 'Published At' }),
    defineField({ name: 'author', type: 'string', title: 'Author' }),
    defineField({ name: 'category', type: 'string', title: 'Category' }),
    defineField({ name: 'excerpt', type: 'text', title: 'Excerpt', rows: 3 }),
    defineField({
      name: 'coverImage', type: 'image', title: 'Cover Image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', type: 'string', title: 'Alt Text' })],
    }),
    defineField({
      name: 'body', type: 'array', title: 'Body',
      of: [defineArrayMember({ type: 'block' })],
    }),
    defineField({ name: 'seoTitle', type: 'string', title: 'SEO Title' }),
    defineField({ name: 'seoDescription', type: 'string', title: 'SEO Description' }),
  ],
})

// ── Config ────────────────────────────────────────────────────────────────────

export default defineConfig({
  name: 'medzo-studio',
  title: 'MedZo',
  projectId: 'j8vrs6gs',
  dataset: 'production',
  plugins: [structureTool()],
  schema: {
    types: [
      // Singletons
      homePage,
      siteSettings,
      aboutPage,
      contactPage,
      careersPage,
      // Collections
      service,
      testimonial,
      faqItem,
      teamMember,
      blogPost,
    ],
  },
})
