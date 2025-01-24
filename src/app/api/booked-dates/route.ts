import { NextResponse } from "next/server"
import { client } from "@/sanity/lib/client"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const carId = searchParams.get("carId")

  if (!carId) {
    return NextResponse.json({ error: "Car ID is required" }, { status: 400 })
  }

  try {
    const bookedDates = await client.fetch(
      `
      *[_type == "booking" && car._ref == $carId] {
        startDate,
        endDate
      }
    `,
      { carId },
    )

    // Generate an array of all booked dates
    const allBookedDates = bookedDates.flatMap((booking) => {
      const start = new Date(booking.startDate)
      const end = new Date(booking.endDate)
      const dates = []
      for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
        dates.push(new Date(date))
      }
      return dates
    })

    return NextResponse.json({ bookedDates: allBookedDates })
  } catch (error) {
    console.error("Error fetching booked dates:", error)
    return NextResponse.json({ error: "Failed to fetch booked dates" }, { status: 500 })
  }
}

