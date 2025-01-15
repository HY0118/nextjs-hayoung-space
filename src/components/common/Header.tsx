"use client";

import Link from "next/link";
import ThemeToggle from "@components/common/ThemeToggle";
import Navigation from "@components/common/Navigation";
import { useIntroStore } from "@store/introStore";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const isIntroComplete = useIntroStore((state) => state.isIntroComplete);

  return (
    <AnimatePresence>
      {isIntroComplete && (
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur border-b border-border z-50"
        >
          <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold">
              <span className="text-text-primary">HaYoung</span>{" "}
              <span className="text-primary">Space</span> 🚀
            </Link>
            <div className="flex items-center gap-4">
              <Navigation />
              <ThemeToggle />
            </div>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
};

export default Header;
