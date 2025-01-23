import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

interface BookingConfirmationProps {
  booking: {
    bookingId: string
    startDate: string
    endDate: string
    totalAmount: number
    car: {
      name: string
    }
  }
}

export function BookingConfirmation({ booking }: BookingConfirmationProps) {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Booking Confirmed!</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">Thank you for your booking. Here are your details:</p>
        <ul className="space-y-2">
          <li>
            <strong>Booking ID:</strong> {booking.bookingId}
          </li>
          <li>
            <strong>Car:</strong> {booking.car.name}
          </li>
          <li>
            <strong>Start Date:</strong> {new Date(booking.startDate).toLocaleDateString()}
          </li>
          <li>
            <strong>End Date:</strong> {new Date(booking.endDate).toLocaleDateString()}
          </li>
          <li>
            <strong>Total Amount:</strong> ${booking.totalAmount.toFixed(2)}
          </li>
        </ul>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button asChild>
          <Link href="/profile">View Booking History</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/">Return to Home</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

