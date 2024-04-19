// Function to export selected data to the Python server
function exportData() {

  const tableData = [];
  const tableRows = document.querySelectorAll("#feedbackTable tbody tr");
  tableRows.forEach(row => {
    const rowData = [];
    row.querySelectorAll("td").forEach(cell => {
      rowData.push(cell.textContent);
    });
    tableData.push(rowData);
  });

  const data = {

    tableData: tableData,
  };

  // Send data to the Python server using a fetch request
  fetch("/export-feedbackReport", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(result => {
      console.log("Data exported successfully:", result);
      alert("Data exported successfully!");
      // Reload the page
      location.reload();
    })
    .catch(error => {
      console.error("Error exporting data:", error);
    });
}

// Helper function to get selected values of checkboxes
function getSelectedValues(checkboxName) {
  const selectedValues = [];
  const checkboxes = document.querySelectorAll(`input[name=${checkboxName}]:checked`);
  checkboxes.forEach(checkbox => {
    selectedValues.push(checkbox.value);
  });
  return selectedValues;
}

// Attach the exportData function to the "Export Data" button
const exportButton = document.getElementById("export-button");
exportButton.addEventListener("click", exportData);
