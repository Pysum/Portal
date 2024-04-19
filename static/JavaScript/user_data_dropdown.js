// analyst_dropdown.js

// Function to fetch AOR data from the server
function fetchAORData() {
  // Send a request to the server to fetch AOR data
  fetch('/fetch_FeedForm_aor_data')
    .then(function(response) {
      return response.json();
    })
    .then(function(aorData) {
      // Get the AOR dropdown element
      const aorDropdown = document.getElementById("aor");

      // Populate the AOR dropdown with options
      const selectOption = document.createElement("option");
      selectOption.text = "--select--";
      aorDropdown.add(selectOption);
      aorData.forEach(function (aor) {
        const option = document.createElement("option");
        option.text = aor;
        aorDropdown.add(option);
      });

      // Add event listener for AOR dropdown change
      aorDropdown.addEventListener("change", function() {
        const selectedAOR = this.value;
        fetchTeamLeaders(selectedAOR); // Call function to fetch team leaders based on the selected AOR
      });
    })
    .catch(function(error) {
      console.log('Error fetching AOR data:', error);
    });
}

// Call the fetchAORData function when the page loads
window.addEventListener("load", fetchAORData);

// Function to fetch team leaders based on the selected AOR
function fetchTeamLeaders(selectedAOR) {
  // Send a request to the server to fetch team leaders data for the selected AOR
  fetch('/fetch_FeedForm_team_leaders?selectedAOR=' + encodeURIComponent(selectedAOR))
    .then(response => response.json())
    .then(data => {
      const teamLeaderDropdown = document.getElementById('team-leader');
      // Clear previous options
      teamLeaderDropdown.innerHTML = '';

      // Populate the team leader dropdown with options
      const selectOption = document.createElement('option');
      selectOption.text = '--select--';
      teamLeaderDropdown.appendChild(selectOption);
      data.forEach(teamLeader => {
        const option = document.createElement('option');
        option.value = teamLeader;
        option.textContent = teamLeader;
        teamLeaderDropdown.appendChild(option);
      });
      teamLeaderDropdown.addEventListener('change', function() {
        const selectedTeamLeader = this.value;
        fetchEmployeeData(selectedTeamLeader);
      });
    })
    .catch(error => {
      console.error('Error fetching team leaders:', error);
    });
}

// Function to fetch employee names based on the selected team leader
function fetchEmployeeData(teamLeader) {
  // Send a request to the server to fetch employee data
  fetch('/fetch_FeedForm_employee_data?teamLeader=' + encodeURIComponent(teamLeader))
    .then(function(response) {
      return response.json();
    })
    .then(function(employeeData) {
      // Get the Employee dropdown element
      const employeeDropdown = document.getElementById("agents");

      // Clear previous options
      employeeDropdown.innerHTML = '';

      // Populate the Employee dropdown with options
      const selectOption = document.createElement("option");
      selectOption.text = "--select--";
      employeeDropdown.add(selectOption);
      employeeData.forEach(function (employee) {
        const option = document.createElement("option");
        option.text = employee;
        employeeDropdown.add(option);
      });
    })
    .catch(function(error) {
      console.log('Error fetching employee data:', error);
    });
}

document.addEventListener("DOMContentLoaded", function() {
  var feedbackTypeSelect = document.getElementById("feedback-type");
  var container2 = document.querySelector(".container2");

  feedbackTypeSelect.addEventListener("change", function() {
    if (feedbackTypeSelect.value !== "select") {
      container2.style.display = "block";
    } else {
      container2.style.display = "none";
    }
  });
});
