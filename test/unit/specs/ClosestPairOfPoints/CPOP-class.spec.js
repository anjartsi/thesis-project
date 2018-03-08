/* eslint-disable */
import ClosestPairOfPoints from '@/store/modules/closest-pair-of-points/./CPOP-class';
import helpers from './CPOP-class-test-helpers';
// const getters = storeGetters;

describe('Class: ClosestPairOfPoints:', () => {
  describe('Constructor:', () => {
    describe('Creates Properties:', () => {
      describe('points(array of Objects): should have an array with the same length as the parameter array:', () => {
        it('with 0 elements', () => {
          const arr = [];
          const cpop = new ClosestPairOfPoints(arr, 0);
          const result = cpop.points.length;
          expect(result).to.equal(0);
        });
        it('with 3 elements', () => {
          const arr = [
            { x: 0, y: 0 },
            { x: 10, y: 0 },
            { x: 0, y: 10 },
          ]
          const cpop = new ClosestPairOfPoints(arr, 0);
          const result = cpop.points.length;
          expect(result).to.equal(3);
        });
        it('with 100 elements', () => {
          const arr = [];
          for (let i = 0; i < 100; i++) {
            arr.push({x: i, y: 10 * i });
          }
          const cpop = new ClosestPairOfPoints(arr, -1);
          const result = cpop.points.length;
          expect(result).to.equal(100);
        });
      });
      describe('level(number): should have the level stated by the parameter:', () => {
        it('when level = 0', () => {
          const result = new ClosestPairOfPoints([], 0).level;
          expect(result).to.equal(0);
        });
        it('when level = -1', () => {
          const result = new ClosestPairOfPoints([], -1).level;
          expect(result).to.equal(-1);
        });
        it('when level = 3', () => {
          const result = new ClosestPairOfPoints([], 3).level;
          expect(result).to.equal(3);
        });
        it('when level = 100', () => {
          const result = new ClosestPairOfPoints([], 100).level;
          expect(result).to.equal(100);
        });
      });
      describe('size(integer): should have the number of elements of the input array:', () => {
        it('with 0 elements', () => {
          const arr = [];
          const cpop = new ClosestPairOfPoints(arr, 0);
          const result = cpop.size;
          expect(result).to.equal(0);
        });
        it('with 3 elements', () => {
          const arr = [
            { x: 0, y: 0 },
            { x: 10, y: 0 },
            { x: 0, y: 10 },
          ]
          const cpop = new ClosestPairOfPoints(arr, 0);
          const result = cpop.size;
          expect(result).to.equal(3);
        });
        it('with 100 elements', () => {
          const arr = [];
          for (let i = 0; i < 100; i++) {
            arr.push({ x: i, y: 10 * i });
          }
          const cpop = new ClosestPairOfPoints(arr, -1);
          const result = cpop.size;
          expect(result).to.equal(100);
        });
      });
      describe('medianIndex(integer): should be the index of the middle point of the input array:', () => {
        it('with 0 elements --> medianIndex should be null', () => {
          const arr = [];
          const cpop = new ClosestPairOfPoints(arr, 0);
          const result = cpop.medianIndex;
          expect(result).to.equal(null);
        });
        it('with 1 element', () => {
          const arr = [
            { x: 0, y: 0 },
          ]
          const cpop = new ClosestPairOfPoints(arr, 0);
          const result = cpop.medianIndex;
          expect(result).to.equal(0);
        });
        it('with 2 elements', () => {
          const arr = [
            { x: 0, y: 0 },
            { x: 10, y: 0 },
          ]
          const cpop = new ClosestPairOfPoints(arr, 0);
          const result = cpop.medianIndex;
          expect(result).to.equal(0);
        });
        it('with 3 elements', () => {
          const arr = [
            { x: 0, y: 0 },
            { x: 10, y: 0 },
            { x: 0, y: 10 },
          ]
          const cpop = new ClosestPairOfPoints(arr, 0);
          const result = cpop.medianIndex;
          expect(result).to.equal(1);
        });
        it('with 100 elements', () => {
          const arr = [];
          for (let i = 0; i < 100; i++) {
            arr.push({ x: i, y: 10 * i });
          }
          const cpop = new ClosestPairOfPoints(arr, -1);
          const result = cpop.medianIndex;
          expect(result).to.equal(49);
        });
      });
    });
  }); // end Constructor
  describe('calculateDistance:', () =>{
    it('returns null when the first index is too large', () => {
      const arr = [
        { x: 5, y: 5 },
      ]
      const cpop = new ClosestPairOfPoints(arr, 0);
      const result = cpop.calculateDistance(10, 0);
      expect(result).to.equal(null);
    });
    it('returns null when the second index is too large', () => {
      const arr = [
        { x: 5, y: 5 },
      ]
      const cpop = new ClosestPairOfPoints(arr, 0);
      const result = cpop.calculateDistance(0, 3);
      expect(result).to.equal(null);
    }); 
    it('returns null when the first index is negative', () => {
      const arr = [
        { x: 5, y: 5 },
      ]
      const cpop = new ClosestPairOfPoints(arr, 0);
      const result = cpop.calculateDistance(-1, 0);
      expect(result).to.equal(null);
    });
    it('returns null when the second index is negative', () => {
      const arr = [
        { x: 5, y: 5 },
      ]
      const cpop = new ClosestPairOfPoints(arr, 0);
      const result = cpop.calculateDistance(0, -3);
      expect(result).to.equal(null);
    });
    it('should return the correct distance between a point and itself is 0', () => {
      const arr = [
        { x: 5, y: 5 },
      ]
      const cpop = new ClosestPairOfPoints(arr, 0);
      const result = cpop.calculateDistance(0, 0);
      expect(result).to.equal(0);
    }); 
    it('should return the correct distance between two identical points is 0', () => {
      const arr = [
        { x: 5, y: 5 },
        { x: 5, y: 5 },
      ]
      const cpop = new ClosestPairOfPoints(arr, 0);
      const result = cpop.calculateDistance(0, 1);
      expect(result).to.equal(0);
    });
    it('should return the correct distance between two points with the same x-value', () => {
      const arr = [
        { x: 5, y: 5 },
        { x: 5, y: 100 },
      ]
      const cpop = new ClosestPairOfPoints(arr, 0);
      const result = cpop.calculateDistance(0, 1);
      expect(result).to.equal(95);
    });
    it('should return the correct distance between two points with the same y-value', () => {
      const arr = [
        { x: 50, y: 100 },
        { x: 5, y: 100 },
      ]
      const cpop = new ClosestPairOfPoints(arr, 0);
      const result = cpop.calculateDistance(0, 1);
      expect(result).to.equal(45);
    });
    it('should return the correct distance between two points with different x- and y-values', () => {
      const arr = [
        { x: 0, y: 0 },
        { x: 3, y: 4 },
      ]
      const cpop = new ClosestPairOfPoints(arr, 0);
      const result = cpop.calculateDistance(0, 1);
      // 3^2 + 4^2 = 5^2
      expect(result).to.equal(5);
    });
    it('should return the correct distance between two points with different x- and y-values', () => {
      const arr = [
        { x: 5, y: 5 },
        { x: 50, y: 100 },
      ]
      const cpop = new ClosestPairOfPoints(arr, 0);
      const result = cpop.calculateDistance(0, 1);
      // 45^2 + 95^2 = 11050
      expect(result).to.equal(Math.sqrt(11050));
    });
    it('should return the same result if the order of the points is switched', () => {
      const arr = [
        { x: 5, y: 5 },
        { x: 50, y: 100 },
      ]
      const cpop = new ClosestPairOfPoints(arr, 0);
      const result1 = cpop.calculateDistance(0, 1);
      const result2 = cpop.calculateDistance(1, 0);
      expect(result1).to.equal(result2);
    });
  }); // end calculateDistance
  describe('seeIfShortest', () => {
    const arr = [
      { x: 0, y: 0 },
      { x: 1, y: 1 },
      { x: 10, y: 10 },
    ]
    helpers.seeIfShortestTest('Case A: first index negative',
      { arr, i: -1, j: 1, shortest: 5 },
      { return_value: false, shortest_distance: 5, point_a: null, point_b: null }
    );
    helpers.seeIfShortestTest('Case B: first index out of bounds',
      { arr, i: 10, j: 0, shortest: 5 },
      { return_value: false, shortest_distance: 5, point_a: null, point_b: null }
    );
    helpers.seeIfShortestTest('Case C: second index negative',
      { arr, i: 1, j: -1, shortest: 5 },
      { return_value: false, shortest_distance: 5, point_a: null, point_b: null }
    );
    helpers.seeIfShortestTest('Case D: second index out of bounds',
      { arr, i: 0, j: 10, shortest: 5 },
      { return_value: false, shortest_distance: 5, point_a: null, point_b: null }
    );
    helpers.seeIfShortestTest('Case D: given points are further than shortest',
      { arr, i: 0, j: 1, shortest: 1 },
      { return_value: false, shortest_distance: 1, point_a: null, point_b: null }
    );
    helpers.seeIfShortestTest('Case D: given points are closer than shortest',
      { arr, i: 0, j: 1, shortest: 10 },
      { return_value: true, shortest_distance: Math.sqrt(2), point_a: 0, point_b: 1 }
    );
    helpers.seeIfShortestTest('Case D: given points are closer than shortest',
      { arr, i: 0, j: 1, shortest: Math.sqrt(2) },
      { return_value: false, shortest_distance: Math.sqrt(2), point_a: null, point_b: null }
    );
  }); // end seeIfShortest
  describe('bruteForce:', () => {
    helpers.bruteForceTest('When the input array is empty:',
      {
        arr: [],
      },
      {
        shortest_distance: Infinity,
        point_a: null,
        point_b: null,
      },
    );
    helpers.bruteForceTest('When there is only 1 point in the array:',
      {
        arr: [
          { x: 50, y: 10 },
        ],
      },
      {
        shortest_distance: 0,
        point_a: 0,
        point_b: null,
      },
    );
    helpers.bruteForceTest('When there are only 2 points in the array:',
      {
        arr: [
          { x: 0, y: 0 },
          { x: 30, y: 40 },
        ],
      },
      {
        shortest_distance: 50,
        point_a: 0,
        point_b: 1,
      },
    );
    describe('When there are 3 or more points in the array:', () => {
      helpers.bruteForceTest('Test Case A: the first 2 points are closest:', {
        arr: [
          { x: 0, y: 0 },
          { x: 30, y: 40 },
          { x: 300, y: 40 },
        ],
        },
        {
          shortest_distance: 50,
          point_a: 0,
          point_b: 1,
        },
      );
      helpers.bruteForceTest('Test Case B: the last 2 poits are closest:',
        {
          arr: [
            { x: 0, y: 0 },
            { x: 30, y: 40 },
            { x: 31, y: 40 },
          ],
        },
        {
          shortest_distance: 1,
          point_a: 1,
          point_b: 2,
        },
      );
      helpers.bruteForceTest('Test Case C: the first and last points are closest:',
        {
          arr: [
            { x: 0, y: 0 },
            { x: 15, y: 400 },
            { x: 30, y: 40 },
          ],
        },
        {
          shortest_distance: 50,
          point_a: 0,
          point_b: 2,
        },
      );
      helpers.bruteForceTest('Test Case D: more than 3 points',
        {
          arr: [
            { x: 0, y: 0 },
            { x: 0, y: 1 },
            { x: 2, y: 3 },
            { x: 9, y: 9 },
            { x: 100, y: 45 },
          ],
        },
        {
          shortest_distance: 1,
          point_a: 0,
          point_b: 1,
        },
      );
      helpers.bruteForceTest('Test Case E: some coordinates are negative',
        {
          arr: [
            { x: -7, y: -2 },
            { x: -4, y: 1 },
            { x: 0, y: 0 },
            { x: 1, y: 1 },
            { x: 4, y: 5 },
          ],
        },
        {
          shortest_distance: Math.sqrt(2),
          point_a: 2,
          point_b: 3,
        },
      );
      helpers.bruteForceTest('Test Case F: 2 pairs of points that are closest',
        {
          arr: [
            { x: 0, y: 0 },
            { x: 1, y: 1 },
            { x: 2, y: 2 },
          ],
        },
        {
          shortest_distance: Math.sqrt(2),
          point_a: 0,
          point_b: 1,
        },
      );
    });
  }); // end bruteForce
  describe('divide:', () => {
    describe('When there are 3 or fewer points in the problem, run brute force:', () => {
      const arr = [
        { x: 0, y: 0 },
        { x: 1, y: 1 },
        { x: 4, y: 5 },
      ];
      const cpop = new ClosestPairOfPoints(arr, 0);
      cpop.divide();
      it('should set this.closest to the correct distance', () => {
        const result = cpop.shortest;
        expect(result).to.equal(Math.sqrt(2));
      });
      it('should set this.closestA to the correct index', () => {
        const result = cpop.closestA;
        expect(result).to.equal(0);
      });
      it('should set this.closestB to the correct index', () => {
        const result = cpop.closestB;
        expect(result).to.equal(1);
      });
    });
    describe('When there are more than 3 points:', () => {
      helpers.divideTest('Even Number of Points', 
        {
          arr: [
            { x: 2, y: 3 },
            { x: 3, y: 4 },
            { x: 5, y: 1 },
            { x: 12, y: 10 },
            { x: 12, y: 30 },
            { x: 40, y: 50 },
          ],
          level: 0,
        },
        {
          left_half_size: 3,
          right_half_size: 3,
        },
      );
      helpers.divideTest('Odd Number of Points', 
        {
          arr: [
            { x: 2, y: 3 },
            { x: 3, y: 4 },
            { x: 12, y: 10 },
            { x: 12, y: 30 },
            { x: 40, y: 50 },
          ],
          level: 3,
        },
        {
          left_half_size: 3,
          right_half_size: 2,
        },
      );
    });
  }); // end divide
  describe('findPointsInStrip:', () => {
    describe('Returns an array of indeces of the points (sorted by y-value)  whose x-value is less than this.shortest from the median:', () => {
      helpers.findPointsInStripTest('Odd number of points',
        {
          arr: [
            { x: 0, y: 1 },
            { x: 10, y: 2 },
            { x: 40, y: 3 },
            { x: 45, y: 8 },
            { x: 50, y: 5 },
            { x: 56, y: 3 },
            { x: 59, y: 7 },
            { x: 60, y: 8 },
            { x: 100, y: 9 },
          ],
          shortest: 10,
        }, 
        {
          number_of_points: 6,
          indeces_sorted_by_y: '2 5 4 6 3 7 ',
        });
      helpers.findPointsInStripTest('Even number of points',
        {
          arr: [
            { x: 0, y: 1 },
            { x: 10, y: 2 },
            { x: 40, y: 3 },
            { x: 45, y: 8 },
            { x: 50, y: 5 },
            { x: 56, y: 3 },
            { x: 59, y: 7 },
            { x: 60, y: 8 },
            { x: 100, y: 9 },
            { x: 100, y: 10 },
          ],
          shortest: 10,
        },
        {
          number_of_points: 6,
          indeces_sorted_by_y: '2 5 4 6 3 7 ',
        });   
    });
  }); // end findPointsInStrip
  describe('checkStrip:', () => {
    helpers.checkStripTest('Case A: there is no pair of points in the strip closer than shortest',
      {
        arr: [
          { x: 4, y: 2 },
          { x: 6, y: 10 },
          { x: 10, y: 15 },
        ],
        shortest: 5,
      },
      {
        shortest_distance: 5,
      }
    );
    helpers.checkStripTest('Case B: there is a pair of points in the strip closer than shortest',
      {
        arr: [
          { x: 0, y: 0 },
          { x: 4, y: 2 },
          { x: 6, y: 2 },
          { x: 10, y: 10 },
        ],
        shortest: 5,
      },
      {
        shortest_distance: 2
      }
    );
    helpers.checkStripTest('Case c: there are multiple pairs of points in the strip closer than shortest',
      {
        arr: [
          { x: 0, y: 0 },
          { x: 4, y: 2 },
          { x: 5, y: 2 },
          { x: 6, y: 2 },
          { x: 10, y: 10 },
        ],
        shortest: 5,
      },
      {
        shortest_distance: 1
      }
    );
  }); 
  describe('conquer', () => {

  });
});

