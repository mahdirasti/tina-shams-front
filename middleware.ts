import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import axiosInstance from "./app/lib/axios";

// Supported locales and default locale
let locales = ["en", "fa", "ar"];
let defaultLocale = "en";

// Function to get the locale from the request or URL path
function getLocale(request: NextRequest) {
  // Extract the accept-language header from the request
  const acceptLanguage = request.headers.get("lang");

  // If accept-language header exists, use it to find the best matching locale
  if (acceptLanguage) {
    let languages = new Negotiator({
      headers: { lang: acceptLanguage },
    }).languages();
    return match(languages, locales, defaultLocale); // Return the best matching locale
  }

  // If no accept-language header, return the default locale
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the pathname has a valid locale (e.g., /en, /fa, /ar)
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  let locale = defaultLocale; // Default locale

  // If the URL contains a locale, extract it
  if (pathnameHasLocale) {
    const matchedLocale = locales.find(
      (locale) =>
        pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );
    if (matchedLocale) {
      locale = matchedLocale;
    }
  } else {
    // If no locale in the URL, get the locale from the accept-language header
    locale = getLocale(request);
  }

  // Set the lang header in the request for the response
  const newHeaders = new Headers(request.headers);
  newHeaders.set("lang", locale);

  // If there is no locale in the URL path, redirect to the correct locale-based URL
  if (!pathnameHasLocale) {
    // Update the URL with the correct locale
    request.nextUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(request.nextUrl, { headers: newHeaders });
  }

  // Continue with the request and return the updated headers
  return NextResponse.next({ headers: newHeaders });
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next|api|assets).*)/",
  ],
};
