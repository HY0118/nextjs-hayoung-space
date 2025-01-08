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
      className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden group 
      hover:-translate-y-2 hover:bg-gray-200 dark:hover:bg-gray-700
      transition-all duration-300 ease-in-out
      hover:shadow-lg hover:shadow-primary/10"
      whileHover={{ scale: 1.02 }}
    >
      <div className="h-48 relative overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-text-primary mb-2">{project.title}</h3>
        <p className="text-text-secondary mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className={`inline-flex items-center px-3 py-1 text-sm rounded-full font-medium ${getTechColor(tech)}`}
            >
              {tech}
            </span>
          ))}
        </div>
        <button
          onClick={() => onSelect(project)}
          className="w-full px-4 py-2 bg-primary text-white rounded 
          hover:bg-primary-dark transition-colors
          focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          자세히 보기
        </button>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
