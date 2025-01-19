'use client'
import { useState, useEffect } from 'react'
import { CarCard } from "./car-card"
import { Loader } from "@/components/ui/loader"
import { client } from '../../sanity/lib/client'
import { urlForImage } from '../../sanity/lib/image'

export function RecommendationCars() {
  const [cars, setCars] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const result = await client.fetch('*[_type == "car" && "recommended" in tags]')
        setCars(result)
        setIsLoading(false)
      } catch (err) {
        setError(err.message)
        setIsLoading(false)
      }
    }

    fetchCars()
  }, [])

  if (isLoading) return <Loader />
  if (error) return <div>Error: {error}</div>

  return (
    <section>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-[32px] font-semibold">Recommendation Car</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cars.map((car) => (
          <CarCard 
            key={car._id} 
            {...car}
            image={urlForImage(car.image).url()}
          />
        ))}
      </div>
    </section>
  )
}

