import type { Project } from '@interfaces/project';

export const moauiDesignSystem: Project = {
  // Project Card:
  id: 'moaui-design-system',
  title: 'moaUI 컴포넌트 & 디자인 시스템',
  description: '자사 소프트웨어 제품 내 Plugin 디자인 시스템 및 컴포넌트 라이브러리',
  image: '/images/projects/project_moaUI/screenshots/moaUI-design-system-thumbnail.png',
  tech: ['React', 'TypeScript', 'MUI', 'NPM', 'Storybook', 'Chromatic', 'Github'],
  github: 'https://github.com/midasit-dev/moaui',
  npm: 'https://www.npmjs.com/package/@midasit-dev/moaui-components-v1',
  demo: 'https://main--6556d17f924e868b000ddaf5.chromatic.com/?path=/docs/components-chip--explore',

  // Project Structure:
  details: {
    // 1. Overview & Achievements
    //    - 프로젝트 개요
    //    - 주요 성과 지표 (수치화된 데이터)
    overview:
      '건축/토목 엔지니어링 소프트웨어 내 Plugin 디자인 시스템 및 컴포넌트 라이브러리 제공',
    achievements: [
      { value: '50+', label: 'Plugin 개발자 사용' },
      { value: '30%', label: '개발 시간 단축' },
      { value: '90%', label: '코드 재사용성' },
    ],

    // 2. Demo
    //    - 데모 비디오 또는 GIF
    demoGif: '',
    demoVideo: {
      mp4: '',
    },

    // 3. Problem & Solution
    //    - 문제 정의
    //    - 해결 방안
    problemStatement:
      'Plugin 개발자들이 일관된 UI/UX를 구현하기 위한 표준화된 컴포넌트 시스템 부재',
    solutionApproach:
      'MUI를 기반으로 한 커스텀 디자인 시스템을 구축하고, Storybook을 통한 문서화 및 테스트 환경 제공',

    // 4. Key Features
    //    - 주요 기능
    //    - 구현 방식
    features: [
      {
        name: '컴포넌트 라이브러리',
        description: 'Plugin 개발을 위한 40+ 커스텀 컴포넌트 제공',
        implementation: 'MUI 기반 컴포넌트 커스터마이징 및 새로운 컴포넌트 개발',
      },
      {
        name: '디자인 시스템',
        description: '일관된 디자인 가이드라인과 테마 시스템 제공',
        implementation: 'Theme Provider를 통한 글로벌 스타일 및 다크모드 지원',
      },
      {
        name: '문서화 시스템',
        description: '컴포넌트 사용법과 예제 코드 제공',
        implementation: 'Storybook을 활용한 인터랙티브 문서화 및 실시간 코드 편집기 구현',
      },
      {
        name: '테스트 자동화',
        description: '컴포넌트 품질 보증을 위한 테스트 시스템',
        implementation:
          'Jest와 React Testing Library를 활용한 단위 테스트 및 Chromatic을 통한 시각적 회귀 테스트',
      },
    ],

    // 5. Architecture & Tech Stack
    //    - 시스템 구조
    //    - 기술 스택 및 선택 이유
    architecture: '',
    techStack: [
      {
        category: 'Frontend',
        items: [
          {
            name: 'React',
            description: '컴포넌트 기반 UI 개발 및 상태 관리',
          },
          {
            name: 'TypeScript',
            description: '타입 안정성 확보 및 개발 생산성 향상',
          },
        ],
      },
      {
        category: 'State Management',
        items: [
          {
            name: 'Zustand',
            description: '간단하고 효적인 전역 상태 관리',
          },
        ],
      },
    ],

    // 6. Performance
    //    - 성능 개선 사항
    //    - 최적화 결과
    performance: [
      {
        name: '번들 크기 최적화',
        improvement: '40%',
        description: 'Tree-shaking과 코드 분할을 통한 번들 사이즈 감소',
      },
      {
        name: '컴포넌트 렌더링 성능',
        improvement: '60%',
        description: '메모이제이션과 가상화를 통한 렌더링 최적화',
      },
    ],

    // 7. Testing
    //    - 테스트 전략
    //    - 커버리지
    testing: [
      {
        name: 'Unit Tests',
        description: 'Jest와 React Testing Library를 사용한 단위 테스트',
        coverage: 85,
      },
      {
        name: 'Visual Regression Tests',
        description: 'Chromatic을 통한 시각적 회귀 테스트',
        coverage: 90,
      },
    ],

    // 8. Challenges
    //    - 직면한 문제
    //    - 해결 과정
    challenges: [
      {
        problem: '',
        solution: '',
      },
    ],

    // 9. Learnings & Improvements
    //    - 학습한 점
    //    - 향후 개선 사항
    learnings: [''],
    futureImprovements: [
      '컴포넌트 접근성(a11y) 가이드라인 준수 강화',
      '테마 커스터마이징 기능 확장',
      '성능 모니터링 시스템 도입',
    ],

    // 10. Screenshots
    //    - 주요 화면 캡처
    //    - 설명
    images: [
      {
        url: '',
        description: '메인 페이지',
      },
    ],
  },
};
