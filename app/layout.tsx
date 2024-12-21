import { Metadata, Viewport } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Tina Shams",
  description: "Tina Shams",
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
    <html>
      <body className='md:pt-0'>{children}</body>
    </html>
  );
}
