// Page Transition System for Kaptebee School Website
class PageTransition {
    constructor() {
        this.isTransitioning = false;
        this.transitionDuration = 600; // milliseconds
        this.init();
    }

    init() {
        this.createTransitionOverlay();
        this.bindNavigationEvents();
        this.handleInitialLoad();
        this.updateActiveNavLinks();
    }

    createTransitionOverlay() {
        // Create transition overlay element
        const overlay = document.createElement('div');
        overlay.id = 'page-transition-overlay';
        overlay.innerHTML = `
            <div class="transition-content">
                <div class="kaptebee-logo">
                    <span class="brand-text">Kaptebee School</span>
                </div>
                <div class="loading-spinner">
                    <div class="spinner"></div>
                </div>
                <p class="loading-text">Loading...</p>
            </div>
        `;
        document.body.appendChild(overlay);
    }

    bindNavigationEvents() {
        // Handle all navigation links
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href]');
            
            // Check if it's an internal navigation link
            if (link && this.isInternalLink(link)) {
                e.preventDefault();
                
                // Don't transition if already transitioning or same page
                if (this.isTransitioning || this.isSamePage(link.href)) {
                    return;
                }
                
                this.transitionToPage(link.href);
            }
        });

        // Handle browser back/forward buttons
        window.addEventListener('popstate', (e) => {
            if (!this.isTransitioning) {
                this.transitionToPage(window.location.href, false);
            }
        });
    }

    isInternalLink(link) {
        const href = link.getAttribute('href');
        
        // Skip if it's an external link, anchor link, or JavaScript link
        if (!href || 
            href.startsWith('http') || 
            href.startsWith('#') || 
            href.startsWith('javascript:') ||
            href.startsWith('mailto:') ||
            href.startsWith('tel:')) {
            return false;
        }
        
        // Check if it's one of our HTML pages
        const validPages = [
            'index.html', 'about.html', 'academics.html', 
            'events.html', 'news.html', 'projects.html', 'contact.html'
        ];
        
        return validPages.some(page => href.includes(page));
    }

    isSamePage(href) {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const targetPage = href.split('/').pop();
        return currentPage === targetPage;
    }

    async transitionToPage(url, pushState = true) {
        if (this.isTransitioning) return;
        
        this.isTransitioning = true;
        
        try {
            // Show transition overlay
            this.showTransitionOverlay();
            
            // Fetch new page content
            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to load page');
            
            const html = await response.text();
            const parser = new DOMParser();
            const newDoc = parser.parseFromString(html, 'text/html');
            
            // Wait for minimum transition time for smooth effect
            await this.delay(this.transitionDuration);
            
            // Update page content
            this.updatePageContent(newDoc);
            
            // Update browser history
            if (pushState) {
                history.pushState(null, '', url);
            }
            
            // Update active navigation links
            this.updateActiveNavLinks();
            
            // Hide transition overlay
            this.hideTransitionOverlay();
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // Reinitialize any dynamic content
            this.reinitializeContent();
            
        } catch (error) {
            console.error('Page transition failed:', error);
            // Fallback to normal navigation
            window.location.href = url;
        } finally {
            this.isTransitioning = false;
        }
    }

    showTransitionOverlay() {
        const overlay = document.getElementById('page-transition-overlay');
        overlay.classList.add('active');
        document.body.classList.add('transitioning');
    }

    hideTransitionOverlay() {
        const overlay = document.getElementById('page-transition-overlay');
        
        setTimeout(() => {
            overlay.classList.remove('active');
            document.body.classList.remove('transitioning');
        }, 200);
    }

    updatePageContent(newDoc) {
        // Update title
        document.title = newDoc.title;
        
        // Update main content (everything inside .main-content except navbar)
        const currentMainContent = document.querySelector('.main-content');
        const newMainContent = newDoc.querySelector('.main-content');
        
        if (currentMainContent && newMainContent) {
            // Preserve the navbar
            const currentNavbar = currentMainContent.querySelector('nav.navbar');
            const newNavbar = newMainContent.querySelector('nav.navbar');
            
            // Update all content except navbar
            const sectionsToUpdate = newMainContent.children;
            const currentSections = Array.from(currentMainContent.children);
            
            // Remove old sections (except navbar)
            currentSections.forEach(section => {
                if (!section.classList.contains('navbar')) {
                    section.remove();
                }
            });
            
            // Add new sections
            Array.from(sectionsToUpdate).forEach(section => {
                if (!section.classList.contains('navbar')) {
                    currentMainContent.appendChild(section.cloneNode(true));
                }
            });
            
            // Update navbar content if needed
            if (currentNavbar && newNavbar) {
                currentNavbar.innerHTML = newNavbar.innerHTML;
            }
        }
        
        // Update meta tags
        this.updateMetaTags(newDoc);
    }

    updateMetaTags(newDoc) {
        // Update meta description
        const newDesc = newDoc.querySelector('meta[name="description"]');
        const currentDesc = document.querySelector('meta[name="description"]');
        if (newDesc && currentDesc) {
            currentDesc.content = newDesc.content;
        }
        
        // Update other meta tags as needed
        const metaTags = ['keywords', 'author', 'og:title', 'og:description'];
        metaTags.forEach(name => {
            const newMeta = newDoc.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
            const currentMeta = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
            if (newMeta && currentMeta) {
                if (currentMeta.hasAttribute('content')) {
                    currentMeta.content = newMeta.content;
                }
            }
        });
    }

    updateActiveNavLinks() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        // Update main navigation
        document.querySelectorAll('.navbar-nav .nav-link, .sidebar .nav-link').forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.includes(currentPage)) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    reinitializeContent() {
        // Reinitialize Bootstrap components
        if (typeof bootstrap !== 'undefined') {
            // Reinitialize carousels
            document.querySelectorAll('.carousel').forEach(carousel => {
                new bootstrap.Carousel(carousel);
            });
            
            // Reinitialize modals
            document.querySelectorAll('.modal').forEach(modal => {
                new bootstrap.Modal(modal);
            });
            
            // Reinitialize tooltips
            document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(tooltip => {
                new bootstrap.Tooltip(tooltip);
            });
        }
        
        // Reinitialize any custom scripts
        this.initializeSidebar();
        this.initializeAnimations();
    }

    initializeSidebar() {
        // Sidebar functionality
        const sidebarToggle = document.getElementById('sidebarToggle');
        const sidebar = document.getElementById('sidebar');
        const closeSidebar = document.getElementById('closeSidebar');
        
        if (sidebarToggle && sidebar) {
            sidebarToggle.addEventListener('click', () => {
                sidebar.classList.add('show');
            });
        }
        
        if (closeSidebar && sidebar) {
            closeSidebar.addEventListener('click', () => {
                sidebar.classList.remove('show');
            });
        }
        
        // Close sidebar when clicking outside
        document.addEventListener('click', (e) => {
            if (sidebar && !sidebar.contains(e.target) && !e.target.closest('#sidebarToggle')) {
                sidebar.classList.remove('show');
            }
        });
    }

    initializeAnimations() {
        // Add entrance animations to new content
        const animatedElements = document.querySelectorAll('.card, .news-card, .admin-card');
        animatedElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.6s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    handleInitialLoad() {
        // Add entrance animations on initial page load
        setTimeout(() => {
            this.initializeAnimations();
        }, 100);
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Enhanced sidebar and page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize page transition system
    window.pageTransition = new PageTransition();
    
    // Sidebar functionality (backup initialization)
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const closeSidebar = document.getElementById('closeSidebar');
    
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            if (sidebar) {
                sidebar.classList.add('show');
            }
        });
    }
    
    if (closeSidebar) {
        closeSidebar.addEventListener('click', function() {
            if (sidebar) {
                sidebar.classList.remove('show');
            }
        });
    }
    
    // Close sidebar when clicking outside
    document.addEventListener('click', function(e) {
        if (sidebar && !sidebar.contains(e.target) && !e.target.closest('#sidebarToggle')) {
            sidebar.classList.remove('show');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add loading states to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('loading')) {
                this.classList.add('loading');
                setTimeout(() => {
                    this.classList.remove('loading');
                }, 1000);
            }
        });
    });
});

// Preload critical pages for faster transitions
function preloadPages() {
    const criticalPages = ['about.html', 'academics.html', 'contact.html'];
    
    criticalPages.forEach(page => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = page;
        document.head.appendChild(link);
    });
}

// Start preloading after initial load
window.addEventListener('load', preloadPages);