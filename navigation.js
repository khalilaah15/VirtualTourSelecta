/**
 * Initializes mobile navigation functionality
 */
export function initMobileNav() {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      
      // Animate hamburger to X
      const spans = navToggle.querySelectorAll('span');
      spans.forEach(span => {
        span.classList.toggle('active');
      });
    });
    
    // Close menu when clicking on a link
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          
          // Revert X to hamburger
          const spans = navToggle.querySelectorAll('span');
          spans.forEach(span => {
            span.classList.remove('active');
          });
        }
      });
    });
  }
}

/**
 * Adds active class to nav links based on scroll position
 */
export function initActiveNavOnScroll() {
  const sections = document.querySelectorAll('section, header');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/**
 * Handles smooth scrolling for anchor links
 */
export function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Creates a back-to-top button that appears after scrolling
 */
export function createBackToTopButton() {
  // Create the button element
  const backToTopBtn = document.createElement('button');
  backToTopBtn.innerHTML = '↑';
  backToTopBtn.classList.add('back-to-top');
  backToTopBtn.title = 'Back to Top';
  document.body.appendChild(backToTopBtn);
  
  // Add styles via JavaScript (alternatively could be in CSS)
  backToTopBtn.style.position = 'fixed';
  backToTopBtn.style.bottom = '20px';
  backToTopBtn.style.right = '20px';
  backToTopBtn.style.width = '50px';
  backToTopBtn.style.height = '50px';
  backToTopBtn.style.borderRadius = '50%';
  backToTopBtn.style.backgroundColor = 'var(--primary-color)';
  backToTopBtn.style.color = 'white';
  backToTopBtn.style.border = 'none';
  backToTopBtn.style.fontSize = '25px';
  backToTopBtn.style.cursor = 'pointer';
  backToTopBtn.style.display = 'none';
  backToTopBtn.style.zIndex = '99';
  backToTopBtn.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
  backToTopBtn.style.transition = 'all 0.3s ease';
  
  // Show/hide the button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.style.display = 'block';
      backToTopBtn.style.opacity = '1';
    } else {
      backToTopBtn.style.opacity = '0';
      setTimeout(() => {
        if (window.pageYOffset <= 300) {
          backToTopBtn.style.display = 'none';
        }
      }, 300);
    }
  });
  
  // Add click event
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Add hover effect
  backToTopBtn.addEventListener('mouseover', () => {
    backToTopBtn.style.backgroundColor = 'var(--primary-dark)';
    backToTopBtn.style.transform = 'translateY(-3px)';
  });
  
  backToTopBtn.addEventListener('mouseout', () => {
    backToTopBtn.style.backgroundColor = 'var(--primary-color)';
    backToTopBtn.style.transform = 'translateY(0)';
  });
}