export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tech: string[];
  github: string;
  demo: string;
  details: {
    overview: string;
    achievements?: {
      value: string;
      label: string;
    }[];
    demoGif?: string;
    demoVideo?: {
      webm?: string;
      mp4?: string;
    };
    problemStatement?: string;
    solutionApproach?: string;
    features: {
      name: string;
      description: string;
      implementation?: string;
    }[];
    architecture?: string;
    performance?: {
      name: string;
      improvement: string;
      description: string;
    }[];
    testing?: {
      name: string;
      description: string;
      coverage?: number;
    }[];
    techStack: Array<{
      category: string;
      items: Array<{
        name: string;
        description: string;
      }>;
    }>;
    images: Array<{
      url: string;
      description?: string;
    }>;
    lessons: string[];
    futureImprovements?: string[];
  };
}

export interface ProjectStore {
  selectedProject: Project | null;
  isDetailOpen: boolean;
  setSelectedProject: (project: Project | null) => void;
  openDetail: () => void;
  closeDetail: () => void;
}
