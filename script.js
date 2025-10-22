// === Café Leaclercc Interactive Script ===
document.addEventListener("DOMContentLoaded", () => {

  /* ========== 1. BACKGROUND COLOR CHANGE ========== */
  const colorBtn = document.getElementById("colorBtn") || document.getElementById("akerkeColorBtn");
  if (colorBtn) {
    const colors = ["#EBE7DA", "#dba076", "#cc8a74", "#be9c6c", "#998c7f"];
    colorBtn.addEventListener("click", () => {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      document.body.style.backgroundColor = randomColor;

      const gallery = document.querySelector(".gallery");
      if (gallery) {
        gallery.style.backgroundColor = randomColor;
        gallery.style.transition = "background-color 0.6s ease";
      }

      playSound(); 
    });
  }

  /* ========== NEW: READ MORE TOGGLE ========== */
  const readMoreBtn = document.getElementById("readMoreBtn");
  const moreText = document.getElementById("moreText");
  if (readMoreBtn && moreText) {
    readMoreBtn.addEventListener("click", () => {
      const hidden = moreText.classList.contains("d-none");
      moreText.classList.toggle("d-none");
      readMoreBtn.textContent = hidden ? "Show less" : "Read more";
    });
  
  }



  /* ========== 2. CURRENT DATE & TIME ========== */
  const datetime = document.getElementById("datetime");
  if (datetime) {
    const updateTime = () => {
      const now = new Date();
      datetime.textContent = now.toLocaleString("en-US", {
        dateStyle: "long",
        timeStyle: "short",
      });
    };
    updateTime();
    setInterval(updateTime, 1000);
  }

  /* ========== 3. POPUP FORM (Arai's Contact Form) ========== */
  const popup = document.getElementById("popupForm");
  const openBtn = document.getElementById("openFormBtn");
  const closeBtn = document.getElementById("closeFormBtn");

  if (popup && openBtn && closeBtn) {
    openBtn.addEventListener("click", () => {
      popup.classList.remove("d-none");
      playSound(); 
    });

    closeBtn.addEventListener("click", () => popup.classList.add("d-none"));

    popup.addEventListener("click", (e) => {
      if (e.target === popup) popup.classList.add("d-none");
    });
  }

  /* ========== 4. FORM VALIDATION (email check with @) ========== */
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let valid = true;

      form.querySelectorAll("input, textarea").forEach((field) => {
        
        if (!field.checkValidity()) {
          field.classList.add("is-invalid");
          valid = false;
        } else {
          field.classList.remove("is-invalid");
        }

        // @
        if (field.type === "email") {
          const emailValue = field.value.trim();
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(emailValue)) {
            field.classList.add("is-invalid");
            valid = false;
            let feedback = field.parentElement.querySelector(".invalid-feedback");
            if (feedback) {
              feedback.textContent = "Please enter a valid email (must include @ and a domain).";
            }
          } else {
            field.classList.remove("is-invalid");
          }
        }
      });

      if (valid) {
        playSound(); 
        alert("✅ Form submitted successfully!");
        form.reset();
        popup.classList.add("d-none");
      }
    });
  }

  /* ========== 5. POPUP FORM (Akerke's Coffee Club) ========== */
  const coffeePopup = document.getElementById("coffeePopup");
  const openPopupBtn = document.getElementById("openPopupBtn");
  const closePopupBtn = document.getElementById("closePopupBtn");
  const coffeeForm = document.getElementById("coffeeForm");

  if (coffeePopup && openPopupBtn && closePopupBtn && coffeeForm) {
    openPopupBtn.addEventListener("click", () => {
      coffeePopup.classList.remove("d-none");
      playSound(); 
    });

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
        playSound(); // 
        alert("☕ Thank you for joining our Coffee Club!");
        coffeeForm.reset();
        coffeePopup.classList.add("d-none");
      }
    });
  }

  /* ========== 6. SWITCH STATEMENT (Greeting based on time) ========== */
  const now = new Date();
  const hour = now.getHours();
  let greeting;
  switch (true) {
    case hour < 12:
      greeting = "Good morning ☀️";
      break;
    case hour < 18:
      greeting = "Good afternoon ☕";
      break;
    default:
      greeting = "Good evening 🌙";
  }

  
  let greetBox = document.getElementById("greetingMessage");
  if (!greetBox) {
    greetBox = document.createElement("p");
    greetBox.id = "greetingMessage";
    greetBox.className = "fw-bold text-center mt-3";
    document.body.prepend(greetBox);
  }
  greetBox.textContent = greeting;

  /* ========== 7. KEYBOARD EVENT (Navigation hint) ========== */
  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      console.log("← You pressed Arrow Left (previous page)");
      playSound();
    } else if (event.key === "ArrowRight") {
      console.log("→ You pressed Arrow Right (next page)");
      playSound();
    }
  });

  /* ========== 8. SOUND FUNCTION (Local pop sound) ========== */
  const sound = new Audio("sounds/whoo.mp3");

  function playSound() {
    sound.currentTime = 0; 
    sound.play().catch((err) => {
      console.warn("Audio play blocked until user interaction:", err);
    });
  }
});

// Star rating (accessible, keyboard-friendly, with localStorage)
(function initStarRating() {
  const list = document.getElementById("stars");
  const output = document.getElementById("ratingValue");
  if (!list) return;

  const items = Array.from(list.querySelectorAll("li[data-value]"));
  const storageKey = "cafe_rating_value";
  let value = Number(localStorage.getItem(storageKey)) || 0;

  function setAria(index) {
    items.forEach((el, i) => {
      el.setAttribute("aria-checked", String(i + 1 === index));
      el.tabIndex = i + 1 === index ? 0 : -1;
    });
  }

  function paint(n) {
    items.forEach((el, i) => {
      el.classList.toggle("active", i < n);
    });
  }

  function update(n, persist = true) {
    value = n;
    paint(n);
    setAria(n);
    if (output) output.textContent = n ? `${n}/5` : "";
    if (persist) localStorage.setItem(storageKey, String(n));
  }

  function hover(n) {
    items.forEach((el, i) => {
      el.classList.toggle("hover", i < n);
    });
  }

  // Init from storage
  if (value > 0) update(value, false);

  // Mouse interactions
  items.forEach((el) => {
    const n = Number(el.dataset.value);

    el.addEventListener("mouseenter", () => hover(n));
    el.addEventListener("mouseleave", () => hover(0));

    el.addEventListener("click", () => {
      update(n);
    });
  });

  // Keyboard interactions on the radiogroup
  list.addEventListener("keydown", (e) => {
    const currentIndex = value ? value : 0;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(5, (currentIndex || 0) + 1);
      update(next);
      items[next - 1].focus();
    }
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      const prev = Math.max(1, (currentIndex || 1) - 1);
      update(prev);
      items[prev - 1].focus();
    }
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      const focused = document.activeElement;
      const n = focused && focused.dataset ? Number(focused.dataset.value) : currentIndex;
      if (n) update(n);
    }
  });

  // Ensure first focusable when unset
  if (!value) {
    items[0].tabIndex = 0;
  } else {
    items[value - 1].tabIndex = 0;
  }
})();

/* ========== 9. SCROLL ANIMATIONS ========== */
const animatedEls = document.querySelectorAll(".animate-up");

function showOnScroll() {
  const trigger = window.innerHeight * 0.85;
  animatedEls.forEach((el) => {
    const top = el.getBoundingClientRect().top;
    if (top < trigger) el.classList.add("visible");
  });
}

window.addEventListener("scroll", showOnScroll);
window.addEventListener("load", showOnScroll);

/* ========== 10. NAV SOUND (robust) ========== */
// 1) Build a safe absolute URL to avoid relative-path surprises on different pages
const navSound = new Audio(new URL("sounds/pop.mp3", location.href).href);
navSound.preload = "auto";
navSound.volume = 0.9;

// 2) Unlock audio on first user interaction (Safari/iOS/Chrome policies)
let audioUnlocked = false;
function unlockAudio() {
  if (audioUnlocked) return;
  try {
    // a super-short silent play to unlock; immediately pause
    navSound.muted = true;
    const p = navSound.play();
    if (p && typeof p.then === "function") {
      p.finally(() => {
        navSound.pause();
        navSound.currentTime = 0;
        navSound.muted = false;
        audioUnlocked = true;
      });
    } else {
      navSound.pause();
      navSound.currentTime = 0;
      navSound.muted = false;
      audioUnlocked = true;
    }
  } catch (_) { /* ignore */ }
}
["pointerdown","touchstart","keydown"].forEach(ev =>
  document.addEventListener(ev, unlockAudio, { once: true, passive: true })
);

// 3) Play helper
function playNavSound() {
  try {
    navSound.currentTime = 0;
    navSound.play().catch(() => {});
  } catch (_) {}
}

// 4) Delegate on the nav to catch all links reliably
const nav = document.querySelector("nav");
if (nav) {
  nav.addEventListener("mousedown", (e) => {
    const a = e.target.closest("a");
    if (!a) return;
    // mousedown fires earlier than click — звук стартует до навигации
    playNavSound();
  });

  nav.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a) return;

    // Respect new-tab/middle/modified clicks
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;

    const href = a.getAttribute("href");
    if (!href || href.startsWith("#")) {
      // same-page anchor — не задерживаем
      return;
    }

    // Same-origin page navigation: delay a bit so the sound is audible
    const url = new URL(href, location.href);
    if (url.origin === location.origin) {
      e.preventDefault();
      // Если аудио не успело разлочиться, mousedown выше уже пытался
      playNavSound();
      setTimeout(() => (window.location.href = url.href), 220); // подгони под длину whoo.mp3
    }
  });
}
