'use client';

import { usePathname } from 'next/navigation';

import { useIntroStore } from '@store/introStore';
import { AnimatePresence, motion } from 'framer-motion';

const Footer = () => {
  const isIntroComplete = useIntroStore((state) => state.isIntroComplete);
  const pathname = usePathname();

  // quick-portfolio 페이지에서는 헤더 숨김
  if (pathname?.startsWith('/quick-portfolio')) {
    return null;
  }

  return (
    <AnimatePresence>
      {isIntroComplete && (
        <motion.footer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="py-8 border-t border-border"
        >
          <div className="max-w-7xl mx-auto px-8 text-center text-text-secondary">
            <p suppressHydrationWarning>
              &copy;{' '}
              {new Date().toLocaleDateString('ko-KR', {
                year: 'numeric',
                timeZone: 'Asia/Seoul',
              })}{' '}
              hayoung. All rights reserved.
            </p>
          </div>
        </motion.footer>
      )}
    </AnimatePresence>
  );
};

export default Footer;
