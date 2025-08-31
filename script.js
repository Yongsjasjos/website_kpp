document.addEventListener("DOMContentLoaded", () => {
  // === Loader ===
  const loader = document.getElementById('loader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 500);
      }, 1500); // Durasi loader dikurangi agar lebih cepat
    });
  }

  // === Theme Toggle ===
  const themeToggle = document.getElementById('toggleTheme');
  const body = document.body;
  if (themeToggle) {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') body.classList.add('dark');

    themeToggle.addEventListener('click', () => {
      body.classList.toggle('dark');
      localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
    });
  }

  // === Navbar Mobile Toggle ===
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : 'auto';
    });

    // Tutup menu saat klik link di mobile
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        document.body.style.overflow = 'auto';
      });
    });
  }

  // === Carousel ===
  const slides = document.querySelectorAll('.slide');
  const carousel = document.querySelector('.carousel');
  let currentSlide = 0;
  let slideInterval;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
  }

  function startCarousel() {
    slideInterval = setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }, 5000);
  }

  function stopCarousel() {
    clearInterval(slideInterval);
  }

  if (slides.length > 0) {
    showSlide(currentSlide);
    startCarousel();

    // Pause carousel saat hover
    if (carousel) {
      carousel.addEventListener('mouseenter', stopCarousel);
      carousel.addEventListener('mouseleave', startCarousel);
    }
  }
});
