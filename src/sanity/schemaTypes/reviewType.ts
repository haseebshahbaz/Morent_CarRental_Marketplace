import { defineField, defineType } from 'sanity'
import { StarIcon } from '@sanity/icons'

export const reviewType = defineType({
  name: 'review',
  title: 'Review',
  type: 'document',
  icon: StarIcon,
  fields: [
    defineField({
      name: 'rating',
      type: 'number',
      title: 'Rating',
      validation: Rule => Rule.required().min(1).max(5),
    }),
    defineField({
      name: 'comment',
      type: 'text',
      title: 'Comment',
    }),
    defineField({
      name: 'customer',
      type: 'reference',
      to: [{ type: 'customer' }],
      title: 'Customer',
    }),
    defineField({
      name: 'car',
      type: 'reference',
      to: [{ type: 'car' }],
      title: 'Car',
    }),
    defineField({
      name: 'booking',
      type: 'reference',
      to: [{ type: 'booking' }],
      title: 'Booking',
    }),
    defineField({
      name: 'createdAt',
      type: 'datetime',
      title: 'Created At',
    }),
  ],
})

