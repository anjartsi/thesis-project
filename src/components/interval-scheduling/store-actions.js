import globals from '../../scripts/globalStore';

const actions = {};
Object.assign(actions, globals.actions);

actions.updateProblemSize = (context, payload) => {
  context.commit('changeProblemSize', payload);
};

actions.addInterval = (context, { start, finish }) => {
  context.commit('createInterval', { start, finish });
  const n = context.state.problemSize + 1;
  context.dispatch('updateProblemSize', { n });
};

actions.removeInterval = (context, { index }) => {
  context.commit('destroyInterval', { index });
  const n = context.state.problemSize - 1;
  context.dispatch('updateProblemSize', { n });
};

export default actions;
