import globals from '../../scripts/globalStore';

const actions = {
  updateProblemSize(context, payload) {
    if (context.getters.editing) {
      context.commit('changeProblemSize', payload);

      const listM = context.state.preferences.m;
      const listW = context.state.preferences.w;
      context.commit('checkNumRows', { arr: listM });
      context.commit('checkNumRows', { arr: listW });
      for (let i = 0; i < context.state.problemSize; i++) {
        context.commit('checkPreferenceRow', { arr: listM[i] });
        context.commit('checkPreferenceRow', { arr: listW[i] });
      }
    }
  }, // end updateProblemSize
  swap(context, payload) {
    if (context.getters.editing) {
      context.commit('swapPreferenceBoxes', payload);
    }
  }, // end swap
  proposeDispose(context, payload) {
    if (context.getters.solving && context.state.unmatched.m.length > 0) {
      // Get proposing man from parameter
      let { proposingMan } = payload;
      if (proposingMan === undefined) return;
      // If a man had proposed previously, don't change the proposal.man
      if (context.state.proposal.man !== -1) proposingMan = context.state.proposal.man;
      // Get proposed-to woman from getters (his next preferred)
      const proposedToWoman = context.getters.getProposal(proposingMan);
      // If a proposal hasn't been made yet, make a proposal
      if (context.state.proposal.woman === -1) {
        context.commit('propose', { proposingMan, proposedToWoman });
      } else {
        // if a proposal has been made, get the woman's response
        const currentMatch = context.getters.getCurrentMatch;
        if (context.getters.getResponse) {
          context.commit('acceptProposal', { currentMatch });
          context.commit('removeFromUnmatched', { gender: 'm', person: proposingMan });
          context.commit('removeFromUnmatched', { gender: 'w', person: proposedToWoman });
          if (currentMatch > -1) {
            context.commit('breakUp', { man: currentMatch, woman: context.state.proposal.woman });
            context.commit('addToUnmatched', { gender: 'm', person: currentMatch });
          }
        } else {
          context.commit('rejectProposal', { currentMatch });
        }
        // reset state.proposal for next iteration
        context.commit('proposalFinished');
      }
    } // end if(solving)
    if (context.state.unmatched.m.length === 0) {
      context.commit('problemSolved');
    }
  }, // end proposeDispose
  loadFile(context, payload) {
    context.commit('loadStart');
    const text = payload.loadText.trim();
    const pref = { m: [], w: [] };
    let valid = true;
    let msg = '';
    if (text.length === 0) return;
    // split the text by line
    let rows = text.split('\n');
    // if a line is empty, it ignore it
    rows = rows.filter((row) => row.trim().length > 0);
    // there should be an even number of rows
    valid = rows.length % 2 === 0;
    if (!valid) {
      msg = `Error - Expected even number of nonempty rows, but received ${rows.length} nonempty rows`;
      context.commit('addLoadMessage', { err: true, msg });
      return;
    }
    const n = rows.length / 2;
    // if n is not found in the text, then it is zero-indexed
    const zeroIndex = (text.indexOf(n) > -1) ? 1 : 0;
    // Put values into 2 2-D arrays inside prefs object
    rows.map((row, index) => {
      // Turn the string into array of numbers
      let nums = row.trim().split(/\s+/);
      nums = nums.map((val) => val - zeroIndex);
      if (index < n) {
        // the first n lines are the men
        pref.m.push(nums);
      } else if (index < 2 * n) {
        // the next n lines are the women
        pref.w.push(nums);
      }
      return row;
    });

    let list = 'Men';
    function checkNumbers(row, index) {
      let correct = true;
      // Each number in the list is between 0 and (len - 1)
      // Also check to see if there is the correct number of elements
      correct = row.filter((val) => val < n && val >= 0).length === n;
      if (!correct) {
        msg = `Error: ${list}'s Row# ${index + 1}`;
        context.commit('addLoadMessage', { err: true, msg });
      }
      valid = valid && correct;
      return valid;
    }
    pref.m.map(checkNumbers);
    list = 'Women';
    pref.w.map(checkNumbers);
    if (valid) {
      context.commit('changeProblemSize', { n });
      context.commit('loadPrefs', { pref });
      context.commit('resetSolver');
    }
  }, // end loadFile
};

Object.assign(actions, globals.actions);
export default actions;
