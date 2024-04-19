


function getSelectedEmployees() {
    const selectedEmployees = [];
    const employeeCheckboxes = document.querySelectorAll("input[name=employee-checkbox]:checked");

    employeeCheckboxes.forEach(function (checkbox) {
        // Assuming the value attribute of the checkbox contains the full name (e.g., "John Doe")
        const fullName = checkbox.value;
        const nameParts = fullName.split(" ");
        if (nameParts.length >= 2) {
            const formattedName = `${nameParts[0]}_${nameParts[1]}`;
            selectedEmployees.push(formattedName);
        }
    });

    return selectedEmployees; // Return the list of formatted names
}

function getFeedback() {
    var month = document.getElementById("month").value;
    var year = document.getElementById("year").value;
    const formattedEmployeeNames = getSelectedEmployees(); // Get the list of formatted names

    if (month === "select" || year === "select" || formattedEmployeeNames.length === 0) {
        alert("Please select all fields before submitting.");
        return;
    }
    // document.getElementById("employee-dropdown").style.display = "none";
    // Convert month names to numbers
    var monthMap = {
        "January": 1,
        "February": 2,
        "March": 3,
        "April": 4,
        "May": 5,
        "June": 6,
        "July": 7,
        "August": 8,
        "September": 9,
        "October": 10,
        "November": 11,
        "December": 12
    };
    var monthNumber = monthMap[month];

    var formData = {
        month: monthNumber,
        year: year,
        employeeName: formattedEmployeeNames, // Use the list of formatted names
    };

    // Use formData as needed





    // Send the data to the Python server using an API call (e.g., fetch or XMLHttpRequest)
    fetch("/feedback_report", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        // Get the tbody element of the existing table
        var tableBody = document.querySelector("#feedbackTable tbody");
    
        // Clear any existing data in the tbody
        tableBody.innerHTML = "";
    
        // Loop through the feedback data and populate the table
        data.forEach(function(feedback) {
            var row = tableBody.insertRow();
    
            // Create cells and fill in data
            var cellDate = row.insertCell(0);
            cellDate.textContent = feedback.Date;

            var cellEmployeeName = row.insertCell(1);
            cellEmployeeName.textContent = feedback.EmployeeName;

            var cellTeamLeader = row.insertCell(2);
            cellTeamLeader.textContent = feedback.TeamLeader;

            var cellFeedbackId = row.insertCell(3);
            cellFeedbackId.textContent = feedback.FeedbackId;
    
            // Apply CSS class based on Acknowledged status
            cellFeedbackId.classList.add(feedback.Acknowledged ? "acknowledged" : "unacknowledged");
    
            var cellIncidentNumber = row.insertCell(4);
            cellIncidentNumber.textContent = feedback.IncidentNumber;
    
            var cellFeedbackType = row.insertCell(5);
            cellFeedbackType.textContent = feedback.FeedbackType;
    
            var cellSubCategory = row.insertCell(6);
            cellSubCategory.textContent = feedback.SubCategory;
    
            var cellFeedback = row.insertCell(7);
            cellFeedback.textContent = feedback.Feedback;
    
            var cellAcknowledged = row.insertCell(8);
            cellAcknowledged.textContent = feedback.Acknowledged ? "Yes" : "No";
        });
    
        // Display the table container and export button
        document.getElementById("feedbackTableContainer").style.display = "block";
        document.getElementById("export-button").style.display = "block";
    })
    .catch(function(error) {
        console.error("Error:", error);
    });
}      