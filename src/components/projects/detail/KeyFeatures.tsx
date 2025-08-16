'use client';

import type { KeyFeaturesProps } from '@interfaces/projectDetail';
import { motion } from 'framer-motion';

const KeyFeatures = ({ features }: KeyFeaturesProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.25 }}
    className="mb-12"
  >
    <h4 className="text-xl font-semibold text-text-primary mb-4 font-sora">
      Key Features
    </h4>
    <div className="space-y-4">
      {features.map((feature, index) => (
        <div
          key={index}
          className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg"
        >
          <h5 className="font-medium text-primary mb-1">{feature.name}</h5>
          <p className="text-sm text-text-secondary">{feature.description}</p>
        </div>
      ))}
    </div>
  </motion.div>
);

export default KeyFeatures;
