import globals from '../../scripts/globalStore';

const mutations = {};
Object.assign(mutations, globals.mutations);

mutations.createInterval = (state, payload) => {
  let start = 0;
  let finish = 1;
  if (payload.start !== undefined && payload.finish !== undefined) {
    start = Math.max(0, payload.start);
    finish = Math.max(1, payload.finish);
  }
  if (!state.locked) {
    state.intervals.push({ start, finish });
    state.intervals.splice(0, 0);
  }
}; // end createInterval
mutations.destroyInterval = (state, payload) => {
  if (!state.locked) {
    state.intervals.splice(payload.index, 1);
  }
}; // end destroyInterval
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

// Override the globalStore method
mutations.changeProblemSize = (state) => {
  state.problemSize = state.intervals.length;
};
export default mutations;
