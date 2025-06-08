// This file manages virtual tour functionality

/**
 * Creates tour pages dynamically
 * @param {Array} tourData - Array of tour objects
 */
export function createTourPages(tourData) {
  // This would typically create the actual tour pages
  // For demo purposes, we're just setting up the structure
  
  tourData.forEach(tour => {
    // In a real implementation, this would create actual HTML files
    console.log(`Virtual tour page created for: ${tour.name}`);
  });
}

/**
 * Initializes panorama viewer for 360° virtual tour
 * @param {string} elementId - ID of the container element
 * @param {string} imageUrl - URL of the panorama image
 */
export function initPanoramaViewer(elementId, imageUrl) {
  // This is a placeholder for panorama viewer initialization
  // In a real implementation, you would use a library like Pannellum or Three.js
  
  console.log(`Initialized panorama viewer in ${elementId} with image: ${imageUrl}`);
  
  // Example code for a real implementation with Pannellum would look like:
  /*
  pannellum.viewer(elementId, {
    type: 'equirectangular',
    panorama: imageUrl,
    autoLoad: true,
    compass: true,
    hotSpots: [
      {
        pitch: -10,
        yaw: 30,
        type: 'info',
        text: 'Example hotspot'
      }
    ]
  });
  */
}

/**
 * Creates a tour info overlay with details about the location
 * @param {Object} tourData - Tour information object
 * @param {HTMLElement} container - Container element for the overlay
 */
export function createTourInfoOverlay(tourData, container) {
  const overlay = document.createElement('div');
  overlay.className = 'tour-info-overlay';
  
  const content = `
    <h2>${tourData.name}</h2>
    <p>${tourData.description}</p>
    <div class="tour-details">
      <span><i class="icon">⏱</i> Duration: ${tourData.duration}</span>
      <span><i class="icon">🧭</i> Difficulty: ${tourData.difficulty}</span>
    </div>
    <button class="close-overlay">×</button>
  `;
  
  overlay.innerHTML = content;
  container.appendChild(overlay);
  
  // Add event listener to close button
  overlay.querySelector('.close-overlay').addEventListener('click', () => {
    overlay.classList.add('hiding');
    setTimeout(() => {
      overlay.remove();
    }, 300);
  });
  
  // Add animation class after a short delay (for entrance animation)
  setTimeout(() => {
    overlay.classList.add('visible');
  }, 10);
}

/**
 * Handles tour navigation between different viewpoints
 * @param {Array} viewpoints - Array of viewpoint objects
 * @param {Function} onNavigate - Callback function when navigating to a new viewpoint
 */
export function setupTourNavigation(viewpoints, onNavigate) {
  // Create navigation controls
  const navContainer = document.createElement('div');
  navContainer.className = 'tour-navigation';
  
  const navContent = viewpoints.map((viewpoint, index) => `
    <button class="tour-nav-btn" data-index="${index}">
      <img src="${viewpoint.thumbnail}" alt="${viewpoint.title}">
      <span>${viewpoint.title}</span>
    </button>
  `).join('');
  
  navContainer.innerHTML = navContent;
  document.body.appendChild(navContainer);
  
  // Add event listeners
  const buttons = navContainer.querySelectorAll('.tour-nav-btn');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const index = parseInt(button.dataset.index);
      onNavigate(viewpoints[index]);
      
      // Update active button
      buttons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
    });
  });
  
  // Set first viewpoint as active
  buttons[0].classList.add('active');
  onNavigate(viewpoints[0]);
}