import Vue from 'vue';
import Vuex from 'vuex';
import globals from '../../scripts/globalStoreMethods';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [],
  state: {
    // instance maker
    min: 1,
    max: 10,
    locked: false,
    problemSize: 2,
    solved: false,
    message: '',
    loadMessage: [],
    loadError: false,
    intervals: [],
  },
  getters: {
    editing: globals.editing,
    solving: globals.solving,
    getInterval(state) {
      return (index) => state.intervals[index];
    },
  },
  mutations: {
    lockUnlock: globals.lockUnlock,
    changeProblemSize: globals.changeProblemSize,
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
    }, // end changeInterval
    resetSolver(state, payload) {
      // eslint-disable-next-line
      if (payload) console.log(payload);
    },
  },
  actions: {
    switchMode: globals.switchMode,
    updateProblemSize(context, payload) {
      context.commit('changeProblemSize', payload, { root: true });
    },
  },
});

