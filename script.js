//your JS code here. If required.
const output = document.getElementById('output');

// Add a row that spans 2 columns with the exact text Loading...
const loadingRow = document.createElement('tr');
loadingRow.innerHTML = '<td colspan="2">Loading...</td>';
output.appendChild(loadingRow);

// Create 3 promises, each of which resolves after a random time between 1 and 3 seconds
const promises = [];
for (let i = 1; i <= 3; i++) {
  promises.push(new Promise((resolve, reject) => {
    const startTime = performance.now();
    setTimeout(() => {
      const endTime = performance.now();
      const timeTaken = (endTime - startTime) / 1000;
      resolve({ name: `Promise ${i}`, timeTaken });
    }, Math.floor(Math.random() * 2000) + 1000);
  }));
}

// Use Promise.all to wait for all the Promises to resolve
Promise.all(promises).then((results) => {
  // Remove the loading text
  output.removeChild(loadingRow);

  // Populate the table with the required values
  results.forEach((result) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${result.name}</td>
      <td>${result.timeTaken.toFixed(3)}</td>
    `;
    output.appendChild(row);
  });

  // Calculate the total time taken to resolve all promises
  const totalTimeTaken = results.reduce((acc, current) => acc + current.timeTaken, 0);
  const totalRow = document.createElement('tr');
  totalRow.innerHTML = `
    <td>Total</td>
    <td>${totalTimeTaken.toFixed(3)}</td>
  `;
  output.appendChild(totalRow);
});