import globals from '../global/index';

const state = {};
// copy the global state values into state
Object.assign(state, globals.state);
// Add state variables below
// for the instance maker
state.min = 0;
state.max = 200;
// an interval looks like this: {start, finish, row}
state.intervals = [
  { start: 3, finish: 5, row: 0 },
  { start: 0, finish: 2, row: 1 },
  { start: 0, finish: 3, row: 0 },
];
state.rows = [
  [0, 2],
  [1],
  [],
  [],
];
state.problemSize = 3;
state.earliestTime = 0;
state.latestTime = 30;
// for the solver
state.sorted = false;
state.removedFromSorted = [];
state.sortedByFinishTime = [];
state.solution = [];
state.latest = -1;
state.currentTime = 0;
state.step = 0;
state.maxSteps = 2;

// for styling/sizing the diagrams
state.unit = 30;
state.rowStyle = {};
state.trayStyle = {};

export default state;
