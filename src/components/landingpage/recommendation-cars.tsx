"use client"
import { useState, useEffect } from "react"
import { CarCard } from "./car-card"
import { Skeleton } from "@/components/ui/skeleton"
import { client } from "../../sanity/lib/client"
import { urlForImage } from "../../sanity/lib/image"

interface Car {
  _id: string;
  name: string;
  type: string;
  image: string;
  fuelCapacity: string;
  transmission: string;
  seatingCapacity: string;
  pricePerDay: number;
  originalPrice?: number;
}

export function RecommendationCars() {
  const [cars, setCars] = useState<Car[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const result = await client.fetch('*[_type == "car" && "recommended" in tags]')
        setCars(result)
        setIsLoading(false)
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message) // Access `message` only if `err` is an instance of `Error`.
        } else {
          setError("An unknown error occurred.")
        }
        setIsLoading(false)
      }
    }

    fetchCars()
  }, [])

  if (error) return <div className="text-red-500">Error: {error}</div>

  return (
    <section>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-[32px] font-semibold">Recommendation Car</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading
          ? Array(4)
              .fill(0)
              .map((_, index) => <Skeleton key={`recommendation-skeleton-${index}`} className="h-[400px]" />)
          : cars.map((car) => <CarCard key={car._id} {...car} image={urlForImage(car.image).url()} />)}
      </div>
    </section>
  )
}
