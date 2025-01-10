import type { SkillCategory } from "@interfaces/skills";
import { SKILL_LEVELS } from "@constants/skillLevels";

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Frontend",
    description: "웹 프론트엔드 개발 기술",
    skills: [
      {
        name: "JavaScript",
        level: SKILL_LEVELS.EXPERT,
        experience: "4+ years",
        projects: 8,
        expertise: ["ES6+", "DOM", "Async Programming", "Module System"],
        description: "모던 자바스크립트 기반 웹 애플리케이션 개발",
      },
      {
        name: "React",
        level: SKILL_LEVELS.EXPERT,
        experience: "3+ years",
        projects: 7,
        expertise: ["Hooks", "Context", "Component Design", "Performance Optimization"],
        description: "대규모 웹 애플리케이션 및 플러그인 시스템 개발",
      },
      {
        name: "Next.js",
        level: SKILL_LEVELS.ADVANCED,
        experience: "2+ years",
        projects: 5,
        expertise: ["SSR", "Static Generation", "API Routes", "Dynamic Routing"],
        description: "서버사이드 렌더링 및 대규모 웹 애플리케이션 개발",
      },
      {
        name: "TypeScript",
        level: SKILL_LEVELS.EXPERT,
        experience: "3+ years",
        projects: 6,
        expertise: ["Type System", "Interface Design", "TSDoc"],
        description: "타입 안정성이 보장된 엔터프라이즈급 애플리케이션 개발",
      },
      {
        name: "UI Development",
        level: SKILL_LEVELS.ADVANCED,
        experience: "3+ years",
        projects: 5,
        expertise: ["MUI", "Storybook", "Chromatic", "Visual Programming"],
        description: "디자인 시스템 구축 및 시각적 프로그래밍 도구 개발",
      }
    ],
  },
  {
    title: "Backend",
    description: "백엔드 개발 및 API 설계",
    skills: [
      {
        name: "RESTful API",
        level: SKILL_LEVELS.ADVANCED,
        experience: "2+ years",
        projects: 4,
        expertise: ["API Design", "JSON Schema", "Authentication & JWT", "API Documentation"],
        description: "RESTful API 설계 및 구현, 문서화",
      },
      {
        name: "Deno",
        level: SKILL_LEVELS.INTERMEDIATE,
        experience: "1+ year",
        projects: 2,
        expertise: ["Server Development", "API Integration", "Maria DB"],
        description: "Deno 기반 백엔드 서비스 개발",
      }
    ],
  },
  {
    title: "DevOps",
    description: "개발 운영 및 자동화",
    skills: [
      {
        name: "Version Control",
        level: SKILL_LEVELS.ADVANCED,
        experience: "3+ years",
        projects: 8,
        expertise: ["Git", "Bitbucket", "Branch Strategy"],
        description: "대규모 팀 협업을 위한 버전 관리",
      },
      {
        name: "Build & Deploy",
        level: SKILL_LEVELS.INTERMEDIATE,
        experience: "2+ years",
        projects: 3,
        expertise: ["Jenkins", "Bitbucket Pipelines", "SVN", "Fork", "NPM", "Package Management"],
        description: "자동화된 빌드 및 배포 시스템 구축",
      },
      {
        name: "Project Management",
        level: SKILL_LEVELS.ADVANCED,
        experience: "2+ years",
        projects: 5,
        expertise: ["JIRA", "Confluence", "Redmine", "Agile/Scrum"],
        description: "프로젝트 관리 및 팀 협업 도구 활용",
      }
    ],
  },
  {
    title: "Desktop Development",
    description: "데스크톱 애플리케이션 개발",
    skills: [
      {
        name: "Windows Development",
        level: SKILL_LEVELS.INTERMEDIATE,
        experience: "1+ year",
        projects: 3,
        expertise: ["MFC", "Visual Studio", "DICOM", "DCMTK Lib"],
        description: "의료 영상 처리 시스템 및 데스크톱 애플리케이션 개발",
      }
    ],
  }
];
