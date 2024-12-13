import { Roboto } from "next/font/google";

import "mapbox-gl/dist/mapbox-gl.css";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import ReduxWrapper from "@/redux/wrapper";
import { _VARZ } from "./const/_varz";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/free-mode";

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' dir='ltr'>
      <body className={`${roboto.className} select-none antialiased`}>
        <ReduxWrapper>
          {children}
          <Toaster dir='ltr' className={`${roboto.className}`} />
          <div id='portal'></div>
        </ReduxWrapper>
      </body>
    </html>
  );
}
