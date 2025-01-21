import type { SchemaTypeDefinition } from "sanity"

import { locationType } from "./location"
import { carType } from "./car"
import { bookingType } from "./booking"
import { reviewType } from "./review"
import { customerType } from "./customer"

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [locationType, carType, bookingType, reviewType, customerType],
}

