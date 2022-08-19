import { defineStore } from "pinia";
import type ParseResult from "@/model/ParseResult";
import type RootState from "@/store/RootState";

export const useEventsStore = defineStore({
  id: "events",
  state: () =>
    ({
      events: [],
      nodes: [],
    } as RootState),
  getters: {
    isAnalyzed(state: RootState): boolean {
      return state.nodes.length > 0;
    },
    appName(state: RootState): string | undefined {
      if (state.nodes.length > 0) {
        return state.nodes.find((item) => item.key === "0")?.data.tags[0]
          ?.value;
      }
      return undefined;
    },
  },
  actions: {
    insertData(data: ParseResult) {
      this.events = data.events;
      this.nodes = data.nodes;
    },
    clearData() {
      this.events = [];
      this.nodes = [];
    },
  },
});
