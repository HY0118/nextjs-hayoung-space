'use client';

import { useEffect, useMemo, useRef, useState, useTransition } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import i18n from '@/i18n';
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from '@/i18n/constants';
import { withTrailingSlash } from '@/utils/helpers/urlUtils';

export default function LanguageDropdown() {
  const router = useRouter();
  const pathname = usePathname() || '/';
  const [, startTransition] = useTransition();

  const supported = SUPPORTED_LOCALES as readonly string[];
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);

  const currentLocale = useMemo(() => {
    const firstSegment = pathname.split('/')[1];
    if (supported.includes(firstSegment)) return firstSegment;
    return (i18n.language || DEFAULT_LOCALE).split('-')[0];
  }, [pathname, supported]);

  // 로케일이 경로에 없으면 기본 로케일을 자동 삽입
  useEffect(() => {
    const firstSegment = pathname.split('/')[1];
    const hasLocalePrefix = supported.includes(firstSegment);
    if (!hasLocalePrefix) {
      const basePath = pathname === '/' ? '' : pathname;
      const search = typeof window !== 'undefined' ? window.location.search : '';
      const hash = typeof window !== 'undefined' ? window.location.hash : '';
      const normalizedBase = basePath.startsWith('/') ? basePath : `/${basePath}`;
      const nextPath = `/${DEFAULT_LOCALE}${withTrailingSlash(normalizedBase)}${search}${hash}`;
      // replace로 히스토리 오염 방지
      router.replace(nextPath);
      // i18n 상태도 동기화
      i18n.changeLanguage(DEFAULT_LOCALE);
    }
  }, [pathname, router, supported]);

  const buildPathWithLocale = (targetLocale: string) => {
    const firstSegment = pathname.split('/')[1];
    const hasLocalePrefix = supported.includes(firstSegment);
    const search = typeof window !== 'undefined' ? window.location.search : '';
    const hash = typeof window !== 'undefined' ? window.location.hash : '';
    if (hasLocalePrefix) {
      const rest = pathname.split('/').slice(2).join('/');
      const restWithSlash = rest ? withTrailingSlash(`/${rest}`) : '/';
      return `/${targetLocale}${restWithSlash}${search}${hash}`;
    }
    if (pathname === '/') return `/${targetLocale}/${search}${hash}`;
    const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`;
    return `/${targetLocale}${normalized}${search}${hash}`;
  };

  const switchLocale = (nextLocale: string) => {
    if (nextLocale === currentLocale) {
      setOpen(false);
      return;
    }
    const nextPath = buildPathWithLocale(nextLocale);
    startTransition(() => {
      i18n.changeLanguage(nextLocale);
      router.push(nextPath);
      setOpen(false);
    });
  };

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  const label = currentLocale === 'en' ? 'EN' : 'KO';
  const flag = currentLocale === 'en' ? '🇺🇸' : '🇰🇷';

  return (
    <div
      ref={containerRef}
      className="relative"
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 px-2 py-2 rounded-lg bg-background/70 backdrop-blur text-text-primary hover:bg-gray-50/50 dark:hover:bg-gray-900/20 transition-colors font-sora"
      >
        <span className="text-base leading-none">{flag}</span>
        <span className="text-sm tracking-wide">{label}</span>
        <svg
          className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : 'rotate-0'}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Menu */}
      <div
        role="menu"
        className={`absolute left-0 mt-2 w-36 z-50 rounded-xl border border-border/40 bg-white dark:bg-white p-1 transition-all duration-150 origin-top-right ${
          open ? 'opacity-100 scale-100' : 'pointer-events-none opacity-0 scale-95'
        }`}
      >
        {[
          { code: 'ko', name: '한국어', short: 'KO', icon: '🇰🇷' },
          { code: 'en', name: 'English', short: 'EN', icon: '🇺🇸' },
        ].map(({ code, name, short, icon }) => {
          const active = currentLocale === code;
          return (
            <button
              key={code}
              role="menuitem"
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                active
                  ? 'bg-primary/10 text-text-primary'
                  : 'text-text-secondary hover:bg-gray-50/70 dark:hover:bg-gray-900/30'
              }`}
              onClick={() => switchLocale(code)}
            >
              <span className="text-base">{icon}</span>
              <span className="flex-1 text-left">{name}</span>
              <span className="text-xs opacity-70">{short}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
