const needleLength = 0.25;
const lineWidth = 0.1;
const lineDistance = 0.5;
const numPoints = 1000;
const numLines = 2;

// Define the distance between the lines
const gridSpacing = needleLength + lineDistance;

// Define the positions of the lines
const linePositions = [];
for (let i = 0; i < numLines; i++) {
  const position = i * gridSpacing / numLines;
  linePositions.push(position);
}

// Define the function to generate the points
function generatePoints(numPoints) {
  let x = [];
  let y = [];
  for (let i = 0; i < numPoints; i++) {
    x.push(Math.random() * gridSpacing);
    y.push(Math.random() * gridSpacing);
  }
  return { x, y };
}

// Define the function to count how many needles cross the lines
function countCrossings(x, y) {
  let numCrossings = 0;
  let colors = [];
  let xs = [];
  let ys = [];
  for (let i = 0; i < x.length; i++) {
    let crossing = false;
    for (let j = 0; j < numLines; j++) {
      const lineStart = linePositions[j];
      const lineEnd = lineStart + needleLength;
      if (y[i] >= lineStart && y[i] <= lineEnd) {
        crossing = true;
        break;
      }
    }
    if (crossing) {
      numCrossings++;
      colors.push("red");
    } else {
      colors.push("green");
    }
    // Define the position and orientation of the needle
    xs.push(x[i], x[i] + (needleLength / 2) * Math.sin(Math.PI * y[i] / gridSpacing));
    ys.push(y[i], y[i] + (needleLength / 2) * Math.cos(Math.PI * y[i] / gridSpacing));
  }
  return { numCrossings, colors, xs, ys };
}

// Generate the random points and count how many needles cross the lines
const points = generatePoints(numPoints);
const { numCrossings, colors, xs, ys } = countCrossings(points.x, points.y);

// Calculate the estimate for pi
const piEstimate = (2 * numPoints) / (numCrossings * needleLength);

// Define the data for the plot, including the lines
const lineData = linePositions.map((position) => {
  return {
    x: [0, gridSpacing],
    y: [position, position],
    mode: "lines",
    line: { width: lineWidth, color: "black" },
    type: "scatter"
  };
});
const needleData = {
  x: xs,
  y: ys,
  mode: "lines",
  line: { width: lineWidth, color: colors },
  type: "scatter"
};
const data = [...lineData, needleData];

// Define the layout for the plot
const layout = {
  title: `Estimate of pi: ${piEstimate}`,
  xaxis: { range: [0, gridSpacing] },
  yaxis: { range: [0, gridSpacing] }
};

// Create the plot
Plotly.newPlot("plot", data, layout);
