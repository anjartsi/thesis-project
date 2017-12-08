import Vue from 'vue';
import Vuex from 'vuex';
import state from './store-state';
import getters from './store-getters';
import mutations from './store-mutations';
import actions from './store-actions';

Vue.use(Vuex);

const plugins = [];
const modules = {};

export { getters, mutations, actions, state };

export default new Vuex.Store({
  plugins,
  modules,
  state,
  getters,
  mutations,
  actions,
});
