import ParseResult from "@/model/ParseResult";
import { createStore } from "vuex";
import RootState from "./RootState";

export default createStore({
  state() {
    return {
      events: [],
      nodes: [],
    };
  },
  mutations: {
    insertData(state: RootState, data: ParseResult) {
      state.events = data.events;
      state.nodes = data.nodes;
    },
  },
  actions: {},
  getters: {
    events(state: RootState) {
      return state.events;
    },
    nodes(state: RootState) {
      return state.nodes;
    },
    isAnalyzed(state: RootState): boolean {
      return state.nodes.length > 0;
    }
  },
  modules: {},
});
