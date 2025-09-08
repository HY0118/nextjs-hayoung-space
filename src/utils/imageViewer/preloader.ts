import { useCallback, useRef } from 'react';

export function useImagePreloader() {
  const preloadedSrcSet = useRef<Set<string>>(new Set());

  const preload = useCallback((url: string) => {
    if (!url || preloadedSrcSet.current.has(url)) return;
    const img = new window.Image();
    img.src = url;
    preloadedSrcSet.current.add(url);
  }, []);

  return { preload };
}
