// "use client"

// import { useState, useEffect } from "react"
// import { format, isAfter, isBefore, isEqual } from "date-fns"
// import { Calendar } from "@/components/ui/calendar"
// import { Label } from "@/components/ui/label"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Button } from "@/components/ui/button"
// import { CalendarIcon } from "lucide-react"
// import { cn } from "@/lib/utils"

// interface RentalInfoProps {
//   onStartDateChange: (date: Date | undefined) => void
//   onEndDateChange: (date: Date | undefined) => void
//   bookedDates: Date[]
//   carId: string
// }

// export function RentalInfo({ onStartDateChange, onEndDateChange, bookedDates, carId }: RentalInfoProps) {
//   const [startDate, setStartDate] = useState<Date | undefined>()
//   const [endDate, setEndDate] = useState<Date | undefined>()
//   const [error, setError] = useState<string | null>(null)

//   useEffect(() => {
//     // Reset dates when carId changes
//     setStartDate(undefined)
//     setEndDate(undefined)
//     setError(null)
//   }, [carId])

//   const handleStartDateSelect = (date: Date | undefined) => {
//     setStartDate(date)
//     onStartDateChange(date)
//     setError(null)

//     if (date && endDate && isAfter(date, endDate)) {
//       setEndDate(undefined)
//       onEndDateChange(undefined)
//     }
//   }

//   const handleEndDateSelect = (date: Date | undefined) => {
//     setEndDate(date)
//     onEndDateChange(date)
//     setError(null)

//     if (date && startDate && isBefore(date, startDate)) {
//       setError("End date cannot be before start date")
//     }
//   }

//   const isDateDisabled = (date: Date) => {
//     return bookedDates.some((bookedDate) => isEqual(new Date(bookedDate), new Date(date.setHours(0, 0, 0, 0))))
//   }

//   const isDateInRange = (date: Date) => {
//     return startDate && endDate && isAfter(date, startDate) && isBefore(date, endDate)
//   }

//   return (
//     <div className="container mx-auto px-4 md:px-0">
//       <div className="bg-white rounded-[10px] p-6">
//         <h2 className="text-[20px] font-semibold mb-4">Rental Info</h2>
//         <div className="grid gap-6">
//           <div className="space-y-2">
//             <Label>Pick-up Date</Label>
//             <Popover>
//               <PopoverTrigger asChild>
//                 <Button
//                   variant="outline"
//                   className={cn("w-full justify-start text-left font-normal", !startDate && "text-muted-foreground")}
//                 >
//                   <CalendarIcon className="mr-2 h-4 w-4" />
//                   {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
//                 </Button>
//               </PopoverTrigger>
//               <PopoverContent className="w-auto p-0" align="start">
//                 <Calendar
//                   mode="single"
//                   selected={startDate}
//                   onSelect={handleStartDateSelect}
//                   disabled={(date) =>
//                     isDateDisabled(date) || isBefore(date, new Date()) || (endDate ? isAfter(date, endDate) : false)
//                   }
//                   initialFocus
//                 />
//               </PopoverContent>
//             </Popover>
//           </div>

//           <div className="space-y-2">
//             <Label>Drop-off Date</Label>
//             <Popover>
//               <PopoverTrigger asChild>
//                 <Button
//                   variant="outline"
//                   className={cn("w-full justify-start text-left font-normal", !endDate && "text-muted-foreground")}
//                 >
//                   <CalendarIcon className="mr-2 h-4 w-4" />
//                   {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
//                 </Button>
//               </PopoverTrigger>
//               <PopoverContent className="w-auto p-0" align="start">
//                 <Calendar
//                   mode="single"
//                   selected={endDate}
//                   onSelect={handleEndDateSelect}
//                   disabled={(date) =>
//                     isDateDisabled(date) ||
//                     isBefore(date, new Date()) ||
//                     (startDate ? isBefore(date, startDate) : false)
//                   }
//                   initialFocus
//                   modifiers={{
//                     selected: (date) => isEqual(date, startDate) || isEqual(date, endDate),
//                     range: (date) => isDateInRange(date),
//                   }}
//                   modifiersStyles={{
//                     selected: { backgroundColor: "#3563E9", color: "white" },
//                     range: { backgroundColor: "#E5EDFF" },
//                   }}
//                 />
//               </PopoverContent>
//             </Popover>
//           </div>
//         </div>
//         {error && <p className="text-red-500 mt-2">{error}</p>}
//       </div>
//     </div>
//   )
// }

"use client";

import { useState, useEffect } from "react";
import { format, isAfter, isBefore, isEqual } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface RentalInfoProps {
  onStartDateChange: (date: Date | undefined) => void;
  onEndDateChange: (date: Date | undefined) => void;
  bookedDates: Date[];
  carId: string;
}

export function RentalInfo({ onStartDateChange, onEndDateChange, bookedDates, carId }: RentalInfoProps) {
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Reset dates when carId changes
    setStartDate(undefined);
    setEndDate(undefined);
    setError(null);
  }, [carId]);

  const handleStartDateSelect = (date: Date | undefined) => {
    setStartDate(date);
    onStartDateChange(date);
    setError(null);

    if (date && endDate && isAfter(date, endDate)) {
      setEndDate(undefined);
      onEndDateChange(undefined);
    }
  };

  const handleEndDateSelect = (date: Date | undefined) => {
    setEndDate(date);
    onEndDateChange(date);
    setError(null);

    if (date && startDate && isBefore(date, startDate)) {
      setError("End date cannot be before start date");
    }
  };

  const isDateDisabled = (date: Date): boolean => {
    return bookedDates.some((bookedDate) => isEqual(new Date(bookedDate), new Date(date.setHours(0, 0, 0, 0))));
  };

  // const isDateInRange = (date: Date): boolean => {
  //   return !!(startDate && endDate && isAfter(date, startDate) && isBefore(date, endDate));
  // };

  return (
    <div className="container mx-auto px-4 md:px-0">
      <div className="bg-white rounded-[10px] p-6">
        <h2 className="text-[20px] font-semibold mb-4">Rental Info</h2>
        <div className="grid gap-6">
          <div className="space-y-2">
            <Label>Pick-up Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("w-full justify-start text-left font-normal", !startDate && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={handleStartDateSelect}
                  disabled={(date) =>
                    isDateDisabled(date) || isBefore(date, new Date()) || (endDate ? isAfter(date, endDate) : false)
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label>Drop-off Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("w-full justify-start text-left font-normal", !endDate && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={handleEndDateSelect}
                  disabled={(date) =>
                    isDateDisabled(date) ||
                    isBefore(date, new Date()) ||
                    (startDate ? isBefore(date, startDate) : false)
                  }
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
}
