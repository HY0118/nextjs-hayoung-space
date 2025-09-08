import { SKILL_LEVELS } from '@constants/skillLevels';

export type SkillLevel = (typeof SKILL_LEVELS)[keyof typeof SKILL_LEVELS];

export interface Skill {
  name: string;
  level: SkillLevel;
  experience: string;
  projects: number;
  expertise: string[];
  description: string;
  version?: string;
}

export interface SkillCategory {
  title: string;
  description?: string;
  skills: Skill[];
}
