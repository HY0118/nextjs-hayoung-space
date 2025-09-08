import { useEffect } from 'react';

export interface ImageControlHandlers {
  handlePrev: () => void;
  handleNext: () => void;
  onClose: () => void;
}

export function useImageViewerControls(
  { handlePrev, handleNext, onClose }: ImageControlHandlers,
  modalRef: React.RefObject<HTMLDivElement>,
) {
  // Keyboard controls
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') onClose();

      // Focus trap
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

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY > 0) handleNext();
      else if (e.deltaY < 0) handlePrev();
    };

    const onTouchStart = (e: TouchEvent) => {
      const modal = modalRef.current;
      if (!modal || !modal.contains(e.target as Node)) return;
      const startX = e.touches[0].clientX;
      const onTouchEnd = (endEvent: TouchEvent) => {
        const endX = endEvent.changedTouches[0].clientX;
        const diff = startX - endX;
        if (Math.abs(diff) > 50) {
          if (diff > 0) handleNext();
          else handlePrev();
        }
        window.removeEventListener('touchend', onTouchEnd);
      };
      window.addEventListener('touchend', onTouchEnd);
    };

    window.addEventListener('keydown', onKey);
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart);

    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
    };
  }, [handlePrev, handleNext, onClose, modalRef]);

  // Focus management
  useEffect(() => {
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
  }, [modalRef]);
}
