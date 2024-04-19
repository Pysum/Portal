var urlParams = new URLSearchParams(window.location.search);
var name = urlParams.get('name').replace(/ /g, '_');
var feedbackId = urlParams.get('feedback_id');

$(document).ready(function() {
  $.ajax({
    url: '/fetch_all_feedback',
    type: 'GET',
    data: {
      name: name,
      feedbackId: feedbackId
    },
    success: function(data) {
      // Update the HTML elements with fetched data
      $('#agent-name').text("Welcome " + data['name']);
      $('#feedback-id').text("Your Feedback details for Feedback ID: " + data['feedbackId']);
      $('#incident-number').text(data['incidentNumber']);
      $('#date').text(data['date']);
      $('#feedback-type').text(data['feedbackType']);
      $('#feedback').text(data['feedback']);
      $('#reporting-manager').text(data['reportingManager']);
      $('#aor').text(data['aor']);
      $('#chat-id').text(data['chatId'])
      $('#feedback-by').text(data['feedbackBy']);

    }
  });
});

