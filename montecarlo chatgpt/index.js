const needleLength = 0.25;
const lineWidth = 0.1;
const lineDistance = 0.5;

// Define the distance between the lines
const gridSpacing = needleLength + lineDistance;

// Define the function to generate points
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
    let lines = [];
    for (let i = 0; i < x.length; i++) {
        let crossing = y[i] < needleLength / 2 || y[i] > gridSpacing - needleLength / 2;
        if (crossing) {
            numCrossings++;
            colors.push("red");
        } else {
            colors.push("green");
        }
        // Define the position and orientation of the needle
        let angle = Math.PI * y[i] / gridSpacing;
        let x1 = x[i] - (needleLength / 2) * Math.sin(angle);
        let y1 = y[i] - (needleLength / 2) * Math.cos(angle);
        let x2 = x[i] + (needleLength / 2) * Math.sin(angle);
        let y2 = y[i] + (needleLength / 2) * Math.cos(angle);
        lines.push({ x: [x1, x2], y: [y1, y2] });
    }
    return { numCrossings, colors, lines };
}

// Generate the random points and count how many needles cross the lines
const numPoints = 100;
const points = generatePoints(numPoints);
const { numCrossings, colors, lines } = countCrossings(points.x, points.y);

// Calculate the estimate for pi
const piEstimate = (2 * numPoints) / (numCrossings * needleLength);

// Create the plot with the estimate for pi and different colors for the needles that cross the lines and those that do not
const data = [
    {
        type: "scatter",
        mode: "lines",
        line: { width: lineWidth, color: colors },
        x: lines.map(line => line.x),
        y: lines.map(line => line.y),
    },
];
const layout = {
    title: `Estimate for pi: ${piEstimate}`,
    xaxis: { range: [0, gridSpacing] },
    yaxis: { range: [0, gridSpacing] },
};
Plotly.newPlot("plot", data, layout);
