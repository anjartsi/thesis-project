import globals from '../global/index';

const plugins = [];
const modules = {};

// Vue.use(Vuex);

/* ****************************************************************
STATE
**************************************************************** */
const storeState = {};
// copy the global state values into state
Object.assign(storeState, globals.state);
storeState.min = 0;
storeState.max = 200;
storeState.problemSize = 3;
storeState.points = [
  { x: 10, y: 10 },
  { x: 150, y: 150 },
  { x: 210, y: 210 },
  { x: 350, y: 350 },
  { x: 410, y: 410 },
  { x: 450, y: 450 },
  { x: 350, y: 250 },
  { x: 150, y: 350 },
]; // A point is {x, y}

// for drawings
storeState.pointRadius = 5;

// for the solver

/* ****************************************************************
GETTERS
**************************************************************** */
const storeGetters = {};
Object.assign(storeGetters, globals.getters);


/* ****************************************************************
MUTATIONS
**************************************************************** */
const mutations = {};
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


/* ****************************************************************
ACTIONS
**************************************************************** */
const actions = {};
Object.assign(actions, globals.actions);

actions.addPoint = (context, payload) => {
  const { point } = payload;
  const x = point.split(' ').map(Number)[0];
  const y = point.split(' ').map(Number)[1];
  context.commit('createPoint', { point: { x, y } });
};

actions.deletePoint = (context, payload) => {
  context.commit('deletePoint', payload);
};

actions.updateProblemSize = (context, payload) => {
  context.commit('changeProblemSize', payload);
};

// Export each part of the store separately to help with testing
export { storeGetters, mutations, actions, storeState };
export default {
  plugins,
  modules,
  namespaced: true,
  state: storeState,
  getters: storeGetters,
  mutations,
  actions,
};
