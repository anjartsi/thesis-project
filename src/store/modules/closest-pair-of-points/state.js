import globals from '../global/index';

const state = {};
// copy the global state values into state
Object.assign(state, globals.state);
state.refresh = 0;
state.problems = {
  0: {
    problem: null,
    offset: 0,
    firstPointIndex: 0,
    rightPointIndex: 0,
    leftX: 0,
    rightX: 0,
    i: 0,
    j: 1,
    colors: [],
  },
};
state.solver = {
  canvasNum: null,
};
state.valueRange = { min: 0, max: 500 };
state.problemSize = {
  max: 500,
  min: 0,
  current: 8,
};
state.messages = {
  instanceMaker: ['Add Some Points'],
  solver: ['Click on a Canvas to start solving it'],
};

state.points = []; // A point looks like { x: 0, y:0 }

// for drawings
state.pointRadius = 4;

export default state;
