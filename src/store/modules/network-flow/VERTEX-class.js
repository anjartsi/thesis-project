
class Vertex {
  constructor(data) {
    this.neighbors = {};
    
    this.data = data !== undefined? data : null;
    this.countNeighbors = 0;
  }

  destructor() {
    let n = this.countNeighbors;
    this.data = null;
    this.neighbors = null;
    this.countNeighbors = null;
    return n;
  }

  addNeighbor(index, weight) {
    if (this.neighbors.hasOwnProperty(index)) return false;
    this.neighbors[index] = { weight };
    return true;
  }

  removeNeighbor(index) {
    if (this.neighbors.hasOwnProperty(index)) {
      delete this.neighbors[index];
      return true;
    }
    return false;
  }

  changeNeighborWeight(index, newWeight) {
    if (this.neighbors.hasOwnProperty(index)) {
      this.neighbors[index].weight = newWeight;
      return true;
    }
    return false;
  }

  getNeighbors() {
    let _this = this;
    return Object.keys(_this.neighbors);
  }
  
  getDistance(index) {
    if (!this.neighbors.hasOwnProperty(index))  return Infinity;
    return this.neighbors[index].weight;
  }

  getEdge(index) {
    if (!this.neighbors.hasOwnProperty(index)) return null;
    return this.neighbors[index];
  }
}

module.exports = Vertex;