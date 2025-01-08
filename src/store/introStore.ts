import { create } from "zustand";

interface IntroStore {
  isIntroComplete: boolean;
  setIntroComplete: (value: boolean) => void;
}

export const useIntroStore = create<IntroStore>((set) => ({
  isIntroComplete: false,
  setIntroComplete: (value) => set({ isIntroComplete: value }),
})); 