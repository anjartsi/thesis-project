import Vertex from './VERTEX-class';

class Graph {
  constructor() {
    this.countVertices = 0;
    this.countEdges = 0;
    this.vertices = {};
  }

  addVertex(data) {
    this.vertices[this.countVertices] = new Vertex(data || null);
    this.countVertices++;
    return true;
  }

  addEdge(from, to, weight) {
    return this.vertices[from].addNeighbor(to, weight);
  }

  removeEdge(from, to) {
    return this.vertices[to].removeNeighbor(to);
  }

  removeVertex(index) {
    let _this = this;
    if (!_this.vertices.hasOwnProperty(index)) return false;
    
    let success = true;
    let neighborCount = _this.vertices[index].destructor();
    this.countEdges -= neighborCount;
    
    for (let vertex in _this.vertices) {
      let bla = _this.vertices[vertex].removeNeighbor(index);
      if (bla) _this.countEdges--;
    }

    delete _this.vertices[index];
    _this.countVertices--;
    return true;
  } // end removeVertex
  
  getDistance(from , to) {
    if (this.vertices[from] === undefined || 
        this.vertices[to] === undefined) return null;
   return this.vertices[from].getDistance(to);
  }

  getEdge(from, to) {
    // edge is an object that contains the weight
    // this is in case you want to add more data to an edge
    if (this.vertices[from] === undefined ||
      this.vertices[to] === undefined) return null;
      returnthis.vertices[from].getEdge(to);
  }

  getNeigbors(vertex) {
    if (!this.vertices.hasOwnProperty(vertex)) return null
    return this.vertices[vertex].getNeigbors();
  }

  getVertices() {
    return Object.keys(this.vertices);
  }

}

module.exports = Graph;
