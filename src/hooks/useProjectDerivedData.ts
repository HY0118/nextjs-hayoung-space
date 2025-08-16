import type { Project } from '@interfaces/project';

import { PROJECT_DETAIL_CONFIG } from '@/constants/projectDetailConfig';

export const useProjectDerivedData = (project: Project | null) => {
  const { limits } = PROJECT_DETAIL_CONFIG;
  const achievements = project?.details.achievements?.slice(0, limits.achievements) ?? [];
  const features = project?.details.features.slice(0, limits.features) ?? [];
  const performance = (project?.details.performance ?? []).slice(0, limits.performance);
  const learnings = project?.details.learnings.slice(0, limits.learnings) ?? [];
  const futureImprovements = (project?.details.futureImprovements ?? []).slice(
    0,
    limits.futureImprovements,
  );
  const screenshots = project?.details.images.slice(0, limits.screenshots) ?? [];
  const hasVideoOrGif = Boolean(
    project?.details.demoVideo?.mp4 || project?.details.demoGif,
  );

  return {
    achievements,
    features,
    performance,
    learnings,
    futureImprovements,
    screenshots,
    hasVideoOrGif,
  };
};
