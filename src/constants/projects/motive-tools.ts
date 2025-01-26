import type { Project } from "@interfaces/project";

export const motiveTools: Project = {
  // Project Card:
  id: "motive-tools",
  title: "Tools (고객 유입 설계 컨텐츠 페이지)",
  description: "무료 설계 컨텐츠 제공 페이지 \n - 국가별 지진·온도 하중 등 설계 컨텐츠 제공",
  image: "/images/projects/project_tools/screenshots/tools_thumbnail.png",
  tech: ["Next.js", "React", "TypeScript", "RJSF", "Zustand", "Framer Motion", "Bitbucket"],
  github: "",
  demo: "https://tools.midasuser.com/ko",

  // Project Structure:
  details: {
    // 1. Overview & Achievements
    //    - 프로젝트 개요
    //    - 주요 성과 지표 (수치화된 데이터)
    overview:
      "MIDAS Tools는 엔지니어들을 위한 설계 참고 컨텐츠로, 신뢰할 수 있는 설계 기준과 인터랙티브 도구를 갖춘 무료 웹 기반 툴킷입니다.",
    achievements: [
      {
        value: "100,000+",
        label: "사용자 수",
      },
    ],

    // 2. Demo
    //    - 데모 비디오 또는 GIF
    demoGif: "",
    demoVideo: {
      mp4: "/images/projects/project_tools/tools_demo.mp4",
    },

    // 3. Problem & Solution
    //    - 문제 정의
    //    - 해결 방안
    problemStatement: "신규 고객 유입 수가 정체됨과 동시에 기존 고객 유지 비용이 증가하고 있음",
    solutionApproach: "설계 컨텐츠 제공을 통한 고객 유지 및 신규 고객 유입 증대",

    // 4. Key Features
    //    - 주요 기능
    //    - 구현 방식
    features: [
      {
        name: "국가별 지진·온도 하중 등 설계 컨텐츠 제공",
        description: "설계 기준에 필요한 국가별 지진·온도 하중 등 설계 컨텐츠",
        implementation:
          "설계 기준에 필요한 국가별 지진·온도 하중 등 설계 컨텐츠를 제공하여 고객 유지 및 신규 고객 유입 증대",
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
        name: "설계 계산 처리 속도",
        improvement: "70%",
        description: "Python 기반 설계 계산 엔진 도입으로 복잡한 설계 계산 처리 속도 개선",
      },
      {
        name: "페이지 로딩 시간",
        improvement: "50%",
        description: "컴포넌트 레이지 로딩과 이미지 최적화로 초기 로딩 시간 단축",
      },
    ],

    // 7. Testing
    //    - 테스트 전략
    //    - 커버리지
    testing: [
      {
        name: "카드 페이지 렌더링",
        description: "카드 페이지 렌더링 테스트",
        coverage: 90,
      },
    ],

    // 8. Challenges
    //    - 직면한 문제
    //    - 해결 과정
    challenges: [
      {
        problem: "monorepo 환경에서 tools 프로젝트 개발 시 빌드 속도 저하",
        solution: "build 속도 개선을 위한 빌드 파이프라인 최적화",
      },
    ],
    // 9. Learnings & Improvements
    //    - 학습한 점
    //    - 향후 개선 사항
    learnings: [
      "TypeScript를 활용한 타입 안정성 확보로 런타임 에러 감소",
      "컴포넌트 재사용성을 고려한 설계로 개발 생산성 향상",
      "사용자 경험을 고려한 UI/UX 디자인 및 구현",
      "성능 최적화를 위한 다양한 기법 적용",
    ],
    futureImprovements: [
      "설계 계산 엔진 최적화 및 확장성 향상",
      "다국어 지원 및 현지화 기능 추가",
      "사용자 피드백 수집 및 분석을 통한 기능 개선",
    ],
    // 10. Screenshots
    //    - 주요 화면 캡처
    //    - 설명
    images: [
      {
        url: "/images/projects/project_tools/screenshots/tools_main.png",
        description: "메인 페이지",
      },
      {
        url: "/images/projects/project_tools/screenshots/tools_design_tool.png",
        description: "Design Tool - Fundamental Basic Wind Velocity Map",
      },
      {
        url: "/images/projects/project_tools/screenshots/tools_design_tool2.png",
        description: "Design Tool - Concrete Material Suite for Eurocode",
      },
      {
        url: "/images/projects/project_tools/screenshots/tools_desing_guide.png",
        description: "Design guide - Peak Velocity Pressure for Wind and Traffic Leading Combinations",
      },
      {
        url: "/images/projects/project_tools/screenshots/tools_desing_guide2.png",
        description: "Design guide - Range of uniform bridge temperature component",
      },
    ],
  },
};
