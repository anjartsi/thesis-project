import Vue from 'vue';
import Vuex from 'vuex';

import stableMarriage from './modules/stable-marriage/index';
import intervalScheduling from './modules/interval-scheduling/index';
import closestPairOfPoints from './modules/closest-pair-of-points/index';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    stableMarriage,
    intervalScheduling,
    closestPairOfPoints,
  },
  strict: debug,
  plugins: [],
});
