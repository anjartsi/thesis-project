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

mutations.sortPointsByX = (state) => {
  const arr = state.points.slice();
  state.points = arr.sort((a, b) => {
    let comparison = a.x - b.x;
    if (comparison === 0) comparison = a.y - b.y;
    return comparison;
  });
};

mutations.resetSolver = () => {
};

export default mutations;
