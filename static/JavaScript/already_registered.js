$(document).ready(function() {
  var error_message = '{{ error_message }}';
  if (error_message !== '') {
    $('#error-message').text(error_message).show();
  }
});
