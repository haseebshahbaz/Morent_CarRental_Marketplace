import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { client } from "@/sanity/lib/client"
import { authOptions } from "../auth/[...nextauth]/auth-options"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
  }

  const body = await req.json()

  try {
    const customer = await client.fetch('*[_type == "customer" && customerId == $userId][0]', {
      userId: session.user.id,
    })

    if (!customer) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 })
    }

    const review = await client.create({
      _type: "review",
      rating: body.rating,
      comment: body.comment,
      customer: {
        _type: "reference",
        _ref: customer._id,
      },
      car: {
        _type: "reference",
        _ref: body.carId,
      },
      createdAt: new Date().toISOString(),
    })

    // Update the customer document with the new review
    await client
      .patch(customer._id)
      .setIfMissing({ reviews: [] })
      .insert("after", "reviews[-1]", [{ _type: "reference", _ref: review._id }])
      .commit()

    // Update the car document with the new review
    await client
      .patch(body.carId)
      .setIfMissing({ reviews: [] })
      .insert("after", "reviews[-1]", [{ _type: "reference", _ref: review._id }])
      .commit()

    return NextResponse.json({ message: "Review submitted successfully", review })
  } catch (error) {
    console.error("Error submitting review:", error)
    return NextResponse.json({ error: "Failed to submit review" }, { status: 500 })
  }
}


