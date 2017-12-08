import globals from '../../scripts/globalStore';

const state = {};
// copy the global state values into state
Object.assign(state, globals.state);
// instance maker
state.preferences = {
  m: [[0, 1], [0, 1]],
  w: [[0, 1], [0, 1]],
};
// solver
state.unmatched = {
  m: [],
  w: [],
};
state.tentatives = [];
state.rejections = [];
// rejections[i][j] shows if man i has been rejected by woman j
state.proposal = { man: -1, woman: -1 };
state.proposalCount = 0;
state.messages = {
  disabled: () => 'Solver is currently disabled',
  empty: () => 'Click the blue button to perform the next step of the algorithm',
  propose: (man, woman) => `Man ${man + 1} proposes to Woman ${woman + 1}`,
  accept1: (man, woman) => `Woman ${woman + 1} is not tentatively matched so she accepts Man ${man + 1}'s proposal`,
  accept2: (man, woman, current) => `Woman ${woman + 1} prefers Man ${man + 1} to her current match (Man ${current + 1}), so she accepts`,
  reject: (man, woman, current) => `Woman ${woman + 1} prefers her current match (Man ${current + 1}) so she rejects Man ${man + 1}`,
  solved: () => 'All people are matched! The algorithm terminates.',
};

export default state;
