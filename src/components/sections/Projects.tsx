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

    setSelectedProject(project);

    const cardRect = card.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const scrollTo =
      window.scrollY + cardRect.top - (windowHeight - cardRect.height) / 2;

    const startPosition = window.scrollY;
    const distance = scrollTo - startPosition;
    const duration = 400; // 지속 시간을 400ms로 줄임
    const startTime = performance.now();

    return new Promise<void>((resolve) => {
      const animateScroll = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // easeOutQuart 이징 함수 사용
        const easeProgress = 1 - Math.pow(1 - progress, 4);

        window.scrollTo({
          top: startPosition + distance * easeProgress,
          behavior: "auto",
        });

        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        } else {
          setTimeout(() => {
            openDetail();
            resolve();
          }, 50); // 딜레이를 50ms로 줄임
        }
      };

      requestAnimationFrame(animateScroll);
    });
  };

  // bezier 이징 함수 구현
  const bezierEasing = (x1: number, y1: number, x2: number, y2: number) => {
    return (t: number): number => {
      if (t === 0 || t === 1) {
        return t;
      }

      let start = 0;
      let end = 1;

      for (let i = 0; i < 10; i++) {
        const current = (start + end) / 2;
        const x = calculateBezier(current, x1, x2);

        if (Math.abs(x - t) < 0.001) {
          return calculateBezier(current, y1, y2);
        }

        if (x < t) {
          start = current;
        } else {
          end = current;
        }
      }

      return calculateBezier((start + end) / 2, y1, y2);
    };
  };

  const calculateBezier = (t: number, p1: number, p2: number): number => {
    const mt = 1 - t;
    return 3 * mt * mt * t * p1 + 3 * mt * t * t * p2 + t * t * t;
  };

  return (
    <section
      id="projects"
      className={`relative py-20 min-h-screen flex flex-col justify-center ${
        isDetailOpen ? "overflow-hidden" : ""
      }`}
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
              <ProjectCard
                project={project}
                onSelect={() => handleProjectSelect(project)}
              />
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
