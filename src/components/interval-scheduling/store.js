import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [],
  modules: {},
  state: {
    locked: false,
    problemSize: 0,
    intervals: [],
  },
  getters: {
    getInterval(state) {
      return (index) => state.intervals[index];
    },
  },
  mutations: {
    addInterval(state) {
      if (!state.locked) {
        state.intervals.push({ start: 0, end: 1 });
      }
    },
    removeInterval(state, payload) {
      if (!state.locked) {
        state.intervals.splice(payload.index, 1);
      }
    },
    changeInterval(state, payload) {
      if (!state.locked) {
        const toChange = state.intervals[payload.index];
        if (payload.start) {
          toChange.start = payload.start;
        }
        if (payload.end) {
          toChange.end = payload.end;
        }
      }
    },
  },
  actions: {},
});
