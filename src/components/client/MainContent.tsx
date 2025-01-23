"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useIntroStore } from "@store/introStore";
import TypeWriter from "@components/common/TypeWriter";
import { Suspense, useEffect } from "react";
import dynamic from "next/dynamic";
import Spinner from "@components/common/Spinner";
import { useProjectStore } from "@store/projectStore";
import { projects } from "@constants/projects";

// 각 섹션을 서버 컴포넌트로 동적 임포트
const About = dynamic(() => import("@components/sections/About"), {
  ssr: true,
  loading: () => <Spinner />,
});

const Skills = dynamic(() => import("@components/sections/Skills"), {
  ssr: true,
  loading: () => <Spinner />,
});

const Projects = dynamic(() => import("@components/sections/Projects"), {
  ssr: true,
  loading: () => <Spinner />,
});

const Contact = dynamic(() => import("@components/sections/Contact"), {
  ssr: true,
  loading: () => <Spinner />,
});

export default function MainContent() {
  const { isIntroComplete, setIntroComplete, initializeIntroState } = useIntroStore();
  const { setSelectedProject, openDetail } = useProjectStore();

  // 초기 상태 설정 및 URL 처리
  useEffect(() => {
    initializeIntroState();

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
  }, [initializeIntroState, setSelectedProject, openDetail]);

  return (
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
  );
}
