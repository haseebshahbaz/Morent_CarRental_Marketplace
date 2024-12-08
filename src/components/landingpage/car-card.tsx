import { Heart } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { Button } from "@/components/ui/button";
import fuelcapacity from "../../assets/gas-station.png";
import capacityicon from "../../assets/profile-2user.png";
import transmissionicon from "../../assets/Car (icon).png";
import Link from "next/link";

interface CarCardProps {
  name: string;
  type: string;
  image: string | StaticImageData;
  fuelCapacity: string;
  transmission: string;
  capacity: string;
  price: number;
  originalPrice?: number;
  isFavorite?: boolean;
  rentNowLink?: string; // Optional prop for conditional navigation
}

export function CarCard({
  name,
  type,
  image,
  fuelCapacity,
  transmission,
  capacity,
  price,
  originalPrice,
  isFavorite = false,
  rentNowLink, // Destructure rentNowLink prop
}: CarCardProps) {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);

  return (
    <div className="rounded-lg bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-bold">{name}</h3>
          <p className="text-sm text-muted-foreground">{type}</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`}
          />
        </Button>
      </div>

      <div className="my-4">
        <Image
          src={image}
          alt={name}
          width={240}
          height={120}
          className="mx-auto"
        />
      </div>

      <div className="grid grid-cols-3 gap-2 text-sm text-muted-foreground mb-4">
        <div className="flex items-center gap-2">
          <Image src={fuelcapacity} alt="Fuel" width={24} height={24} />
          {fuelCapacity}
        </div>
        <div className="flex items-center gap-2">
          <Image src={transmissionicon} alt="Transmission" width={24} height={24} />
          {transmission}
        </div>
        <div className="flex items-center gap-2">
          <Image src={capacityicon} alt="Capacity" width={26} height={24} />
          {capacity}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <span className="text-lg font-bold">{formattedPrice}</span>
          <span className="text-sm text-muted-foreground">/day</span>
          {originalPrice && (
            <p className="text-sm text-muted-foreground line-through">
              ${originalPrice}
            </p>
          )}
        </div>
        {/* Conditionally render the Rent Now button with Link if rentNowLink is provided */}
        {rentNowLink ? (
          <Link href={rentNowLink}>
            <Button className="bg-[#3563E9] hover:bg-[#2748BA]">
              Rent Now
            </Button>
          </Link>
        ) : (
          <Button className="bg-[#3563E9] hover:bg-[#2748BA]">
            Rent Now
          </Button>
        )}
      </div>
    </div>
  );
}
