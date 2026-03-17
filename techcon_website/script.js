document.addEventListener("DOMContentLoaded", () => {

  const forms = document.querySelectorAll("form");

  forms.forEach(form => {
    form.addEventListener("submit", (e) => {
      e.preventDefault(); 

      let valid = true;
      form.querySelectorAll("input[required], textarea[required]").forEach(input => {
        if (!input.value.trim()) {
          valid = false;
        }
      });

      const password = form.querySelector("#password");
      const confirmPassword = form.querySelector("#confirm-password");
      if (password && confirmPassword && password.value !== confirmPassword.value) {
        valid = false;
        alert("Passwords do not match!");
      }

      if (valid) {
        window.location.href = "index.html?success=true";
      } else {
        alert("Please fill in all required fields.");
      }
    });
  });

  
  if (window.location.search.includes("success=true")) {
    const message = document.createElement("div");
    message.textContent = "🎉 You have successfully submitted your form!";
    message.style.background = "#004080";
    message.style.color = "#fff";
    message.style.padding = "15px";
    message.style.margin = "20px auto";
    message.style.textAlign = "center";
    message.style.borderRadius = "6px";
    message.style.fontWeight = "bold";

    const main = document.querySelector("main");
    if (main) {
      main.insertBefore(message, main.firstChild);
    }

    setTimeout(() => {
      message.style.transition = "opacity 1s ease";
      message.style.opacity = "0";
      setTimeout(() => message.remove(), 1000);
    }, 5000);
  }

  const scheduleRows = document.querySelectorAll("tbody tr");
  if (scheduleRows.length > 0) {
    const now = new Date();
    const currentHour = now.getHours();

    scheduleRows.forEach(row => {
      const timeCell = row.querySelector("td[data-label='Time']");
      if (timeCell) {
        const timeText = timeCell.textContent.trim();

        if (timeText.includes("09:00") && currentHour === 9 ||
            timeText.includes("10:30") && currentHour === 10 ||
            timeText.includes("01:30") && currentHour === 13 ||
            timeText.includes("03:00") && currentHour === 15 ||
            timeText.includes("04:30") && currentHour === 16) {
          row.style.backgroundColor = "#ffeb99";
          row.style.fontWeight = "bold";
        }
      }
    });
  }

  const nav = document.querySelector("nav ul");
  if (nav) {
    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = "☰ Menu";
    toggleBtn.className = "menu-toggle";

    nav.parentNode.insertBefore(toggleBtn, nav);

    toggleBtn.addEventListener("click", () => {
      nav.classList.toggle("show");
    });
  }
});