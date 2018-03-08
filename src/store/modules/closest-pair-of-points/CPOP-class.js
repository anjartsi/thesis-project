class ClosestPairOfPoints {
  constructor(points, level) {
    this.points = points.slice();
    // array of points, pre-sorted by x-value
    // points shoule be {x, y}
    this.level = level; // what level in the subproblem-tree it's in
    this.size = this.points.length; // this is just for convenience
    if (this.size > 0) this.medianIndex = Math.floor((this.size - 1) / 2);
    else this.medianIndex = null;

    this.shortest = Infinity;
    this.closestA = null; // index of one of the two closest points
    this.closestB = null; // index of one of the two closest points

    this.leftHalf = null; // for dividing into subproblems
    this.rightHalf = null; // for dividing into subproblems
    this.pointsInStrip = null; // The points inside of the strip between the 2 halves
  }

  calculateDistance(i, j) {
    if (i >= this.size || j >= this.size) return null;
    if (i < 0 || j < 0) return null;
    // Pythagorean Theorem
    let dx = this.points[i].x - this.points[j].x;
    dx *= dx;
    let dy = this.points[i].y - this.points[j].y;
    dy *= dy;

    return Math.sqrt(dx + dy);
  }

  // If a pair of points are closer than the current min, set all the properties accordingly
  seeIfShortest(i, j) {
    // only if the values are correct
    if (i < this.size && j < this.size && i >= 0 && j >= 0) {
      const d = this.calculateDistance(i, j);
      if (d >= this.shortest) return false;
      // Remember which pair of points was closest
      this.closestA = i;
      this.closestB = j;
      this.shortest = d;
      return true;
    }
    return false;
  }

  bruteForce() {
    if (this.size === 1) {
      this.closestA = 0;
      this.shortest = 0;
      return;
    }
    for (let i = 0; i < this.size - 1; i++) {
      for (let j = i + 1; j < this.size; j++) {
        this.seeIfShortest(i, j);
      } // end for(j)
    } // end for(i)
  } // end bruteForce

  divide() {
    if (this.size <= 3) {
      this.bruteForce();
      return;
    }
    const left = this.points.slice(0, this.medianIndex + 1);
    const right = this.points.slice(this.medianIndex + 1);
    this.leftHalf = new ClosestPairOfPoints(left, this.level + 1);
    this.rightHalf = new ClosestPairOfPoints(right, this.level + 1);
  }

  findPointsInStrip() {
    if (this.shortest === Infinity) return null;
    const pointsInStrip = [];
    for (let i = 0; i < this.size; i++) {
      // horizontal distance from strip
      const d = Math.abs(this.points[i].x - this.points[this.medianIndex].x);
      if (d <= this.shortest) pointsInStrip.push(i);
      // pointsInStrip is an array of indeces
    } // end for(i)
    pointsInStrip.sort((a, b) => {
      // sort the strip by y-value (if equal y-value, use x-value)
      let comparison = this.points[a].y - this.points[b].y;
      if (comparison === 0) comparison = this.points[a].x - this.points[b].x;
      return comparison;
    });
    return pointsInStrip;
  }
  checkStrip() {
    const pointsInStrip = this.findPointsInStrip();
    if (pointsInStrip === null) return;
    for (let i = 0; i < pointsInStrip.length - 1; i++) {
      // for each point in the strip...
      const point1 = pointsInStrip[i];
      for (let j = i + 1; j < i + 16; j++) {
        // ... check its distance to the next 16
        if (j >= pointsInStrip.length) break; // array out of bounds
        const point2 = pointsInStrip[j];
        this.seeIfShortest(point1, point2);
      } // end for(j)
    } // end for(i)
  } // end checkStrip()

  conquer() {
    // Can't do anything if the two subproblems haven't been solved yet
    if (this.leftHalf.shortest === null ||
       this.rightHalf.shortest === null ||
       this.leftHalf.shortest === Infinity ||
       this.rightHalf.shortest === Infinity) {
      return null;
    }
    this.shortest = Math.min(this.leftHalf.shortest, this.rightHalf.shortest);
    this.checkStrip();
    return this.shortest;
  }

  static printPoint(point) {
    if (point.x !== null && point.y !== undefined) {
      return `${point.x} ${point.y}`;
    }
    return '';
  }

  static printAllPoints(arr) {
    if (arr.length === 0) return '';
    let str = '';
    for (let i = 0; i < arr.length; i++) {
      str += '(';
      str += ClosestPairOfPoints.printPoint(arr[i]);
      str += ')';
      str += ', ';
    }
    return str.substr(0, str.length - 2);
  }
} // end class ClosestPairOfPoints

export default ClosestPairOfPoints;
