import globals from '../global/index';

const mutations = {};
// copy the global state values into state
Object.assign(mutations, globals.mutations);

mutations.createPoint = (state, payload) => {
  state.points.push(payload.point);
};

mutations.deletePoint = (state, payload) => {
  const { index } = payload;
  state.points.splice(index, 1);
};

mutations.resetSolver = () => {
};

export default mutations;
