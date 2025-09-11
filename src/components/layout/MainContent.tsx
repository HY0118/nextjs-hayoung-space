'use client';

import { Suspense, lazy, useEffect } from 'react';

import { handleUrlHash } from '@/utils/api/url';
import IntroManager from '@components/shared/IntroManager';
import SectionDivider from '@components/shared/SectionDivider';
import Spinner from '@components/shared/Spinner';
import { useIntroStore } from '@store/introStore';
import { useProjectStore } from '@store/projectStore';
import { motion } from 'framer-motion';

import LandingSelector from '@/components/landing/LandingSelector';

import { useLandingStore } from '@/store/landingStore';

// 조건부 lazy import - 인트로 완료 후에만 로드
const About = lazy(() => import('@components/sections/About'));
const Skills = lazy(() => import('@components/sections/Skills'));
const Projects = lazy(() => import('@components/sections/Projects'));
const TechnicalIssues = lazy(() => import('@components/sections/TechnicalIssues'));
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

              <SectionDivider />

              <Suspense fallback={<Spinner />}>
                <Skills />
              </Suspense>

              <SectionDivider />

              <Suspense fallback={<Spinner />}>
                <Projects />
              </Suspense>

              <SectionDivider />

              <Suspense fallback={<Spinner />}>
                <TechnicalIssues />
              </Suspense>

              <SectionDivider />

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
