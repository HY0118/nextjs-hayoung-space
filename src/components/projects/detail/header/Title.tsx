'use client';

import { motion } from 'framer-motion';

const Title = ({ text }: { text: string }) => (
  <motion.h3
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
    className="text-3xl font-bold text-text-primary font-sora bg-gradient-to-r from-primary to-primary-dark bg-clip-text"
  >
    {text}
  </motion.h3>
);

export default Title;
