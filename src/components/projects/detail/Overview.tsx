"use client";

import { motion } from "framer-motion";
import type { OverviewProps } from "@interfaces/projectDetail";

const Overview = ({ text }: OverviewProps) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8">
    <p className="text-lg whitespace-pre-line font-pret leading-relaxed">{text}</p>
  </motion.div>
);

export default Overview;


