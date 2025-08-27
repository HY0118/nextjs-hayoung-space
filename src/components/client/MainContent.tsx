'use client';

import { Suspense, lazy, useEffect } from 'react';

import Spinner from '@components/common/Spinner';
import TypeWriter from '@components/common/TypeWriter';
import { projects } from '@constants/projects';
import { useIntroStore } from '@store/introStore';
import { useProjectStore } from '@store/projectStore';
import { AnimatePresence, motion } from 'framer-motion';

import LandingSelector from '@/components/client/LandingSelector';

import { useLandingStore } from '@/store/landingStore';

// 조건부 lazy import - 인트로 완료 후에만 로드
const About = lazy(() => import('@components/sections/About'));
const Skills = lazy(() => import('@components/sections/Skills'));
const Projects = lazy(() => import('@components/sections/Projects'));
const Contact = lazy(() => import('@components/sections/Contact'));

export default function MainContent() {
  const { isIntroComplete, setIntroComplete, initializeIntroState } = useIntroStore();
  const { setSelectedProject, openDetail } = useProjectStore();
  const { isOpen: isLandingOpen } = useLandingStore();

  // 초기 상태 설정 및 URL 처리
  useEffect(() => {
    initializeIntroState();

    // 개발 환경에서는 인트로 건너뛰기
    if (process.env.NODE_ENV === 'development') {
      setIntroComplete(true);
    }

    const hash = window.location.hash;
    if (!hash) return;

    const [section, projectId] = hash.replace('#', '').split('/');
    const targetSection = document.getElementById(section);

    if (targetSection) {
      // 해당 섹션으로 즉시 스크롤
      targetSection.scrollIntoView({ behavior: 'instant' });

      // 프로젝트 상세 페이지 처리
      if (section === 'projects' && projectId) {
        const project = projects.find((p) => p.id === projectId);
        if (project) {
          setSelectedProject(project);
          openDetail('panel');
        }
      }
    }
  }, [initializeIntroState, setSelectedProject, openDetail, setIntroComplete]);

  const shouldShowTypeWriter = !isIntroComplete && !isLandingOpen;

  return (
    <>
      {isLandingOpen ? (
        <LandingSelector />
      ) : (
        <>
          <LandingSelector />
          <AnimatePresence mode="wait">
            {shouldShowTypeWriter ? (
              <motion.div
                key="intro"
                className="min-h-screen flex items-center justify-center"
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <TypeWriter
                  onComplete={() => {
                    setTimeout(() => {
                      setIntroComplete(true);
                    }, 500);
                  }}
                />
              </motion.div>
            ) : isIntroComplete ? (
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
        </>
      )}
    </>
  );
}
