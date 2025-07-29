document.addEventListener("DOMContentLoaded", function () {
  // Theme Toggle
  const themeToggle = document.getElementById("theme-toggle");
  const mobileThemeToggle = document.getElementById("mobile-theme-toggle");
  const currentTheme = localStorage.getItem("theme") || "light";

  document.documentElement.setAttribute("data-theme", currentTheme);

  if (currentTheme === "dark") {
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }

  themeToggle.addEventListener("click", toggleTheme);
  mobileThemeToggle.addEventListener("click", toggleTheme);

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);

    if (newTheme === "dark") {
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
  }

  // Mobile Menu
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const mobileMenu = document.querySelector(".mobile-menu");

  mobileMenuBtn.addEventListener("click", function () {
    mobileMenu.classList.toggle("active");
    this.innerHTML = mobileMenu.classList.contains("active")
      ? '<i class="fas fa-times"></i>'
      : '<i class="fas fa-bars"></i>';
  });

  // Close mobile menu when clicking a link
  document.querySelectorAll(".mobile-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
      mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Header scroll effect
  const header = document.querySelector(".fixed-header");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      header.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.1)";
    } else {
      header.style.boxShadow = "none";
    }
  });

  // Animate stats counter
  const statNumbers = document.querySelectorAll(".stat-number");

  function animateStats() {
    statNumbers.forEach((stat) => {
      const target = parseInt(stat.getAttribute("data-count"));
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;

      const updateCount = () => {
        current += step;
        if (current < target) {
          stat.textContent = Math.floor(current);
          requestAnimationFrame(updateCount);
        } else {
          stat.textContent = target + "+";
        }
      };

      updateCount();
    });
  }

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains("about-stats")) {
          animateStats();
        }

        entry.target.classList.add("aos-animate");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll("[data-aos]").forEach((element) => {
    observer.observe(element);
  });

  // Set current year in footer
  document.getElementById("year").textContent = new Date().getFullYear();

  // Form submission
  const contactForm = document.getElementById("contact-form");

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Here you would typically send the form data to a server
    // For demo purposes, we'll just show an alert
    alert("Thank you for your message! I will get back to you soon.");
    this.reset();
  });
});
