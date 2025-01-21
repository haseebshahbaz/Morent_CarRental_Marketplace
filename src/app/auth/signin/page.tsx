"use client"

import { signIn } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    })

    if (result?.error) {
      console.error(result.error)
    } else {
      router.push("/")
    }
  }

  return (
    <div className="min-h-screen bg-[#F6F7F9] flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-[#3563E9]">Welcome to MORENT</CardTitle>
          <CardDescription className="text-center">Sign in to access your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-[#3563E9] hover:bg-[#2748BA]">
              Sign In
            </Button>
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#F6F7F9] px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          <Button
            className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 border hover:bg-gray-50"
            onClick={() => signIn("google", { callbackUrl: "/" })}
          >
            <Image src="/google.svg" alt="Google" width={20} height={20} />
            Sign in with Google
          </Button>
          <div className="text-center text-sm">
            Don't have an account?{" "}
            <Link href="/auth/signup" className="text-[#3563E9] hover:underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

