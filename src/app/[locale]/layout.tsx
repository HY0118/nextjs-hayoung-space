import React from 'react';

import { isSupportedLocale } from '@/i18n/constants';

import EnsureTrailingSlash from '@/components/shared/EnsureTrailingSlash';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const effectiveLocale = isSupportedLocale(locale) ? locale : 'ko';
  return (
    <div data-locale={effectiveLocale}>
      <EnsureTrailingSlash />
      {children}
    </div>
  );
}
