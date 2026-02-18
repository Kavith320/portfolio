import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kavith Udapola | Creative Enthusiast & Developer",
  description: "Explore the modern, dynamic portfolio of Kavith Udapola, showcasing innovation in development and design.",
};

import AnalyticsTracker from "@/components/AnalyticsTracker";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SNWWTET35X"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-SNWWTET35X');
          `}
        </Script>
      </head>
      <body className={`${inter.variable} ${outfit.variable}`}>
        <AnalyticsTracker />
        <div className="bg-mesh" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
