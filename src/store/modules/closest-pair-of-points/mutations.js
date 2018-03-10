import Vue from 'vue';
import globals from '../global/index';
import Cpop from './CPOP-class';

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
    state.messages.instanceMaker.push(`ERROR: Point (${point.x}, ${point.y}) coordinates must be between ${state.valueRange.min} and ${state.valueRange.max}`);
    return;
  }
  // see if this point already exists
  for (let i = 0; i < state.points.length; i++) {
    const pt = state.points[i];
    if (pt.x === point.x && pt.y === point.y) {
      state.messages.instanceMaker.push(`ERROR: Point (${point.x}, ${point.y}) already exists!`);
      return;
    }
  }
  if (state.problemSize.current >= state.problemSize.max) {
    state.messages.instanceMaker.push(`ERROR: MAXIMUM PROBLEM SIZE Reached. Could not add Point (${point.x}, ${point.y})`);
    return;
  }
  state.messages.instanceMaker.push(`Point (${point.x}, ${point.y}) has been ADDED!`);
  state.points.push({ x, y });
  state.problemTree[0].colors.push('black');
};
mutations.deletePoint = (state, { index }) => {
  if (index < state.points.length && index >= 0) {
    const point = state.points[index];
    state.points.splice(index, 1);
    state.messages.instanceMaker.push(`Point (${point.x}, ${point.y}) has been DELETED!`);
  }
};
// eslint-disable-next-line
mutations.changePointColor = (state, { canvasNum, index, newColor, oldColor }) => {
  // changes the color of a point only if the current color is oldColor
  const newCol = newColor || 'black';
  const oldCol = oldColor || 'black';
  if (index < state.points.length && index >= 0) {
    // if the color was the old color make it the new color
    const col = state.problemTree[canvasNum].colors[index];
    if (col === oldCol) {
      Vue.set(state.problemTree[canvasNum].colors, index, newCol);
    }
  }
};
mutations.forcePointColor = (state, { canvasNum, index, newColor }) => {
  // changes the color of a point no matter what
  const newCol = newColor || 'black';
  if (index < state.points.length && index >= 0) {
    Vue.set(state.problemTree[canvasNum].colors, index, newCol);
  }
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
  // when a canvas is clicked, that's the one that gets all the solver attention
  // If this is a new canvas, then print add it to messages
  if (state.solver.canvasNum !== canvasNum) state.messages.solver.push(`Canvas ${canvasNum} selected!`);
  state.solver.canvasNum = canvasNum;
};
mutations.lockUnlock = (state) => {
  state.locked = !state.locked;
};
mutations.resetSolver = (state) => {
  if (state.locked) {
    state.solver = {
      canvasNum: 0,
    };
    Vue.set(state.problemTree[0], 'problem', new Cpop(state.points, 0));
    state.messages.solver = ['Let\'s solve this problem!'];
  } else {
    // only keep the root problem
    state.messages.instanceMaker = ['Add some points!'];
    const zero = {};
    // reset the root problem
    zero.problem = null;
    zero.i = 0;
    zero.j = 1;
    zero.colors = [];
    for (let a = 0; a < state.problemSize.current; a++) {
      zero.colors.push('black');
    }
    Vue.set(state, 'problemTree', { 0: zero });
  }
};

mutations.bruteForceOne = (state) => {
  const { canvasNum } = state.solver;
  const {
    problem,
    i,
    j,
    colors,
    finished,
  } = state.problemTree[canvasNum];
  if (!finished) {
    Vue.set(colors, i, 'orange');
    Vue.set(colors, j, 'yellow');
    // check the current i and j values
    problem.seeIfShortest(i, j);
    let a = i;
    let b = j;
    // increment i, j while keeping i < j <problem.size
    a = i;
    b = j + 1;
    if (b > problem.size) {
      a++;
      b = a + 1;
      // reset all the colors of the j's
      for (let ii = b - 1; ii < problem.size; ii++) {
        Vue.set(colors, ii, 'black');
      }
      Vue.set(colors, a, 'orange');
    }
    state.problemTree[canvasNum].i = a;
    state.problemTree[canvasNum].j = b;
    if (a === problem.size) {
      Vue.set(state.problemTree, 'finished', true);
      Vue.set(colors, problem.closestA, '#AAFFAA');
      Vue.set(colors, problem.closestB, '#AAFFAA');
    }
  }
};
mutations.bruteForceAll = (state) => {
  const { canvasNum } = state.solver;
  const { problem } = state.problemTree[canvasNum];
  problem.bruteForce();
  console.log(problem.shortest);
  console.log(problem.closestA);
  console.log(problem.closestB);
};
mutations.divide = (state) => {
  const { canvasNum } = state.solver;
  const parent = state.problemTree[canvasNum];
  // check to see if this has already been divided
  if (parent.problem.leftHalf && parent.problem.rightHalf) {
    state.messages.solver.push('This problem has already been divided!');
    return;
  }
  const canDivide = parent.problem.divide();
  if (canDivide) {
    const leftChild = 2 * canvasNum + 1;
    const rightChild = 2 * canvasNum + 2;
    const leftProblem = {
      problem: parent.problem.leftHalf,
      i: 0,
      j: 1,
      divide: false,
      colors: parent.colors.slice(0, parent.problem.medianIndex),
    };
    const rightProblem = {
      problem: parent.problem.rightHalf,
      i: 0,
      j: 1,
      divide: false,
      colors: parent.colors.slice(parent.problem.medianIndex),
    };
    Vue.set(state.problemTree, leftChild, leftProblem);
    Vue.set(state.problemTree, rightChild, rightProblem);
    state.messages.solver.push('This problem has been divided into 2 subproblems!');
  } else {
    state.messages.solver.push('WARNING! This subproblem has 3 points or fewer. No need to divide!');
  }
};

export default mutations;
