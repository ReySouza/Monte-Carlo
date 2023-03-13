<!DOCTYPE html>
<html>
  <head>
    <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
  </head>
  <body>
    <div id="plot"></div>
    <script>
      // Set up constants and variables
const L = 2; // Length of needle
const d = 3; // Distance between lines
const numTrials = 10000; // Number of trials to run
let hits = 0; // Number of times needle crosses a line

// Run simulation
for (let i = 0; i < numTrials; i++) {
  // Generate random position and angle
  const x = Math.random() * d / 2; // Random x position between 0 and d/2
  const theta = Math.random() * Math.PI; // Random angle between 0 and pi

  // Check if needle crosses a line
  if (x <= L / 2 * Math.sin(theta)) {
    hits++;
  }
}

// Calculate estimate of pi
const piEstimate = 2 * L * numTrials / (d * hits);

// Display results using Plotly
const xData = [piEstimate];
const yData = ['Estimate of pi'];
const layout = { title: 'Buffon Needle Simulation Results', xaxis: { title: 'Estimate of pi' } };
Plotly.newPlot('plot', [{ x: xData, y: yData, type: 'bar', orientation: 'h' }], layout);
    </script>
  </body>
</html>
