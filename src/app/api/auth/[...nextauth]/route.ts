import NextAuth, { type NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { SanityAdapter } from "next-auth-sanity"
import { client } from "@/sanity/lib/client"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.id = account.providerAccountId
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    },
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          const existingCustomer = await client.fetch(`*[_type == "customer" && customerId == $customerId][0]`, {
            customerId: account.providerAccountId,
          })

          if (!existingCustomer) {
            await client.create({
              _type: "customer",
              customerId: account.providerAccountId,
              name: user.name,
              email: user.email,
              profilePicture: user.image,
              role: "Customer",
              createdAt: new Date().toISOString(),
            })
          }
        } catch (error) {
          console.error("Error in signIn callback:", error)
          return false
        }
      }
      return true
    },
  },
  adapter: SanityAdapter(client),
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }

