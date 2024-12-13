import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  //   const response = NextResponse.next()

  //   const pathname = request.nextUrl.pathname
  //   response.headers.set("x-current-path", pathname)

  //   return response

  // Clone the request headers and set a new header `x-hello-from-middleware1`
  const requestHeaders = new Headers(request.headers)

  requestHeaders.set("x-current-path", request.url)

  // You can also set request headers in NextResponse.rewrite
  const response = NextResponse.next({
    request: {
      // New request headers
      headers: requestHeaders,
    },
  })

  return response
}

export const matcher = [
  "/((?!favicon.ico|robots.txt|sitemap.xml|images|assets).*)",
]
