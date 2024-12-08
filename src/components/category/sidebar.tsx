'use client'
import { Button } from "@/components/ui/button"
import { CheckboxGroup } from "./checkbox-group"
import { PriceSlider } from "./price-slider"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from 'lucide-react'

const typeItems = [
  { id: "sport", label: "Sport", count: 10 },
  { id: "suv", label: "SUV", count: 12 },
  { id: "mpv", label: "MPV", count: 16 },
  { id: "sedan", label: "Sedan", count: 20 },
  { id: "coupe", label: "Coupe", count: 14 },
  { id: "hatchback", label: "Hatchback", count: 14 },
]

const capacityItems = [
  { id: "2person", label: "2 Person", count: 10 },
  { id: "4person", label: "4 Person", count: 14 },
  { id: "6person", label: "6 Person", count: 12 },
  { id: "8more", label: "8 or More", count: 16 },
]

export function FilterSidebar() {
  const filters = (
    <div className="space-y-6">
      <CheckboxGroup title="TYPE" items={typeItems} />
      <CheckboxGroup title="CAPACITY" items={capacityItems} />
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-[#90A3BF]">PRICE</h3>
        <PriceSlider />
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-[260px] flex-shrink-0">
        {filters}
      </div>

      {/* Mobile Filter Sheet */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="h-10 w-10">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <div className="py-4">
              {filters}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}

