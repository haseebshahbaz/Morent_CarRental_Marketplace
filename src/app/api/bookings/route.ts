import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { client } from "@/sanity/lib/client"

export async function POST(req: Request) {
  try {
    const session = await getServerSession()

    if (!session?.user?.id) {
      console.error("No session, user, or user ID found")
      return NextResponse.json({ error: "Not authenticated or missing user ID" }, { status: 401 })
    }

    console.log("Session found:", JSON.stringify(session, null, 2))

    const body = await req.json()

    if (!body.carId || !body.startDate || !body.endDate || !body.totalAmount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const startDate = new Date(body.startDate)
    const endDate = new Date(body.endDate)

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return NextResponse.json({ error: "Invalid date format" }, { status: 400 })
    }

    if (startDate > endDate) {
      return NextResponse.json({ error: "Start date must be before end date" }, { status: 400 })
    }

    if (startDate < new Date()) {
      return NextResponse.json({ error: "Start date cannot be in the past" }, { status: 400 })
    }

    // Fetch the customer using the user ID
    const customerQuery = `*[_type == "customer" && customerId == $customerId][0]`
    const customer = await client.fetch(customerQuery, {
      customerId: session.user.id,
    })

    if (!customer) {
      console.error("Customer not found for user ID:", session.user.id)
      return NextResponse.json({ error: "Customer not found" }, { status: 404 })
    }

    const booking = await client.create({
      _type: "booking",
      customer: {
        _type: "reference",
        _ref: customer._id,
      },
      car: {
        _type: "reference",
        _ref: body.carId,
      },
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      totalAmount: body.totalAmount,
      status: "confirmed",
      paymentStatus: "pending",
      customerInfo: body.customerInfo,
    })

    await client.patch(body.carId).set({ status: "rented" }).commit()

    return NextResponse.json({ message: "Booking created successfully", booking })
  } catch (error) {
    console.error("Error creating booking:", error)

    if (error instanceof Error && "statusCode" in error && error.statusCode === 409) {
      return NextResponse.json(
        {
          error: "Failed to create booking",
          message: "Invalid customer reference. Please try signing in again.",
        },
        { status: 409 },
      )
    }

    return NextResponse.json(
      {
        error: "Failed to create booking",
        message: error instanceof Error ? error.message : "Unknown error occurred",
        details: error instanceof Error ? error.stack : null,
      },
      { status: 500 },
    )
  }
}

