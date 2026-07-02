// ===============================
// Portfolio Website Script
// ===============================
const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
const toTop = document.getElementById("toTop");
const yearSpan = document.getElementById("year");

if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// ===============================
// THEME (default = navy)
// Click cycles through 4 palettes: navy -> paper -> sunset -> slate
// ===============================
const THEMES = ["navy", "paper", "sunset", "slate"];

function applyTheme(theme) {
  if (!THEMES.includes(theme)) theme = "navy";
  root.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

applyTheme(localStorage.getItem("theme") || "navy");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") || "navy";
    const next = THEMES[(THEMES.indexOf(current) + 1) % THEMES.length];
    applyTheme(next);
  });
}

// ===============================
// MOBILE MENU
// ===============================
if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
    });
  });
}

// ===============================
// SCROLL REVEAL
// ===============================
const revealItems = document.querySelectorAll(".fade-up");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.12 }
);
revealItems.forEach(item => observer.observe(item));

// ===============================
// SCROLL SPY + BACK TO TOP
// ===============================
const sections = document.querySelectorAll("section[id]");
const navLinks = nav ? nav.querySelectorAll("a") : [];

function scrollSpy() {
  const scrollPosition = window.scrollY + 110;
  sections.forEach(section => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute("id");
    if (scrollPosition >= top && scrollPosition < bottom) {
      navLinks.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === "#" + id);
      });
    }
  });
  if (toTop) {
    if (window.scrollY > 450) {
      toTop.classList.add("show");
    } else {
      toTop.classList.remove("show");
    }
  }
}
window.addEventListener("scroll", scrollSpy, { passive: true });
scrollSpy();
