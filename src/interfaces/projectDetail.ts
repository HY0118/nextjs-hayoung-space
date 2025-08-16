import type { Project } from "@interfaces/project";
import type { ReactNode } from "react";

export type MediaTab = "screenshots" | "video";

export interface Achievement {
  value: string;
  label: string;
}

export interface FeatureSummary {
  name: string;
  description: string;
}

export interface PerformanceMetric {
  name: string;
  improvement: string;
  description: string;
}

export interface ProjectImage {
  url: string;
  description?: string;
}

export interface SelectedImage extends ProjectImage {
  index: number;
}

export interface OverviewProps {
  text: string;
}

export interface AchievementsProps {
  items: Achievement[];
}

export interface TechChipsProps {
  tech: string[];
}

export interface KeyFeaturesProps {
  features: FeatureSummary[];
}

export interface DemoMediaProps {
  project: Project;
}

export interface MediaTabsProps {
  project: Project;
  screenshots: ProjectImage[];
  hasVideoOrGif: boolean;
  activeTab: MediaTab;
  onChangeTab: (tab: MediaTab) => void;
  onOpenViewer: (index: number) => void;
  onPreload: (url: string) => void;
}

export interface ScreenshotGridProps {
  screenshots: ProjectImage[];
  onOpenViewer: (index: number) => void;
  onPreload: (url: string) => void;
}

export interface DividerToggleProps {
  expanded: boolean;
  onToggle: () => void;
}

export interface OptionalDetailsProps {
  problemStatement?: string;
  solutionApproach?: string;
  performance: PerformanceMetric[];
  architecture?: string;
  learnings: string[];
  futureImprovements: string[];
}

export interface ImageViewerModalProps {
  images: ProjectImage[];
  initialIndex: number;
  onClose: () => void;
}

export interface DetailShellProps {
  header: ReactNode;
  marginTop?: string | number;
  children: ReactNode;
  className?: string;
  backgroundClassName?: string; // ex) "bg-white dark:bg-background"
  borderClassName?: string; // ex) "border-l border-border"
  headerPaddingClassName?: string; // ex) "px-8 py-6"
  contentPaddingClassName?: string; // ex) "px-8 py-12"
  maxWidthClassName?: string; // ex) "max-w-7xl"
}


