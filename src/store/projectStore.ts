import type { ProjectStore } from '@interfaces/project';
import { create } from 'zustand';

export const useProjectStore = create<ProjectStore>((set, get) => ({
  selectedProject: null,
  isDetailOpen: false,
  detailMode: null,
  savedScrollPosition: 0,
  setSelectedProject: (project) => set({ selectedProject: project }),
  openDetail: (mode) => {
    const currentPosition = window.scrollY;
    set({
      isDetailOpen: true,
      detailMode: mode,
      savedScrollPosition: currentPosition,
    });

    // 스크롤 완전 고정
    document.body.style.position = 'fixed';
    document.body.style.top = `-${currentPosition}px`;
    document.body.style.width = '100%';
  },
  closeDetail: () => {
    const { savedScrollPosition } = get();

    // 스크롤 고정 해제
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';

    set({ isDetailOpen: false, detailMode: null });

    // 원래 위치로 즉시 복원 (애니메이션 없이)
    window.scrollTo({
      top: savedScrollPosition,
      behavior: 'instant',
    });

    setTimeout(() => {
      set({ selectedProject: null });
    }, 300);
  },
}));
