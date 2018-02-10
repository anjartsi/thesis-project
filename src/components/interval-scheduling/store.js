import Vue from 'vue';
import Vuex from 'vuex';
// import state from './store-state';
// import getters from './store-getters';
// import mutations from './store-mutations';
// import actions from './store-actions';
import globals from '../../scripts/globalStore';

const plugins = [];
const modules = {};

Vue.use(Vuex);

/* ****************************************************************
STATE
**************************************************************** */
const storeState = {};
// copy the global state values into state
Object.assign(storeState, globals.state);
// Add state variables below
// for the instance maker
storeState.min = 0;
storeState.max = 200;
// an interval looks like this: {start, finish, row}
storeState.intervals = [
  { start: 3, finish: 5, row: 0 },
  { start: 0, finish: 2, row: 1 },
  { start: 0, finish: 3, row: 0 },
];
storeState.rows = [
  [0, 2],
  [1],
  [],
  [],
];
storeState.problemSize = 3;
storeState.earliestTime = 0;
storeState.latestTime = 50;
// for the solver
storeState.sorted = false;
storeState.removedFromSorted = [];
storeState.sortedByFinishTime = [];
storeState.solution = [];
storeState.latest = -1;
storeState.currentTime = 0;
storeState.step = 0;
storeState.maxSteps = 2;

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
storeGetters.getRemoved = (state) => (index) => {
  if (index < state.removedFromSorted.length) {
    return state.removedFromSorted[index];
  }
  return undefined;
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
  let found = false;
  const rowList = [];
  for (let i = 0; i < state.rows.length; i++) {
    rowList.push(i);
  }
  // rowList is a list of row indeces sorted by the emptiest row first
  rowList.sort((a, b) => state.rows[a].length - state.rows[b].length);
  console.log(rowList);
  rowList.push(rowList.length);
  let rowNum = 0;
  while (!found) {
    if (getters.fitsInRow(index, rowList[rowNum])) {
      found = true;
      break;
    } else {
      rowNum++;
    }
  } // end while
  return rowList[rowNum];
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
    // remove from list of intervals
    state.intervals.splice(index, 1);
    // remove from rows
    state.rows[row].splice(rowIndex, 1);
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
    // if the row is now empty, remove the entire row
    // todo - fix
    if (state.rows[row].length === 0 && 0 === 1) {
      state.rows.splice(row, 1);

      for (let i = 0; i < state.intervals.length; i++) {
        if (state.intervals[i].row > row) {
          state.interval[i].row--;
        }
      }
    }
  }
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
mutations.removeRowIfEmpty = (state, { row }) => {
  if (!state.locked && state.rows.length > 4) {
    // if there are only 2 rows left, leave them alone
    if (state.rows[row].length === 0) {
      state.rows.splice(row, 1);
      let interval;
      for (let i = 0; i < state.intervals.length; i++) {
        interval = state.intervals[i];
        if (interval.row > row) {
          interval.row--;
        }
      }
    }
  }
};
mutations.addIntervalToRow = (state, { index, row }) => {
  state.rows[row].push(index);
  state.intervals[index].row = row;
};
// Todo - this method needs a body
mutations.resetSolver = (state) => {
  state.solution.splice(0);
  state.sortedByFinishTime.splice(0);
  for (let i = 0; i < state.problemSize; i++) {
    state.sortedByFinishTime.push(i);
    Vue.set(state.removedFromSorted, i, false);
  }
  state.currentTime = state.earliestTime;
  state.sorted = false;
  state.step = 0;
  state.currentTime = 0;
  state.latest = -1;
};

mutations.sortByFinishTime = (state) => {
  state.sortedByFinishTime.sort((a, b) => state.intervals[a].finish - state.intervals[b].finish);
  state.sorted = true;
  for (let i = 0; i < state.problemSize; i++) {
    state.removedFromSorted[i] = false;
  }
  // eslint-disable-next-line
  console.log(state.intervals);
  // eslint-disable-next-line
  console.log(state.sortedByFinishTime);
};

mutations.addToSolution = (state, { earliestIndex }) => {
  // add the interval to the solution
  state.solution.push(earliestIndex);
  // remove it from the sorted list
  state.sortedByFinishTime.splice(0, 1);
  // update solver information
  const interval = state.intervals[earliestIndex];
  state.currentTime = interval.finish;
  state.latest = earliestIndex;
};

mutations.removeFromSorted = (state, { index }) => {
  const intervalIndex = state.sortedByFinishTime[index];
  state.sortedByFinishTime.splice(index, 1);
  Vue.set(state.removedFromSorted, intervalIndex, true);
};

mutations.performStep = (state) => {
  state.step = (state.step + 1) % state.maxSteps;
};

// Override the globalStore method
mutations.changeProblemSize = (state) => {
  state.problemSize = state.intervals.length;
};

mutations.loadStart = (state) => {
  state.loadMessage = [];
  state.loadError = false;
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
  context.commit('removeRowIfEmpty', { row });
  const n = context.state.problemSize - 1;
  context.dispatch('updateProblemSize', { n });
};

// todo - changeInterval
actions.eft = (context) => {
  if (context.getters.solving) {
    if (!context.state.sorted) {
      context.commit('sortByFinishTime');
    }
    if (context.state.sortedByFinishTime.length > 0) {
      if (context.state.step === 0) {
        const earliestIndex = context.state.sortedByFinishTime[0];
        context.commit('addToSolution', { earliestIndex });
      } else if (context.state.step === 1) {
        const earliestIndex = context.state.solution[context.state.solution.length - 1];
        let nextIntervalIndex;
        let collided;
        for (let i = 0; i < context.state.sortedByFinishTime.length; i++) {
          nextIntervalIndex = context.state.sortedByFinishTime[i];
          collided = context.getters.getCollision(earliestIndex, nextIntervalIndex);
          if (collided) {
            context.commit('removeFromSorted', { index: i });
            i--;
          }
        }
      }
    } // end if (sortedByFinishTime.length > 0)
    context.commit('performStep');
  } // end if (solving)
};


actions.loadFile = (context, payload) => {
  context.commit('loadStart');
  const text = payload.loadText.trim();
  const intervals = [];
  let valid = true;
  let msg = '';
  if (text.length === 0) return;
  // split the text by line
  let rows = text.split('\n');
  // if a line is empty, it ignore it
  rows = rows.filter((row) => row.trim().length > 0);
  const n = rows.length;
  rows.forEach((element, index) => {
    let correct = true;
    const row = element.trim().split(/\s+/);
    const start = Number.parseInt(row[0], 10);
    const finish = Number.parseInt(row[1], 10);
    correct = row.length === 2;
    correct = correct && start >= context.state.min;
    correct = correct && finish <= context.state.max;
    correct = correct && start < finish;
    if (correct) {
      intervals.push({ start, finish });
    } else {
      valid = false;
      msg = `Error on row ${index + 1} --> "${element}"`;
      context.commit('addLoadMessage', { err: true, msg });
    }
  });
  if (valid) {
    context.commit('changeProblemSize', { n });
    const oldProblemSize = context.state.problemSize;
    for (let i = 0; i < oldProblemSize; i++) {
      context.dispatch('removeInterval', { index: 0 });
    }
    intervals.forEach(element => context.dispatch('addInterval', element));
    context.commit('resetSolver');
  }
}; // end loadFile
export { storeGetters, mutations, actions, storeState };

export default new Vuex.Store({
  plugins,
  modules,
  state: storeState,
  getters: storeGetters,
  mutations,
  actions,
});
