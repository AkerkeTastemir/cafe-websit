document.addEventListener("DOMContentLoaded", () => {
  // === BACKGROUND COLOR ===
  const colorBtn = document.getElementById("colorBtn");
  if (colorBtn) {
    const colors = ["#EBE7DA", "#dba076ff", "#cc8a74ff", "#be9c6cff", "#998c7fff"];
    colorBtn.addEventListener("click", () => {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      document.body.style.backgroundColor = randomColor;
    });
  }

  // === DATE & TIME ===
  const datetime = document.getElementById("datetime");
  if (datetime) {
    const updateTime = () => {
      const now = new Date();
      datetime.textContent = now.toLocaleString("en-US", {
        dateStyle: "long",
        timeStyle: "short"
      });
    };
    updateTime();
    setInterval(updateTime, 1000);
  }

  // === POPUP FORM ===
  const popup = document.getElementById("popupForm");
  const openBtn = document.getElementById("openFormBtn");
  const closeBtn = document.getElementById("closeFormBtn");
  if (popup && openBtn && closeBtn) {
    openBtn.addEventListener("click", () => popup.classList.remove("d-none"));
    closeBtn.addEventListener("click", () => popup.classList.add("d-none"));
    popup.addEventListener("click", e => {
      if (e.target === popup) popup.classList.add("d-none");
    });
  }

  // === FORM VALIDATION ===
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      let valid = true;

      form.querySelectorAll("input, textarea").forEach(field => {
        if (!field.checkValidity()) {
          field.classList.add("is-invalid");
          valid = false;
        } else {
          field.classList.remove("is-invalid");
        }
      });

      if (valid) {
        alert("Form submitted successfully!");
        form.reset();
        popup.classList.add("d-none");
      }
    });
  }
});
