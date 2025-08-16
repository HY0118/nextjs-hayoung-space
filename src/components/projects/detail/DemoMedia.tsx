"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { DemoMediaProps } from "@interfaces/projectDetail";

const DemoMedia = ({ project }: DemoMediaProps) => {
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

export default DemoMedia;


