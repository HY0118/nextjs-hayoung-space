"use client";

import { motion } from "framer-motion";
import { useProjectStore, Project } from "@/store/projectStore";
import ProjectCard from "@components/projects/ProjectCard";
import ProjectDetail from "@components/projects/ProjectDetail";
import { projects } from "@/constants/projects";

const Projects = () => {
  const { selectedProject, setSelectedProject, openDetail, isDetailOpen } = useProjectStore();

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
    openDetail();
  };

  const getCardTransform = (index: number, projectId: string) => {
    if (!isDetailOpen || selectedProject?.id !== projectId) return 0;

    // 카드의 열 위치 계산 (0: 첫번째 열, 1: 두번째 열, 2: 세번째 열)
    const column = index % 3;
    // 카드 하나의 대략적인 너비(gap 포함)를 고려한 이동 거리 계산
    const moveDistance = column * -416; // 카드 너비 + gap을 고려한 값

    return moveDistance;
  };

  return (
    <section id="projects" className="relative py-20 min-h-screen flex flex-col justify-center">
      <motion.div
        className="max-w-7xl mx-auto px-8"
        animate={{
          x: isDetailOpen ? "-10%" : 0,
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <h2 className="text-4xl text-text-primary mb-8 relative inline-block after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-4 after:h-1 after:bg-primary">
          Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              animate={{
                opacity: isDetailOpen ? (selectedProject?.id === project.id ? 1 : 0) : 1,
                scale: isDetailOpen ? (selectedProject?.id === project.id ? 1 : 0.95) : 1,
                x: getCardTransform(index, project.id),
              }}
              transition={{
                duration: 0.4,
                ease: "easeInOut",
                opacity: { duration: 0.3 },
                scale: { duration: 0.3 },
              }}
              style={{
                pointerEvents: isDetailOpen && selectedProject?.id !== project.id ? "none" : "auto",
              }}
            >
              <ProjectCard project={project} onSelect={handleProjectSelect} />
            </motion.div>
          ))}
        </div>
      </motion.div>
      <ProjectDetail />
    </section>
  );
};

export default Projects;
