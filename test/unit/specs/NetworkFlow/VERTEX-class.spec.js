/* eslint-disable */
import Vertex from '@/store/modules/network-flow/VERTEX-class';

function constructorTest(dataIn, dataOut) {
  describe(`new Vertex(${dataIn})`, function () {
    let a = new Vertex(dataIn);
    it('should have a neighbors object', function () {
      expect(a.neighbors).to.exist;
      expect(a.neighbors).to.be.an.instanceof(Object);
    });
    it('should have counNeighbors value of 0', function () {
      expect(a.countNeighbors).to.equal(0);
    });
    it(`should have a data value of --> ${dataOut}`, function () {
      expect(a.data).to.equal(dataOut);
    });
  });
}
describe('Constructor', function () {
  constructorTest(undefined, null);
  constructorTest('', '');
  constructorTest('Armen', 'Armen');
  constructorTest(0, 0);
  constructorTest(100, 100);
});

describe('addNeighbor', function() {});
describe('removeNeighbor', function() {});
describe('changeNeighborWeight', function() {});
describe('getNeighbors', function() {});
describe('getDistance', function() {});
describe('getEdge', function() { });
describe('destructor', function() {});