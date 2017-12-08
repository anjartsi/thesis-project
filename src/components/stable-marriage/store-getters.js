import globals from '../../scripts/globalStore';

const storeGetters = {};
Object.assign(storeGetters, globals.getters);
storeGetters.getPreferenceList = (state) => (gender, person) => {
  // E.G. Get the preference list of man 3
  if (person >= state.problemSize || person < 0 || person === undefined) {
    return [];
  } else if (!(gender === 'm' || gender === 'w')) {
    return [];
  }
  return state.preferences[gender][person];
}; // end getPreferenceList

storeGetters.getPreference = (state, getters) => (gender, person, choice) => {
  // E.G. Who is man 3's second choice?
  const arr = getters.getPreferenceList(gender, person);
  // If arr is empty that means getPreferenceList found an error
  if (arr.length === 0) {
    return -1;
  } else if (choice < 0 || choice >= state.problemSize) {
    return -1;
  }
  return arr[choice];
}; // end getPreference
storeGetters.getProposal = (state, getters) => (proposingMan) => {
  const list = getters.getPreferenceList('m', proposingMan);
  // If getPreferenceList found an error, return
  if (list.length === 0) {
    return -1;
  }
  const rejectedBy = state.rejections[proposingMan];
  let index = 0;
  let woman = -1;
  let rejected = true;
  while (rejected) {
    // Find the next woman on his preference list
    // who has not yet rejected him
    woman = list[index];
    rejected = rejectedBy[woman];
    index++;
  }
  return woman;
}; // end getProposal
storeGetters.getResponse = (state, getters) => {
  const herPref = state.preferences.w[state.proposal.woman];
  const currentMatch = getters.getCurrentMatch;
  // she prefers her current match
  if (currentMatch === -1) {
    return true;
  } else if (herPref.indexOf(currentMatch) < herPref.indexOf(state.proposal.man)) {
    return false;
  }
  return true;
}; // end getResponse
storeGetters.getCurrentMatch = (state) => {
  let currentMatch = -1;
  for (let i = 0; i < state.tentatives.length; i++) {
    // If she is tentatively matched
    if (state.tentatives[i].woman === state.proposal.woman) {
      currentMatch = state.tentatives[i].man;
    }
  } // end for(i)
  return currentMatch;
}; // end getCurrentMatch

export default storeGetters;
