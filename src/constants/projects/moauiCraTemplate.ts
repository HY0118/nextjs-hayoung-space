import type { Project } from '@interfaces/project';

export const moauiCRATemplate: Project = {
  // Project Card:
  id: 'moaui-cra-template',
  title: 'moaui 기반 Plugin 개발 CRA 템플릿',
  description:
    'Plugin 개발 접근성 및 효율성 향상을 위해 moaui 기반 CRA 템플릿을 배포하여 프로젝트 개발 환경 표준화',
  image:
    '/images/projects/project_cra_template_moaui/screenshots/cra_template_moaui_thumbnail.png',
  tech: ['React', 'TypeScript', 'Next.js'],
  github: 'https://github.com/',
  demo: 'https://demo.com',

  // Project Structure:
  details: {
    // 1. Overview & Achievements
    //    - 프로젝트 개요
    //    - 주요 성과 지표 (수치화된 데이터)
    overview:
      'moaUI와 Pyscript를 기반으로 플러그인 개발 환경을 즉시 시작할 수 있는 CRA 템플릿. i18n, DevTools, Tailwind/Framer Motion 등 기본 구성을 포함하고 자동 배포 스크립트로 배포 경험을 단순화',
    achievements: [
      { value: '1.1.x', label: '지속적 버전 릴리스(자동화 파이프라인)' },
      { value: '3분→30초', label: '신규 스캐폴드 시간 단축' },
      { value: '0→N', label: '표준 템플릿 채택 팀 증가' },
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
      '플러그인 개발 착수 시 환경 설정 편차와 문서 분산으로 초기 러닝커브가 높고, 다국어/레이아웃/스타일·빌드 체인이 각자 구현되어 유지 보수가 어려움',
    solutionApproach:
      'CRA 템플릿에 DevTools·i18n·Tailwind·Framer Motion·Pyscript 샘플을 내장. 자동화 스크립트와 README를 표준화하고 버전 전략(1.1.x)으로 지속 배포',

    // 4. Key Features
    //    - 주요 기능
    //    - 구현 방식
    features: [
      {
        name: 'i18n & 언어 전환',
        description: 'URL Path 및 드롭리스트 기반 다국어 전환(ko/en/ja)',
        implementation:
          'react-router useNavigate 기반 전환으로 전체 리렌더 없이 라우팅, 마지막 path 파싱으로 인앱(WebView) URL 길이 이슈 해결',
      },
      {
        name: 'DevTools 세트',
        description: 'Playground·Home·Welcome 컴포넌트와 도구 패널 제공',
        implementation: '중복 Layout 제거, Playground로 통합. 포트 충돌 방지 +1 로직',
      },
      {
        name: '스타일/애니메이션',
        description: 'TailwindCSS + PostCSS + Framer Motion 기본 탑재',
        implementation: 'postcss 설정 추가, vite/빌드 반영, 스니펫/샘플 UI 포함',
      },
      {
        name: 'Pyscript 샘플',
        description: '활성/비활성 토글과 렌더링 에러 핸들링',
        implementation: '활성화 버그 수정, inactivate 버튼 추가, 릴리즈 버전 갱신',
      },
      {
        name: '스캐폴딩·자동 배포',
        description: 'npm publish 자동화 스크립트 및 Signature 출력',
        implementation: '1.1.92/1.1.87 등 지속 배포, 콘솔 로그·자동 버전 업데이트',
      },
      {
        name: '샘플/가이드',
        description: 'Schema 설명·Python/Component 샘플·Snackbar 예제·README',
        implementation: 'manifest/favicon/logo SVG 갱신, 주석/수치 업데이트',
      },
    ],

    // 5. Architecture & Tech Stack
    //    - 시스템 구조
    //    - 기술 스택 및 선택 이유
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
          {
            name: 'TailwindCSS',
            description: '유틸리티 퍼스트 스타일, PostCSS·autoprefixer 연계',
          },
          {
            name: 'Framer Motion',
            description: '부드러운 전환·애니메이션 샘플 제공',
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
      {
        category: 'Scripting',
        items: [
          { name: 'Pyscript', description: '프론트에서 Python 실행 샘플' },
          { name: 'uuid', description: '리소스 키/저장 UUID 분리' },
        ],
      },
    ],

    // 6. Performance
    //    - 성능 개선 사항
    //    - 최적화 결과
    performance: [
      {
        name: '스캐폴딩 속도',
        improvement: '80%',
        description: '템플릿 표준화로 초기 설정 제거 및 즉시 실행',
      },
      {
        name: '번들 경고 감소',
        improvement: '90%',
        description: '불필요 경고 제거와 의존성 정리로 빌드 로그 개선',
      },
    ],

    // 7. Testing
    //    - 테스트 전략
    //    - 커버리지
    testing: [
      {
        name: '라우팅/i18n',
        description: 'path 파싱·navigate 전환 유닛 테스트',
      },
      {
        name: 'DevTools',
        description: '포트 증가 로직·UI 토글 동작 확인',
      },
    ],

    // 8. Challenges
    //    - 직면한 문제
    //    - 해결 과정
    challenges: [
      {
        problem: '인앱(WebView) URL 구조로 인한 언어 추출 버그',
        solution: '첫 path→마지막 path 파싱으로 변경, ko/en/ja만 허용',
      },
      {
        problem: '중복 레이아웃과 DevTools 확장에 따른 복잡도 증가',
        solution: 'Layout 제거·Playground 통합, 컴포넌트화·경량화',
      },
      {
        problem: 'Pyscript 렌더링 에러와 활성화 버그',
        solution: '활성/비활성 토글, 경고 제거, 런타임 버전 갱신',
      },
    ],

    // 9. Learnings & Improvements
    //    - 학습한 점
    //    - 향후 개선 사항
    learnings: [
      '템플릿 표준화를 통한 Onboarding·배포 자동화 경험',
      '다국어 라우팅/성능·DX를 고려한 DevTools 구성',
      'Pyscript 통합과 JS<->Python 상호작용 제어',
    ],
    futureImprovements: [
      '템플릿 생성 CLI 제공 및 플러그인 스캐폴더 연동',
      'ESLint/Prettier 설정 번들링과 테스트 템플릿 추가',
      'Github Actions 릴리스 파이프라인 기본 포함',
    ],

    // 10. Screenshots
    //    - 주요 화면 캡처
    //    - 설명
    images: [
      {
        url: '/images/projects/project_cra_template_moaui/screenshots/cra_template_moaui_npm.png',
        description: 'create-template-moaui - npm package 페이지',
      },
      {
        url: '/images/projects/project_cra_template_moaui/screenshots/cra_template_moaui_github.png',
        description: 'create-template-moaui - github 페이지',
      },
      {
        url: '/images/projects/project_cra_template_moaui/screenshots/cra_template_moaui_light.png',
        description: 'standard ver / light ver',
      },
    ],
  },
};
