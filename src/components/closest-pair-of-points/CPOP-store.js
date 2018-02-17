import Vue from 'vue';
import Vuex from 'vuex';
import globals from '../../scripts/globalStore';

const plugins = [];
const modules = {};

Vue.use(Vuex);

/* ****************************************************************
STATE
**************************************************************** */
const storeState = {};
// copy the global state values into state
Object.assign(storeState, globals.state);
storeState.min = 0;
storeState.max = 200;
storeState.problemSize = 3;
storeState.points = [{ x: 10, y: 10 }, { x: 50, y: 50 }]; // A point is {x, y}

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
  context.commit('createPoint', { point });
};

actions.deletePoint = (context, payload) => {
  context.commit('deletePoint', payload);
};

actions.updateProblemSize = (context, payload) => {
  context.commit('changeProblemSize', payload);
};

// Export each part of the store separately to help with testing
export { storeGetters, mutations, actions, storeState };
export default new Vuex.Store({
  plugins,
  modules,
  state: storeState,
  getters: storeGetters,
  mutations,
  actions,
});
