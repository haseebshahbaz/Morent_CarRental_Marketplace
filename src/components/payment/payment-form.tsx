"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { FormInput } from "./form-input"
import { RentalInfo } from "./rental-info"
import { PaymentMethod } from "./payment-method"
import { RentalSummary } from "./rental-summary"
import { toast } from "@/hooks/use-toast"
import { urlForImage } from "@/sanity/lib/image"
import { BookingConfirmation } from "@/components/payment/booking-confirmation"


interface PaymentFormProps {
  car: any
}

export function PaymentForm({ car }: PaymentFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    startDate: "",
    endDate: "",
    agreeToMarketing: false,
    agreeToTerms: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [bookingConfirmation, setBookingConfirmation] = useState(null)
  const router = useRouter()
  const { data: session, status } = useSession()

  useEffect(() => {
    // Log session when it changes
    console.log("Current session:", session)
  }, [session])

  useEffect(() => {
    if (session?.user) {
      setFormData((prevData) => ({
        ...prevData,
        name: session.user.name || "",
      }))
    }
  }, [session])

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (status === "unauthenticated") {
    router.push("/auth/signin")
    return null
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value
    setFormData({ ...formData, [e.target.name]: value })
  }

  const handleDateChange = (type: "startDate" | "endDate", date: string) => {
    setFormData((prev) => ({ ...prev, [type]: date }))
  }

  const calculateDays = (start: string, end: string) => {
    if (!start || !end) return 1
    const startDate = new Date(start)
    const endDate = new Date(end)
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays || 1
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (!session?.user?.id) {
        throw new Error("Please sign in to complete your booking")
      }

      if (!formData.startDate || !formData.endDate) {
        throw new Error("Please select both pick-up and drop-off dates")
      }

      if (!formData.agreeToTerms) {
        throw new Error("Please agree to the terms and conditions")
      }

      const payload = {
        carId: car._id,
        startDate: formData.startDate,
        endDate: formData.endDate,
        totalAmount: car.pricePerDay * calculateDays(formData.startDate, formData.endDate),
        customerInfo: {
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
        },
      }

      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to create booking")
      }

      setBookingConfirmation({
        ...data.booking,
        car: { name: car.name },
      })
    } catch (error) {
      console.error("Error creating booking:", error)
      toast({
        title: "Booking Failed",
        description:
          error instanceof Error ? error.message : "There was an error processing your booking. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (bookingConfirmation) {
    return <BookingConfirmation booking={bookingConfirmation} />
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="bg-white rounded-[10px] p-6">
        <h2 className="text-[20px] font-semibold mb-4">Billing Info</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <FormInput label="Name" placeholder="Your name" name="name" value={formData.name} onChange={handleChange} />
          <FormInput
            label="Phone Number"
            placeholder="Phone number"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
          />
          <FormInput
            label="Address"
            placeholder="Address"
            name="address"
            className="md:col-span-2"
            value={formData.address}
            onChange={handleChange}
          />
          <FormInput
            label="Town/City"
            placeholder="Town or city"
            name="city"
            className="md:col-span-2"
            value={formData.city}
            onChange={handleChange}
          />
        </div>
      </div>

      <RentalInfo
        onStartDateChange={(date) => handleDateChange("startDate", date)}
        onEndDateChange={(date) => handleDateChange("endDate", date)}
      />

      <PaymentMethod />

      <div className="bg-white rounded-[10px] p-6">
        <h2 className="text-[20px] font-semibold mb-4">Confirmation</h2>
        <div className="space-y-4">
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="agreeToMarketing"
              checked={formData.agreeToMarketing}
              onChange={handleChange}
              className="mt-1"
            />
            <span className="text-[14px] text-[#1A202C]">
              I agree with sending marketing and newsletter emails. No spam, promised!
            </span>
          </label>
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className="mt-1"
            />
            <span className="text-[14px] text-[#1A202C]">
              I agree with our terms and conditions and privacy policy.
            </span>
          </label>
        </div>
      </div>

      <RentalSummary
        carName={car.name}
        carImage={urlForImage(car.image).url()}
        rating={4}
        reviewCount={440}
        subtotal={car.pricePerDay * calculateDays(formData.startDate, formData.endDate)}
        tax={0}
      />

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Processing..." : "Confirm Booking"}
      </Button>
    </form>
  )
}

