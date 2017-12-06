import globals from '../../scripts/globalStoreMethods';

export default {
  editing: globals.editing,
  solving: globals.solving,
  getPreferenceList(state) {
    // E.G. Get the preference list of man 3
    return (gender, person) => state.preferences[gender][person];
  }, // end getPreferenceList
  getPreference(state, getters) {
    // E.G. Who is man 3's second choice?
    return (gender, person, choice) => {
      const arr = getters.getPreferenceList(gender, person);
      return arr[choice];
    };
  }, // end getPreference
  getProposal(state, getters) {
    return (proposingMan) => {
      const list = getters.getPreferenceList('m', proposingMan);
      const rejectedBy = state.rejections[proposingMan];
      let index = 0;
      let woman;
      let rejected = true;
      while (rejected) {
        // Find the next woman on his preference list
        // who has not yet rejected him
        woman = list[index];
        rejected = rejectedBy[woman];
        index++;
      }
      return woman;
    };
  }, // end getProposal
  getResponse(state, getters) {
    const herPref = state.preferences.w[state.proposal.woman];
    const currentMatch = getters.getCurrentMatch;
    // she prefers her current match
    if (currentMatch === -1) {
      return true;
    } else if (herPref.indexOf(currentMatch) < herPref.indexOf(state.proposal.man)) {
      return false;
    }
    return true;
  }, // end getResponse
  getCurrentMatch(state) {
    let currentMatch = -1;
    for (let i = 0; i < state.tentatives.length; i++) {
      // If she is tentatively matched
      if (state.tentatives[i].woman === state.proposal.woman) {
        currentMatch = state.tentatives[i].man;
      }
    } // end for(i)
    return currentMatch;
  }, // end getCurrentMatch
};
