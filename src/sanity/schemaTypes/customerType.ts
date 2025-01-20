// import { defineField, defineType } from "sanity"

// export const customerType = defineType({
//   name: "customer",
//   title: "Customer",
//   type: "document",
//   fields: [
//     defineField({
//       name: "name",
//       title: "Name",
//       type: "string",
//       validation: (Rule) => Rule.required(),
//     }),
//     defineField({
//       name: "email",
//       title: "Email",
//       type: "string",
//       validation: (Rule) => Rule.required().email(),
//     }),
//     defineField({
//       name: "image",
//       title: "Profile Image",
//       type: "url",
//     }),
//     defineField({
//       name: "phoneNumber",
//       title: "Phone Number",
//       type: "string",
//     }),
//     defineField({
//       name: "address",
//       title: "Address",
//       type: "string",
//     }),
//     defineField({
//       name: "dateOfBirth",
//       title: "Date of Birth",
//       type: "date",
//     }),
//     defineField({
//       name: "createdAt",
//       title: "Created At",
//       type: "datetime",
//       initialValue: () => new Date().toISOString(),
//     }),
//     defineField({
//       name: "bookings",
//       type: "array",
//       title: "Bookings",
//       of: [{ type: "reference", to: [{ type: "booking" }] }],
//       validation: (Rule) => Rule.unique(),
//     }),
//     defineField({
//       name: "reviews",
//       type: "array",
//       title: "Reviews",
//       of: [{ type: "reference", to: [{ type: "review" }] }],
//       validation: (Rule) => Rule.unique(),
//     }),
//   ],
//   preview: {
//     select: {
//       title: "name",
//       subtitle: "email",
//     },
//   },
// })

import { defineField, defineType } from "sanity"
import { UserIcon } from "@sanity/icons"

export const customerType = defineType({
  name: "customer",
  title: "Customer",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Full Name",
    }),
    defineField({
      name: "email",
      type: "string",
      title: "Email",
    }),
    defineField({
      name: "phone",
      type: "string",
      title: "Phone Number",
    }),
    defineField({
      name: "address",
      type: "object",
      title: "Address",
      fields: [
        { name: "street", type: "string", title: "Street" },
        { name: "city", type: "string", title: "City" },
        { name: "state", type: "string", title: "State" },
        { name: "zipCode", type: "string", title: "ZIP Code" },
      ],
    }),
    defineField({
      name: "drivingLicense",
      type: "object",
      title: "Driving License",
      fields: [
        { name: "number", type: "string", title: "License Number" },
        { name: "expiryDate", type: "date", title: "Expiry Date" },
      ],
    }),
    defineField({
      name: "bookings",
      type: "array",
      title: "Bookings",
      of: [{ type: "reference", to: [{ type: "booking" }] }],
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      initialValue: "customer",
      options: {
        list: [
          { title: "Customer", value: "customer" },
          { title: "Admin", value: "admin" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
})

