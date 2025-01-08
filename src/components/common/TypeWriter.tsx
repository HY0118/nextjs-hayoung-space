"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PrefixTypeWriterProps {
  onComplete: () => void;
}

interface CreativeTypeWriterProps {
  show: boolean;
  onComplete: () => void;
}

interface TypeWriterProps {
  onComplete: () => void;
}

const PrefixTypeWriter = ({ onComplete }: PrefixTypeWriterProps) => {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const prefix = "Hello, I'm a ";

  useEffect(() => {
    if (index < prefix.length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + prefix[index]);
        setIndex((prev) => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      setIsComplete(true);
      onComplete();
    }
  }, [index, onComplete]);

  return (
    <span>
      {text}
      {!isComplete && <span className="animate-blink">|</span>}
    </span>
  );
};

const CreativeTypeWriter = ({ show, onComplete }: CreativeTypeWriterProps) => {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const mainContent = "Creative Developer";

  const AnimatedText = () => (
    <div className="flex">
      {mainContent.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ y: 0 }}
          animate={{ 
            y: [0, -5, 0],
          }}
          transition={{
            duration: 0.8,
            delay: index * 0.05,
            repeat: Infinity,
            repeatDelay: 2
          }}
          className="creative-text"
        >
          {char}
        </motion.span>
      ))}
      <motion.span
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
        className="text-3xl text-primary ml-2"
      >
        &lt;/&gt;
      </motion.span>
    </div>
  );

  useEffect(() => {
    if (show && index < mainContent.length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + mainContent[index]);
        setIndex((prev) => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    } else if (show && index === mainContent.length) {
      setTimeout(() => {
        setIsTypingComplete(true);
        onComplete();
      }, 300);
    }
  }, [show, index, onComplete]);

  if (!show) return null;

  return (
    <AnimatePresence mode="wait">
      {!isTypingComplete ? (
        <motion.div
          key="typing"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {text}
          <span className="animate-blink">|</span>
        </motion.div>
      ) : (
        <motion.div
          key="animated"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatedText />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const TypeWriter = ({ onComplete }: TypeWriterProps) => {
  const [showCreative, setShowCreative] = useState(false);

  const handlePrefixComplete = () => {
    setShowCreative(true);
  };

  const handleCreativeComplete = () => {
    setTimeout(() => {
      onComplete();
    }, 2000);
  };

  return (
    <div className="text-4xl md:text-6xl font-bold text-text-primary font-sora tracking-tight">
      <div className="flex items-center whitespace-pre">
        <PrefixTypeWriter onComplete={handlePrefixComplete} />
        <CreativeTypeWriter show={showCreative} onComplete={handleCreativeComplete} />
      </div>
    </div>
  );
};

export default TypeWriter; 