// redirect.js
document.addEventListener('DOMContentLoaded', function() {
  var signupButton = document.getElementById('signup');

  signupButton.addEventListener('click', function() {
      window.location.href = '/signup.html';  // Redirect to /signup.html route in Python
  });
});
