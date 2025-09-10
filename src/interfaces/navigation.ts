export type SectionId = 'about' | 'skills' | 'projects' | 'issues' | 'contact';

export const SECTIONS: readonly SectionId[] = [
  'about',
  'skills',
  'projects',
  'issues',
  'contact',
] as const;
