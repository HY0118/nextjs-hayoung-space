'use client';

import { useEffect, useRef } from 'react';

import Image from 'next/image';

import { motion } from 'framer-motion';

import Spinner from '@/components/common/Spinner';

import { useImageViewerControls } from '@/utils/imageViewer/controls';
import { useImagePreloader } from '@/utils/imageViewer/preloader';
import { useImageSlider } from '@/utils/imageViewer/slider';
import type { ImageViewerModalProps } from '@/utils/imageViewer/types';

const ImageViewerModal = ({ images, initialIndex, onClose }: ImageViewerModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { preload } = useImagePreloader();

  const {
    current,
    slideDirection,
    isImageLoading,
    handlePrev,
    handleNext,
    setIsImageLoading,
  } = useImageSlider(images, initialIndex, preload);

  const totalImages = images.length;

  // 컨트롤 이벤트 등록
  useImageViewerControls({ handlePrev, handleNext, onClose }, modalRef);

  // Preload adjacent images
  useEffect(() => {
    const { index } = current;
    setIsImageLoading(true);
    const neighbors = [index - 2, index - 1, index + 1, index + 2].filter(
      (i) => i >= 0 && i < totalImages,
    );
    neighbors.forEach((i) => preload(images[i].url));
  }, [current, images, preload, totalImages, setIsImageLoading]);

  const canPrev = current.index > 0;
  const canNext = current.index < totalImages - 1;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/95 dark:bg-black/98 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative max-w-5xl w-full h-[80vh] bg-background rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Screenshot viewer"
        ref={modalRef}
        tabIndex={-1}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close image viewer"
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="m18 6-12 12M6 6l12 12" />
          </svg>
        </button>

        {/* Navigation buttons */}
        {canPrev && (
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/40 text-white hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}

        {canNext && (
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next image"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/40 text-white hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        )}

        {/* Image container */}
        <div className="relative w-full h-full overflow-hidden">
          <motion.div
            key={current.index}
            initial={{
              x:
                slideDirection === 'left'
                  ? '100%'
                  : slideDirection === 'right'
                    ? '-100%'
                    : 0,
              opacity: 0,
            }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {isImageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/50">
                <Spinner />
              </div>
            )}
            <Image
              src={current.url}
              alt={current.alt || current.description || 'Project image'}
              fill
              className="object-contain"
              priority
              onLoad={() => setIsImageLoading(false)}
              onError={() => setIsImageLoading(false)}
            />
          </motion.div>
        </div>

        {/* Image counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/40 text-white text-sm rounded-full">
          {current.index + 1} / {totalImages}
        </div>

        {/* Image description */}
        {(current.alt || current.description) && (
          <div className="absolute bottom-12 left-4 right-4 text-center">
            <p className="text-sm text-text-secondary bg-background/80 px-3 py-2 rounded-lg">
              {current.alt || current.description}
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ImageViewerModal;
