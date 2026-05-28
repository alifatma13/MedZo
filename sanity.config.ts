// sanity.config.ts — Sanity Studio configuration (embedded via @sanity/astro at /studio).
// All 8 document type schemas are registered here.
// The custom structure (singletons + collections) is wired via structureTool({ structure }).
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { structure } from './src/structure'

// Collections
import { teamMember }   from './src/lib/content/schemas/teamMember'
import { testimonial }  from './src/lib/content/schemas/testimonial'
import { faqItem }      from './src/lib/content/schemas/faqItem'
import { service }      from './src/lib/content/schemas/service'

// Singletons
import { homePage }     from './src/lib/content/schemas/homePage'
import { aboutPage }    from './src/lib/content/schemas/aboutPage'
import { contactPage }  from './src/lib/content/schemas/contactPage'
import { siteSettings } from './src/lib/content/schemas/siteSettings'

export default defineConfig({
  name: 'medzo-studio',
  title: 'MedZo',

  // Project ID and dataset are public values — safe to hard-code here.
  // They are also stored in .env as PUBLIC_SANITY_PROJECT_ID / PUBLIC_SANITY_DATASET
  // for use with the Sanity client in Astro pages.
  projectId: 'j8vrs6gs',
  dataset: 'production',

  plugins: [structureTool({ structure })],

  schema: {
    types: [
      // Collections — multiple documents, team manages
      teamMember,
      testimonial,
      faqItem,
      service,
      // Singletons — one document each, fixed documentId via structure
      homePage,
      aboutPage,
      contactPage,
      siteSettings,
    ],
  },
})
