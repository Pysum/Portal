document.addEventListener("DOMContentLoaded", function() {
  const myFeedbackLink = document.querySelector(".view-options");
  const container = document.querySelector(".container");

  // Initially hide the container
  container.style.display = "none";

  myFeedbackLink.addEventListener("click", function(event) {
    event.preventDefault();
    if (container.style.display === "none") {
      container.style.display = "flex";
    } else {
      container.style.display = "none";
    }
  });
});