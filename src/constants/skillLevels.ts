export const SKILL_LEVELS = {
  MASTER: "Master",
  EXPERT: "Expert",
  ADVANCED: "Advanced",
  INTERMEDIATE: "Intermediate",
  BEGINNER: "Beginner",
} as const;

export const SKILL_LEVEL_STYLES = {
  [SKILL_LEVELS.MASTER]: "bg-purple-600 text-white",
  [SKILL_LEVELS.EXPERT]: "bg-blue-600 text-white",
  [SKILL_LEVELS.ADVANCED]: "bg-emerald-500 text-white",
  [SKILL_LEVELS.INTERMEDIATE]: "bg-amber-500 text-white",
  [SKILL_LEVELS.BEGINNER]: "bg-gray-500 text-white",
} as const;
