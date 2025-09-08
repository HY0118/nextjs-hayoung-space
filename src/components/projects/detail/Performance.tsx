'use client';

import type { PerformanceMetric } from '@interfaces/projectDetail';
import { motion } from 'framer-motion';

import PerformanceCard from '@/components/projects/detail/PerformanceCard';

interface PerformanceProps {
  performance: PerformanceMetric[];
}

const Performance = ({ performance }: PerformanceProps) => {
  if (performance.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mb-8"
    >
      <h4 className="text-base font-semibold text-text-primary mb-3 font-sora">
        Performance Impact
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {performance.map((metric, index) => (
          <PerformanceCard
            key={index}
            metric={metric}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default Performance;
