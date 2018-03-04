/* eslint-disable */
import ClosestPairOfPoints from '@/store/modules/closest-pair-of-points/class';

function findPointsInStripTest(testName, { arr, shortest }, { number_of_points, indeces_sorted_by_y}) {
  describe(testName, () => {
    const cpop = new ClosestPairOfPoints(arr, 0); // the level doesn't matter here
    cpop.shortest = shortest;
    const strip = cpop.findPointsInStrip();
    it('should return the correct number of points', () => {
      const result = strip.length;
      expect(result).to.equal(number_of_points);
    });
    it('should sort the points by y-value before returning', () => {
      let result = '';
      for (let i = 0; i < strip.length; i++) {
        result += strip[i] + ' ';
      }
      expect(result).to.equal(indeces_sorted_by_y);
    });
  });
}

function divideTest(testName, { arr, level }, { left_half_size, right_half_size }){
  describe(testName, () => {
    const cpop = new ClosestPairOfPoints(arr, level);
    cpop.divide();
    it('should create two subproblems with a combined size equal to the original problem', () => {
      const result = cpop.leftHalf.size + cpop.rightHalf.size;
      expect(result).to.equal(cpop.size);
    });
    it('should create two subproblems that have all the same points as the original problem', () => {
      let result = '';
      result += ClosestPairOfPoints.printAllPoints(cpop.leftHalf.points);
      result += ', ';
      result += ClosestPairOfPoints.printAllPoints(cpop.rightHalf.points);
      const rightAnswer = ClosestPairOfPoints.printAllPoints(cpop.points);
      expect(result).to.equal(rightAnswer);
    });
    describe('The Left Subproblem:', () => {
      it('should be an instance of ClosestPairOfPoints', () => {
        const result = cpop.leftHalf instanceof ClosestPairOfPoints;
        expect(result).to.equal(true);
      });
      it('should have a level that is one more than the original problem\'s level', () => {
        const result = cpop.leftHalf.level;
        expect(result).to.equal(level + 1);
      });
      it('should have an integer size', () => {
        const result = cpop.leftHalf.size % 1;
        expect(result).to.equal(0);
      });
      it('should have a size half the size of the original problem (the bigger half if necessary)', () => {
        const result = cpop.leftHalf.size;
        expect(result).to.equal(left_half_size);
      });
      it('should have its last element be the median (by x-value) point', () => {
        const result = cpop.leftHalf.points[cpop.leftHalf.size - 1];
        const rightAnswer = cpop.points[cpop.medianIndex];
        expect(result).to.equal(rightAnswer);
      });
    });
    describe('The Right Subproblem:', () => {
      it('should be an instance of ClosestPairOfPoints', () => {
        const result = cpop.rightHalf instanceof ClosestPairOfPoints;
        expect(result).to.equal(true);
      });
      it('should have a level that is one more than the original problem\'s level', () => {
        const result = cpop.rightHalf.level;
        expect(result).to.equal(cpop.level + 1);
      });
      it('should have an integer size', () => {
        const result = cpop.rightHalf.size % 1;
        expect(result).to.equal(0);
      });
      it('should have a size half the size of the original problem (the smaller half if necessary)', () => {
        const result = cpop.rightHalf.size;
        expect(result).to.equal(right_half_size);
      });
      it('should have its first element be the median (by x-value) point', () => {
        const result = cpop.rightHalf.points[0];
        const rightAnswer = cpop.points[cpop.medianIndex + 1];
        expect(result).to.equal(rightAnswer);
      });
    });
  });
}

export {
  divideTest,
  findPointsInStripTest,
};
