import globals from '../global/index';

const state = {};
// copy the global state values into state
Object.assign(state, globals.state);

state.min = 0;
state.max = 200;
state.problemSize = 3;
state.points = [
  { x: 10, y: 10 },
  { x: 150, y: 150 },
  { x: 210, y: 210 },
  { x: 350, y: 350 },
  { x: 410, y: 410 },
  { x: 450, y: 450 },
  { x: 350, y: 250 },
  { x: 150, y: 350 },
]; // A point is {x, y}

// for drawings
state.pointRadius = 5;

export default state;
