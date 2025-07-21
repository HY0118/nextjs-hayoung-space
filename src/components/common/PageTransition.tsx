"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  direction?: "left" | "right" | "up" | "down" | "fade";
}

const pageVariants = {
  initial: (direction: string) => {
    switch (direction) {
      case "right":
        return { x: "100%", opacity: 0 };
      case "left":
        return { x: "-100%", opacity: 0 };
      case "up":
        return { y: "-100%", opacity: 0 };
      case "down":
        return { y: "100%", opacity: 0 };
      case "fade":
        return { x: 0, y: 0, opacity: 0 };
      default:
        return { x: "100%", opacity: 0 };
    }
  },
  animate: (direction: string) => {
    return {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: "tween",
        ease: direction === "fade" ? "easeInOut" : "easeOut",
        duration: direction === "fade" ? 0.3 : 0.4,
      },
    };
  },
  exit: (direction: string) => {
    switch (direction) {
      case "right":
        return {
          x: "-100%",
          opacity: 0,
          transition: {
            type: "tween",
            ease: "easeIn",
            duration: 0.3,
          },
        };
      case "left":
        return {
          x: "100%",
          opacity: 0,
          transition: {
            type: "tween",
            ease: "easeIn",
            duration: 0.3,
          },
        };
      case "fade":
        return {
          x: 0,
          y: 0,
          opacity: 0,
          transition: {
            type: "tween",
            ease: "easeInOut",
            duration: 0.2,
          },
        };
      default:
        return {
          x: "-100%",
          opacity: 0,
          transition: {
            type: "tween",
            ease: "easeIn",
            duration: 0.3,
          },
        };
    }
  },
};

export default function PageTransition({
  children,
  direction = "right",
}: PageTransitionProps) {
  return (
    <div className="overflow-hidden">
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        custom={direction}
        className="w-full"
      >
        {children}
      </motion.div>
    </div>
  );
} 