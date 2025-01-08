"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useProjectStore } from "@store/projectStore";

const ProjectDetail = () => {
  const { selectedProject, isDetailOpen, closeDetail } = useProjectStore();

  if (!selectedProject) return null;

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: isDetailOpen ? 0 : "100%" }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 20 }}
      className="fixed top-0 right-0 w-full md:w-[60%] h-full bg-background border-l border-border overflow-y-auto"
      style={{ marginTop: "76px" }}
    >
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-text-primary">{selectedProject.title}</h3>
          <button onClick={closeDetail} className="text-text-secondary hover:text-primary" aria-label="Close detail">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-text-primary mb-2">Overview</h4>
            <p className="text-text-secondary">{selectedProject.details.overview}</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-text-primary mb-2">Features</h4>
            <ul className="list-disc list-inside text-text-secondary">
              {selectedProject.details.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-text-primary mb-2">Challenges & Solutions</h4>
            <ul className="list-disc list-inside text-text-secondary">
              {selectedProject.details.challenges.map((challenge, index) => (
                <li key={index}>{challenge}</li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {selectedProject.details.images.map((image, index) => (
              <div key={index} className="relative h-40">
                <Image src={image} alt={`Detail ${index + 1}`} fill className="object-cover rounded" />
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            <a
              href={selectedProject.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors text-center"
            >
              GitHub
            </a>
            <a
              href={selectedProject.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors text-center"
            >
              Live Demo
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDetail;
