const needleLength = 0.1;
const lineWidth = 1.5;
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
    let xs = [];
    let ys = [];
    for (let i = 0; i < x.length; i++) {
        let crossing = y[i] < needleLength / 2 || y[i] > gridSpacing - needleLength / 2;
        if (crossing) {
            numCrossings++;
            colors.push("red");
        } else {
            colors.push("green");
        }
        // definir posição e orientação da agulha
        xs.push(x[i], x[i] + (needleLength / 2) * Math.sin(Math.PI * y[i] / gridSpacing));
        ys.push(y[i], y[i] + (needleLength / 2) * Math.cos(Math.PI * y[i] / gridSpacing));
    }
    return { numCrossings, colors, xs, ys };
}

// Gere os pontos aleatórios e conte quantas agulhas cruzam as linhas
const numPoints = 100;
const points = generatePoints(numPoints);
const { numCrossings, colors, xs, ys } = countCrossings(points.x, points.y);

// Calcule a estimativa para pi
const piEstimate = (2 * numPoints) / (numCrossings * needleLength);

// Crie o gráfico com a estimativa para pi e cores diferentes para as agulhas que cruzam e as que não cruzam as linhas
const data = [
    {
        x: xs,
        y: ys,
        mode: "lines",
        line: { width: lineWidth, color: colors },
        type: "scatter",
    },
];
const layout = {
    title: `Estimativa de pi: ${piEstimate}`,
    xaxis: { range: [0, gridSpacing] },
    yaxis: { range: [0, gridSpacing] },
};
Plotly.newPlot("plot", data, layout);
