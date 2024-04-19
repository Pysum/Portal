// home_button.js

document.addEventListener('DOMContentLoaded', function() {
    var homeLink = document.getElementById('home-link');
  
    homeLink.addEventListener('click', function(event) {
      event.preventDefault();  // Prevent the default link behavior
  
      window.location.href = 'login.html';  // Redirect to login.html
    });
  });
  