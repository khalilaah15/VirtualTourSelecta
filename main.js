import './style.css';
import { tours, } from './data.js';
import { initScrollAnimations, applyParallax, createRipple, initNavbarEffect, initCardTiltEffect } from './animations.js';
import { initMobileNav, initActiveNavOnScroll, initSmoothScroll, createBackToTopButton } from './navigation.js';
import { createTourPages } from './tours.js';

// Initialize the website
document.addEventListener('DOMContentLoaded', () => {
  
  // Populate tour cards
  populateTours();
  
  // Initialize navigation
  initMobileNav();
  initActiveNavOnScroll();
  initSmoothScroll();
  createBackToTopButton();
  
  // Initialize animations
  initScrollAnimations();
  initNavbarEffect();
  
  // Apply parallax effect to hero section
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    heroSection.dataset.speed = -0.2;
    applyParallax(heroSection);
  }
  
  // Add ripple effect to buttons
  const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
  buttons.forEach(button => {
    button.addEventListener('click', createRipple);
  });
  
  // Initialize card tilt effect
  setTimeout(() => {
    const attractionCards = document.querySelectorAll('.attraction-card');
    const tourCards = document.querySelectorAll('.tour-card');
    initCardTiltEffect(attractionCards);
    initCardTiltEffect(tourCards);
  }, 500);
  
  // Create tour pages (in a real implementation)
  createTourPages(tours);

});

/**
 * Populates the tours section with data
 */
function populateTours() {
  const tourCards = document.querySelector('.tour-cards');
  if (!tourCards) return;
  
  tours.forEach(tour => {
    const tourCard = document.createElement('div');
    tourCard.className = 'tour-card';
    tourCard.setAttribute('data-animate', 'animate-fade-in');
    
    tourCard.innerHTML = `
      <div class="tour-img">
        <img src="${tour.image}" alt="${tour.name}">
      </div>
      <div class="tour-content">
        <h3>${tour.name}</h3>
        <p>${tour.description}</p>
      </div>
      <div class="tour-footer">
        <a href="${tour.tourUrl}" class="btn-primary">Start Tour</a>
      </div>
    `;
    
    tourCards.appendChild(tourCard);
  });
  
  // Add event listeners to tour detail buttons
  const detailButtons = document.querySelectorAll('.tour-details-btn');
  detailButtons.forEach((button, index) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      showTourDetails(tours[index]);
    });
  });
}

/**
 * Shows tour details in a modal
 * @param {Object} tour - Tour data object
 */
function showTourDetails(tour) {
  // Create modal element
  const modal = document.createElement('div');
  modal.className = 'tour-modal';
  
  modal.innerHTML = `
    <div class="tour-modal-content">
      <span class="close-modal">&times;</span>
      <img src="${tour.image}" alt="${tour.name}" class="modal-image">
      <h2>${tour.name}</h2>
      <p class="tour-description">${tour.description}</p>
      <div class="tour-details">
        <div class="detail-item">
          <span class="label">Duration:</span>
          <span class="value">${tour.duration}</span>
        </div>
        <div class="detail-item">
          <span class="label">Difficulty:</span>
          <span class="value">${tour.difficulty}</span>
        </div>
        <div class="detail-item">
          <span class="label">Featured:</span>
          <span class="value">${tour.featured ? 'Yes' : 'No'}</span>
        </div>
      </div>
      <a href="${tour.tourUrl}" class="btn-primary start-tour-btn">Start Virtual Tour</a>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Add styles to modal
  Object.assign(modal.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: '2000',
    opacity: '0',
    transition: 'opacity 0.3s ease'
  });
  
  const modalContent = modal.querySelector('.tour-modal-content');
  Object.assign(modalContent.style, {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '8px',
    width: '90%',
    maxWidth: '600px',
    maxHeight: '90vh',
    overflow: 'auto',
    transform: 'translateY(20px)',
    transition: 'transform 0.3s ease'
  });
  
  // Add style for modal image
  const modalImage = modal.querySelector('.modal-image');
  Object.assign(modalImage.style, {
    width: '100%',
    height: '250px',
    objectFit: 'cover',
    borderRadius: '4px',
    marginBottom: '20px'
  });
  
  // Close modal function
  const closeModal = () => {
    modal.style.opacity = '0';
    modalContent.style.transform = 'translateY(20px)';
    setTimeout(() => {
      modal.remove();
    }, 300);
  };
  
  // Add event listener to close button
  const closeButton = modal.querySelector('.close-modal');
  closeButton.addEventListener('click', closeModal);
  
  // Close when clicking outside
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
  
  // Close on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
  
  // Trigger animation
  setTimeout(() => {
    modal.style.opacity = '1';
    modalContent.style.transform = 'translateY(0)';
  }, 10);
}

/**
 * Shows a notification message
 * @param {string} message - The message to display
 * @param {string} type - The type of notification ('success', 'error', etc.)
 */
function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  
  // Style the notification
  Object.assign(notification.style, {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    padding: '15px 20px',
    borderRadius: '4px',
    color: 'white',
    fontWeight: '500',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    zIndex: '2000',
    transform: 'translateY(100px)',
    opacity: '0',
    transition: 'all 0.3s ease'
  });
  
  // Set background color based on type
  if (type === 'success') {
    notification.style.backgroundColor = 'var(--success-color)';
  } else if (type === 'error') {
    notification.style.backgroundColor = 'var(--error-color)';
  } else if (type === 'warning') {
    notification.style.backgroundColor = 'var(--warning-color)';
  } else {
    notification.style.backgroundColor = 'var(--secondary-color)';
  }
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateY(0)';
    notification.style.opacity = '1';
  }, 10);
  
  // Automatically remove after 5 seconds
  setTimeout(() => {
    notification.style.transform = 'translateY(100px)';
    notification.style.opacity = '0';
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 5000);
}