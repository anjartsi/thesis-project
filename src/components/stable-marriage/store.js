import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [],
  modules: {},
  state: {
    min: 1,
    max: 10,
    locked: false,
    problemSize: 2,
    preferences: {
      m: [[0, 1], [0, 1]],
      w: [[0, 1], [0, 1]],
    },
  },
  getters: {
    editing(state) {
      return !state.locked;
    },
    solving(state) {
      return state.locked;
    },
    getPreferenceList(state) {
      // E.G. Get the preference list of man 3
      return (gender, person) => {
        console.log(state.preferences.gender[person]);
        return state.preferences[gender][person];
      };
    },
    getPreference(state, getters) {
      // E.G. Who is man 3's second choice?
      return (gender, person, choice) => {
        const arr = getters.getPreferenceList(gender, person);
        return arr[choice];
      };
    },
  },
  // end getters
  mutations: {
    lockUnlock(state) {
      state.locked = !state.locked;
    },
    changeProblemSize(state, payload) {
      let { n } = payload;
      const { max, min } = state;
      n = Math.min(max, n);
      n = Math.max(min, n);
      state.problemSize = n;
      return n;
    },
    // end changeProblemSize
    checkNumRows(state, payload) {
      // Check to see that an array has exactly n arrays
      // If there are too many remove them from the end
      // If there are not enough, add empty arrays at the end
      const { arr } = payload;
      const n = state.problemSize;
      if (arr.length < n) {
        for (let i = arr.length; i < n; i++) {
          arr.push([]);
        }
      } else if (arr.length > n) {
        arr.splice(n);
      }
    },
    // end checkNumRows
    checkPreferenceRow(state, payload) {
      // Check to see that an array has exactly n numbers between [1, n]
      // If any numbers are too large, remove them
      // If there are too few numbers, add them
      const { arr } = payload;
      const n = state.problemSize;
      if (arr.length < n) {
        for (let i = arr.length; i < n; i++) {
          arr.push(i);
        }
      } else if (arr.length > n) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i] >= n) {
            arr.splice(i, 1);
            i--;
          }
        }
      }
    },
    // end checkPreferenceRow
    swapPreferenceBoxes(state, payload) {
      // eslint-disable-next-line
      const { gender, person, pref1, pref2 } = payload;
      const arr = state.preferences[gender][person];
      const temp = arr[pref1];
      arr[pref1] = arr[pref2];
      arr.splice(pref2, 1, temp);
    },
    // end swap
  },
  // end mutations
  actions: {
    updateProblemSize(context, payload) {
      if (context.getters.editing) {
        context.commit('changeProblemSize', payload);

        const listM = context.state.preferences.m;
        const listW = context.state.preferences.w;
        context.commit('checkNumRows', { arr: listM });
        context.commit('checkNumRows', { arr: listW });
        for (let i = 0; i < context.state.problemSize; i++) {
          context.commit('checkPreferenceRow', { arr: listM[i] });
          context.commit('checkPreferenceRow', { arr: listW[i] });
        }
      }
    },
    // end updateProblemSize
    swap(context, payload) {
      if (context.getters.editing) {
        context.commit('swapPreferenceBoxes', payload);
      }
    },
  },
});
