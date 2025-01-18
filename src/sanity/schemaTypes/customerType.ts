import { defineField, defineType } from 'sanity'
import { UserIcon } from '@sanity/icons'

export const customerType = defineType({
  name: 'customer',
  title: 'Customer',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Full Name',
    }),
    defineField({
      name: 'email',
      type: 'string',
      title: 'Email',
    }),
    defineField({
      name: 'phone',
      type: 'string',
      title: 'Phone Number',
    }),
    defineField({
      name: 'address',
      type: 'object',
      title: 'Address',
      fields: [
        { name: 'street', type: 'string', title: 'Street' },
        { name: 'city', type: 'string', title: 'City' },
        { name: 'state', type: 'string', title: 'State' },
        { name: 'zipCode', type: 'string', title: 'ZIP Code' },
      ],
    }),
    defineField({
      name: 'drivingLicense',
      type: 'object',
      title: 'Driving License',
      fields: [
        { name: 'number', type: 'string', title: 'License Number' },
        { name: 'expiryDate', type: 'date', title: 'Expiry Date' },
      ],
    }),
    defineField({
      name: 'bookings',
      type: 'array',
      title: 'Bookings',
      of: [{ type: 'reference', to: [{ type: 'booking' }] }],
    }),
  ],
})

