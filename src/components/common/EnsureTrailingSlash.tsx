'use client';

import { useEffect } from 'react';

import { isLocaleRootPath, withTrailingSlash } from '@/utils/urlUtils';

export default function EnsureTrailingSlash() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const { pathname, search, hash } = window.location;
    if (isLocaleRootPath(pathname) && !pathname.endsWith('/')) {
      const next = `${withTrailingSlash(pathname)}${search}${hash}`;
      history.replaceState(null, '', next);
    }
  }, []);
  return null;
}
