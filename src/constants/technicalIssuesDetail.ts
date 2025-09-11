// 기술 이슈 상세 컨텐츠 타입 정의
export interface TechnicalConsideration {
  title: string;
  description: string;
}

export interface Solution {
  title: string;
  description: string;
  implementation: string;
}

export interface Result {
  metric: string;
  value: string;
  description: string;
}

export interface DetailContent {
  problemDescription: string;
  technicalConsiderations: TechnicalConsideration[];
  solutions: Solution[];
  results: Result[];
}

// 기술 이슈 상세 데이터
export const TECHNICAL_ISSUES_DETAIL: Record<string, DetailContent> = {
  'webview-memory-optimization': {
    problemDescription:
      '120+ 플러그인이 WebView 환경에서 동시 실행되면서 플러그인 로딩 시간이 10초+로 늘어나고, 네이티브-웹 간 메시지 통신 지연이 심각해졌습니다. 수동 배포 프로세스로 인한 버전 충돌과 권한 검증 없는 플러그인 실행으로 보안 위험이 증가했으며, 메타데이터 스키마 불일치로 검색 품질이 저하되어 사용자 접근성이 떨어지는 문제가 발생했습니다.',
    technicalConsiderations: [
      {
        title: 'WebView 환경의 성능 병목 분석',
        description:
          'Chrome DevTools로 플러그인 로딩 병목 지점 식별, 리소스 프리로딩 vs 지연 로딩의 성능 trade-off 분석, 캐시 정책별 초기 실행 지연 개선 효과 측정',
      },
      {
        title: '네이티브-웹 간 통신 최적화 전략',
        description:
          'WebView 메시지 API 경량화 방안 검토, 페이로드 압축 vs 메시지 분할 전송의 RTT 비교, 메시지 큐 오버플로우 방지를 위한 백프레셔 메커니즘 설계',
      },
      {
        title: '권한 검증 및 보안 아키텍처 설계',
        description:
          'API Key 기반 권한 체계 vs OAuth 2.0 적용 가능성 분석, 단기 토큰 vs 장기 세션의 보안성 비교, 오리진 검증과 속성 서명을 통한 다중 보안 계층 구축',
      },
      {
        title: '검색 품질 및 메타데이터 표준화',
        description:
          'OpenSearch 색인 파이프라인 구축, 전체/부분 일치 vs 의미 기반 검색의 정확도 비교, 메타 스키마 표준화를 통한 검색 품질 개선 방안',
      },
    ],
    solutions: [
      {
        title: '플러그인 로딩 성능 최적화 시스템',
        description:
          '리소스 프리로딩과 지연 로딩을 조합한 하이브리드 로딩 전략을 구현하고, 캐시 정책 개선으로 초기 실행 지연을 획기적으로 감소시켰습니다.',
        implementation:
          '번들 크기별 로딩 전략 분기, HTTP/2 Server Push 활용한 리소스 사전 로딩, Service Worker 기반 정교한 캐시 제어',
      },
      {
        title: 'WebView 메시지 API 경량화 및 압축',
        description:
          'API 메시지 구조를 경량화하고 페이로드 압축을 도입하여 네이티브-웹 간 통신 성능을 대폭 개선했습니다.',
        implementation:
          'JSON 대신 MessagePack 활용한 직렬화, 메시지 배칭으로 RTT 최소화, 백프레셔 메커니즘으로 큐 오버플로우 방지',
      },
      {
        title: 'API Key 기반 다계층 보안 시스템',
        description:
          '제품별 API Key 발급과 실행 권한 검증을 통해 안전한 플러그인 실행 환경을 구축하고, 로그 수집으로 품질 지표를 확보했습니다.',
        implementation:
          '단기 토큰 발급으로 보안 강화, 오리진 검증과 속성 서명을 통한 다중 검증, publish 상태에서만 실행 로그 전송하는 조건부 수집',
      },
      {
        title: 'OpenSearch 기반 지능형 검색 시스템',
        description:
          '메타데이터 스키마를 표준화하고 OpenSearch 색인 파이프라인을 구축하여 키워드 및 시맨틱 검색 품질을 향상시켰습니다.',
        implementation:
          '필수 필드 표준화로 스키마 통일, 마이그레이션 스크립트를 통한 기존 데이터 정리, 전체/부분 일치와 의미 기반 검색 하이브리드 구현',
      },
    ],
    results: [
      {
        metric: '플러그인 로딩 시간',
        value: '55%',
        description: '감소 (10초+ → 4.5초)',
      },
      {
        metric: '통신 왕복 시간',
        value: '45%',
        description: '감소 (메시지 API 경량화)',
      },
      {
        metric: '목록 렌더 성능',
        value: '50%',
        description: '향상 (가상 스크롤 + 메모이제이션)',
      },
      {
        metric: '검색 정확도',
        value: '35%',
        description: '향상 (스키마 표준화 + OpenSearch)',
      },
    ],
  },
  'virtual-dom-optimization': {
    problemDescription:
      '국가별 설계 기준 컨텐츠를 제공하는 Tools 사이트에서 LCP(Largest Contentful Paint)가 3.5초에 달해 사용자 이탈률이 높았습니다. RJSF 기반 JSON Schema 동적 폼에서 복잡한 중첩 객체 변경 시 전체 트리가 리렌더링되고, SSR Hydration 과정에서 client-server 불일치로 인한 Layout Shift가 빈번하게 발생했습니다.',
    technicalConsiderations: [
      {
        title: 'SSR/SSG 하이브리드 전략 설계',
        description:
          'Next.js의 getStaticProps vs getServerSideProps 성능 비교, 페이지별 렌더링 전략 최적화, Incremental Static Regeneration(ISR) 적용 가능성 분석',
      },
      {
        title: 'JSON Schema 기반 폼 성능 최적화',
        description:
          'RJSF 렌더링 병목 지점 분석, deeply nested object 변경 시 부분 업데이트 전략, React.memo + useCallback 조합을 통한 불필요한 리렌더링 방지',
      },
      {
        title: 'SEO 및 사용자 경험 최적화',
        description:
          'Technical SEO를 위한 메타태그 최적화, 구조화 데이터(JSON-LD) 적용, Google Organic 유입률 향상을 위한 Core Web Vitals 개선',
      },
      {
        title: 'Monorepo 빌드 성능 최적화',
        description:
          '번들 분석을 통한 불필요한 패키지 정리, Tree Shaking 최적화, 코드 스플릿 전략, Docker 메모리 조정을 통한 빌드 속도 개선',
      },
    ],
    solutions: [
      {
        title: 'Next.js SSR/SSG 하이브리드 최적화',
        description:
          'Next.js의 SSR과 SSG를 혼합한 전략을 적용하여 렌더링 성능을 대폭 개선하고, 컴포넌트 레이지 로딩과 이미지 최적화를 구현했습니다.',
        implementation:
          'getStaticProps로 정적 컨텐츠 사전 생성, React.memo로 컴포넌트 메모이제이션, next/image 최적화 및 지연 로딩 적용',
      },
      {
        title: 'TanStack Query 기반 서버 상태 관리',
        description:
          'API 관련 서버 데이터 캐싱과 로딩 상태 최적화를 통해 사용자 경험을 향상시키고, Zustand로 클라이언트 상태를 효율적으로 관리했습니다.',
        implementation:
          'Query invalidation 전략 구현, stale-while-revalidate 패턴 적용, 컴포넌트 간 간결한 전역 상태 관리',
      },
      {
        title: 'Technical SEO 및 Core Web Vitals 최적화',
        description:
          '메타태그 최적화와 구조화 데이터를 적용하여 Google Organic 유입률을 50%까지 달성하고, Core Web Vitals 지표를 대폭 개선했습니다.',
        implementation:
          'JSON-LD 구조화 데이터 적용, 동적 메타태그 관리, 컴포넌트 기반 추상화를 통한 재사용성 개선',
      },
    ],
    results: [
      {
        metric: 'LCP (Largest Contentful Paint)',
        value: '57%',
        description: '개선 (3.5초 → 1.5초)',
      },
      {
        metric: '페이지 로딩 성능',
        value: '50%',
        description: '향상 (레이지 로딩 + 이미지 최적화)',
      },
      {
        metric: 'Google Organic 유입률',
        value: '50%',
        description: '달성 (Technical SEO 최적화)',
      },
      {
        metric: '월 활성 사용자',
        value: '2,000+',
        description: 'MAU 달성 (성능 개선 효과)',
      },
    ],
  },
  'circular-dependency-resolution': {
    problemDescription:
      'moaUI 디자인 시스템에서 "Failed to resolve import" 배포 오류와 폰트/정적 자산 경로로 인한 Next.js 참조 오류가 빈발했습니다. 40+ 컴포넌트 간 복잡한 의존성 구조로 Tree Shaking이 실패하고, TypeScript 절대 경로와 상대 경로 혼재로 빌드 안정성이 저하되었으며, Nivo 등 무거운 의존성으로 번들 크기가 과도하게 증가하는 문제가 발생했습니다.',
    technicalConsiderations: [
      {
        title: 'TypeScript 경로 해결 전략 분석',
        description:
          'tsconfig paths vs 상대 경로의 빌드 안정성 비교, tsc-alias를 활용한 절대→상대 경로 자동 변환, import 경로 표준화를 통한 해결 방안 검토',
      },
      {
        title: '컴포넌트 라이브러리 아키텍처 설계',
        description:
          'MUI 기반 커스텀 컴포넌트 확장 전략, 도메인 특화 UI와 범용 컴포넌트 분리, React.forwardRef + defaultProps 최적화를 통한 API 일관성 확보',
      },
      {
        title: '번들 최적화 및 의존성 관리',
        description:
          'Nivo 차트 라이브러리 제거를 통한 번들 크기 최적화, Tree Shaking 실패 원인 분석, 코드 분할 전략을 통한 로딩 성능 개선',
      },
      {
        title: '자동화된 품질 보증 시스템',
        description:
          'Storybook + Chromatic을 활용한 시각 회귀 테스트, Jest 스냅샷 테스트와 절대 경로 동작 검증, 지속적 통합을 위한 테스트 파이프라인 구축',
      },
    ],
    solutions: [
      {
        title: 'tsc-alias 기반 경로 표준화 시스템',
        description:
          'TypeScript 절대 경로를 상대 경로로 자동 변환하는 tsc-alias를 도입하고, tsconfig 정리와 import 경로 표준화를 통해 빌드 안정성을 확보했습니다.',
        implementation:
          'tsconfig.json paths 설정 정리, tsc-alias 빌드 파이프라인 통합, import 문 일관성 검증 스크립트 구현',
      },
      {
        title: '계층화된 컴포넌트 아키텍처 구축',
        description:
          'MUI 기반 40+ 컴포넌트를 도메인별로 분류하고, Pretendard 폰트를 public으로 이동하여 정적 자산 참조 오류를 해결했습니다.',
        implementation:
          'Flex/ColorPicker/DataGrid/CodeBlock 등 핵심 컴포넌트 확장, moaui-vertices 그래픽 유틸 통합, combine classes 유틸 구현',
      },
      {
        title: '고도화된 테스트 및 문서화 시스템',
        description:
          'Storybook/Chromatic/Jest를 결합한 통합 품질 보증 시스템을 구축하고, 시각 회귀 테스트로 UI 일관성을 자동 검증했습니다.',
        implementation:
          'Jest 스냅샷 테스트 + 절대 경로 검증, Chromatic 시각 회귀 자동화, Storybook 컴포넌트 문서 자동 생성',
      },
    ],
    results: [
      {
        metric: '번들 크기',
        value: '40%',
        description: '최적화 (Nivo 제거 + Tree Shaking)',
      },
      {
        metric: '런타임 오류',
        value: '90%',
        description: '감소 (경로 이슈 해결)',
      },
      {
        metric: '개발 시간',
        value: '30%',
        description: '단축 (컴포넌트 재사용)',
      },
      {
        metric: '코드 재사용성',
        value: '90%',
        description: '달성 (디자인 시스템 통합)',
      },
    ],
  },
};

// 상세 컨텐츠 조회 함수
export const getDetailContent = (issueId: string): DetailContent | null => {
  return TECHNICAL_ISSUES_DETAIL[issueId] || null;
};
