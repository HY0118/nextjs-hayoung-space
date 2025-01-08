import "./globals.css";
import React from "react";
import Header from "@components/common/Header";
import Footer from "@components/common/Footer";
import { ThemeProvider } from "@contexts/ThemeContext";

export const metadata = {
  title: "My hayoung-space",
  description: "Personal hayoung-space built with Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
