'use client';

import Image from 'next/image';

import type { OptionalDetailsProps } from '@interfaces/projectDetail';
import { motion } from 'framer-motion';

import PerformanceBar from '@/components/projects/detail/PerformanceBar';

const OptionalDetails = ({
  problemStatement,
  solutionApproach,
  performance,
  architecture,
  learnings,
  futureImprovements,
}: OptionalDetailsProps) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    className="space-y-12"
  >
    {(problemStatement || solutionApproach) && (
      <div>
        <h4 className="text-xl font-semibold text-text-primary mb-4 font-sora">
          Background & Strategy
        </h4>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {problemStatement && (
            <div className="bg-gray-100 dark:bg-gray-800 p-5 rounded-xl">
              <h5 className="text-md font-medium text-primary mb-2">Background</h5>
              <p className="text-sm text-text-secondary">{problemStatement}</p>
            </div>
          )}
          {solutionApproach && (
            <div className="bg-gray-100 dark:bg-gray-800 p-5 rounded-xl">
              <h5 className="text-md font-medium text-primary mb-2">Strategy</h5>
              <p className="text-sm text-text-secondary">{solutionApproach}</p>
            </div>
          )}
        </div>
      </div>
    )}

    {performance.length > 0 && (
      <div>
        <h4 className="text-xl font-semibold text-text-primary mb-4 font-sora">
          Performance
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {performance.map((metric, index) => (
            <PerformanceBar
              key={index}
              metric={metric}
            />
          ))}
        </div>
      </div>
    )}

    {architecture && (
      <div>
        <h4 className="text-xl font-semibold text-text-primary mb-4 font-sora">
          Architecture
        </h4>
        <div className="relative">
          <Image
            src={architecture}
            alt="System Architecture"
            width={1200}
            height={600}
            className="rounded-xl"
          />
        </div>
      </div>
    )}

    {(learnings.length > 0 || futureImprovements.length > 0) && (
      <div
        className={`grid grid-cols-1 ${futureImprovements.length ? 'lg:grid-cols-2' : ''} gap-6`}
      >
        {learnings.length > 0 && (
          <div>
            <h5 className="text-md font-medium text-primary mb-3 font-sora">
              Key Learnings
            </h5>
            <div className="space-y-3">
              {learnings.map((lesson, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3"
                >
                  <div className="mt-1.5 flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <p className="text-sm text-text-secondary">{lesson}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {futureImprovements.length > 0 && (
          <div>
            <h5 className="text-md font-medium text-primary mb-3 font-sora">
              Future Improvements
            </h5>
            <div className="space-y-3">
              {futureImprovements.map((imp, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3"
                >
                  <div className="mt-1.5 flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <p className="text-sm text-text-secondary">{imp}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )}
  </motion.div>
);

export default OptionalDetails;
