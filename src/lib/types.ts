export interface IFeedItem {
  id: number;
}

export interface IUseTabs {
  activeTab: string;
  setTab: (state: string) => void;
}

export interface IFeedPage {
  page: number;
  setPage: (page: number) => void;
  resetPage: () => void;
}

export interface IFeed {
  // 피드 아이템 인터페이스 정의
  by: string;
  descendants: number;
  id: number;
  kids?: number[];
  score: number;
  time: number;
  title: string;
  type: "story" | "comment" | "job" | "poll" | "pollopt";
  url?: string;
}

export interface IMoreButton {
  onMore: () => void;
}
