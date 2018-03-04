import globals from '@/store/modules/global/index';

describe('Global Store', () => {
  describe('Getters', () => {
    describe('editing', () => {
      it('should return false when the state is locked', () => {
        const state = { locked: true };
        const result = globals.getters.editing(state);
        expect(result).to.deep.equal(false);
      });
      it('should return true when the state is not locked', () => {
        const state = { locked: false };
        const result = globals.getters.editing(state);
        expect(result).to.deep.equal(true);
      });
    });
    describe('solving', () => {
      it('should return true when the state is locked', () => {
        const state = { locked: true };
        const result = globals.getters.solving(state);
        expect(result).to.deep.equal(true);
      });
      it('should return false when the state is not locked', () => {
        const state = { locked: false };
        const result = globals.getters.solving(state);
        expect(result).to.deep.equal(false);
      });
    });
  });
  describe('Mutations', () => {
    describe('lockUnlock', () => {
      it('should switch state.locked from true to false', () => {
        const state = { locked: true };
        globals.mutations.lockUnlock(state);
        expect(state.locked).to.deep.equal(false);
      });
      it('should switch state.locked from false to true', () => {
        const state = { locked: false };
        globals.mutations.lockUnlock(state);
        expect(state.locked).to.deep.equal(true);
      });
    });
    describe('changeProblemSize', () => {
      const state = {
        problemSize: 0,
        max: 10,
        min: 0,
      };
      it('should change the problemSize to the given number', () => {
        const n = 10;
        globals.mutations.changeProblemSize(state, { n });
        expect(state.problemSize).to.deep.equal(n);
      });
      it('should change the problemSize to the min if the given number is too small', () => {
        const n = -10;
        globals.mutations.changeProblemSize(state, { n });
        expect(state.problemSize).to.deep.equal(state.min);
      });
      it('should change the problemSize to the max if the given number is too large ', () => {
        const n = 100;
        globals.mutations.changeProblemSize(state, { n });
        expect(state.problemSize).to.deep.equal(state.max);
      });
    });
  });
  describe('Actions', () => {
    describe('switchMode', () => {
      it('does not require testing', () => {});
    });
  });
});
