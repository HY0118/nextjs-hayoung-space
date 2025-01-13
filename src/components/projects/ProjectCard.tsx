"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Project } from "@/store/projectStore";
import { getTechColor } from "@constants/techColors";

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

const ProjectCard = ({ project, onSelect }: ProjectCardProps) => {
  return (
    <motion.div
      onClick={() => onSelect(project)}
      className="w-full h-[500px] sm:w-[400px] bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden group 
      hover:-translate-y-2 hover:bg-gray-200 dark:hover:bg-gray-700
      transition-all duration-100 ease-in-out cursor-pointer
      hover:shadow-lg hover:shadow-primary/10"
      whileHover={{ scale: 1.02 }}
    >
      <div className="h-[300px] relative overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-100 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-6 h-[200px] flex flex-col">
        <h3 className="text-xl font-semibold text-text-primary mb-2">{project.title}</h3>
        <p className="text-text-secondary mb-4 line-clamp-2">{project.description}</p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className={`inline-flex items-center px-2 py-0.5 text-sm rounded-full font-medium ${getTechColor(tech)} line-clamp-1`}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
