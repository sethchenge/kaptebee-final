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

// GSAP Animations
gsap.registerPlugin();

// Profile container entrance animation
gsap.from(".profile-container", {
    duration: 2,
    scale: 0,
    rotation: 360,
    ease: "elastic.out(1, 0.5)",
    delay: 0.5
});

// Border animation enhancement
gsap.to(".profile-border", {
    duration: 3,
    rotation: 360,
    repeat: -1,
    ease: "none"
});

// Additional rotating animation for the pseudo-elements
gsap.to(".profile-border::before", {
    duration: 4,
    rotation: -360,
    repeat: -1,
    ease: "none"
});

// Glow effect animation
gsap.to(".glow-effect", {
    duration: 3,
    scale: 1.2,
    opacity: 0.3,
    repeat: -1,
    yoyo: true,
    ease: "power2.inOut"
});

// Typing animation variables
const nameText = "Seth Chenge";
const titleText = "Computer Teacher";
let nameIndex = 0;
let titleIndex = 0;
let isTypingName = true;
let isDeleting = false;

const nameElement = document.getElementById('typingName');
const titleElement = document.getElementById('typingTitle');

function typeWriter() {
    if (isTypingName) {
        if (!isDeleting) {
            if (nameIndex < nameText.length) {
                nameElement.textContent += nameText.charAt(nameIndex);
                nameIndex++;
                setTimeout(typeWriter, 100);
            } else {
                setTimeout(() => {
                    isTypingName = false;
                    titleIndex = 0;
                    typeWriter();
                }, 1000);
            }
        } else {
            if (nameIndex > 0) {
                nameElement.textContent = nameText.substring(0, nameIndex - 1);
                nameIndex--;
                setTimeout(typeWriter, 50);
            } else {
                isDeleting = false;
                setTimeout(typeWriter, 500);
            }
        }
    } else {
        if (!isDeleting) {
            if (titleIndex < titleText.length) {
                titleElement.textContent += titleText.charAt(titleIndex);
                titleIndex++;
                setTimeout(typeWriter, 100);
            } else {
                setTimeout(() => {
                    isDeleting = true;
                    typeWriter();
                }, 2000);
            }
        } else {
            if (titleIndex > 0) {
                titleElement.textContent = titleText.substring(0, titleIndex - 1);
                titleIndex--;
                setTimeout(typeWriter, 50);
            } else {
                titleIndex = 0;
                setTimeout(() => {
                    isDeleting = true;
                    isTypingName = true;
                    nameIndex = nameText.length;
                    typeWriter();
                }, 500);
            }
        }
    }
}

// Start typing animation after profile loads
gsap.delayedCall(2.5, typeWriter);

// Enhanced profile image hover effects
const profileContainer = document.querySelector('.profile-container');

profileContainer.addEventListener('mouseenter', () => {
    gsap.to(profileContainer, {
        duration: 0.3,
        scale: 1.1,
        ease: "power2.out"
    });
    
    gsap.to(".profile-border", {
        duration: 0.3,
        boxShadow: "0 0 40px rgba(0, 255, 136, 0.8), 0 0 80px rgba(0, 255, 136, 0.6), 0 0 120px rgba(0, 255, 136, 0.4)",
        ease: "power2.out"
    });
});

profileContainer.addEventListener('mouseleave', () => {
    gsap.to(profileContainer, {
        duration: 0.3,
        scale: 1,
        ease: "power2.out"
    });
    
    gsap.to(".profile-border", {
        duration: 0.3,
        boxShadow: "0 0 20px rgba(0, 255, 136, 0.5), 0 0 40px rgba(0, 255, 136, 0.3), 0 0 60px rgba(0, 255, 136, 0.1)",
        ease: "power2.out"
    });
});

// Continuous floating animation
gsap.to(".profile-container", {
    duration: 4,
    y: -20,
    repeat: -1,
    yoyo: true,
    ease: "power2.inOut"
});

// Random sparkle effects
function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.style.position = 'absolute';
    sparkle.style.width = '4px';
    sparkle.style.height = '4px';
    sparkle.style.backgroundColor = '#00ff88';
    sparkle.style.borderRadius = '50%';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '10';
    
    const container = document.querySelector('.profile-container');
    container.appendChild(sparkle);
    
    const angle = Math.random() * Math.PI * 2;
    const radius = 120 + Math.random() * 50;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    
    gsap.set(sparkle, {
        x: 100,
        y: 100,
        scale: 0
    });
    
    gsap.to(sparkle, {
        duration: 2,
        x: 100 + x,
        y: 100 + y,
        scale: 1,
        opacity: 0,
        ease: "power2.out",
        onComplete: () => sparkle.remove()
    });
}

// Create sparkles periodically
setInterval(createSparkle, 800);

// Text glow animations
gsap.to(".name-main", {
    duration: 2,
    textShadow: "0 0 20px rgba(0, 255, 136, 0.8)",
    repeat: -1,
    yoyo: true,
    ease: "power2.inOut"
});