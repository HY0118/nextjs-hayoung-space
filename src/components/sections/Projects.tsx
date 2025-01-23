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

    window.history.pushState({ projectId: project.id }, "", `/#projects/${project.id}`);
    setSelectedProject(project);

    const cardRect = card.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const scrollTo = window.scrollY + cardRect.top - (windowHeight - cardRect.height) / 2;

    const startPosition = window.scrollY;
    const distance = scrollTo - startPosition;
    const duration = 400;
    const startTime = performance.now();

    return new Promise<void>((resolve) => {
      const animateScroll = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
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
          }, 50);
        }
      };

      requestAnimationFrame(animateScroll);
    });
  };

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const path = window.location.hash;
      const projectMatch = path.match(/#projects\/(.+)/);

      if (!projectMatch) {
        setSelectedProject(null);
        document.body.style.overflow = "unset";
      } else if (event.state?.projectId) {
        const project = projects.find((p) => p.id === event.state.projectId);
        if (project) {
          setSelectedProject(project);
          openDetail();
        }
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [setSelectedProject, openDetail]);

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
