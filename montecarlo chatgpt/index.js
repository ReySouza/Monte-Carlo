const needleLength = 0.5;
const lineWidth = 1;
const lineDistance = 1;

// Defina a distância entre as linhas
const gridSpacing = needleLength + lineDistance;

// Defina a função para gerar os pontos
function generatePoints(numPoints) {
    let x = [];
    let y = [];
    for (let i = 0; i < numPoints; i++) {
        x.push(Math.random() * gridSpacing);
        y.push(Math.random() * gridSpacing);
    }
    return { x, y };
}

// Defina a função para contar quantas agulhas cruzam as linhas
function countCrossings(x, y) {
    let numCrossings = 0;
    let colors = [];
    for (let i = 0; i < x.length; i++) {
        let crossing = y[i] < needleLength / 2 || y[i] > gridSpacing - needleLength / 2;
        if (crossing) {
            numCrossings++;
            colors.push("green");
        } else {
            colors.push("red");
        }
    }
    return { numCrossings, colors };
}

// Gere os pontos aleatórios e conte quantas agulhas cruzam as linhas
const numPoints = 10000;
const points = generatePoints(numPoints);
const { numCrossings, colors } = countCrossings(points.x, points.y);

// Calcule a estimativa para pi
const piEstimate = (2 * numPoints) / (numCrossings * needleLength);

// Crie o gráfico com a estimativa para pi e cores diferentes para as agulhas que cruzam e as que não cruzam as linhas
const data = [
    {
        x: points.x,
        y: points.y,
        mode: "markers",
        marker: { size: 5, color: colors },
        type: "scatter",
    },
];
const layout = {
    title: `Estimativa de pi: ${piEstimate}`,
    xaxis: { range: [0, gridSpacing] },
    yaxis: { range: [0, gridSpacing] },
};
Plotly.newPlot("plot", data, layout);