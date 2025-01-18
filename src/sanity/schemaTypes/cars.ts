import { defineField, defineType } from 'sanity'
// import { CarIcon } from '@sanity/icons'

export const carType = defineType({
  name: 'car',
  title: 'Car',
  type: 'document',
//   icon: CarIcon,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Car Name',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'brand',
      type: 'string',
      title: 'Brand',
      description: 'Brand of the car (e.g., Nissan, Tesla, etc.)',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'type',
      type: 'string',
      title: 'Car Type',
      description: 'Type of the car (e.g., Sport, Sedan, SUV, etc.)',
      options: {
        list: [
          { title: 'Sport', value: 'sport' },
          { title: 'Sedan', value: 'sedan' },
          { title: 'SUV', value: 'suv' },
          { title: 'Couple', value: 'couple' },
          { title: 'Hatchback', value: 'hatchback' },
          { title: 'Convertible', value: 'convertible' },
        ],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'fuelCapacity',
      type: 'string',
      title: 'Fuel Capacity',
      description: 'Fuel capacity or battery capacity (e.g., 90L, 100kWh)',
    }),
    defineField({
      name: 'transmission',
      type: 'string',
      title: 'Transmission',
      description: 'Type of transmission (e.g., Manual, Automatic)',
      options: {
        list: [
          { title: 'Manual', value: 'Manual' },
          { title: 'Automatic', value: 'Automatic' },
        ],
      },
    }),
    defineField({
      name: 'seatingCapacity',
      type: 'string',
      title: 'Seating Capacity',
      description: 'Number of seats (e.g., 2 People, 4 seats)',
    }),
    defineField({
      name: 'pricePerDay',
      type: 'number',
      title: 'Price Per Day',
      description: 'Rental price per day',
      validation: Rule => Rule.required().min(0),
    }),
    defineField({
      name: 'originalPrice',
      type: 'number',
      title: 'Original Price',
      description: 'Original price before discount (if applicable)',
    }),
    defineField({
      name: 'location',
      type: 'reference',
      to: [{ type: 'location' }],
      title: 'Current Location',
    }),
    defineField({
      name: 'status',
      type: 'string',
      title: 'Car Status',
      options: {
        list: [
          { title: 'Available', value: 'available' },
          { title: 'Rented', value: 'rented' },
          { title: 'Maintenance', value: 'maintenance' },
        ],
      },
      initialValue: 'available',
    }),
    defineField({
      name: 'tags',
      type: 'array',
      title: 'Tags',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      description: 'Tags for categorization (e.g., popular, recommended)',
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Car Image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
    }),

    defineField({
      name: 'reviews',
      type: 'array',
      title: 'Reviews',
      of: [{ type: 'reference', to: [{ type: 'review' }] }],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'brand',
      media: 'image',
    },
  },
})

