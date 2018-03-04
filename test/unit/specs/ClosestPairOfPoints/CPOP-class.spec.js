/* eslint-disable */
import ClosestPairOfPoints from '@/store/modules/closest-pair-of-points/class';
import { 
  divideTest,
  findPointsInStripTest,
 } from './CPOP-class-tests';
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
    describe('returns the correct Euclidean distance between two points:', () => {
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
    });
  }); // end calculateDistance
  describe('bruteForce:', () => {
    describe('Solves the problem by checking all combinations. Sets this.shortest, this.closestA, and this.closestB to their correct values:', () => {
      describe('When the points array is empty:', () => {
        const arr = [];
        const cpop = new ClosestPairOfPoints(arr, 0);
        cpop.bruteForce();
        it('should set this.shortest to Infinity', () => {
          const result = cpop.shortest;
          expect(result).to.equal(Infinity);
        });
        it('should not change this.closestA (it should be null)', () => {
          const result = cpop.closestA;
          expect(result).to.equal(null);
        });
        it('should not change this.closestB (it should be null)', () => {
          const result = cpop.closestB;
          expect(result).to.equal(null);
        });
      });
      describe('When there is only 1 point in the array:', () => {
        const arr = [{ x: 50, y: 10 }];
        const cpop = new ClosestPairOfPoints(arr, 0);
        cpop.bruteForce();
        it('should set this.shortest to 0', () => {
          const result = cpop.shortest;
          expect(result).to.equal(0);
        });
        it('should set this.closestA to be the index of point (so 0)', () => {
          const result = cpop.closestA;
          expect(result).to.equal(0);
        });
        it('should not change this.closestB (it should be null)', () => {
          const result = cpop.closestB;
          expect(result).to.equal(null);
        });
      });
      describe('When there are only 2 point in the array:', () => {
        const arr = [
          { x: 0, y: 0 },
          { x: 30, y: 40 },
        ];
        const cpop = new ClosestPairOfPoints(arr, 0);
        cpop.bruteForce();
        it('should set this.shortest to the distance between the two points', () => {
          const result = cpop.shortest;
          // 30^2 + 40^2 = 50^2
          expect(result).to.equal(50);
        });
        it('should set this.closestA to be the index of the first point (so 0)', () => {
          const result = cpop.closestA;
          expect(result).to.equal(0);
        });
        it('should not change this.closestB to be index of the second point (so 1)', () => {
          const result = cpop.closestB;
          expect(result).to.equal(1);
        });
      });
      describe('When there are 3 or more points in the array:', () => {
        describe('Test Case A: 3 points where the first 2 points are closest:', () => {
          const arr = [
            { x: 0, y: 0 },
            { x: 30, y: 40 },
            { x: 300, y: 40 },
          ];
          const cpop = new ClosestPairOfPoints(arr, 0);
          cpop.bruteForce();
          it('should set this.shortest to the distance', () => {
            const result = cpop.shortest;
            // 30^2 + 40^2 = 50^2
            expect(result).to.equal(50);
          });
          it('should set this.closestA to be 0', () => {
            const result = cpop.closestA;
            expect(result).to.equal(0);
          });
          it('should not change this.closestB to be 1', () => {
            const result = cpop.closestB;
            expect(result).to.equal(1);
          });
        });
        describe('Test Case B: 3 points where the last 2 points are closest:', () => {
          const arr = [
            { x: 0, y: 0 },
            { x: 30, y: 40 },
            { x: 31, y: 40 },
          ];
          const cpop = new ClosestPairOfPoints(arr, 0);
          cpop.bruteForce();
          it('should set this.shortest to the distance', () => {
            const result = cpop.shortest;
            expect(result).to.equal(1);
          });
          it('should set this.closestA to be 1', () => {
            const result = cpop.closestA;
            expect(result).to.equal(1);
          });
          it('should not change this.closestB to be 2', () => {
            const result = cpop.closestB;
            expect(result).to.equal(2);
          });
        });
        describe('Test Case C: 3 points where the first and last points are closest:', () => {
          const arr = [
            { x: 0, y: 0 },
            { x: 15, y: 400 },
            { x: 30, y: 40 },
          ];
          const cpop = new ClosestPairOfPoints(arr, 0);
          cpop.bruteForce();
          it('should set this.shortest to the distance', () => {
            const result = cpop.shortest;
            expect(result).to.equal(50);
          });
          it('should set this.closestA to be 0', () => {
            const result = cpop.closestA;
            expect(result).to.equal(0);
          });
          it('should not change this.closestB to be 2', () => {
            const result = cpop.closestB;
            expect(result).to.equal(2);
          });
        });
        describe('Test Case D::', () => {
          const arr = [
            { x: 0, y: 0 },
            { x: 0, y: 1 },
            { x: 2, y: 3 },
            { x: 9, y: 9 },
            { x: 100, y: 45 },
          ];
          const cpop = new ClosestPairOfPoints(arr, 0);
          cpop.bruteForce();
          it('should set this.shortest to the distance', () => {
            const result = cpop.shortest;
            expect(result).to.equal(1);
          });
          it('should set this.closestA to be 0', () => {
            const result = cpop.closestA;
            expect(result).to.equal(0);
          });
          it('should not change this.closestB 1', () => {
            const result = cpop.closestB;
            expect(result).to.equal(1);
          });
        });
        describe('Test Case E: some of the points have negative x- and y-values:', () => {
          const arr = [
            { x: -7, y: -2 },
            { x: -4, y: 1 },
            { x: 0, y: 0 },
            { x: 1, y: 1 },
            { x: 4, y: 5 },
          ];
          const cpop = new ClosestPairOfPoints(arr, 0);
          cpop.bruteForce();
          it('should set this.shortest to the distance', () => {
            const result = cpop.shortest;
            expect(result).to.equal(Math.sqrt(2));
          });
          it('should set this.closestA to be 0', () => {
            const result = cpop.closestA;
            expect(result).to.equal(2);
          });
          it('should not change this.closestB 1', () => {
            const result = cpop.closestB;
            expect(result).to.equal(3);
          });
        });
      });
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
      divideTest('Even Number of Points', 
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
      divideTest('Odd Number of Points', 
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
      findPointsInStripTest('Odd number of points',
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
      findPointsInStripTest('Even number of points',
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
  });
  describe('checkStrip:', () => {
    describe('Finds the points with an x-value  this.shortest of the median', () => {});
  });
  describe('conquer', () => {

  });
});

