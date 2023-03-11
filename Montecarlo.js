const agulhas = 10000;

class DefinirAgulha {
  constructor(x = null, y = null, theta = null, length = 0.5) {
    this.x = x;
    this.y = y;
    this.theta = theta;
    this.length = length;

    if (this.x == null) {
      this.x = Math.random() * (1 - 0) + 0;
    }
    if (this.y == null) {
      this.y = Math.random() * (1 - 0) + 0;
    }
    if (this.theta == null) {
      this.theta = Math.random() * (Math.PI - 0) + 0;
    }

    this.needleCoordinates = [this.x, this.y];
    this.complexRepresentation = [
      (this.length / 2) * Math.cos(this.theta),
      (this.length / 2) * Math.sin(this.theta),
    ];

    this.endPoints = [this.needleCoordinates, this.complexRepresentation];
  }

  intersectWithY(y) {
    return this.endPoints[0][1] < y && this.endPoints[1][1] > y;
  }
}

class BuffonSimulation {
  constructor() {
    this.boards = 2;
    this.floor = [];
    this.listOfNeedleObjects = [];
    this.numberOfIntersections = 0;
  }

  tossNeedle() {
    const needleObject = new DefinirAgulha();
    this.listOfNeedleObjects.push(needleObject);
    const xCoordinates = [needleObject.endPoints[0][0], needleObject.endPoints[1][0]];
    const yCoordinates = [needleObject.endPoints[0][1], needleObject.endPoints[1][1]];

    for (let board = 0; board <= this.boards; board++) {
      if (needleObject.intersectWithY(this.floor[board])) {
        this.numberOfIntersections += 1;
      }
    }
  }
}

const agulha = new DefinirAgulha(200, 300);
console.log(agulha);
