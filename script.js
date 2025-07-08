// Video Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const playButton = document.getElementById('playButton');
    const videoOverlay = document.querySelector('.video-overlay');
    const iframe = document.getElementById('projectVideo');
    const videoFrame = document.querySelector('.video-frame');

    let originalSrc = iframe.src;

    // Remove autoplay from URL if present
    if (originalSrc.includes('autoplay=1')) {
        originalSrc = originalSrc.replace(/[?&]autoplay=1/g, '');
    }

    // Load video without autoplay
    iframe.src = originalSrc;

    // Play button click handler
    if (playButton) {
        playButton.addEventListener('click', function() {
            // Hide overlay
            videoOverlay.classList.add('hidden');

            // Add autoplay to URL and reload
            const separator = originalSrc.includes('?') ? '&' : '?';
            iframe.src = originalSrc + separator + 'autoplay=1';

            // Visual feedback for button
            playButton.style.transform = 'scale(0.9)';
            setTimeout(() => {
                playButton.style.transform = 'scale(1)';
            }, 150);
        });
    }

    // Add entrance animation when section comes into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    // Initial state for animation
    if (videoFrame) {
        videoFrame.style.opacity = '0';
        videoFrame.style.transform = 'translateY(50px)';
        videoFrame.style.transition = 'all 0.8s ease-out';

        observer.observe(videoFrame);
    }

    // Enhanced hover effects for the frame
    if (videoFrame) {
        videoFrame.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });

        videoFrame.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    }
});