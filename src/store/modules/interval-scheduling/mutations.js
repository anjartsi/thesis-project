import Vue from 'vue';
import globals from '../global/index';

const mutations = {};
// copy the global state values into state
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
  state.solved = false;
};

mutations.sortByFinishTime = (state) => {
  state.sortedByFinishTime.sort((a, b) => state.intervals[a].finish - state.intervals[b].finish);
  state.sorted = true;
  for (let i = 0; i < state.problemSize; i++) {
    state.removedFromSorted[i] = false;
  }
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
  state.step++;
};

mutations.checkIfSolved = (state) => {
  // There are no intervals left to check
  state.solved = state.sortedByFinishTime.length === 0;
  // All steps that must be performed have been performed
  state.solved = state.solved && state.step % state.maxSteps === 0;
  // clear the latest interval so it doesn't remain highlighted
  if (state.solved) state.latest = -1;
};
// Override the globalStore method
mutations.changeProblemSize = (state) => {
  state.problemSize = state.intervals.length;
};

mutations.loadStart = (state) => {
  state.loadMessage = [];
  state.loadError = false;
};
export default mutations;
