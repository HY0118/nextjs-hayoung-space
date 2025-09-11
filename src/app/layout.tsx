import React from 'react';

import localFont from 'next/font/local';
import { cookies } from 'next/headers';

import Footer from '@components/layout/Footer';
import Header from '@components/layout/Header';
import { ThemeProvider } from '@contexts/ThemeContext';
import { SpeedInsights } from '@vercel/speed-insights/next';

import I18nProvider from '@/app/providers/I18nProvider';

import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  display: 'swap',
});

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  display: 'swap',
});

export const metadata = {
  title: "HaYoung's Space",
  description: 'Personal HaYoung-space built with Next.js',
  keywords: ['blog', 'portfolio', 'HaYoung', 'developer', 'web development'],
  authors: [{ name: 'HaYoung Lee' }],
  creator: 'HaYoung Lee',
  openGraph: {
    title: "HaYoung's Space",
    description: 'Personal HaYoung-space built with Next.js',
    type: 'website',
    locale: 'ko_KR',
    siteName: "HaYoung's Space",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const raw = (cookieStore.get('NEXT_LOCALE')?.value || 'ko').split('-')[0];
  const locale = raw === 'en' ? 'en' : 'ko';
  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
      </head>
      <body>
        <ThemeProvider>
          <I18nProvider>
            <Header />
            <main>
              {children}
              <SpeedInsights />
            </main>
            <Footer />
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
