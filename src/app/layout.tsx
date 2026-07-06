import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aspirehumbly.com"),
  title: {
    default: "Aspire Humbly | Premium Motivational Apparel",
    template: "%s | Aspire Humbly",
  },
  description:
    "Premium apparel for those building quietly and moving with purpose. Work Hard. Stay Humble.",
  keywords: [
    "motivational apparel",
    "streetwear",
    "premium tees",
    "Aspire Humbly",
    "work hard stay humble",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aspirehumbly.com",
    siteName: "Aspire Humbly",
    title: "Aspire Humbly | Premium Motivational Apparel",
    description:
      "Premium apparel for those building quietly and moving with purpose.",
    images: [{ url: "/brand/aspire-humbly-logo.png", alt: "Aspire Humbly" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aspire Humbly",
    description: "Work Hard. Stay Humble.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full bg-white font-sans text-black antialiased">
        {children}
      </body>
    </html>
  );
}
