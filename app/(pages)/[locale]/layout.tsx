import { Roboto, Lato, Almarai } from "next/font/google";
import localFont from "next/font/local";
import "mapbox-gl/dist/mapbox-gl.css";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import ReduxWrapper from "@/redux/wrapper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/free-mode";
import { LocaleType } from "@/types/locale";
import ClientInit from "./init";
import { cn } from "@/app/lib/utils";
import { getDictionary } from "./dictionaries";

export const dynamic = "force-dynamic";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: LocaleType }>;
}): Promise<Metadata> => {
  const defaultTitle = "Tina Shams";

  const { locale } = await params;

  const dict = await getDictionary(locale);

  let template = `%s | ${dict.common.company_name}`;

  return {
    title: {
      default: defaultTitle, // Default title if no page-specific title is set
      template: template,
    },
    alternates: {
      languages: {
        en: process.env.NEXT_PUBLIC_BASE_URL + "/en",
        fa: process.env.NEXT_PUBLIC_BASE_URL + "/fa",
        ar: process.env.NEXT_PUBLIC_BASE_URL + "/ar",
      },
    },
    manifest: "/manifest.json",
    keywords: ["tina shams"],
    themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#000000" }],
    viewport:
      "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
    icons: [
      { rel: "apple-touch-icon", url: "/assets/favicon/icon-192x192.png" },
      { rel: "icon", url: "/assets/favicon/icon-192x192.png" },
    ],
  };
};

// const roboto = Roboto({
//   weight: ["100", "300", "400", "500", "700"],
//   subsets: ["latin"],
// });

const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
});

const almarai = Almarai({
  weight: ["300", "400", "700", "800"],
  subsets: ["arabic"],
});

const yekanBakh = localFont({
  src: [
    {
      weight: "100",
      path: "./fonts/yekanbakh/YekanBakhFaNum-Thin.woff2",
    },
    {
      weight: "300",
      path: "./fonts/yekanbakh/YekanBakhFaNum-Light.woff2",
    },
    {
      weight: "400",
      path: "./fonts/yekanbakh/YekanBakhFaNum-Regular.woff2",
    },
    {
      weight: "600",
      path: "./fonts/yekanbakh/YekanBakhFaNum-SemiBold.woff2",
    },
    {
      weight: "700",
      path: "./fonts/yekanbakh/YekanBakhFaNum-Bold.woff2",
    },
    {
      weight: "800",
      path: "./fonts/yekanbakh/YekanBakhFaNum-ExtraBold.woff2",
    },
    {
      weight: "900",
      path: "./fonts/yekanbakh/YekanBakhFaNum-Black.woff2",
    },
  ],
  variable: "--font-yekan-bakh",
  weight: "100 900",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: LocaleType };
}>) {
  const dir = params.locale === "en" ? "ltr" : "rtl";

  let className = "select-none antialiased";

  switch (params.locale) {
    case "en":
      className = cn(className, lato.className);
      break;
    case "fa":
      className = cn(className, yekanBakh.className);
      break;
    case "ar":
      className = cn(className, almarai.className);
      break;
  }

  return (
    <main dir={dir} className={`${className}`}>
      <ClientInit lang={params.locale} />
      <ReduxWrapper>
        {children}
        <Toaster dir={dir} className={`${lato.className}`} />
        <div id='portal'></div>
      </ReduxWrapper>
    </main>
  );
}
