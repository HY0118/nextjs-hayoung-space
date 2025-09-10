'use client';

import { motion } from 'framer-motion';

import { TECHNICAL_ISSUES_CONFIG } from '@/constants/technical-issues';

import type { TechnicalIssue } from '@/interfaces/technical-issues';

// 상세 컨텐츠 타입 정의
interface TechnicalConsideration {
  title: string;
  description: string;
}

interface Solution {
  title: string;
  description: string;
  implementation: string;
}

interface Result {
  metric: string;
  value: string;
  description: string;
}

interface DetailContent {
  problemDescription: string;
  technicalConsiderations: TechnicalConsideration[];
  solutions: Solution[];
  results: Result[];
}

interface Props {
  issue: TechnicalIssue;
}

// 임시 상세 데이터 (나중에 실제 데이터로 교체 예정)
const getDetailContent = (issueId: string): DetailContent | null => {
  const detailData: Record<string, DetailContent> = {
    'webview-memory-optimization': {
      problemDescription:
        '120+ 독립적인 플러그인이 동시 실행되면서 메모리 사용량이 지속적으로 증가하는 문제가 발생했습니다. 플러그인 간 상태 충돌로 인한 데이터 불일치 및 예측 불가능한 동작이 나타났으며, WebView Context 전환 시 이벤트 리스너 누적으로 성능 저하와 메모리 누수가 심각해졌습니다.',
      technicalConsiderations: [
        {
          title: '메모리 누수 근본 원인 분석',
          description:
            'Chrome DevTools Memory 탭으로 힙 스냅샷 비교 분석, 이벤트 리스너, 타이머, DOM 참조가 GC되지 않는 패턴 식별, WeakMap vs Map 사용 시나리오별 메모리 효율성 비교',
        },
        {
          title: '상태 아키텍처 재설계',
          description:
            '중앙집중형 vs 분산형 상태 관리의 trade-off 분석, Event Sourcing vs CQRS 패턴 적용 가능성 검토, Saga 패턴으로 복잡한 비동기 플로우 관리 방안',
        },
        {
          title: '성능 병목 지점 세밀 분석',
          description:
            'React DevTools Profiler로 불필요한 리렌더링 패턴 추적, 메시지 패싱 오버헤드 vs 직접 메모리 공유의 성능 비교, Web Worker 활용한 메인 스레드 부하 분산 효과 측정',
        },
      ],
      solutions: [
        {
          title: '계층화된 메모리 관리 시스템 구축',
          description:
            'Plugin Sandbox Pattern으로 각 플러그인을 독립된 메모리 공간에서 실행하고, Reference Counting + WeakRef 조합으로 순환 참조를 방지했습니다.',
          implementation:
            'Dispose Pattern 구현으로 명시적 리소스 해제 보장, Memory Pool 도입으로 빈번한 할당/해제 최적화',
        },
        {
          title: 'Event-Driven Architecture 기반 상태 동기화',
          description:
            'Redux-Saga 기반 Side Effect 관리로 예측 가능한 상태 변경을 구현하고, Event Store Pattern으로 상태 변경 이력 추적 및 디버깅을 지원했습니다.',
          implementation:
            'Optimistic Concurrency Control로 동시성 충돌 해결, Compensating Transaction Pattern으로 실패 시 롤백 처리',
        },
        {
          title: '고성능 메시지 패싱 시스템 설계',
          description:
            'Message Channel API 기반 양방향 통신 파이프라인을 구축하고, Protocol Buffers 도입으로 직렬화 오버헤드를 70% 감소시켰습니다.',
          implementation:
            'Message Queuing + Batching으로 네트워크 RTT 최소화, Circuit Breaker Pattern으로 장애 전파 방지',
        },
      ],
      results: [
        {
          metric: '메모리 사용량',
          value: '65%',
          description: '감소 (120개 플러그인 동시 실행 시)',
        },
        {
          metric: '상태 동기화 충돌률',
          value: '95%',
          description: '감소 (Event Store 패턴)',
        },
        {
          metric: '메시지 처리 성능',
          value: '80%',
          description: '향상 (Protocol Buffers + Batching)',
        },
        {
          metric: '시스템 안정성',
          value: '99.5%',
          description: '달성 (Circuit Breaker Pattern)',
        },
      ],
    },
    'virtual-dom-optimization': {
      problemDescription:
        '10,000+ 설계 데이터 항목 렌더링 시 메인 스레드가 블로킹되어 UI 응답이 중단되는 문제가 발생했습니다. React Reconciliation 알고리즘의 O(n³) 복잡도로 인한 지수적 성능 저하와 JSON Schema 기반 동적 폼에서 deeply nested object 변경 시 전체 트리가 리렌더링되는 문제가 있었습니다.',
      technicalConsiderations: [
        {
          title: '렌더링 병목 지점 정밀 분석',
          description:
            'React DevTools Profiler + Performance API로 렌더링 단계별 시간 측정, Flame Graph 분석으로 CPU 집약적 컴포넌트 식별, Main Thread vs Web Worker 작업 분할 최적점 계산',
        },
        {
          title: '메모리 사용 패턴 최적화 전략',
          description:
            'Object Pooling vs Immutable Data Structure 메모리 효율성 분석, Shallow vs Deep Equality 체크의 성능 trade-off, Memoization Cache 크기와 Hit Rate 상관관계 분석',
        },
      ],
      solutions: [
        {
          title: 'Virtualization + Time Slicing 하이브리드 렌더링',
          description:
            'React Concurrent Mode를 활용한 Non-blocking Rendering과 Virtual Scrolling으로 DOM 노드 수를 일정하게 유지했습니다.',
          implementation:
            'requestIdleCallback 기반 Progressive Rendering, Priority Queue로 중요도별 렌더링 순서 제어',
        },
        {
          title: '고도화된 메모이제이션 전략',
          description:
            'useMemo + useCallback 조합으로 불필요한 재계산을 방지하고, Proxy-based Observable Pattern으로 세밀한 변경 감지를 구현했습니다.',
          implementation:
            'Structural Sharing 활용한 Immutable Update 최적화, WeakMap 기반 Component-level Cache로 메모리 효율성 확보',
        },
      ],
      results: [
        {
          metric: 'First Contentful Paint',
          value: '70%',
          description: '개선 (3.5초 → 1.05초)',
        },
        {
          metric: 'Time to Interactive',
          value: '60%',
          description: '개선 (5.2초 → 2.1초)',
        },
        {
          metric: '메모리 사용량',
          value: '45%',
          description: '감소 (Virtual Scrolling)',
        },
        {
          metric: 'JavaScript 실행 시간',
          value: '55%',
          description: '단축 (Web Worker 분산)',
        },
      ],
    },
    'circular-dependency-resolution': {
      problemDescription:
        '50+ 컴포넌트 간 circular dependency로 인한 빌드 실패 및 런타임 오류가 발생했습니다. TypeScript 타입 추론 성능이 저하되어 IDE 응답성이 악화되고(타입 체크 10초+), Monorepo 환경에서 의존성 그래프 복잡도 증가로 Tree Shaking이 실패하는 문제가 있었습니다.',
      technicalConsiderations: [
        {
          title: '의존성 그래프 최적화 전략',
          description:
            'Topological Sorting 알고리즘으로 의존성 순서 정렬, Strongly Connected Components 탐지로 순환 참조 그룹 식별, Dependency Injection vs Service Locator 패턴 적용 검토',
        },
        {
          title: '타입 시스템 성능 최적화',
          description:
            'TypeScript Compiler API로 타입 체크 병목 지점 분석, Conditional Types vs Mapped Types 성능 특성 비교, Type-only imports 분리로 런타임 번들 크기 최적화',
        },
      ],
      solutions: [
        {
          title: '레이어드 아키텍처 기반 의존성 관리',
          description:
            'Hexagonal Architecture 도입으로 핵심 로직과 UI를 분리하고, Dependency Inversion Principle을 적용한 Interface 기반 설계를 구현했습니다.',
          implementation:
            'Factory Pattern + Registry Pattern으로 동적 컴포넌트 로딩, Event Bus Pattern으로 느슨한 결합도 유지',
        },
        {
          title: '고성능 타입 시스템 설계',
          description:
            'Template Literal Types 활용한 Compile-time Validation과 Branded Types로 타입 안전성과 성능 균형을 확보했습니다.',
          implementation:
            'Distributive Conditional Types로 Union Type 처리 최적화, Type-level Programming으로 런타임 검증 코드 제거',
        },
      ],
      results: [
        {
          metric: '빌드 시간',
          value: '75%',
          description: '단축 (15분 → 3.75분, Affected 빌드)',
        },
        { metric: '타입 체크 성능', value: '85%', description: '향상 (10초 → 1.5초)' },
        { metric: '번들 크기', value: '50%', description: '감소 (Tree Shaking 최적화)' },
        {
          metric: '순환 의존성',
          value: '100%',
          description: '제거 (Topological Sort 기반 재구조화)',
        },
      ],
    },
  };

  return detailData[issueId] || null;
};

const TechnicalIssueDetail = ({ issue }: Props) => {
  const categoryConfig = TECHNICAL_ISSUES_CONFIG.categories[issue.category];
  const detailContent = getDetailContent(issue.id);

  if (!detailContent) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          상세 내용 준비 중
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          이 기술 이슈의 상세 내용은 곧 업데이트될 예정입니다.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      {/* Header Card */}
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 rounded-full text-sm font-medium border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300">
            {categoryConfig.label}
          </span>
          <span className="px-3 py-1 rounded-full text-sm font-medium border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300">
            {issue.duration}
          </span>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          {issue.title}
        </h1>

        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
          {issue.summary}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
            <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">프로젝트</div>
            <div className="font-semibold text-gray-900 dark:text-white">
              {issue.projectName}
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
            <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">주요 성과</div>
            <div className="font-semibold text-gray-900 dark:text-white">
              {issue.impact}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Problem Description Card */}
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
          <div className="w-2 h-6 bg-red-500 rounded-full mr-3"></div>
          복잡한 기술적 문제 상황
        </h2>
        <div className="bg-gray-50 dark:bg-gray-700/30 border-l-4 border-red-400 p-4 rounded-r-lg">
          <p className="text-gray-800 dark:text-gray-200 leading-relaxed text-sm">
            {detailContent.problemDescription}
          </p>
        </div>
      </motion.div>

      {/* Technical Considerations Card */}
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
          <div className="w-2 h-6 bg-blue-500 rounded-full mr-3"></div>
          심층적 기술 고민 과정
        </h2>
        <div className="space-y-4">
          {detailContent.technicalConsiderations.map(
            (consideration: TechnicalConsideration, index: number) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4 border-l-4 border-blue-400"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">
                  {index + 1}. {consideration.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                  {consideration.description}
                </p>
              </div>
            ),
          )}
        </div>
      </motion.div>

      {/* Solutions Card */}
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
          <div className="w-2 h-6 bg-green-500 rounded-full mr-3"></div>
          아키텍처 기반 해결책
        </h2>
        <div className="space-y-4">
          {detailContent.solutions.map((solution: Solution, index: number) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4 border-l-4 border-green-400"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">
                {index + 1}. {solution.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3 text-sm">
                {solution.description}
              </p>
              <div className="bg-white dark:bg-gray-800 rounded-md p-3 border">
                <div className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">
                  구현 방법:
                </div>
                <div className="text-gray-800 dark:text-gray-200 text-xs">
                  {solution.implementation}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Results Card */}
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
          <div className="w-2 h-6 bg-purple-500 rounded-full mr-3"></div>
          정량적 성과 및 임팩트
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {detailContent.results.map((result: Result, index: number) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4 border-l-4 border-purple-400"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                  {result.metric}
                </h3>
                <span className="text-xl font-bold text-purple-600 dark:text-purple-400">
                  {result.value}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-xs">
                {result.description}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Technology Stack Card */}
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          사용된 기술 스택
        </h2>
        <div className="flex flex-wrap gap-2">
          {issue.mainTechnologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium text-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default TechnicalIssueDetail;
