// script.js

document.addEventListener('DOMContentLoaded', () => {
  // Menú hamburguesa responsive
  const menuToggle = document.getElementById('menu-toggle');
  const navbar = document.getElementById('navbar');

  if (menuToggle && navbar) {
    menuToggle.addEventListener('click', () => {
      navbar.classList.toggle('open');
    });
  }

  // Animación de entrada (fade-in)
  const elements = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));

  // Modal de imágenes
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");
  const galleryImages = document.querySelectorAll(".gallery-img");
  const closeBtn = document.querySelector(".close");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");

  let currentIndex = 0;

  function showImage(index) {
    if (index >= 0 && index < galleryImages.length) {
      modalImg.src = galleryImages[index].src;
      currentIndex = index;
    }
  }

  galleryImages.forEach((img, index) => {
    img.addEventListener("click", () => {
      modal.style.display = "block";
      showImage(index);
    });
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  prevBtn.addEventListener("click", () => {
    showImage(currentIndex - 1);
  });

  nextBtn.addEventListener("click", () => {
    showImage(currentIndex + 1);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") modal.style.display = "none";
    if (e.key === "ArrowLeft") showImage(currentIndex - 1);
    if (e.key === "ArrowRight") showImage(currentIndex + 1);
  });
});

// Scroll suave para los enlaces del menú (fuera del DOMContentLoaded)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});