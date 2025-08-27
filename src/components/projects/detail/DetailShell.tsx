'use client';

import { motion } from 'framer-motion';

import { cn } from '@/lib/cn';

import type { DetailShellProps } from '@/interfaces/projectDetail';

const DetailShell = ({
  header,
  marginTop = '73px',
  children,
  className,
  backgroundClassName = 'bg-white dark:bg-background',
  borderClassName = 'border-l border-border',
  headerPaddingClassName = 'px-8 py-6',
  contentPaddingClassName = 'px-8 py-12',
  maxWidthClassName = 'max-w-7xl',
}: DetailShellProps) => {
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
