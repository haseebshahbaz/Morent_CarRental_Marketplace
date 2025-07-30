import React, { Suspense } from "react"
import { getServerSession } from "next-auth/next"
import { Navbar } from "@/components/landingpage/navbar"
import { Footer } from "@/components/landingpage/footer"
import { ImageGallery } from "@/components/car-detail/image-gallery"
import { ReviewCard } from "@/components/car-detail/review-card"
import { ReviewForm } from "@/components/car-detail/review-form"
import { CarCard } from "@/components/landingpage/car-card"
import { Heart } from "lucide-react"
import Link from "next/link"
import { client } from "@/sanity/lib/client"
import { urlForImage } from "@/sanity/lib/image"
import { Loader } from "@/components/ui/loader"
import { RentNowButton } from "@/components/payment/rent-now-button"
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options"

interface Review {
  _id: string
  rating: number
  comment: string
  createdAt: string
  customer: {
    name: string
    profilePicture: string
  }
}

interface Car {
  _id: string
  name: string
  type: string
  description: string
  seatingCapacity: string
  transmission: string
  fuelCapacity: string
  pricePerDay: number
  originalPrice?: number
  image: string
  imageGallery: string[]
  galleryTitle: string
  galleryDescription: string
  reviews?: Review[]
}

type PageProps = {
  params: Promise<{ id: string }>
}

async function getCar(id: string): Promise<Car> {
  return client.fetch(
    `*[_type == "car" && _id == $id][0]{
      ...,
      imageGallery,
      galleryTitle,
      galleryDescription,
      reviews[]->{
        _id,
        rating,
        comment,
        createdAt,
        customer->{
          name,
          profilePicture
        }
      }
    }`,
    { id },
  )
}

async function getRecommendedCars(): Promise<Car[]> {
  return client.fetch('*[_type == "car" && "recommended" in tags][0...3]')
}

export default async function CarDetailPage({ params }: PageProps) {
  const resolvedParams = await params
  const { id } = resolvedParams
  const session = await getServerSession(authOptions)
  const car = await getCar(id)
  const recommendedCars = await getRecommendedCars()

  return (
    <div className="min-h-screen bg-[#F6F7F9]">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Car Details</h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 space-y-8">
            <Suspense fallback={<Loader />}>
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="w-full lg:w-1/2">
                  <ImageGallery
                    images={car.imageGallery.map((image, index) => ({
                      id: index,
                      src: urlForImage(image).url(),
                      alt: `${car.name} - Image ${index + 1}`,
                    }))}
                    galleryTitle={car.galleryTitle}
                    galleryDescription={car.galleryDescription}
                  />
                </div>
                <div className="w-full lg:w-1/2">
                  <div className="bg-white rounded-[10px] p-6">
                    <div className="flex items-start justify-between mb-8">
                      <div>
                        <div className="flex items-center gap-4 mb-2">
                          <h1 className="text-2xl md:text-[32px] font-bold">{car.name}</h1>
                          <Heart className="h-5 w-5" />
                        </div>
                        <div className="flex items-center gap-2">
                          {/* <StarRating rating={4} size="md" /> */}
                        </div>
                      </div>
                    </div>

                    <p className="text-[#596780] text-sm md:text-[16px] leading-[180%] md:leading-[200%] mb-8">
                      {car.description}
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-8">
                      <div>
                        <p className="text-[#90A3BF] text-xs md:text-[14px] mb-2">Type Car</p>
                        <p className="font-semibold text-sm md:text-base">{car.type}</p>
                      </div>
                      <div>
                        <p className="text-[#90A3BF] text-xs md:text-[14px] mb-2">Capacity</p>
                        <p className="font-semibold text-sm md:text-base">{car.seatingCapacity}</p>
                      </div>
                      <div>
                        <p className="text-[#90A3BF] text-xs md:text-[14px] mb-2">Transmission</p>
                        <p className="font-semibold text-sm md:text-base">{car.transmission}</p>
                      </div>
                      <div>
                        <p className="text-[#90A3BF] text-xs md:text-[14px] mb-2">Fuel Capacity</p>
                        <p className="font-semibold text-sm md:text-base">{car.fuelCapacity}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xl md:text-[28px] font-bold">Contact For Price {car.pricePerDay}</span>
                        <span className="text-sm md:text-[16px] text-[#90A3BF]">/day</span>
                        {car.originalPrice && (
                          <p className="text-sm md:text-[16px] text-[#90A3BF] line-through">Contact For Price {car.originalPrice}</p>
                        )}
                      </div>
                      <RentNowButton carId={car._id} isAuthenticated={!!session} />
                    </div>
                  </div>
                </div>
              </div>
            </Suspense>

            <Suspense fallback={<Loader />}>
              <div className="bg-white rounded-[10px] p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg md:text-[20px] font-semibold">Reviews</h2>
                  <span className="bg-[#3563E9] text-white text-xs md:text-[14px] px-2.5 py-1.5 rounded-[4px]">
                    {car.reviews?.length || 0}
                  </span>
                </div>

                <div className="divide-y divide-[#C3D4E966]">
                  {car.reviews &&
                    car.reviews.map((review: Review) => (
                      <ReviewCard
                        key={review._id}
                        name={review.customer.name}
                        avatar={review.customer.profilePicture}
                        date={new Date(review.createdAt).toLocaleDateString()}
                        rating={review.rating}
                        comment={review.comment}
                      />
                    ))}
                </div>

                {session && (
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
                    <ReviewForm carId={car._id} />
                  </div>
                )}

                {!session && (
                  <p className="mt-8 text-center text-gray-500">
                    Please{" "}
                    <Link href="/auth/signin" className="text-blue-500 hover:underline">
                      sign in
                    </Link>{" "}
                    to leave a review.
                  </p>
                )}
              </div>
            </Suspense>

            <Suspense fallback={<Loader />}>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-base md:text-[16px] font-semibold">Recommendation Car</h2>
                  <Link href="/category">
                    <button className="text-[#3563E9] text-xs md:text-[14px] font-semibold">View All</button>
                  </Link>
                </div>
                <div className="grid gap-4 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {recommendedCars.map((car: Car) => (
                    <CarCard
                      key={car._id}
                      {...car}
                      image={urlForImage(car.image).url()}
                      seatingCapacity={car.seatingCapacity.toString()}
                    />
                  ))}
                </div>
              </div>
            </Suspense>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

declare module "next" {
  interface PageProps {
    params: Promise<{ id: string }>
  }
}

