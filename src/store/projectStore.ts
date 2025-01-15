import type { ProjectStore } from '@interfaces/project';
import { create } from 'zustand';

export const useProjectStore = create<ProjectStore>((set) => ({
  selectedProject: null,
  isDetailOpen: false,
  setSelectedProject: (project) => set({ selectedProject: project }),
  openDetail: () => set({ isDetailOpen: true }),
  closeDetail: () => {
    set({ isDetailOpen: false });
    setTimeout(() => set({ selectedProject: null }), 300);
  },
}));
