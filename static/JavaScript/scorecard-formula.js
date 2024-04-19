
  function calculatePoints() {
    var table = document.getElementById('excel-table');
    var rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');

    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];
      var valueCell = row.cells[1];
      var pointsCell = row.cells[2];

      var value = valueCell.textContent.trim(); // Get the value from the "Value" cell

      // Apply your formula here and update the "Points" cell
      var points = calculatePointsBasedOnValue(value);

      // Update the "Points" cell with the calculated points
      pointsCell.textContent = points;
    }
  }

  // Function to calculate points based on the "Value" cell content
  function calculatePointsBasedOnValue(value) {
    if (value === "") {
      return 3;
    }

    // Parse the time value (e.g., "0:01:31") into hours, minutes, and seconds
    var timeParts = value.split(':');
    var hours = parseInt(timeParts[0]);
    var minutes = parseInt(timeParts[1]);
    var seconds = parseInt(timeParts[2]);

    // Convert the time value to seconds
    var totalSeconds = hours * 3600 + minutes * 60 + seconds;

    if (totalSeconds <= 30) {
      return 4;
    } else if (totalSeconds <= 60) {
      return 4 - (30 - totalSeconds) / 30;
    } else if (totalSeconds <= 90) {
      return 3 - (60 - totalSeconds) / 30;
    } else if (totalSeconds <= 91) {
      return 2 - (90 - totalSeconds);
    } else {
      return 1;
    }
  }

