'use client';

import type { TechChipsProps } from '@interfaces/projectDetail';
import { motion } from 'framer-motion';

import { techColors } from '@/constants/techColors';

const TechChips = ({ tech }: TechChipsProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3 }}
    className=""
  >
    <h4 className="text-base font-semibold text-text-primary mb-3 font-sora">
      Tech Stack
    </h4>
    <div className="flex flex-wrap gap-2">
      {tech.map((t, idx) => {
        const techColor = techColors[t] || 'text-primary';

        return (
          <span
            key={idx}
            className={`px-2.5 py-1 rounded-md text-xs ${techColor} bg-white dark:bg-gray-800/20 border border-gray-200/30 dark:border-gray-700/30 hover:border-current/30 transition-colors duration-200 font-medium`}
          >
            {t}
          </span>
        );
      })}
    </div>
  </motion.div>
);

export default TechChips;
