import { defineField, defineType } from "sanity"

export const reviewType = defineType({
  name: "review",
  title: "Review",
  type: "document",
  fields: [
    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
    defineField({
      name: "comment",
      title: "Comment",
      type: "text",
    }),
    defineField({
      name: "customer",
      title: "Customer",
      type: "reference",
      to: [{ type: "customer" }],
    }),
    defineField({
      name: "car",
      title: "Car",
      type: "reference",
      to: [{ type: "car" }],
    }),
    defineField({
      name: "booking",
      title: "Booking",
      type: "reference",
      to: [{ type: "booking" }],
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
    }),
  ],
})

