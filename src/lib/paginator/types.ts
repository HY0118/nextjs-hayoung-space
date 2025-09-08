import type React from 'react';

export type Spread = { left: number[]; right: number[] };

export interface BookPaginatorProps {
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

export interface MeasurementRefs {
  containerRef: React.RefObject<HTMLDivElement>;
  measureRef: React.RefObject<HTMLDivElement>;
  measureColRef: React.RefObject<HTMLDivElement>;
}
