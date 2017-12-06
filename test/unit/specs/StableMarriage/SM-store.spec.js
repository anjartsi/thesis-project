import store from '@/components/stable-marriage/store';
import getters from '@/components/stable-marriage/store-getters';
import mutations from '@/components/stable-marriage/store-mutations';
import actions from '@/components/stable-marriage/store-actions';

describe('Stable Marriage Store Getters', () => {
  it('should return the correct preference list', () => {
    // mock state
    const state = {
      preferences: {
        m: [[0, 1, 2], [0, 2, 1], [0, 1, 2]],
        w: [[0, 1, 2], [0, 1, 2], [0, 1, 2]],
      },
    };

    // get the result from the getter
    const result = getters.getPreferenceList(state)('m', 1);

    // assert the result
    expect(result).to.deep.equal([0, 2, 1]);
  });
});
