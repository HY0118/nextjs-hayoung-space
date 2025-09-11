import React from 'react';

import type { BookPaginatorProps, Spread } from '@/utils/features/paginator/types';

// React element key는 내부적으로 '.$' prefix가 붙을 수 있어 정규화
const normalizeKey = (key: unknown): string => {
  const raw = String(key ?? '');
  return raw.replace(/^\.\$/u, '');
};

// 블록의 키 목록 수집(없으면 인덱스 문자열 대체)
function getBlockKeys(blocks: React.ReactNode[]): string[] {
  return blocks.map((b, idx) => {
    if (React.isValidElement(b) && b.key != null) return normalizeKey(b.key);
    return String(idx);
  });
}

// 힌트에 전달된 값(숫자/키)을 인덱스 Set으로 변환
function toIndexSet(
  items: Array<number | string> | undefined,
  blockKeys: string[],
): Set<number> {
  const set = new Set<number>();
  items?.forEach((it) => {
    if (typeof it === 'number' && Number.isInteger(it)) {
      set.add(it);
    } else {
      const key = String(it);
      const idx = blockKeys.indexOf(key);
      if (idx !== -1) set.add(idx);
    }
  });
  return set;
}

export function computeSpreads(
  heights: number[],
  contentHeight: number,
  blocks: React.ReactNode[],
  hints: BookPaginatorProps['hints'],
  debug: boolean = false,
): Spread[] {
  if (heights.length !== blocks.length) return [];

  const blockKeys = getBlockKeys(blocks);
  const forcedColumnBreakSet = toIndexSet(hints?.columnBreakAfter, blockKeys);
  const forcedSpreadBreakSet = toIndexSet(hints?.spreadBreakAfter, blockKeys);

  if (debug && process.env.NODE_ENV !== 'production') {
    try {
      // 개발 편의: 인덱스-키 매핑과 적용된 강제 분리 정보 출력
      // eslint-disable-next-line no-console
      console.table(
        blockKeys.map((k, i) => ({
          index: i,
          key: k,
          columnBreakAfter: forcedColumnBreakSet.has(i),
          spreadBreakAfter: forcedSpreadBreakSet.has(i),
        })),
      );
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

  return spreads;
}
