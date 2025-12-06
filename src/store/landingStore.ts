'use client';

import { create } from 'zustand';

export type LandingPurpose = 'browse' | 'portfolio' | null;

interface LandingState {
  isOpen: boolean;
  purpose: LandingPurpose;
  open: () => void;
  close: () => void;
  choose: (purpose: Exclude<LandingPurpose, null>) => void;
  initialize: () => void;
}

const STORAGE_KEY = 'landingChosen';
const STORAGE_AT = 'landingChosenAt';
const EXPIRE_MS = 12 * 60 * 60 * 1000; // 12시간

export const useLandingStore = create<LandingState>((set) => ({
  isOpen: true,
  purpose: null,
  open: () => set({ isOpen: true }),
  close: () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(STORAGE_KEY, 'true');
      sessionStorage.setItem(STORAGE_AT, Date.now().toString());
    }
    set({ isOpen: false });
  },
  choose: (purpose) => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(STORAGE_KEY, 'true');
      sessionStorage.setItem(STORAGE_AT, Date.now().toString());
    }
    set({ isOpen: false, purpose });
  },
  initialize: () => {
    if (typeof window === 'undefined') return;

    const url = new URL(window.location.href);

    // 루트 경로인지 확인 (/, /ko/, /en/ 등)
    const pathname = url.pathname;
    const isRootPath = pathname === '/' || /^\/[a-z]{2}\/?$/.test(pathname);

    // 해시에 경로가 포함되어 있는지 확인 (#projects/motive-flow, #technical-issues/1 등)
    const hash = url.hash.slice(1); // # 제거
    const hasDetailPath = hash.includes('/');

    // 루트 경로가 아니거나, 해시에 경로가 포함된 경우 랜딩 페이지를 표시하지 않음
    if (!isRootPath || hasDetailPath) {
      set({ isOpen: false });
      return;
    }

    // 쿼리로 강제 표시: /?landing=1
    if (url.searchParams.get('landing') === '1') {
      sessionStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(STORAGE_AT);
      set({ isOpen: true });
      return;
    }

    const chosen = sessionStorage.getItem(STORAGE_KEY) === 'true';
    const at = Number(sessionStorage.getItem(STORAGE_AT) || 0);
    const expired = !at || Date.now() - at > EXPIRE_MS;

    set({ isOpen: !(chosen && !expired) });
  },
}));
