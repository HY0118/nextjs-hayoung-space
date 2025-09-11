'use client';

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { createPageHandlers } from '@/utils/features/paginator/animation';
import { computeSpreads } from '@/utils/features/paginator/layout';
import { createMeasurement } from '@/utils/features/paginator/measurement';
import type { BookPaginatorProps, Spread } from '@/utils/features/paginator/types';
import { motion, useAnimationControls } from 'framer-motion';

export default function BookPaginator({
  blocks,
  className = '',
  columnClassName = '',
  hints,
  debug = false,
}: BookPaginatorProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const measureRef = useRef<HTMLDivElement | null>(null);
  const measureColRef = useRef<HTMLDivElement | null>(null);
  const [heights, setHeights] = useState<number[]>([]);
  const [spreads, setSpreads] = useState<Spread[]>([]);
  const [current, setCurrent] = useState(0);
  const rightControls = useAnimationControls();

  // Measure all blocks inside a hidden column with the same width as real columns
  useLayoutEffect(() => {
    const { setupMeasurement: setup } = createMeasurement(
      { containerRef, measureRef, measureColRef },
      blocks,
      setHeights,
    );
    return setup();
  }, [blocks]);

  // Compute spreads from measured heights
  useEffect(() => {
    if (!containerRef.current || heights.length !== blocks.length) return;
    const container = containerRef.current;
    const contentHeight = container.clientHeight; // available height for each column

    const newSpreads = computeSpreads(heights, contentHeight, blocks, hints, debug);
    setSpreads(newSpreads);
    setCurrent((c) => Math.min(c, Math.max(newSpreads.length - 1, 0)));
  }, [heights, blocks, hints, debug]);

  const canPrev = current > 0;
  const canNext = current < Math.max(spreads.length - 1, 0);

  const { handlePrev, handleNext } = createPageHandlers({
    canPrev,
    canNext,
    setCurrent,
    rightControls,
    spreadsLength: spreads.length,
  });

  const spread = spreads[current] || { left: [], right: [] };

  return (
    <div
      ref={containerRef}
      className={`relative h-full w-full ${className}`}
    >
      {/* Visible book spread: 좌측은 정적, 우측은 페이지 넘김 애니메이션 */}
      <div className="grid h-full w-full grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <div className={`h-full overflow-hidden ${columnClassName}`}>
          <div className="h-full pr-2 md:pr-6">
            {spread.left.map((idx) => (
              <div
                key={idx}
                className="mb-6 last:mb-0"
              >
                {blocks[idx]}
              </div>
            ))}
          </div>
        </div>
        <div
          className={`h-full overflow-hidden ${columnClassName}`}
          style={{ perspective: 1200 }}
        >
          <motion.div
            animate={rightControls}
            style={{ transformStyle: 'preserve-3d' }}
            className="pl-2 md:pl-6"
          >
            {spread.right.map((idx) => (
              <div
                key={idx}
                className="mb-6 last:mb-0"
              >
                {blocks[idx]}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-0 right-6 z-10 flex items-center gap-2">
        {canPrev && (
          <button
            onClick={handlePrev}
            className="px-3 py-1.5 rounded-lg border border-border/40 bg-background/80"
          >
            ← Prev
          </button>
        )}
        {canNext && (
          <button
            onClick={handleNext}
            className="px-3 py-1.5 rounded-lg border border-border/40 bg-background/80"
          >
            Next →
          </button>
        )}
      </div>

      {/* Hidden measuring column: same width as a single column */}
      <div
        className="absolute -left-[9999px] top-0"
        aria-hidden
      >
        <div className="grid grid-cols-2 gap-8 md:gap-12">
          <div
            ref={measureRef}
            className="px-2 md:px-6"
          >
            <div ref={measureColRef}>
              {blocks.map((b, idx) => (
                <div
                  key={idx}
                  data-measure
                  className="mb-6 last:mb-0"
                >
                  {b}
                </div>
              ))}
            </div>
          </div>
          <div />
        </div>
      </div>
    </div>
  );
}
