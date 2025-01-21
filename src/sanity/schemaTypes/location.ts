import { defineField, defineType } from "sanity"

export const locationType = defineType({
  name: "location",
  title: "Location",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
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
      name: "coordinates",
      title: "Coordinates",
      type: "geopoint",
    }),
    defineField({
      name: "availableCars",
      title: "Available Cars",
      type: "array",
      of: [{ type: "reference", to: [{ type: "car" }] }],
    }),
  ],
})

