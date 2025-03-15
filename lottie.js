// Load Lottie Animation
var animation = lottie.loadAnimation({
    container: document.getElementById('lottie-container'), // Target container
    renderer: 'svg',  // Render method (svg, canvas, html)
    loop: true,        // Loop the animation
    autoplay: true,   // Do not autoplay initially
    path: 'animation.json' // Path to your Lottie JSON file
});

