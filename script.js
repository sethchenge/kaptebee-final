// Enhanced Video Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const playButton = document.getElementById('playButton');
    const videoOverlay = document.querySelector('.video-overlay');
    const iframe = document.getElementById('projectVideo');
    const videoFrame = document.querySelector('.video-frame');
    
    let originalSrc = iframe ? iframe.src : '';
    let isPlaying = false;
    let userInitiatedPlay = false;
    let scrollPauseTimeout;
    
    // Clean URL function to remove all autoplay parameters
    function cleanVideoUrl(url) {
        if (!url) return '';
        
        // Remove autoplay, auto_play, and related parameters
        return url.replace(/[?&](autoplay|auto_play)=1/g, '')
                 .replace(/[?&](autoplay|auto_play)=true/g, '')
                 .replace(/[?&]rel=1/g, '')
                 .replace(/\?&/g, '?')  // Fix malformed URLs
                 .replace(/&&/g, '&');  // Fix double ampersands
    }
    
    // Initialize video with clean URL (no autoplay)
    function initializeVideo() {
        if (!iframe) return;
        
        originalSrc = cleanVideoUrl(iframe.src);
        
        // Set clean URL without autoplay
        iframe.src = originalSrc;
        
        // Reset states
        isPlaying = false;
        userInitiatedPlay = false;
        
        // Show overlay
        if (videoOverlay) {
            videoOverlay.classList.remove('hidden');
        }
    }
    
    // Play video function
    function playVideo() {
        if (!iframe || !originalSrc) return;
        
        // Hide overlay
        if (videoOverlay) {
            videoOverlay.classList.add('hidden');
        }
        
        // Add autoplay parameter and reload iframe
        const separator = originalSrc.includes('?') ? '&' : '?';
        iframe.src = originalSrc + separator + 'autoplay=1&mute=0';
        
        isPlaying = true;
        userInitiatedPlay = true;
    }
    
    // Pause video function
    function pauseVideo() {
        if (!iframe || !isPlaying) return;
        
        // Reset to clean URL (effectively pauses the video)
        iframe.src = originalSrc;
        
        // Show overlay again
        if (videoOverlay) {
            videoOverlay.classList.remove('hidden');
        }
        
        isPlaying = false;
    }
    
    // Play button click handler
    if (playButton) {
        playButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            if (!isPlaying) {
                playVideo();
                
                // Visual feedback for button
                playButton.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    playButton.style.transform = 'scale(1)';
                }, 150);
            }
        });
    }
    
    // Scroll detection for auto-pause
    let lastScrollY = window.scrollY;
    let scrollTimer;
    
    function handleScroll() {
        const currentScrollY = window.scrollY;
        const scrollDelta = Math.abs(currentScrollY - lastScrollY);
        
        // If user is actively scrolling and video is playing
        if (scrollDelta > 5 && isPlaying && userInitiatedPlay) {
            clearTimeout(scrollTimer);
            
            // Pause after scroll stops for 1 second
            scrollTimer = setTimeout(() => {
                if (isPlaying) {
                    pauseVideo();
                }
            }, 1000);
        }
        
        lastScrollY = currentScrollY;
    }
    
    // Add scroll listener with throttling
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) return;
        
        scrollTimeout = setTimeout(() => {
            handleScroll();
            scrollTimeout = null;
        }, 100);
    });
    
    // Section visibility detection
    function setupSectionObserver() {
        const homeSection = document.querySelector('#home, .home-section, [data-section="home"]');
        
        if (homeSection) {
            const sectionObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting && isPlaying) {
                        // User left home section while video is playing
                        pauseVideo();
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '-10px'
            });
            
            sectionObserver.observe(homeSection);
        }
    }
    
    // Page visibility change handler
    document.addEventListener('visibilitychange', function() {
        if (document.hidden && isPlaying) {
            // Page is hidden (tab switched, minimized, etc.)
            pauseVideo();
        }
    });
    
    // Navigation detection (for SPA or hash-based navigation)
    function setupNavigationObserver() {
        // Listen for hash changes
        window.addEventListener('hashchange', function() {
            const hash = window.location.hash;
            if (hash && hash !== '#home' && hash !== '#' && isPlaying) {
                pauseVideo();
            }
        });
        
        // Listen for navigation events
        window.addEventListener('beforeunload', function() {
            if (isPlaying) {
                pauseVideo();
            }
        });
    }
    
    // Device orientation change handler
    window.addEventListener('orientationchange', function() {
        if (isPlaying) {
            // Give time for orientation change to complete
            setTimeout(() => {
                // Refresh video state after orientation change
                if (userInitiatedPlay) {
                    pauseVideo();
                }
            }, 500);
        }
    });
    
    // Focus/blur handlers for better mobile experience
    window.addEventListener('focus', function() {
        // Don't auto-resume video when returning to page
        if (isPlaying && !userInitiatedPlay) {
            pauseVideo();
        }
    });
    
    window.addEventListener('blur', function() {
        if (isPlaying) {
            pauseVideo();
        }
    });
    
    // Enhanced intersection observer for video frame animation
    const frameObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            } else {
                // Video went out of view, pause it
                if (isPlaying) {
                    pauseVideo();
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    // Initialize video frame animation and observation
    if (videoFrame) {
        videoFrame.style.opacity = '0';
        videoFrame.style.transform = 'translateY(50px)';
        videoFrame.style.transition = 'all 0.8s ease-out';
        
        frameObserver.observe(videoFrame);
        
        // Enhanced hover effects (only on non-touch devices)
        if (!('ontouchstart' in window)) {
            videoFrame.addEventListener('mouseenter', function() {
                if (!isPlaying) {
                    this.style.transform = 'translateY(-5px) scale(1.02)';
                }
            });
            
            videoFrame.addEventListener('mouseleave', function() {
                if (!isPlaying) {
                    this.style.transform = 'translateY(0) scale(1)';
                }
            });
        }
    }
    
    // Touch event handlers for mobile devices
    if ('ontouchstart' in window) {
        let touchStartY = 0;
        
        document.addEventListener('touchstart', function(e) {
            touchStartY = e.touches[0].clientY;
        });
        
        document.addEventListener('touchmove', function(e) {
            const touchCurrentY = e.touches[0].clientY;
            const touchDelta = Math.abs(touchCurrentY - touchStartY);
            
            // If significant touch movement and video is playing
            if (touchDelta > 30 && isPlaying && userInitiatedPlay) {
                clearTimeout(scrollPauseTimeout);
                
                scrollPauseTimeout = setTimeout(() => {
                    if (isPlaying) {
                        pauseVideo();
                    }
                }, 800);
            }
        });
    }
    
    // Cleanup function for page navigation
    function cleanup() {
        if (isPlaying) {
            pauseVideo();
        }
        
        // Clear any pending timers
        clearTimeout(scrollTimer);
        clearTimeout(scrollPauseTimeout);
    }
    
    // Initialize everything
    initializeVideo();
    setupSectionObserver();
    setupNavigationObserver();
    
    // Setup cleanup on page unload
    window.addEventListener('beforeunload', cleanup);
    
    // Re-initialize on page show (for browser back/forward navigation)
    window.addEventListener('pageshow', function(e) {
        if (e.persisted) {
            // Page was restored from cache
            initializeVideo();
        }
    });
    
    // Expose cleanup function globally if needed
    window.videoCleanup = cleanup;
});