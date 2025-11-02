import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { IFeedPage, IUseTabs } from "./types";

export const useTabs = create<IUseTabs>()(
  persist(
    // 세션 스토리지 사용을 위한 zustand 미들웨어
    (set) => ({
      activeTab: "topstories",
      setTab: (idx) => set({ activeTab: idx }),
    }),
    {
      name: "tabsStorage",
      storage: createJSONStorage(() => sessionStorage), // 새로고침시에도 상태 유지를 위해 세션 스토리지에 값 저장
    }
  )
);

export const useFeedPage = create<IFeedPage>((set) => ({
  page: 1,
  setPage: (page) => set({ page }),
  resetPage: () => set({ page: 1 }),
}));
