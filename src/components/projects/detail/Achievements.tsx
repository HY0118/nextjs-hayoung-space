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
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {items.map((achievement, index) => (
          <div
            key={index}
            className="p-6 bg-gray-100 dark:bg-gray-800 rounded-xl text-center"
          >
            <div className="text-3xl font-bold text-primary mb-2">
              {achievement.value}
            </div>
            <div className="text-sm text-text-secondary">{achievement.label}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Achievements;
