document.addEventListener("DOMContentLoaded", function() {
  const evaluateButton = document.getElementById("calc");
  const scoreLabel = document.getElementById("scorelabel");



  evaluateButton.addEventListener("click", function() {
    const parameterCount = 21; // Total number of parameters (adjust if needed)
    let selectedCount = 0;

  // Check if incident number is entered
  const incidentNumber = document.getElementById('incident-number').value.trim();
  if (!incidentNumber) {
    alert('Please enter an incident number.');
    return;
  }
    for (let i = 1; i <= parameterCount; i++) {
      const selectedValue = document.querySelector(`input[name="parameter${i}_${i}"]:checked`);
      if (selectedValue) {
        const value = selectedValue.value.toLowerCase(); // Convert to lowercase for case-insensitive comparison
        if (value === "yes" || value === "na") {
          selectedCount += 5;
        } else if (value === "no") {
          // No need to add points for "No"
        }
      }
    }

    // Send the selected count to the server
    fetch("/evaluate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ selectedCount: selectedCount })
    })
    .then(response => response.json())
    .then(data => {
      if (data.totalScore !== undefined) {
        scoreLabel.textContent = `Total Score: ${data.totalScore}`;
      }
    })
    .catch(error => {
      console.error("Error:", error);
    });
  });
});
