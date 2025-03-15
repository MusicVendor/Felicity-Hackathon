// Theme toggle functionality
const themeToggle = document.querySelector('.theme-toggle');
themeToggle.addEventListener('click', function() {
    const isDark = document.body.classList.toggle('dark-mode');
    themeToggle.textContent = isDark ? '🌙' : '☀️';
});

document.addEventListener('DOMContentLoaded', function() {
    // Toggle active state for filter buttons
    const filterButtons = document.querySelectorAll('.filter-button');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Simulate dropdown functionality
    const filterDropdowns = document.querySelectorAll('.filter-dropdown');
    filterDropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function() {
            alert('Filter dropdown clicked: ' + this.textContent);
        });
    });
    
    // Clear button functionality
    const clearButton = document.querySelector('.clear-button');
    clearButton.addEventListener('click', function() {
        alert('Filters cleared');
    });
    
    // Lab button click
    const labButtons = document.querySelectorAll('.lab-button');
    labButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Navigating to lab...');
        });
    });
});