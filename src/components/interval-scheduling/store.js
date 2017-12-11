import Vue from 'vue';
import Vuex from 'vuex';
// import state from './store-state';
// import getters from './store-getters';
// import mutations from './store-mutations';
// import actions from './store-actions';
import globals from '../../scripts/globalStore';

Vue.use(Vuex);

const plugins = [];
const modules = {};

/* ****************************************************************
STATE
**************************************************************** */
const storeState = {};
// copy the global state values into state
Object.assign(storeState, globals.state);
// Add state variables below
// instance maker
storeState.min = 0;
storeState.max = 20;
// an interval looks like this: {start, finish, row}
storeState.intervals = [
  { start: 3, finish: 5, row: 0 },
  { start: 0, finish: 2, row: 1 },
  { start: 0, finish: 3, row: 0 },
];
storeState.rows = [
  [0, 2],
  [1],
];
//  [[0, 2], [1]];
storeState.problemSize = 3;
storeState.earliestTime = 0;
storeState.latestTime = 20;

/* ****************************************************************
GETTERS
**************************************************************** */
const storeGetters = {};
Object.assign(storeGetters, globals.getters);

storeGetters.getInterval = (state) => (index) => {
  if (index < state.intervals.length) {
    return state.intervals[index];
  }
  return -1;
};
storeGetters.getCollision = (state) => (i, j) => {
  let collide = false;
  const a = state.intervals[i];
  const b = state.intervals[j];
  if (a.start <= b.start) {
    // If a starts before b
    // and b starts before a is finished
    if (b.start < a.finish) { collide = true; }
  } else if (a.start < b.finish) {
    // if b starts first
    // and a starts before b is finished
    collide = true;
  }

  return collide;
};
storeGetters.fitsInRow = (state, getters) => (intervalIndex, rowIndex) => {
  let conflict = false;
  let collision;
  const { rows } = state;
  // If that row didn't exist, then it must fit
  if (rowIndex >= rows.length) { return true; }
  const arr = rows[rowIndex];
  for (let i = 0; i < arr.length; i++) {
    // don't check an interval with itself
    if (arr[i] !== intervalIndex) {
      collision = getters.getCollision(intervalIndex, arr[i]);
      conflict = conflict || collision;
    }
  }

  return !conflict;
};
// returns the number of the lowest row where an interval is to be placed
// This means a new row has to be created
storeGetters.getRowThatFits = (state, getters) => (index) => {
  let rowNum = 0;
  let found = false;

  while (!found) {
    if (getters.fitsInRow(index, rowNum)) {
      found = true;
      break;
    } else {
      rowNum++;
    }
  } // end while
  return rowNum;
};

/* ****************************************************************
MUTATIONS
**************************************************************** */

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
  }
}; // end createInterval
mutations.destroyInterval = (state, { row, index }) => {
  const rowIndex = state.rows[row].indexOf(index);
  if (!state.locked) {
    state.intervals.splice(index, 1);
    state.rows[row].splice(rowIndex, 1);
  }
  let ind;
  for (let i = 0; i < state.rows.length; i++) {
    for (let j = 0; j < state.rows[i].length; j++) {
      ind = state.rows[i][j];
      if (ind > index) {
        // decrement the index to reflect its new value
        // Need to use splice so that vue updates the elements
        state.rows[i].splice(j, 1, ind - 1);
      }
    }
  }
  // eslint-disable-next-line
  console.log(state.rows);
  // eslint-disable-next-line
  console.log(state.intervals);
}; // end destroyInterval
mutations.changeInterval = (state, { index, start, finish }) => {
  // don't forget to check rows after calling this mutation
  if (!state.locked) {
    const toChange = state.intervals[index];
    if (start !== undefined) {
      toChange.start = start;
    }
    if (finish !== undefined) {
      toChange.end = finish;
    }
  }
}; // end changeInterval
mutations.createNewRow = (state) => {
  state.rows.push([]);
};
mutations.addIntervalToRow = (state, { index, row }) => {
  state.rows[row].push(index);
  state.intervals[index].row = row;
};
// Todo - this method needs a body
mutations.resetSolver = (state, payload) => {
  // eslint-disable-next-line
  if (payload) console.log(payload);
};

// Override the globalStore method
mutations.changeProblemSize = (state) => {
  state.problemSize = state.intervals.length;
};
/* ****************************************************************
ACTIONS
**************************************************************** */
const actions = {};
Object.assign(actions, globals.actions);

actions.updateProblemSize = (context, payload) => {
  context.commit('changeProblemSize', payload);
};

actions.addInterval = (context, { start, finish }) => {
  context.commit('createInterval', { start, finish });
  // This is the index of the latest interval
  const n = context.state.problemSize;
  // find the row to put this interval
  const rowNum = context.getters.getRowThatFits(n);
  // if necessary, create a new row
  if (rowNum >= context.state.rows.length) {
    context.commit('createNewRow');
  }
  context.commit('addIntervalToRow', { index: n, row: rowNum });
  context.dispatch('updateProblemSize', { n });
};

actions.removeInterval = (context, { index }) => {
  const { row } = context.getters.getInterval(index);
  context.commit('destroyInterval', { index, row });
  const n = context.state.problemSize - 1;
  context.dispatch('updateProblemSize', { n });
};

// todo - changeInterval
export { storeGetters, mutations, actions, storeState };

export default new Vuex.Store({
  plugins,
  modules,
  state: storeState,
  getters: storeGetters,
  mutations,
  actions,
});
