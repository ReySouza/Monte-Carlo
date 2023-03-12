const graficoDiv = document.querySelector('#grafico')
const btnReset = document.querySelector('.reset')
const btnSimulate = document.querySelector('.simulate')

// Classe DefinirAgulha cria os objetos que vão ser usados
class DefinirAgulha {
  constructor(x = Math.random(), y = Math.random(), theta = Math.random() * Math.PI, length = 0.5) {
    //  Constructor é chamado para pegar os valores opcionais de x, y, theta e o comprimento
    this.x = x;
    this.y = y;
    this.theta = theta;
    this.length = length;

    // Calcula as coordenadas das pontas da agulha
    this.needleCoordinates = [this.x, this.y];
    this.complexRepresentation = [
      (this.length / 2) * Math.cos(this.theta),
      (this.length / 2) * Math.sin(this.theta),
    ];

    this.endPoints = [this.needleCoordinates, this.complexRepresentation];
  }

  // Check se a agulha intersecta com alguma linha pela coordenada y
  intersectWithY(y) {
    return this.endPoints[0][1] < y && this.endPoints[1][1] > y;
  }
}

// Classe usada para fazer a configuração da simulação
class BuffonSimulation {
  // Constructor é chamado para pegar o valor do número de tábuas
  constructor(boards = 2) {
    this.boards = boards;
    this.floor = [];
    this.listOfNeedleObjects = [];
    this.numberOfIntersections = 0;
  }

  // Reseta a simulação
  reset() {
    this.floor = [];
    this.listOfNeedleObjects = [];
    this.numberOfIntersections = 0;
  }

  // Arremessa uma agulha e checa a interseção
  tossNeedle() {
    const needleObject = new DefinirAgulha();
    this.listOfNeedleObjects.push(needleObject);
    // Extrai as coordenadas x e y da ponta da agulha
    const xCoordinates = [needleObject.endPoints[0][0], needleObject.endPoints[1][0]];
    const yCoordinates = [needleObject.endPoints[0][1], needleObject.endPoints[1][1]];

    // Check de interseção
    for (let board = 0; board < this.boards; board++) {
      if (needleObject.intersectWithY(this.floor[board])) {
        // Se a agulha intersectar, aumenta o numberOfIntersections em 1 e pinta a agulha de verde
        this.numberOfIntersections += 1;
        Plotly.addTraces('grafico', [{
          x: xCoordinates,
          y: yCoordinates,
          type: 'line',
          line: {
            color: 'green',
            width: 1
          }
        }]);
        return;
      }
    }

    // Se a agulha não intersectar, pinta ela de vermelho
    Plotly.addTraces('grafico', [{
      x: xCoordinates,
      y: yCoordinates,
      type: 'line',
      line: {
        color: 'red',
        width: 1
      }
    }]);
  }

  // Simula por um número de iterações
  run(iterations = 10000) {
    // Reinicia tudo
    this.reset();
    // Arremessa a agulha o número de iterações
    for (let i = 0; i < iterations; i++) {
      this.tossNeedle();
    }

    // Fornece uma estimativa para Pi baseado no numero de interseções
    const needleLength = this.listOfNeedleObjects[0].length;
    const boardSpacing = 1 / this.boards;
    const estimatedPi = (2 * needleLength * iterations) / (boardSpacing * this.numberOfIntersections);
    return estimatedPi;
  }

  // Plota as tábuas usando o plotly
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
    Plotly.addTraces(fig, [trace]);
  }
}

function runSimulation() {
  const buffonSimulation = new BuffonSimulation(10);
  let traces = [buffonSimulation.plotFloorBoards('grafico'), buffonSimulation.tossNeedle()]
  let config = {responsive: true}
  Plotly.newPlot('grafico', traces)
  const estimatedPi = buffonSimulation.run(100000);
  document.getElementById('results').innerHTML = `Estimated value of Pi: ${estimatedPi}`;
}

btnReset.addEventListener('click', (e) => {
  e.preventDefault()
  const buffonSimulation = new BuffonSimulation();
  buffonSimulation.reset()
})

btnSimulate.addEventListener('click', (e)=> {
  e.preventDefault()
  runSimulation()
})

const data = [
    {
        x: xCoordinates,
        y: yCoordinates,
        mode: "markers",
        marker: { size: 5, color: colors },
        type: "scatter",
    },
];
const layout = {
    title: `Estimativa de pi: ${estimatedPi}`,
    xaxis: { range: [0, boardSpacing] },
    yaxis: { range: [0, boardSpacing] },
};
Plotly.newPlot("grafico", data, layout);

