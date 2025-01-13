"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useProjectStore, Project } from "@store/projectStore";
import { useState } from "react";

const DemoMedia = ({ project }: { project: Project }) => {
  if (project.details.demoVideo) {
    return (
      <div className="relative w-full h-[auto] bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
        <video autoPlay loop muted playsInline className="w-full h-full object-contain">
          {project.details.demoVideo.webm && <source src={project.details.demoVideo.webm} type="video/webm" />}
          {project.details.demoVideo.mp4 && <source src={project.details.demoVideo.mp4} type="video/mp4" />}
        </video>
      </div>
    );
  }

  if (project.details.demoGif) {
    return (
      <div className="relative w-full h-[auto] bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
        <Image
          src={project.details.demoGif}
          alt={`${project.title} Demo`}
          fill
          className="object-contain"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={100}
        />
      </div>
    );
  }

  return null;
};

const ProjectDetail = () => {
  const { selectedProject, isDetailOpen, closeDetail } = useProjectStore();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!selectedProject) return null;

  return (
    <>
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

            {(selectedProject.details.demoGif || selectedProject.details.demoVideo) && (
              <div>
                <h4 className="text-lg font-semibold text-text-primary mb-2">Demo</h4>
                <DemoMedia project={selectedProject} />
              </div>
            )}

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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {selectedProject.details.images.map((image, index) => (
                <div 
                  key={index} 
                  className="group relative h-[360px] cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                  onClick={() => setSelectedImage(image)}
                >
                  <Image 
                    src={image} 
                    alt={`Detail ${index + 1}`} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-300" 
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <svg 
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m4-3H6"
                      />
                    </svg>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-4 p-8 border-t border-border sticky bottom-0">
              <div className="flex gap-4">
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-center flex items-center justify-center gap-2 font-medium"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    GitHub
                  </a>
                )}
                <a
                  href={selectedProject.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-6 py-3 rounded-lg text-center flex items-center justify-center gap-2 font-medium transition-colors
                    ${selectedProject.github ? "flex-1" : "w-full"} 
                    bg-gradient-to-r from-primary to-primary-light text-white 
                    hover:from-primary-dark hover:to-primary`}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  Live Demo
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full max-w-4xl h-[80vh]">
            <Image
              src={selectedImage}
              alt="Selected project image"
              fill
              className="object-contain"
              quality={100}
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-0 text-white hover:text-gray-300"
              aria-label="Close modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectDetail;
