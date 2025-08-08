"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useIntroStore } from "@store/introStore";
import TypeWriter from "@components/common/TypeWriter";
import { Suspense, useEffect, lazy } from "react";
import Spinner from "@components/common/Spinner";
import { useProjectStore } from "@store/projectStore";
import { projects } from "@constants/projects";
import LandingSelector from "@/components/client/LandingSelector";

// 조건부 lazy import - 인트로 완료 후에만 로드
const About = lazy(() => import("@components/sections/About"));
const Skills = lazy(() => import("@components/sections/Skills"));
const Projects = lazy(() => import("@components/sections/Projects"));
const Contact = lazy(() => import("@components/sections/Contact"));

export default function MainContent() {
  const { isIntroComplete, setIntroComplete, initializeIntroState } = useIntroStore();
  const { setSelectedProject, openDetail } = useProjectStore();

  // 초기 상태 설정 및 URL 처리
  useEffect(() => {
    initializeIntroState();

    // 개발 환경에서는 인트로 건너뛰기
    if (process.env.NODE_ENV === 'development') {
      setIntroComplete(true);
    }

    const hash = window.location.hash;
    if (!hash) return;

    const [section, projectId] = hash.replace("#", "").split("/");
    const targetSection = document.getElementById(section);

    if (targetSection) {
      // 해당 섹션으로 즉시 스크롤
      targetSection.scrollIntoView({ behavior: "instant" });

      // 프로젝트 상세 페이지 처리
      if (section === "projects" && projectId) {
        const project = projects.find((p) => p.id === projectId);
        if (project) {
          setSelectedProject(project);
          openDetail();
        }
      }
    }
  }, [initializeIntroState, setSelectedProject, openDetail, setIntroComplete]);

  return (
    <>
      <LandingSelector />
      <AnimatePresence mode="wait">
        {!isIntroComplete ? (
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
        ) : (
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
      </AnimatePresence>
    </>
  );
}
