'use client';

import type { AchievementsProps } from '@interfaces/projectDetail';
import { motion } from 'framer-motion';

const Achievements = ({ items }: AchievementsProps) => {
  if (!items || items.length === 0) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="mb-8"
    >
      <h3 className="text-base font-semibold text-text-primary mb-3 font-sora">
        Key Achievements
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {items.map((achievement, index) => (
          <div
            key={index}
            className="p-4 bg-gray-50/50 dark:bg-gray-800/30 rounded-lg text-center border border-gray-200/30 dark:border-gray-700/30 hover:border-primary/30 transition-colors duration-200"
          >
            <div className="text-2xl font-bold text-primary mb-1">
              {achievement.value}
            </div>
            <div className="text-xs text-text-secondary font-medium">
              {achievement.label}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Achievements;
