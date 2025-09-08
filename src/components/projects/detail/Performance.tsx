'use client';

import type { PerformanceMetric } from '@interfaces/projectDetail';
import { motion } from 'framer-motion';

import PerformanceCard from '@/components/projects/detail/PerformanceCard';

interface PerformanceProps {
  performance: PerformanceMetric[];
}

const Performance = ({ performance }: PerformanceProps) => {
  if (performance.length === 0) return null;

  // 동적 그리드 컬럼 결정
  const getGridCols = () => {
    if (performance.length === 1) return 'grid-cols-1';
    if (performance.length === 2) return 'grid-cols-1 lg:grid-cols-2';
    return 'grid-cols-1 lg:grid-cols-3';
  };

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
      <div className={`grid ${getGridCols()} gap-3`}>
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
