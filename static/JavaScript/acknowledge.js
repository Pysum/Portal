document.addEventListener('DOMContentLoaded', function() {
  var acknowledgeButton = document.getElementById('myButton');
  acknowledgeButton.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default form submission


      var agentName = document.getElementById('agent-name').textContent.trim().replace('Welcome ', '');

      var feedbackId = document.getElementById('feedback-id').textContent.replace('Your Feedback details for Feedback ID:', '');
      var helloName = document.querySelector("h1").textContent.trim(); 
      var name = helloName.replace('Hello ', ''); 
      // Grab the values of all labels
      var reportingManager = document.getElementById('reporting-manager').textContent;
      // var aor = document.getElementById('aor').textContent; // Commented out since it's not present in the HTML
      var incidentNumber = document.getElementById('incident-number').textContent;
      var chatId = document.getElementById('chat-id').textContent;
      var date = document.getElementById('date').textContent;
      var feedbackType = document.getElementById('feedback-type').textContent;
      var feedback = document.getElementById('feedback').textContent;
      var feedbackBy = name;

      // Create an object with the data to be sent to the server
      var data = {
        agentName: agentName,
        feedbackId: feedbackId,
        reportingManager: reportingManager,
        // aor: aor, // Commented out since it's not present in the HTML
        incidentNumber: incidentNumber,
        chatId: chatId,
        date: date,
        feedbackType: feedbackType,
        feedback: feedback,
        feedbackBy: feedbackBy
      };

      // Send a POST request to the server with the data
      fetch('/acknowledge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(function(response) {
          if (response.ok) {
            // Acknowledgment recorded and file saved
            console.log('Acknowledgment recorded and file saved.');
            acknowledgeButton.disabled = true;
            alert('Acknowledgment Done');
            
            // Close the page after a brief delay (2 seconds in this example)
            setTimeout(function() {
              window.close();
            }, 2000);
          } else {
            // Error occurred
            console.log('Error: ' + response.statusText);
          }
        })
        .catch(function(error) {
          console.log('Error: ' + error);
        });
      });
});