import type { Project } from '@interfaces/project';

export const inAppPlugin: Project = {
  // Project Card:
  id: 'in-app-plugin',
  title: 'In App Plugin 플랫폼 & 설계 컨텐츠',
  description: '자사 소프트웨어에 WebView 기반 Plugin 플랫폼 기획·개발 및 컨텐츠',
  image: '/images/projects/project_in_app_plugin/screenshots/in_app_plugin_thumbnail.png',
  tech: [
    'React',
    'JavaScript',
    'MUI',
    'Pyscript',
    'Python',
    'Deno',
    'MariaDB',
    'AWS S3 / EC2',
    'Bitbucket',
  ],
  github: '',
  demo: 'https://moa.midasit.com/plugin',

  // Project Structure:
  details: {
    // 1. Overview & Achievements
    //    - 프로젝트 개요
    //    - 주요 성과 지표 (수치화된 데이터)
    overview: '건축/토목 엔지니어링 소프트웨어 내 웹 기반 플러그인 플랫폼 및 컨텐츠 제공',
    achievements: [
      {
        value: '',
        label: '',
      },
    ],

    // 2. Demo
    //    - 데모 비디오 또는 GIF
    demoGif: '',
    demoVideo: {
      mp4: '/images/projects/project_in_app_plugin/in_app_plugin_demo.mp4',
    },

    // 3. Problem & Solution
    //    - 문제 정의
    //    - 해결 방안
    problemStatement: '',
    solutionApproach: '',

    // 4. Key Features
    //    - 주요 기능
    //    - 구현 방식
    features: [
      {
        name: 'API Beta 웹 프로토타입',
        description: 'API 테스트 페이지 제공',
        implementation: 'JSON Schema 기반 동적 UI 생성',
      },
      {
        name: '플러그인 컨텐츠 버전 관리',
        description: '버전 규칙 생성 및 업로드 시 버전 입력 체크, DB에 버전 저장 및 조회',
        implementation:
          '버전 규칙 생성 및 업로드 시 버전 입력 체크, DB에 버전 저장 및 조회',
      },
      {
        name: '플러그인 실행 권한 검증',
        description: 'Webview 메세지 api 통신으로 제품에서 발급받은 api key 전달 및 검증',
        implementation:
          'Webview 메세지 api 통신으로 제품에서 발급받은 api key 전달 및 검증',
      },
      {
        name: '플러그인 검색 및 필터링',
        description:
          'OpenSearch - KeyWord, Semantic search 도입으로 플러그인 검색 및 필터링',
        implementation:
          'OpenSearch - KeyWord, Semantic search 도입으로 플러그인 검색 및 필터링',
      },
      {
        name: '플러그인 리스트 페이지 로딩 속도 저하 문제',
        description: 'pagination 적용으로 페이지 로딩 속도 단축 및 사용자 경험 개선',
        implementation: 'pagination 적용으로 페이지 로딩 속도 단축 및 사용자 경험 개선',
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
            name: 'JavaScript',
            description: '플러그인 플랫폼, 컨텐츠 UI 동작 구현',
          },
          {
            name: 'MUI',
            description: 'UI 컴포넌트 라이브러리',
          },
          {
            name: 'Pyscript, Python',
            description:
              'Python함수와 UI코드 연동을 통한 객체 전달 및 복잡한 설계 계산 빠르게 처리',
          },
        ],
      },
      {
        category: 'Backend',
        items: [
          {
            name: 'Deno',
            description: 'Node.js 기반 서버 구축',
          },
          {
            name: 'MariaDB',
            description: 'Plugin 데이터베이스 관리',
          },
        ],
      },
      {
        category: 'Storage',
        items: [
          {
            name: 'AWS S3',
            description: '플러그인 파일(React Build zip파일) 업로드 및 저장',
          },
          {
            name: 'Bitbucket',
            description: '소스 코드 형상 관리 및 배포',
          },
        ],
      },
    ],

    // 6. Performance
    //    - 성능 개선 사항
    //    - 최적화 결과
    performance: [
      {
        name: '플러그인 로딩 시간',
        improvement: '55%',
        description: 'WebView 최적화 및 리소스 프리로딩으로 플러그인 실행 속도 개선',
      },
      {
        name: 'API 통신 속도',
        improvement: '45%',
        description: '메시지 API 최적화 및 데이터 압축으로 네이티브-웹 통신 속도 향상',
      },
    ],

    // 7. Testing
    //    - 테스트 전략
    //    - 커버리지
    testing: [
      {
        name: '',
        description: '',
        coverage: 0,
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
    learnings: [
      'WebView와 네이티브 앱 간 메시지 API를 활용한 양방향 통신 구현으로 하이브리드 앱 개발 역량 향상',
      'Pyscript를 활용한 Python/JavaScript 연동으로 복잡한 엔지니어링 계산 처리 최적화 경험',
      '시맨틱 버저닝(Semantic Versioning) 기반의 플러그인 버전 관리 시스템 설계 및 구현',
      'OpenSearch의 KeyWord/Semantic 검색 기능 구현으로 검색 엔진 최적화 및 사용자 경험 개선',
      'AWS S3와 MariaDB를 활용한 플러그인 저장소 설계로 클라우드 인프라 활용 능력 습득',
      'React Build 파일 압축 및 업로드 기능 구현으로 formData 형식의 파일 전송&저장 경험',
      '페이지네이션과 지연 로딩을 활용한 대규모 플러그인 목록의 성능 최적화 구현',
      '사용자 인증 및 권한 관리 시스템 구축으로 보안 설계 역량 강화',
      '플러그인 컨텐츠 버전 관리 시스템 설계 및 구현 경험',
    ],
    futureImprovements: [''],

    // 10. Screenshots
    //    - 주요 화면 캡처
    //    - 설명
    images: [
      {
        url: '/images/projects/project_in_app_plugin/screenshots/in_app_plugin_main.png',
        description: '메인 페이지',
      },
      {
        url: '/images/projects/project_in_app_plugin/screenshots/in_app_plugin_marketplace.png',
        description: '마켓플레이스 페이지',
      },
      {
        url: '/images/projects/project_in_app_plugin/screenshots/in_app_plugin_detail.png',
        description: '플러그인 상세 페이지',
      },
      {
        url: '/images/projects/project_in_app_plugin/screenshots/in_app_plugin_contents2.png',
        description: '컨텐츠 페이지',
      },
      {
        url: '/images/projects/project_in_app_plugin/screenshots/in_app_plugin_saved_plugin.png',
        description: '저장된 플러그인 페이지',
      },
    ],
  },
};
