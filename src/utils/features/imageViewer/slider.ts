import { useCallback, useState } from 'react';

import type { SelectedImage, SlideDirection } from './types';

export interface SliderHandlers {
  current: SelectedImage;
  slideDirection: SlideDirection;
  isImageLoading: boolean;
  handlePrev: () => void;
  handleNext: () => void;
  setIsImageLoading: (loading: boolean) => void;
}

export function useImageSlider(
  images: Array<{ url: string; alt?: string; description?: string }>,
  initialIndex: number,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _preload: (url: string) => void,
): SliderHandlers {
  const [current, setCurrent] = useState<SelectedImage>({
    ...images[initialIndex],
    index: initialIndex,
  });
  const [slideDirection, setSlideDirection] = useState<SlideDirection>(null);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const totalImages = images.length;

  const handlePrev = useCallback(() => {
    if (current.index <= 0) return;
    setSlideDirection('right');
    const prev = images[current.index - 1];
    setCurrent({ ...prev, index: current.index - 1 });
  }, [current, images]);

  const handleNext = useCallback(() => {
    if (current.index >= totalImages - 1) return;
    setSlideDirection('left');
    const next = images[current.index + 1];
    setCurrent({ ...next, index: current.index + 1 });
  }, [current, images, totalImages]);

  return {
    current,
    slideDirection,
    isImageLoading,
    handlePrev,
    handleNext,
    setIsImageLoading,
  };
}
