import { CarCard } from "./car-card"
import { recommendationCars } from "@/app/data/cars"

export function RecommendationCars() {
  return (
    <section>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-[16px] font-semibold">Recommendation Car</h2>
      </div>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {recommendationCars.map((car) => (
          <CarCard key={car.id} {...car} />
        ))}
      </div>
    </section>
  )
}

