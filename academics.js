// Enhanced Navigation + Academics functionality
document.addEventListener('DOMContentLoaded', function() {
    // ===== NAVIGATION FUNCTIONALITY (Enhanced) =====
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const closeSidebar = document.getElementById('closeSidebar');
    const mainContent = document.querySelector('.main-content');
    
    // Auto-close timer variables
    let autoCloseTimer = null;
    let timerElement = null;
    
    // Create overlay element
    const overlay = createOverlay();
    document.body.appendChild(overlay);
    
    // Create timer display element
    createTimerElement();
    
    // Navigation Event listeners
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', toggleSidebar);
    }
    
    if (closeSidebar) {
        closeSidebar.addEventListener('click', closeSidebarHandler);
    }
    
    // Close sidebar when clicking overlay
    overlay.addEventListener('click', closeSidebarHandler);
    
    // Close sidebar with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            closeSidebarHandler();
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 992 && sidebar.classList.contains('active')) {
            closeSidebarHandler();
        }
    });
    
    // Set active navigation link
    setActiveNavLink();
    
    // Navigation Functions
    function createOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        return overlay;
    }
    
    function createTimerElement() {
        if (sidebar) {
            timerElement = document.createElement('div');
            timerElement.className = 'sidebar-timer';
            timerElement.textContent = 'Auto-closing in 5s';
            sidebar.appendChild(timerElement);
        }
    }
    
    function toggleSidebar() {
        if (sidebar.classList.contains('active')) {
            closeSidebarHandler();
        } else {
            openSidebar();
        }
    }
    
    function openSidebar() {
        sidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Start auto-close timer
        startAutoCloseTimer();
        
        // Focus management
        setTimeout(() => {
            if (closeSidebar) closeSidebar.focus();
        }, 300);
    }
    
    function closeSidebarHandler() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        
        // Clear the auto-close timer
        clearAutoCloseTimer();
    }
    
    function startAutoCloseTimer() {
        let timeLeft = 5;
        
        if (timerElement) {
            timerElement.classList.add('active');
            updateTimerDisplay(timeLeft);
        }
        
        autoCloseTimer = setInterval(() => {
            timeLeft--;
            updateTimerDisplay(timeLeft);
            
            if (timeLeft <= 0) {
                closeSidebarHandler();
            }
        }, 1000);
    }
    
    function clearAutoCloseTimer() {
        if (autoCloseTimer) {
            clearInterval(autoCloseTimer);
            autoCloseTimer = null;
        }
        
        if (timerElement) {
            timerElement.classList.remove('active');
        }
    }
    
    function updateTimerDisplay(seconds) {
        if (timerElement) {
            timerElement.textContent = `Auto-closing in ${seconds}s`;
        }
    }
    
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkHref = link.getAttribute('href');
            
            if (linkHref === currentPage || 
                (currentPage === '' && linkHref === 'index.html') ||
                (currentPage === 'academics.html' && linkHref === 'academics.html')) {
                link.classList.add('active');
            }
        });
    }
    
    // Pause auto-close timer on user interaction
    if (sidebar) {
        sidebar.addEventListener('mouseenter', clearAutoCloseTimer);
        sidebar.addEventListener('mouseleave', function() {
            if (sidebar.classList.contains('active')) {
                startAutoCloseTimer();
            }
        });
        sidebar.addEventListener('touchstart', clearAutoCloseTimer);
        sidebar.addEventListener('click', clearAutoCloseTimer);
    }
    
    // ===== ACADEMICS PAGE FUNCTIONALITY =====
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Close sidebar if open
                if (sidebar.classList.contains('active')) {
                    closeSidebarHandler();
                }
                
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all cards and animated elements
    const animatedElements = document.querySelectorAll('.program-card, .stream-card, .calendar-card, .resource-card, .stat-item');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Counter animation for statistics
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        updateCounter();
    }

    // Animate statistics when they come into view
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('h3');
                if (statNumber) {
                    const targetValue = statNumber.textContent.replace(/[^\d]/g, '');
                    const suffix = statNumber.textContent.replace(/[\d]/g, '');
                    
                    statNumber.textContent = '0' + suffix;
                    animateCounter(statNumber, parseInt(targetValue));
                    
                    statsObserver.unobserve(entry.target);
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.stat-item').forEach(stat => {
        statsObserver.observe(stat);
    });

    // Add ripple effect to cards
    function addRippleEffect(element) {
        element.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }

    // Add ripple effect to interactive cards
    document.querySelectorAll('.program-card, .stream-card, .resource-card').forEach(card => {
        addRippleEffect(card);
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        }
    });

    // Dynamic navbar background
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });

    // Subject tags interaction
    document.querySelectorAll('.subject-tag').forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Loading animation for page
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Trigger hero animations
        const heroElements = document.querySelectorAll('.animate-fade-up');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('animate-in');
            }, index * 200);
        });
    });

    // Form validation (if forms are added later)
    function validateForm(form) {
        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.classList.add('error');
                isValid = false;
            } else {
                input.classList.remove('error');
            }
        });
        
        return isValid;
    }

    // Search functionality for subjects/programs
    function initializeSearch() {
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                const cards = document.querySelectorAll('.program-card, .stream-card');
                
                cards.forEach(card => {
                    const text = card.textContent.toLowerCase();
                    if (text.includes(searchTerm)) {
                        card.style.display = 'block';
                        card.classList.add('highlight');
                    } else {
                        card.style.display = 'none';
                        card.classList.remove('highlight');
                    }
                });
            });
        }
    }

    initializeSearch();

    // Progressive enhancement for touch devices
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        
        // Improve touch interactions
        document.querySelectorAll('.card, .btn').forEach(element => {
            element.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            });
            
            element.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('touch-active');
                }, 150);
            });
        });
    }

    // Performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', function() {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`Page loaded in ${loadTime}ms`);
        });
    }
});