const needleLength = 0.25;
const lineWidth = 0.1;
const lineDistance = 0.5;
const numPoints = 1000;
const numLines = 3;

// Define the distance between the lines
const gridSpacing = needleLength + (lineDistance * (numLines - 1));

// Define the positions of the lines
const linePositions = new Array(numLines);
const lineSpacing = gridSpacing / numLines;
for (let i = 0; i < numLines; i++) {
  linePositions[i] = i * lineSpacing;
}

// Define the function to generate the points
function generatePoints(numPoints) {
  const x = Array.from({ length: numPoints }, () => Math.random() * gridSpacing);
  const y = Array.from({ length: numPoints }, () => Math.random() * gridSpacing);
  return { x, y };
}

// Define the function to count how many needles cross the lines
function countCrossings(x, y) {
  const { numCrossings, colors, xs, ys } = x.reduce(
    ({ numCrossings, colors, xs, ys }, _, i) => {
      const crossing = linePositions.some((lineStart) => {
        const lineEnd = lineStart + needleLength;
        return y[i] >= lineStart && y[i] <= lineEnd;
      });
      if (crossing) {
        colors.push("red");
        numCrossings++;
      } else {
        colors.push("green");
      }
      xs.push(x[i], x[i] + (needleLength / 2) * Math.sin(Math.PI * y[i] / gridSpacing));
      ys.push(y[i], y[i] + (needleLength / 2) * Math.cos(Math.PI * y[i] / gridSpacing));
      return { numCrossings, colors, xs, ys };
    },
    { numCrossings: 0, colors: [], xs: [], ys: [] }
  );
  // Return the object with the properties numCrossings, colors, xs, and ys
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
