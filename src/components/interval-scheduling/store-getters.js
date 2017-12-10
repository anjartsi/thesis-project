import globals from '../../scripts/globalStore';


const storeGetters = {};
Object.assign(storeGetters, globals.getters);

storeGetters.getInterval = (state) => (index) => state.intervals[index];
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
    collide = true;
  }
  collide = i.start < j.start;

  return collide;
};
storeGetters.fitsInRow = (state, getters) => (intervalIndex, row) => {
  let conflict = false;
  for (let i = 0; i < row.length; i++) {
    conflict = conflict || getters.getCollision(intervalIndex, row[i]);
  }
  return !conflict;
};
// returns the number of the row where an interval is to be placed
// If no such row exists, returns -1
// This means a new row has to be created
storeGetters.getRowThatFits = (state, getters) => (index) => {
  let rowNum = 0;
  let found = false;
  while (!found) {
    if (getters.fitsInRow(index, rowNum)) {
      found = true;
      return rowNum;
    }
    rowNum++;
    if (rowNum >= state.rows.length) {
      break;
    }
  }
  return -1;
};
export default storeGetters;
