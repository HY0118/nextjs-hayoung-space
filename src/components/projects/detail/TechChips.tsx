'use client';

import type { TechChipsProps } from '@interfaces/projectDetail';
import { motion } from 'framer-motion';

const TechChips = ({ tech }: TechChipsProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3 }}
    className="mb-8"
  >
    <h4 className="text-base font-semibold text-text-primary mb-3 font-sora">
      Tech Stack
    </h4>
    <div className="flex flex-wrap gap-2">
      {tech.map((t, idx) => (
        <span
          key={idx}
          className="px-2.5 py-1 rounded-md text-xs bg-primary/8 dark:bg-primary/15 text-primary border border-primary/15 hover:border-primary/25 transition-colors duration-200 font-medium"
        >
          {t}
        </span>
      ))}
    </div>
  </motion.div>
);

export default TechChips;
