$(document).ready(function() {
  $('.unacknowledge-feedback-link').click(function() {
    var userNameElement = $('#user-name');
    var nameText = userNameElement.text().trim();

    // Assuming the name is the text content without the word 'Dashboard!'
    var name = nameText.replace(' Dashboard!', '').trim();

    var userName = name.replace(/[^\w\s]/gi, '').replace(/\s+/g, ' ');
    var fileName = userName.replace(/\s+/g, '_') + '.csv';

    console.log(fileName);

    $.ajax({
      url: '/unack_feedbackData_csv',
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

            // Create a link for the feedback ID
            var feedbackIdLink = $('<a></a>')
              .attr('href', 'display_unacfeedback.html?name=' + encodeURIComponent(userName) + '&feedback_id=' + encodeURIComponent(feedbackId))
              .attr('target', '_blank')  // Add this line to open the link in a new tab
              .text(feedbackId)
              .css('color', 'white'); // Set link color to white

            var listItem = $('<li></li>')
              .append(feedbackIdLink)
              .append(', ')
              .append($('<span></span>').text(date).css('color', 'white')); // Set date color to white

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
