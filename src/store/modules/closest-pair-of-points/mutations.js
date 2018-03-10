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
  state.problems[0].colors.push('black');
  Vue.set(state.problems[0], 'lastPointIndex', state.problemSize.current);
};
mutations.deletePoint = (state, { index }) => {
  if (index < state.points.length && index >= 0) {
    const point = state.points[index];
    state.points.splice(index, 1);
    state.messages.instanceMaker.push(`Point (${point.x}, ${point.y}) has been DELETED!`);
  }
};
mutations.changePointColor = (state, { index, newColor, oldColor }) => {
  // changes the color of a point only if the current color is oldColor
  const newCol = newColor || 'black';
  const oldCol = oldColor || 'black';
  if (index < state.points.length && index >= 0) {
    // if the color was black, make it red
    const col = state.problems[0].colors[index];
    if (col === oldCol) {
      Vue.set(state.problems[0].colors, index, newCol);
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
    state.problems[0].problem = new Cpop(state.points, 0);
    state.problems[0].rightX = state.valueRange.max;
    state.messages.solver = ['Let\'s solve this problem!'];
  } else {
    // only keep the root problem
    state.messages.instanceMaker = ['Add some points!'];
    const zero = state.problems[0];
    zero.problem = null;
    Vue.set(state, 'problems', { 0: zero });
  }
};

mutations.bruteForceOne = (state) => {
  const { canvasNum } = state.solver;
  const {
    problem,
    i,
    j,
    offset,
  } = state.problems[canvasNum];
  state.points[i + offset].color = 'blue';
  state.points[j + offset].color = 'green';
  if (i < problem.size - 1) {
    console.log(problem.seeIfShortest(i, j));
    let a = i;
    let b = j;
    a = i;
    b = j + 1;
    if (b >= problem.size) {
      b = a + 1;
      a++;
    }
    state.problems[canvasNum].i = a;
    state.problems[canvasNum].j = b;
  }
};
mutations.bruteForceAll = (state) => {
  const { canvasNum } = state.solver;
  const { problem } = state.problems[canvasNum];
  problem.bruteForce();
  console.log(problem.shortest);
  console.log(problem.closestA);
  console.log(problem.closestB);
};
mutations.divide = (state) => {
  const { canvasNum } = state.solver;
  const parent = state.problems[canvasNum];
  // check to see if this has already been divided
  if (parent.problem.leftHalf && parent.problem.rightHalf) {
    console.log(parent.problem.leftHalf);
    state.messages.solver.push('This problem has already been divided!');
    return;
  }
  const canDivide = parent.problem.divide();
  if (canDivide) {
    const mid = parent.problem.medianIndex;
    parent.midIndex = mid;
    const first = parent.firstPointIndex;
    const last = parent.lastPointIndex;
    const left = parent.leftX;
    const right = parent.rightX;
    const midX = parent.problem.rightHalf.points[0].x;
    const leftChild = 2 * canvasNum + 1;
    const rightChild = 2 * canvasNum + 2;

    const leftProblem = {
      i: 0,
      j: 1,
      offset: parent.offset,
      firstPointIndex: first,
      lastPointIndex: mid + parent.offset,
      leftX: left,
      rightX: midX,
      colors: parent.colors.slice(0, mid + 1),
      problem: parent.problem.leftHalf,
    };
    const rightProblem = {
      i: 0,
      j: 1,
      offset: parent.offset + mid,
      firstPointIndex: mid + parent.offset + 2,
      lastPointIndex: last,
      leftX: midX,
      rightX: right,
      colors: parent.colors.slice(mid + 1),
      problem: parent.problem.rightHalf,
    };
    Vue.set(state.problems, leftChild, leftProblem);
    Vue.set(state.problems, rightChild, rightProblem);
    state.messages.solver.push('This problem has been divided into 2 subproblems!');
  } else {
    state.messages.solver.push('WARNING! This subproblem has 3 points or fewer. No need to divide!');
  }
};

export default mutations;
