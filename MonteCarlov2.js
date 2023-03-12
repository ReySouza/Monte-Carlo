class DefinirAgulha {
  constructor(x = Math.random(), y = Math.random(), theta = Math.random() * Math.PI, length = 0.5) {
    this.x = x;
    this.y = y;
    this.theta = theta;
    this.length = length;

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
  constructor(boards = 2) {
    this.boards = boards;
    this.floor = [];
    this.listOfNeedleObjects = [];
    this.numberOfIntersections = 0;
  }

  reset() {
    this.floor = [];
    this.listOfNeedleObjects = [];
    this.numberOfIntersections = 0;
  }

  tossNeedle() {
    const needleObject = new DefinirAgulha();
    this.listOfNeedleObjects.push(needleObject);
    const xCoordinates = [needleObject.endPoints[0][0], needleObject.endPoints[1][0]];
    const yCoordinates = [needleObject.endPoints[0][1], needleObject.endPoints[1][1]];

    for (let board = 0; board < this.boards; board++) {
      if (needleObject.intersectWithY(this.floor[board])) {
        this.numberOfIntersections += 1;
        Plotly.addTraces('buffon', {
          x: xCoordinates,
          y: yCoordinates,
          type: 'line',
          line: {
            color: 'green',
            width: 1
          }
        });
        return;
      }
    }
    Plotly.addTraces('buffon', {
      x: xCoordinates,
      y: yCoordinates,
      type: 'line',
      line: {
        color: 'red',
        width: 1
      }
    });
  }

  run(iterations = 10000) {
    this.reset();
    for (let i = 0; i < iterations; i++) {
      this.tossNeedle();
    }
    const needleLength = this.listOfNeedleObjects[0].length;
    const boardSpacing = 1 / this.boards;
    const estimatedPi = (2 * needleLength * iterations) / (boardSpacing * this.numberOfIntersections);
    return estimatedPi;
  }

  plotFloorBoards(fig) {
    var floor = [];
    for (var j = 0; j < this.boards; j++) {
      floor.push(j);
    }

    var trace = {
      x: [0, 1],
      y: floor,
      type: 'line',
      line: {
        color: 'black',
        dash: 'dash',
        width: 2
      }
    };
    Plotly.addTraces(fig, trace);
  }
}

const buffonSimulation = new BuffonSimulation(10);
buffonSimulation.plotFloorBoards('buffon');
const estimatedPi = buffonSimulation.run(100000);
console.log(estimatedPi);
