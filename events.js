// Events & Gallery JavaScript - Enhanced with smooth scrolling and effects

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all components
    initSidebar();
    initGalleryFilter();
    initScrollEffects();
    initBackToTop();
    initTimelineAnimation();
    initGalleryAnimation();
    initLoadMore();
    initModalEnhancements();
    initSmoothScrolling();
    
    // Sidebar functionality
    function initSidebar() {
        const sidebarToggle = document.getElementById('sidebarToggle');
        const sidebar = document.getElementById('sidebar');
        const closeSidebar = document.getElementById('closeSidebar');
        const overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        
        // Create overlay
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 999;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        `;
        document.body.appendChild(overlay);
        
        // Toggle sidebar
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.add('active');
            overlay.style.opacity = '1';
            overlay.style.visibility = 'visible';
            document.body.style.overflow = 'hidden';
        });
        
        // Close sidebar
        function closeSidebarFunc() {
            sidebar.classList.remove('active');
            overlay.style.opacity = '0';
            overlay.style.visibility = 'hidden';
            document.body.style.overflow = 'auto';
        }
        
        closeSidebar.addEventListener('click', closeSidebarFunc);
        overlay.addEventListener('click', closeSidebarFunc);
        
        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && sidebar.classList.contains('active')) {
                closeSidebarFunc();
            }
        });
    }
    
    // Gallery filter functionality
    function initGalleryFilter() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Filter items with animation
                galleryItems.forEach((item, index) => {
                    const shouldShow = filter === 'all' || item.classList.contains(filter);
                    
                    if (shouldShow) {
                        setTimeout(() => {
                            item.style.display = 'block';
                            setTimeout(() => {
                                item.classList.add('show');
                            }, 50);
                        }, index * 100);
                    } else {
                        item.classList.remove('show');
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
        
        // Initialize gallery items
        setTimeout(() => {
            galleryItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('show');
                }, index * 100);
            });
        }, 500);
    }
    
    // Scroll effects and animations
    function initScrollEffects() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });
        
        // Observe elements for animation
        const elementsToAnimate = document.querySelectorAll('.event-card, .section-title, .hero-title, .hero-subtitle');
        elementsToAnimate.forEach(el => {
            observer.observe(el);
        });
        
        // Add CSS for animations
        const style = document.createElement('style');
        style.textContent = `
            .event-card, .section-title, .hero-title, .hero-subtitle {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s ease;
            }
            
            .animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
            
            .hero-title, .hero-subtitle {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);
    }
    
    // Back to top button
    function initBackToTop() {
        const backToTopBtn = document.getElementById('backToTop');
        
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            smoothScrollTo(0, 800);
        });
    }
    
    // Timeline animation
    function initTimelineAnimation() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                }
            });
        }, {
            threshold: 0.3
        });
        
        timelineItems.forEach(item => {
            timelineObserver.observe(item);
        });
    }
    
    // Gallery animation on scroll
    function initGalleryAnimation() {
        const galleryCards = document.querySelectorAll('.gallery-card');
        
        const galleryObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.style.opacity = '1';
                }
            });
        }, {
            threshold: 0.2
        });
        
        galleryCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px)';
            card.style.transition = 'all 0.6s ease';
            galleryObserver.observe(card);
        });
    }
    
    // Load more gallery functionality
    function initLoadMore() {
        const loadMoreBtn = document.getElementById('loadMoreGallery');
        const hiddenItems = [
            {
                category: 'academics',
                title: 'Laboratory Session',
                description: 'Advanced chemistry laboratory work',
                image: 'resources/lab-session.jpg'
            },
            {
                category: 'sports',
                title: 'Swimming Competition',
                description: 'Inter-school swimming championship',
                image: 'resources/swimming.jpg'
            },
            {
                category: 'cultural',
                title: 'Drama Festival',
                description: 'Annual school drama performance',
                image: 'resources/drama.jpg'
            },
            {
                category: 'events',
                title: 'Science Fair',
                description: 'Student innovation showcase',
                image: 'resources/science-fair.jpg'
            },
            {
                category: 'sports',
                title: 'Basketball Tournament',
                description: 'Regional basketball championships',
                image: 'resources/basketball.jpg'
            },
            {
                category: 'cultural',
                title: 'Music Concert',
                description: 'Annual music evening performance',
                image: 'resources/music-concert.jpg'
            }
        ];
        
        let itemsLoaded = 0;
        const itemsPerLoad = 3;
        
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', function() {
                const galleryContainer = document.querySelector('.gallery-grid');
                const currentFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
                
                // Filter items based on current filter
                const itemsToShow = hiddenItems.slice(itemsLoaded, itemsLoaded + itemsPerLoad)
                    .filter(item => currentFilter === 'all' || item.category === currentFilter);
                
                itemsToShow.forEach((item, index) => {
                    const galleryItem = document.createElement('div');
                    galleryItem.className = `gallery-item gallery-card ${item.category}`;
                    galleryItem.innerHTML = `
                        <div class="gallery-image">
                            <img src="${item.image}" alt="${item.title}" loading="lazy">
                            <div class="gallery-overlay">
                                <h3>${item.title}</h3>
                                <p>${item.description}</p>
                                <button class="view-btn" onclick="openModal('${item.image}', '${item.title}', '${item.description}')">
                                    View Details
                                </button>
                            </div>
                        </div>
                    `;
                    
                    // Add with animation
                    galleryItem.style.opacity = '0';
                    galleryItem.style.transform = 'translateY(50px)';
                    galleryContainer.appendChild(galleryItem);
                    
                    setTimeout(() => {
                        galleryItem.style.transition = 'all 0.6s ease';
                        galleryItem.style.opacity = '1';
                        galleryItem.style.transform = 'translateY(0)';
                    }, index * 100);
                });
                
                itemsLoaded += itemsPerLoad;
                
                // Hide button if no more items
                if (itemsLoaded >= hiddenItems.length) {
                    loadMoreBtn.style.display = 'none';
                }
            });
        }
    }
    
    // Modal enhancements
    function initModalEnhancements() {
        // Create modal HTML if it doesn't exist
        if (!document.getElementById('imageModal')) {
            const modalHTML = `
                <div id="imageModal" class="modal">
                    <div class="modal-content">
                        <span class="close-modal">&times;</span>
                        <img id="modalImage" src="" alt="">
                        <div class="modal-info">
                            <h3 id="modalTitle"></h3>
                            <p id="modalDescription"></p>
                        </div>
                        <div class="modal-nav">
                            <button id="prevImage">&#8249;</button>
                            <button id="nextImage">&#8250;</button>
                        </div>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', modalHTML);
        }
        
        const modal = document.getElementById('imageModal');
        const modalImage = document.getElementById('modalImage');
        const modalTitle = document.getElementById('modalTitle');
        const modalDescription = document.getElementById('modalDescription');
        const closeModal = document.querySelector('.close-modal');
        
        // Close modal functionality
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
        
        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
        
        // Add modal styles
        const modalStyles = document.createElement('style');
        modalStyles.textContent = `
            .modal {
                display: none;
                position: fixed;
                z-index: 1000;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0,0,0,0.9);
                animation: fadeIn 0.3s ease;
            }
            
            .modal-content {
                position: relative;
                margin: 5% auto;
                padding: 20px;
                width: 90%;
                max-width: 800px;
                background: white;
                border-radius: 10px;
                animation: slideIn 0.3s ease;
            }
            
            .close-modal {
                position: absolute;
                right: 15px;
                top: 10px;
                font-size: 28px;
                font-weight: bold;
                cursor: pointer;
                z-index: 1001;
            }
            
            #modalImage {
                width: 100%;
                height: auto;
                border-radius: 8px;
            }
            
            .modal-info {
                padding: 15px 0;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes slideIn {
                from { transform: translateY(-50px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(modalStyles);
    }
    
    // Smooth scrolling functionality
    function initSmoothScrolling() {
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed header
                    smoothScrollTo(offsetTop, 800);
                }
            });
        });
    }
    
    // Utility function for smooth scrolling
    function smoothScrollTo(targetPosition, duration) {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;
        
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }
        
        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }
        
        requestAnimationFrame(animation);
    }
    
    // Parallax effect for hero sections
    function initParallaxEffect() {
        const parallaxElements = document.querySelectorAll('.parallax-bg');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            parallaxElements.forEach(element => {
                element.style.transform = `translateY(${rate}px)`;
            });
        });
    }
    
    // Initialize additional effects
    initParallaxEffect();
    
    // Lazy loading for images
    function initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    initLazyLoading();
});

// Global function to open modal (called from HTML)
function openModal(imageSrc, title, description) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    
    modalImage.src = imageSrc;
    modalTitle.textContent = title;
    modalDescription.textContent = description;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Performance optimization - Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll-heavy functions
window.addEventListener('scroll', throttle(() => {
    // Any scroll-heavy operations can be placed here
}, 16)); // ~60fps