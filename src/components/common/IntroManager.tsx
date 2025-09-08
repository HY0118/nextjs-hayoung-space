'use client';

import { useEffect } from 'react';

import TypeWriter from '@components/common/TypeWriter';
import { useIntroStore } from '@store/introStore';
import { AnimatePresence, motion } from 'framer-motion';

import { useLandingStore } from '@/store/landingStore';

interface IntroManagerProps {
  onIntroComplete?: () => void;
}

export default function IntroManager({ onIntroComplete }: IntroManagerProps) {
  const { isIntroComplete, setIntroComplete, initializeIntroState } = useIntroStore();
  const { isOpen: isLandingOpen } = useLandingStore();

  // 초기 상태 설정
  useEffect(() => {
    initializeIntroState();

    // 개발 환경에서는 인트로 건너뛰기
    if (process.env.NODE_ENV === 'development') {
      setIntroComplete(true);
    }
  }, [initializeIntroState, setIntroComplete]);

  const shouldShowTypeWriter = !isIntroComplete && !isLandingOpen;

  const handleIntroComplete = () => {
    setTimeout(() => {
      setIntroComplete(true);
      onIntroComplete?.();
    }, 500);
  };

  if (isIntroComplete) return null;

  return (
    <AnimatePresence mode="wait">
      {shouldShowTypeWriter ? (
        <motion.div
          key="intro"
          className="min-h-screen flex items-center justify-center"
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <TypeWriter onComplete={handleIntroComplete} />
        </motion.div>
      ) : (
        // 랜딩 선택이 열려있는 동안에는 인트로를 시작하지 않고 대기
        <motion.div
          key="intro-wait"
          className="min-h-screen"
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        />
      )}
    </AnimatePresence>
  );
}
