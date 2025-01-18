import { type SchemaTypeDefinition } from 'sanity'

import { bookingType } from './bookingType'
import { customerType } from './customerType'
import { reviewType } from './reviewType'
import { locationType } from './locationType'
import { carType } from './cars'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [carType, bookingType, customerType, reviewType, locationType],
}

