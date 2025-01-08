"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useIntroStore } from "@/store/introStore";

const Footer = () => {
  const isIntroComplete = useIntroStore((state) => state.isIntroComplete);

  return (
    <AnimatePresence>
      {isIntroComplete && (
        <motion.footer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="py-8 border-t border-border"
        >
          <div className="max-w-7xl mx-auto px-8 text-center text-text-secondary">
            <p>&copy; {new Date().getFullYear()} hayoung. All rights reserved.</p>
          </div>
        </motion.footer>
      )}
    </AnimatePresence>
  );
};

export default Footer;
