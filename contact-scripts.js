/**
 * Kaptebee School - Contact Page JavaScript
 * Handles animations, form validation, and interactive features
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animations
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    const formResponse = document.getElementById('formResponse');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('nameInput').value.trim();
            const email = document.getElementById('emailInput').value.trim();
            const phone = document.getElementById('phoneInput').value.trim();
            const subject = document.getElementById('subjectSelect').value;
            const message = document.getElementById('messageInput').value.trim();
            const newsletter = document.getElementById('newsletterCheck').checked;
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                showFormResponse('error', 'Please fill in all required fields.');
                return;
            }
            
            if (!isValidEmail(email)) {
                showFormResponse('error', 'Please enter a valid email address.');
                return;
            }
            
            // Simulate form submission with delay
            const submitBtn = contactForm.querySelector('.submit-btn');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            setTimeout(() => {
                // In a real application, you would send this data to a server
                console.log({
                    name,
                    email,
                    phone,
                    subject,
                    message,
                    newsletter
                });
                
                // Reset form and show success message
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                
                // Show success message
                showFormResponse('success', 'Thank you! Your message has been sent successfully. We will get back to you soon.');
                
                // Optional: Automatically open email client
                if (confirm('Would you like to open your email client to send a direct email as well?')) {
                    openEmailClient();
                }
            }, 1500);
        });
    }
    
    // Function to validate email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Function to show form response
    function showFormResponse(type, message) {
        formResponse.className = `form-response ${type}`;
        formResponse.innerHTML = message;
        formResponse.style.display = 'block';
        
        // Scroll to response
        formResponse.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Hide response after some time if it's a success message
        if (type === 'success') {
            setTimeout(() => {
                formResponse.style.opacity = '0';
                setTimeout(() => {
                    formResponse.style.display = 'none';
                    formResponse.style.opacity = '1';
                }, 500);
            }, 5000);
        }
    }

    // Function to open email client
    function openEmailClient() {
        const email = 'info@kaptebee.ac.ke';
        const subject = 'Inquiry from Website Contact Form';
        const body = 'Dear Kaptebee School Team,\n\nI am reaching out regarding ';
        
        window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }

    // Direct email links
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add bounce animation on click
            link.classList.add('animated-bounce');
            setTimeout(() => {
                link.classList.remove('animated-bounce');
            }, 1000);
        });
    });

    // Phone links
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add pulse animation on click
            link.classList.add('animated-pulse');
            setTimeout(() => {
                link.classList.remove('animated-pulse');
            }, 1000);
        });
    });
    
    // Back to Top button functionality
    const backToTopButton = document.getElementById('backToTop');
    
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Add hover effects to contact cards
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add scale effect to icon
            const icon = card.querySelector('.icon-wrapper');
            if (icon) {
                icon.style.transform = 'scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            // Remove scale effect from icon
            const icon = card.querySelector('.icon-wrapper');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });
    
    // Social media icons hover animations
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            // Add rotation animation
            icon.style.transform = 'translateY(-5px) rotate(360deg)';
        });
        
        icon.addEventListener('mouseleave', function() {
            // Remove rotation animation
            icon.style.transform = 'translateY(0) rotate(0deg)';
        });
    });
    
    // FAQ accordion additional animations
    const accordionButtons = document.querySelectorAll('.accordion-button');
    accordionButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add pulse animation to the button when clicked
            if (button.classList.contains('collapsed')) {
                button.style.animation = 'pulse 0.5s';
                setTimeout(() => {
                    button.style.animation = '';
                }, 500);
            }
        });
    });
    
    // Animate form inputs on focus
    const formInputs = document.querySelectorAll('.form-control, .form-select');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            input.parentElement.style.transform = 'translateX(5px)';
            setTimeout(() => {
                input.parentElement.style.transform = 'translateX(0)';
            }, 200);
        });
    });
    
    // Add CSS animations for reuse
    const style = document.createElement('style');
    style.textContent = `
        .animated-bounce {
            animation: bounce 1s;
        }
        
        .animated-pulse {
            animation: pulse 1s;
        }
        
        @keyframes bounce {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-10px);
            }
        }
        
        @keyframes pulse {
            0% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.05);
            }
            100% {
                transform: scale(1);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add interactive map placeholder
    const mapPlaceholder = document.querySelector('.map-placeholder');
    if (mapPlaceholder) {
        mapPlaceholder.addEventListener('click', function() {
            if (confirm('Would you like to open Google Maps to see our location?')) {
                window.open('https://maps.google.com', '_blank');
            }
        });
        
        // Add hover effect
        mapPlaceholder.addEventListener('mouseenter', function() {
            mapPlaceholder.style.backgroundColor = '#d1e7dd';
        });
        
        mapPlaceholder.addEventListener('mouseleave', function() {
            mapPlaceholder.style.backgroundColor = '';
        });
    }
    
    // Add a special cursor effect for CTA elements
    const ctaElements = document.querySelectorAll('.cta-buttons .btn, .btn-primary, .submit-btn');
    ctaElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            document.body.style.cursor = 'pointer';
        });
        
        element.addEventListener('mouseleave', function() {
            document.body.style.cursor = 'default';
        });
    });
});

// Add a small sidebar toggle functionality (assuming there's a sidebar)
document.addEventListener('DOMContentLoaded', function() {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const closeSidebar = document.getElementById('closeSidebar');
    
    if (sidebarToggle && sidebar && closeSidebar) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.add('open');
        });
        
        closeSidebar.addEventListener('click', function() {
            sidebar.classList.remove('open');
        });
    }
});