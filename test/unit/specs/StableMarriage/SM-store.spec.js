import { getters, mutations, actions } from '@/components/stable-marriage/store';
// eslint-disable
const state1 = {
  problemSize: 1,
  preferences: {
    m: [[0]],
    w: [[0]],
  },
};

const state2 = {
  problemSize: 2,
  preferences: {
    m: [[0, 1], [0, 1]],
    w: [[0, 1], [0, 1]],
  },
};

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
  describe('getters', () => {
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
      it('should return correct proposal', () => {
        const result = getters.getProposal(state, mockGetters)(0);
        expect(result).to.deep.equal(0);
      });
    });
  }); // end getters
  describe('mutations', () => {
  });
  describe('actions', () => {
  });
});
