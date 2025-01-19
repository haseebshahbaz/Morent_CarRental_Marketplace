import { Inter } from 'next/font/google'
import { NextAuthProvider } from "@/components/providers/session-providers"
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'MORENT - Car Rental',
  description: 'Rent your dream car with MORENT',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  )
}

