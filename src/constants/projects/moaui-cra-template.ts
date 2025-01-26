import type { Project } from "@interfaces/project";

export const moauiCRATemplate: Project = {
  // Project Card:
  id: "moaui-cra-template",
  title: "moaui 기반 Plugin 개발 CRA 템플릿",
  description: "Plugin 개발 접근성 및 효율성 향상을 위해 moaui 기반 CRA 템플릿을 배포하여 프로젝트 개발 환경 표준화",
  image: "/images/projects/project_cra_template_moaui/screenshots/cra_template_moaui_thumbnail.png",
  tech: ["React", "TypeScript", "Next.js"],
  github: "https://github.com/",
  demo: "https://demo.com",

  // Project Structure:
  details: {
    // 1. Overview & Achievements
    //    - 프로젝트 개요
    //    - 주요 성과 지표 (수치화된 데이터)
    overview: "프로젝트 상세 설명...",
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
        name: "",
        description: "",
        implementation: "",
      },
    ],

    // 5. Architecture & Tech Stack
    //    - 시스템 구조
    //    - 기술 스택 및 선택 이유
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

    // 6. Performance
    //    - 성능 개선 사항
    //    - 최적화 결과
    performance: [
      {
        name: "워크플로우 실행 속도",
        improvement: "65%",
        description: "병렬 처리 및 캐싱 전략 도입으로 복수 설계 컨텐츠 연결 실행 속도 개선",
      },
      {
        name: "메모리 사용량",
        improvement: "40%",
        description: "대규모 모델링 데이터 처리 시 메모리 관리 최적화",
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
    learnings: [""],
    futureImprovements: [""],

    // 10. Screenshots
    //    - 주요 화면 캡처
    //    - 설명
    images: [
      {
        url: "/images/projects/project_cra_template_moaui/screenshots/cra_template_moaui_npm.png",
        description: "create-template-moaui - npm package 페이지",
      },
      {
        url: "/images/projects/project_cra_template_moaui/screenshots/cra_template_moaui_github.png",
        description: "create-template-moaui - github 페이지",
      },
      {
        url: "/images/projects/project_cra_template_moaui/screenshots/cra_template_moaui_light.png",
        description: "standard ver / light ver",
      },
    ],
  },
};
