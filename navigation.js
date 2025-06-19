// Navigation JavaScript - Enhanced functionality with auto-close
document.addEventListener('DOMContentLoaded', function() {
    // Navigation elements
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
    
    // Event listeners
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
    
    // Set active navigation link based on current page
    setActiveNavLink();
    
    // Add smooth scrolling to anchor links
    addSmoothScrolling();
    
    // Functions
    function createOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        return overlay;
    }
    
    function createTimerElement() {
        timerElement = document.createElement('div');
        timerElement.className = 'sidebar-timer';
        timerElement.textContent = 'Auto-closing in 5s';
        sidebar.appendChild(timerElement);
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
        
        // Add subtle animation delay for nav items
        const navItems = sidebar.querySelectorAll('.nav-item');
        navItems.forEach((item, index) => {
            item.style.animation = `slideIn 0.3s ease-out ${index * 0.1}s both`;
        });
        
        // Start auto-close timer
        startAutoCloseTimer();
        
        // Focus management for accessibility
        setTimeout(() => {
            closeSidebar.focus();
        }, 300);
        
        // Haptic feedback for mobile devices
        if ('vibrate' in navigator) {
            navigator.vibrate(50);
        }
    }
    
    function closeSidebarHandler() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        
        // Clear the auto-close timer
        clearAutoCloseTimer();
        
        // Return focus to toggle button
        if (sidebarToggle && document.activeElement === closeSidebar) {
            sidebarToggle.focus();
        }
        
        // Haptic feedback for mobile devices
        if ('vibrate' in navigator) {
            navigator.vibrate(30);
        }
    }
    
    function startAutoCloseTimer() {
        let timeLeft = 5;
        
        // Show timer
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
        
        // Hide timer
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
                (currentPage === 'index.html' && linkHref === 'index.html')) {
                link.classList.add('active');
            }
        });
    }
    
    function addSmoothScrolling() {
        // Add smooth scrolling to all anchor links
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    
                    // Close sidebar if open
                    if (sidebar.classList.contains('active')) {
                        closeSidebarHandler();
                    }
                    
                    // Smooth scroll to target
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Update URL without triggering page reload
                    history.pushState(null, null, targetId);
                }
            });
        });
    }
    
    // Enhanced touch/swipe support for mobile
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    });
    
    document.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const deltaX = touchEndX - touchStartX;
        const deltaY = Math.abs(touchEndY - touchStartY);
        
        // Only handle horizontal swipes (ignore vertical scrolling)
        if (deltaY < swipeThreshold) {
            // Swipe right to open sidebar
            if (deltaX > swipeThreshold && !sidebar.classList.contains('active') && touchStartX < 50) {
                openSidebar();
            }
            // Swipe left to close sidebar
            else if (deltaX < -swipeThreshold && sidebar.classList.contains('active')) {
                closeSidebarHandler();
            }
        }
    }
    
    // Pause auto-close timer on user interaction
    sidebar.addEventListener('mouseenter', clearAutoCloseTimer);
    sidebar.addEventListener('mouseleave', function() {
        if (sidebar.classList.contains('active')) {
            startAutoCloseTimer();
        }
    });
    
    // Pause timer on touch/click
    sidebar.addEventListener('touchstart', clearAutoCloseTimer);
    sidebar.addEventListener('click', clearAutoCloseTimer);
    
    // Performance optimization: debounce resize events
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            if (window.innerWidth >= 992 && sidebar.classList.contains('active')) {
                closeSidebarHandler();
            }
        }, 250);
    });
    
    // Add loading states for better UX
    function showLoadingState(element) {
        element.style.opacity = '0.7';
        element.style.pointerEvents = 'none';
    }
    
    function hideLoadingState(element) {
        element.style.opacity = '';
        element.style.pointerEvents = '';
    }
    
    // Enhanced keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (sidebar.classList.contains('active')) {
            const focusableElements = sidebar.querySelectorAll(
                'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            // Tab navigation within sidebar
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        }
    });
    
    // Add intersection observer for navbar styling
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Add subtle animations on page load
    window.addEventListener('load', function() {
        const navbar = document.querySelector('.navbar');
        const navItems = document.querySelectorAll('.navbar-nav .nav-item');
        
        navbar.style.animation = 'slideIn 0.5s ease-out';
        
        navItems.forEach((item, index) => {
            item.style.animation = `slideIn 0.3s ease-out ${index * 0.1}s both`;
        });
    });
});