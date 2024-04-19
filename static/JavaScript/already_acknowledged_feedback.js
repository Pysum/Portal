$(document).ready(function() {
    $('.acknowledge-feedback-link').click(function() {
      var greeting = $('h1').text().trim(); // Get the greeting text
      var name = greeting.split(',')[1].trim(); // Extract the name from the greeting
      var userName = name.replace(/[^\w\s]/gi, '').replace(/\s+/g, ' '); // Remove special characters and extra spaces
      
      var fileName = userName.replace(/\s+/g, '_') + '.csv'; // Replace spaces with underscores in the file name
  
      console.log(fileName);
  
      $.ajax({
        url: '/feedbackData_csv',
        type: 'GET',
        data: { name: userName },
        success: function(data) {
          if ('message' in data) {
            alert(data.message); // Display the acknowledgement message
            return; // Stop further execution
          }
      
          if (data.length > 0) {
            var feedbackList = $('<ul></ul>'); // Create an unordered list element
      
            for (var i = 0; i < data.length; i++) {
              var feedback = data[i];
              var combinedValue = feedback.FeedbackId + ', ' + feedback.Date;
              var link = $('<a></a>').attr('href', '#').text(combinedValue); // Create a link element
              var listItem = $('<li></li>').append(link); // Create a list item element and append the link
              feedbackList.append(listItem); // Append the list item to the unordered list
            }
      
            // Update the feedback ID element with the list of feedbacks
            $('#feedback-id').empty().append(feedbackList);
      
            // Hide the individual feedback ID and date elements
            $('.feedback-id').hide();
            $('#date').hide();
            $('.feedback-id').show(); // Display the feedback id label
            $('#feedback-id').show(); // Display the feedback id value
            $('.date').show(); // Display the date label
            $('#date').show(); // Display the date value
          }
        },
        error: function(xhr, status, error) {
          console.log('Error:', error);
        }
      });
    });
  });
  