document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    
    // Decode the URL-encoded name
    const decodedName = decodeURIComponent(name);
    
    // Update the h1 tag with the decoded name
    const welcomeMessage = document.getElementById('welcome-message');
    if (decodedName) {
      welcomeMessage.innerText = `Welcome, ${decodedName}!`;
    }
  });
  