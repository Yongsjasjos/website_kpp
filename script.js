document.addEventListener("DOMContentLoaded", () => {
  // === Loader ===
  const loader = document.getElementById("loader");
  if (loader) {
    window.addEventListener("load", () => {
      setTimeout(() => {
        loader.style.opacity = "0";
        setTimeout(() => {
          loader.style.display = "none";
        }, 500);
      }, 1500); // 1,5 detik delay sebelum fade-out
    });
  }

  // === Theme Toggle ===
  const themeToggle = document.getElementById("toggleTheme");
  const body = document.body;
  if (themeToggle) {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      body.classList.add("dark");
    }

    themeToggle.addEventListener("click", () => {
      body.classList.toggle("dark");
      const currentTheme = body.classList.contains("dark") ? "dark" : "light";
      localStorage.setItem("theme", currentTheme);
    });
  }

  // === Navbar Mobile Toggle ===
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  // Reset pengguna reload jika menu masih terbuka
  if (navMenu && navMenu.classList.contains("open")) {
    navMenu.classList.remove("open");
    document.body.style.overflow = "auto";
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("open");
      document.body.style.overflow = navMenu.classList.contains("open") ? "hidden" : "auto";
    });

    // Tutup menu saat klik menu item (di mobile)
    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        document.body.style.overflow = "auto";
      });
    });
  }

  // Pastikan menu ditutup saat resize ke layar lebih besar (>768px)
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && navMenu && navMenu.classList.contains("open")) {
      navMenu.classList.remove("open");
      document.body.style.overflow = "auto";
    }
  });

  // === Carousel ===
  const slides = document.querySelectorAll(".slide");
  const carousel = document.querySelector(".carousel");
  let currentSlide = 0;
  let slideInterval;

  const showSlide = (index) => {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
  };

  const startCarousel = () => {
    slideInterval = setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }, 5000); // Pergantian slide setiap 5 detik
  };

  const stopCarousel = () => {
    clearInterval(slideInterval);
  };

  if (slides.length > 0) {
    showSlide(currentSlide);
    startCarousel();

    if (carousel) {
      carousel.addEventListener("mouseenter", stopCarousel);
      carousel.addEventListener("mouseleave", startCarousel);
    }
  }
});
