// import type { StructureResolver } from 'sanity/structure'

// // https://www.sanity.io/docs/structure-builder-cheat-sheet
// export const structure: StructureResolver = (S) =>
//   S.list()
//     .title('Dashboard') // Change this title to something more appropriate for your new schema
//     .items([
//       S.documentTypeListItem('car').title('Cars'),
//       S.documentTypeListItem('booking').title('Bookings'),
//       S.documentTypeListItem('customer').title('Customers'),
//       S.documentTypeListItem('review').title('Reviews'),
//       S.documentTypeListItem('location').title('Locations'),
//       S.divider(),
//       // Optionally, you can include other schemas that are not listed above.
//       ...S.documentTypeListItems().filter(
//         (item) =>
//           item.getId() &&
//           !['car', 'booking', 'customer', 'reviews', 'location'].includes(item.getId()!)
//       ),
//     ])


import { type StructureBuilder } from 'sanity/desk'
import { CalendarIcon, UserIcon, StarIcon, PinIcon } from '@sanity/icons'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Car Rental Management')
    .items([
      // Cars
      S.listItem()
        .title('Cars')
        // .icon(CarIcon)
        .child(
          S.list()
            .title('Cars')
            .items([
              S.listItem()
                .title('All Cars')
                .child(
                  S.documentList()
                    .title('All Cars')
                    .filter('_type == "car"')
                ),
              S.listItem()
                .title('By Status')
                .child(
                  S.list()
                    .title('Cars by Status')
                    .items([
                      S.listItem()
                        .title('Available Cars')
                        .child(
                          S.documentList()
                            .title('Available Cars')
                            .filter('_type == "car" && status == "available"')
                        ),
                      S.listItem()
                        .title('Rented Cars')
                        .child(
                          S.documentList()
                            .title('Rented Cars')
                            .filter('_type == "car" && status == "rented"')
                        ),
                      S.listItem()
                        .title('In Maintenance')
                        .child(
                          S.documentList()
                            .title('Cars in Maintenance')
                            .filter('_type == "car" && status == "maintenance"')
                        ),
                    ])
                ),
              S.listItem()
                .title('By Type')
                .child(
                  S.list()
                    .title('Cars by Type')
                    .items(
                      ['Sport', 'Sedan', 'SUV', 'Couple', 'Hatchback', 'Convertible'].map(
                        (type) =>
                          S.listItem()
                            .title(`${type} Cars`)
                            .child(
                              S.documentList()
                                .title(`${type} Cars`)
                                .filter('_type == "car" && type == $type')
                                .params({ type: type.toLowerCase() })
                            )
                      )
                    )
                ),
            ])
        ),

      // Bookings
      S.listItem()
        .title('Bookings')
        .icon(CalendarIcon)
        .child(
          S.list()
            .title('Bookings')
            .items([
              S.listItem()
                .title('All Bookings')
                .child(
                  S.documentList()
                    .title('All Bookings')
                    .filter('_type == "booking"')
                ),
              S.listItem()
                .title('By Status')
                .child(
                  S.list()
                    .title('Bookings by Status')
                    .items(
                      ['Pending', 'Confirmed', 'Completed', 'Cancelled'].map((status) =>
                        S.listItem()
                          .title(`${status} Bookings`)
                          .child(
                            S.documentList()
                              .title(`${status} Bookings`)
                              .filter('_type == "booking" && status == $status')
                              .params({ status: status.toLowerCase() })
                          )
                      )
                    )
                ),
            ])
        ),

      // Customers
      S.listItem()
        .title('Customers')
        .icon(UserIcon)
        .child(S.documentList().title('Customers').filter('_type == "customer"')),

      // Reviews
      S.listItem()
        .title('Reviews')
        .icon(StarIcon)
        .child(S.documentList().title('Reviews').filter('_type == "review"')),

      // Locations
      S.listItem()
        .title('Locations')
        .icon(PinIcon)
        .child(S.documentList().title('Locations').filter('_type == "location"')),
    ])
