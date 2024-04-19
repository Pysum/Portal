$(document).ready(function() {
  $('.all-feedback-link').click(function() {
    var userNameElement = $('#user-name');
    var nameText = userNameElement.text().trim();

    // Assuming the name is the text content without the word 'Dashboard!'
    var name = nameText.replace(' Dashboard!', '').trim();

    var userName = name.replace(/[^\w\s]/gi, '').replace(/\s+/g, ' ');
    var fileName = userName.replace(/\s+/g, '_') + '.csv';

    console.log(fileName);



    $.ajax({
      url: '/all_feedbackData_csv',
      type: 'GET',
      data: { name: userName },
      success: function(data) {
        if ('message' in data) {
          alert(data.message);
          return;
        }

        if (data.length > 0) {
          var feedbackList = $('<ul></ul>');

          for (var i = 0; i < data.length; i++) {
            var feedback = data[i];
            var feedbackId = feedback.FeedbackId;
            var date = feedback.Date;
            var acknowledged = feedback.Acknowledged;

            // Create a link for the feedback ID
            var feedbackIdLink = $('<a></a>')
              .attr('target', '_blank')  // Add this line to open the link in a new tab
              .text(feedbackId);

            // Check if feedback_id is acknowledged and apply red color to the link
            if (acknowledged) {
              feedbackIdLink.css('color', 'red');
              // Update the href for acknowledged feedback IDs to open display.lm.html in a new tab
              feedbackIdLink.attr('href', 'display_acfeedback.html?name=' + encodeURIComponent(userName) + '&feedback_id=' + encodeURIComponent(feedbackId));
            } else {
              // For non-acknowledged feedback IDs, open the original link and set the link color to white
              feedbackIdLink.attr('href', 'display_unacfeedback.html?name=' + encodeURIComponent(userName) + '&feedback_id=' + encodeURIComponent(feedbackId))
                        .css('color', 'white');
            }

            var dateSpan = $('<span></span>')
              .text(date)
              .css('color', acknowledged ? 'red' : 'white'); // Set the color of the dateSpan

            var listItem = $('<li></li>')
              .append(feedbackIdLink)
              .append(', ')
              .append(dateSpan);

            feedbackList.append(listItem);
          }

          $('#feedback-id').empty().append(feedbackList);

          $('.feedback-id').hide();
          $('#date').hide();
          $('.feedback-id').show();
          $('#feedback-id').show();
          $('.date').show();
          $('#date').show();
        }
      },
      error: function(xhr, status, error) {
        console.log('Error:', error);
      }
    });
  });
});
