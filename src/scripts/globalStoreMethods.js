function editing(state) { return !state.locked; }
function solving(state) { return state.locked; }
function lockUnlock(state) { state.locked = !state.locked; }
function changeProblemSize(state, payload) {
  let { n } = payload;
  const { max, min } = state;
  n = Math.min(max, n);
  n = Math.max(min, n);
  state.problemSize = n;
  return n;
}
function switchMode(context) {
  context.commit('lockUnlock');
  // Since a change has been made, reset the solver
  context.commit('resetSolver');
}

export default {
  editing,
  solving,
  lockUnlock,
  changeProblemSize,
  switchMode,
};
