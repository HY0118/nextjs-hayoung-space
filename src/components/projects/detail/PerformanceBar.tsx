'use client';

import type { PerformanceMetric } from '@interfaces/projectDetail';
import { motion } from 'framer-motion';

const PerformanceBar = ({ metric }: { metric: PerformanceMetric }) => {
  const value = parseInt(metric.improvement.replace(/[^0-9]/g, ''));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/80 dark:to-gray-900 p-6 rounded-xl shadow-lg backdrop-blur-sm group hover:shadow-xl transition-all duration-300"
    >
      <h5 className="font-medium text-primary mb-4 font-sora">{metric.name}</h5>
      <div className="relative">
        <div className="flex items-end gap-2 mb-2">
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold bg-gradient-to-r from-green-400 to-primary bg-clip-text text-transparent">
              {value}
            </span>
            <span className="text-xl text-text-secondary">%</span>
          </div>
          <div className="flex justify-between items-center text-green-500 dark:text-green-400">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          </div>
        </div>
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-green-400 to-primary group-hover:from-green-500 group-hover:to-primary-dark transition-colors duration-300"
          />
        </div>
        <p className="mt-4 text-sm text-text-secondary">{metric.description}</p>
      </div>
    </motion.div>
  );
};

export default PerformanceBar;
