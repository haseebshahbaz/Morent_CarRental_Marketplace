import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { Navbar } from "@/components/landingpage/navbar"
import { client } from "@/sanity/lib/client"
import { CustomerProfileForm } from "@/components/profile/customer-profile-form"

async function getCustomerData(userId: string) {
  return client.fetch(`*[_type == "customer" && _id == $userId][0]{
    _id,
    name,
    email,
    image,
    phoneNumber,
    address,
    dateOfBirth,
    createdAt,
    "bookings": *[_type == "booking" && references(^._id)] | order(createdAt desc) {
      _id,
      startDate,
      endDate,
      "car": car->{ name, image }
    }
  }`, { userId: `customer-${userId}` })
}

export default async function ProfilePage() {
  const session = await getServerSession()

  if (!session?.user) {
    redirect("/auth/signin")
  }

  const customerData = await getCustomerData(session.user.id)

  return (
    <div className="min-h-screen bg-[#F6F7F9]">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Customer Profile</h1>
        {customerData ? (
          <CustomerProfileForm initialData={customerData} />
        ) : (
          <p>No customer data available. Please try again later.</p>
        )}
      </main>
    </div>
  )
}

