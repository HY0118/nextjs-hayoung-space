import { create } from "zustand";

interface IntroStore {
  isIntroComplete: boolean;
  setIntroComplete: (value: boolean) => void;
  initializeIntroState: () => void;
}

export const useIntroStore = create<IntroStore>((set) => ({
  isIntroComplete: true,
  setIntroComplete: (value) => set({ isIntroComplete: value }),
  initializeIntroState: () => {
    // URL에 해시가 없으면 인트로를 보여주도록 상태 설정
    const shouldShowIntro = window.location.hash === "";
    set({ isIntroComplete: !shouldShowIntro });
  },
}));
