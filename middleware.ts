import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })

  if (request.nextUrl.pathname.startsWith("/payment")) {
    if (!token?.id) {
      const callbackUrl = encodeURIComponent(request.nextUrl.pathname)
      return NextResponse.redirect(new URL(`/auth/signin?callbackUrl=${callbackUrl}`, request.url))
    }
  }

  if (request.nextUrl.pathname.startsWith("/studio")) {
    if (token?.role !== "Admin") {
      return NextResponse.redirect(new URL("/auth/signin", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/payment/:path*", "/studio/:path*"],
}

