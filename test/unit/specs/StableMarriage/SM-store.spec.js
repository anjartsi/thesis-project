import { getters, mutations, actions } from '@/components/stable-marriage/store';
// eslint-disable
const state3 = {
  problemSize: 3,
  preferences: {
    m: [[0, 1, 2], [0, 1, 2], [0, 1, 2]],
    w: [[0, 1, 2], [0, 1, 2], [0, 1, 2]],
  },
};

const state3mixed = {
  problemSize: 3,
  preferences: {
    m: [[0, 1, 2], [0, 2, 1], [1, 0, 2]],
    w: [[1, 2, 0], [2, 0, 1], [2, 1, 0]],
  },
};

describe('Stable Marriage Store', () => {
  /* *******************************************************
  *******************   GETTERS   **************************
  ******************************************************* */
  describe('Getters', () => {
    describe('getPreferenceList', () => {
      it('should return correct preference list for a man', () => {
        // mock state
        const state = Object.assign({}, state3mixed);
        // get the result from the getter
        const result = getters.getPreferenceList(state)('m', 1);
        // assert the result
        expect(result).to.deep.equal([0, 2, 1]);
      });
      it('should return correct list for a woman', () => {
        // mock state
        const state = Object.assign({}, state3mixed);
        const result = getters.getPreferenceList(state)('w', 2);
        expect(result).to.deep.equal([2, 1, 0]);
      });
      it('should return empty array if number is too large', () => {
        // mock state
        const state = Object.assign({}, state3mixed);
        const result = getters.getPreferenceList(state)('m', 3);
        expect(result).to.deep.equal([]);
      });
      it('should return empty array if number is negative', () => {
        // mock state
        const state = Object.assign({}, state3mixed);
        const result = getters.getPreferenceList(state)('m', -1);
        expect(result).to.deep.equal([]);
      });
      it('should return empty array if number is undefined', () => {
        // mock state
        const state = Object.assign({}, state3mixed);
        const result = getters.getPreferenceList(state)('m');
        expect(result).to.deep.equal([]);
      });
      it('should return empty array if person is undefined', () => {
        // mock state
        const state = Object.assign({}, state3mixed);
        const result = getters.getPreferenceList(state)();
        expect(result).to.deep.equal([]);
      });
      it('should return empty array if gender is uppercase', () => {
        // mock state
        const state = Object.assign({}, state3mixed);
        const result = getters.getPreferenceList(state)('M', 3);
        expect(result).to.deep.equal([]);
      });
      it('should return empty array if gender is wrong', () => {
        // mock state
        const state = Object.assign({}, state3mixed);
        const result = getters.getPreferenceList(state)('d', 3);
        expect(result).to.deep.equal([]);
      });
    }); // end getPreferenceList
    describe('getPreference', () => {
      // mock state
      const state = Object.assign({}, state3mixed);
      // AO - this is how you fix the nested getters issue
      const mockGetters = {
        getPreferenceList: getters.getPreferenceList(state),
      };
      it('should return the correct preference', () => {
        const result = getters.getPreference(state, mockGetters)('m', 0, 0);
        expect(result).to.deep.equal(0);
      });
      it('should return -1 if the choice is too high', () => {
        const result = getters.getPreference(state, mockGetters)('m', 0, 3);
        expect(result).to.deep.equal(-1);
      });
      it('should return -1 if the choice is negative', () => {
        const result = getters.getPreference(state, mockGetters)('m', 0, -1);
        expect(result).to.deep.equal(-1);
      });
      it('should return -1 if the person is too high', () => {
        const result = getters.getPreference(state, mockGetters)('m', 5, 0);
        expect(result).to.deep.equal(-1);
      });
      it('should return -1 if the person is negative', () => {
        const result = getters.getPreference(state, mockGetters)('m', -1, 0);
        expect(result).to.deep.equal(-1);
      });
      it('should return -1 if the gender is incorrect', () => {
        const result = getters.getPreference(state, mockGetters)('0', 0, 0);
        expect(result).to.deep.equal(-1);
      });
      it('should return -1 if the gender is uppercase', () => {
        const result = getters.getPreference(state, mockGetters)('M', 0, 0);
        expect(result).to.deep.equal(-1);
      });
    });// end getPreference
    describe('getProposal', () => {
      const state = Object.assign({}, state3);
      const mockGetters = {
        getPreferenceList: getters.getPreferenceList(state),
      };
      state.rejections = [
        [false, false, false],
        [false, false, false],
        [false, false, false],
      ];
      it('should return 0 when nobody has rejected a man', () => {
        const result = getters.getProposal(state, mockGetters)(0);
        expect(result).to.deep.equal(0);
      });
      it('should return 1 when the first choice has rejected a man', () => {
        state.rejections[0][0] = true;
        const result = getters.getProposal(state, mockGetters)(0);
        expect(result).to.deep.equal(1);
      });
      it('should return 2 when the first 2 choices has rejected a man', () => {
        state.rejections[0][0] = true;
        state.rejections[0][1] = true;
        const result = getters.getProposal(state, mockGetters)(0);
        expect(result).to.deep.equal(2);
      });
      it('should return -1 when the man is negative', () => {
        const result = getters.getProposal(state, mockGetters)(-1);
        expect(result).to.deep.equal(-1);
      });
      it('should return -1 when the man is too large', () => {
        const result = getters.getProposal(state, mockGetters)(3);
        expect(result).to.deep.equal(-1);
      });
    }); // end getProposal
    describe('getCurrentMatch', () => {
      const state = Object.assign({}, state3);
      state.tentatives = [
        { man: 0, woman: 0 },
        { man: 1, woman: 1 },
      ];
      it('should return -1 if a woman is unmatched', () => {
        state.proposal = { man: 2, woman: 2 };
        const result = getters.getCurrentMatch(state);
        expect(result).to.deep.equal(-1);
      });
      it('should return correct index if a woman is tentatively matched', () => {
        state.proposal = { man: 2, woman: 0 };
        const result = getters.getCurrentMatch(state);
        expect(result).to.deep.equal(0);
      });
    }); // end getCurrentMatch
    describe('getResponse', () => {
      const state = Object.assign({}, state3);
      const mockGetters = {};
      it('should return true if the woman has no currentMatch', () => {
        state.proposal = { man: 0, woman: 0 };
        state.tentatives = [
          { man: 1, woman: 1 },
        ];
        mockGetters.getCurrentMatch = getters.getCurrentMatch(state);
        const result = getters.getResponse(state, mockGetters);
        expect(result).to.deep.equal(true);
      });
      it('should return true if the woman prefers this man over her current match', () => {
        state.proposal = { man: 0, woman: 0 };
        mockGetters.getCurrentMatch = getters.getCurrentMatch(state);
        state.tentatives = [
          { man: 1, woman: 0 },
        ];
        const result = getters.getResponse(state, mockGetters);
        expect(result).to.deep.equal(true);
      });
      it('should return false if the woman prefers her current match over this man', () => {
        state.proposal = { man: 1, woman: 0 };
        state.tentatives = [
          { man: 0, woman: 0 },
        ];
        mockGetters.getCurrentMatch = getters.getCurrentMatch(state);
        const result = getters.getResponse(state, mockGetters);
        expect(result).to.deep.equal(false);
      });
    }); // end getResponse
  }); // end getters
  /* *******************************************************
  ******************   MUTATIONS   *************************
  ******************************************************* */
  describe('Mutations', () => {
    describe('checkNumRows', () => {
      it('should do nothing if an array has length equal to state.problemSize', () => {
        const state = {
          problemSize: 3,
        };
        const arr = [[], [], []];
        // call the mutation
        mutations.checkNumRows(state, { arr });
        expect(arr).to.deep.equal([[], [], []]);
      });
      it('should remove extra elements if the array has too many', () => {
        const state = {
          problemSize: 3,
        };
        const arr = [[], [], [], []];
        // call the mutation
        mutations.checkNumRows(state, { arr });
        expect(arr).to.deep.equal([[], [], []]);
      });
      it('should add empty arrays at the end if the array has too few elements', () => {
        const state = {
          problemSize: 3,
        };
        const arr = [[], []];
        // call the mutation
        mutations.checkNumRows(state, { arr });
        expect(arr.length).to.deep.equal(state.problemSize);
      });
    });
    describe('checkPreferenceRow', () => {
      it('should do nothing if a given array has all the numbers in [0, state.problemSize)', () => {
        const state = { problemSize: 3 };
        const arr = [0, 1, 2];
        const arrCopy = arr.slice();
        // call the mutation
        mutations.checkPreferenceRow(state, { arr });
        expect(arr).to.deep.equal(arrCopy);
      });
      it('should do nothing if when the numbers are correct but out of order', () => {
        const state = { problemSize: 3 };
        const arr = [2, 0, 1];
        const arrCopy = arr.slice(); // copy the array (by value)
        // call the mutation
        mutations.checkPreferenceRow(state, { arr });
        expect(arr).to.deep.equal(arrCopy);
      });
      it('should remove any numbers that are n_i >= state.problemSize', () => {
        const state = { problemSize: 3 };
        const arr = [2, 0, 1, 3];
        // call the mutation
        mutations.checkPreferenceRow(state, { arr });
        expect(arr).to.deep.equal([2, 0, 1]);
      });
      it('should add any missing numbers that are n_i < state.problemSize', () => {
        const state = { problemSize: 3 };
        const arr = [1, 0];
        // call the mutation
        mutations.checkPreferenceRow(state, { arr });
        expect(arr).to.deep.equal([1, 0, 2]);
      });
    });
    describe('swapPreferenceBoxes', () => {});
    describe('propose', () => { });
    describe('acceptProposal', () => { });
    describe('state', () => { });
    describe('rejectProposal', () => { });
    describe('breakUp', () => { });
    describe('addToUnmatched', () => { });
    describe('removeFromUnmatched', () => { });
    describe('proposalFinished', () => { });
    describe('resetSolver', () => { });
    describe('problemSolved', () => { });
    describe('loadPrefs', () => { });
    describe('addLoadMessage', () => { });
    describe('loadStart', () => { });
  }); // end mutations
  /* *******************************************************
  *******************   ACTIONS   **************************
  ******************************************************* */
  describe('Actions', () => {
  });
});
