import type { TechnicalIssue } from '@/interfaces/technicalIssues';

export const TECHNICAL_ISSUES: TechnicalIssue[] = [
  {
    id: 'webview-memory-optimization',
    projectId: 'in-app-plugin',
    projectName: 'In App Plugin Platform',
    category: 'Performance',
    title: '마이크로 프론트엔드 메모리 누수 해결',
    summary:
      '120+ 플러그인 동시 실행 환경에서 메모리 누수와 상태 동기화 충돌 문제를 아키텍처 레벨에서 해결',
    impact: '메모리 사용량 65% 감소, 시스템 안정성 99.5% 달성',
    impactValue: '65%',
    mainTechnologies: [
      'WebView API',
      'MessagePack',
      'Service Worker',
      'OpenSearch',
      'React',
    ],
    detailPath: '/technical-issues/webview-memory-optimization',
    duration: '3 weeks',
  },
  {
    id: 'virtual-dom-optimization',
    projectId: 'motive-tools',
    projectName: 'Tools Site',
    title: '대용량 데이터 Virtual DOM 병목 최적화',
    summary:
      '10,000+ 설계 데이터 렌더링에서 React Reconciliation 알고리즘의 O(n³) 복잡도 문제를 해결',
    impact: 'First Contentful Paint 70% 개선, JavaScript 실행 시간 55% 단축',
    impactValue: '70%',
    mainTechnologies: [
      'Next.js SSR/SSG',
      'React.memo',
      'TanStack Query',
      'RJSF',
      'Zustand',
    ],
    detailPath: '/technical-issues/virtual-dom-optimization',
    category: 'Performance',
    duration: '2 weeks',
  },
  {
    id: 'circular-dependency-resolution',
    projectId: 'moaui-design-system',
    projectName: 'moaUI Design System',
    title: '분산 컴포넌트 순환 의존성 해결',
    summary:
      '50+ 컴포넌트 간 circular dependency와 TypeScript 타입 추론 성능 저하를 시스템 아키텍처 재설계로 해결',
    impact: '빌드 시간 75% 단축, 타입 체크 성능 85% 향상',
    impactValue: '75%',
    mainTechnologies: ['tsc-alias', 'TypeScript', 'MUI', 'Storybook', 'Chromatic'],
    detailPath: '/technical-issues/circular-dependency-resolution',
    category: 'Architecture',
    duration: '4 weeks',
  },
];

export const TECHNICAL_ISSUES_CONFIG = {
  sectionTitle: 'Technical Issues',
  sectionSubtitle: '깊이있는 기술 고민 경험',
  categories: {
    Performance: { label: '성능 최적화', color: 'bg-blue-100 text-blue-800' },
    Architecture: { label: '아키텍처', color: 'bg-purple-100 text-purple-800' },
    Security: { label: '보안', color: 'bg-red-100 text-red-800' },
    UX: { label: 'UX 개선', color: 'bg-green-100 text-green-800' },
    'System Design': { label: '시스템 설계', color: 'bg-yellow-100 text-yellow-800' },
  },
} as const;
