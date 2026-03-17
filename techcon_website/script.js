document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Form Validation ---------- */
  const forms = document.querySelectorAll("form");

  forms.forEach(form => {
    form.addEventListener("submit", e => {
      e.preventDefault();

      let valid = true;

      // Check required fields
      form.querySelectorAll("input[required], textarea[required]").forEach(input => {
        if (!input.value.trim()) valid = false;
      });

      // Password confirmation
      const password = form.querySelector("#password");
      const confirmPassword = form.querySelector("#confirm-password");
      if (password && confirmPassword && password.value !== confirmPassword.value) {
        valid = false;
        alert("Passwords do not match!");
      }

      // Redirect or alert
      if (valid) {
        window.location.href = "index.html?success=true";
      } else {
        alert("Please fill in all required fields.");
      }
    });
  });

  /* ---------- Success Message ---------- */
  if (window.location.search.includes("success=true")) {
    const message = document.createElement("div");
    message.textContent = "🎉 You have successfully submitted your form!";
    Object.assign(message.style, {
      background: "#004080",
      color: "#fff",
      padding: "15px",
      margin: "20px auto",
      textAlign: "center",
      borderRadius: "6px",
      fontWeight: "bold"
    });

    const main = document.querySelector("main");
    if (main) main.insertBefore(message, main.firstChild);

    setTimeout(() => {
      message.style.transition = "opacity 1s ease";
      message.style.opacity = "0";
      setTimeout(() => message.remove(), 1000);
    }, 5000);
  }

  /* ---------- Highlight Current Schedule Row ---------- */
  const scheduleRows = document.querySelectorAll("tbody tr");
  if (scheduleRows.length) {
    const currentHour = new Date().getHours();

    const highlightMap = {
      "09:00": 9,
      "10:30": 10,
      "01:30": 13,
      "03:00": 15,
      "04:30": 16
    };

    scheduleRows.forEach(row => {
      const timeCell = row.querySelector("td[data-label='Time']");
      if (timeCell) {
        const timeText = timeCell.textContent.trim();
        for (const [time, hour] of Object.entries(highlightMap)) {
          if (timeText.includes(time) && currentHour === hour) {
            row.style.backgroundColor = "#ffeb99";
            row.style.fontWeight = "bold";
          }
        }
      }
    });
  }

  /* ---------- Mobile Menu Toggle ---------- */
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