"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

interface RentNowButtonProps {
  carId: string
  isAuthenticated: boolean
}

export function RentNowButton({ carId, isAuthenticated }: RentNowButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleRentNow = async () => {
    setIsLoading(true)
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to book a car.",
        variant: "destructive",
      })
      router.push(`/auth/signin?callbackUrl=/cars/${carId}`)
    } else {
      router.push(`/payment/${carId}`)
    }
  }

  return (
    <Button
      className="bg-[#3563E9] hover:bg-[#2748BA] h-10 md:h-14 px-4 md:px-8 text-sm md:text-base"
      onClick={handleRentNow}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading...
        </>
      ) : (
        "Rent Now"
      )}
    </Button>
  )
}

