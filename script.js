
// Video Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const playButton = document.getElementById('playButton');
    const videoOverlay = document.querySelector('.video-overlay');
    const iframe = document.getElementById('projectVideo');
    
    // Play button click handler
    if (playButton) {
        playButton.addEventListener('click', function() {
            // Hide overlay with smooth transition
            videoOverlay.classList.add('hidden');
            
            // Add autoplay parameter to iframe src if it's a video file
            let currentSrc = iframe.src;
            if (currentSrc && !currentSrc.includes('autoplay')) {
                // For video files, you might need to handle this differently
                // This is a basic implementation
                if (currentSrc.includes('.mp4') || currentSrc.includes('.webm') || currentSrc.includes('.ogg')) {
                    iframe.src = currentSrc + (currentSrc.includes('?') ? '&' : '?') + 'autoplay=1';
                }
            }
            
            // Add some visual feedback
            playButton.style.transform = 'scale(0.8)';
            setTimeout(() => {
                playButton.style.transform = 'scale(1.1)';
            }, 100);
        });
    }
    
    // Optional: Show overlay again if video ends (for video files)
    if (iframe) {
        iframe.addEventListener('ended', function() {
            videoOverlay.classList.remove('hidden');
        });
    }
    
    // Add entrance animation when section comes into view
    const videoSection = document.querySelector('.video-section');
    const videoFrame = document.querySelector('.video-frame');
    
    // Intersection Observer for entrance animation
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
    
    // Enhanced hover effects
    if (videoFrame) {
        videoFrame.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        videoFrame.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    }
});