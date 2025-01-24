import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { client } from "@/sanity/lib/client"
import { authOptions } from "../auth/[...nextauth]/auth-options"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
  }

  const formData = await req.formData()
  const file = formData.get("image") as File

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
  }

  try {
    // First, find the customer document
    const customer = await client.fetch('*[_type == "customer" && customerId == $userId][0]', {
      userId: session.user.id,
    })

    if (!customer) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 })
    }

    // Upload the image
    const asset = await client.assets.upload("image", file)

    // Update the customer document with the new image
    await client
      .patch(customer._id)
      .set({
        profilePicture: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: asset._id,
          },
        },
      })
      .commit()

    return NextResponse.json({ imageUrl: asset.url })
  } catch (error) {
    console.error("Error uploading image:", error)
    return NextResponse.json({ error: "Failed to upload image" }, { status: 500 })
  }
}

