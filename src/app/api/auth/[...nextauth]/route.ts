import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { SanityAdapter, SanityCredentials } from "next-auth-sanity"
import { client } from "@/sanity/lib/client"

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  adapter: SanityAdapter(client),
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.userId = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.userId as string
      }
      return session
    },
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const { name, email, image } = user
        try {
          const existingUser = await client.fetch(`*[_type == "customer" && email == $email][0]`, { email })

          if (!existingUser) {
            await client.create({
              _type: "customer",
              customerId: user.id,
              name,
              email,
              profilePicture: image,
              role: "Customer",
              createdAt: new Date().toISOString(),
            })
          }
        } catch (error) {
          console.error("Error creating/fetching customer in Sanity:", error)
        }
      }
      return true
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
})

export { handler as GET, handler as POST }

