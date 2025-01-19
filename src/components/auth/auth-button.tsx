'use client'

import { signIn, signOut, useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Loader2 } from 'lucide-react'

export function AuthButton() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <Button variant="ghost" size="sm" disabled>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading
      </Button>
    )
  }

  if (session?.user) {
    return (
      <Image
        src={session.user.image || "/placeholder.svg"}
        alt={session.user.name || "Profile"}
        width={40}
        height={40}
        className="rounded-full cursor-pointer"
      />
    )
  }

  return (
    <Link href="/auth/signin">
      <Button 
        variant="default"
        className="bg-[#3563E9] hover:bg-[#2748BA] text-white"
      >
        Sign In
      </Button>
    </Link>
  )
}

