import Vue from 'vue';
import Vuex from 'vuex';
// import globals from '../../scripts/globalStoreMethods';
import getters from './store-getters';
import mutations from './store-mutations';
import actions from './store-actions';


const plugins = [];
const modules = {};

Vue.use(Vuex);

const state = {
  // instance maker
  min: 1,
  max: 10,
  locked: false,
  problemSize: 2,
  preferences: {
    m: [[0, 1], [0, 1]],
    w: [[0, 1], [0, 1]],
  },
  // solver
  unmatched: {
    m: [],
    w: [],
  },
  tentatives: [],
  rejections: [],
  // rejections[i][j] shows if man i has been rejected by woman j
  proposal: { man: -1, woman: -1 },
  solved: false,
  proposalCount: 0,
  message: '',
  messages: {
    disabled: () => 'Solver is currently disabled',
    empty: () => 'Click the blue button to perform the next step of the algorithm',
    propose: (man, woman) => `Man ${man + 1} proposes to Woman ${woman + 1}`,
    accept1: (man, woman) => `Woman ${woman + 1} is not tentatively matched so she accepts Man ${man + 1}'s proposal`,
    accept2: (man, woman, current) => `Woman ${woman + 1} prefers Man ${man + 1} to her current match (Man ${current + 1}), so she accepts`,
    reject: (man, woman, current) => `Woman ${woman + 1} prefers her current match (Man ${current + 1}) so she rejects Man ${man + 1}`,
    solved: () => 'All people are matched! The algorithm terminates.',
  },
  loadMessage: [],
  loadError: false,
};

export default new Vuex.Store({
  plugins,
  modules,
  state,
  getters,
  mutations,
  actions,
});
