import state from './state';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

const plugins = [];
const modules = {};


export { getters, mutations, actions, state };

export default {
  plugins,
  modules,
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
