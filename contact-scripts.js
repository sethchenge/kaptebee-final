// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize Application
function initializeApp() {
    initializeSidebar();
    initializeBackToTop();
    initializeContactForm();
    initializeNewsletterForm();
    initializeAOS();
    initializeScrollAnimations();
    initializeSmoothScrolling();
}

// Sidebar Functionality
function initializeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const closeSidebar = document.getElementById('closeSidebar');
    const mainContent = document.querySelector('.main-content');

    // Toggle sidebar
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function(e) {
            e.preventDefault();
            toggleSidebar();
        });
    }

    // Close sidebar
    if (closeSidebar) {
        closeSidebar.addEventListener('click', function(e) {
            e.preventDefault();
            closeSidebarPanel();
        });
    }

    // Close sidebar when clicking outside
    document.addEventListener('click', function(e) {
        if (sidebar && sidebar.classList.contains('show')) {
            if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
                closeSidebarPanel();
            }
        }
    });

    // Close sidebar on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sidebar && sidebar.classList.contains('show')) {
            closeSidebarPanel();
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && sidebar && sidebar.classList.contains('show')) {
            closeSidebarPanel();
        }
    });
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.main-content');
    
    if (sidebar) {
        sidebar.classList.toggle('show');
        
        // Add overlay effect
        if (sidebar.classList.contains('show')) {
            document.body.style.overflow = 'hidden';
            addOverlay();
        } else {
            document.body.style.overflow = '';
            removeOverlay();
        }
    }
}

function closeSidebarPanel() {
    const sidebar = document.getElementById('sidebar');
    
    if (sidebar && sidebar.classList.contains('show')) {
        sidebar.classList.remove('show');
        document.body.style.overflow = '';
        removeOverlay();
    }
}

function addOverlay() {
    // Remove existing overlay if any
    removeOverlay();
    
    const overlay = document.createElement('div');
    overlay.id = 'sidebar-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 1040;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(overlay);
    
    // Add click event to close sidebar
    overlay.addEventListener('click', closeSidebarPanel);
    
    // Fade in effect
    setTimeout(() => {
        overlay.style.opacity = '1';
    }, 10);
}

function removeOverlay() {
    const overlay = document.getElementById('sidebar-overlay');
    if (overlay) {
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.remove();
        }, 300);
    }
}

// Back to Top Button
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        // Scroll to top when clicked
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Contact Form Functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formResponse = document.getElementById('formResponse');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactFormSubmit(this, formResponse);
        });

        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });

            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    }
}

function handleContactFormSubmit(form, responseElement) {
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    form.classList.add('loading');

    // Collect form data
    const formData = new FormData(form);
    const data = {
        name: formData.get('name') || document.getElementById('nameInput').value,
        email: formData.get('email') || document.getElementById('emailInput').value,
        phone: formData.get('phone') || document.getElementById('phoneInput').value,
        subject: formData.get('subject') || document.getElementById('subjectSelect').value,
        message: formData.get('message') || document.getElementById('messageInput').value,
        newsletter: document.getElementById('newsletterCheck').checked
    };

    // Validate form data
    if (!validateFormData(data)) {
        resetSubmitButton(submitBtn, originalText, form);
        return;
    }

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        try {
            // Simulate successful submission
            showFormResponse(responseElement, 'success', 'Thank you for your message! We\'ll get back to you within 24 hours.');
            form.reset();
            
            // Track form submission (replace with actual analytics)
            trackFormSubmission(data);
            
        } catch (error) {
            showFormResponse(responseElement, 'error', 'Sorry, there was an error sending your message. Please try again or contact us directly.');
            console.error('Form submission error:', error);
        } finally {
            resetSubmitButton(submitBtn, originalText, form);
        }
    }, 2000);
}

function validateFormData(data) {
    const errors = [];

    if (!data.name || data.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
    }

    if (!data.email || !isValidEmail(data.email)) {
        errors.push('Please enter a valid email address');
    }

    if (data.phone && !isValidPhone(data.phone)) {
        errors.push('Please enter a valid phone number');
    }

    if (!data.subject) {
        errors.push('Please select a subject');
    }

    if (!data.message || data.message.trim().length < 10) {
        errors.push('Message must be at least 10 characters long');
    }

    if (errors.length > 0) {
        const responseElement = document.getElementById('formResponse');
        showFormResponse(responseElement, 'error', errors.join('<br>'));
        return false;
    }

    return true;
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    switch (field.type) {
        case 'email':
            isValid = value === '' || isValidEmail(value);
            errorMessage = 'Please enter a valid email address';
            break;
        case 'tel':
            isValid = value === '' || isValidPhone(value);
            errorMessage = 'Please enter a valid phone number';
            break;
        default:
            if (field.hasAttribute('required')) {
                isValid = value !== '';
                errorMessage = 'This field is required';
            }
    }

    if (!isValid) {
        showFieldError(field, errorMessage);
    } else {
        clearFieldError(field);
    }

    return isValid;
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    field.classList.add('is-invalid');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
    field.classList.remove('is-invalid');
    const errorDiv = field.parentNode.querySelector('.invalid-feedback');
    if (errorDiv) {
        errorDiv.remove();
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[(]?[\+]?\d{3}[)]?[\s\-]?\d{3}[\s\-]?\d{3,6}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

function showFormResponse(element, type, message) {
    if (element) {
        element.className = `form-response ${type}`;
        element.innerHTML = message;
        element.style.display = 'block';
        
        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                element.style.display = 'none';
            }, 5000);
        }
        
        // Scroll to response
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function resetSubmitButton(button, originalText, form) {
    button.innerHTML = originalText;
    button.disabled = false;
    form.classList.remove('loading');
}

function trackFormSubmission(data) {
    // Replace with actual analytics tracking
    console.log('Form submitted:', data);
    
    // Example: Google Analytics event tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submit', {
            event_category: 'Contact',
            event_label: data.subject,
            value: 1
        });
    }
}

// Newsletter Form
function initializeNewsletterForm() {
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleNewsletterSubmit(this);
        });
    });
}

function handleNewsletterSubmit(form) {
    const emailInput = form.querySelector('input[type="email"]');
    const submitBtn = form.querySelector('button[type="submit"]');
    const email = emailInput.value.trim();

    if (!isValidEmail(email)) {
        showFormResponse(form.querySelector('.form-response'), 'error', 'Please enter a valid email address');
        return;
    }
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
    // Simulate newsletter subscription (replace with actual API call)
    setTimeout(() => {
        showFormResponse(form.querySelector('.form-response'), 'success', 'Thank you for subscribing to our newsletter!');
        emailInput.value = '';
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Subscribe';
        
        // Track newsletter subscription
        trackNewsletterSubscription(email);
    }, 2000);
}
function trackNewsletterSubscription(email) {
    // Replace with actual analytics tracking
    console.log('Newsletter subscription:', email);
    
    // Example: Google Analytics event tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', 'newsletter_subscribe', {
            event_category: 'Newsletter',
            event_label: email,
            value: 1
        });
    }
}
// Initialize AOS (Animate On Scroll)
function initializeAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            disable: 'mobile'
        });
    }
}
// Initialize Scroll Animations
function initializeScrollAnimations() {
    const elements = document.querySelectorAll('.scroll-animate');
    
    elements.forEach(element => {
        element.addEventListener('scroll', function() {
            if (isElementInViewport(this)) {
                this.classList.add('animated');
            }
        });
    });
}
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
// Initialize Smooth Scrolling
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}
