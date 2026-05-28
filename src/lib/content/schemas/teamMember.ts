// teamMember.ts — schema for individual team member documents.
// Team members appear in the carousel on the About page.
// Fields: name, role, bio, photo (with hotspot for focal point), order.
import { defineField, defineType } from 'sanity'
import { UsersIcon } from '@sanity/icons'

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Team Members',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'role',
      title: 'Job Title',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 5,
      description: 'Multi-sentence biography shown on the About page.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      description: 'Set the hotspot (focal point) so the face stays centred when the image is cropped.',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          description: 'Describe the photo for screen readers. e.g. "Portrait of Jane Smith"',
          validation: (r) => r.required(),
        }),
      ],
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Position in the team carousel. Use whole numbers: 1, 2, 3… Lower number = appears first.',
      validation: (r) => r.required().integer().positive(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'photo',
    },
  },
})
