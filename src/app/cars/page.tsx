import { Navbar } from "@/components/landingpage/navbar";
import { Footer } from "@/components/landingpage/footer";
import { FilterSidebar } from "@/components/category/sidebar";
import { ImageGallery } from "@/components/car-detail/image-gallery";
import { StarRating } from "@/components/car-detail/star-rating";
import { ReviewCard } from "@/components/car-detail/review-card";
import { CarCard } from "@/components/landingpage/car-card";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import mainImg from "../../assets/cardetail (main).png";
import mainImg1 from "../../assets/cardetail (1).png";
import mainImg2 from "../../assets/cardetail (3).png";
import reviewImg from "../../assets/Profil.png";
import reviewImg2 from "../../assets/Profill.png";
import { recommendationCars } from "@/app/data/cars"; // Adjust the path based on your structure
import Link from "next/link";

const carImages = [
  {
    id: 1,
    src: mainImg,
    alt: "Nissan GT-R Exterior"
  },
  {
    id: 2,
    src: mainImg1,
    alt: "Nissan GT-R Interior Dashboard"
  },
  {
    id: 3,
    src: mainImg2,
    alt: "Nissan GT-R Interior Seats"
  }
]

const reviews = [
  {
    name: "Alex Stanton",
    title: "CEO at Bukalapak",
    date: "21 July 2022",
    rating: 4,
    comment: "We are greatly helped by the services of the MORENT Application. MORENT has a low price and also a wide variety of cars with good and comfortable facilities. In addition, the service provided by the officers is also very friendly and very polite.",
    avatar: reviewImg
  },
  {
    name: "Skylar Dias",
    title: "CEO at Amazon",
    date: "20 July 2022",
    rating: 4,
    comment: "We are greatly helped by the services of the MORENT Application. Morent has low prices and also a wide variety of cars with good and comfortable facilities. In addition, the service provided by the officers is also very friendly and very polite.",
    avatar: reviewImg2
  }
]

export default function CarDetailPage() {
  const recentCars = recommendationCars.slice(0, 3)
  const recommendationCarsSlice = recommendationCars.slice(3, 6)

  return (
    <div className="min-h-screen bg-[#F6F7F9]">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <FilterSidebar />
          
          <div className="flex-1 space-y-8">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-full lg:w-1/2">
                <ImageGallery images={carImages} />
              </div>
              
              <div className="w-full lg:w-1/2">
                <div className="bg-white rounded-[10px] p-6">
                  <div className="flex items-start justify-between mb-8">
                    <div>
                      <div className="flex items-center gap-4 mb-2">
                        <h1 className="text-2xl md:text-[32px] font-bold">Nissan GT - R</h1>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Heart className="h-5 w-5" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-2">
                        <StarRating rating={4} size="md" />
                        <span className="text-[#596780] text-sm md:text-[14px]">440+ Reviewer</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-[#596780] text-sm md:text-[16px] leading-[180%] md:leading-[200%] mb-8">
                    NISMO has become the embodiment of Nissan outstanding performance, inspired by the most unforgiving proving ground, the race track.
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-8">
                    <div>
                      <p className="text-[#90A3BF] text-xs md:text-[14px] mb-2">Type Car</p>
                      <p className="font-semibold text-sm md:text-base">Sport</p>
                    </div>
                    <div>
                      <p className="text-[#90A3BF] text-xs md:text-[14px] mb-2">Capacity</p>
                      <p className="font-semibold text-sm md:text-base">2 Person</p>
                    </div>
                    <div>
                      <p className="text-[#90A3BF] text-xs md:text-[14px] mb-2">Steering</p>
                      <p className="font-semibold text-sm md:text-base">Manual</p>
                    </div>
                    <div>
                      <p className="text-[#90A3BF] text-xs md:text-[14px] mb-2">Gasoline</p>
                      <p className="font-semibold text-sm md:text-base">70L</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xl md:text-[28px] font-bold">$80.00/</span>
                      <span className="text-sm md:text-[16px] text-[#90A3BF]">days</span>
                      <p className="text-sm md:text-[16px] text-[#90A3BF] line-through">$100.00</p>
                    </div>
                    <Link href="/payment">
                      <Button className="bg-[#3563E9] hover:bg-[#2748BA] h-10 md:h-14 px-4 md:px-8 text-sm md:text-base">
                        Rent Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[10px] p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg md:text-[20px] font-semibold">Reviews</h2>
                <span className="bg-[#3563E9] text-white text-xs md:text-[14px] px-2.5 py-1.5 rounded-[4px]">
                  13
                </span>
              </div>
              
              <div className="divide-y divide-[#C3D4E966]">
                {reviews.map((review, index) => (
                  <ReviewCard key={index} {...review} />
                ))}
              </div>

              <button className="w-full text-center text-[#90A3BF] mt-6 text-sm md:text-base">
                Show All
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-base md:text-[16px] font-semibold">Recent Car</h2>
                <Link href="/category">
                  <button className="text-[#3563E9] text-xs md:text-[14px] font-semibold">
                    View All
                  </button>
                </Link>
              </div>
              <div className="grid gap-4 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {recentCars.map((car) => (
                  <CarCard key={car.id} {...car} />
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-base md:text-[16px] font-semibold">Recommendation Car</h2>
                <Link href="/category">
                  <button className="text-[#3563E9] text-xs md:text-[14px] font-semibold">
                    View All
                  </button>
                </Link>
              </div>
              <div className="grid gap-4 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {recommendationCarsSlice.map((car) => (
                  <CarCard key={car.id} {...car} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}

