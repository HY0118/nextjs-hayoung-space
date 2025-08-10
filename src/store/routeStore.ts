import { create } from "zustand";

interface RouteStoreState {
  isNavigating: boolean;
  start: () => void;
  stop: () => void;
}

export const useRouteStore = create<RouteStoreState>((set) => ({
  isNavigating: false,
  start: () => set({ isNavigating: true }),
  stop: () => set({ isNavigating: false }),
}));


