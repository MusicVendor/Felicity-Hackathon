window.onload = function() {
    showSection('aim');

    // Ensure sidebar is hidden on mobile initially
    if (window.innerWidth <= 768) {
        const sidebar = document.querySelector('.sidebar');
        const menuToggle = document.querySelector('.menu-toggle');
        sidebar.classList.remove('open');
        menuToggle.textContent = '≡';
    }

    // Set up navigation buttons
    setupNavigationButtons();
    
    // Set up keyboard navigation
    setupKeyboardNavigation();
}

function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    // Show the selected section
    document.getElementById(sectionId).classList.add('active');
    
    // Update active button state
    document.querySelectorAll('.sidebar-button button').forEach(button => {
        button.classList.remove('active-button');
    });
    
    // Add active class to the clicked button
    document.querySelector(`button[onclick="showSection('${sectionId}')"]`).classList.add('active-button');

    // Update navigation buttons
    updateNavigationButtons(sectionId);
}

function setupNavigationButtons() {
    // Add event listeners to all navigation buttons
    document.querySelectorAll('.next-button, .previous-button').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const currentSection = document.querySelector('.section.active').id;
            
            if (this.classList.contains('next-button')) {
                navigateToNextSection(currentSection);
            } else {
                navigateToPreviousSection(currentSection);
            }
        });
    });
}

function setupKeyboardNavigation() {
    // Add event listener for keyboard navigation
    document.addEventListener('keydown', function(e) {
        const currentSection = document.querySelector('.section.active').id;
        
        // Right arrow key for next section
        if (e.key === 'ArrowRight') {
            navigateToNextSection(currentSection);
        }
        // Left arrow key for previous section
        else if (e.key === 'ArrowLeft') {
            navigateToPreviousSection(currentSection);
        }
    });
}

function navigateToNextSection(currentSectionId) {
    const sections = getSectionIds();
    const currentIndex = sections.indexOf(currentSectionId);
    
    if (currentIndex < sections.length - 1) {
        const nextSectionId = sections[currentIndex + 1];
        showSection(nextSectionId);
    }
}

function navigateToPreviousSection(currentSectionId) {
    const sections = getSectionIds();
    const currentIndex = sections.indexOf(currentSectionId);
    
    if (currentIndex > 0) {
        const prevSectionId = sections[currentIndex - 1];
        showSection(prevSectionId);
    }
}

function getSectionIds() {
    // Get all section IDs in the order they appear in the sidebar
    const sectionIds = [];
    document.querySelectorAll('.sidebar-button button').forEach(button => {
        const onclick = button.getAttribute('onclick');
        const match = onclick.match(/showSection\('(.+?)'\)/);
        if (match && match[1]) {
            sectionIds.push(match[1]);
        }
    });
    return sectionIds;
}

// Add this to your script.js file
document.addEventListener('DOMContentLoaded', function() {
    // User Guide Modal functionality
    const guideBtn = document.getElementById('user-guide-btn');
    const guideModal = document.getElementById('guide-modal');
    const closeModal = document.querySelector('.close-modal');
    
    // Open modal when guide button is clicked
    guideBtn.addEventListener('click', function() {
        guideModal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    });
    
    // Close modal when X is clicked
    closeModal.addEventListener('click', function() {
        guideModal.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
    });
    
    // Close modal when clicking outside the modal content
    window.addEventListener('click', function(event) {
        if (event.target == guideModal) {
            guideModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && guideModal.style.display === 'block') {
            guideModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
});

function updateNavigationButtons(currentSectionId) {
    const sections = getSectionIds();
    const currentIndex = sections.indexOf(currentSectionId);
    
    // Get all navigation buttons in the current section
    const nextButton = document.querySelector(`#${currentSectionId} .next-button`);
    const prevButton = document.querySelector(`#${currentSectionId} .previous-button`);
    
    // Update the text and visibility of next button
    if (nextButton) {
        if (currentIndex < sections.length - 1) {
            const nextSectionName = document.querySelector(`button[onclick="showSection('${sections[currentIndex + 1]}')"]`).textContent.trim();
            nextButton.innerHTML = `${nextSectionName} <span>→</span>`;
            nextButton.style.display = 'flex';
        } else {
            nextButton.style.display = 'none';
        }
    }
    
    // Update the text and visibility of previous button
    if (prevButton) {
        if (currentIndex > 0) {
            const prevSectionName = document.querySelector(`button[onclick="showSection('${sections[currentIndex - 1]}')"]`).textContent.trim();
            prevButton.innerHTML = `<span>←</span> ${prevSectionName}`;
            prevButton.style.display = 'flex';
        } else {
            prevButton.style.display = 'none';
        }
    }

    if (window.innerWidth <= 768) {
        // Add proper focus/scroll to current section
        const currentSection = document.getElementById(currentSectionId);
        if (currentSection) {
            setTimeout(() => {
                currentSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 300);
        }
    }
}

// Add toggle functionality for the sidebar menu
const menuToggle = document.querySelector('.menu-toggle');
const sidebar = document.querySelector('.sidebar');

menuToggle.addEventListener('click', function() {
    sidebar.classList.toggle('open');
    
    // Change toggle button text
    if (sidebar.classList.contains('open')) {
        menuToggle.textContent = '×';
    } else {
        menuToggle.textContent = '≡';
    }
});

// Close sidebar when clicking outside on mobile
document.addEventListener('click', function(e) {
    if (window.innerWidth <= 768 && 
        !sidebar.contains(e.target) && 
        e.target !== menuToggle && 
        sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
        menuToggle.textContent = '≡';
    }
});

// Close sidebar when a section is selected on mobile
document.querySelectorAll('.sidebar-button button').forEach(button => {
    button.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('open');
            menuToggle.textContent = '≡';
        }
    });
});

// Add window resize event listener to handle responsive layout changes
window.addEventListener('resize', function() {
    // Check window width and adjust sidebar visibility
    if (window.innerWidth > 768 && sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
        menuToggle.textContent = '≡';
    }
    
    // Update navigation for current section
    const currentSection = document.querySelector('.section.active').id;
    updateNavigationButtons(currentSection);
});