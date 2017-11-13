import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [],
  modules: {},
  state: {
    // instance maker
    min: 1,
    max: 10,
    locked: false,
    problemSize: 2,
    preferences: {
      m: [[0, 1], [0, 1]],
      w: [[0, 1], [0, 1]],
    },
    // solver
    unmatched: {
      m: [],
      w: [],
    },
    tentatives: [],
    rejections: [],
    // rejections[i][j] shows if man i has been rejected by woman j
    proposal: { man: -1, woman: -1 },
    solved: false,
    proposalCount: 0,
    message: '',
    messages: {
      empty: () => 'Click to perform the next step of the algorithm',
      propose: (man, woman) => `Man ${man + 1} proposes to Woman ${woman + 1}`,
      accept1: (man, woman) => `Woman ${woman + 1} is not tentatively matched so she accepts Man ${man + 1}'s proposal`,
      accept2: (man, woman, current) => `Woman ${woman + 1} prefers Man ${man + 1} to her current match (Man ${current + 1}), so she accepts`,
      reject: (man, woman, current) => `Woman ${woman + 1} prefers her current match (Man ${current + 1}) so she rejects Man ${man + 1}`,
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
      return (gender, person) => state.preferences[gender][person];
    },
    // end getPreferenceList
    getPreference(state, getters) {
      // E.G. Who is man 3's second choice?
      return (gender, person, choice) => {
        const arr = getters.getPreferenceList(gender, person);
        return arr[choice];
      };
    },
    // end getPreference
    getProposal(state, getters) {
      return (proposingMan) => {
        const list = getters.getPreferenceList('m', proposingMan);
        const rejectedBy = state.rejections[proposingMan];
        let index = 0;
        let woman;
        let rejected = true;
        while (rejected) {
          // Find the next woman on his preference list
          // who has not yet rejected him
          woman = list[index];
          rejected = rejectedBy[woman];
          index++;
        }
        return woman;
      };
    },
    getResponse(state, getters) {
      const herPref = state.preferences.w[state.proposal.woman];
      const currentMatch = getters.getCurrentMatch;
      // she prefers her current match
      if (currentMatch === -1) {
        return true;
      } else if (herPref.indexOf(currentMatch) < herPref.indexOf(state.proposal.man)) {
        return false;
      }
      return true;
    },
    // end getResponse
    getCurrentMatch(state) {
      let currentMatch = -1;
      for (let i = 0; i < state.tentatives.length; i++) {
        // If she is tentatively matched
        if (state.tentatives[i].woman === state.proposal.woman) {
          currentMatch = state.tentatives[i].man;
        }
      } // end for(i)
      return currentMatch;
    },
    // end getCurrentMatch
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
    // end swapPreferenceBoxes
    resetSolver(state) {
      const n = state.problemSize;
      // Remove any tentative matches
      state.tentatives = [];
      // Make every person unmatched
      state.unmatched.m = [];
      state.unmatched.w = [];
      for (let i = 0; i < n; i++) {
        state.unmatched.m.push(i);
        state.unmatched.w.push(i);
      }
      // Remove any previous rejections
      state.rejections = [];
      for (let i = 0; i < n; i++) {
        state.rejections.push([]);
        for (let j = 0; j < n; j++) {
          state.rejections[i].push(false);
        }
      }
    },
    propose(state, payload) {
      const m1 = payload.proposingMan;
      const w1 = payload.proposedToWoman;
      state.proposal.man = m1;
      state.proposal.woman = w1;
      state.message = state.messages.propose(m1, w1);
    },
    acceptProposal(state, payload) {
      const m1 = state.proposal.man;
      const m2 = payload.currentMatch;
      const w1 = state.proposal.woman;
      state.proposalCount++;
      state.tentatives.push(state.proposal);
      if (m2 < 0) {
        // If she wasn't already matched
        state.message = state.messages.accept1(m1, w1);
      } else {
        // If she was already matched, reject the current match
        state.rejections[m2][w1] = true;
        state.message = state.messages.accept2(m1, m2, w1);
      }
      state.tentatives.sort((a, b) => a.man - b.man);
    },
    rejectProposal(state, payload) {
      const m1 = state.proposal.man;
      const m2 = payload.currentMatch;
      const w1 = state.proposal.woman;
      state.proposalCount++;
      state.rejections[m1][w1] = true;
      state.message = state.messages.reject(m1, w1, m2);
      state.proposal.woman = -1;
    },
    breakUp(state, payload) {
      const { man, woman } = { payload };
      let found = false;
      for (let i = 0; i < state.tentatives.length && !found; i++) {
        found = state.tentatives[i].man === man;
        found = found && state.tentatives[i].woman === woman;
        if (found) {
          state.tentatives.splice(i, 1);
        }
        i++;
      }
    },
    addToUnmatched(state, payload) {
      state.unmatched[payload.gender].push(payload.person);
    },
    removeFromUnmatched(state, payload) {
      const { gender, person } = payload;
      const i = state.unmatched[gender].indexOf(person);
      state.unmatched[gender].splice(i, 1);
    },
    proposalFinished(state) {
      state.proposal = { man: -1, woman: -1 };
    },
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
    // end swap
    proposeDispose(context, payload) {
      if (context.getters.solving) {
        // if a proposal has not been made, make one
        const { proposingMan } = payload;
        const proposedToWoman = context.getters.getProposal(proposingMan);
        if (context.state.proposal.woman === -1) {
          context.commit('propose', { proposingMan, proposedToWoman });
        } else {
          const currentMatch = context.getters.getCurrentMatch;
          if (context.getters.getResponse) {
            context.commit('acceptProposal', { currentMatch });
            context.commit('removeFromUnmatched', { gender: 'm', person: proposingMan });
            context.commit('removeFromUnmatched', { gender: 'w', person: proposedToWoman });
            if (currentMatch > -1) {
              context.commit('breakUp', { man: currentMatch, woman: context.proposal.woman });
              context.commit('addToUnmatched', { gender: 'man', person: currentMatch });
            }
            context.commit('proposalFinished');
          } else {
            context.commit('rejectProposal', { currentMatch });
          }
        }
      } // end if(solving)
    },
    // end proposeDispose
  },
});
