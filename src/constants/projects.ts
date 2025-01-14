import { Project } from "@/store/projectStore";

export const projects: Project[] = [
  {
    id: "project1",
    title: "Tools (고객 유입 설계 컨텐츠 웹 페이지)",
    description: "무료 설계 컨텐츠(국가별 지진·온도 하중 등) 제공 페이지",
    image: "/images/Project_Thumbnail.webp",
    tech: ["Next.js", "React", "TypeScript", "RJSF", "Framer Motion", "Bitbucket"],
    github: "https://github.com/",
    demo: "https://demo.com",
    details: {
      overview: "프로젝트 상세 설명...",
      demoGif: "/images/projects/project1/demo.gif",
      features: ["주요 기능 1", "주요 기능 2"],
      challenges: [
        {
          problem: "API 응답 결과 파싱 크기가 큰 경우 페이지 로딩 속도 저하 문제",
          solution: "lazy loading 적용으로 기 로딩 시간 단축 및 사용자 경험 개선",
        },
        {
          problem: "컴포넌트 상태 관리 및 데이터 흐름 제어 어려움",
          solution: "전역 상태 관리 라이브러리 Recoil 도입으로 상태 관리 단순화",
        },
      ],
      images: [],
      techStack: [
        {
          category: "Frontend",
          items: [
            {
              name: "React",
              description: "컴포넌트 기반 UI 개발 및 상태 관리",
            },
            {
              name: "TypeScript",
              description: "타입 안정성 확보 및 개발 생산성 향상",
            },
          ],
        },
        {
          category: "State Management",
          items: [
            {
              name: "Zustand",
              description: "간단하고 효적인 전역 상태 관리",
            },
          ],
        },
      ],
      lessons: [
        "TypeScript를 활용한 타입 안정성 확보로 런타임 에러 감소",
        "컴포넌트 재사용성을 고려한 설계로 개발 생산성 향상",
        "사용자 경험을 고려한 UI/UX 디자인 및 구현",
        "성능 최적화를 위한 다양한 기법 적용",
      ],
    },
  },
  {
    id: "project2",
    title: "Flow (설계 컨텐츠 간 연결 실행)",
    description: "단일·복수 설계 컨텐츠를 연결해 통합 모델링을 제공하는 사용자 페이지",
    image: "/images/Project_Thumbnail.webp",
    tech: ["React", "TypeScript", "Next.js"],
    github: "https://github.com/",
    demo: "https://demo.com",
    details: {
      overview: "프로젝트 상세 설명...",
      features: ["주요 기능 1", "주요 기능 2"],
      challenges: [
        {
          problem: "API 응답 결과 파싱 크기가 큰 경우 페이지 로딩 속도 저하 문제",
          solution: "lazy loading 적용으로 기 로딩 시간 단축 및 사용자 경험 개선",
        },
        {
          problem: "컴포넌트 상태 관리 및 데이터 흐름 제어 어려움",
          solution: "전역 상태 관리 라이브러리 Recoil 도입으로 상태 관리 단순화",
        },
      ],
      images: [],
      techStack: [],
      lessons: [],
    },
  },
  {
    id: "project3",
    title: "Playground (Visual Programming)",
    description: "moaUI 컴포넌트를 활용한 드래그앤드롭 UI 제작 페이지 및 React 코드 자동 생성 기능",
    image: "/images/projects/project_playground/screenshots/playground_thumbnail.png",
    tech: ["React", "TypeScript", "Next.js"],
    github: "https://github.com/",
    demo: "https://demo.com",
    details: {
      overview: "프로젝트 상세 설명...",
      features: ["주요 기능 1", "주요 기능 2"],
      challenges: [
        {
          problem: "API 응답 결과 파싱 크기가 큰 경우 페이지 로딩 속도 저하 문제",
          solution: "lazy loading 적용으로 기 로딩 시간 단축 및 사용자 경험 개선",
        },
        {
          problem: "컴포넌트 상태 관리 및 데이터 흐름 제어 어려움",
          solution: "전역 상태 관리 라이브러리 Recoil 도입으로 상태 관리 단순화",
        },
      ],
      images: [],
      techStack: [],
      lessons: [],
    },
  },
  {
    id: "project4",
    title: "moaui 기반 Plugin 개발 CRA 템플릿",
    description: "Plugin 개발 접근성 및 효율성 향상을 위해 moaui 기반 CRA 템플릿을 배포하여 프로젝트 개발 환경 표준화",
    image: "/images/projects/project_cra_template_moaui/screenshots/cra_template_moaui_thumbnail.png",
    tech: ["React", "TypeScript", "Next.js"],
    github: "https://github.com/",
    demo: "https://demo.com",
    details: {
      overview: "프로젝트 상세 설명...",
      features: ["주요 기능 1", "주요 기능 2"],
      challenges: [
        {
          problem: "API 응답 결과 파싱 크기가 큰 경우 페이지 로딩 속도 저하 문제",
          solution: "lazy loading 적용으로 기 로딩 시간 단축 및 사용자 경험 개선",
        },
        {
          problem: "컴포넌트 상태 관리 및 데이터 흐름 제어 어려움",
          solution: "전역 상태 관리 라이브러리 Recoil 도입으로 상태 관리 단순화",
        },
      ],
      images: [],
      techStack: [],
      lessons: [],
    },
  },
  {
    id: "project5",
    title: "moaUI 컴포넌트 & 디자인 시스템",
    description: "자사 소프트웨어 제품 내 Plugin 디자인 시스템 및 컴포넌트 라이브러리",
    image: "/images/projects/project_moaUI/screenshots/moaUI-design-system-thumbnail.png",
    tech: ["React", "TypeScript", "MUI", "NPM", "Storybook", "Chromatic", "Github"],
    github: "https://github.com/midasit-dev/moaui",
    demo: "https://main--6556d17f924e868b000ddaf5.chromatic.com/?path=/docs/components-chip--explore",
    details: {
      overview: "건축/토목 엔지니어링 소프트웨어 내 Plugin 디자인 시스템 및 컴포넌트 라이브러리 제공",
      features: ["주요 기능 1", "주요 기능 2"],
      challenges: [
        {
          problem: "API 응답 결과 파싱 크기가 큰 경우 페이지 로딩 속도 저하 문제",
          solution: "lazy loading 적용으로 기 로딩 시간 단축 및 사용자 경험 개선",
        },
        {
          problem: "컴포넌트 상태 관리 및 데이터 흐름 제어 어려움",
          solution: "전역 상태 관리 라이브러리 Recoil 도입으로 상태 관리 단순화",
        },
      ],
      images: [],
      techStack: [],
      lessons: [],
    },
  },
  {
    id: "project6",
    title: "In App Plugin 플랫폼 & 설계 컨텐츠",
    description: "자사 소프트웨어에 WebView 기반 Plugin 플랫폼 기획·개발 및 컨텐츠",
    image: "/images/projects/project_in_app_plugin/screenshots/in_app_plugin_thumbnail.png",
    tech: ["React", "JavaScript", "MUI", "Pyscript", "Python", "Deno", "MariaDB", "AWS S3 / EC2", "Bitbucket"],
    github: "",
    demo: "https://moa.midasit.com/plugin",
    details: {
      overview: "건축/토목 엔지니어링 소프트웨어 내 웹 기반 플러그인 플랫폼 및 컨텐츠 제공",
      demoVideo: {
        mp4: "/images/projects/project_in_app_plugin/in_app_plugin_demo.mp4",
      },
      features: [
        "플러그인 플랫폼 제공",
        "플러그인 컨텐츠 버전 관리",
        "플러그인 즐겨찾기 저장",
        "플러그인 상세페이지 제공(아이콘, 버전, 설명, 영상)",
        "마켓플레이스 플러그인 검색 및 필터링",
        "마켓플레이스 플러그인 배포 및 공유",
        "React Build 파일 압축 및 업로드 지원",
      ],
      challenges: [
        {
          problem: "복잡한 설계 계산 로직을 빠르게 처리해야 하는 속도 문제",
          solution:
            "데이터 처리에 유용한 Python 함수와 HTML을 Pyscript로 연결 \n Python 함수 매개변수를 input으로 전달하여 복잡한 설계 계산 빠르게 처리",
        },
        {
          problem: "플러그인 컨텐츠 버전 관리",
          solution: "버전 규칙 생성 및 업로드 시 버전 입력 체크, DB에 버전 저장 및 조회",
        },
        {
          problem: "플러그인 실행 권한 검증",
          solution: "Webview 메세지 api 통신으로 제품에서 발급받은 api key 전달 및 검증",
        },
        {
          problem: "플러그인 검색 및 필터링",
          solution: "OpenSearch - KeyWord, Semantic search 도입으로 플러그인 검색 및 필터링",
        },
        {
          problem: "플러그인 리스트 페이지 로딩 속도 저하 문제",
          solution: "pagination 적용으로 페이지 로딩 속도 단축 및 사용자 경험 개선",
        },
      ],
      images: [
        {
          url: "/images/projects/project_in_app_plugin/screenshots/in_app_plugin_main.png",
          description: "메인 페이지",
        },
        {
          url: "/images/projects/project_in_app_plugin/screenshots/in_app_plugin_marketplace.png",
          description: "마켓플레이스 페이지",
        },
        {
          url: "/images/projects/project_in_app_plugin/screenshots/in_app_plugin_detail.png",
          description: "플러그인 상세 페이지",
        },
        {
          url: "/images/projects/project_in_app_plugin/screenshots/in_app_plugin_contents2.png",
          description: "컨텐츠 페이지",
        },
        {
          url: "/images/projects/project_in_app_plugin/screenshots/in_app_plugin_saved_plugin.png",
          description: "저장된 플러그인 페이지",
        },
      ],
      techStack: [
        {
          category: "Frontend",
          items: [
            {
              name: "React",
              description: "컴포넌트 기반 UI 개발 및 상태 관리",
            },
            {
              name: "JavaScript",
              description: "플러그인 플랫폼, 컨텐츠 UI 동작 구현",
            },
            {
              name: "MUI",
              description: "UI 컴포넌트 라이브러리",
            },
            {
              name: "Pyscript, Python",
              description: "Python함수와 UI코드 연동을 통한 객체 전달 및 복잡한 설계 계산 빠르게 처리",
            },
          ],
        },
        {
          category: "Backend",
          items: [
            {
              name: "Deno",
              description: "Node.js 기반 서버 구축",
            },
            {
              name: "MariaDB",
              description: "Plugin 데이터베이스 관리",
            },
          ],
        },
        {
          category: "Storage",
          items: [
            {
              name: "AWS S3",
              description: "플러그인 파일(React Build zip파일) 업로드 및 저장",
            },
            {
              name: "Bitbucket",
              description: "소스 코드 형상 관리 및 배포",
            },
          ],
        },
      ],
      lessons: [
        "WebView와 네이티브 앱 간 메시지 API를 활용한 양방향 통신 구현으로 하이브리드 앱 개발 역량 향상",
        "Pyscript를 활용한 Python/JavaScript 연동으로 복잡한 엔지니어링 계산 처리 최적화 경험",
        "시맨틱 버저닝(Semantic Versioning) 기반의 플러그인 버전 관리 시스템 설계 및 구현",
        "OpenSearch의 KeyWord/Semantic 검색 기능 구현으로 검색 엔진 최적화 및 사용자 경험 개선",
        "AWS S3와 MariaDB를 활용한 플러그인 저장소 설계로 클라우드 인프라 활용 능력 습득",
        "React Build 파일 압축 및 업로드 기능 구현으로 formData 형식의 파일 전송&저장 경험",
        "페이지네이션과 지연 로딩을 활용한 대규모 플러그인 목록의 성능 최적화 구현",
        "사용자 인증 및 권한 관리 시스템 구축으로 보안 설계 역량 강화",
      ],
    },
  },
  {
    id: "project7",
    title: "엔지니어링 제품 API 웹 페이지 & 서버",
    description: "API 서버 구축 및 API 가이드·테스트 페이지",
    image: "/images/projects/project_api_beta/screenshots/api_beta_main.png",
    tech: ["React", "JavaScript", "MUI", "Deno", "Restful API", "Bitbucket", "AWS S3", "AWS EC2"],
    github: "",
    demo: "https://api-beta.midasit.com/public/web",
    details: {
      overview: "자사 소프트웨어 엔지니어링 제품의 API 서버 구축 및 API 가이드·테스트 페이지",
      features: [
        "API Beta 웹 프로토타입 페이지 제공",
        "자사 소프트웨어 엔지니어링 제품의 API 테스트 페이지 제공",
        "API 활용한 Plugin 컨텐츠 Beta 페이지 제공",
      ],
      challenges: [
        {
          problem: "Json Schema to UI 컴포넌트 및 JS 코드 자동 생성",
          solution: "스키마 타입 별 컴포넌트 추상화 및 http method 별 코드 추상화",
        },
        {
          problem: "API 응답 결과 파싱 크기가 큰 경우 페이지 로딩 속도 저하 문제",
          solution: "lazy loading 적용으로 초기 로딩 시간 단축 및 사용자 경험 개선",
        },
        {
          problem: "컴포넌트 상태 관리 및및 데이터 흐름 제어 어려움",
          solution: "전역 상태 관리 라이브러리 Recoil 도입으로 상태 관리 단순화",
        },
        {
          problem: "제품 사용자 인증 기반 API 테스트 동작 제한",
          solution: "JWT 토큰 기반 사용자 인증 토큰 발급 및 검증",
        },
        {
          problem: "웹 개발 경험이 없는 상황에서 첫 웹 페이지 & 서버 개발",
          solution: "웹 기반 서비스 개발 경험 확보",
        },
      ],
      images: [
        {
          url: "/images/projects/project_api_beta/screenshots/api_beta_guide.png",
          description: "API 가이드 페이지",
        },
        {
          url: "/images/projects/project_api_beta/screenshots/api_beta_plugin.png",
          description: "API Plugin 리스트 페이지",
        },
      ],
      techStack: [
        {
          category: "Frontend",
          items: [
            {
              name: "React",
              description: "컴포넌트 기반 UI 개발 및 상태 관리",
            },
            {
              name: "Recoil",
              description: "전역 상태 관리 라이브러리",
            },
            {
              name: "JavaScript",
              description: "웹 기반 컴포넌트 동작 구현",
            },
            {
              name: "MUI",
              description: "UI 컴포넌트 라이브러리",
            },
          ],
        },
        {
          category: "Backend",
          items: [
            {
              name: "Deno",
              description: "Node.js 기반 API 서버 구축, JWT 토큰 기반 인증 토큰 발급 및 검증",
            },
            {
              name: "Restful API",
              description: "Restful API 라우팅, 비지니스 로직 구현 및 응답 처리",
            },
          ],
        },
        {
          category: "Storage",
          items: [
            {
              name: "AWS S3",
              description: "API 데이터 저장 및 관리",
            },
            {
              name: "Bitbucket",
              description: "소스 코드 형상 관리 및 배포",
            },
          ],
        },
      ],
      lessons: [
        "웹 개발 입문 프로젝트로서 프론트엔드와 백엔드 전반적인 개발 경험 습득",
        "JSON Schema를 활용한 동적 UI 생성 및 코드 자동화로 개발 효율성 향상",
        "JWT 기반 인증 시스템 구현을 통한 보안 개념 이해 및 적용",
        "대용량 데이터 처리를 위한 성능 최적화 기법 학습",
        "Restful API 설계 및 구현 경험을 통한   서버 아키텍처 이해",
        "전역 상태 관리의 중요성 인식 및 효율적인 상태 관리 패턴 습득",
      ],
    },
  },
];
