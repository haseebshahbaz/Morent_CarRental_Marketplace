import { PickupDropdown } from "../landingpage/pickupdropdown";

export function RentalInfo() {
  return (
    <div className="container mx-auto px-4 md:px-0">
      {/* Desktop Layout */}
      <div className="hidden md:grid md:grid-row-[1fr,auto,1fr] gap-4 items-start mb-8">
        <div className="bg-white rounded-[10px] ">
          <div className="flex items-center gap-2 mb-6">
            <input type="radio" defaultChecked className="w-4 h-4 text-[#3563E9]" />
            <span className="text-[16px] font-semibold">Pick - Up</span>
          </div>

          <div className="grid gap-6">
            <PickupDropdown
              label="Locations"
              placeholder="Select your city"
              options={["New York", "Los Angeles", "Chicago"]}
            />
            <div className="grid grid-cols-2 gap-6">
              <PickupDropdown
                label="Date"
                placeholder="Select your date"
                options={["Today", "Tomorrow", "In 2 days"]}
              />
              <PickupDropdown
                label="Time"
                placeholder="Select your time"
                options={["10:00 AM", "11:00 AM", "12:00 PM"]}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[10px] ">
          <div className="flex items-center gap-2 mb-6">
            <input type="radio" defaultChecked className="w-4 h-4 text-[#3563E9]" />
            <span className="text-[16px] font-semibold">Drop - Off</span>
          </div>

          <div className="grid gap-6">
            <PickupDropdown
              label="Locations"
              placeholder="Select your city"
              options={["New York", "Los Angeles", "Chicago"]}
            />
            <div className="grid grid-cols-2 gap-6">
              <PickupDropdown
                label="Date"
                placeholder="Select your date"
                options={["Today", "Tomorrow", "In 2 days"]}
              />
              <PickupDropdown
                label="Time"
                placeholder="Select your time"
                options={["10:00 AM", "11:00 AM", "12:00 PM"]}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="px-0  md:hidden space-y-4">
        <div className="bg-white rounded-[10px] ">
          <div className="flex items-center gap-2 mb-6">
            <input type="radio" checked className="w-4 h-4 text-[#3563E9]" />
            <span className="text-[16px] font-semibold">Pick - Up</span>
          </div>

          <div className="space-y-4">
            <PickupDropdown
              label="Locations"
              placeholder="Select your city"
              options={["New York", "Los Angeles", "Chicago"]}
            />
            <PickupDropdown
              label="Date"
              placeholder="Select your date"
              options={["Today", "Tomorrow", "In 2 days"]}
            />
            <PickupDropdown
              label="Time"
              placeholder="Select your time"
              options={["10:00 AM", "11:00 AM", "12:00 PM"]}
            />
          </div>
        </div>

        <div className="bg-white rounded-[10px] ">
          <div className="flex items-center gap-2 mb-6">
            <input type="radio" checked className="w-4 h-4 text-[#3563E9]" />
            <span className="text-[16px] font-semibold">Drop - Off</span>
          </div>

          <div className="space-y-4">
            <PickupDropdown
              label="Locations"
              placeholder="Select your city"
              options={["New York", "Los Angeles", "Chicago"]}
            />
            <PickupDropdown
              label="Date"
              placeholder="Select your date"
              options={["Today", "Tomorrow", "In 2 days"]}
            />
            <PickupDropdown
              label="Time"
              placeholder="Select your time"
              options={["10:00 AM", "11:00 AM", "12:00 PM"]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
