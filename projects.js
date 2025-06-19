// Kaptebee School Projects JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile sidebar navigation functionality
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const closeSidebar = document.getElementById('closeSidebar');
    let sidebarOverlay;

    // Create overlay element for sidebar
    function createSidebarOverlay() {
        sidebarOverlay = document.createElement('div');
        sidebarOverlay.className = 'sidebar-overlay';
        document.body.appendChild(sidebarOverlay);
        
        // Close sidebar when overlay is clicked
        sidebarOverlay.addEventListener('click', closeSidebarMenu);
    }

    // Open sidebar
    function openSidebarMenu() {
        sidebar.classList.add('active');
        if (sidebarOverlay) {
            sidebarOverlay.classList.add('active');
        }
        document.body.style.overflow = 'hidden'; // Prevent body scroll when sidebar is open
    }

    // Close sidebar
    function closeSidebarMenu() {
        sidebar.classList.remove('active');
        if (sidebarOverlay) {
            sidebarOverlay.classList.remove('active');
        }
        document.body.style.overflow = ''; // Restore body scroll
    }

    // Initialize sidebar overlay
    createSidebarOverlay();

    // Sidebar toggle button event listener
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            openSidebarMenu();
        });
    }

    // Close sidebar button event listener
    if (closeSidebar) {
        closeSidebar.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeSidebarMenu();
        });
    }

    // Close sidebar when clicking on nav links (mobile)
    const sidebarNavLinks = sidebar.querySelectorAll('.nav-link');
    sidebarNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Small delay to allow navigation to start before closing sidebar
            setTimeout(closeSidebarMenu, 100);
        });
    });

    // Close sidebar on escape key press
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            closeSidebarMenu();
        }
    });

    // Handle window resize - close sidebar if window becomes larger
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992 && sidebar.classList.contains('active')) {
            closeSidebarMenu();
        }
    });

    // GSAP Animations
    if (typeof gsap !== 'undefined') {
        // Animate hero section elements
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroDescription = document.querySelector('.hero-description');

        if (heroTitle) {
            gsap.to(heroTitle, {
                opacity: 1,
                y: 0,
                duration: 1,
                delay: 0.2,
                ease: "power3.out"
            });
        }

        if (heroSubtitle) {
            gsap.to(heroSubtitle, {
                opacity: 1,
                y: 0,
                duration: 1,
                delay: 0.4,
                ease: "power3.out"
            });
        }

        if (heroDescription) {
            gsap.to(heroDescription, {
                opacity: 1,
                y: 0,
                duration: 1,
                delay: 0.6,
                ease: "power3.out"
            });
        }

        // Animate project cards with stagger effect
        const projectCards = document.querySelectorAll('.project-card');
        if (projectCards.length > 0) {
            // Create intersection observer for project cards animation
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const projectObserver = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const cards = Array.from(projectCards);
                        const visibleCards = cards.filter(card => {
                            const rect = card.getBoundingClientRect();
                            return rect.top < window.innerHeight && rect.bottom > 0;
                        });

                        gsap.to(visibleCards, {
                            opacity: 1,
                            y: 0,
                            duration: 0.8,
                            stagger: 0.2,
                            ease: "power3.out"
                        });

                        // Unobserve after animation
                        entry.target.classList.add('animated');
                        projectObserver.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            // Observe project cards
            projectCards.forEach(card => {
                projectObserver.observe(card);
            });
        }
    }

    // Smooth scrolling for anchor links (if any)
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80; // Account for navbar height
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add loading state management
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // Project card hover effects enhancement
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Modal enhancement - add animation classes
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('show.bs.modal', function() {
            this.querySelector('.modal-dialog').style.transform = 'scale(0.8)';
            this.querySelector('.modal-dialog').style.opacity = '0';
        });
        
        modal.addEventListener('shown.bs.modal', function() {
            const dialog = this.querySelector('.modal-dialog');
            dialog.style.transition = 'all 0.3s ease';
            dialog.style.transform = 'scale(1)';
            dialog.style.opacity = '1';
        });
    });

    // Add scroll-based navbar background change (optional enhancement)
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.backgroundColor = 'rgba(46, 125, 50, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.backgroundColor = '';
            navbar.style.backdropFilter = '';
        }
        
        lastScrollTop = scrollTop;
    });

    // Accessibility improvements
    // Add focus management for sidebar
    sidebar.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            const focusableElements = sidebar.querySelectorAll('a, button');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    });

    // Console log for debugging (remove in production)
    console.log('Kaptebee School Projects page loaded successfully');
    console.log('Sidebar functionality initialized');
    if (typeof gsap !== 'undefined') {
        console.log('GSAP animations initialized');
    }
});

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