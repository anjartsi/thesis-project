import globals from '../global/index';

const actions = {};
// copy the global state values into state
Object.assign(actions, globals.actions);


actions.updateProblemSize = (context, payload) => {
  context.commit('changeProblemSize', payload);
};
actions.addPoint = (context, { point }) => {
  context.commit('addPoint', { point });
  context.commit('sortPointsByX');
  context.commit('changeProblemSize');
};
actions.deletePoint = (context, { index }) => {
  context.commit('deletePoint', { index });
  context.commit('changeProblemSize');
};
actions.changePointColor = (context, { canvasNum, index, newColor, oldColor }) => {
  context.commit('forcePointColor', { canvasNum, index, newColor, oldColor });
};

actions.selectCanvas = (context, { canvasNum }) => {
  if (context.getters.solving) {
    context.commit('selectCanvas', { canvasNum });
  }
};

actions.bruteForceAuto = (context) => {
  if (context.getters.solving) {
    context.commit('bruteForceAuto');
  }
};
actions.bruteForceOne = (context) => {
  if (context.getters.solving) {
    context.commit('bruteForceOne');
  }
};
actions.bruteForceLevel = (context) => {
  const { canvasNum } = context.state.solver;
  const { level } = context.state.problemTree[canvasNum].problem;
  const tree = context.state.problemTree;
  for (const prob in tree) {
    if (Object.prototype.hasOwnProperty.call(tree, prob)) {
      if (tree[prob].problem.level === level) {
        context.commit('selectCanvas', { canvasNum: prob });
        context.commit('bruteForceAuto');
      }
    }
  }
  context.commit('selectCanvas', { canvasNum });
};
actions.divide = (context) => {
  context.commit('divide');
};
actions.divideLevel = (context) => {
  const { canvasNum } = context.state.solver;
  const { level } = context.state.problemTree[canvasNum].problem;
  const tree = context.state.problemTree;
  for (const prob in tree) {
    if (Object.prototype.hasOwnProperty.call(tree, prob)) {
      if (tree[prob].problem.level === level) {
        context.commit('selectCanvas', { canvasNum: prob });
        context.commit('divide');
      }
    }
  }
  context.commit('selectCanvas', { canvasNum });
};

actions.conquerOne = (context) => {
  if (context.getters.solving) {
    context.commit('conquerOne');
  }
};
actions.conquerAuto = (context) => {
  if (context.getters.solving) {
    context.commit('conquerAuto');
  }
};
actions.conquerLevel = (context) => {
  const { canvasNum } = context.state.solver;
  const { level } = context.state.problemTree[canvasNum].problem;
  const tree = context.state.problemTree;
  for (const prob in tree) {
    if (Object.prototype.hasOwnProperty.call(tree, prob)) {
      if (tree[prob].problem.level === level) {
        context.commit('selectCanvas', { canvasNum: prob });
        context.commit('conquerAuto');
      }
    }
  }
  context.commit('selectCanvas', { canvasNum });
};


actions.loadFile = (context, { loadText }) => {
  context.commit('loadStart');
  const text = loadText.trim();
  const points = [];
  let valid = true;
  let msg = '';
  if (text.length === 0) return;
  // split the text by line
  let rows = text.split('\n');
  // if a line is empty, it ignore it
  rows = rows.filter((row) => row.trim().length > 0);
  rows.forEach((element, index) => {
    let correct = true;
    // split by whitespace
    const row = element.trim().split(/\s+/);
    const x = Number.parseInt(row[0], 10);
    const y = Number.parseInt(row[1], 10);
    correct = row.length === 2;
    correct = correct && x >= context.state.valueRange.min;
    correct = correct && x <= context.state.valueRange.max;
    correct = correct && y >= context.state.valueRange.min;
    correct = correct && y <= context.state.valueRange.max;
    if (correct) {
      points.push({ x, y });
    } else {
      valid = false;
      msg = `Error on row ${index + 1} --> "${element}"`;
      context.commit('addLoadMessage', { err: true, msg });
    }
  });
  if (valid) {
    const oldProblemSize = context.state.points.length;
    for (let i = 0; i < oldProblemSize; i++) {
      context.dispatch('deletePoint', { index: 0 });
    }
    points.forEach(element => context.dispatch('addPoint', { point: element }));
    context.commit('resetSolver');
  }
}; // end loadFile
export default actions;
