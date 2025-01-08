import type { SkillCategory } from "@interfaces/skills";
import { SKILL_LEVELS } from "@constants/skillLevels";

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Frontend",
    description: "웹 프론트엔드 개발 기술",
    skills: [
      {
        name: "React",
        level: SKILL_LEVELS.ADVANCED,
        experience: "4+ years",
        projects: 15,
        expertise: ["Hooks", "Context", "Redux", "Performance Optimization", "Next.js"],
        description: "대규모 웹 애플리케이션 개발 및 성능 최적화 경험",
      },
      // ... 다른 스킬들
    ],
  },
  // ... 다른 카테고리들
];
