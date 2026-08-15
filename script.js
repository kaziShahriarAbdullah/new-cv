/* =========================================================
   PORTFOLIO JAVASCRIPT
   Handles: mobile menu toggle, typing effect, active nav link
   on scroll, scroll-reveal animation, and footer year.
   ========================================================= */

// Run our code only after the full HTML document has loaded
document.addEventListener("DOMContentLoaded", function () {

  /* ---------------------------------------------------------
     1) MOBILE MENU TOGGLE
     Clicking the hamburger button opens/closes the nav links.
     --------------------------------------------------------- */
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");

  menuBtn.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("open");
    menuBtn.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", isOpen);
  });

  // Close the mobile menu automatically after a link is clicked,
  // and mark the clicked link as active (no scroll-tracking needed -
  // this replaces the old scroll listener that used to get stuck
  // showing "Home" as active no matter where you scrolled to).
  document.querySelectorAll(".nav-link").forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.classList.remove("open");

      document.querySelectorAll(".nav-link").forEach(function (l) {
        l.classList.remove("active-link");
      });
      link.classList.add("active-link");
    });
  });

  /* ---------------------------------------------------------
     2) TYPING EFFECT FOR THE ROLE TEXT
     Cycles through a list of job titles / roles, typing each
     one letter by letter, pausing, then deleting it.
     --------------------------------------------------------- */
  const roles = ["6th Semester Student", "Web Developer", "Problem Solver", "Lifelong Learner"];
  const typedTextEl = document.getElementById("typedText");

  let roleIndex = 0;      // which word in the roles array we're on
  let charIndex = 0;      // which letter of the current word we're on
  let isDeleting = false; // are we typing forward or deleting backward?

  function typeLoop() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      // remove one character
      charIndex--;
      typedTextEl.textContent = currentRole.substring(0, charIndex);
    } else {
      // add one character
      charIndex++;
      typedTextEl.textContent = currentRole.substring(0, charIndex);
    }

    let typingSpeed = isDeleting ? 60 : 120;

    if (!isDeleting && charIndex === currentRole.length) {
      // finished typing the word -> pause, then start deleting
      typingSpeed = 1400;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      // finished deleting -> move to the next word
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400;
    }

    setTimeout(typeLoop, typingSpeed);
  }

  typeLoop(); // kick off the typing animation

  /* ---------------------------------------------------------
     3) SCROLL-REVEAL ANIMATION
     Fade + slide sections into view as they enter the viewport,
     using the IntersectionObserver API (no external library).
     --------------------------------------------------------- */
  const revealTargets = document.querySelectorAll(
    ".section, .skill-card, .project-card"
  );

  // set the starting (invisible) state via JS so it still
  // works even if someone disables JavaScript-driven CSS classes
  revealTargets.forEach(function (el) {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  });

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target); // only animate once
        }
      });
    },
    { threshold: 0.15 } // trigger when 15% of the element is visible
  );

  revealTargets.forEach(function (el) {
    observer.observe(el);
  });

  /* ---------------------------------------------------------
     4) AUTO-UPDATE FOOTER YEAR
     --------------------------------------------------------- */
  document.getElementById("year").textContent = new Date().getFullYear();

});
