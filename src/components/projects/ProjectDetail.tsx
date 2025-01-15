"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useProjectStore } from "@store/projectStore";
import type { Project } from "@interfaces/project";
import { useState, useEffect } from "react";
import TableOfContents from "@components/projects/TableOfContents";

const DemoMedia = ({ project }: { project: Project }) => {
  if (project.details.demoVideo) {
    return (
      <div className="relative w-full h-[auto] bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-contain"
        >
          {project.details.demoVideo.webm && (
            <source src={project.details.demoVideo.webm} type="video/webm" />
          )}
          {project.details.demoVideo.mp4 && (
            <source src={project.details.demoVideo.mp4} type="video/mp4" />
          )}
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
  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    description?: string;
    index: number;
  } | null>(null);
  const [slideDirection, setSlideDirection] = useState<"left" | "right" | null>(
    null
  );

  // 이전 이미지로 이동
  const handlePrevImage = () => {
    if (!selectedProject || !selectedImage || selectedImage.index <= 0) return;
    setSlideDirection("right");
    const prevImage = selectedProject.details.images[selectedImage.index - 1];
    setSelectedImage({ ...prevImage, index: selectedImage.index - 1 });
  };

  // 다음 이미지로 이동
  const handleNextImage = () => {
    if (
      !selectedProject ||
      !selectedImage ||
      selectedImage.index >= selectedProject.details.images.length - 1
    )
      return;
    setSlideDirection("left");
    const nextImage = selectedProject.details.images[selectedImage.index + 1];
    setSelectedImage({ ...nextImage, index: selectedImage.index + 1 });
  };

  // 이미지 선택 시 인덱스도 함께 저장
  const handleImageSelect = (
    image: { url: string; description?: string },
    index: number
  ) => {
    setSelectedImage({ ...image, index });
  };

  // 키보드 이벤트 처리
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      if (e.key === "ArrowLeft") handlePrevImage();
      if (e.key === "ArrowRight") handleNextImage();
      if (e.key === "Escape") setSelectedImage(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage]);

  if (!selectedProject) return null;

  return (
    <>
      <TableOfContents />
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isDetailOpen ? 0 : "100%" }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 20 }}
        className="fixed top-0 right-0 w-full md:w-[60%] h-screen bg-background border-l border-border flex flex-col project-detail-content overflow-y-auto"
        style={{ marginTop: "76px" }}
      >
        <div className="px-8 py-4 border-b border-border bg-background/95 backdrop-blur-sm">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold text-text-primary font-sora">
              {selectedProject.title}
            </h3>
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
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 98 96"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
                      fill="currentColor"
                    />
                  </svg>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap">
                    <span className="font-semibold text-primary">Public</span>{" "}
                    GitHub Repository
                  </div>
                </a>
              ) : (
                <div
                  className="group relative p-2 rounded-lg flex items-center justify-center
                  text-text-secondary/70 cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <svg
                    className="w-6 h-6 opacity-70"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M.778 1.213a.768.768 0 0 0-.768.892l3.263 19.81c.084.5.515.868 1.022.873H19.95a.772.772 0 0 0 .77-.646l3.27-20.03a.768.768 0 0 0-.768-.891H.778zM14.52 15.53H9.522L8.17 8.466h7.561l-1.211 7.064z"
                      fill="currentColor"
                    />
                  </svg>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap">
                    <span className="font-semibold text-gray-400">Private</span>{" "}
                    Bitbucket Repository
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
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap">
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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-8 pb-32">
            <div className="space-y-6">
              <div id="overview">
                <h4 className="text-lg font-semibold text-text-primary mb-4 font-sora">
                  Overview & Key Achievements
                </h4>
                <p className="text-text-secondary whitespace-pre-line font-pret mb-6">
                  {selectedProject.details.overview}
                </p>
                {selectedProject.details.achievements && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {selectedProject.details.achievements.map(
                      (achievement, index) => (
                        <div
                          key={index}
                          className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-center"
                        >
                          <div className="text-2xl font-bold text-primary">
                            {achievement.value}
                          </div>
                          <div className="text-sm text-text-secondary">
                            {achievement.label}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>

              {(selectedProject.details.demoGif ||
                selectedProject.details.demoVideo) && (
                <div id="demo">
                  <h4 className="text-lg font-semibold text-text-primary mb-2 font-sora">
                    Demo
                  </h4>
                  <DemoMedia project={selectedProject} />
                </div>
              )}

              {selectedProject.details.problemStatement && (
                <div id="problem-solution">
                  <h4 className="text-lg font-semibold text-text-primary mb-4 font-sora">
                    Problem & Solution Statement
                  </h4>
                  <div className="space-y-4">
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                      <h5 className="font-medium text-primary mb-2">
                        Problem Statement
                      </h5>
                      <p className="text-text-secondary">
                        {selectedProject.details.problemStatement}
                      </p>
                    </div>
                    {selectedProject.details.solutionApproach && (
                      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                        <h5 className="font-medium text-primary mb-2">
                          Solution Approach
                        </h5>
                        <p className="text-text-secondary">
                          {selectedProject.details.solutionApproach}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div id="features">
                <h4 className="text-lg font-semibold text-text-primary mb-4 font-sora">
                  Key Features & Implementation
                </h4>
                <div className="space-y-4">
                  {selectedProject.details.features.map((feature, index) => (
                    <div
                      key={index}
                      className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg"
                    >
                      <h5 className="font-medium text-primary mb-2">
                        {feature.name}
                      </h5>
                      <p className="text-text-secondary mb-2">
                        {feature.description}
                      </p>
                      {feature.implementation && (
                        <div className="text-sm text-text-secondary">
                          <span className="font-medium">
                            Technical Implementation:
                          </span>{" "}
                          {feature.implementation}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {selectedProject.details.architecture && (
                <div id="architecture">
                  <h4 className="text-lg font-semibold text-text-primary mb-4 font-sora">
                    Architecture
                  </h4>
                  <Image
                    src={selectedProject.details.architecture}
                    alt="System Architecture"
                    width={800}
                    height={400}
                    className="rounded-lg"
                  />
                </div>
              )}

              <div id="tech-stack">
                <h4 className="text-lg font-semibold text-text-primary mb-4 font-sora">
                  Tech Stack
                </h4>
                <div className="space-y-6">
                  {selectedProject.details.techStack.map((category, index) => (
                    <div key={index}>
                      <h5 className="text-md font-medium text-primary mb-3 font-sora">
                        {category.category}
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {category.items.map((tech, techIndex) => (
                          <div
                            key={techIndex}
                            className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg"
                          >
                            <h6 className="font-medium text-text-primary mb-2 font-sora">
                              {tech.name}
                            </h6>
                            <p className="text-sm text-text-secondary font-pret whitespace-pre-line">
                              {tech.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {selectedProject.details.performance && (
                <div id="performance">
                  <h4 className="text-lg font-semibold text-text-primary mb-4 font-sora">
                    Performance
                  </h4>
                  <div className="space-y-4">
                    {selectedProject.details.performance.map(
                      (metric, index) => (
                        <div
                          key={index}
                          className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg"
                        >
                          <h5 className="font-medium text-primary mb-2">
                            {metric.name}
                          </h5>
                          <div className="flex items-center gap-4">
                            <div className="text-2xl font-bold text-green-500">
                              {metric.improvement}
                            </div>
                            <p className="text-text-secondary">
                              {metric.description}
                            </p>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              {selectedProject.details.testing && (
                <div id="testing">
                  <h4 className="text-lg font-semibold text-text-primary mb-4 font-sora">
                    Testing & Quality Assurance
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedProject.details.testing.map((test, index) => (
                      <div
                        key={index}
                        className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-green-500">✓</span>
                          <span className="font-medium">{test.name}</span>
                        </div>
                        <p className="text-sm text-text-secondary">
                          {test.description}
                        </p>
                        {test.coverage && (
                          <div className="mt-2">
                            <div className="h-2 bg-gray-200 rounded-full">
                              <div
                                className="h-full bg-green-500 rounded-full"
                                style={{ width: `${test.coverage}%` }}
                              />
                            </div>
                            <span className="text-sm text-text-secondary">
                              {test.coverage}% Coverage
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div id="learnings">
                <h4 className="text-lg font-semibold text-text-primary mb-4 font-sora">
                  Key Learnings
                </h4>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <ul className="list-disc list-inside text-text-secondary space-y-2">
                    {selectedProject.details.lessons.map((lesson, index) => (
                      <li key={index}>{lesson}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {selectedProject.details.futureImprovements && (
                <div id="future-improvements">
                  <h4 className="text-lg font-semibold text-text-primary mb-4 font-sora">
                    Future Improvements
                  </h4>
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                    <ul className="list-disc list-inside text-text-secondary space-y-2">
                      {selectedProject.details.futureImprovements.map(
                        (improvement, index) => (
                          <li key={index}>{improvement}</li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              )}

              <div id="screenshots">
                <h4 className="text-lg font-semibold text-text-primary mb-4 font-sora">
                  Screenshots & Interface
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {selectedProject.details.images.map((image, index) => (
                    <div
                      key={index}
                      className="group relative h-[360px] cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                      onClick={() => handleImageSelect(image, index)}
                    >
                      <Image
                        src={image.url}
                        alt={image.description || ""}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        quality={100}
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
        </div>
      </motion.div>

      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative max-w-5xl w-full h-[80vh] bg-background rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              key={selectedImage.url}
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                x: slideDirection
                  ? slideDirection === "left"
                    ? [200, 0]
                    : [-200, 0]
                  : 0,
              }}
              transition={{
                duration: 0.4,
                ease: "easeInOut",
              }}
              className="relative w-full h-full"
            >
              <Image
                src={selectedImage.url}
                alt={selectedImage.description || ""}
                fill
                className="object-contain"
                quality={100}
                sizes="(max-width: 1024px) 100vw, 80vw"
              />
            </motion.div>
            {selectedImage.description && (
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/50 text-white">
                <p className="text-sm text-center">
                  {selectedImage.description}
                </p>
              </div>
            )}
            {selectedImage.index > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevImage();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 backdrop-blur-sm 
                  text-text-primary hover:text-primary hover:bg-background transition-all duration-300 z-10"
                aria-label="Previous image"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            )}
            {selectedImage.index <
              (selectedProject?.details.images.length ?? 0) - 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextImage();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 backdrop-blur-sm 
                  text-text-primary hover:text-primary hover:bg-background transition-all duration-300 z-10"
                aria-label="Next image"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            )}
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default ProjectDetail;
