import Vue from 'vue';
import globals from '../../scripts/globalStore';

const mutations = {};
Object.assign(mutations, globals.mutations);
// end changeProblemSize
mutations.checkNumRows = (state, payload) => {
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
}; // end checkNumRows
mutations.checkPreferenceRow = (state, payload) => {
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
}; // end checkPreferenceRow
mutations.swapPreferenceBoxes = (state, payload) => {
  // eslint-disable-next-line
  const { gender, person, pref1, pref2 } = payload;
  const arr = state.preferences[gender][person];
  const temp = arr[pref1];
  arr[pref1] = arr[pref2];
  arr.splice(pref2, 1, temp);
}; // end swapPreferenceBoxes
mutations.propose = (state, payload) => {
  const m1 = payload.proposingMan;
  const w1 = payload.proposedToWoman;
  state.proposal.man = m1;
  state.proposal.woman = w1;
  state.message = state.messages.propose(m1, w1);
};
mutations.acceptProposal = (state, payload) => {
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
    Vue.set(state.rejections[m2], w1, true);
    state.message = state.messages.accept2(m1, m2, w1);
  }
  state.tentatives.sort((a, b) => a.man - b.man);
};
mutations.rejectProposal = (state, payload) => {
  const m1 = state.proposal.man;
  const m2 = payload.currentMatch;
  const w1 = state.proposal.woman;
  state.proposalCount++;
  Vue.set(state.rejections[m1], w1, true);
  state.message = state.messages.reject(m1, w1, m2);
  state.proposal.woman = -1;
};
mutations.breakUp = (state, payload) => {
  const { man, woman } = payload;
  const { tentatives } = state;
  // eslint-disable-next-line
  state.tentatives = tentatives.filter((value) => {
    return !(value.man === man && value.woman === woman);
  });
};
mutations.addToUnmatched = (state, payload) => {
  state.unmatched[payload.gender].push(payload.person);
};
mutations.removeFromUnmatched = (state, payload) => {
  // remove a person from the unmatched list (if found)
  const { gender, person } = payload;
  const i = state.unmatched[gender].indexOf(person);
  if (i > -1) {
    state.unmatched[gender].splice(i, 1);
  }
};
mutations.proposalFinished = (state) => {
  state.proposal = { man: -1, woman: -1 };
};
mutations.resetSolver = (state) => {
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
  // Remove the most recent proposal
  state.proposal = { man: -1, woman: -1 };
  state.message = state.messages.empty();
  state.proposalCount = 0;
  state.solved = false;
};
mutations.problemSolved = (state) => {
  state.solved = true;
  state.message = state.messages.solved();
};
mutations.loadPrefs = (state, payload) => {
  state.preferences = payload.pref;
  state.loadError = false;
  state.loadMessage.push('Successfully Loaded File!');
};
mutations.addLoadMessage = (state, payload) => {
  state.loadMessage.push(payload.msg);
  if (payload.err) {
    state.loadError = true;
  }
};
mutations.loadStart = (state) => {
  state.loadMessage = [];
  state.loadError = false;
};

export default mutations;
