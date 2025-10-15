document.addEventListener("DOMContentLoaded", () => {
  // === BACKGROUND COLOR CHANGE (Extended) ===
  const colorBtn = document.getElementById("colorBtn") || document.getElementById("akerkeColorBtn");
  if (colorBtn) {
    const colors = ["#EBE7DA", "#dba076", "#cc8a74", "#be9c6c", "#998c7f"];
    colorBtn.addEventListener("click", () => {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      document.body.style.backgroundColor = randomColor;

      const carouselSection = document.querySelector(".gallery");
      if (carouselSection) {
        carouselSection.style.backgroundColor = randomColor;
        carouselSection.style.transition = "background-color 0.6s ease";
      }
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

  // === POPUP FORM (Arai's Contact Form) ===
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

  // === FORM VALIDATION (Arai's Contact Form) ===
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

  // === POPUP FORM (Akerke's Coffee Club) ===
  const coffeePopup = document.getElementById("coffeePopup");
  const openPopupBtn = document.getElementById("openPopupBtn");
  const closePopupBtn = document.getElementById("closePopupBtn");
  const coffeeForm = document.getElementById("coffeeForm");

  if (coffeePopup && openPopupBtn && closePopupBtn && coffeeForm) {
    openPopupBtn.addEventListener("click", () => coffeePopup.classList.remove("d-none"));
    closePopupBtn.addEventListener("click", () => coffeePopup.classList.add("d-none"));

    coffeePopup.addEventListener("click", (e) => {
      if (e.target === coffeePopup) coffeePopup.classList.add("d-none");
    });

    coffeeForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let valid = true;

      coffeeForm.querySelectorAll("input").forEach((field) => {
        if (!field.checkValidity()) {
          field.classList.add("is-invalid");
          valid = false;
        } else {
          field.classList.remove("is-invalid");
        }
      });

      if (valid) {
        alert("Thank you for joining our Coffee Club!");
        coffeeForm.reset();
        coffeePopup.classList.add("d-none");
      }
    });
  }
});