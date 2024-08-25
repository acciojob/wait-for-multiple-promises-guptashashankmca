document.addEventListener("DOMContentLoaded", function () {
  const promiseTable = document.getElementById("promiseTable");
  const loadingText = document.getElementById("loadingText");

  // Create 3 promises that resolve after a random time between 1 and 3 seconds
  const promises = [
    createPromise(1),
    createPromise(2),
    createPromise(3)
  ];

  // Record the start time
  const startTime = performance.now();

  // Wait for all promises to resolve
  Promise.all(promises).then((results) => {
    // Calculate the total time taken
    const totalTime = (performance.now() - startTime) / 1000;

    // Remove the loading text
    promiseTable.removeChild(loadingText.parentElement);

    // Populate the table with the results
    results.forEach((result, index) => {
      const row = promiseTable.insertRow();
      row.insertCell(0).innerText = `Promise ${index + 1}`;
      row.insertCell(1).innerText = result.toFixed(3);
    });

    // Add the total row
    const totalRow = promiseTable.insertRow();
    totalRow.insertCell(0).innerText = "Total";
    totalRow.insertCell(1).innerText = totalTime.toFixed(3);
  });

  // Function to create a promise that resolves after a random time
  function createPromise(promiseNumber) {
    const time = Math.random() * 2 + 1; // Random time between 1 and 3 seconds
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(time);
      }, time * 1000);
    });
  }
});
