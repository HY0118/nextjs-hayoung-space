"use client";

import { create } from "zustand";

export type LandingPurpose = "browse" | "portfolio" | null;

interface LandingState {
  isOpen: boolean;
  purpose: LandingPurpose;
  open: () => void;
  close: () => void;
  choose: (purpose: Exclude<LandingPurpose, null>) => void;
  initialize: () => void;
}

const STORAGE_KEY = "landingChosen";
const STORAGE_AT = "landingChosenAt";
const EXPIRE_MS = 12 * 60 * 60 * 1000; // 12시간

export const useLandingStore = create<LandingState>((set) => ({
  isOpen: true,
  purpose: null,
  open: () => set({ isOpen: true }),
  close: () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(STORAGE_KEY, "true");
      sessionStorage.setItem(STORAGE_AT, Date.now().toString());
    }
    set({ isOpen: false });
  },
  choose: (purpose) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(STORAGE_KEY, "true");
      sessionStorage.setItem(STORAGE_AT, Date.now().toString());
    }
    set({ isOpen: false, purpose });
  },
  initialize: () => {
    if (typeof window === "undefined") return;

    // 쿼리로 강제 표시: /?landing=1
    const url = new URL(window.location.href);
    if (url.searchParams.get("landing") === "1") {
      sessionStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(STORAGE_AT);
      set({ isOpen: true });
      return;
    }

    const chosen = sessionStorage.getItem(STORAGE_KEY) === "true";
    const at = Number(sessionStorage.getItem(STORAGE_AT) || 0);
    const expired = !at || Date.now() - at > EXPIRE_MS;

    set({ isOpen: !(chosen && !expired) });
  },
}));
