'use client';

import React from 'react';

import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';

import { getLocaleFromPathname, withTrailingSlash } from '@/utils/helpers/urlUtils';

type Props = Omit<React.ComponentProps<typeof Link>, 'href'> & {
  to: string;
};

export default function LocaleLink({ to, children, ...rest }: Props) {
  const pathname = usePathname() || '/';
  const locale = getLocaleFromPathname(pathname);

  const computeHref = (): string => {
    // External or mailto or absolute http(s)
    if (/^(mailto:|https?:\/\/)/i.test(to)) return to;
    // Hash only → anchor on home of current locale
    if (to.startsWith('#')) {
      const base = locale ? `/${locale}/` : '/';
      return `${base}${to}`;
    }
    // '/#section' → anchor on home
    if (to.startsWith('/#')) {
      const base = locale ? `/${locale}/` : '/';
      // Keep hash prefix when joining (/#about → /ko/#about)
      return `${base}${to.slice(1)}`;
    }
    // Absolute app path
    if (to.startsWith('/')) {
      // Already locale prefixed
      if (/^\/(ko|en)(\/|$)/.test(to)) return withTrailingSlash(to);
      const base = locale ? `/${locale}` : '';
      return withTrailingSlash(`${base}${to}`);
    }
    // Relative path
    return to;
  };

  const href = computeHref();
  return (
    <Link
      href={href as LinkProps['href']}
      {...rest}
    >
      {children}
    </Link>
  );
}
