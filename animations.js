// This file contains animation-related functions for the website

/**
 * Applies scroll animation to elements with data-animate attribute
 */
export function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('[data-animate]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const animation = element.dataset.animate;
        element.classList.add(animation);
        observer.unobserve(element);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  animatedElements.forEach(element => {
    observer.observe(element);
  });
}

/**
 * Applies parallax effect to the element
 * @param {HTMLElement} element - The element to apply parallax to
 */
export function applyParallax(element) {
  window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;
    const speed = element.dataset.speed || 0.5;
    element.style.transform = `translateY(${scrollPosition * speed}px)`;
  });
}

/**
 * Creates a ripple effect on button click
 * @param {Event} e - The click event
 */
export function createRipple(e) {
  const button = e.currentTarget;
  const circle = document.createElement('span');
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  
  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${e.clientX - button.offsetLeft - diameter / 2}px`;
  circle.style.top = `${e.clientY - button.offsetTop - diameter / 2}px`;
  circle.classList.add('ripple');
  
  const ripple = button.querySelector('.ripple');
  if (ripple) {
    ripple.remove();
  }
  
  button.appendChild(circle);
}

/**
 * Initializes navbar scroll effect
 */
export function initNavbarEffect() {
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/**
 * Animates counter from 0 to target value
 * @param {HTMLElement} element - The element containing the counter
 * @param {number} target - The target value
 * @param {number} duration - Animation duration in milliseconds
 */
export function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  
  const updateCounter = () => {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  };
  
  updateCounter();
}

/**
 * Adds smooth hover effect to cards
 * @param {NodeList} cards - Collection of card elements
 */
export function initCardTiltEffect(cards) {
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const cardRect = card.getBoundingClientRect();
      const x = e.clientX - cardRect.left;
      const y = e.clientY - cardRect.top;
      
      const centerX = cardRect.width / 2;
      const centerY = cardRect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
  });
}

function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    // Jika posisi scroll lebih dari 50px (Anda bisa menyesuaikan nilai ini)
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled'); // Tambahkan class 'scrolled'
    } else {
        navbar.classList.remove('scrolled'); // Hapus class 'scrolled'
    }
}

// Tambahkan event listener untuk event 'scroll' pada window
window.addEventListener('scroll', handleNavbarScroll);

// Panggil fungsi sekali saat halaman dimuat (untuk kasus refresh di tengah halaman)
document.addEventListener('DOMContentLoaded', handleNavbarScroll);


// Kode JavaScript lainnya di main.js Anda (misalnya untuk nav-toggle, dll.)
// Pastikan kode ini TIDAK menimpa kode navbar Anda yang sudah ada.
// Contoh:
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close nav links when a link is clicked (for mobile)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });
});