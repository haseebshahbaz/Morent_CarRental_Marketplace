"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ProfileUpdateForm } from "./profile-update-form"
import { BookingHistory } from "@/components/payment/booking-history"
import { ProfileCompletionPrompt } from "./profile-completion-prompt"
import { urlForImage } from "@/sanity/lib/image"

type CustomerData = {
  customerId: string
  name: string
  email: string
  profilePicture: string
  phoneNumber?: string
  address?: {
    street?: string
    city?: string
    state?: string
    zipCode?: string
    country?: string
  }
  drivingLicense?: {
    number?: string
    expiryDate?: string
  }
  role: string
  bookings: Array<{
    _id: string
    bookingId: string
    startDate: string
    endDate: string
    totalAmount: number
    status: string
    car: {
      name: string
      image: string
    }
  }>
}

export function ProfileDashboard({ customerData }: { customerData: CustomerData }) {
  const [isEditing, setIsEditing] = useState(false)
  const [showCompletionPrompt, setShowCompletionPrompt] = useState(isProfileIncomplete(customerData))

  function isProfileIncomplete(data: CustomerData) {
    return !data.phoneNumber || !data.address?.street || !data.drivingLicense?.number
  }

  return (
    <div className="space-y-6">
      {showCompletionPrompt && <ProfileCompletionPrompt onComplete={() => setIsEditing(true)} />}

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Welcome, {customerData.name}!</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center space-x-4">
          <Image
            src={urlForImage(customerData.profilePicture).url() || "/placeholder.svg"}
            alt={customerData.name}
            width={100}
            height={100}
            className="rounded-full"
          />
          <div>
            <p className="text-lg font-semibold">{customerData.email}</p>
            <p className="text-sm text-gray-500">
              Member since: {new Date(customerData.customerId.split("-")[1]).toLocaleDateString()}
            </p>
            {!isEditing && (
              <Button onClick={() => setIsEditing(true)} className="mt-2">
                Edit Profile
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {isEditing ? (
        <ProfileUpdateForm
          initialData={customerData}
          onCancel={() => setIsEditing(false)}
          onSuccess={() => {
            setIsEditing(false)
            setShowCompletionPrompt(false)
          }}
        />
      ) : (
        <BookingHistory bookings={customerData.bookings} />
      )}
    </div>
  )
}

