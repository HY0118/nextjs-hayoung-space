'use client';

import type { PerformanceMetric } from '@interfaces/projectDetail';
import { motion } from 'framer-motion';

const PerformanceCard = ({ metric }: { metric: PerformanceMetric }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-50/40 dark:bg-gray-800/20 p-4 rounded-md border border-gray-200/20 dark:border-gray-700/20 hover:border-primary/30 transition-colors duration-200"
    >
      <div className="space-y-3">
        {/* 무엇을 개선했는지 */}
        <h5 className="font-medium text-text-primary text-sm">{metric.name}</h5>

        {/* 얼마나 개선했는지 */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-primary">{metric.improvement}</span>
          <div className="text-green-500 dark:text-green-400">
            <svg
              className="w-7 h-7"
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
          <span className="text-xs text-text-secondary">향상</span>
        </div>

        {/* 어떻게 개선했는지 */}
        <p className="text-xs text-text-secondary leading-relaxed">
          {metric.description}
        </p>
      </div>
    </motion.div>
  );
};

export default PerformanceCard;
