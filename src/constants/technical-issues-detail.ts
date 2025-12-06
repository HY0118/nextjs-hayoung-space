export interface TechnicalConsideration {
  title: string;
  description: string;
}

export interface Solution {
  title: string;
  description: string;
  implementation: string;
  code?: string;
}

export interface Result {
  metric: string;
  value: string;
  description: string;
}

export interface DetailContent {
  overview: string;
  problemDescription: string;
  technicalConsiderations: TechnicalConsideration[];
  solutions: Solution[];
  results: Result[];
  lessonsLearned: string[];
}

export const getDetailContent = (id: string): DetailContent | null => {
  return TECHNICAL_ISSUES_DETAIL[id] || null;
};

export const TECHNICAL_ISSUES_DETAIL: Record<string, DetailContent> = {
  'webview-memory-optimization': {
    overview:
      'WebView 기반 플러그인 시스템에서 발생한 메모리 누수 문제를 체계적으로 분석하고 해결한 과정입니다.',
    problemDescription:
      'WebView 인스턴스가 적절히 해제되지 않아 메모리 사용량이 지속적으로 증가하는 문제가 발생했습니다.',
    technicalConsiderations: [
      {
        title: '메모리 누수 원인 분석',
        description:
          'WebView 생명주기 관리 부재와 JavaScript-Native 브릿지의 순환 참조 문제를 식별했습니다.',
      },
      {
        title: '성능 모니터링 전략',
        description:
          'Chrome DevTools와 Performance API를 활용한 실시간 메모리 모니터링 시스템을 구축했습니다.',
      },
    ],
    solutions: [
      {
        title: 'WebView Pool 시스템 구현',
        description:
          'WebView 인스턴스를 재사용하는 Pool 패턴을 도입하여 메모리 효율성을 크게 개선했습니다.',
        implementation:
          'React Context와 useRef를 활용해 WebView 인스턴스 풀을 구현하고, LRU 캐시 알고리즘으로 메모리 관리를 최적화했습니다.',
      },
      {
        title: '자동 가비지 컬렉션',
        description:
          '일정 시간 비활성 상태인 WebView를 자동으로 해제하는 시스템을 구현했습니다.',
        implementation:
          'setTimeout과 WeakMap을 조합하여 5분 이상 비활성 상태인 WebView를 자동으로 메모리에서 해제하는 가비지 컬렉터를 구현했습니다.',
      },
    ],
    results: [
      {
        metric: '메모리 사용량',
        value: '75% 감소',
        description: '평균 메모리 사용량이 400MB에서 100MB로 감소',
      },
      {
        metric: '앱 응답 속도',
        value: '40% 향상',
        description: 'WebView 로딩 시간과 전환 속도 개선',
      },
    ],
    lessonsLearned: [
      'WebView 생명주기 관리의 중요성을 깨달았습니다.',
      'Pool 패턴을 통한 리소스 재사용의 효과를 확인했습니다.',
      '실시간 모니터링이 성능 최적화에 필수적임을 학습했습니다.',
    ],
  },

  'virtual-dom-optimization': {
    overview:
      'Tools 사이트에서 대용량 데이터 렌더링 시 발생한 Virtual DOM 병목을 해결한 최적화 프로젝트입니다.',
    problemDescription:
      '10,000+ 데이터 항목 렌더링 시 React Reconciliation 알고리즘의 O(n³) 복잡도로 인한 성능 저하가 발생했습니다.',
    technicalConsiderations: [
      {
        title: 'React Profiler 분석',
        description:
          'React DevTools Profiler와 Performance API를 통해 렌더링 병목 지점을 정밀 분석했습니다.',
      },
      {
        title: 'Virtual Scrolling vs Pagination',
        description:
          '다양한 렌더링 최적화 기법의 성능을 비교 분석하여 최적의 솔루션을 선택했습니다.',
      },
    ],
    solutions: [
      {
        title: 'Virtual Scrolling 구현',
        description:
          'DOM 노드 수를 50개로 고정하고 스크롤 위치에 따라 동적으로 렌더링하는 시스템을 구현했습니다.',
        implementation:
          'Intersection Observer API와 React.memo를 조합하여 뷰포트 내 항목만 렌더링하는 가상 스크롤링을 구현했습니다.',
      },
      {
        title: 'React.memo와 useMemo 최적화',
        description:
          '불필요한 리렌더링을 방지하기 위한 메모이제이션 전략을 체계적으로 적용했습니다.',
        implementation:
          'React.memo로 컴포넌트 메모이제이션, useMemo로 계산 비용이 높은 연산 캐싱, useCallback으로 함수 참조 최적화를 적용했습니다.',
      },
    ],
    results: [
      {
        metric: 'First Contentful Paint',
        value: '70% 개선',
        description: '3.5초에서 1.05초로 단축',
      },
      {
        metric: 'JavaScript 실행 시간',
        value: '55% 단축',
        description: 'Web Worker를 통한 작업 분산 효과',
      },
    ],
    lessonsLearned: [
      'Virtual Scrolling의 강력한 성능 개선 효과를 확인했습니다.',
      'Web Worker를 통한 메인 스레드 부하 분산의 중요성을 학습했습니다.',
      '메모이제이션 전략의 체계적 적용이 필수적임을 깨달았습니다.',
    ],
  },

  'circular-dependency-resolution': {
    overview:
      'moaUI Design System에서 발생한 순환 의존성 문제를 해결하고 확장 가능한 아키텍처로 재설계한 프로젝트입니다.',
    problemDescription:
      '50+ 컴포넌트 간 circular dependency로 인한 빌드 실패 및 TypeScript 타입 추론 성능 저하가 발생했습니다.',
    technicalConsiderations: [
      {
        title: 'Dependency Graph 분석',
        description:
          'Topological Sorting 알고리즘으로 의존성 순서를 정렬하고 순환 참조 그룹을 식별했습니다.',
      },
      {
        title: 'TypeScript 성능 최적화',
        description:
          'Type-only imports 분리와 Conditional Types 활용으로 컴파일 성능을 개선했습니다.',
      },
    ],
    solutions: [
      {
        title: 'Hexagonal Architecture 도입',
        description:
          '핵심 로직과 UI를 분리하고 Dependency Inversion Principle을 적용한 설계로 변경했습니다.',
        implementation:
          'Interfaces와 Abstract Classes를 활용한 의존성 역전 구조를 구현하고, Factory Pattern으로 동적 의존성 주입을 적용했습니다.',
      },
      {
        title: 'Module Federation 구현',
        description:
          '런타임 의존성 동적 해결을 위한 Module Federation 시스템을 구축했습니다.',
        implementation:
          'Webpack Module Federation과 Dynamic Import를 조합하여 컴포넌트별 독립적인 번들링과 런타임 로딩을 구현했습니다.',
      },
    ],
    results: [
      {
        metric: '빌드 시간',
        value: '75% 단축',
        description: '15분에서 3.75분으로 단축 (Affected 빌드)',
      },
      {
        metric: '타입 체크 성능',
        value: '85% 향상',
        description: '10초에서 1.5초로 개선',
      },
    ],
    lessonsLearned: [
      'Dependency Injection 패턴의 강력한 의존성 해결 능력을 확인했습니다.',
      'Module Federation을 통한 마이크로 프론트엔드 아키텍처의 잠재력을 학습했습니다.',
      '확장 가능한 아키텍처 설계의 중요성을 깊이 이해했습니다.',
    ],
  },
};
