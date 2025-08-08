import React from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <div data-locale={params.locale}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
