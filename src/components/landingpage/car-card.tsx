'use client';

import { useState } from "react";
import { useRouter } from "next/navigation"; 
import Image from "next/image";
import Link from "next/link";
import fuelcapacity from "../../assets/gas-station.png";
import capacityicon from "../../assets/profile-2user.png";
import transmissionicon from "../../assets/Car (icon).png";
import { Loader2 } from "lucide-react";

interface CarCardProps {
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

export function CarCard({
  _id,
  name,
  type,
  image,
  fuelCapacity,
  transmission,
  seatingCapacity,
  pricePerDay,
  originalPrice,
}: CarCardProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Initialize useRouter

  const handleRentNow = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent the default Link behavior temporarily
    setLoading(true);
    router.push(`/cars/${_id}`); // Navigate to the car's page
  };

  return (
    <Link href={`/cars/${_id}`} className="block group">
      <div
        className={`rounded-lg bg-white p-4 shadow-md h-[400px] flex flex-col justify-between group-hover:shadow-lg transition-shadow ${
          loading && "pointer-events-none opacity-50"
        }`}
      >
        {loading && (
          <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        )}
        <div>
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-bold text-lg truncate group-hover:text-blue-600 transition-colors">
                {name}
              </h3>
              <p className="text-sm text-gray-500 group-hover:text-blue-500 transition-colors">
                {type}
              </p>
            </div>
            {/* <Button variant="ghost" size="icon" className="h-8 w-8">
              <Heart className="h-5 w-5" />
            </Button> */}
          </div>

          <div className="my-4 h-[180px] relative">
            <Image
              src={image || "/placeholder.svg"}
              alt={name}
              layout="fill"
              objectFit="contain"
              className="rounded-lg"
            />
          </div>

          <div className="grid grid-cols-3 text-sm text-gray-600 mb-4">
            <div className="flex items-center gap-2">
              <Image src={fuelcapacity} alt="Fuel" width={20} height={20} />
              <span className="truncate">{fuelCapacity}</span>
            </div>
            <div className="flex items-center gap-2">
              <Image src={transmissionicon} alt="Transmission" width={20} height={20} />
              <span className="truncate">{transmission}</span>
            </div>
            <div className="flex items-center gap-2">
              <Image src={capacityicon} alt="Capacity" width={20} height={20} />
              <span className="truncate">{seatingCapacity} Seat</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="text-lg font-bold text-black-600">PKR {pricePerDay}</span>
            <span className="text-sm text-gray-500">/day</span>
            {originalPrice && (
              <p className="text-sm text-gray-400 line-through">PKR {originalPrice}</p>
            )}
          </div>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded cursor-pointer"
            onClick={handleRentNow}
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin text-white" />
            ) : (
              "Rent Now"
            )}
          </button>
        </div>
      </div>
    </Link>
  );
}

