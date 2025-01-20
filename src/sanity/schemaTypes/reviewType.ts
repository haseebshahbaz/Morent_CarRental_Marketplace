import { defineField, defineType } from "sanity"
import { StarIcon } from "@sanity/icons"

export const reviewType = defineType({
  name: "review",
  title: "Review",
  type: "document",
  icon: StarIcon,
  fields: [
    defineField({
      name: "rating",
      type: "number",
      title: "Rating",
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
    defineField({
      name: "comment",
      type: "text",
      title: "Comment",
    }),
    defineField({
      name: "customer",
      type: "reference",
      to: [{ type: "customer" }],
      title: "Customer",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "car",
      type: "reference",
      to: [{ type: "car" }],
      title: "Car",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "booking",
      type: "reference",
      to: [{ type: "booking" }],
      title: "Booking",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "createdAt",
      type: "datetime",
      title: "Created At",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: "customer.name",
      car: "car.name",
      rating: "rating",
    },
    prepare({ title, car, rating }) {
      return {
        title: `${title}'s Review`,
        subtitle: `${car} - ${rating} stars`,
      }
    },
  },
})

export const reviewCreateHook = async (params: any) => {
  const { document, getClient } = params
  const client = getClient({ apiVersion: "2023-05-03" })

  if (document._type === "review") {
    await client
      .patch(document.car._ref)
      .setIfMissing({ reviews: [] })
      .insert("after", "reviews[-1]", [{ _type: "reference", _ref: document._id }])
      .commit()
  }
}

