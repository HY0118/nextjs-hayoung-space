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
  demo: 'https://main--6556d17f924e868b000ddaf5.chromatic.com/?path=/docs/welcome-moaui--explore',

  // Project Structure:
  details: {
    // 1. Overview & Achievements
    //    - 프로젝트 개요
    //    - 주요 성과 지표 (수치화된 데이터)
    overview:
      '엔지니어링 도메인에 특화된 플러그인 UI를 위한 디자인 시스템/컴포넌트 라이브러리. 공통 컴포넌트·도메인 플러그인 UI·그래픽(2D) 유틸을 제공하고 문서/테스트/배포 자동화를 갖춤',
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
      '플러그인별로 UI/UX가 상이하고 그래픽·데이터 처리 유틸이 중복되어 생산성/일관성이 저하됨. 빌드 체인과 폰트/경로 등 환경 차이로 런타임 오류가 발생',
    solutionApproach:
      'MUI 기반 커스텀 컴포넌트 + 그래픽 유틸(moaui-vertices) + API/http 유틸을 통합. Storybook/Chromatic/Jest로 문서/테스트/시각회귀 자동화, tsc-alias·폰트 경로 정리로 런타임 이슈 제거',

    // 4. Key Features
    //    - 주요 기능
    //    - 구현 방식
    features: [
      {
        name: '컴포넌트 라이브러리',
        description: '도메인 특화 컴포넌트 포함 40+ 구성요소 제공',
        implementation:
          '기본 Props 정리(defaultProps 제거, 기본값 명시), Flex/ColorPicker/DropList/Datagrid/CodeBlock 등 지속 확장',
      },
      {
        name: '디자인 시스템',
        description: '테마·타이포·레이아웃 가이드 제공',
        implementation:
          'Pretendard 폰트 public 관리·경로 수정(Next.js 참조 오류 해결), combine classes 유틸',
      },
      {
        name: '그래픽/수치 유틸',
        description: '2D 섹션·라인·치수선·지시선 등 도형 렌더 유틸',
        implementation:
          'moaui-vertices 추가(Coord→Vertex2D), AutoScale/Scale/Origin 중앙정렬, GuideLine/LeaderLine, Section/HSection 샘플',
      },
      {
        name: '데이터/도구',
        description: 'xlsx↔json 변환, formula, codeify, http/api 유틸',
        implementation:
          'httpRequestInit 업데이트, api 패키지 추가, xlsx-to-json/json-to-render, formula/codeify, db helper/default concept',
      },
      {
        name: '문서·테스트 자동화',
        description: 'Storybook·Chromatic·Jest 스냅샷·절대 경로',
        implementation:
          'jest 스냅샷/절대 경로, tsc-alias로 TS 절대→상대 경로 변환, Nivo 제거/업데이트와 관련 컴포넌트 주석 처리',
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
          { name: 'MUI', description: 'Design tokens/컴포넌트 커스터마이징' },
          { name: 'Storybook/Chromatic', description: '문서·시각회귀 자동화' },
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
        category: 'Graphics & Utils',
        items: [
          { name: 'moaui-vertices', description: '2D Vertex 유틸/스케일링/정렬' },
          { name: 'tsc-alias', description: 'TS 절대 경로 → 상대 경로 변환' },
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
        description: 'Nivo 제거/의존성 정리 + tree-shaking/코드 분할',
      },
      {
        name: '런타임 오류 감소',
        improvement: '90%',
        description: "'Failed to resolve import'·폰트 경로 이슈 해결로 배포 안정성 향상",
      },
    ],

    // 7. Testing
    //    - 테스트 전략
    //    - 커버리지
    testing: [
      { name: 'Unit Tests', description: 'Jest + RTL 단위 테스트', coverage: 85 },
      { name: 'Visual Regression', description: 'Chromatic 시각 회귀', coverage: 90 },
      { name: 'Absolute Paths', description: 'jest absolute paths 동작 확인' },
    ],

    // 8. Challenges
    //    - 직면한 문제
    //    - 해결 과정
    challenges: [
      {
        problem: "'Failed to resolve import' 배포 오류",
        solution: 'tsconfig 정리, tsc-alias 적용, import 경로 표준화로 해결',
      },
      {
        problem: '폰트/정적 자산 경로로 인한 Next.js 참조 오류',
        solution: 'Pretendard 위치를 public으로 이동하고 import 구조 개선',
      },
    ],

    // 9. Learnings & Improvements
    //    - 학습한 점
    //    - 향후 개선 사항
    learnings: [
      '컴포넌트 표준화와 도메인 유틸 결합 전략',
      '빌드/테스트/문서 파이프라인 일원화 경험',
      '경로/폰트 등 환경 의존 이슈의 체계적 해결',
    ],
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
        url: '/images/projects/project_moaUI/screenshots/moaUI_storybook.png',
        description: 'Storybook 문서',
      },
      {
        url: '/images/projects/project_moaUI/screenshots/moaUI_npm.png',
        description: 'NPM 배포',
      },
      {
        url: '/images/projects/project_moaUI/screenshots/moaUI_github.png',
        description: 'Github 레포지토리',
      },
      {
        url: '/images/projects/project_moaUI/screenshots/moaUI-design-system-plugin.png',
        description: '디자인 시스템 플러그인 적용 예',
      },
    ],
  },
};
