// Theme toggle functionality
document.addEventListener('DOMContentLoaded', function() {
const modeToggle = document.querySelector('.mode-toggle');

// Check for saved theme preference or respect OS preference
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
document.body.classList.add('dark-mode');
modeToggle.textContent = '☀'; // Sun icon for light mode toggle
} else {
modeToggle.textContent = '☽'; // Moon icon for dark mode toggle
}

// Toggle theme when button is clicked
modeToggle.addEventListener('click', function() {
document.body.classList.toggle('dark-mode');

// Update button icon
if (document.body.classList.contains('dark-mode')) {
modeToggle.textContent = '☀';
localStorage.setItem('theme', 'dark');
} else {
modeToggle.textContent = '☽';
localStorage.setItem('theme', 'light');
}
});
});