// redirect.js

document.addEventListener('DOMContentLoaded', function() {
    var changePasswordLink = document.querySelector('.login-help a');

    changePasswordLink.addEventListener('click', function(event) {
        event.preventDefault();  // Prevent the default link behavior

        window.location.href = 'cpwd.html';  // Redirect to cpwd.html
    });
});
