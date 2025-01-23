import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { client } from "@/sanity/lib/client"
import { authOptions } from "../auth/[...nextauth]/route"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    console.log("Session in API:", session)

    if (!session?.user?.id) {
      console.error("No user ID in session")
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const body = await req.json()
    console.log("Request body:", body)

    if (!body.carId || !body.startDate || !body.endDate || !body.totalAmount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Fetch customer using Google ID
    const customerQuery = `*[_type == "customer" && customerId == $customerId][0]`
    const customer = await client.fetch(customerQuery, {
      customerId: session.user.id,
    })

    console.log("Found customer:", customer)

    if (!customer) {
      console.error("Customer not found for ID:", session.user.id)
      return NextResponse.json({ error: "Customer not found" }, { status: 404 })
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
      customerInfo: body.customerInfo,
    })

    console.log("Created booking:", booking)

    // Update car status
    await client.patch(body.carId).set({ status: "rented" }).commit()

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

