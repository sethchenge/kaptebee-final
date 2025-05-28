// events.js - Interactive functionality for Kaptebee Secondary School Events & Gallery

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Sidebar Navigation
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const closeSidebar = document.getElementById('closeSidebar');
    
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when sidebar is open
        });
    }
    
    if (closeSidebar) {
        closeSidebar.addEventListener('click', function() {
            sidebar.classList.remove('active');
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        });
    }
    
    // Click outside sidebar to close
    document.addEventListener('click', function(event) {
        if (sidebar.classList.contains('active') && 
            !sidebar.contains(event.target) && 
            event.target !== sidebarToggle) {
            sidebar.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Back to Top Button
    const backToTopButton = document.getElementById('backToTop');
    
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });
    
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Gallery Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active filter button
            filterBtns.forEach(filterBtn => filterBtn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else if (item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Load More Gallery Items
    const loadMoreButton = document.getElementById('loadMoreGallery');
    let itemsToShow = 6; // Initial number of items shown
    
    // Hide items beyond initial count
    if (galleryItems.length > itemsToShow) {
        for (let i = itemsToShow; i < galleryItems.length; i++) {
            galleryItems[i].style.display = 'none';
        }
    }
    
    if (loadMoreButton) {
        loadMoreButton.addEventListener('click', function() {
            // Show 3 more items
            const hiddenItems = Array.from(galleryItems).filter(item => item.style.display === 'none');
            
            for (let i = 0; i < 3 && i < hiddenItems.length; i++) {
                hiddenItems[i].style.display = 'block';
                // Add animation
                setTimeout(() => {
                    hiddenItems[i].style.opacity = '1';
                    hiddenItems[i].style.transform = 'scale(1)';
                }, 50 * i);
            }
            
            // Hide load more button if all items are shown
            if (hiddenItems.length <= 3) {
                loadMoreButton.style.display = 'none';
            }
        });
    }
    
    // Lightbox Configuration
    lightbox.option({
        'resizeDuration': 300,
        'wrapAround': true,
        'disableScrolling': true,
        'fadeDuration': 300,
        'albumLabel': "Image %1 of %2"
    });
    
    // Event Card Hover Effects
    const eventCards = document.querySelectorAll('.event-card');
    
    eventCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.event-date').style.transform = 'scale(1.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.event-date').style.transform = 'scale(1)';
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for navbar height
                    behavior: 'smooth'
                });
                
                // Close sidebar if open
                if (sidebar.classList.contains('active')) {
                    sidebar.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            }
        });
    });
    
    // Timeline Animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    function animateTimeline() {
        timelineItems.forEach(item => {
            if (isInViewport(item)) {
                item.classList.add('animated');
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial state for timeline items
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.5s ease-in-out';
    });
    
    // Run on scroll
    window.addEventListener('scroll', animateTimeline);
    // Run on load
    animateTimeline();
    
    // Modal event details - Open specific tab
    const eventModals = document.querySelectorAll('.modal');
    
    eventModals.forEach(modal => {
        modal.addEventListener('shown.bs.modal', function() {
            // Add slight animation to modal content
            const modalContent = this.querySelector('.modal-content');
            modalContent.style.transform = 'translateY(20px)';
            modalContent.style.opacity = '0';
            
            setTimeout(() => {
                modalContent.style.transition = 'all 0.3s ease-out';
                modalContent.style.transform = 'translateY(0)';
                modalContent.style.opacity = '1';
            }, 50);
        });
    });
    
    // Add calendar integration for events
    const addToCalendarButtons = document.querySelectorAll('.add-to-calendar');
    
    addToCalendarButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const eventTitle = this.getAttribute('data-title');
            const eventDate = this.getAttribute('data-date');
            const eventTime = this.getAttribute('data-time');
            const eventLocation = this.getAttribute('data-location');
            
            // Create calendar file download (simple implementation)
            alert(`Event "${eventTitle}" would be added to your calendar on ${eventDate} at ${eventTime} in ${eventLocation}`);
            
            // In a real implementation, you would generate an .ics file
            // and trigger its download or open a calendar integration
        });
    });
    
    // Interactive countdown for upcoming events
    function updateCountdowns() {
        const eventCards = document.querySelectorAll('.event-card');
        
        eventCards.forEach(card => {
            const dateSpan = card.querySelector('.event-date .day');
            const monthSpan = card.querySelector('.event-date .month');
            
            if (dateSpan && monthSpan) {
                const day = parseInt(dateSpan.textContent);
                const month = getMonthFromString(monthSpan.textContent);
                
                // Create event date
                const eventDate = new Date();
                eventDate.setMonth(month);
                eventDate.setDate(day);
                
                // If the event is past for this year, set it to next year
                if (eventDate < new Date()) {
                    eventDate.setFullYear(eventDate.getFullYear() + 1);
                }
                
                // Calculate days remaining
                const today = new Date();
                const diffTime = Math.abs(eventDate - today);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                
                // Add countdown badge if not already present
                let countdownBadge = card.querySelector('.countdown-badge');
                
                if (!countdownBadge) {
                    countdownBadge = document.createElement('div');
                    countdownBadge.className = 'countdown-badge';
                    countdownBadge.style.position = 'absolute';
                    countdownBadge.style.top = '20px';
                    countdownBadge.style.left = '20px';
                    countdownBadge.style.backgroundColor = '#ff9800';
                    countdownBadge.style.color = 'white';
                    countdownBadge.style.padding = '5px 10px';
                    countdownBadge.style.borderRadius = '20px';
                    countdownBadge.style.fontSize = '0.75rem';
                    countdownBadge.style.fontWeight = 'bold';
                    card.appendChild(countdownBadge);
                }
                
                countdownBadge.textContent = `${diffDays} days left`;
            }
        });
    }
    
    function getMonthFromString(monthStr) {
        const months = {
            'JAN': 0, 'FEB': 1, 'MAR': 2, 'APR': 3, 'MAY': 4, 'JUN': 5,
            'JUL': 6, 'AUG': 7, 'SEP': 8, 'OCT': 9, 'NOV': 10, 'DEC': 11
        };
        return months[monthStr.toUpperCase()];
    }
    
    // Update countdowns on page load
    updateCountdowns();
    
    // Dynamic year in footer copyright
    document.querySelectorAll('.copyright').forEach(element => {
        const currentYear = new Date().getFullYear();
        element.innerHTML = element.innerHTML.replace(/\d{4}/, currentYear);
    });
});