import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { Suspense } from "react"
import { Navbar } from "@/components/landingpage/navbar"
import { Footer } from "@/components/landingpage/footer"
import { PaymentForm } from "@/components/payment/payment-form"
import { Loader } from "@/components/ui/loader"
import { client } from "@/sanity/lib/client"

async function getCar(id: string) {
  return client.fetch(`*[_type == "car" && _id == $id][0]`, { id })
}

export default async function PaymentPage({ params }: { params: { id: string } }) {
  const { id } = await params // Await params before using its properties
  const session = await getServerSession()
  if (!session) {
    redirect("/auth/signin?callbackUrl=/payment/" + id) // Use id directly now that params is awaited
  }

  const car = await getCar(id)

  if (!car) {
    redirect("/")
  }

  return (
    <div className="min-h-screen bg-[#F6F7F9]">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Payment for {car.name}</h1>
        <Suspense fallback={<Loader />}>
          <PaymentForm car={car} userId={session.user.id} />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
