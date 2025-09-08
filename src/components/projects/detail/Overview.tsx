'use client';

import type { OverviewProps } from '@interfaces/projectDetail';
import { motion } from 'framer-motion';

const Overview = ({ text }: OverviewProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 }}
    className="mb-8"
  >
    <h3 className="text-base font-semibold text-text-primary mb-3 font-sora">
      Project Overview
    </h3>
    <p className="text-base text-text-secondary whitespace-pre-line font-pret leading-relaxed">
      {text}
    </p>
  </motion.div>
);

export default Overview;
