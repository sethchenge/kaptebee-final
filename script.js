// Video Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const playButton = document.getElementById('playButton');
    const videoOverlay = document.querySelector('.video-overlay');
    const iframe = document.getElementById('projectVideo');
    const videoFrame = document.querySelector('.video-frame');

    let originalSrc = iframe.src;
    let hasNavigatedAway = false;

    // Remove autoplay from URL if present
    if (originalSrc.includes('autoplay=1')) {
        originalSrc = originalSrc.replace(/[?&]autoplay=1/g, '');
    }

    // Check if user has navigated away from home page before
    function checkNavigationHistory() {
        // Check session storage for navigation flag
        const navigationFlag = sessionStorage.getItem('hasNavigatedFromHome');
        if (navigationFlag === 'true') {
            hasNavigatedAway = true;
        }
    }

    // Track navigation away from home page
    function trackNavigation() {
        // Listen for clicks on navigation links
        const navLinks = document.querySelectorAll('a[href]:not([href^="#"]):not([href^="javascript:"]):not([target="_blank"])');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                // Check if it's an internal navigation (not home page)
                if (href && !href.includes('index.html') && !href.endsWith('/') && href !== '#') {
                    sessionStorage.setItem('hasNavigatedFromHome', 'true');
                    hasNavigatedAway = true;
                }
            });
        });

        // Also track browser navigation events
        window.addEventListener('beforeunload', function() {
            // Only set flag if we're navigating to a different page
            if (!window.location.href.includes('#')) {
                sessionStorage.setItem('hasNavigatedFromHome', 'true');
            }
        });
    }

    // Reset video state when returning to home
    function resetVideoState() {
        if (hasNavigatedAway) {
            // Stop any playing video
            iframe.src = originalSrc;
            
            // Show overlay again
            if (videoOverlay) {
                videoOverlay.classList.remove('hidden');
            }
            
            // Reset any video playing state
            console.log('Video reset due to navigation back to home');
        }
    }

    // Initialize navigation tracking
    checkNavigationHistory();
    trackNavigation();

    // Load video without autoplay initially
    iframe.src = originalSrc;

    // Reset video state if user navigated back
    resetVideoState();

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

    // Clear navigation flag when video is manually played
    // This prevents unnecessary resets if user plays video after navigation
    if (playButton) {
        playButton.addEventListener('click', function() {
            sessionStorage.removeItem('hasNavigatedFromHome');
            hasNavigatedAway = false;
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

    // Optional: Clear navigation flag when page is refreshed directly
    window.addEventListener('load', function() {
        // If page was refreshed directly (not navigated to), clear the flag
        if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
            sessionStorage.removeItem('hasNavigatedFromHome');
        }
    });
});