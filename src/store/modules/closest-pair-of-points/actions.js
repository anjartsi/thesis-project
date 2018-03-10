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
actions.changePointColor = (context, { index, oldColor, newColor }) => {
  context.commit('changePointColor', { index, oldColor, newColor });
};

actions.selectCanvas = (context, { canvasNum }) => {
  if (context.getters.solving) {
    context.commit('selectCanvas', { canvasNum });
  }
};
actions.bruteForce = (context) => {
  if (context.getters.solving) {
    context.commit('bruteForce');
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


export default actions;
