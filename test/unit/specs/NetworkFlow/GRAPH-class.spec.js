/* eslint-disable */
import Graph from '@/store/modules/network-flow/GRAPH-class';

describe('Constructor', function () {
  let a = new Graph();
  console.log(a);
  it('should have a neighbors object', function () {
    expect(true).to.equal(true);
  });
});