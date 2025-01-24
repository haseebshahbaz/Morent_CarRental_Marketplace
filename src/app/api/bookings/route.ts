import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { client } from "@/sanity/lib/client"
import { authOptions } from "../auth/[...nextauth]/auth-options"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const body = await req.json()
    if (!body.carId || !body.startDate || !body.endDate || !body.totalAmount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const customerQuery = `*[_type == "customer" && customerId == $customerId][0]`
    const customer = await client.fetch(customerQuery, {
      customerId: session.user.id,
    })

    if (!customer) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 })
    }

    // Check for existing bookings
    const existingBookingsQuery = `
      *[_type == "booking" && car._ref == $carId && 
        ((startDate <= $startDate && endDate >= $startDate) || 
         (startDate <= $endDate && endDate >= $endDate) ||
         (startDate >= $startDate && endDate <= $endDate))]
    `
    const existingBookings = await client.fetch(existingBookingsQuery, {
      carId: body.carId,
      startDate: new Date(body.startDate).toISOString(),
      endDate: new Date(body.endDate).toISOString(),
    })

    if (existingBookings.length > 0) {
      return NextResponse.json({ error: "Car is not available for the selected dates" }, { status: 409 })
    }

    const booking = await client.create({
      _type: "booking",
      bookingId: `BK-${Date.now()}`,
      customer: {
        _type: "reference",
        _ref: customer._id,
      },
      car: {
        _type: "reference",
        _ref: body.carId,
      },
      startDate: new Date(body.startDate).toISOString(),
      endDate: new Date(body.endDate).toISOString(),
      totalAmount: body.totalAmount,
      status: "Confirmed",
      paymentStatus: "Pending",
    })

    // Update car document with the new booking
    await client
      .patch(body.carId)
      .setIfMissing({ bookings: [] })
      .insert("after", "bookings[-1]", [{ _type: "reference", _ref: booking._id }])
      .commit()

    // Update customer document with the new booking
    await client
      .patch(customer._id)
      .setIfMissing({ bookings: [] })
      .insert("after", "bookings[-1]", [{ _type: "reference", _ref: booking._id }])
      .commit()

    return NextResponse.json({
      message: "Booking created successfully",
      booking,
    })
  } catch (error) {
    console.error("Error creating booking:", error)
    return NextResponse.json(
      {
        error: "Failed to create booking",
        message: error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 },
    )
  }
}

