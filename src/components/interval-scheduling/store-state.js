import globals from '../../scripts/globalStore';

const state = {};
// copy the global state values into state
Object.assign(state, globals.state);
// Add state variables below
// instance maker
state.min = 0;
state.max = 20;
// an interval looks like this: {start, finish, row}
state.intervals = [];
state.rows = [[]];
state.problemSize = 0;
state.earliestTime = 0;
state.latestTime = 20;

export default state;
