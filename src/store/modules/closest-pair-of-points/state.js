import globals from '../global/index';

const state = {};
// copy the global state values into state
Object.assign(state, globals.state);

state.problemSize = {
  max: 500,
  min: 0,
  current: 8,
};
state.points = [
  { x: 10, y: 10, color: 'black' },
  { x: 150, y: 150, color: 'black' },
  { x: 210, y: 210, color: 'black' },
  { x: 350, y: 350, color: 'black' },
  { x: 410, y: 410, color: 'black' },
  { x: 450, y: 450, color: 'black' },
  { x: 350, y: 250, color: 'black' },
  { x: 150, y: 350, color: 'black' },
]; // A point is {x, y}

// for drawings
state.pointRadius = 2;

export default state;
