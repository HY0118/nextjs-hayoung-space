import type { Project } from '@interfaces/project';

export const motiveDesignEditor: Project = {
  // Project Card:
  id: 'motive-flow',
  title: 'Design Editor (설계 컨텐츠 제작 앱)',
  description:
    '복잡한 공학 계산 로직을 시각적으로 모델링하고, 노드-엣지 기반의 직관적 UI로 통합 모델링을 제공하는 디자인 에디터',
  image: '/images/projects/project_design-editor/screenshots/DesignEditor logo.svg',
  imageFit: 'contain',
  tech: [
    'Next.js',
    'React',
    'TypeScript',
    'ReactFlow',
    'RJSF',
    'Recoil',
    'Framer Motion',
    'KaTeX',
    'Dagre',
    'Anthropic API',
    'Bitbucket',
  ],
  github: 'https://github.com/',
  demo: 'https://demo.com',

  // Project Structure:
  details: {
    // 1. Overview & Achievements
    //    - 프로젝트 개요
    //    - 주요 성과 지표 (수치화된 데이터)
    overview:
      'ReactFlow로 복잡한 설계 로직을 시각화하여 흐름/의존성을 직관적으로 파악하고, AutoLayout·정합성 검사·수식 입력·AI 도구를 결합해 사용자가 빠르고 안정적으로 모델을 구축하도록 돕는 에디터',
    achievements: [
      { value: '80%', label: '레이아웃 정돈 시간 절감(오토레이아웃)' },
      { value: '60%', label: '입력 오류 감소(무결성/정합성 검사)' },
      { value: '50+', label: '커스텀 노드·에지·핸들 구현' },
    ],

    // 2. Demo
    //    - 데모 비디오 또는 GIF
    demoGif: '/images/projects/project_design-editor/screenshots/example.gif',
    demoVideo: {
      mp4: '',
    },

    // 3. Problem & Solution
    //    - 문제 정의
    //    - 해결 방안
    problemStatement:
      '복잡한 공학 계산 로직과 데이터 의존성을 텍스트/폼만으로는 이해·관리하기 어려움. 레이아웃 정리 비용과 사용자 입력 오류로 인해 생산성과 신뢰성이 저하됨.',
    solutionApproach:
      'ReactFlow 기반 노드-엣지 모델링으로 흐름을 시각화하고, Dagre로 자동 배치하여 배치 비용을 낮춤. KaTeX 수식 입력과 커스텀 파서를 통해 표현력을 확보하고, 정합성 검사로 안정성을 보장. Anthropic API를 활용해 이미지→컴포넌트 자동 변환으로 초기 스켈레톤 생성을 가속.',

    // 4. Key Features
    //    - 주요 기능
    //    - 구현 방식
    features: [
      {
        name: '시각적 모델링 (ReactFlow)',
        description: '노드-엣지 기반 로직 설계와 상태 연동으로 직관적 편집 경험 제공',
        implementation:
          'Custom Node/Edge/Handle 구성, 연결 상태 기반 애니메이션·스타일로 피드백 강화',
      },
      {
        name: '오토 레이아웃 (Dagre)',
        description: '복잡 그래프를 자동으로 계층화·정렬해 가독성 극대화',
        implementation: 'Dagre 토폴로지 계산 + 노드 크기/마진 반영 + 사용자 보정 지원',
      },
      {
        name: '이미지→컴포넌트 자동 변환 (Anthropic)',
        description: '이미지/문서에서 수식·구조를 추출해 UI 컴포넌트 스켈레톤 자동 생성',
        implementation: 'Claude 3.5 Sonnet API 연동 및 보안 프록시로 안전한 호출 구성',
      },
    ],

    // 5. Architecture & Tech Stack
    //    - 시스템 구조
    //    - 기술 스택 및 선택 이유
    techStack: [
      {
        category: 'Frontend',
        items: [
          { name: 'React', description: '컴포넌트 기반 UI와 상호작용 구현' },
          { name: 'TypeScript', description: '정적 타이핑으로 안정성과 유지보수성 확보' },
          { name: 'ReactFlow', description: '그래프 기반 편집기 핵심(노드·에지·핸들)' },
          { name: 'RJSF', description: '데이터 기반 폼 정의로 입력 UI 표준화' },
          { name: 'Framer Motion', description: '전환/피드백 애니메이션으로 UX 강화' },
          { name: 'KaTeX', description: '수식 렌더링과 실시간 미리보기' },
        ],
      },
      {
        category: 'State Management',
        items: [
          { name: 'Recoil', description: '세분화된 아톰/셀렉터로 리렌더링 최소화' },
        ],
      },
      {
        category: 'Graph/Layout',
        items: [{ name: 'Dagre', description: '계층형 자동 배치와 경로 정렬' }],
      },
      {
        category: 'AI Integration',
        items: [
          {
            name: 'Anthropic Claude 3.5 Sonnet',
            description: '이미지→컴포넌트 초안 생성',
          },
        ],
      },
      {
        category: 'Tooling',
        items: [{ name: 'Bitbucket', description: '형상 관리 및 CI 파이프라인' }],
      },
    ],

    // 6. Performance
    //    - 성능 개선 사항
    //    - 최적화 결과
    performance: [
      {
        name: '렌더링 빈도 감소',
        improvement: '45%',
        description: 'Recoil selector·메모이제이션으로 불필요 리렌더링 감소',
      },
      {
        name: '드래그/연결 인터랙션',
        improvement: '>60FPS',
        description: '이벤트 스로틀링·가벼운 DOM 업데이트로 프레임 안정화',
      },
      {
        name: '초기 그래프 배치 시간',
        improvement: '70%',
        description: 'Dagre 사전 계산과 비동기 배치 적용',
      },
    ],

    // 7. Testing
    //    - 테스트 전략
    //    - 커버리지
    testing: [
      {
        name: '단위 테스트',
        description: '유틸/파서/정합성 검사 로직 테스트',
        coverage: 70,
      },
      {
        name: '통합 테스트',
        description: '핵심 편집 플로우 시나리오 검증',
        coverage: 50,
      },
    ],

    // 8. Challenges
    //    - 직면한 문제
    //    - 해결 과정
    challenges: [
      {
        problem: '상태 의존성으로 인한 무한 리렌더링과 데이터 덮어쓰기',
        solution:
          'Recoil 아톰/셀렉터 재설계, selector family 분리, useMemo/useCallback으로 의존성 안정화',
      },
      {
        problem: '복잡 그래프에서의 레이아웃 왜곡/겹침',
        solution: 'Dagre 계층화 + 노드 크기/마진 반영 + 사용자 오프셋 보정 기능 도입',
      },
    ],

    // 9. Learnings & Improvements
    //    - 학습한 점
    //    - 향후 개선 사항
    learnings: [
      '그래프 기반 UI의 성능/상태 관리 전략 수립',
      '수식 파싱·렌더 파이프라인 설계 경험',
      'AI 연동을 통한 부가기능 프로토타이핑 경험',
    ],
    futureImprovements: [
      '그래프 버전 관리/협업(차이 비교·머지) 기능',
      '템플릿/컴포넌트 마켓 및 공유 기능',
      '오프라인 편집·동기화 지원',
    ],

    // 10. Screenshots
    //    - 주요 화면 캡처
    //    - 설명
    images: [
      {
        url: '/images/projects/project_design-editor/screenshots/design-editor-dashboard.png',
        description: '대시보드/메인',
      },
      {
        url: '/images/projects/project_design-editor/screenshots/design-editor-flow.png',
        description: '그래프 플로우',
      },
      {
        url: '/images/projects/project_design-editor/screenshots/design-editor-component-create.png',
        description: '컴포넌트 생성',
      },
      {
        url: '/images/projects/project_design-editor/screenshots/DGE_Node.gif',
        description: '노드 인터랙션',
      },
      {
        url: '/images/projects/project_design-editor/screenshots/DGE_Result.gif',
        description: '결과 미리보기',
      },
      {
        url: '/images/projects/project_design-editor/screenshots/DGE_Flow.gif',
        description: '플로우 애니메이션',
      },
      {
        url: '/images/projects/project_design-editor/screenshots/DGE_DatabaseList.gif',
        description: '데이터베이스 리스트',
      },
      {
        url: '/images/projects/project_design-editor/screenshots/DGE_DatabaseNodes.gif',
        description: '데이터베이스 노드',
      },
    ],
  },
};
