import globals from '../../scripts/globalStore';

const mutations = {};
Object.assign(mutations, globals.mutations);

mutations.addInterval = (state) => {
  if (!state.locked) {
    state.intervals.push({ start: 0, end: 1 });
  }
}; // end addInterval
mutations.removeInterval = (state, payload) => {
  if (!state.locked) {
    state.intervals.splice(payload.index, 1);
  }
}; // end removeInterval
mutations.changeInterval = (state, payload) => {
  if (!state.locked) {
    const toChange = state.intervals[payload.index];
    if (payload.start) {
      toChange.start = payload.start;
    }
    if (payload.end) {
      toChange.end = payload.end;
    }
  }
}; // end changeInterval
mutations.resetSolver = (state, payload) => {
  // eslint-disable-next-line
  if (payload) console.log(payload);
};

export default mutations;
