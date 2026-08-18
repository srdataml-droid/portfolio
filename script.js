// =====================================================================
// Portfolio behaviour: plain JavaScript, no libraries.
// Three small jobs:
//   1. Mobile menu (hamburger) open/close
//   2. Close the menu when a nav link is clicked
//   3. Reveal section headings with a subtle fade as you scroll
// =====================================================================

// ---- 1 & 2. Mobile menu ----
// We grab the button and the menu from the page.
const toggle = document.getElementById("nav-toggle");
const links = document.getElementById("nav-links");

// Clicking the hamburger adds/removes the "open" class.
// CSS (.nav-links.open) decides how it looks; JS only flips the class.
if (toggle && links) {
  toggle.addEventListener("click", () => {
    links.classList.toggle("open");
  });

  // Clicking any link inside the menu closes it again (nice on phones).
  links.addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
      links.classList.remove("open");
    }
  });
}

// ---- 3. Reveal headings on scroll ----
// Anything with class "reveal" starts invisible (opacity 0) and fades in
// when it enters the viewport. See the matching CSS at the bottom of style.css.
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  // IntersectionObserver fires a callback whenever an element enters/leaves
  // the visible part of the screen. Cleaner than listening to every scroll.
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // only animate once
        }
      });
    },
    { threshold: 0.2 } // trigger when 20% of the element is visible
  );

  revealElements.forEach((el) => observer.observe(el));
} else {
  // Fallback for very old browsers: just show everything.
  revealElements.forEach((el) => el.classList.add("visible"));
}

// ---- (Optional) footer year ----
// Keeps the copyright year up to date automatically.
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
