
// import { defineField, defineType } from "sanity"

// export const carType = defineType({
//   name: "car",
//   title: "Car",
//   type: "document",
//   fields: [
//     defineField({
//       name: "name",
//       title: "Name",
//       type: "string",
//       validation: (Rule) => Rule.required(),
//     }),
//     defineField({
//       name: "brand",
//       title: "Brand",
//       type: "string",
//       validation: (Rule) => Rule.required(),
//     }),
//     defineField({
//       name: "type",
//       title: "Type",
//       type: "string",
//       options: {
//         list: ["Sedan", "SUV", "Convertible", "Hatchback", "Coupe"],
//       },
//     }),
//     defineField({
//       name: "fuelCapacity",
//       title: "Fuel Capacity",
//       type: "string",
//     }),
//     defineField({
//       name: "transmission",
//       title: "Transmission",
//       type: "string",
//       options: {
//         list: ["Manual", "Automatic"],
//       },
//     }),
//     defineField({
//       name: "seatingCapacity",
//       title: "Seating Capacity",
//       type: "number",
//     }),
//     defineField({
//       name: "pricePerDay",
//       title: "Price Per Day",
//       type: "number",
//     }),
//     defineField({
//       name: "originalPrice",
//       title: "Original Price",
//       type: "number",
//       validation: (Rule) => Rule.min(0),
//     }),
//     defineField({
//       name: "carType",
//       title: "Car Type",
//       type: "string",
//       options: {
//         list: ["SUV", "Sedan", "Convertible", "Hatchback", "Coupe"],
//       },
//     }),
//     defineField({
//       name: "location",
//       title: "Location",
//       type: "reference",
//       to: [{ type: "location" }],
//     }),
//     defineField({
//       name: "status",
//       title: "Status",
//       type: "string",
//       options: {
//         list: ["Available", "Rented", "Maintenance"],
//       },
//     }),
//     defineField({
//       name: "tags",
//       title: "Tags",
//       type: "array",
//       of: [{ type: "string" }],
//     }),
//     defineField({
//       name: "bookings",
//       title: "Bookings",
//       type: "array",
//       of: [{ type: "reference", to: [{ type: "booking" }] }],
//     }),
//     defineField({
//       name: "reviews",
//       title: "Reviews",
//       type: "array",
//       of: [{ type: "reference", to: [{ type: "review" }] }],
//     }),
//     defineField({
//       name: "image",
//       title: "Image",
//       type: "image",
//       options: {
//         hotspot: true,
//       },
//     }),
//   ],
// })


import { defineField, defineType } from "sanity"

export const carType = defineType({
  name: "car",
  title: "Car",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "brand",
      title: "Brand",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: ["Sedan", "SUV", "Convertible", "Hatchback", "Coupe"],
      },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "fuelCapacity",
      title: "Fuel Capacity",
      type: "string",
    }),
    defineField({
      name: "transmission",
      title: "Transmission",
      type: "string",
      options: {
        list: ["Manual", "Automatic"],
      },
    }),
    defineField({
      name: "seatingCapacity",
      title: "Seating Capacity",
      type: "number",
    }),
    defineField({
      name: "pricePerDay",
      title: "Price Per Day",
      type: "number",
    }),
    defineField({
      name: "originalPrice",
      title: "Original Price",
      type: "number",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "carType",
      title: "Car Type",
      type: "string",
      options: {
        list: ["SUV", "Sedan", "Convertible", "Hatchback", "Coupe"],
      },
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "reference",
      to: [{ type: "location" }],
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: ["Available", "Rented", "Maintenance"],
      },
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "bookings",
      title: "Bookings",
      type: "array",
      of: [{ type: "reference", to: [{ type: "booking" }] }],
    }),
    defineField({
      name: "reviews",
      title: "Reviews",
      type: "array",
      of: [{ type: "reference", to: [{ type: "review" }] }],
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "imageGallery",
      title: "Image Gallery",
      type: "array",
      of: [{ type: "image" }],
    }),
    defineField({
      name: "galleryTitle",
      title: "Gallery Title",
      type: "string",
      description: "Title for the image gallery (e.g., 'Sports car with the best design and acceleration')",
    }),
    defineField({
      name: "galleryDescription",
      title: "Gallery Description",
      type: "string",
      description:
        "Description for the image gallery (e.g., 'Safety and comfort while driving a futuristic and elegant sports car')",
    }),
  ],
})


