import type { TechnicalIssue, TechnicalIssuesConfig } from '@/interfaces/technicalIssues';

export const TECHNICAL_ISSUES_CONFIG: TechnicalIssuesConfig = {
  sectionTitle: 'Technical Issues',
  sectionSubtitle:
    '복잡한 기술적 문제를 해결한 경험과 그 과정에서 얻은 인사이트를 공유합니다.',
  categories: {
    performance: {
      label: '성능 최적화',
      color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
    },
    architecture: {
      label: '아키텍처 설계',
      color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    },
    optimization: {
      label: '시스템 최적화',
      color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    },
  },
};

export const TECHNICAL_ISSUES: TechnicalIssue[] = [
  {
    id: 'webview-memory-optimization',
    category: 'performance',
    projectName: 'In App Plugin Platform',
    title: 'WebView 메모리 누수 및 성능 최적화',
    summary:
      'WebView 기반 플러그인 시스템에서 발생한 메모리 누수 문제를 해결하고 전체적인 성능을 75% 향상시킨 경험입니다.',
    impact: '메모리 사용량 감소',
    impactValue: '75%',
    mainTechnologies: ['React', 'WebView', 'Memory Management', 'Performance API'],
    duration: '4주',
  },
  {
    id: 'virtual-dom-optimization',
    category: 'optimization',
    projectName: 'Tools Site',
    title: 'Virtual DOM 렌더링 병목 최적화',
    summary:
      '대용량 데이터 렌더링 시 발생한 Virtual DOM 병목을 해결하여 렌더링 성능을 60% 개선한 사례입니다.',
    impact: '렌더링 시간 단축',
    impactValue: '60%',
    mainTechnologies: ['React', 'Virtual DOM', 'React.memo', 'useMemo'],
    duration: '3주',
  },
  {
    id: 'circular-dependency-resolution',
    category: 'architecture',
    projectName: 'moaUI Design System',
    title: '순환 의존성 해결 및 아키텍처 재설계',
    summary:
      '컴포넌트 라이브러리에서 발생한 순환 의존성 문제를 해결하고 확장 가능한 아키텍처로 재설계한 경험입니다.',
    impact: '빌드 시간 단축',
    impactValue: '85%',
    mainTechnologies: ['TypeScript', 'Dependency Injection', 'Module Architecture'],
    duration: '6주',
  },
];
