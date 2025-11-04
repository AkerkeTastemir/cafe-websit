document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const themeToggle = document.getElementById("themeToggle");
  const THEME_KEY = "cafe_theme";

  const setIcon = (isDark) => {
    themeToggle.textContent = isDark ? "☀️" : "🌙";
  };

  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
    setIcon(true);
  } else {
    setIcon(false);
  }

  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    const isDark = body.classList.contains("dark-mode");
    localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
    setIcon(isDark);
  });
});
