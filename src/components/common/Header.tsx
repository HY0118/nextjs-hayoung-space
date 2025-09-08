'use client';

import { Suspense, lazy } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { withTrailingSlash } from '@/utils/urlUtils';
import { useIntroStore } from '@store/introStore';
import { AnimatePresence, motion } from 'framer-motion';

const ThemeToggle = lazy(() => import('@components/common/ThemeToggle'));
const Navigation = lazy(() => import('@components/common/Navigation'));
const LanguageDropdown = lazy(() => import('@components/common/LanguageDropdown'));

const Header = () => {
  const isIntroComplete = useIntroStore((state) => state.isIntroComplete);
  const pathname = usePathname();

  // quick-portfolio 페이지에서는 헤더 숨김 (로케일 접두사 포함)
  if (
    pathname &&
    (/^\/quick-portfolio(\/|$)/.test(pathname) ||
      /^\/(ko|en)\/quick-portfolio(\/|$)/.test(pathname))
  ) {
    return null;
  }

  return (
    <AnimatePresence>
      {isIntroComplete && (
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur border-b border-border z-50"
        >
          <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
            <Link
              href={(() => {
                const base =
                  pathname?.startsWith('/ko') || pathname?.startsWith('/en')
                    ? pathname.split('#')[0].split('/').slice(0, 2).join('/') || '/'
                    : '/';
                return withTrailingSlash(base);
              })()}
              className="text-2xl font-bold"
            >
              <span className="text-text-primary">HaYoung</span>{' '}
              <span className="text-primary">Space</span> 🚀
            </Link>
            <div className="flex items-center gap-4">
              <Suspense fallback={<div className="w-[120px] h-[40px]" />}>
                <Navigation />
              </Suspense>
              <Suspense fallback={<div className="w-[40px] h-[40px]" />}>
                <div className="flex items-center">
                  <LanguageDropdown />
                  <ThemeToggle />
                </div>
              </Suspense>
            </div>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
};

export default Header;
