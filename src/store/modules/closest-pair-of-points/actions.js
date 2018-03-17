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

actions.bruteForceAll = (context) => {
  if (context.getters.solving) {
    context.commit('bruteForceAll');
  }
};
actions.bruteForceOne = (context) => {
  if (context.getters.solving) {
    context.commit('bruteForceOne');
  }
};
actions.divide = (context) => {
  context.commit('divide');
};
actions.divideLevel = (context) => {
  const { canvasNum } = context.state.solver;
  const { level } = context.state.problemTree[canvasNum].problem;
  const tree = context.state.problemTree;
  for (const prob in tree) {
    if (tree[prob].problem.level === level) {
      context.commit('selectCanvas', { canvasNum: prob });
      context.commit('divide');
    }
  }
  context.commit('selectCanvas', { canvasNum });
};

actions.conquerOne = (context) => {
  if (context.getters.solving) {
    console.log('hi');
  }
};

export default actions;
