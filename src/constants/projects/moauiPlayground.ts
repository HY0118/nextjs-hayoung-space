import type { Project } from '@interfaces/project';

export const moauiPlayground: Project = {
  // Project Card:
  id: 'moaui-playground',
  title: 'Playground (Visual Programming)',
  description:
    'moaUI 컴포넌트를 활용한 드래그앤드롭 UI 제작 페이지 및 React 코드 자동 생성 기능',
  image: '/images/projects/project_playground/screenshots/playground_thumbnail.png',
  tech: ['React', 'TypeScript', 'Recoil', 'Framer Motion', 'github'],
  github: 'https://github.com/',
  demo: 'https://demo.com',

  // Project Structure:
  details: {
    // 1. Overview & Achievements
    //    - 프로젝트 개요
    //    - 주요 성과 지표 (수치화된 데이터)
    overview:
      'moaUI 컴포넌트를 시각적으로 배치·편집하고 React 코드로 변환하는 Visual Programming Playground. Undo/Redo, VirtualLayer, Converter, ALZY 등 편집/도움 기능을 포함',
    achievements: [
      { value: 'Ctrl+Z / Ctrl+Y', label: 'Undo/Redo 단축키 지원' },
      { value: 'Auto', label: 'Canvas 크기/좌표 자동 보정' },
      { value: 'JSON→UI', label: 'Converter/ColorPicker 스키마 연동' },
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
      'UI 구성·좌표/레이어 관리가 수작업으로 번거롭고, 변경 이력/코드 변환/상태 보존이 어려움. 실험 기능(ALZY, Python 연동)도 일관된 관리가 필요',
    solutionApproach:
      'Recoil 기반 상태와 세션스토리지 동기화로 지속성 확보, Undo/Redo 타임라인 도입. Converter로 JSON↔UI/코드 변환, Canvas 자동 리사이즈/보정, VirtualLayer로 실시간 동기화',

    // 4. Key Features
    //    - 주요 기능
    //    - 구현 방식
    features: [
      {
        name: 'Undo/Redo 시스템',
        description: 'Dockbar 아이콘·단축키(Ctrl+Z / Ctrl+Y, Shift+Z) 지원',
        implementation:
          'Recoil undoRedo 타입 분리(layer/component), 동작 시 해당 layer 자동 포커스, drag/resize 시 기록 포함',
      },
      {
        name: 'Canvas/Layer 관리',
        description: '자동 리사이즈·좌표 보정·세션스토리지 동기화',
        implementation:
          '좌표 소수점 정리·범위 초과 자동 보정, VirtualLayer D&D/Resizing 실시간 동기화, loading 컴포넌트 추가',
      },
      {
        name: 'Showcase/Components 개선',
        description: 'X 버튼 정책·보더/opacity·모션·아이콘 업데이트',
        implementation:
          'Showcase X 제거(일괄 삭제는 Layers 탭), Components 모드 보더, drag/resize opacity, 생성/삭제 애니메이션',
      },
      {
        name: 'SideMenu / Navbar',
        description: '슬라이드/hover·JSON/CODE 표시·스타일 개선',
        implementation: 'Navbar 메뉴→Slide, SideMenu hover·버튼 추가 및 UI 표시',
      },
      {
        name: 'Converter/ColorPicker',
        description: '간격·복사전략 개선 및 스키마 연동',
        implementation:
          '얕은/깊은 복사 전략, 반환값 object화, ColorPicker JSON parse v23 반영',
      },
      {
        name: 'ALZY & PythonState',
        description: 'Suggestor·Loading·입력/결과 UI와 상태 모델',
        implementation:
          'Suggestor 디자인, InputField isLoading, Result 삭제, PythonState(Recoil) 관리',
      },
      {
        name: '코드/보안',
        description: 'Export Codes 간격·secure props',
        implementation: '코드 간격 보정, 멤버스/로그인 전달용 secure props 추가',
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
          { name: 'Framer Motion', description: '레이어 생성/삭제 모션·전환' },
        ],
      },
      {
        category: 'State Management',
        items: [{ name: 'Recoil', description: 'Undo/Redo·PythonState·Canvas 동기화' }],
      },
    ],

    // 6. Performance
    //    - 성능 개선 사항
    //    - 최적화 결과
    performance: [
      {
        name: '렌더/라인 속도',
        improvement: '40%',
        description: 'Line 출력 최적화 및 불필요 리렌더 제거',
      },
      {
        name: '상태 복원',
        improvement: '즉시',
        description: '세션스토리지 자동 저장으로 새로고침 후 즉시 복원',
      },
    ],

    // 7. Testing
    //    - 테스트 전략
    //    - 커버리지
    testing: [
      { name: 'Undo/Redo', description: '타임라인/포커스 동작' },
      { name: 'Converter', description: 'JSON↔UI/코드 변환 결과' },
      { name: 'Canvas 보정', description: '좌표·리사이즈 보정 유틸' },
    ],

    // 8. Challenges
    //    - 직면한 문제
    //    - 해결 과정
    challenges: [
      {
        problem: '레이어/컴포넌트 상태 변경 시 무분별한 리렌더',
        solution: '원본/복사 전략 정리(cloneDeep), key 고유화로 변경 감지 최소화',
      },
      {
        problem: 'Canvas 좌표/크기 일관성 및 D&D 정확도',
        solution: '자동 리사이즈·좌표 보정·소수점 정리·Lock 관리(Recoil)',
      },
    ],

    // 9. Learnings & Improvements
    //    - 학습한 점
    //    - 향후 개선 사항
    learnings: [
      '편집기 Undo/Redo 설계와 타임라인 관리',
      '상태 영속화(세션스토리지)와 Recoil 동기화',
      '시각적 편집→코드/스키마 변환 파이프라인 설계',
    ],
    futureImprovements: [
      '다중 선택/스냅/그리드·가이드라인',
      '변경 이력 시각화와 단계별 비교',
      '템플릿/프리셋 공유 및 가져오기',
    ],

    // 10. Screenshots
    //    - 주요 화면 캡처
    //    - 설명
    images: [
      {
        url: '/images/projects/project_playground/screenshots/playground_thumbnail.png',
        description: 'Playground 개요',
      },
      {
        url: '/images/projects/project_playground/screenshots/playground.mkv',
        description: '플로우 데모(영상 캡처)',
      },
      {
        url: '/images/projects/project_playground/screenshots/playground_gpt_to_civil.mkv',
        description: 'GPT→Civil 변환 데모',
      },
      {
        url: '/images/projects/project_playground/screenshots/playground_build_upload_to_civil.mkv',
        description: '빌드/업로드 데모',
      },
    ],
  },
};
