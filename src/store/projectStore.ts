import type { ProjectStore } from '@interfaces/project';
import { create } from 'zustand';

export const useProjectStore = create<ProjectStore>((set) => ({
  selectedProject: null,
  isDetailOpen: false,
  detailMode: null,
  setSelectedProject: (project) => set({ selectedProject: project }),
  openDetail: (mode) => set({ isDetailOpen: true, detailMode: mode }),
  closeDetail: () => {
    set({ isDetailOpen: false, detailMode: null });
    setTimeout(() => set({ selectedProject: null }), 300);
  },
}));
