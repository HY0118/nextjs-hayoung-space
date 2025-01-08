"use client";

import { useIntroStore } from "@/store/introStore";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import About from "@components/sections/About";
import Skills from "@components/sections/Skills";
import Projects from "@components/sections/Projects";
import Contact from "@components/sections/Contact";
import TypeWriter from "@components/common/TypeWriter";

export default function Home() {
  const setIntroComplete = useIntroStore((state) => state.setIntroComplete);

  return (
    <AnimatePresence mode="wait">
      {!useIntroStore((state) => state.isIntroComplete) ? (
        <motion.div
          key="intro"
          className="min-h-screen flex items-center justify-center"
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <TypeWriter
            onComplete={() => {
              setTimeout(() => {
                setIntroComplete(true);
              }, 500);
            }}
          />
        </motion.div>
      ) : (
        <motion.main
          key="content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <About />
          <Skills />
          <Projects />
          <Contact />
        </motion.main>
      )}
    </AnimatePresence>
  );
}
