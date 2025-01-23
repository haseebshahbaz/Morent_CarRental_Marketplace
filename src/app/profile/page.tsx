import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { Navbar } from "@/components/landingpage/navbar"
import { Footer } from "@/components/landingpage/footer"
import { ProfileForm } from "@/components/profile/customer-profile-form"
import { client } from "@/sanity/lib/client"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { ProfileDashboard } from "@/components/profile/profile-dashboard"


async function getCustomerData(userId: string) {
  return client.fetch(
    `*[_type == "customer" && customerId == $userId][0]{
      customerId,
      name,
      email,
      profilePicture,
      phoneNumber,
      address,
      drivingLicense,
      role,
      "bookings": *[_type == "booking" && references(^._id)] | order(startDate desc) {
        _id,
        bookingId,
        startDate,
        endDate,
        totalAmount,
        status,
        "car": car->{ name, image }
      }
    }`,
    { userId },
  )
}

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect("/auth/signin")
  }

  const customerData = await getCustomerData(session.user.id)

  if (!customerData) {
    return <div>No customer data found. Please contact support.</div>
  }

  return (
    <div className="min-h-screen bg-[#F6F7F9]">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <ProfileDashboard customerData={customerData} />
      </main>
      <Footer />
    </div>
  )
}

