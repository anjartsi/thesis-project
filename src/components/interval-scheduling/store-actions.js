import globals from '../../scripts/globalStore';

const actions = {};
Object.assign(actions, globals.actions);

actions.updateProblemSize = (context, payload) => {
  context.commit('changeProblemSize', payload, { root: true });
};

export default actions;
