import { create } from "zustand";

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
    features: string[];
    challenges: string[];
    images: string[];
  };
}

interface ProjectStore {
  selectedProject: Project | null;
  isDetailOpen: boolean;
  setSelectedProject: (project: Project | null) => void;
  openDetail: () => void;
  closeDetail: () => void;
}

export const useProjectStore = create<ProjectStore>((set) => ({
  selectedProject: null,
  isDetailOpen: false,
  setSelectedProject: (project) => set({ selectedProject: project }),
  openDetail: () => set({ isDetailOpen: true }),
  closeDetail: () => {
    set({ isDetailOpen: false });
    // 애니메이션이 끝난 후 선택된 프로젝트 초기화
    setTimeout(() => set({ selectedProject: null }), 300);
  },
}));
