"use client"
import { useState, useEffect, useCallback } from "react"
import { useInView } from "react-intersection-observer"
import { Navbar } from "@/components/landingpage/navbar"
import { Footer } from "@/components/landingpage/footer"
import { CarCard } from "@/components/landingpage/car-card"
import { Loader } from "@/components/ui/loader"
import { client } from "../../sanity/lib/client"
import { urlForImage } from "../../sanity/lib/image"
import { Skeleton } from "@/components/ui/skeleton"

type Car = {
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

const ITEMS_PER_PAGE = 9

export default function CategoryPage() {
  const [cars, setCars] = useState<Car[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)

  const { ref, inView } = useInView({
    threshold: 0,
  })

  const fetchCars = useCallback(async () => {
    setIsLoading(true)
    try {
      const result = await getCars(page, ITEMS_PER_PAGE)
      setCars((prevCars) => {
        const existingIds = prevCars.map((car) => car._id)
        const newCars = (result.cars as Car[]).filter((car: Car) => !existingIds.includes(car._id))
        return [...prevCars, ...newCars]
      })
      
      setHasMore(result.cars.length === ITEMS_PER_PAGE)
    } catch (error) {
      console.error("Error fetching cars:", error)
    }
    setIsLoading(false)
  }, [page])

  useEffect(() => {
    fetchCars()
  }, [fetchCars])

  useEffect(() => {
    if (!isLoading && inView && hasMore) {
      setPage((prevPage) => prevPage + 1)
    }
  }, [inView, hasMore, isLoading])

  return (
    <div className="min-h-screen bg-[#F6F7F9]">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-8">
          {/* Informational Guide Section */}
          <div className="bg-white rounded-[10px] p-6">
            <h2 className="text-2xl font-semibold mb-4">Helpful Tips for Renting a Car</h2>
            <ul className="space-y-4 text-gray-700">
              <li>
                🚗 <strong>Choose the Right Car:</strong> Consider the number of passengers, luggage space, and the type of trip you’re planning.
              </li>
              <li>
                💰 <strong>Check Pricing:</strong> Look for the best deals and calculate the total cost, including taxes and any additional fees.
              </li>
              <li>
                📅 <strong>Plan Ahead:</strong> Book your car in advance to ensure availability, especially during peak seasons.
              </li>
              <li>
                🛡️ <strong>Review Policies:</strong> Understand the terms, including fuel policies, mileage limits, and insurance options.
              </li>
              <li>
                📞 <strong>Contact Us:</strong> If you have questions, don’t hesitate to reach out to our support team for assistance.
              </li>
            </ul>
          </div>

          {/* Car Listings Section */}
          <div className="w-full">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-semibold">All Cars</h1>
                <span className="text-sm text-muted-foreground">({cars.length} Cars)</span>
              </div>
            </div>

            <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {isLoading
                ? Array(ITEMS_PER_PAGE)
                    .fill(0)
                    .map((_, index) => <Skeleton key={`car-skeleton-${index}`} className="h-[300px] w-full" />)
                : cars.map((car) => <CarCard key={car._id} {...car} image={urlForImage(car.image).url()} />)}
            </div>

            {!isLoading && hasMore && (
              <div ref={ref} className="flex justify-center mt-8">
                <Loader />
              </div>
            )}

            {!isLoading && !hasMore && cars.length > 0 && (
              <p className="text-center mt-8 text-gray-500">No more cars to load</p>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

async function getCars(page = 1, itemsPerPage = ITEMS_PER_PAGE) {
  const query = '*[_type == "car"]'
  const totalQuery = `count(${query})`
  const paginatedQuery = `${query} | order(_createdAt desc) [${(page - 1) * itemsPerPage}...${page * itemsPerPage}]`

  const [total, cars] = await Promise.all([client.fetch(totalQuery), client.fetch(paginatedQuery)])

  return { total, cars }
}
