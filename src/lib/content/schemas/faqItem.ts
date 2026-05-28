// faqItem.ts — schema for FAQ item documents.
// FAQ items appear on the /faq page, ordered by the order field.
// Add, remove, or reorder items without developer help.
import { defineField, defineType } from 'sanity'
import { HelpCircleIcon } from '@sanity/icons'

export const faqItem = defineType({
  name: 'faqItem',
  title: 'FAQ',
  type: 'document',
  icon: HelpCircleIcon,
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'text',
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Position on the FAQ page. Use whole numbers: 1, 2, 3… Lower number = appears first.',
      validation: (r) => r.required().integer().positive(),
    }),
  ],
  preview: {
    select: {
      title: 'question',
    },
  },
})
