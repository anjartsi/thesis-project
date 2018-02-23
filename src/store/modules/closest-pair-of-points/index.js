import state from './state';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

const plugins = [];
const modules = {};

// Export each part of the store separately to help with testing
export { state, getters, mutations, actions };
export default {
  plugins,
  modules,
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
