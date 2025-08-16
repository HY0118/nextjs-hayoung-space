'use client';

import type { TechChipsProps } from '@interfaces/projectDetail';
import { motion } from 'framer-motion';

const TechChips = ({ tech }: TechChipsProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
    className="mb-10"
  >
    <div className="flex flex-wrap gap-2">
      {tech.map((t, idx) => (
        <span
          key={idx}
          className="px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-800 text-text-secondary border border-gray-200 dark:border-gray-700"
        >
          {t}
        </span>
      ))}
    </div>
  </motion.div>
);

export default TechChips;
