'use client';

import { Suspense, lazy, useEffect } from 'react';

import IntroManager from '@components/common/IntroManager';
import Spinner from '@components/common/Spinner';
import { useIntroStore } from '@store/introStore';
import { useProjectStore } from '@store/projectStore';
import { motion } from 'framer-motion';

import LandingSelector from '@/components/client/LandingSelector';

import { useLandingStore } from '@/store/landingStore';

import { handleUrlHash } from '@/lib/urlHandlers';

// 조건부 lazy import - 인트로 완료 후에만 로드
const About = lazy(() => import('@components/sections/About'));
const Skills = lazy(() => import('@components/sections/Skills'));
const Projects = lazy(() => import('@components/sections/Projects'));
const Contact = lazy(() => import('@components/sections/Contact'));

export default function MainContent() {
  const { isIntroComplete } = useIntroStore();
  const { setSelectedProject, openDetail } = useProjectStore();
  const { isOpen: isLandingOpen } = useLandingStore();

  // URL 처리
  useEffect(() => {
    handleUrlHash({ setSelectedProject, openDetail });
  }, [setSelectedProject, openDetail]);

  return (
    <>
      {isLandingOpen ? (
        <LandingSelector />
      ) : (
        <>
          <LandingSelector />
          <IntroManager />
          {isIntroComplete && (
            <motion.main
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Suspense fallback={<Spinner />}>
                <About />
              </Suspense>
              <Suspense fallback={<Spinner />}>
                <Skills />
              </Suspense>
              <Suspense fallback={<Spinner />}>
                <Projects />
              </Suspense>
              <Suspense fallback={<Spinner />}>
                <Contact />
              </Suspense>
            </motion.main>
          )}
        </>
      )}
    </>
  );
}
