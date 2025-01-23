"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"

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
  dateOfBirth?: string
}

interface ProfileUpdateFormProps {
  initialData: CustomerData
  onCancel: () => void
  onSuccess: () => void
}

export function ProfileUpdateForm({ initialData, onCancel, onSuccess }: ProfileUpdateFormProps) {
  const [formData, setFormData] = useState<CustomerData>(initialData)
  const [isLoading, setIsLoading] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value,
      },
    }))
  }

  const handleLicenseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      drivingLicense: {
        ...prev.drivingLicense,
        [name]: value,
      },
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      let imageUrl = formData.profilePicture

      if (imageFile) {
        const imageFormData = new FormData()
        imageFormData.append("image", imageFile)

        const imageResponse = await fetch("/api/upload-image", {
          method: "POST",
          body: imageFormData,
        })

        if (!imageResponse.ok) {
          throw new Error("Failed to upload image")
        }

        const imageData = await imageResponse.json()
        imageUrl = imageData.imageUrl
      }

      const response = await fetch("/api/update-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, profilePicture: imageUrl, dateOfBirth: formData.dateOfBirth }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to update profile")
      }

      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      })
      router.refresh()
      onSuccess()
    } catch (error) {
      console.error("Error updating profile:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Update Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <Image
              src={imageFile ? URL.createObjectURL(imageFile) : formData.profilePicture || "/placeholder.svg"}
              alt={formData.name}
              width={100}
              height={100}
              className="rounded-full"
            />
            <Input type="file" accept="image/*" onChange={handleImageChange} />
          </div>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" value={formData.name || ""} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" value={formData.email || ""} onChange={handleChange} disabled />
          </div>
          <div>
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input id="phoneNumber" name="phoneNumber" value={formData.phoneNumber || ""} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="street">Street</Label>
            <Input id="street" name="street" value={formData.address?.street || ""} onChange={handleAddressChange} />
          </div>
          <div>
            <Label htmlFor="city">City</Label>
            <Input id="city" name="city" value={formData.address?.city || ""} onChange={handleAddressChange} />
          </div>
          <div>
            <Label htmlFor="state">State</Label>
            <Input id="state" name="state" value={formData.address?.state || ""} onChange={handleAddressChange} />
          </div>
          <div>
            <Label htmlFor="zipCode">ZIP Code</Label>
            <Input id="zipCode" name="zipCode" value={formData.address?.zipCode || ""} onChange={handleAddressChange} />
          </div>
          <div>
            <Label htmlFor="country">Country</Label>
            <Input id="country" name="country" value={formData.address?.country || ""} onChange={handleAddressChange} />
          </div>
          <div>
            <Label htmlFor="licenseNumber">Driving License Number</Label>
            <Input
              id="licenseNumber"
              name="number"
              value={formData.drivingLicense?.number || ""}
              onChange={handleLicenseChange}
            />
          </div>
          <div>
            <Label htmlFor="licenseExpiry">Driving License Expiry Date</Label>
            <Input
              id="licenseExpiry"
              name="expiryDate"
              type="date"
              value={formData.drivingLicense?.expiryDate || ""}
              onChange={handleLicenseChange}
            />
          </div>
          <div>
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <Input
              id="dateOfBirth"
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth || ""}
              onChange={handleChange}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Updating..." : "Update Profile"}
        </Button>
      </div>
    </form>
  )
}

