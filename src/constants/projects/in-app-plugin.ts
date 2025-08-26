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
    overview:
      '자사 엔지니어링 제품 내부(WebView)에 플러그인 플랫폼을 탑재해 컨텐츠를 배포·관리하고, 검색/권한/버전 체계를 통해 안전하게 실행되도록 한 인앱 생태계',
    achievements: [
      { value: '120+', label: '배포된 플러그인(사내/외부)' },
      { value: '35%', label: '검색 통한 컨텐츠 접근 증가' },
      { value: '40%', label: '운영/배포 시간 절감' },
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
    problemStatement:
      '제품별로 산재된 플러그인과 수동 배포 프로세스로 인해 버전 충돌·권한 오남용·검색 난이도가 높고, 사용자 접근성이 떨어짐',
    solutionApproach:
      '단일 플랫폼에서 플러그인 메타/바이너리를 관리하고, 시맨틱 버전 규칙·권한 검증·검색 인덱싱(OpenSearch)을 도입. 업로드→검증→배포 자동화를 통해 운영 부담을 축소',

    // 4. Key Features
    //    - 주요 기능
    //    - 구현 방식
    features: [
      {
        name: '실행 권한 검증',
        description: '제품이 발급한 API Key 기반의 실행 권한 확인',
        implementation:
          'WebView 메시지 API로 키 전달→서버 검증→허용 범위 내 리소스/실행 토큰 발급 (publish 상태에서만 run 로그 전송)',
      },
      {
        name: '버전/배포 파이프라인',
        description: '시맨틱 버전 규칙·업로드 검증·변경 이력으로 안전한 배포',
        implementation:
          '업로드 단계 버전 규칙 검사, 폼데이터에 productCode/CountryCode/Version 포함, DB에 메타/해시 저장, 롤백 이력 관리',
      },
      {
        name: '로그 수집(뷰/런)',
        description: '뷰/실행 로그를 조건부로 전송하여 품질 지표 확보',
        implementation:
          'publish 상태에서만 전송, mapi 연결 확인 후 window.open 메세지 OK일 때 run API 호출, 의존성 누락 포함 useCallback 정리',
      },
      {
        name: '검색/필터',
        description: 'OpenSearch로 키워드·시맨틱 검색 및 태그/카테고리 필터 제공',
        implementation:
          '메타 스키마 표준화, 색인 파이프라인 구축, 전체/부분 일치 + 의미 기반 검색',
      },
      {
        name: '버전 파싱/매핑·UI 표기',
        description:
          '955 이하 버전 매핑·세부 제품 버전 괄호 표기, productVersion 표기 오류 수정',
        implementation:
          'userAgent 기반 product/version 파서, 매핑 테이블/예외 처리, 잘린 타이틀 말줄임 처리, version width 조정',
      },
      {
        name: '배너/링크 정책',
        description: 'CountryCode에 따른 배너 링크 및 라우팅 제어',
        implementation: '링크 조건분기 로직·의존성 배열 보강, 잘못된 링크 교정',
      },
      {
        name: '로딩/에러 UX',
        description: '스켈레톤·로딩 처리·예외 메시지로 안정성 향상',
        implementation:
          '버전 변경·삭제 동작·무한 스크롤 끝에서의 로딩 숨김, baseUrl/assetPath 미존재 시 예외 처리 및 클립보드 복사',
      },
      {
        name: '빌드/스타일 체인',
        description: 'Tailwind + PostCSS 파이프라인 정비',
        implementation: 'postcss 설정 추가(vite 인식/빌드시 반영), autoprefixer 적용',
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
        description: '리소스 프리로딩·지연 로딩·캐시 정책으로 초기 실행 지연 감소',
      },
      {
        name: '통신 왕복 시간',
        improvement: '45%',
        description: '메시지 API 경량화·페이로드 압축으로 네이티브↔웹 RTT 단축',
      },
      {
        name: '목록 렌더 성능',
        improvement: '50%',
        description: '페이지네이션·가상 스크롤·메모이제이션으로 리스트 렌더 최적화',
      },
    ],

    // 7. Testing
    //    - 테스트 전략
    //    - 커버리지
    testing: [
      {
        name: '권한/버전 유닛 테스트',
        description: '버전 규칙·키 검증 유틸, 업로드 검증 로직 단위 테스트',
        coverage: 70,
      },
      {
        name: '검색 통합 테스트',
        description: '색인→검색→결과 정합성 시나리오 테스트',
        coverage: 50,
      },
    ],

    // 8. Challenges
    //    - 직면한 문제
    //    - 해결 과정
    challenges: [
      {
        problem: 'WebView와 네이티브 간 API 설계 미정·보안 우려',
        solution:
          '메시지 스펙/에러 코드 표준화, 단기 토큰·오리진 검증·속성 서명으로 보안 강화',
      },
      {
        problem: '관리자 권한(superAdmin/admin) 응답 스키마 변경(WGSD-714)',
        solution: '권한 체크 로직 분기·타입 보강, API 응답 필드 구체화 대응',
      },
      {
        problem: '플러그인 메타 스키마 불일치로 검색 품질 저하',
        solution: '필수 필드 표준화, 마이그레이션 스크립트로 일괄 정리, 색인 재생성',
      },
    ],

    // 9. Learnings & Improvements
    //    - 학습한 점
    //    - 향후 개선 사항
    learnings: [
      'WebView↔네이티브 메시지 API 설계/보안 및 로그 파이프라인 구축',
      '시맨틱 버전/매핑·파서 설계와 표기 규칙 수립',
      'OpenSearch 색인/쿼리 튜닝 및 UX 지표 기반 개선 사이클 운영',
      'PostCSS/Tailwind 빌드 체인 구성과 배포 파이프라인 적용',
    ],
    futureImprovements: [
      '플러그인 텔레메트리/AB 테스트로 추천 품질 향상',
      '개발자용 CLI/SDK 제공으로 배포 자동화 강화',
      '워크스페이스 기반 권한·과금 정책 고도화',
    ],

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
        url: '/images/projects/project_in_app_plugin/screenshots/in_app_plugin_contents1.png',
        description: '컨텐츠 페이지 1',
      },
      {
        url: '/images/projects/project_in_app_plugin/screenshots/in_app_plugin_contents2.png',
        description: '컨텐츠 페이지',
      },
      {
        url: '/images/projects/project_in_app_plugin/screenshots/in_app_plugin_saved_plugin.png',
        description: '저장된 플러그인 페이지',
      },
      {
        url: '/images/projects/project_in_app_plugin/screenshots/in_app_plugin_result.png',
        description: '결과 화면',
      },
    ],
  },
};
