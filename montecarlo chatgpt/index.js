const needleLength = 0.25;
const lineWidth = 0.1;
const lineDistance = 0.5;
const numPoints = 1000; // <-- set the number of needles here

// Define the distance between the lines
const gridSpacing = needleLength + lineDistance;

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
        let crossing = y[i] < needleLength / 2 || y[i] > gridSpacing - needleLength / 2;
        if (crossing) {
            numCrossings++;
            colors.push("red");
        } else {
            colors.push("green");
        }
        // define position and orientation of the needle
        xs.push(x[i] - (needleLength / 2) * Math.sin(Math.PI * y[i] / gridSpacing));
        xs.push(x[i] + (needleLength / 2) * Math.sin(Math.PI * y[i] / gridSpacing));
        xs.push(null);
        ys.push(y[i] + (needleLength / 2) * Math.cos(Math.PI * y[i] / gridSpacing));
        ys.push(y[i] - (needleLength / 2) * Math.cos(Math.PI * y[i] / gridSpacing));
        ys.push(null);
    }
    return { numCrossings, colors, xs, ys };
}

// Generate the random points and count how many needles cross the lines
const points = generatePoints(numPoints);
const { numCrossings, colors, xs, ys } = countCrossings(points.x, points.y);

// Calculate the estimate for pi
const piEstimate = (2 * numPoints) / (numCrossings * needleLength);

// Create the plot with the estimate for pi and different colors for needles that cross or don't cross the lines
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
    title: `Estimate of pi: ${piEstimate}`,
    xaxis: { range: [0, gridSpacing] },
    yaxis: { range: [0, gridSpacing] },
};
Plotly.newPlot("plot", data, layout);
