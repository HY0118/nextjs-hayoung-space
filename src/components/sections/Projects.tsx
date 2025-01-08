"use client";

import { motion } from "framer-motion";
import { useProjectStore, Project } from "@/store/projectStore";
import ProjectCard from "@components/projects/ProjectCard";
import ProjectDetail from "@components/projects/ProjectDetail";
import { projects } from "@/constants/projects";

const Projects = () => {
  const { selectedProject, setSelectedProject, openDetail } = useProjectStore();

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
    openDetail();
  };

  return (
    <section id="projects" className="relative py-20 min-h-screen">
      <motion.div
        className="max-w-7xl mx-auto px-8"
        animate={{
          width: selectedProject ? "60%" : "100%",
        }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-4xl text-text-primary mb-8 relative inline-block after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-4 after:h-1 after:bg-primary">
          Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} onSelect={handleProjectSelect} />
          ))}
        </div>
      </motion.div>
      <ProjectDetail />
    </section>
  );
};

export default Projects;
