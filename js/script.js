const header = document.querySelector('header');

// Scroll header show
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Nav dropdown menu
document.addEventListener("DOMContentLoaded", () => {
  const dropdown = document.querySelector(".dropdown");
  const toggle = dropdown.querySelector(".dropbtn");
  const menu = dropdown.querySelector(".dropdown-content");

  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.classList.toggle("show");
  });

  menu.addEventListener("click", (e) => e.stopPropagation());

  document.addEventListener("click", () => {
    menu.classList.remove("show");
  });
});

// Carousel
document.querySelectorAll('.carousel').forEach(carousel => {
  const slides = carousel.querySelector('.slides');
  const images = carousel.querySelectorAll('.slides img');
  const prev = carousel.querySelector('.prev');
  const next = carousel.querySelector('.next');
  const dotsContainer = carousel.querySelector('.dots');

  let index = 0;
  let intervalId = null; // store autoplay interval

  // Create dots
  images.forEach((_, i) => {
    const dot = document.createElement('span');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => showSlide(i));
    dotsContainer.appendChild(dot);
  });
  const dots = dotsContainer.querySelectorAll('span');

  function showSlide(i) {
    index = (i + images.length) % images.length;
    slides.style.transform = `translateX(${-index * 100}%)`;
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
  }

  prev.addEventListener('click', () => showSlide(index - 1));
  next.addEventListener('click', () => showSlide(index + 1));

  // Autoplay function
  function startAutoplay() {
    if (!intervalId) {
      intervalId = setInterval(() => showSlide(index + 1), 4000);
    }
  }

  function stopAutoplay() {
    clearInterval(intervalId);
    intervalId = null;
  }

  // Intersection Observer to detect when carousel is visible
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startAutoplay();
      } else {
        stopAutoplay();
      }
    });
  }, { threshold: 0.5 }); // at least 50% visible

  observer.observe(carousel);
});
