import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface GlobalStore {
  currentSection: string;
  setCurrentSection: (section: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const globalStore = create<GlobalStore>()(
  devtools(
    persist(
      (set) => ({
        currentSection: "section1",
        setCurrentSection: (section: string) =>
          set({ currentSection: section }),
        loading: false,
        setLoading: (loading: boolean) => set({ loading: loading }),
      }),
      {
        name: "bear-storage",
      }
    )
  )
);
