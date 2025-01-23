import { StarRating } from "./star-rating"
import Image from "next/image"

interface ReviewCardProps {
  name: string
  avatar: string
  date: string
  rating: number
  comment: string
}

export function ReviewCard({ name, avatar, date, rating, comment }: ReviewCardProps) {
  return (
    <div className="py-6">
      <div className="flex items-center mb-4">
      <Image
  src={avatar || "/placeholder.svg"}
  alt={name}
  width={40}
  height={40}
  className="rounded-full mr-4"
/>

        <div>
          <h4 className="font-semibold">{name}</h4>
          <p className="text-sm text-gray-500">{date}</p>
        </div>
      </div>
      <StarRating rating={rating} size="sm" />
      <p className="mt-2 text-gray-600">{comment}</p>
    </div>
  )
}

