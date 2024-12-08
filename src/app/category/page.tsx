import { Navbar } from "@/components/landingpage/navbar";
import { Footer } from "@/components/landingpage/footer";
import { FilterSidebar } from "@/components/category/sidebar";
import { CarCard } from "@/components/landingpage/car-card";
import { PickupSection } from "@/components/landingpage/pickupsection";
import { popularCars, recommendationCars } from "@/app/data/cars";


export default function CategoryPage() {
  // Combine all cars for the category page
  const allCars = [...popularCars, ...recommendationCars];

  return (
    <div className="min-h-screen bg-[#F6F7F9]">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar */}
          <FilterSidebar />

          <div className="flex-1">
            {/* Pickup Section under Filter Sidebar */}
            <div className="mb-8">
              <PickupSection />
            </div>

            {/* Car Listings */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-semibold">All Cars</h1>
                <span className="text-sm text-muted-foreground">120 Car</span>
              </div>

            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {allCars.map((car) => (
            <CarCard
              key={car.id}
              {...car}
              rentNowLink="/cars" // Pass the link for "Rent Now"
            />
          ))}
        </div>

            <div className="mt-8 flex justify-center">
              <button className="rounded-[4px] bg-[#3563E9] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#2748BA]">
                Show more cars
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

