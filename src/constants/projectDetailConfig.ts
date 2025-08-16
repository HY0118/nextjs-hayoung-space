import type { MediaTab } from "@interfaces/projectDetail";

export const PROJECT_DETAIL_CONFIG = {
  limits: {
    achievements: 3,
    features: 3,
    performance: 3,
    learnings: 3,
    futureImprovements: 3,
    screenshots: 6,
  },
  preload: {
    screenshotsCount: 2,
  },
  media: {
    defaultActiveTab: "screenshots" as MediaTab,
  },
  layout: {
    marginTop: "73px",
    backgroundClassName: "bg-white dark:bg-background",
    headerPaddingClassName: "px-8 py-6",
    contentPaddingClassName: "px-8 py-12",
    maxWidthClassName: "max-w-7xl",
  },
} as const;


