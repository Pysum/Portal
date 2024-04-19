// redirect.js

document.addEventListener('DOMContentLoaded', function() {
    var signupForm = document.querySelector('#signup-form');

    signupForm.addEventListener('submit', function(event) {
        event.preventDefault();  // Prevent the form submission

        // Perform any necessary form validation here

        window.location.href = 'signup_success.html';  // Redirect to signup_success.html
    });
});
