import { defineField, defineType } from "sanity"
import { CalendarIcon } from "@sanity/icons"

export const bookingType = defineType({
  name: "booking",
  title: "Booking",
  type: "document",
  icon: CalendarIcon,
  fields: [
    defineField({
      name: "bookingId",
      type: "string",
      title: "Booking ID",
    }),
    defineField({
      name: "car",
      type: "reference",
      to: [{ type: "car" }],
      title: "Car",
    }),
    defineField({
      name: "customer",
      type: "reference",
      to: [{ type: "customer" }],
      title: "Customer",
    }),
    defineField({
      name: "startDate",
      type: "datetime",
      title: "Start Date",
    }),
    defineField({
      name: "endDate",
      type: "datetime",
      title: "End Date",
    }),
    defineField({
      name: "totalAmount",
      type: "number",
      title: "Total Amount",
    }),
    defineField({
      name: "status",
      type: "string",
      title: "Booking Status",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Confirmed", value: "confirmed" },
          { title: "Completed", value: "completed" },
          { title: "Cancelled", value: "cancelled" },
        ],
      },
    }),
    defineField({
      name: "paymentStatus",
      type: "string",
      title: "Payment Status",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Paid", value: "paid" },
          { title: "Refunded", value: "refunded" },
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: "bookingId",
      customer: "customer.name",
      car: "car.name",
      status: "status",
    },
    prepare({ title, customer, car, status }) {
      return {
        title: `Booking ${title}`,
        subtitle: `${customer} - ${car} (${status})`,
      }
    },
  },
})

export const bookingCreateHook = async (params: any) => {
  const { document, getClient } = params
  const client = getClient({ apiVersion: "2023-05-03" })

  if (document._type === "booking") {
    await client
      .patch(document.car._ref)
      .setIfMissing({ bookings: [] })
      .insert("after", "bookings[-1]", [{ _type: "reference", _ref: document._id }])
      .set({ status: document.status === "confirmed" ? "rented" : "available" })
      .commit()
  }
}

