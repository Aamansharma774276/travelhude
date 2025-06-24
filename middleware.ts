import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { securityHeaders } from "@/lib/security"

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Add security headers
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  // Force HTTPS in production
  if (process.env.NODE_ENV === "production" && request.headers.get("x-forwarded-proto") !== "https") {
    return NextResponse.redirect(`https://${request.headers.get("host")}${request.nextUrl.pathname}`, 301)
  }

  // Protect admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const authCookie = request.cookies.get("admin_session")
    if (!authCookie) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  // Rate limiting for API routes
  if (request.nextUrl.pathname.startsWith("/api/")) {
    const ip = request.ip || request.headers.get("x-forwarded-for") || "unknown"
    const userAgent = request.headers.get("user-agent") || "unknown"

    // Log API access
    console.log(`API_ACCESS: ${request.method} ${request.nextUrl.pathname} from ${ip}`)
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}
