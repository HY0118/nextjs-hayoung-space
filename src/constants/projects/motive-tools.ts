import type { Project } from '@interfaces/project';

export const motiveTools: Project = {
  id: 'motive-tools',
  title: 'Tools (고객 유입 설계 컨텐츠 페이지)',
  description:
    '엔지니어를 위한 인터랙티브 설계 컨텐츠 플랫폼\n- 국가별 지진·온도 하중 등 전문 설계 기준 제공',
  image: '/images/projects/project_tools/screenshots/tools_thumbnail.png',
  tech: [
    'Next.js',
    'React',
    'TypeScript',
    'RJSF',
    'Zustand',
    'Framer Motion',
    'Bitbucket',
  ],
  github: '',
  demo: 'https://tools.midasuser.com/ko',

  details: {
    overview:
      'MIDAS Tools는 다양한 국가별 설계 기준을 인터랙티브하게 제공하는 웹 기반의 설계 컨텐츠 플랫폼입니다.',
    achievements: [
      { value: '2,000+', label: '월 활성 사용자(MAU)' },
      { value: '50%', label: 'Google Organic 유입 비율' },
    ],

    demoGif: '',
    demoVideo: { mp4: '/images/projects/project_tools/tools_demo.mp4' },

    problemStatement:
      '기존 설계 컨텐츠의 비효율적인 수작업 관리 및 신규 고객 유입의 정체 현상',
    solutionApproach:
      '웹 기반의 인터랙티브 설계 컨텐츠 제공과 SEO 최적화를 통한 신규 고객 확보 및 유지',

    features: [
      {
        name: '인터랙티브 설계 컨텐츠 제공',
        description: '국가별 지진, 온도 하중 등의 설계 기준을 인터랙티브하게 제공',
        implementation:
          'Next.js의 SSR/SSG 혼합 전략으로 성능과 SEO를 최적화하고 JSON Schema와 RJSF로 데이터 기반의 동적 폼 구현',
      },
    ],

    techStack: [
      {
        category: 'Frontend',
        items: [
          { name: 'Next.js', description: 'SSR 및 SSG를 통한 성능 및 SEO 최적화' },
          { name: 'React', description: '컴포넌트 기반 UI 설계 및 상태 관리' },
          { name: 'TypeScript', description: '정적 타입 지정을 통한 코드 안정성 강화' },
        ],
      },
      {
        category: 'Data & State Management',
        items: [
          {
            name: 'TanStack Query',
            description: 'API 관련 서버 데이터 캐싱 및 관리, 로딩 상태 최적화',
          },
          { name: 'Zustand', description: '컴포넌트 간의 간결한 전역 상태 관리' },
          {
            name: 'RJSF(react-jsonschema-form)',
            description: 'JSON Schema 기반의 데이터 중심 UI 설계',
          },
        ],
      },
      {
        category: 'Optimization & Animation',
        items: [
          {
            name: 'Framer Motion && CSS',
            description: '사용자 경험을 위한 인터랙티브 애니메이션',
          },
          {
            name: 'Web 성능 최적화',
            description:
              '컴포넌트 렌더링 및 이미지 지연 로딩 전략을 통한 웹 페이지 성능 최적화',
          },
        ],
      },
    ],

    performance: [
      {
        name: '렌더링 속도',
        improvement: '57%',
        description: 'Next.js SSR/SSG 전략을 적용해 LCP 3.5초 → 1.5초로 단축',
      },
      {
        name: '페이지 로딩 성능',
        improvement: '50%',
        description:
          '컴포넌트 레이지 로딩과 이미지 최적화 및 React.memo를 통한 렌더링 최적화로 성능 향상',
      },
    ],

    testing: [
      {
        name: '렌더링 안정성',
        description: '주요 컴포넌트 렌더링 유닛 테스트',
        coverage: 90,
      },
    ],

    challenges: [
      {
        problem: 'Monorepo 환경 내 프로젝트 빌드 속도 저하',
        solution:
          '번들 분석 / 불필요 패키지 정리 / Tree shaking 최적화 / 코드 스플릿 / 빌드 캐싱 / Docker 메모리 조정으로 빌드 속도 개선',
      },
      {
        problem: '다양한 설계 컨텐츠 기획에 대한 개별 UI 개발 리소스 부족',
        solution:
          '데이터 기반 Schema 형식을 기반으로 기획서 작성 및 json schema 기반 웹 UI 생성 자동화 구축',
      },
    ],

    learnings: [
      'SSR/SSG 혼합 전략을 통한 웹 성능 및 SEO 향상 방법',
      'TypeScript를 활용한 유지보수성과 코드 품질 개선',
      'Component 추상화를 통한 컨텐츠 UI 패널 재사용성 개선',
      '메타 태그 최적화, 구조화 데이터(JSON-LD) 등 Technical SEO 개선',
    ],

    futureImprovements: [
      '다국어 지원을 통한 글로벌 사용자 확장',
      '사용자 피드백을 기반으로 한 지속적인 UI/UX 개선',
      '유닛 테스트를 통한 지속적인 리커버리 상승',
    ],

    images: [
      {
        url: '/images/projects/project_tools/screenshots/tools_main.png',
        description: '메인 페이지',
      },
      {
        url: '/images/projects/project_tools/screenshots/tools_design_application.png',
        description: 'Design Tool - Fundamental Basic Wind Velocity Map',
      },
      {
        url: '/images/projects/project_tools/screenshots/tools_design_application2.png',
        description: 'Design Tool - Concrete Material Suite for Eurocode',
      },
      {
        url: '/images/projects/project_tools/screenshots/tools_desing_guide.png',
        description:
          'Design guide - Peak Velocity Pressure for Wind and Traffic Leading Combinations',
      },
      {
        url: '/images/projects/project_tools/screenshots/tools_desing_guide2.png',
        description: 'Design guide - Range of uniform bridge temperature component',
      },
    ],
  },
};
