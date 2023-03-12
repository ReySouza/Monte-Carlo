const needleLength = 0.25;
const lineWidth = 0.1;
const lineDistance = 0.5;
const numPoints = 1000;

const gridSpacing = needleLength + lineDistance;

function generatePoints(numPoints) {
  let x = [];
  let y = [];
  for (let i = 0; i < numPoints; i++) {
    x.push(Math.random() * gridSpacing);
    y.push(Math.random() * gridSpacing);
  }
  return { x, y };
}

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
    xs.push(x[i], x[i] - (needleLength / 2) * Math.sin(Math.PI * y[i] / gridSpacing));
    ys.push(y[i], y[i] - (needleLength / 2) * Math.cos(Math.PI * y[i] / gridSpacing));
  }
  return { numCrossings, colors, xs, ys };
}

const points = generatePoints(numPoints);
const { numCrossings, colors, xs, ys } = countCrossings(points.x, points.y);

const piEstimate = (2 * numPoints) / (numCrossings * needleLength);

const lineTrace = {
  x: [0, gridSpacing],
  y: [0, 0],
  mode: "lines",
  line: { width: 2, color: "black" },
  type: "scatter",
};

const needleTrace = {
  x: xs,
  y: ys,
  mode: "lines",
  line: { width: lineWidth, color: colors },
  type: "scatter",
};

const data = [lineTrace, needleTrace];

const layout = {
  title: `Estimativa de pi: ${piEstimate}`,
  xaxis: { range: [0, gridSpacing] },
  yaxis: { range: [0, gridSpacing] },
};

Plotly.newPlot("plot", data, layout);
