function saveFeedback() {

  var helloName = document.querySelector("h1").textContent.trim(); 

  var name = helloName.replace('Hello ', ''); 
  var feedbackData = {
    feedbackType: document.getElementById("feedback-type").value,
    subCategory: document.getElementById("sub-category").value,
    aor: document.getElementById("aor").value,
    teamLeader: document.getElementById("team-leader").value,
    agent: document.getElementById("agents").value,
    incidentNumber: document.getElementById("incident-number").value,
    chatId: document.getElementById("chat-id").value,
    feedbackText: document.getElementById("feedback-text").value,
    feedbackId: document.getElementById("ticket_id").textContent,
    date: document.getElementById("date").textContent,
    name: name
  };

  saveToServer(feedbackData);
}

function saveToServer(data) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/save-feedback", true);  
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        showPopup();
      } else {
        console.error("Failed to save feedback. Error: " + xhr.status);
      }
    }
  };
  xhr.send(JSON.stringify(data));
}

function showPopup() {
  alert("File saved!"); // Display a pop-up message
  location.reload(); // Reset the page
}
