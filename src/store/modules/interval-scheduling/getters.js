import globals from '../global/index';

const storeGetters = {};

// copy the global state values into state
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

export default storeGetters;
