'use client'

import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function SignIn() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-[#3563E9]">
            Welcome to Morent Login
          </h2>
        </div>
        <div className="mt-8 space-y-6">
        <Button
  onClick={() => signIn('google', { callbackUrl: '/' })}
  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 p-2 rounded-md"
>
  <Image src="/google.svg" alt="Google Logo" width={20} height={20} />
  <span className="text-white">Sign in with Google</span>
</Button>

        </div>
      </div>
    </div>
  )
}
