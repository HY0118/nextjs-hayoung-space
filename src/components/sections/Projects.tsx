"use client";

import { motion } from "framer-motion";
import { useProjectStore, Project } from "@/store/projectStore";
import ProjectCard from "@components/projects/ProjectCard";
import ProjectDetail from "@components/projects/ProjectDetail";
import { projects } from "@/constants/projects";
import { useEffect } from "react";

const Projects = () => {
  const { selectedProject, setSelectedProject, openDetail, isDetailOpen } = useProjectStore();

  useEffect(() => {
    if (isDetailOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isDetailOpen]);

  const handleProjectSelect = async (project: Project, index: number) => {
    const card = document.querySelector(`#project-card-${project.id}`);
    if (!card) return;

    // 카드의 위치 정보 가져오기
    const cardRect = card.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const navbarHeight = 0; // 네비게이션 바 높이
    
    // 스크롤 위치 계산 시 네비게이션 바 높이를 고려
    const scrollTo = window.scrollY + cardRect.top - navbarHeight - (windowHeight - cardRect.height) / 2;

    // 부드러운 스크롤 애니메이션
    await new Promise((resolve) => {
      window.scrollTo({
        top: scrollTo,
        behavior: 'smooth'
      });
      // 스크롤 애니메이션 완료 대기
      setTimeout(resolve, 500);
    });

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
    <section id="projects" className={`relative py-20 min-h-screen flex flex-col justify-center ${
      isDetailOpen ? 'overflow-hidden' : ''
    }`}>
      <motion.div
        className="mx-auto px-8"
        animate={{
          x: isDetailOpen ? "-10%" : 0,
          width: isDetailOpen ? "67%" : "auto"
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        {!isDetailOpen && (
          <h2 className="text-4xl font-bold text-text-primary mb-16 relative font-sora inline-block after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-4 after:h-1 after:bg-primary">
            Projects
          </h2>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              id={`project-card-${project.id}`}
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
              <ProjectCard 
                project={project} 
                onSelect={() => handleProjectSelect(project, index)} 
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
      <ProjectDetail />
    </section>
  );
};

export default Projects;
