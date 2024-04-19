(function($) {
  var CheckboxDropdown = function(el) {
      var _this = this;
      this.isOpen = false;
      this.areAllChecked = false;
      this.$el = $(el);
      this.$label = this.$el.find('.month-dropdown-label');
      this.$checkAll = this.$el.find('[data-toggle="check-all"]').first();
      this.$inputs = this.$el.find('[type="checkbox"]');
      
      this.onCheckBox();
      
      this.$label.on('click', function(e) {
      e.preventDefault();
      _this.toggleOpen();
      });
      
      this.$checkAll.on('click', function(e) {
      e.preventDefault();
      _this.onCheckAll();
      });
      
      this.$inputs.on('change', function(e) {
      _this.onCheckBox();
      });
  };
      
      CheckboxDropdown.prototype.onCheckBox = function() {
        this.updateStatus();
      };
  
  CheckboxDropdown.prototype.updateStatus = function() {
      var checked = this.$el.find(':checked');
      
      this.areAllChecked = false;
      this.$checkAll.html('Select All');
      
      if(checked.length <= 0) {
      this.$label.html('Select Month');
      }
      else if(checked.length === 1) {
      this.$label.html(checked.parent('label').text());
      }
      else if(checked.length === this.$inputs.length) {
      this.$label.html('All Selected');
      this.areAllChecked = true;
      this.$checkAll.html('Unselect');
      }
      else {
      this.$label.html(checked.length + ' Selected');
      }
  };
      
  CheckboxDropdown.prototype.onCheckAll = function(checkAll) {
      if(!this.areAllChecked || checkAll) {
      this.areAllChecked = true;
      this.$checkAll.html('Uncheck All');
      this.$inputs.prop('checked', true);
      }
      else {
      this.areAllChecked = false;
      this.$checkAll.html('Check All');
      this.$inputs.prop('checked', false);
      }
      
      this.updateStatus();
  };
      
  CheckboxDropdown.prototype.toggleOpen = function(forceOpen) {
      var _this = this;
      
      if(!this.isOpen || forceOpen) {
          this.isOpen = true;
          this.$el.addClass('on');
      $(document).on('click', function(e) {
          if(!$(e.target).closest('[data-control]').length) {
          _this.toggleOpen();
          }
      });
      }
      else {
      this.isOpen = false;
      this.$el.removeClass('on');
      $(document).off('click');
      }
  };
      
  var checkboxesDropdowns = document.querySelectorAll('[data-control="checkbox-dropdown"]');
  for(var i = 0, length = checkboxesDropdowns.length; i < length; i++) {
      new CheckboxDropdown(checkboxesDropdowns[i]);
  }
  })(jQuery);
  
  
  
  (function($) {
  var CheckboxDropdown = function(el) {
      var _this = this;
      this.isOpen = false;
      this.areAllChecked = false;
      this.$el = $(el);
      this.$label = this.$el.find('.year-dropdown-label');
      this.$checkAll = this.$el.find('[data-toggle="check-all"]').first();
      this.$inputs = this.$el.find('[type="checkbox"]');
      
      this.onCheckBox();
      
      this.$label.on('click', function(e) {
      e.preventDefault();
      _this.toggleOpen();
      });
      
      this.$checkAll.on('click', function(e) {
      e.preventDefault();
      _this.onCheckAll();
      });
      
      this.$inputs.on('change', function(e) {
      _this.onCheckBox();
      });
  };
  
  CheckboxDropdown.prototype.onCheckBox = function() {
      this.updateStatus();
  };
  
  CheckboxDropdown.prototype.updateStatus = function() {
      var checked = this.$el.find(':checked');
      
      this.areAllChecked = false;
      this.$checkAll.html('Select All');
      
      if(checked.length <= 0) {
      this.$label.html('Select Year');
      }
      else if(checked.length === 1) {
      this.$label.html(checked.parent('label').text());
      }
      else if(checked.length === this.$inputs.length) {
      this.$label.html('All Selected');
      this.areAllChecked = true;
      this.$checkAll.html('Unselect');
      }
      else {
      this.$label.html(checked.length + ' Selected');
      }
  };
  
  CheckboxDropdown.prototype.onCheckAll = function(checkAll) {
      if(!this.areAllChecked || checkAll) {
      this.areAllChecked = true;
      this.$checkAll.html('Uncheck All');
      this.$inputs.prop('checked', true);
      }
      else {
      this.areAllChecked = false;
      this.$checkAll.html('Check All');
      this.$inputs.prop('checked', false);
      }
      
      this.updateStatus();
  };
  
  CheckboxDropdown.prototype.toggleOpen = function(forceOpen) {
      var _this = this;
      
      if(!this.isOpen || forceOpen) {
          this.isOpen = true;
          this.$el.addClass('on');
      $(document).on('click', function(e) {
          if(!$(e.target).closest('[data-control]').length) {
          _this.toggleOpen();
          }
      });
      }
      else {
      this.isOpen = false;
      this.$el.removeClass('on');
      $(document).off('click');
      }
  };
  
  var checkboxesDropdowns = document.querySelectorAll('[data-control="checkbox-dropdown"]');
  for(var i = 0, length = checkboxesDropdowns.length; i < length; i++) {
      new CheckboxDropdown(checkboxesDropdowns[i]);
  }
  })(jQuery);
    
    
  

document.addEventListener("DOMContentLoaded", function () {
  const aorDropdownLabel = document.getElementById("aor-dropdown-label");
  const aorDropdownList = document.getElementById("aor-dropdown");
  const teamLeaderDropdownLabel = document.getElementById("team-leader-dropdown-label");
  const teamLeaderDropdownList = document.getElementById("team-leader-dropdown");
  const employeeDropdownLabel = document.getElementById("employee-dropdown-label");
  const employeeDropdownList = document.getElementById("employee-dropdown");

  // Function to toggle the visibility of the AOR dropdown
  function toggleAORDropdown() {
    aorDropdownList.classList.toggle("show");
  }

  // Function to hide the AOR dropdown
  function hideAORDropdown() {
    aorDropdownList.classList.remove("show");
  }

  // Function to toggle the visibility of the Team Leader dropdown
  function toggleTeamLeaderDropdown() {
    teamLeaderDropdownList.classList.toggle("show");
  }

  // Function to hide the Team Leader dropdown
  function hideTeamLeaderDropdown() {
    teamLeaderDropdownList.classList.remove("show");
  }

  // Function to toggle the visibility of the Employee dropdown
  function toggleEmployeeDropdown() {
    employeeDropdownList.classList.toggle("show");
  }

  // Function to hide the Employee dropdown
  function hideEmployeeDropdown() {
    employeeDropdownList.classList.remove("show");
  }

  // Add click event listener to the AOR label
  aorDropdownLabel.addEventListener("click", toggleAORDropdown);

  // Add a click event listener on the document to hide the AOR dropdown when anywhere on the screen is clicked
  document.addEventListener("click", function (event) {
    if (event.target !== aorDropdownLabel && !aorDropdownList.contains(event.target)) {
      hideAORDropdown();
    }
  });

  // Add click event listener to the Team Leader label
  teamLeaderDropdownLabel.addEventListener("click", toggleTeamLeaderDropdown);

  // Add a click event listener on the document to hide the Team Leader dropdown when anywhere on the screen is clicked
  document.addEventListener("click", function (event) {
    if (event.target !== teamLeaderDropdownLabel && !teamLeaderDropdownList.contains(event.target)) {
      hideTeamLeaderDropdown();
    }
  });

  // Add click event listener to the Employee label
  employeeDropdownLabel.addEventListener("click", toggleEmployeeDropdown);

  // Add a click event listener on the document to hide the Employee dropdown when anywhere on the screen is clicked
  document.addEventListener("click", function (event) {
    if (event.target !== employeeDropdownLabel && !employeeDropdownList.contains(event.target)) {
      hideEmployeeDropdown();
    }
  });

  // Function to populate the AOR checkboxes
  function fetchAORData() {
    // Replace the URL with your actual endpoint that fetches AOR data
    fetch('/fetch_FReport_aor_data')
      .then(function (response) {
        return response.json();
      })
      .then(function (aorData) {
        // Clear the existing content in the AOR dropdown
        aorDropdownList.innerHTML = '';

        // Create a select element with the 'aor-select' id
        const selectAOR = document.createElement("select");
        selectAOR.setAttribute("id", "aor-select");
        selectAOR.multiple = true; // Allow multiple selections

        // Append the "Select All" link
        const selectAllLink = document.createElement("option");
        selectAllLink.value = "all";
        selectAllLink.text = "Select All";
        selectAllLink.setAttribute("data-select2-id", "all"); // Add a unique ID
        selectAOR.appendChild(selectAllLink);

        // Create options for each AOR
        aorData.forEach(function (aor) {
          const option = document.createElement("option");
          option.value = aor;
          option.text = aor;
          option.setAttribute("data-select2-id", aor); // Add a unique ID
          selectAOR.appendChild(option);
        });

        // Append the select element to the AOR dropdown container
        aorDropdownList.appendChild(selectAOR);

        // Initialize Select2 on the 'aor-select' element
        const $selectAOR = $("#aor-select");
        $selectAOR.select2({
          placeholder: "Select AOR(s)",
          allowClear: true,
        });

        $selectAOR.on('select2:select', function (e) {
          if (e.params.data.value === "all") {
            // Add all AOR values to the selection (except "Select All")
            const allOptions = Array.from($selectAOR.find('option[data-select2-id]'));
            const allValues = allOptions.map(option => option.value);
            $selectAOR.val(allValues);
            $selectAOR.trigger('change');
          }
        });

        $selectAOR.on('select2:unselect', function (e) {
          if (e.params.data.value === "all") {
            // Deselect all options (except "Select All")
            const allOptions = Array.from($selectAOR.find('option[data-select2-id]'));
            const allValues = allOptions.map(option => option.value);
            $selectAOR.val(null);
            allValues.forEach(value => $selectAOR.find(`option[value="${value}"]`).prop('selected', true));
            $selectAOR.trigger('change');
          }
        });

        // Add a change event listener to fetch team leaders when AOR selection changes
        $selectAOR.on('change', function () {
          fetchTeamLeaders($selectAOR.val());
        });
      });
  }

  // Function to fetch and populate Team Leaders based on selected AORs
  function fetchTeamLeaders(selectedAORs) {
    // Replace the URL with your actual endpoint to fetch Team Leaders
    const url = '/fetch_FReport_team_leaders';

    // Include selected AORs in the request data
    const requestData = {
      aors: selectedAORs,
    };

    // Send a POST request to fetch team leaders
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(requestData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (teamLeadersData) {
        // Clear the existing content in the Team Leader dropdown before repopulating
       
        teamLeaderDropdownList.innerHTML = '';

        // Create a select element with the 'team-leader-select' id
        const selectTeamLeader = document.createElement('select');
        selectTeamLeader.setAttribute('id', 'team-leader-select');
        selectTeamLeader.multiple = true; // Allow multiple selections

        // Append the "Select All" link
        const selectAllLinkTeamLeader = document.createElement("option");
        selectAllLinkTeamLeader.value = "all";
        selectAllLinkTeamLeader.text = "Select All";
        selectAllLinkTeamLeader.setAttribute("data-select2-id", "all"); // Add a unique ID
        selectTeamLeader.appendChild(selectAllLinkTeamLeader);

        

        // Create options for each Team Leader
        teamLeadersData.forEach(function (leader) {
          const option = document.createElement("option");
          option.value = leader;
          option.text = leader;
          option.setAttribute("data-select2-id", leader); // Add a unique ID
          selectTeamLeader.appendChild(option);
        });

        // Append the select element to the Team Leader dropdown container
        teamLeaderDropdownList.appendChild(selectTeamLeader);

        // Initialize Select2 on the 'team-leader-select' element
        const $selectTeamLeader = $("#team-leader-select");
        $selectTeamLeader.select2({
          placeholder: "Select Team Leader(s)",
          allowClear: true,
        });


      // Update the change event listener to fetch Employee data and update on selection changes
      $selectTeamLeader.on('change', function () {
        fetchEmployeeData($selectTeamLeader.val());
      }).trigger('change'); // Trigger the change event to fetch Employee data initially

      // Add this block to handle the 'Select All' functionality for Team Leaders
      $selectTeamLeader.on('select2:select', function (e) {
        if (e.params.data.value === 'all') {
          $selectTeamLeader.find('option').prop('selected', true);
          $selectTeamLeader.trigger('change');
          fetchEmployeeData($selectTeamLeader.val()); // Fetch employees immediately after selecting all team leaders
        }
      }).on('select2:unselect', function (e) {
        if (e.params.data.value === 'all') {
          $selectTeamLeader.find('option').prop('selected', false);
          $selectTeamLeader.trigger('change');
        }
      }).on('change', function () {
        fetchEmployeeData($selectTeamLeader.val());
      });
    });
  }
    
  // Function to fetch and populate Employee data based on selected Team Leaders
  function fetchEmployeeData(selectedTeamLeaders) {
    // Replace the URL with your actual endpoint to fetch Employee data
    const url = '/fetch_FReport_employee_data';

    // Include selected Team Leaders in the request data
    const requestData = {
      teamLeaders: selectedTeamLeaders,
    };

    // Send a POST request to fetch employee data
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(requestData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (employeeData) {
        
        
        employeeDropdownList.innerHTML = '';

        // Create a select element with the 'employee-select' id
        const selectEmployee = document.createElement("select");
        selectEmployee.setAttribute("id", "employee-select");
        selectEmployee.multiple = true; // Allow multiple selections

        // Append the "Select All" link
        const selectAllLinkEmployee = document.createElement("option");
        selectAllLinkEmployee.value = "all";
        selectAllLinkEmployee.text = "Select All";
        selectAllLinkEmployee.setAttribute("data-select2-id", "all"); // Add a unique ID
        selectEmployee.appendChild(selectAllLinkEmployee);

        // Create options for each Employee
        employeeData.forEach(function (employee) {
          const option = document.createElement("option");
          option.value = employee;
          option.text = employee;
          option.setAttribute("data-select2-id", employee); // Add a unique ID
          selectEmployee.appendChild(option);
        });

        // Append the select element to the Employee dropdown container
        employeeDropdownList.appendChild(selectEmployee);

        // Initialize Select2 on the 'employee-select' element
        const $selectEmployee = $("#employee-select");
        $selectEmployee.select2({
          placeholder: "Select Employee(s)",
          allowClear: true,
        });
      });
  }

  // Call the fetchAORData function to populate the AOR dropdown
  fetchAORData();
});

function getSelectedEmployees() {
  try {
    // Get the selected months
    const selectedMonths = [];
    const monthCheckboxes = document.querySelectorAll('[name="dropdown-group"]');
    for (const checkbox of monthCheckboxes) {
      if (checkbox.checked) {
        selectedMonths.push(checkbox.value);
      }
    }

    // Get the selected years
    const selectedYears = [];
    const yearCheckboxes = document.querySelectorAll('[name="year-checkbox"]');
    for (const checkbox of yearCheckboxes) {
      if (checkbox.checked) {
        selectedYears.push(checkbox.value);
      }
    }


    const selectedEmployees = [];
    const employeeSelect = document.getElementById("employee-select");
    const allOption = employeeSelect.querySelector('option[value="all"]');
    
    if (allOption && allOption.selected) {
      // If "Select All" is selected, retrieve all employee values except "Select All"
      const employeeOptions = Array.from(employeeSelect.querySelectorAll('option:not([value="all"])'));
      selectedEmployees.push(...employeeOptions.map(option => {
        const nameParts = option.value.trim().split(' ');
        return nameParts.join('_'); // Join first and last name with an underscore
      }));
    } else {
      // If individual employees are selected, retrieve them
      for (const option of employeeSelect.selectedOptions) {
        const name = option.value.trim().split(' ').join('_'); // Join first and last name with an underscore
        selectedEmployees.push(name);
      }
    }
    




    // Convert months to their respective numbers
    const monthNumbers = {
      'January': 1,
      'February': 2,
      'March': 3,
      'April': 4,
      'May': 5,
      'June': 6,
      'July': 7,
      'August': 8,
      'September': 9,
      'October': 10,
      'November': 11,
      'December': 12,
    };

    // Ensure correct spelling of month names in the selectedMonths array
    const correctedSelectedMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    // Convert selected months to numbers
    const selectedMonthNumbers = correctedSelectedMonths.map(month => monthNumbers[month]);
    // Log the selected data
    console.log('Selected Years:', selectedYears);
    console.log('Selected Employees:', selectedEmployees);
    console.log('Selected Month Numbers:', selectedMonthNumbers);

    // Send the data to the Python server
    const data = {
      month:selectedMonthNumbers,
      employeeName:selectedEmployees,
      year:selectedYears
    };

    fetch('/feedback_report', {
      method: 'POST', // You can use GET or POST, depending on your server setup.
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(feedbackData => {
       
        // Call a function to populate the table with the received feedbackData
        populateFeedbackTable(feedbackData);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  } catch (error) {
    console.error('Error:', error);
  }
}

function populateFeedbackTable(data) {
  var tableBody = document.querySelector("#feedbackTable tbody");

  // Clear any existing data in the tbody
  tableBody.innerHTML = "";

  // Check if data is an array
  if (!Array.isArray(data)) {
    console.error('Data is not an array:', data);
    return;
  }

// Loop through the feedback data and populate the table
data.forEach(function (feedback) {
  var row = tableBody.insertRow();

  try {
    // Create cells and fill in data
    var cellDate = row.insertCell(0);
    cellDate.textContent = feedback.Date; // Corrected property name

    var cellEmployeeName = row.insertCell(1);
    cellEmployeeName.textContent = feedback.EmployeeName; // Corrected property name

    var cellTeamLeader = row.insertCell(2);
    cellTeamLeader.textContent = feedback.TeamLeader; // Corrected property name

    var cellFeedbackId = row.insertCell(3);
    cellFeedbackId.textContent = feedback.FeedbackId; // Corrected property name

    // Apply CSS class based on Acknowledged status
    cellFeedbackId.classList.add(feedback.Acknowledged ? "acknowledged" : "unacknowledged");

    var cellIncidentNumber = row.insertCell(4);
    cellIncidentNumber.textContent = feedback.IncidentNumber; // Corrected property name

    var cellFeedbackType = row.insertCell(5);
    cellFeedbackType.textContent = feedback.FeedbackType; // Corrected property name

    var cellSubCategory = row.insertCell(6);
    cellSubCategory.textContent = feedback.SubCategory; // Corrected property name

    var cellFeedback = row.insertCell(7);
    cellFeedback.textContent = feedback.Feedback; // Corrected property name

    var cellAcknowledged = row.insertCell(8);
    cellAcknowledged.textContent = feedback.Acknowledged ? "Yes" : "No";
  } catch (error) {
    console.error('Error populating table:', error);
  }
});

// Move this line outside of the forEach loop
document.getElementById("feedbackTableContainer").style.display = "block";
document.getElementById("export-button").style.display = "block";
}
