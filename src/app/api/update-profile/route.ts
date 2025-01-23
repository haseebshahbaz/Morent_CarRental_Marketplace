// import { NextResponse } from "next/server"
// import { getServerSession } from "next-auth/next"
// import { client } from "@/sanity/lib/client"
// import { authOptions } from "../auth/[...nextauth]/route"

// export async function POST(req: Request) {
//   const session = await getServerSession(authOptions)

//   if (!session?.user) {
//     return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
//   }

//   const body = await req.json()

//   try {
//     const customer = await client.fetch('*[_type == "customer" && customerId == $userId][0]', {
//       userId: session.user.id,
//     })

//     if (!customer) {
//       return NextResponse.json({ error: "Customer not found" }, { status: 404 })
//     }

//     await client
//       .patch(customer._id)
//       .set({
//         name: body.name,
//         phoneNumber: body.phoneNumber,
//         address: body.address,
//         drivingLicense: body.drivingLicense,
//         dateOfBirth: body.dateOfBirth,
//       })
//       .commit()

//     return NextResponse.json({ message: "Profile updated successfully" })
//   } catch (error) {
//     console.error("Error updating profile:", error)
//     return NextResponse.json({ error: "Failed to update profile" }, { status: 500 })
//   }
// }
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { client } from "@/sanity/lib/client"
import { authOptions } from "../auth/[...nextauth]/route"

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

    await client
      .patch(customer._id)
      .set({
        name: body.name,
        phoneNumber: body.phoneNumber,
        address: body.address,
        drivingLicense: body.drivingLicense,
        profilePicture: body.profilePicture,
      })
      .commit()

    return NextResponse.json({ message: "Profile updated successfully" })
  } catch (error) {
    console.error("Error updating profile:", error)
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 })
  }
}


