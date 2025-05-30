// JavaScript for Kaptebee School News Section

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // News filtering functionality
    const filterButtons = document.querySelectorAll('[data-filter]');
    const newsItems = document.querySelectorAll('.news-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter news items
            filterNews(filter);
        });
    });

    function filterNews(category) {
        newsItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            
            if (category === 'all' || itemCategory === category) {
                item.style.display = 'block';
                item.classList.remove('hidden');
                // Add fade-in animation
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 100);
            } else {
                item.classList.add('hidden');
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
        
        // Update results count
        updateResultsCount(category);
    }

    function updateResultsCount(category) {
        const visibleItems = document.querySelectorAll(`.news-item${category !== 'all' ? `[data-category="${category}"]` : ''}`);
        const resultsText = document.querySelector('.results-count');
        
        if (resultsText) {
            resultsText.textContent = `Showing ${visibleItems.length} news items`;
        }
    }

    // Search functionality
    const searchInput = document.getElementById('newsSearch');
    const searchBtn = document.getElementById('searchBtn');
    
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
        
        // Real-time search
        searchInput.addEventListener('input', function() {
            if (this.value.length > 2) {
                performSearch();
            } else if (this.value.length === 0) {
                clearSearch();
            }
        });
    }

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            clearSearch();
            return;
        }

        newsItems.forEach(item => {
            const title = item.querySelector('.card-title').textContent.toLowerCase();
            const content = item.querySelector('.card-text').textContent.toLowerCase();
            const category = item.querySelector('.badge').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || content.includes(searchTerm) || category.includes(searchTerm)) {
                item.style.display = 'block';
                item.classList.remove('hidden');
                highlightSearchTerm(item, searchTerm);
            } else {
                item.classList.add('hidden');
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });

        // Show search results message
        showSearchMessage(searchTerm);
    }

    function clearSearch() {
        newsItems.forEach(item => {
            item.style.display = 'block';
            item.classList.remove('hidden');
            removeHighlight(item);
        });
        
        hideSearchMessage();
    }

    function highlightSearchTerm(item, searchTerm) {
        const title = item.querySelector('.card-title');
        const content = item.querySelector('.card-text');
        
        [title, content].forEach(element => {
            const originalText = element.textContent;
            const regex = new RegExp(`(${searchTerm})`, 'gi');
            element.innerHTML = originalText.replace(regex, '<span class="highlight">$1</span>');
        });
    }

    function removeHighlight(item) {
        const title = item.querySelector('.card-title');
        const content = item.querySelector('.card-text');
        
        [title, content].forEach(element => {
            element.innerHTML = element.textContent;
        });
    }

    function showSearchMessage(searchTerm) {
        let messageDiv = document.querySelector('.search-message');
        if (!messageDiv) {
            messageDiv = document.createElement('div');
            messageDiv.className = 'search-message alert alert-info mt-3';
            document.querySelector('.news-section .container').insertBefore(
                messageDiv, 
                document.querySelector('#newsContainer')
            );
        }
        
        const visibleItems = document.querySelectorAll('.news-item:not(.hidden)');
        messageDiv.innerHTML = `
            <i class="bi bi-search me-2"></i>
            Search results for "<strong>${searchTerm}</strong>": ${visibleItems.length} items found
            <button type="button" class="btn-close float-end" onclick="clearSearchMessage()"></button>
        `;
    }

    function hideSearchMessage() {
        const messageDiv = document.querySelector('.search-message');
        if (messageDiv) {
            messageDiv.remove();
        }
    }

    // Make clearSearchMessage global for the close button
    window.clearSearchMessage = function() {
        searchInput.value = '';
        clearSearch();
        hideSearchMessage();
    };

    // Load more functionality
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Show loading state
            const originalText = this.innerHTML;
            this.innerHTML = '<span class="loading"></span> Loading...';
            this.disabled = true;
            
            // Simulate loading delay
            setTimeout(() => {
                loadMoreNews();
                this.innerHTML = originalText;
                this.disabled = false;
            }, 1500);
        });
    }

    function loadMoreNews() {
        // This would typically fetch more news from a server
        // For now, we'll show a message
        const newsContainer = document.getElementById('newsContainer');
        
        // Create new news items (simulation)
        const additionalNews = [
            {
                category: 'sports',
                title: 'Swimming Team Qualifies for Nationals',
                content: 'Our swimming team has qualified for the national championships after winning the regional swimming competition.',
                date: { day: '25', month: 'Mar' },
                image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&h=250&fit=crop'
            },
            {
                category: 'academics',
                title: 'STEM Laboratory Equipment Upgrade',
                content: 'The school has invested in new state-of-the-art laboratory equipment to enhance our science programs.',
                date: { day: '22', month: 'Mar' },
                image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=250&fit=crop'
            },
            {
                category: 'events',
                title: 'Alumni Mentorship Program Launch',
                content: 'Former students return to share their experiences and mentor current students in various career paths.',
                date: { day: '18', month: 'Mar' },
                image: 'https://images.unsplash.com/photo-1521737604893-d14cc237c11d?w=400&h=250&fit=crop'
            }
        ];

        additionalNews.forEach((news, index) => {
            const newsCard = createNewsCard(news);
            newsContainer.appendChild(newsCard);
            
            // Animate the new card
            setTimeout(() => {
                newsCard.style.opacity = '1';
                newsCard.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }

    function createNewsCard(news) {
        const newsCard = document.createElement('div');
        newsCard.className = 'col-lg-4 col-md-6 news-item';
        newsCard.setAttribute('data-category', news.category);
        newsCard.style.opacity = '0';
        newsCard.style.transform = 'translateY(30px)';
        newsCard.style.transition = 'all 0.6s ease';
        
        const badgeColors = {
            'academics': 'success',
            'sports': 'primary',
            'events': 'warning',
            'achievements': 'success',
            'announcements': 'info'
        };

        newsCard.innerHTML = `
            <div class="card news-card h-100 border-0 shadow">
                <div class="position-relative">
                    <img src="${news.image}" class="card-img-top news-img" alt="${news.title}">
                    <div class="news-date-badge">
                        <span class="day">${news.date.day}</span>
                        <span class="month">${news.date.month}</span>
                    </div>
                </div>
                <div class="card-body p-4">
                    <div class="news-category mb-2">
                        <span class="badge bg-${badgeColors[news.category]}">${news.category.charAt(0).toUpperCase() + news.category.slice(1)}</span>
                    </div>
                    <h5 class="card-title mb-3">${news.title}</h5>
                    <p class="card-text">${news.content}</p>
                    <div class="news-meta mb-3">
                        <small class="text-muted">
                            <i class="bi bi-clock me-1"></i>2 weeks ago
                            <span class="mx-2">•</span>
                            <i class="bi bi-eye me-1"></i>${Math.floor(Math.random() * 300) + 50} views
                        </small>
                    </div>
                    <a href="#" class="btn btn-outline-success btn-sm">Read More <i class="bi bi-arrow-right"></i></a>
                </div>
            </div>
        `;
        
        return newsCard;
    }

    // Newsletter subscription
    const newsletterForm = document.querySelector('.newsletter-section .input-group');
    if (newsletterForm) {
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const subscribeBtn = newsletterForm.querySelector('button');
        
        subscribeBtn.addEventListener('click', function() {
            const email = emailInput.value.trim();
            
            if (!email) {
                showNotification('Please enter your email address', 'warning');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate subscription
            const originalText = this.innerHTML;
            this.innerHTML = '<span class="loading"></span> Subscribing...';
            this.disabled = true;
            
            setTimeout(() => {
                showNotification('Successfully subscribed to our newsletter!', 'success');
                emailInput.value = '';
                this.innerHTML = originalText;
                this.disabled = false;
            }, 2000);
        });
        
        emailInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                subscribeBtn.click();
            }
        });
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `alert alert-${type === 'error' ? 'danger' : type} notification-toast`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
            max-width: 350px;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
        `;
        
        notification.innerHTML = `
            <div class="d-flex align-items-center">
                <i class="bi bi-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : 'x-circle'} me-2"></i>
                <span>${message}</span>
                <button type="button" class="btn-close ms-auto" onclick="this.parentElement.parentElement.remove()"></button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }, 5000);
    }

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

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all news cards for animation
    document.querySelectorAll('.news-card').forEach(card => {
        card.classList.add('fade-in');
        observer.observe(card);
    });

    // Back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
    backToTopBtn.className = 'btn btn-success back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        z-index: 1000;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        display: none;
        box-shadow: 0 4px 12px rgba(40, 167, 69, 0.4);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(backToTopBtn);

    // Show/hide back to top button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    // Scroll to top functionality
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // News card click handlers
    document.querySelectorAll('.news-card').forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on buttons or links
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a') || e.target.closest('button')) {
                return;
            }
            
            // Add click effect
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // You could navigate to full article here
            console.log('Navigate to full article:', this.querySelector('.card-title').textContent);
        });
    });

    // Initialize view counters (simulate real-time updates)
    function updateViewCounters() {
        document.querySelectorAll('.news-meta small').forEach(meta => {
            const viewsSpan = meta.querySelector('i.bi-eye').nextSibling;
            if (viewsSpan) {
                const currentViews = parseInt(viewsSpan.textContent);
                const increment = Math.random() > 0.7 ? 1 : 0; // 30% chance to increment
                if (increment) {
                    viewsSpan.textContent = ` ${currentViews + 1} views`;
                }
            }
        });
    }

    // Update view counters every 30 seconds
    setInterval(updateViewCounters, 30000);

    // Initialize page
    console.log('Kaptebee School News page initialized successfully!');
});