'use client';

import Image from 'next/image';

import { getTechColor } from '@constants/techColors';
import type { Project } from '@interfaces/project';
import { motion } from 'framer-motion';

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
      hover:shadow-lg hover:shadow-primary/10
      border-2 border-transparent hover:border-primary/20
      relative after:content-[''] after:absolute after:inset-0 
      after:border-[3px] after:border-transparent hover:after:border-primary/10 
      after:rounded-lg after:transition-all after:duration-300"
      whileHover={{ scale: 1.02 }}
    >
      <div className="h-[300px] relative overflow-hidden border-b border-gray-200 dark:border-gray-700">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className={`${project.imageFit === 'contain' ? 'object-contain p-6 bg-white' : 'object-cover'} transition-transform duration-100 group-hover:scale-105`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-6 h-[200px] flex flex-col">
        <h3 className="text-xl font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors font-sora">
          {project.title}
        </h3>
        <p className="text-text-secondary mb-4 line-clamp-2 group-hover:text-text-primary/90 transition-colors font-pret whitespace-pre-line">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className={`inline-flex items-center px-2 py-0.5 text-sm rounded-full font-medium font-pret
              ${getTechColor(tech)} 
              transition-all duration-300 
              group-hover:scale-105`}
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
