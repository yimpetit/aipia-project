import axios from "axios";
import type { IFeed } from "./types";

// base URL 설정
const api = axios.create({
  baseURL: "https://hacker-news.firebaseio.com/v0",
  headers: {
    "Content-Type": "application/json",
  },
});

export const feedAPI = {
  getFeeds: async (params: { category: string }): Promise<number[]> => {
    const { data } = await api.get("/" + params.category + ".json");
    return data;
  },

  getFeedById: async (id: number): Promise<IFeed> => {
    const { data } = await api.get(`/item/${id}.json`);
    return data;
  },
};
