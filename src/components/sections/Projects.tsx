"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useProjectStore } from "@store/projectStore";
import type { Project } from "@interfaces/project";
import ProjectCard from "@components/projects/ProjectCard";
import ProjectDetail from "@components/projects/ProjectDetail";
import { projects } from "@constants/projects";
import { useEffect } from "react";

const Projects = () => {
  const { setSelectedProject, openDetail, isDetailOpen } = useProjectStore();

  useEffect(() => {
    if (isDetailOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isDetailOpen]);

  const handleProjectSelect = async (project: Project) => {
    const card = document.querySelector(`#project-card-${project.id}`);
    if (!card) return;

    // 먼저 프로젝트를 선택
    setSelectedProject(project);

    // 스크롤 위치 계산
    const cardRect = card.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const scrollTo = window.scrollY + cardRect.top - (windowHeight - cardRect.height) / 2;

    // requestAnimationFrame을 사용하여 더 부드러운 스크롤 구현
    const startPosition = window.scrollY;
    const distance = scrollTo - startPosition;
    const duration = 400; // 스크롤 시간을 400ms로 단축
    const startTime = performance.now();

    return new Promise<void>((resolve) => {
      const animateScroll = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // easeInOutCubic 이징 함수 사용
        const easeProgress =
          progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        window.scrollTo(0, startPosition + distance * easeProgress);

        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        } else {
          // 스크롤이 완료되면 약간의 지연 후 디테일 뷰 열기
          setTimeout(() => {
            openDetail();
            resolve();
          }, 100); // 100ms 지연
        }
      };

      requestAnimationFrame(animateScroll);
    });
  };

  return (
    <section
      id="projects"
      className={`relative py-20 min-h-screen flex flex-col justify-center ${isDetailOpen ? "overflow-hidden" : ""}`}
    >
      <div className="mx-auto px-8">
        {!isDetailOpen && (
          <h2 className="text-4xl font-bold text-text-primary mb-16 relative font-sora inline-block after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-4 after:h-1 after:bg-primary">
            Projects
          </h2>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              id={`project-card-${project.id}`}
              initial={false}
              animate={{
                opacity: isDetailOpen ? 0.3 : 1,
                scale: isDetailOpen ? 0.98 : 1,
              }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              style={{
                pointerEvents: isDetailOpen ? "none" : "auto",
              }}
            >
              <ProjectCard project={project} onSelect={() => handleProjectSelect(project)} />
            </motion.div>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {isDetailOpen && (
          <motion.div
            key="project-detail-motion-div"
            initial={{ opacity: 0, x: "100%" }}
            animate={{
              opacity: isDetailOpen ? 1 : 0,
              x: isDetailOpen ? 0 : "100%",
            }}
            exit={{
              opacity: 0,
              x: "100%",
            }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
            className="fixed inset-0 z-50 bg-background/80 "
            style={{ pointerEvents: isDetailOpen ? "auto" : "none" }}
          >
            <ProjectDetail />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
