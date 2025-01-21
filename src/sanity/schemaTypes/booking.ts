import { defineField, defineType } from "sanity"

export const bookingType = defineType({
  name: "booking",
  title: "Booking",
  type: "document",
  fields: [
    defineField({
      name: "bookingId",
      title: "Booking ID",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "car",
      title: "Car",
      type: "reference",
      to: [{ type: "car" }],
    }),
    defineField({
      name: "customer",
      title: "Customer",
      type: "reference",
      to: [{ type: "customer" }],
    }),
    defineField({
      name: "startDate",
      title: "Start Date",
      type: "datetime",
    }),
    defineField({
      name: "endDate",
      title: "End Date",
      type: "datetime",
    }),
    defineField({
      name: "totalAmount",
      title: "Total Amount",
      type: "number",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: ["Pending", "Confirmed", "Completed", "Cancelled"],
      },
    }),
    defineField({
      name: "paymentStatus",
      title: "Payment Status",
      type: "string",
      options: {
        list: ["Paid", "Pending", "Refunded"],
      },
    }),
  ],
})

