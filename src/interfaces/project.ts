export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  imageFit?: 'cover' | 'contain';
  tech: string[];
  github?: string;
  npm?: string;
  demo: string;
  details: {
    // 1. Overview & Achievements
    overview: string;
    achievements?: Array<{
      value: string;
      label: string;
    }>;

    // 2. Demo
    demoVideo?: {
      mp4: string;
    };
    demoGif?: string;

    // 3. Problem & Solution
    problemStatement?: string;
    solutionApproach?: string;

    // 4. Key Features
    features: Array<{
      name: string;
      description: string;
      implementation?: string;
    }>;

    // 5. Architecture & Tech Stack
    architecture?: string; // 시스템 구조 이미지 URL
    techStack: Array<{
      category: string;
      items: Array<{
        name: string;
        description: string;
      }>;
    }>;

    // 6. Performance
    performance?: Array<{
      name: string;
      improvement: string;
      description: string;
    }>;

    // 7. Testing
    testing?: Array<{
      name: string;
      description: string;
      coverage?: number;
    }>;

    // 8. Challenges
    challenges?: Array<{
      problem: string;
      solution: string;
    }>;

    // 9. Learnings & Improvements
    learnings: string[];
    futureImprovements?: string[];

    // 10. Screenshots
    images: Array<{
      url: string;
      description?: string;
    }>;
  };
}

export interface ProjectStore {
  selectedProject: Project | null;
  isDetailOpen: boolean;
  setSelectedProject: (project: Project | null) => void;
  openDetail: () => void;
  closeDetail: () => void;
}
