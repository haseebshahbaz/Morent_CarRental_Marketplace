"use client"

import { useState } from "react"

interface StarRatingProps {
  rating: number
  size?: "sm" | "md"
  onRatingChange?: (rating: number) => void
  editable?: boolean
}

export function StarRating({ rating: initialRating, size = "sm", onRatingChange, editable = false }: StarRatingProps) {
  const [rating, setRating] = useState(initialRating)

  const handleRatingChange = (newRating: number) => {
    if (editable) {
      setRating(newRating)
      if (onRatingChange) {
        onRatingChange(newRating)
      }
    }
  }

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`${
            star <= rating ? "text-[#FFC107]" : "text-[#90A3BF]"
          } ${size === "sm" ? "w-4 h-4" : "w-5 h-5"} ${editable ? "cursor-pointer" : ""}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          onClick={() => handleRatingChange(star)}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

