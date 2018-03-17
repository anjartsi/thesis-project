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
  state.problemTree[0].colors.push(state.colors.default);
};
mutations.deletePoint = (state, { index }) => {
  if (index < state.points.length && index >= 0) {
    const point = state.points[index];
    state.points.splice(index, 1);
    state.problemTree[0].colors.splice(index, 1);
    state.messages.instanceMaker.push(`Point (${point.x}, ${point.y}) has been DELETED!`);
  }
};
// eslint-disable-next-line
mutations.changePointColor = (state, { canvasNum, index, newColor, oldColor }) => {
  // changes the color of a point only if the current color is oldColor
  const newCol = newColor || state.colors.default;
  const oldCol = oldColor || state.colors.default;
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
  const newCol = newColor || state.colors.default;
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
  Vue.set(state.solver, 'canvasNum', 0);
  if (state.locked) {
    // solve mode
    Vue.set(state.problemTree[0], 'problem', new Cpop(state.points, 0));
    state.messages.solver = ['Let\'s solve this problem!'];
  } else {
    // edit mode
    // only keep the root problem
    state.messages.instanceMaker = ['Add some points!'];
    const zero = {};
    // reset the root problem
    zero.problem = null;
    zero.i = 0;
    zero.j = 1;
    zero.colors = [];
    for (let a = 0; a < state.problemSize.current; a++) {
      zero.colors.push(state.colors.default);
    }
    Vue.set(state, 'problemTree', { 0: zero });
  }
};

mutations.bruteForceOne = (state) => {
  const { canvasNum } = state.solver;
  if (state.problemTree[canvasNum].divided) {
    state.messages.solver.push('This problem has been divided, solve the subproblems first.');
    return;
  }
  const {
    problem,
    i,
    j,
    colors,
    finished,
  } = state.problemTree[canvasNum];
  if (!finished) {
    Vue.set(colors, i, state.colors.checking_i);
    Vue.set(colors, j, state.colors.checked_j);
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
        Vue.set(colors, ii, state.colors.default);
      }
      Vue.set(colors, a - 1, state.colors.checked_done);
      Vue.set(colors, a, state.colors.checking_i);
    }
    state.problemTree[canvasNum].i = a;
    state.problemTree[canvasNum].j = b;
    if (a === problem.size) {
      Vue.set(state.problemTree[canvasNum], 'finished', true);
      Vue.set(colors, problem.closestA, state.colors.closest);
      Vue.set(colors, problem.closestB, state.colors.closest);
    }
  }
};
mutations.bruteForceAuto = (state) => {
  const { canvasNum } = state.solver;
  // If this problem has been divided, we can't brute force it
  if (state.problemTree[canvasNum].divided) {
    state.messages.solver.push('This problem has been divided, solve the subproblems first.');
    return;
  }
  const { problem } = state.problemTree[canvasNum];
  problem.bruteForce();
  Vue.set(state.problemTree[canvasNum], 'finished', true);
  for (let ii = 0; ii < state.problemTree[canvasNum].problem.size; ii++) {
    Vue.set(state.problemTree[canvasNum].colors, ii, state.colors.checked_done);
  }
  Vue.set(state.problemTree[canvasNum].colors, problem.closestA, state.colors.closest);
  Vue.set(state.problemTree[canvasNum].colors, problem.closestB, state.colors.closest);
  Vue.set(state.problemTree[canvasNum], 'finished', true);
};
mutations.divide = (state) => {
  const { canvasNum } = state.solver;
  const parent = state.problemTree[canvasNum];
  // If this problem has been divided, we can't brute force it
  if (state.problemTree[canvasNum].divided) {
    state.messages.solver.push('This problem has already been divided!');
    return;
  }
  const canDivide = parent.problem.divide();
  if (canDivide) {
    const leftChild = 2 * canvasNum + 1;
    const rightChild = 2 * canvasNum + 2;
    const lColors = [];
    const rColors = [];

    for (let ii = 0; ii < parent.problem.leftHalf.size; ii++) {
      lColors.push(state.colors.default);
    }
    for (let ii = 0; ii < parent.problem.rightHalf.size; ii++) {
      rColors.push(state.colors.default);
    }
    const leftProblem = {
      problem: parent.problem.leftHalf,
      i: 0,
      j: 1,
      divided: false,
      finished: false,
      colors: lColors,
    };
    const rightProblem = {
      problem: parent.problem.rightHalf,
      i: 0,
      j: 1,
      divided: false,
      finished: false,
      colors: rColors,
    };
    Vue.set(state.problemTree, leftChild, leftProblem);
    Vue.set(state.problemTree, rightChild, rightProblem);
    Vue.set(state.problemTree[canvasNum], 'divided', true);
    state.messages.solver.push('This problem has been divided into 2 subproblems!');
  } else {
    state.messages.solver.push('WARNING! This subproblem has 3 points or fewer. No need to divide!');
  }
};

mutations.conquerOne = (state) => {
  const { canvasNum } = state.solver;
  // I can reuse i and j because there is no overlap between brute force and conquer
  const {
    problem,
    i,
    j,
    colors,
    finished,
    divided,
  } = state.problemTree[canvasNum];
  if (!divided) {
    state.messages.solver.push('WARNING! This problem has not been divided, so it cannot be conquered.');
    return;
  }

  const leftChild = 2 * canvasNum + 1;
  const rightChild = 2 * canvasNum + 2;
  if (!state.problemTree[leftChild].finished
    || !state.problemTree[rightChild].finished) {
    state.messages.solver.push('WARNING! Before this problem can be conquered, both of its subproblems must be finished.');
    return;
  }
  if (finished) {
    return;
  }
  // Perform conquerSetup if it hasn't already been done before
  if (problem.shortest === Infinity) problem.conquerSetup();
  const strip = problem.findPointsInStrip();
  if (strip.length === 0) {
    Vue.set(finished, true);
    Vue.set(colors, problem.closestA, state.colors.closest);
    Vue.set(colors, problem.closestB, state.colors.closest);
  }

  // If i and j have not been modified from their initial values,
  // then the strip needs to be
  if (state.problemTree[canvasNum].i === 0
    && state.problemTree[canvasNum].j === 1
    && colors[strip[0]] !== state.colors.strip
  ) {
    for (let ii = 0; ii < strip.length; ii++) {
      Vue.set(colors, strip[ii], state.colors.strip);
    }
    return;
  }
  Vue.set(colors, strip[i], state.colors.checking_i);
  Vue.set(colors, strip[j], state.colors.checked_j);
  problem.seeIfShortest(strip[i], strip[j]);
  let a = i;
  let b = j;
  // increment i, j while keeping i < j <problem.size
  a = i;
  b = j + 1;
  if (b > strip.length || b > 16 + a) {
    a++;
    b = a + 1;
    // reset all the colors of the j's
    for (let ii = b - 1; ii < problem.size; ii++) {
      Vue.set(colors, strip[ii], state.colors.strip);
    }
    Vue.set(colors, strip[a - 1], state.colors.checked_done);
    Vue.set(colors, strip[a], state.colors.checking_i);
  }
  state.problemTree[canvasNum].i = a;
  state.problemTree[canvasNum].j = b;
  if (a === strip.length) {
    Vue.set(state.problemTree[canvasNum], 'finished', true);
    Vue.set(colors, problem.closestA, state.colors.closest);
    Vue.set(colors, problem.closestB, state.colors.closest);
  }
};

export default mutations;

mutations.conquerAuto = (state) => {
  const { canvasNum } = state.solver;
  // I can reuse i and j because there is no overlap between brute force and conquer
  const {
    problem,
    finished,
    divided,
  } = state.problemTree[canvasNum];
  if (!divided) {
    state.messages.solver.push('WARNING! This problem has not been divided, so it cannot be conquered.');
    return;
  }

  const leftChild = 2 * canvasNum + 1;
  const rightChild = 2 * canvasNum + 2;
  if (!state.problemTree[leftChild].finished
    || !state.problemTree[rightChild].finished) {
    state.messages.solver.push('WARNING! Before this problem can be conquered, both of its subproblems must be finished.');
    return;
  }
  if (finished) {
    return;
  }
  problem.conquer();
  Vue.set(state.problemTree[canvasNum], 'finished', true);
  for (let ii = 0; ii < state.problemTree[canvasNum].problem.size; ii++) {
    Vue.set(state.problemTree[canvasNum].colors, ii, state.colors.checked_done);
  }
  Vue.set(state.problemTree[canvasNum].colors, problem.closestA, state.colors.closest);
  Vue.set(state.problemTree[canvasNum].colors, problem.closestB, state.colors.closest);
  Vue.set(state.problemTree[canvasNum], 'finished', true);
};

mutations.loadStart = (state) => {
  state.loadMessage = [];
  state.loadError = false;
};
