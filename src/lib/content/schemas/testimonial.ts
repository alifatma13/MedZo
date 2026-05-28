// testimonial.ts — schema for client testimonial documents.
// Testimonials appear in the carousel on the home page.
// Fields: quote, name, role/practice, order.
import { defineField, defineType } from 'sanity'
import { StarFilledIcon } from '@sanity/icons'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonials',
  type: 'document',
  icon: StarFilledIcon,
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
      description: 'The testimonial text, exactly as it should appear on site.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'e.g. "Dr. Sarah T." — use initials for the surname if privacy preferred.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role / Practice',
      type: 'string',
      description: 'e.g. "General Practitioner, NSW" — optional.',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Position in the testimonials carousel. Use whole numbers: 1, 2, 3…',
      validation: (r) => r.required().integer().positive(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
    },
  },
})
