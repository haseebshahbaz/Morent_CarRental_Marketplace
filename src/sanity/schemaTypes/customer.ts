// import { defineField, defineType } from "sanity"

// export const customerType = defineType({
//   name: "customer",
//   title: "Customer",
//   type: "document",
//   fields: [
//     defineField({
//       name: "customerId",
//       title: "Customer ID",
//       type: "string",
//       validation: (Rule) => Rule.required(),
//     }),
//     defineField({
//       name: "name",
//       title: "Name",
//       type: "string",
//     }),
//     defineField({
//       name: "email",
//       title: "Email",
//       type: "string",
//     }),
//     defineField({
//       name: "profilePicture",
//       title: "Profile Picture",
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
//       type: "object",
//       fields: [
//         { name: "street", type: "string", title: "Street" },
//         { name: "city", type: "string", title: "City" },
//         { name: "state", type: "string", title: "State" },
//         { name: "zipCode", type: "string", title: "ZIP Code" },
//         { name: "country", type: "string", title: "Country" },
//       ],
//     }),
//     defineField({
//       name: "drivingLicense",
//       title: "Driving License",
//       type: "object",
//       fields: [
//         { name: "number", type: "string", title: "License Number" },
//         { name: "expiryDate", type: "date", title: "Expiry Date" },
//       ],
//     }),
//     defineField({
//       name: "role",
//       title: "Role",
//       type: "string",
//       options: {
//         list: ["Customer", "Admin"],
//       },
//       initialValue: "Customer",
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
//   ],
// })


import { defineField, defineType } from "sanity"

export const customerType = defineType({
  name: "customer",
  title: "Customer",
  type: "document",
  fields: [
    defineField({
      name: "customerId",
      title: "Customer ID",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "profilePicture",
      title: "Profile Picture",
      type: "string", // Changed from "image" to "string"
    }),
    defineField({
      name: "phoneNumber",
      title: "Phone Number",
      type: "string",
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "object",
      fields: [
        { name: "street", type: "string", title: "Street" },
        { name: "city", type: "string", title: "City" },
        { name: "state", type: "string", title: "State" },
        { name: "zipCode", type: "string", title: "ZIP Code" },
        { name: "country", type: "string", title: "Country" },
      ],
    }),
    defineField({
      name: "drivingLicense",
      title: "Driving License",
      type: "object",
      fields: [
        { name: "number", type: "string", title: "License Number" },
        { name: "expiryDate", type: "date", title: "Expiry Date" },
      ],
    }),
    defineField({
      name: "dateOfBirth",
      title: "Date of Birth",
      type: "date",
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      options: {
        list: ["Customer", "Admin"],
      },
      initialValue: "Customer",
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
  ],
})

