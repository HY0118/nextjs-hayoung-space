"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useProjectStore } from "@store/projectStore";
import type { Project } from "@interfaces/project";
import { useState, useEffect, useCallback } from "react";
import ExternalLinkIcon from "@/components/icons/ExternalLinkIcon";
import TableOfContents from "@components/projects/TableOfContents";

const DemoMedia = ({ project }: { project: Project }) => {
  if (project.details.demoVideo) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full aspect-video bg-gradient-to-br from-gray-100/60 to-gray-100/80 dark:from-gray-800/60 dark:to-gray-800/80 rounded-xl overflow-hidden shadow-lg backdrop-blur-xl"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover transform hover:scale-[1.02] transition-transform duration-300"
        >
          {project.details.demoVideo.mp4 && <source src={project.details.demoVideo.mp4} type="video/mp4" />}
        </video>
      </motion.div>
    );
  }

  if (project.details.demoGif) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full aspect-video bg-gradient-to-br from-gray-100/60 to-gray-100/80 dark:from-gray-800/60 dark:to-gray-800/80 rounded-xl overflow-hidden shadow-lg backdrop-blur-xl"
      >
        <Image
          src={project.details.demoGif}
          alt={`${project.title} Demo`}
          fill
          className="object-cover transform hover:scale-[1.02] transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={100}
        />
      </motion.div>
    );
  }

  return null;
};

const PerformanceBar = ({ metric }: { metric: { name: string; improvement: string; description: string } }) => {
  const value = parseInt(metric.improvement.replace(/[^0-9]/g, ""));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/80 dark:to-gray-900 p-6 rounded-xl shadow-lg backdrop-blur-sm group hover:shadow-xl transition-all duration-300"
    >
      <h5 className="font-medium text-primary mb-4 font-sora">{metric.name}</h5>
      <div className="relative">
        <div className="flex items-end gap-2 mb-2">
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold bg-gradient-to-r from-green-400 to-primary bg-clip-text text-transparent">
              {value}
            </span>
            <span className="text-xl text-text-secondary">%</span>
          </div>
          <div className="flex justify-between items-center text-green-500 dark:text-green-400">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
        </div>
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-green-400 to-primary group-hover:from-green-500 group-hover:to-primary-dark transition-colors duration-300"
          />
        </div>
        <p className="mt-4 text-sm text-text-secondary">{metric.description}</p>
      </div>
    </motion.div>
  );
};

const ProjectDetail = () => {
  const { selectedProject, closeDetail, setSelectedProject } = useProjectStore();
  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    description?: string;
    index: number;
  } | null>(null);
  const [slideDirection, setSlideDirection] = useState<"left" | "right" | null>(null);

  // 이전 이미지로 이동
  const handlePrevImage = useCallback(() => {
    if (!selectedProject || !selectedImage || selectedImage.index <= 0) return;
    setSlideDirection("right");
    const prevImage = selectedProject.details.images[selectedImage.index - 1];
    setSelectedImage({ ...prevImage, index: selectedImage.index - 1 });
  }, [selectedProject, selectedImage]);

  // 다음 이미지로 이동
  const handleNextImage = useCallback(() => {
    if (!selectedProject || !selectedImage || selectedImage.index >= selectedProject.details.images.length - 1) return;
    setSlideDirection("left");
    const nextImage = selectedProject.details.images[selectedImage.index + 1];
    setSelectedImage({ ...nextImage, index: selectedImage.index + 1 });
  }, [selectedProject, selectedImage]);

  // 이미지 선택 시 인덱스도 함께 저장
  const handleImageSelect = (image: { url: string; description?: string }, index: number) => {
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
  }, [selectedImage, handlePrevImage, handleNextImage]);

  const handleClose = () => {
    window.history.pushState({}, "", "/#projects");
    closeDetail();
    setSelectedProject(null);
    document.body.style.overflow = "unset";
  };

  if (!selectedProject) return null;

  return (
    <>
      <TableOfContents />
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed top-0 right-0 w-full h-screen bg-white border-l border-border flex flex-col project-detail-content overflow-y-auto"
        style={{ marginTop: "73px" }}
      >
        <div className="sticky top-0 z-10 bg-white border-b border-border">
          <div className="max-w-7xl mx-auto px-8 py-6">
            <div className="flex justify-between items-center">
              <motion.h3
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-bold text-text-primary font-sora bg-gradient-to-r from-primary to-primary-dark bg-clip-text"
              >
                {selectedProject.title}
              </motion.h3>

              <div className="flex items-center gap-4">
                {selectedProject.github ? (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-2 rounded-lg flex items-center justify-center
                      text-text-primary hover:text-text-primary-dark border border-gray-200 dark:border-gray-700
                      hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600
                      transition-all duration-200"
                    aria-label="GitHub Repository"
                  >
                    <svg className="w-6 h-6" viewBox="0 0 98 96" xmlns="http://www.w3.org/2000/svg">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
                        fill="currentColor"
                      />
                    </svg>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap">
                      <span className="font-semibold text-primary">Public</span> GitHub Repository
                    </div>
                  </a>
                ) : (
                  <div
                    className="group relative p-2 rounded-lg flex items-center justify-center
                    text-text-secondary/70 cursor-not-allowed border border-gray-200 dark:border-gray-700
                    hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                  >
                    <svg className="w-6 h-6 opacity-70" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M.778 1.213a.768.768 0 0 0-.768.892l3.263 19.81c.084.5.515.868 1.022.873H19.95a.772.772 0 0 0 .77-.646l3.27-20.03a.768.768 0 0 0-.768-.891H.778zM14.52 15.53H9.522L8.17 8.466h7.561l-1.211 7.064z"
                        fill="currentColor"
                      />
                    </svg>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap">
                      <span className="font-semibold text-gray-400">Private</span> Bitbucket Repository
                    </div>
                  </div>
                )}
                {selectedProject.npm && (
                  <a
                    href={selectedProject.npm}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-2 rounded-lg flex items-center justify-center
                      text-[#CB3837] hover:text-[#AB2B2A] border border-gray-200 dark:border-gray-700
                      hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600
                      transition-all duration-200"
                    aria-label="NPM Package"
                  >
                    <svg className="w-7 h-7" viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M288 288h-32v-64h32v64zm288-128v192H288v32H160v-32H0V160h576zm-416 32H32v128h64v-96h32v96h32V192zm160 0H192v160h64v-32h64V192zm224 0H352v128h64v-96h32v96h32v-96h32v96h32V192z"
                        fill="currentColor"
                      />
                    </svg>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap">
                      <span className="font-semibold text-red-400">NPM</span> Package
                    </div>
                  </a>
                )}
                <a
                  href={selectedProject.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-2 rounded-lg flex items-center justify-center
                    text-primary hover:text-primary-dark border border-gray-200 dark:border-gray-700
                    hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600
                    transition-all duration-200"
                  aria-label="Try demo"
                >
                  <ExternalLinkIcon className="w-6 h-6" />
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap">
                    Try it out
                  </div>
                </a>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleClose}
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
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-8 py-12">
            {/* 1. Overview & Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              id="overview"
              className="mb-8"
            >
              <h4 className="text-2xl font-semibold text-text-primary mb-6 font-sora relative inline-block after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-2 after:h-0.5 after:bg-primary after:transform after:scale-x-0 after:hover:scale-x-100 after:transition-transform after:duration-300">
                Overview & Achievements
              </h4>
              <p className="text-lg whitespace-pre-line font-pret leading-relaxed">
                {selectedProject.details.overview}
              </p>
              {selectedProject.details.achievements && selectedProject.details.achievements.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 mt-8 gap-6">
                  {selectedProject.details.achievements?.map(
                    (achievement: { value: string; label: string }, index: number) => (
                      <div
                        key={index}
                        className="p-6 bg-gray-100 dark:bg-gray-800 rounded-xl text-center transform hover:scale-105 transition-all duration-300"
                      >
                        <div className="text-3xl font-bold text-primary mb-2">{achievement.value}</div>
                        <div className="text-sm text-text-secondary">{achievement.label}</div>
                      </div>
                    )
                  )}
                </div>
              )}
            </motion.div>

            {/* 2. Demo */}
            {(selectedProject.details.demoVideo?.mp4 || selectedProject.details.demoGif) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                id="demo"
                className="mb-16"
              >
                <h4 className="text-2xl font-semibold text-text-primary mb-6 font-sora relative inline-block after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-2 after:h-0.5 after:bg-primary after:transform after:scale-x-0 after:hover:scale-x-100 after:transition-transform after:duration-300">
                  Demo
                </h4>
                <div className="aspect-video w-full h-full rounded-xl overflow-hidden shadow-lg">
                  <DemoMedia project={selectedProject} />
                </div>
              </motion.div>
            )}

            {/* 3. Problem & Solution */}
            {(selectedProject.details.problemStatement || selectedProject.details.solutionApproach) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                id="problem-solution"
                className="mb-16"
              >
                <h4 className="text-2xl font-semibold text-text-primary mb-6 font-sora relative inline-block after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-2 after:h-0.5 after:bg-primary after:transform after:scale-x-0 after:hover:scale-x-100 after:transition-transform after:duration-300">
                  Project Background & Strategy
                </h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {selectedProject.details.problemStatement && (
                    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl">
                      <h5 className="text-lg font-medium text-primary mb-4">Background</h5>
                      <p>{selectedProject.details.problemStatement}</p>
                    </div>
                  )}
                  {selectedProject.details.solutionApproach && (
                    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl">
                      <h5 className="text-lg font-medium text-primary mb-4">Strategic Approach</h5>
                      <p>{selectedProject.details.solutionApproach}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* 4. Key Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              id="features"
              className="mb-16"
            >
              <h4 className="text-2xl font-semibold text-text-primary mb-6 font-sora relative inline-block after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-2 after:h-0.5 after:bg-primary after:transform after:scale-x-0 after:hover:scale-x-100 after:transition-transform after:duration-300">
                Key Features & Implementation
              </h4>
              <div className="space-y-4">
                {selectedProject.details.features.map(
                  (
                    feature: {
                      name: string;
                      description: string;
                      implementation?: string;
                    },
                    index: number
                  ) => (
                    <div key={index} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                      <h5 className="font-medium text-primary mb-2">{feature.name}</h5>
                      <p className="text-text-secondary mb-2">{feature.description}</p>
                      {feature.implementation && (
                        <div className="text-sm text-text-secondary">
                          <span className="font-bold">Implementation - </span> {feature.implementation}
                        </div>
                      )}
                    </div>
                  )
                )}
              </div>
            </motion.div>

            {/* 5. Architecture & Tech Stack */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              id="tech-stack"
              className="mb-16"
            >
              <h4 className="text-2xl font-semibold text-text-primary mb-6 font-sora relative inline-block after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-2 after:h-0.5 after:bg-primary after:transform after:scale-x-0 after:hover:scale-x-100 after:transition-transform after:duration-300">
                Architecture & Tech Stack
              </h4>
              {selectedProject.details.architecture && (
                <div className="mb-8">
                  <h5 className="text-lg font-medium text-primary mb-4">System Architecture</h5>
                  <Image
                    src={selectedProject.details.architecture}
                    alt="System Architecture"
                    width={1200}
                    height={600}
                    className="rounded-xl"
                  />
                </div>
              )}
              <div className="space-y-6">
                {selectedProject.details.techStack.map(
                  (
                    category: {
                      category: string;
                      items: Array<{ name: string; description: string }>;
                    },
                    index: number
                  ) => (
                    <div key={index}>
                      <h5 className="text-md font-medium text-primary mb-3 font-sora">{category.category}</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {category.items.map((tech: { name: string; description: string }, techIndex: number) => (
                          <div key={techIndex} className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                            <h6 className="font-medium text-text-primary mb-2 font-sora">{tech.name}</h6>
                            <p className="text-sm text-text-secondary font-pret whitespace-pre-line">
                              {tech.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                )}
              </div>
            </motion.div>

            {/* 6. Performance */}
            {selectedProject.details.performance && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                id="performance"
                className="mb-16"
              >
                <h4 className="text-2xl font-semibold text-text-primary mb-8 font-sora relative inline-block after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-2 after:h-0.5 after:bg-primary after:transform after:scale-x-0 after:hover:scale-x-100 after:transition-transform after:duration-300">
                  Performance Improvements
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {selectedProject.details.performance.map((metric, index) => (
                    <PerformanceBar key={index} metric={metric} />
                  ))}
                </div>
              </motion.div>
            )}

            {/* 7. Testing */}
            {selectedProject.details.testing && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                id="testing"
                className="mb-16"
              >
                <h4 className="text-2xl font-semibold text-text-primary mb-6 font-sora relative inline-block after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-2 after:h-0.5 after:bg-primary after:transform after:scale-x-0 after:hover:scale-x-100 after:transition-transform after:duration-300">
                  Testing & Quality Assurance
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedProject.details.testing.map(
                    (
                      test: {
                        name: string;
                        description: string;
                        coverage?: number;
                      },
                      index: number
                    ) => (
                      <div key={index} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-green-500">✓</span>
                          <span className="font-medium">{test.name}</span>
                        </div>
                        <p className="text-sm text-text-secondary">{test.description}</p>
                        {test.coverage && (
                          <div className="mt-2">
                            <div className="h-2 bg-gray-200 rounded-full">
                              <div
                                className="h-full bg-green-500 rounded-full"
                                style={{ width: `${test.coverage}%` }}
                              />
                            </div>
                            <span className="text-sm text-text-secondary">{test.coverage}% Coverage</span>
                          </div>
                        )}
                      </div>
                    )
                  )}
                </div>
              </motion.div>
            )}

            {/* 8. Challenges */}
            {selectedProject.details.challenges && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                id="challenges"
                className="mb-16"
              >
                <h4 className="text-2xl font-semibold text-text-primary mb-6 font-sora relative inline-block after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-2 after:h-0.5 after:bg-primary after:transform after:scale-x-0 after:hover:scale-x-100 after:transition-transform after:duration-300">
                  Technical Challenges & Solutions
                </h4>
                <div className="space-y-6">
                  {selectedProject.details.challenges.map((challenge, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl shadow-sm"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                        <div className="md:border-r md:border-gray-200/50 md:dark:border-gray-700/50 md:pr-8">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-sm font-medium px-3 py-1 rounded-full bg-sky-100/50 dark:bg-sky-900/70 text-sky-600 dark:text-sky-300 border border-sky-200 dark:border-sky-700/50">
                              Problem
                            </span>
                          </div>
                          <p className="text-text-secondary leading-relaxed">{challenge.problem}</p>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-sm font-medium px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 dark:border-emerald-400/20">
                              Solution
                            </span>
                          </div>
                          <p className="text-text-secondary leading-relaxed">{challenge.solution}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* 9. Learnings & Improvements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              id="learnings"
              className="mb-16"
            >
              <h4 className="text-2xl font-semibold text-text-primary mb-6 font-sora relative inline-block after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-2 after:h-0.5 after:bg-primary after:transform after:scale-x-0 after:hover:scale-x-100 after:transition-transform after:duration-300">
                {selectedProject.details.futureImprovements ? "Learnings & Future Improvements" : "Key Learnings"}
              </h4>
              <div
                className={`grid grid-cols-1 ${selectedProject.details.futureImprovements ? "lg:grid-cols-2" : "w-full"
                  } gap-8`}
              >
                <div className={`${!selectedProject.details.futureImprovements ? "w-full" : ""}`}>
                  <h5 className="text-lg font-medium text-primary mb-4 font-sora">Key Learnings</h5>
                  <div className="space-y-4">
                    {selectedProject.details.learnings.map((lesson, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="flex items-start gap-3 group"
                      >
                        <div className="mt-1.5 flex-shrink-0">
                          <div className="w-2 h-2 rounded-full bg-primary group-hover:scale-125 transition-transform duration-300" />
                        </div>
                        <p className="font-pret group-hover:text-text-primary transition-colors duration-300">
                          {lesson}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
                {selectedProject.details.futureImprovements && (
                  <div>
                    <h5 className="text-lg font-medium text-primary mb-4 font-sora">Future Improvements</h5>
                    <div className="space-y-4">
                      {selectedProject.details.futureImprovements.map((improvement, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * index }}
                          className="flex items-start gap-3 group"
                        >
                          <div className="mt-1.5 flex-shrink-0">
                            <div className="w-2 h-2 rounded-full bg-primary group-hover:scale-125 transition-transform duration-300" />
                          </div>
                          <p className="font-pret group-hover:text-text-primary transition-colors duration-300">
                            {improvement}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* 10. Screenshots */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              id="screenshots"
              className="mb-16"
            >
              <h4 className="text-2xl font-semibold text-text-primary mb-8 font-sora relative inline-block after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-2 after:h-0.5 after:bg-primary after:transform after:scale-x-0 after:hover:scale-x-100 after:transition-transform after:duration-300">
                Screenshots & Interface
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {selectedProject.details.images.map((image: { url: string; description?: string }, index: number) => (
                  <div
                    key={index}
                    className="group relative h-[400px] cursor-pointer rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                    onClick={() => handleImageSelect(image, index)}
                  >
                    <Image
                      src={image.url}
                      alt={image.description || ""}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      quality={100}
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
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
            </motion.div>
          </div>
        </div>
      </motion.div>

      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/95 dark:bg-black/98 z-50 flex items-center justify-center p-4"
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
                x: slideDirection ? (slideDirection === "left" ? [200, 0] : [-200, 0]) : 0,
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
                <p className="text-sm text-center">{selectedImage.description}</p>
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
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            {selectedImage.index < (selectedProject?.details.images.length ?? 0) - 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextImage();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 backdrop-blur-sm 
                  text-text-primary hover:text-primary hover:bg-background transition-all duration-300 z-10"
                aria-label="Next image"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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
