'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import type { ImageViewerModalProps, SelectedImage } from '@interfaces/projectDetail';
import { motion } from 'framer-motion';

import Spinner from '@/components/common/Spinner';

const ImageViewerModal = ({ images, initialIndex, onClose }: ImageViewerModalProps) => {
  const [current, setCurrent] = useState<SelectedImage>({
    ...images[initialIndex],
    index: initialIndex,
  });
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const preloadedSrcSet = useRef<Set<string>>(new Set());
  const totalImages = images.length;

  const preload = useCallback((url: string) => {
    if (!url || preloadedSrcSet.current.has(url)) return;
    const img = new window.Image();
    img.src = url;
    preloadedSrcSet.current.add(url);
  }, []);

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

  useEffect(() => {
    // keyboard controls + focus trap
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') onClose();

      if (e.key === 'Tab') {
        const container = modalRef.current;
        if (!container) return;
        const focusable = container.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
        );
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            last.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === last) {
            first.focus();
            e.preventDefault();
          }
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handlePrev, handleNext, onClose]);

  useEffect(() => {
    // move focus into modal on open
    setTimeout(() => {
      const container = modalRef.current;
      if (!container) return;
      const focusable = container.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable && focusable.length > 0) {
        focusable[0].focus();
      } else {
        container.focus();
      }
    }, 0);
  }, []);

  useEffect(() => {
    // preload neighbors
    setIsImageLoading(true);
    const neighbors = [
      current.index - 2,
      current.index - 1,
      current.index + 1,
      current.index + 2,
    ].filter((i) => i >= 0 && i < totalImages);
    neighbors.forEach((i) => preload(images[i].url));
  }, [current, images, preload, totalImages]);
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
        tabIndex={-1}
        ref={modalRef}
      >
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
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <motion.div
          key={current.url}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            x: slideDirection ? (slideDirection === 'left' ? [200, 0] : [-200, 0]) : 0,
          }}
          transition={{
            duration: 0.4,
            ease: 'easeInOut',
          }}
          className="relative w-full h-full"
        >
          <Image
            src={current.url}
            alt={current.description || ''}
            fill
            className="object-contain"
            quality={90}
            sizes="(max-width: 1024px) 100vw, 80vw"
            onLoadingComplete={() => setIsImageLoading(false)}
          />
          {isImageLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/40">
              <Spinner
                size={48}
                full={false}
              />
            </div>
          )}
        </motion.div>
        {current.description && (
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/50 text-white">
            <p className="text-sm text-center">{current.description}</p>
          </div>
        )}
        {current.index > 0 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 backdrop-blur-sm 
                  text-text-primary hover:text-primary hover:bg-background transition-all duration-300 z-10"
            aria-label="Previous image"
          >
            <svg
              className="w-6 h-6"
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
        {current.index < totalImages - 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 backdrop-blur-sm 
                  text-text-primary hover:text-primary hover:bg-background transition-all duration-300 z-10"
            aria-label="Next image"
          >
            <svg
              className="w-6 h-6"
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
      </motion.div>
    </motion.div>
  );
};

export default ImageViewerModal;
