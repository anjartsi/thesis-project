import Vue from 'vue';
import globals from '../global/index';
import Cpop from './CPOP-class';

function newProblem(arr, level) {
  // This is what a new problem looks like in the state
  return {
    problem: new Cpop(arr, level),
    i: 0,
    j: 1,
    offset: 0,
    // for left children, offset should be equal to their parent's offset
    // for right children, offset should be equal to their parent's offset + parent's medianIndex
  };
}
const mutations = {};
// copy the global state values into state
Object.assign(mutations, globals.mutations);

mutations.changeProblemSize = (state) => {
  state.problemSize.current = state.points.length;
};

mutations.addPoint = (state, { point }) => {
  const { x, y } = point;
  // check for correct input
  const xRange = x <= state.valueRange.max && x >= state.valueRange.min;
  const yRange = y <= state.valueRange.max && y >= state.valueRange.min;
  if (!xRange || !yRange) {
    state.messages.addPoint = `Cannot add Point (${point.x}, ${point.y}), coordinates must be between ${state.valueRange.min} and ${state.valueRange.max}`;
    return;
  }
  let isUnique = true;
  // see if this point already exists
  for (let i = 0; i < state.points.length; i++) {
    const pt = state.points[i];
    if (pt.x === point.x && pt.y === point.y) {
      isUnique = false;
      break;
    }
  }
  if (isUnique) {
    state.messages.addPoint = `Point (${point.x}, ${point.y}) has been added!`;
    state.points.push({ x, y, color: 'black' });
  } else state.messages.addPoint = `Point (${point.x}, ${point.y}) already exists`;
};

mutations.deletePoint = (state, { index }) => {
  state.points.splice(index, 1);
};
mutations.highlightPoint = (state, { index }) => {
  if (index < state.points.length && index >= 0) {
    // if the color was black, make it red
    if (state.points[index].color === 'black') {
      Vue.set(state.points[index], 'color', 'red');
    }
  }
  state.refresh = (state.refresh + 1) % 100;
};
mutations.unhighlightPoint = (state, { index }) => {
  if (index < state.points.length && index >= 0) {
    // if it was red, make it black
    if (state.points[index].color === 'red') {
      Vue.set(state.points[index], 'color', 'black');
    }
  }
  state.refresh = (state.refresh + 1) % 100;
};
mutations.sortPointsByX = (state) => {
  const arr = state.points.slice();
  state.points = arr.sort((a, b) => {
    let comparison = a.x - b.x;
    if (comparison === 0) comparison = a.y - b.y;
    return comparison;
  });
};

mutations.selectCanvas = (state, { canvasNum }) => {
  state.solver.canvasNum = canvasNum;
};
mutations.lockUnlock = (state) => {
  state.locked = !state.locked;
};

mutations.bruteForceOne = (state) => {
  const { canvasNum } = state.solver;
  const { problem, i, j } = state.problems[canvasNum];
  console.log(problem.seeIfShortest(i, j));
};
mutations.bruteForceAll = (state) => {
  const { canvasNum } = state.solver;
  const { problem } = state.problems[canvasNum];
  problem.bruteForce();
  console.log(problem.shortest);
  console.log(problem.closestA);
  console.log(problem.closestB);
};

mutations.resetSolver = (state) => {
  if (state.locked) {
    state.solver = {
      canvasNum: 0,
    };
    state.problems[0] = newProblem(state.points, 0);
  } else state.problems = {};
};


export default mutations;
