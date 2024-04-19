const monthLabel = document.getElementById("monthLabel");
const monthSelect = document.getElementById("month");

monthLabel.addEventListener("click", () => {
  if (monthSelect.style.display === "none") {
    monthSelect.style.display = "block";
  } else {
    monthSelect.style.display = "none";
  }
});
