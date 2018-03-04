/* eslint-disable */
import { getters, mutations, actions } from '@/store/modules/interval-scheduling/index';

// const getters = storeGetters;

describe('Interval Scheduling Store==============================', () => {
  /* *******************************************************
  *******************   GETTERS   **************************
  ******************************************************* */
  describe('Getters---------------', () => {
    describe('getInterval', () => {
      it('should return the correct interval (0) when given a correct index', () => {
        const state = {
          problemSize: 3,
          intervals: [
            { start: 0, finish: 3, row: 0 },
            { start: 1, finish: 2, row: 1 },
            { start: 3, finish: 5, row: 0 },
          ],
        };
        const result = getters.getInterval(state)(0);
        expect(result).to.deep.equal({ start: 0, finish: 3, row: 0 });
      });
      it('should return the correct interval (2) when given a correct index', () => {
        const state = {
          problemSize: 3,
          intervals: [
            { start: 0, finish: 3, row: 0 },
            { start: 1, finish: 2, row: 1 },
            { start: 3, finish: 5, row: 0 },
          ],
        };
        const result = getters.getInterval(state)(2);
        expect(result).to.deep.equal({ start: 3, finish: 5, row: 0 });
      });
      it('should return -1 when given an incorrect index', () => {
        const state = {
          problemSize: 3,
          intervals: [
            { start: 0, finish: 3, row: 0 },
            { start: 1, finish: 2, row: 1 },
            { start: 3, finish: 5, row: 0 },
          ],
        };
        const result = getters.getInterval(state)(3);
        expect(result).to.deep.equal(-1);
      });
    });
    describe('getCollision', () => {
      it('should return true when two intervals collide', () => {
        const state = {
          problemSize: 3,
          intervals: [
            { start: 0, finish: 3, row: 0 },
            { start: 1, finish: 2, row: 1 },
            { start: 3, finish: 5, row: 0 },
          ],
        };
        const result = getters.getCollision(state)(0, 1);
        expect(result).to.deep.equal(true);
      });
      it('should return true when two intervals collide', () => {
        const state = {
          problemSize: 3,
          intervals: [
            { start: 0, finish: 3, row: 0 },
            { start: 1, finish: 2, row: 1 },
            { start: 3, finish: 5, row: 0 },
          ],
        };
        const result = getters.getCollision(state)(1, 0);
        expect(result).to.deep.equal(true);
      });
      it('should return false when the intervals don\'t collide', () => {
        const state = {
          problemSize: 3,
          intervals: [
            { start: 0, finish: 3, row: 0 },
            { start: 1, finish: 2, row: 1 },
            { start: 3, finish: 5, row: 0 },
          ],
        };
        const result = getters.getCollision(state)(0, 2);
        expect(result).to.deep.equal(false);
      });
    });
    describe('fitsInRow', () => {
      it('should return true if a given interval fits in the given row', () => {
        const state = {
          problemSize: 3,
          intervals: [
            { start: 0, finish: 3, row: 0 },
            { start: 1, finish: 2, row: 1 },
            { start: 3, finish: 5 },
          ],
          rows: [
            [0],
            [1],
          ],
        };
        const mockGetters = {
          getCollision: getters.getCollision(state),
        };
        const result = getters.fitsInRow(state, mockGetters)(2, 0);
        expect(result).to.deep.equal(true);
      });
      it('should return true even if the given interval is already in the row', () => {
        const state = {
          problemSize: 3,
          intervals: [
            { start: 0, finish: 3, row: 0 },
            { start: 1, finish: 2, row: 1 },
            { start: 3, finish: 5, row: 0 },
          ],
          rows: [
            [0, 2],
            [1],
          ],
        };
        const mockGetters = {
          getCollision: getters.getCollision(state),
        };
        const result = getters.fitsInRow(state, mockGetters)(2, 0);
        expect(result).to.deep.equal(true);
      });
      it('should return false when a given interval collides with another in the row', () => {
        const state = {
          problemSize: 3,
          intervals: [
            { start: 0, finish: 3, row: 0 },
            { start: 3, finish: 5, row: 0 },
            { start: 1, finish: 2, row: 1 },
          ],
          rows: [
            [0, 1],
          ],
        };
        const mockGetters = {
          getCollision: getters.getCollision(state),
        };
        const result = getters.fitsInRow(state, mockGetters)(2, 0);
        expect(result).to.deep.equal(false);
      });
    });

    describe('getRowThatFits', () => {
      it('should return the emptiest row possible where an interval fits (0)', () => {
        const state = {
          problemSize: 3,
          intervals: [
            { start: 0, finish: 3, row: 0 },
            { start: 1, finish: 2, row: 1 },
            { start: 3, finish: 5, row: 0 },
          ],
          rows: [
            [0, 2],
            [1],
          ],
        };
        const mockGetters1 = {
          getCollision: getters.getCollision(state),
        };
        const mockGetters2 = {
          fitsInRow: getters.fitsInRow(state, mockGetters1),
        };
        const result = getters.getRowThatFits(state, mockGetters2)(2);
        expect(result).to.deep.equal(1);
      });
      it('should return the smallest row possible where an interval fits (1)', () => {
        const state = {
          problemSize: 3,
          intervals: [
            { start: 0, finish: 3, row: 0 },
            { start: 1, finish: 2, row: 1 },
            { start: 3, finish: 5, row: 0 },
          ],
          rows: [
            [0, 2],
            [1],
          ],
        };
        const mockGetters1 = {
          getCollision: getters.getCollision(state),
        };
        const mockGetters2 = {
          fitsInRow: getters.fitsInRow(state, mockGetters1),
        };
        const result = getters.getRowThatFits(state, mockGetters2)(1);
        expect(result).to.deep.equal(1);
      });
      it('should return the next available row when the inteval doesn\'t fit in any of the current rows (1)', () => {
        const state = {
          problemSize: 3,
          intervals: [
            { start: 0, finish: 3, row: 0 },
            { start: 1, finish: 2, row: 1 },
            { start: 3, finish: 5, row: 0 },
          ],
          rows: [
            [0, 2],
          ],
        };
        const mockGetters1 = {
          getCollision: getters.getCollision(state),
        };
        const mockGetters2 = {
          fitsInRow: getters.fitsInRow(state, mockGetters1),
        };
        const result = getters.getRowThatFits(state, mockGetters2)(1);
        expect(result).to.deep.equal(1);
      });
    });
  }); // end getters
  /* *******************************************************
  ******************   MUTATIONS   *************************
  ******************************************************* */
  describe('Mutations---------------', () => {
    describe('createInterval', () => { });
    describe('destroyInterval', () => { });
    describe('changeInterval', () => { });
    describe('createNewRow', () => { });
    describe('addIntervalToRow', () => { });
    describe('resetSolver', () => { });
    describe('changeProblemSize', () => { });
    describe('', () => { });

  }); // end mutations
  /* *******************************************************
  *******************   ACTIONS   **************************
  ******************************************************* */
  describe('Actions---------------', () => {});
});
