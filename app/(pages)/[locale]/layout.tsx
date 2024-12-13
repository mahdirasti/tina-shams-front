import { Roboto } from "next/font/google";

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

export const dynamic = "force-dynamic";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tina Shams",
  description: "Tina Shams",
};

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

  return (
    <html lang={params.locale} dir={dir}>
      <body className={`${roboto.className} select-none antialiased`}>
        <ReduxWrapper>
          {children}
          <Toaster dir={dir} className={`${roboto.className}`} />
          <div id='portal'></div>
        </ReduxWrapper>
      </body>
    </html>
  );
}
