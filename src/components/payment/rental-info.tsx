"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from "lucide-react"

interface RentalInfoProps {
  onStartDateChange: (date: string) => void
  onEndDateChange: (date: string) => void
}

export function RentalInfo({ onStartDateChange, onEndDateChange }: RentalInfoProps) {
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()

  const handleStartDateSelect = (date: Date | undefined) => {
    setStartDate(date)
    if (date) {
      onStartDateChange(date.toISOString())
    }
  }

  const handleEndDateSelect = (date: Date | undefined) => {
    setEndDate(date)
    if (date) {
      onEndDateChange(date.toISOString())
    }
  }

  return (
    <div className="container mx-auto px-4 md:px-0">
      <div className="bg-white rounded-[10px] p-6">
        <h2 className="text-[20px] font-semibold mb-4">Rental Info</h2>
        <div className="grid gap-6">
          <div className="space-y-2">
            <Label>Pick-up Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={handleStartDateSelect}
                  initialFocus
                  disabled={(date) => date < new Date() || (endDate ? date > endDate : false)}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label>Drop-off Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={handleEndDateSelect}
                  initialFocus
                  disabled={(date) => date < (startDate || new Date())}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  )
}

