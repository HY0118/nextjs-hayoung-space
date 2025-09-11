import type React from 'react';

import type { MeasurementRefs } from '@/utils/features/paginator/types';

export function createMeasurement(
  refs: MeasurementRefs,
  blocks: React.ReactNode[],
  setHeights: (heights: number[]) => void,
) {
  const measure = () => {
    if (!refs.measureRef.current || !refs.containerRef.current) return;

    // 실제 컬럼 너비와 동일하게 측정 컬럼 너비를 맞춤
    const isTwoCols = window.matchMedia('(min-width: 768px)').matches; // md 기준
    const container = refs.containerRef.current;
    const computed = getComputedStyle(container);
    const gap = parseFloat(computed.columnGap || computed.gap || '0');
    const columns = isTwoCols ? 2 : 1;
    const colWidth = (container.clientWidth - (columns - 1) * gap) / columns;

    if (refs.measureColRef.current) {
      refs.measureColRef.current.style.width = `${colWidth}px`;
    }

    const wrappers = Array.from(
      refs.measureRef.current.querySelectorAll<HTMLDivElement>('[data-measure]'),
    );
    const h = wrappers.map((w) => w.getBoundingClientRect().height);
    setHeights(h);
  };

  const setupMeasurement = () => {
    measure();
    const ro = new ResizeObserver(measure);
    if (refs.containerRef.current) ro.observe(refs.containerRef.current);
    return () => ro.disconnect();
  };

  return { measure, setupMeasurement };
}
