'use client';

import type { KeyFeaturesProps } from '@interfaces/projectDetail';
import { motion } from 'framer-motion';

const KeyFeatures = ({ features }: KeyFeaturesProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.25 }}
    className="mb-8"
  >
    <h4 className="text-base font-semibold text-text-primary mb-3 font-sora">
      Key Features
    </h4>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {features.map((feature, index) => (
        <div
          key={index}
          className="bg-gray-50/40 dark:bg-gray-800/20 p-3 rounded-md border border-gray-200/20 dark:border-gray-700/20 hover:border-primary/30 transition-colors duration-200"
        >
          <h5 className="font-medium text-primary mb-1.5 text-sm">{feature.name}</h5>
          <p className="text-xs text-text-secondary leading-relaxed">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  </motion.div>
);

export default KeyFeatures;
