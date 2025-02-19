import type { StructureBuilder } from "sanity/desk"
import { UserIcon, CalendarIcon, StarIcon, PinIcon } from "@sanity/icons"

export const structure = (S: StructureBuilder) =>
  S.list()
    .title("Car Rental Management")
    .items([
      S.listItem()
        .title("Cars")
        .child(
          S.list()
            .title("Cars")
            .items([
              S.listItem().title("All Cars").child(S.documentList().title("All Cars").filter('_type == "car"')),
              S.listItem()
                .title("By Location")
                .child(
                  S.documentList()
                    .title("Cars by Location")
                    .filter('_type == "car"')
                    .defaultOrdering([{ field: "location.name", direction: "asc" }]),
                ),
            ]),
        ),

      S.listItem()
        .title("Customers")
        .icon(UserIcon)
        .child(
          S.list()
            .title("Customers")
            .items([
              S.listItem()
                .title("All Customers")
                .child(S.documentList().title("All Customers").filter('_type == "customer" && role == "Customer"')),
              S.listItem()
                .title("Admins")
                .child(S.documentList().title("Admin Users").filter('_type == "customer" && role == "Admin"')),
            ]),
        ),

      S.listItem()
        .title("Bookings")
        .icon(CalendarIcon)
        .child(
          S.list()
            .title("Bookings")
            .items([
              S.listItem()
                .title("All Bookings")
                .child(S.documentList().title("All Bookings").filter('_type == "booking"')),
              S.listItem()
                .title("By Status")
                .child(
                  S.list()
                    .title("Bookings by Status")
                    .items(
                      ["Pending", "Confirmed", "Completed", "Cancelled"].map((status) =>
                        S.listItem()
                          .title(`${status} Bookings`)
                          .child(
                            S.documentList()
                              .title(`${status} Bookings`)
                              .filter('_type == "booking" && status == $status')
                              .params({ status: status.toLowerCase() }),
                          ),
                      ),
                    ),
                ),
            ]),
        ),

      S.listItem().title("Reviews").icon(StarIcon).child(S.documentList().title("Reviews").filter('_type == "review"')),

      S.listItem()
        .title("Locations")
        .icon(PinIcon)
        .child(
          S.list()
            .title("Locations")
            .items([
              S.listItem()
                .title("All Locations")
                .child(S.documentList().title("All Locations").filter('_type == "location"')),
              S.listItem()
                .title("Locations with Available Cars")
                .child(
                  S.documentList()
                    .title("Locations with Available Cars")
                    .filter('_type == "location" && count(availableCars) > 0'),
                ),
            ]),
        ),
    ])

