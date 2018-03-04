import globals from '../global/index';

const actions = {};
// copy the global state values into state
Object.assign(actions, globals.actions);

actions.addPoint = (context, payload) => {
  const { point } = payload;
  const x = point.split(' ').map(Number)[0];
  const y = point.split(' ').map(Number)[1];

  // check for correct input
  const xRange = x <= context.state.max && x >= context.state.min;
  const yRange = y <= context.state.max && y >= context.state.min;

  if (xRange && yRange) {
    context.commit('createPoint', { point: { x, y } });
    context.commit('sortPointsByX');
  }
};

actions.deletePoint = (context, payload) => {
  context.commit('deletePoint', payload);
};

actions.updateProblemSize = (context, payload) => {
  context.commit('changeProblemSize', payload);
};

export default actions;
