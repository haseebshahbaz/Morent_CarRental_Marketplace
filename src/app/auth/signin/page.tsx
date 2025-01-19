'use client'

import { signIn } from "next-auth/react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SignIn() {
  return (
    <div className="min-h-screen bg-[#F6F7F9] flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Welcome to MORENT</CardTitle>
          <CardDescription className="text-center">
            Sign in to access your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 border hover:bg-gray-50"
            onClick={() => signIn('google', { callbackUrl: '/' })}
          >
            <Image
              src="/google.svg"
              alt="Google"
              width={20}
              height={20}
            />
            Sign in with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

