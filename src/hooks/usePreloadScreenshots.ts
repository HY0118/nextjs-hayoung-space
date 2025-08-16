import { useEffect } from 'react';

export const usePreloadScreenshots = (
  images: Array<{ url: string }>,
  count: number = 2,
) => {
  useEffect(() => {
    if (!images || images.length === 0) return;
    images.slice(0, count).forEach((img) => {
      const image = new window.Image();
      image.src = img.url;
    });
  }, [images, count]);
};
