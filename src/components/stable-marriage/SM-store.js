import Vue from 'vue';
import Vuex from 'vuex';
import state from './store-state';
import getters from './store-getters';
import mutations from './store-mutations';
import actions from './store-actions';

const plugins = [];
const modules = {};

Vue.use(Vuex);

export { getters, mutations, actions, state };

export default new Vuex.Store({
  plugins,
  modules,
  state,
  getters,
  mutations,
  actions,
});
