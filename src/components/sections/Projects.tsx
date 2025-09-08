'use client';

import { useEffect } from 'react';

import { handleProjectSelect } from '@/utils/handlers/project';
import { setupProjectHistory } from '@/utils/handlers/projectHistory';
import { AnimatePresence, motion } from 'framer-motion';

import ProjectCard from '@/components/projects/ProjectCard';
import ProjectDetail from '@/components/projects/ProjectDetail';

import { useProjectStore } from '@/store/projectStore';

import { projects } from '@/constants/projects';

const Projects = () => {
  const { setSelectedProject, openDetail, isDetailOpen, detailMode } = useProjectStore();

  // body overflow 관리
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

  // 히스토리 관리
  useEffect(() => {
    return setupProjectHistory({ setSelectedProject, openDetail });
  }, [setSelectedProject, openDetail]);

  return (
    <section
      id="projects"
      className={`relative py-20 min-h-screen flex flex-col justify-center bg-background ${
        isDetailOpen ? 'overflow-hidden' : ''
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
                ease: 'easeInOut',
              }}
              style={{
                pointerEvents: isDetailOpen ? 'none' : 'auto',
              }}
            >
              <ProjectCard
                project={project}
                onSelect={() =>
                  handleProjectSelect(project, { setSelectedProject, openDetail })
                }
              />
            </motion.div>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {isDetailOpen && detailMode === 'panel' && (
          <motion.div
            key="project-detail-motion-div"
            initial={{ opacity: 0, x: '100%' }}
            animate={{
              opacity: isDetailOpen ? 1 : 0,
              x: isDetailOpen ? 0 : '100%',
            }}
            exit={{
              opacity: 0,
              x: '100%',
            }}
            transition={{
              duration: 0.5,
              ease: 'easeInOut',
            }}
            className="fixed inset-0 z-50 bg-background/80 overflow-hidden"
            style={{ pointerEvents: isDetailOpen ? 'auto' : 'none' }}
          >
            <ProjectDetail />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
