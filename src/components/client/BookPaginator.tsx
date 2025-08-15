"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";

type Spread = { left: number[]; right: number[] };

interface BookPaginatorProps {
  blocks: React.ReactNode[];
  className?: string;
  columnClassName?: string;
  hints?: {
    // 숫자 인덱스 또는 블록 키(React key)로 지정 가능
    // 예) columnBreakAfter: [6, "interests"], spreadBreakAfter: ["talks"]
    columnBreakAfter?: Array<number | string>;
    spreadBreakAfter?: Array<number | string>;
  };
  // 개발 편의를 위한 보조 정보 표시(선택): 인덱스-키 매핑 등을 콘솔에 출력
  debug?: boolean;
}

export default function BookPaginator({ blocks, className = "", columnClassName = "", hints, debug = false }: BookPaginatorProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const measureRef = useRef<HTMLDivElement | null>(null);
  const measureColRef = useRef<HTMLDivElement | null>(null);
  const [heights, setHeights] = useState<number[]>([]);
  const [spreads, setSpreads] = useState<Spread[]>([]);
  const [current, setCurrent] = useState(0);
  const rightControls = useAnimationControls();

  // Measure all blocks inside a hidden column with the same width as real columns
  useLayoutEffect(() => {
    const measure = () => {
      if (!measureRef.current || !containerRef.current) return;
      // 실제 컬럼 너비와 동일하게 측정 컬럼 너비를 맞춤
      const isTwoCols = window.matchMedia("(min-width: 768px)").matches; // md 기준
      const container = containerRef.current;
      const computed = getComputedStyle(container);
      const gap = parseFloat(computed.columnGap || computed.gap || "0");
      const columns = isTwoCols ? 2 : 1;
      const colWidth = (container.clientWidth - (columns - 1) * gap) / columns;
      if (measureColRef.current) {
        measureColRef.current.style.width = `${colWidth}px`;
      }
      const wrappers = Array.from(
        measureRef.current.querySelectorAll<HTMLDivElement>("[data-measure]")
      );
      const h = wrappers.map((w) => w.getBoundingClientRect().height);
      setHeights(h);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [blocks.length]);

  // Compute spreads from measured heights
  useEffect(() => {
    if (!containerRef.current || heights.length !== blocks.length) return;
    const container = containerRef.current;
    const contentHeight = container.clientHeight; // available height for each column

    // React element key는 내부적으로 '.$' prefix가 붙을 수 있어 정규화
    const normalizeKey = (key: unknown): string => {
      const raw = String(key ?? "");
      return raw.replace(/^\.\$/u, "");
    };

    // 블록의 키 목록 수집(없으면 인덱스 문자열 대체)
    const blockKeys: string[] = blocks.map((b, idx) => {
      if (React.isValidElement(b) && b.key != null) return normalizeKey(b.key);
      return String(idx);
    });

    // 힌트에 전달된 값(숫자/키)을 인덱스 Set으로 변환
    const toIndexSet = (items?: Array<number | string>): Set<number> => {
      const set = new Set<number>();
      items?.forEach((it) => {
        if (typeof it === "number" && Number.isInteger(it)) {
          set.add(it);
        } else {
          const key = String(it);
          const idx = blockKeys.indexOf(key);
          if (idx !== -1) set.add(idx);
        }
      });
      return set;
    };

    const forcedColumnBreakSet = toIndexSet(hints?.columnBreakAfter);
    const forcedSpreadBreakSet = toIndexSet(hints?.spreadBreakAfter);

    if (debug && process.env.NODE_ENV !== "production") {
      try {
        // 개발 편의: 인덱스-키 매핑과 적용된 강제 분리 정보 출력
        // eslint-disable-next-line no-console
        console.table(blockKeys.map((k, i) => ({ index: i, key: k, columnBreakAfter: forcedColumnBreakSet.has(i), spreadBreakAfter: forcedSpreadBreakSet.has(i) })));
      } catch {}
    }

    const spreads: Spread[] = [];
    let i = 0;
    while (i < heights.length) {
      const left: number[] = [];
      const right: number[] = [];
      let leftH = 0;
      let rightH = 0;

      // fill left
      while (i < heights.length && leftH + heights[i] <= contentHeight) {
        left.push(i);
        leftH += heights[i];
        const forcedColumnBreak = forcedColumnBreakSet.has(i);
        const forcedSpreadBreak = forcedSpreadBreakSet.has(i);
        i++;
        if (forcedSpreadBreak) break;
        if (forcedColumnBreak) break;
      }
      // fill right
      while (i < heights.length && rightH + heights[i] <= contentHeight) {
        right.push(i);
        rightH += heights[i];
        const forcedSpreadBreak = forcedSpreadBreakSet.has(i);
        i++;
        if (forcedSpreadBreak) break;
      }
      spreads.push({ left, right });
    }
    setSpreads(spreads);
    setCurrent((c) => Math.min(c, Math.max(spreads.length - 1, 0)));
  }, [heights, blocks, blocks.length, hints?.columnBreakAfter, hints?.spreadBreakAfter, debug]);

  const canPrev = current > 0;
  const canNext = current < Math.max(spreads.length - 1, 0);

  const handlePrev = async () => {
    if (!canPrev) return;
    // 들어있는 페이지를 오른쪽으로 넘기는 느낌 (오른쪽 페이지가 뒤로 젖혀짐)
    await rightControls.start({
      rotateY: 100,
      transformOrigin: "right center",
      transition: { duration: 0.45, ease: "easeInOut" },
      boxShadow: "-20px 0 40px rgba(0,0,0,0.15)",
    });
    setCurrent((c) => Math.max(c - 1, 0));
    // 다음 프레임에서 왼쪽에서 넘어오는 페이지 연출
    await rightControls.set({ rotateY: -100, transformOrigin: "left center", boxShadow: "20px 0 40px rgba(0,0,0,0.15)" });
    await rightControls.start({ rotateY: 0, transition: { duration: 0.45, ease: "easeInOut" }, boxShadow: "0 0 0 rgba(0,0,0,0)" });
  };
  const handleNext = async () => {
    if (!canNext) return;
    // 현재 오른쪽 페이지가 왼쪽으로 넘어가는 애니메이션
    await rightControls.start({
      rotateY: -100,
      transformOrigin: "left center",
      transition: { duration: 0.45, ease: "easeInOut" },
      boxShadow: "20px 0 40px rgba(0,0,0,0.15)",
    });
    setCurrent((c) => Math.min(c + 1, Math.max(spreads.length - 1, 0)));
    // 새 오른쪽 페이지가 오른쪽에서 닫히며 나타남
    await rightControls.set({ rotateY: 100, transformOrigin: "right center", boxShadow: "-20px 0 40px rgba(0,0,0,0.15)" });
    await rightControls.start({ rotateY: 0, transition: { duration: 0.45, ease: "easeInOut" }, boxShadow: "0 0 0 rgba(0,0,0,0)" });
  };

  const spread = spreads[current] || { left: [], right: [] };

  return (
    <div ref={containerRef} className={`relative h-full w-full ${className}`}>
      {/* Visible book spread: 좌측은 정적, 우측은 페이지 넘김 애니메이션 */}
      <div className="grid h-full w-full grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <div className={`h-full overflow-hidden ${columnClassName}`}>
          <div className="h-full pr-2 md:pr-6">
            {spread.left.map((idx) => (
              <div key={idx} className="mb-6 last:mb-0">
                {blocks[idx]}
              </div>
            ))}
          </div>
        </div>
        <div className={`h-full overflow-hidden ${columnClassName}`} style={{ perspective: 1200 }}>
          <motion.div animate={rightControls} style={{ transformStyle: "preserve-3d" }} className="pl-2 md:pl-6">
            {spread.right.map((idx) => (
              <div key={idx} className="mb-6 last:mb-0">
                {blocks[idx]}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-0 right-6 z-10 flex items-center gap-2">
        <button
          onClick={handlePrev}
          disabled={!canPrev}
          className="px-3 py-1.5 rounded-lg border border-border/40 bg-background/80 disabled:opacity-40"
        >
          ← Prev
        </button>
        <button
          onClick={handleNext}
          disabled={!canNext}
          className="px-3 py-1.5 rounded-lg border border-border/40 bg-background/80 disabled:opacity-40"
        >
          Next →
        </button>
      </div>

      {/* Hidden measuring column: same width as a single column */}
      <div className="absolute -left-[9999px] top-0" aria-hidden>
        <div className="grid grid-cols-2 gap-8 md:gap-12">
          <div ref={measureRef} className="px-2 md:px-6">
            <div ref={measureColRef}>
            {blocks.map((b, idx) => (
              <div key={idx} data-measure className="mb-6 last:mb-0">
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


