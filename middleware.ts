import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

//Assuming we have only /en,tr and fr now

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  //setting current url to header
  req.headers.set("x-url", req.url);

  // Ignore requests to public files, api routes, or already localized paths
  if (
    PUBLIC_FILE.test(pathname) ||
    pathname.startsWith("/api") ||
    pathname.match(/^\/(en|ar|fa)(\/|$)/)
  ) {
    return NextResponse.next({ headers: req.headers });
  }

  // Check for language cookie
  const localeCookie = req.cookies.get("NEXT_LOCALE")?.value;
  if (localeCookie) {
    const url = req.nextUrl.clone();
    url.pathname = `/${localeCookie}${pathname}`;
    return NextResponse.redirect(url, { headers: req.headers });
  }

  // Detect locale based on GeoIP (for Vercel Edge or custom logic)
  const country = "IR"; // Default to 'US' if no geo data is available

  // Define your locale mapping
  const countryLocaleMap: Record<string, string> = {
    IR: "fa",
    US: "en",
    AE: "ar",
  };

  const detectedLocale = countryLocaleMap[country] || "en";

  // Redirect to the localized route
  const url = req.nextUrl.clone();
  url.pathname = `/${detectedLocale}${pathname}`;

  // Set cookie for future requests
  const response = NextResponse.redirect(url, { headers: req.headers });
  response.cookies.set("NEXT_LOCALE", detectedLocale, { path: "/" });

  return response;
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};
