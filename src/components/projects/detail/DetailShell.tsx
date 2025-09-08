'use client';

import { cn } from '@/utils/cn';
import { motion } from 'framer-motion';

import type { DetailShellProps } from '@/interfaces/projectDetail';

const DetailShell = ({
  header,
  marginTop = '0px',
  children,
  className,
  backgroundClassName = 'bg-white dark:bg-background',
  borderClassName = 'border-l border-border',
  headerPaddingClassName = 'px-8 py-6',
  contentPaddingClassName = 'px-8 py-12',
  maxWidthClassName = 'max-w-7xl',
  variant = 'panel',
}: DetailShellProps) => {
  if (variant === 'modal') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className={cn(
          'fixed inset-0 z-50 flex items-start justify-center p-4 md:p-6 overflow-hidden',
          className,
        )}
      >
        <div
          className={cn(
            backgroundClassName,
            'w-full',
            'rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden mt-6 md:mt-10',
            maxWidthClassName,
          )}
        >
          <div className={cn('border-b border-border', headerPaddingClassName)}>
            {header}
          </div>
          {/* Scroll area lives inside container to keep scrollbar within rounded corners */}
          <div
            className={cn(
              'max-h-[75vh] overflow-y-auto transparent-scrollbar',
              '[scrollbar-gutter:stable]',
              'pr-3 -mr-3',
            )}
          >
            <div className={cn(contentPaddingClassName)}>{children}</div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={cn(
        'fixed top-0 right-0 w-full h-screen',
        backgroundClassName,
        borderClassName,
        'flex flex-col project-detail-content overflow-y-auto overscroll-contain touch-pan-y',
        className,
      )}
      style={{ marginTop }}
    >
      <div
        className={cn('sticky top-0 z-10', backgroundClassName, 'border-b border-border')}
      >
        <div className={cn(maxWidthClassName, 'mx-auto', headerPaddingClassName)}>
          {header}
        </div>
      </div>

      <div className={cn('flex-1 overflow-y-auto overscroll-contain')}>
        <div className={cn(maxWidthClassName, 'mx-auto', contentPaddingClassName)}>
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export default DetailShell;
