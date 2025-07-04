import "./globals.css";
import React from "react";
import Header from "@components/common/Header";
import Footer from "@components/common/Footer";
import { ThemeProvider } from "@contexts/ThemeContext";
import { Outfit, Sora } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next"

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata = {
  title: "HaYoung's Space",
  description: "Personal HaYoung-space built with Next.js",
  keywords: ["blog", "portfolio", "HaYoung", "developer", "web development"],
  authors: [{ name: "HaYoung Lee" }],
  creator: "HaYoung Lee",
  openGraph: {
    title: "HaYoung's Space",
    description: "Personal HaYoung-space built with Next.js",
    type: "website",
    locale: "ko_KR",
    siteName: "HaYoung's Space",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${outfit.variable} ${sora.variable}`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <ThemeProvider>
          <Header />
          <main>
            {children}
            <SpeedInsights />
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
