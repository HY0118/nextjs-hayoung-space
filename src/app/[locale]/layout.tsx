import React from "react";
import EnsureTrailingSlash from "@/components/common/EnsureTrailingSlash";
import { isSupportedLocale } from "@/i18n/constants";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const effectiveLocale = isSupportedLocale(locale) ? locale : "ko";
  return (
    <div data-locale={effectiveLocale}>
      <EnsureTrailingSlash />
      {children}
    </div>
  );
}
