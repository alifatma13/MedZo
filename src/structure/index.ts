// src/structure/index.ts — Sanity Studio custom structure.
// Singletons are pinned at the top with fixed documentIds so they cannot be duplicated.
// Collections appear below a divider.
// Import this in sanity.config.ts: structureTool({ structure })
import type { StructureResolver } from 'sanity/structure'
import {
  CogIcon,
  HomeIcon,
  DocumentIcon,
  EnvelopeIcon,
  CaseIcon,
  UsersIcon,
  StarFilledIcon,
  HelpCircleIcon,
  EditIcon,
} from '@sanity/icons'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('MedZo Content')
    .items([
      // ── Singletons (one document each, cannot create more) ──
      S.listItem()
        .title('Site Settings')
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Site Settings'),
        ),

      S.listItem()
        .title('Home Page')
        .icon(HomeIcon)
        .child(
          S.document()
            .schemaType('homePage')
            .documentId('homePage')
            .title('Home Page'),
        ),

      S.listItem()
        .title('About Page')
        .icon(DocumentIcon)
        .child(
          S.document()
            .schemaType('aboutPage')
            .documentId('aboutPage')
            .title('About Page'),
        ),

      S.listItem()
        .title('Contact Page')
        .icon(EnvelopeIcon)
        .child(
          S.document()
            .schemaType('contactPage')
            .documentId('contactPage')
            .title('Contact Page'),
        ),

      S.divider(),

      // ── Collections (multiple documents, team manages) ──────
      S.documentTypeListItem('service')
        .title('Services')
        .icon(CaseIcon),

      S.documentTypeListItem('teamMember')
        .title('Team Members')
        .icon(UsersIcon),

      S.documentTypeListItem('testimonial')
        .title('Testimonials')
        .icon(StarFilledIcon),

      S.documentTypeListItem('faqItem')
        .title('FAQ')
        .icon(HelpCircleIcon),

      S.documentTypeListItem('blogPost')
        .title('Blog Posts')
        .icon(EditIcon),
    ])
