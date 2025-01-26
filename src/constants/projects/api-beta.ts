import type { Project } from "@interfaces/project";

export const apiBeta: Project = {
  // Project Card:
  id: "api-beta",
  title: "엔지니어링 제품 API 웹 페이지 & 서버",
  description: "API 서버 구축 및 API 가이드·테스트 페이지",
  image: "/images/projects/project_api_beta/screenshots/api_beta_main.png",
  tech: ["React", "JavaScript", "MUI", "Deno", "Restful API", "Bitbucket", "AWS S3", "AWS EC2"],
  github: "",
  demo: "https://api-beta.midasit.com/public/web",

  // Project Structure:
  details: {
    // 1. Overview & Achievements
    //    - 프로젝트 개요
    //    - 주요 성과 지표 (수치화된 데이터)
    overview: "자사 소프트웨어 엔지니어링 제품의 API 서버 구축 및 API 가이드·테스트 페이지",
    achievements: [
      {
        value: "",
        label: "",
      },
    ],

    // 2. Demo
    //    - 데모 비디오 또는 GIF
    demoGif: "",
    demoVideo: {
      mp4: "",
    },

    // 3. Problem & Solution
    //    - 문제 정의
    //    - 해결 방안
    problemStatement: "",
    solutionApproach: "",

    // 4. Key Features
    //    - 주요 기능
    //    - 구현 방식
    features: [
      {
        name: "API Beta 웹 프로토타입",
        description: "API 테스트 페이지 제공",
        implementation: "JSON Schema 기반 동적 UI 생성",
      },
      {
        name: "자사 소프트웨어 엔지니어링 제품의 API 테스트 페이지 제공",
        description: "자사 소프트웨어 엔지니어링 제품의 API 테스트 페이지 제공",
        implementation: "자사 소프트웨어 엔지니어링 제품의 API 테스트 페이지 제공",
      },
      {
        name: "API 활용한 Plugin 컨텐츠 Beta 페이지 제공",
        description: "API 활용한 Plugin 컨텐츠 Beta 페이지 제공",
        implementation: "API 활용한 Plugin 컨텐츠 Beta 페이지 제공",
      },
      {
        name: "Json Schema to UI 컴포넌트 및 JS 코드 자동 생성",
        description: "스키마 타입 별 컴포넌트 추상화 및 http method 별 코드 추상화",
        implementation: "스키마 타입 별 컴포넌트 추상화 및 http method 별 코드 추상화",
      },
    ],

    // 5. Architecture & Tech Stack
    //    - 시스템 구조
    //    - 기술 스택 및 선택 이유
    architecture: "",
    techStack: [
      {
        category: "Frontend",
        items: [
          {
            name: "React",
            description: "JSON Schema 기반 동적 UI 컴포넌트 생성 및 API 테스트 인터페이스 구현",
          },
          {
            name: "Recoil",
            description: "API 요청/응답 데이터와 사용자 인증 상태의 전역 상태 관리",
          },
          {
            name: "JavaScript",
            description: "API 요청 파라미터 검증 및 동적 코드 생성 로직 구현",
          },
          {
            name: "MUI",
            description: "반응형 레이아웃과 테마 시스템을 활용한 일관된 디자인 구현",
          },
        ],
      },
      {
        category: "Backend",
        items: [
          {
            name: "Deno",
            description: "RESTful API 엔드포인트 구현 및 JWT 기반 사용자 인증 시스템 구축",
          },
          {
            name: "Restful API",
            description: "HTTP 메소드별 API 라우팅 및 응답 처리 로직 설계",
          },
        ],
      },
      {
        category: "Storage",
        items: [
          {
            name: "AWS S3",
            description: "API 테스트 결과 데이터 및 로그 파일 저장소 구축",
          },
          {
            name: "AWS EC2",
            description: "API 서버 호스팅 및 무중단 배포 환경 구성",
          },
          {
            name: "Bitbucket",
            description: "브랜치 전략을 통한 버전 관리 및 배포 자동화",
          },
        ],
      },
    ],

    // 6. Performance
    //    - 성능 개선 사항
    //    - 최적화 결과
    performance: [
      {
        name: "API 응답 처리 속도",
        improvement: "65%",
        description: "응답 데이터 파싱 최적화 및 지연 로딩 적용으로 대용량 데이터 처리 성능 개선",
      },
      {
        name: "테스트 페이지 로딩",
        improvement: "50%",
        description: "동적 UI 생성 로직 최적화 및 컴포넌트 캐싱으로 페이지 로딩 속도 향상",
      },
    ],

    // 7. Testing
    //    - 테스트 전략
    //    - 커버리지
    testing: [
      {
        name: "",
        description: "",
        coverage: 0,
      },
    ],

    // 8. Challenges
    //    - 직면한 문제
    //    - 해결 과정
    challenges: [
      {
        problem: "",
        solution: "",
      },
    ],

    // 9. Learnings & Improvements
    //    - 학습한 점
    //    - 향후 개선 사항
    learnings: [
      "웹 개발 입문 프로젝트로서 프론트엔드와 백엔드 전반적인 개발 경험 습득",
      "JSON Schema를 활용한 동적 UI 생성 및 코드 자동화로 개발 효율성 향상",
      "JWT 기반 인증 시스템 구현을 통한 보안 개념 이해 및 적용",
      "대용량 데이터 처리를 위한 성능 최적화 기법 학습",
      "Restful API 설계 및 구현 경험을 통한   서버 아키텍처 이해",
      "전역 상태 관리의 중요성 인식 및 효율적인 상태 관리 패턴 습득",
      "컴포넌트 상태 관리 및 데이터 흐름 제어 경험",
      "JWT 기반 사용자 인증 시스템 구현 경험",
      "웹 개발 경험이 없는 상황에서 첫 웹 페이지 & 서버 개발 경험",
    ],
    futureImprovements: [
      "API 테스트 페이지 컴포넌트 추상화 및 코드 자동화 강화",
      "API 테스트 페이지 성능 최적화 및 사용자 경험 개선",
    ],

    // 10. Screenshots
    //    - 주요 화면 캡처
    //    - 설명
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
  },
};
