import globals from '../global/index';

const state = {};
// copy the global state values into state
Object.assign(state, globals.state);
state.refresh = 0;
state.problemTree = {
  0: {
    problem: null,
    i: 0,
    j: 1,
    colors: [],
    finished: false,
    divided: false,
  },
};
state.colors = {
  default: 'black',
  highlight: 'red',
  checking_i: '#367EBA',
  checked_j: 'yellow',
  checked_done: 'orange',
  closest: '#AAFFAA',
  strip: '#D00ABA',
};
state.solver = {
  canvasNum: 0,
};
state.valueRange = { min: 0, max: 500 };
state.randomRange = {x: 0, y: 0, h: 500, w: 500};
state.problemSize = {
  max: 200,
  min: 0,
  current: 0,
};
state.messages = {
  instanceMaker: ['Add Some Points'],
  solver: ['Click on a Canvas to start solving it'],
};

state.points = []; // A point looks like { x: 0, y:0 }

// for drawings
state.pointRadius = 3;

export default state;
