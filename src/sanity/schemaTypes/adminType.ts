import { defineField, defineType } from "sanity"
import { UserIcon } from "@sanity/icons"

export const adminType = defineType({
  name: "admin",
  title: "Admin",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "image",
      title: "Profile Image",
      type: "url",
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      initialValue: "admin",
      readOnly: true,
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "email",
    },
  },
})

