import Link from "next/link";
import { CarCard } from "./car-card";
import { popularCars } from "@/app/data/cars";

export function PopularCars() {
  return (
    <section className="mb-8 mt-8">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-[16px] font-semibold">Popular Car</h2>
        <Link 
          href="/category" 
          className="text-[#3563E9] text-[14px] font-semibold hover:underline"
        >
          View All
        </Link>
      </div>
      {/* Responsive Layout */}
      <div className="flex lg:grid lg:grid-cols-4 gap-4 overflow-x-auto lg:overflow-hidden scroll-smooth scrollbar-hide">
        {popularCars.map((car) => (
          <div key={car.id} className="min-w-[300px] lg:w-auto">
            <CarCard {...car} />
          </div>
        ))}
      </div>
    </section>
  );
}
