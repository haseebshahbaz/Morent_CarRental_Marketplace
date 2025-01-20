import { defineField, defineType } from "sanity"
import { PinIcon } from "@sanity/icons"

export const locationType = defineType({
  name: "location",
  title: "Location",
  type: "document",
  icon: PinIcon,
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Location Name",
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
        { name: "country", type: "string", title: "Country" },
      ],
    }),
    defineField({
      name: "coordinates",
      type: "geopoint",
      title: "Coordinates",
    }),
    defineField({
      name: "availableCars",
      type: "array",
      title: "Available Cars",
      of: [{ type: "reference", to: [{ type: "car" }] }],
      validation: (Rule) => Rule.unique(),
    }),
  ],
  hooks: {
    afterChange: async (params: any) => {
      const { document, getClient } = params
      const client = getClient({ apiVersion: "2023-05-03" })

      if (document.availableCars) {
        for (const carRef of document.availableCars) {
          await client
            .patch(carRef._ref)
            .set({ location: { _type: "reference", _ref: document._id } })
            .commit()
        }
      }
    },
  },
})

