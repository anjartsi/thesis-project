const stateObj = {
  unit: 60,
  min: 1,
  max: 10,
  locked: false,
  problemSize: 2,
  solved: false,
  // A message to be printed on the page
  // This is usually assigned a value from the messages Object
  message: '',
  messages: {
    default: 'Ready to start!',
  },
  loadMessage: [],
  loadError: false,
};

const getters = {
  editing(state) { return !state.locked; },
  solving(state) { return state.locked; },
};
const mutations = {
  lockUnlock(state) { state.locked = !state.locked; },
  changeProblemSize(state, payload) {
    let { n } = payload;
    const { max, min } = state;
    n = Math.min(max, n);
    n = Math.max(min, n);
    state.problemSize = n;
    return n;
  },
  loadStart(state) {
    state.loadMessage = [];
    state.loadError = false;
  },
  addLoadMessage(state, payload) {
    state.loadMessage.push(payload.msg);
    if (payload.err) {
      state.loadError = true;
    }
  },
};
const actions = {
  switchMode(context) {
    context.commit('lockUnlock');
    // Since a change has been made, reset the solver
    context.commit('resetSolver');
  },
};

export default {
  state: stateObj,
  getters,
  mutations,
  actions,
};
