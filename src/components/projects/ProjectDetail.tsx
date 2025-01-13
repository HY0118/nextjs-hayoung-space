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
        className="fixed top-0 right-0 w-full md:w-[60%] h-screen bg-background border-l border-border"
        style={{ marginTop: "76px" }}
      >
        <div className="h-[calc(100vh-76px)] overflow-y-auto">
          <div className="p-8 pb-32">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-text-primary font-sora">{selectedProject.title}</h3>
              <div className="flex items-center gap-4">
                {selectedProject.github ? (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-2 rounded-lg flex items-center justify-center
                      text-text-primary hover:text-text-primary-dark hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    aria-label="GitHub Repository"
                  >
                    <svg className="w-6 h-6" viewBox="0 0 98 96" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" fill="currentColor"/>
                    </svg>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap">
                      GitHub Repository
                    </div>
                  </a>
                ) : (
                  <div className="group relative p-2 rounded-lg flex items-center justify-center
                    text-text-secondary cursor-help hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M.778 1.213a.768.768 0 0 0-.768.892l3.263 19.81c.084.5.515.868 1.022.873H19.95a.772.772 0 0 0 .77-.646l3.27-20.03a.768.768 0 0 0-.768-.891H.778zM14.52 15.53H9.522L8.17 8.466h7.561l-1.211 7.064z" fill="currentColor"/>
                    </svg>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap">
                      Private Bitbucket Repository
                    </div>
                  </div>
                )}
                <a
                  href={selectedProject.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-2 rounded-lg flex items-center justify-center
                    text-primary hover:text-primary-dark hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Try demo"
                >
                  <svg
                    className="w-6 h-6"
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
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap">
                    Try it out
                  </div>
                </a>
                <button 
                  onClick={closeDetail} 
                  className="p-2 rounded-lg text-text-secondary hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300" 
                  aria-label="Close detail"
                >
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
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-text-primary mb-2 font-sora">Overview</h4>
                <p className="text-text-secondary font-pret">{selectedProject.details.overview}</p>
              </div>

              {(selectedProject.details.demoGif || selectedProject.details.demoVideo) && (
                <div>
                  <h4 className="text-lg font-semibold text-text-primary mb-2 font-sora">Demo</h4>
                  <DemoMedia project={selectedProject} />
                </div>
              )}

              <div>
                <h4 className="text-lg font-semibold text-text-primary mb-2 font-sora">Features</h4>
                <ul className="list-disc list-inside text-text-secondary font-pret">
                  {selectedProject.details.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-text-primary mb-2 font-sora">Challenges & Solutions</h4>
                <ul className="list-disc list-inside text-text-secondary font-pret">
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
