import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { urlForImage } from "@/sanity/lib/image"

type Booking = {
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
}

interface BookingHistoryProps {
  bookings: Booking[]
}

export function BookingHistory({ bookings }: BookingHistoryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Booking History</CardTitle>
      </CardHeader>
      <CardContent>
        {bookings.length > 0 ? (
          <ul className="space-y-4">
            {bookings.map((booking) => (
              <li key={booking._id} className="border-b pb-4 last:border-b-0">
                <div className="flex items-center space-x-4">
                  <Image
                    src={urlForImage(booking.car.image).url() || "/placeholder.svg"}
                    alt={booking.car.name}
                    width={80}
                    height={80}
                    className="rounded-md"
                  />
                  <div>
                    <h3 className="font-semibold">{booking.car.name}</h3>
                    <p className="text-sm text-gray-500">Booking ID: {booking.bookingId}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(booking.startDate).toLocaleDateString()} -{" "}
                      {new Date(booking.endDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500">Total: PKR {booking.totalAmount.toFixed(2)}</p>
                    <p
                      className="text-sm font-semibold"
                      style={{ color: booking.status === "Confirmed" ? "green" : "orange" }}
                    >
                      Status: {booking.status}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No booking history available.</p>
        )}
      </CardContent>
    </Card>
  )
}

