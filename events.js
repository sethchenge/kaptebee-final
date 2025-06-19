// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Gallery data
const galleryData = [
    {
        src: "images/gallary/chaplain.jpg",
        title: "Welcoming of the CU chaplain",
        description: "The whole school community came together to welcome the new chaplain."
    },
    {
        src: "images/gallary/sports.jpg",
        title: "Sports Day 2025",
        description: "Annual sports competitions at the zonals."
    },
    {
        src: "images/gallary/ICTmembers2.jpg",
        title: "ICT Club Members",
        description: "ICT club members working on the school website project."
    },
    {
        src: "images/gallary/ourmatron.jpg",
        title: "Our Matron",
        description: "Kate, our chief security officer, happily welcomes matron back to school after a long weekend. A clear indication of how caring and loving matron is."
    },
];

// DOM elements
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const closeSidebar = document.getElementById('closeSidebar');
let sidebarOverlay;

// Initialize animations and event listeners
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeSidebar();
    initializeScrollAnimations();
});

// Sidebar functionality
function initializeSidebar() {
    // Create overlay
    sidebarOverlay = document.createElement('div');
    sidebarOverlay.className = 'sidebar-overlay';
    document.body.appendChild(sidebarOverlay);

    // Toggle sidebar
    sidebarToggle.addEventListener('click', function(e) {
        e.preventDefault();
        openSidebar();
    });

    // Close sidebar
    closeSidebar.addEventListener('click', function(e) {
        e.preventDefault();
        closeSidebarFunc();
    });

    // Close sidebar when clicking overlay
    sidebarOverlay.addEventListener('click', function() {
        closeSidebarFunc();
    });

    // Close sidebar on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sidebar.classList.contains('show')) {
            closeSidebarFunc();
        }
    });
}

function openSidebar() {
    sidebar.classList.add('show');
    sidebarOverlay.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    // Animate sidebar links
    gsap.fromTo('.sidebar .nav-link', 
        { x: -50, opacity: 0 }, 
        { 
            x: 0, 
            opacity: 1, 
            duration: 0.3, 
            stagger: 0.1,
            delay: 0.2
        }
    );
}

function closeSidebarFunc() {
    sidebar.classList.remove('show');
    sidebarOverlay.classList.remove('show');
    document.body.style.overflow = '';
}

// Initialize hero animations
function initializeAnimations() {
    // Hero section animations
    const heroTl = gsap.timeline({ delay: 0.5 });
    
    heroTl
        .to('.hero-title', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out'
        })
        .to('.hero-subtitle', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.4')
        .to('.hero-decoration', {
            opacity: 1,
            scaleX: 1,
            duration: 0.6,
            ease: 'power2.out'
        }, '-=0.2');

    // Add floating animation to hero decoration
    gsap.to('.hero-decoration', {
        y: -10,
        duration: 2,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1
    });
}

// Scroll-triggered animations
function initializeScrollAnimations() {
    // Section titles animation
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.fromTo(title,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: title,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });

    // Section subtitles animation
    gsap.utils.toArray('.section-subtitle').forEach(subtitle => {
        gsap.fromTo(subtitle,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power2.out',
                delay: 0.2,
                scrollTrigger: {
                    trigger: subtitle,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });

    // Event cards animation
    gsap.utils.toArray('.event-card').forEach((card, index) => {
        gsap.fromTo(card,
            { opacity: 0, y: 50, scale: 0.9 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Add hover animations
        card.addEventListener('mouseenter', function() {
            gsap.to(this, {
                y: -10,
                duration: 0.3,
                ease: 'power2.out'
            });
            
            gsap.to(this.querySelector('.event-date'), {
                scale: 1.1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', function() {
            gsap.to(this, {
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
            
            gsap.to(this.querySelector('.event-date'), {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // Gallery items animation
    gsap.utils.toArray('.gallery-item').forEach((item, index) => {
        gsap.fromTo(item,
            { opacity: 0, scale: 0.8, y: 30 },
            {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Add advanced hover effects
        const card = item.querySelector('.gallery-card');
        const image = item.querySelector('.gallery-image img');
        const overlay = item.querySelector('.gallery-overlay');
        const content = item.querySelector('.gallery-content');

        card.addEventListener('mouseenter', function() {
            gsap.to(card, {
                y: -15,
                scale: 1.05,
                duration: 0.4,
                ease: 'power2.out'
            });

            gsap.to(overlay, {
                opacity: 1,
                duration: 0.3,
                ease: 'power2.out'
            });

            gsap.fromTo(content.children,
                { y: 20, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.4,
                    stagger: 0.1,
                    ease: 'power2.out',
                    delay: 0.1
                }
            );
        });

        card.addEventListener('mouseleave', function() {
            gsap.to(card, {
                y: 0,
                scale: 1,
                duration: 0.4,
                ease: 'power2.out'
            });

            gsap.to(overlay, {
                opacity: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // Parallax effect for hero section
    gsap.to('.hero-section::before', {
        yPercent: -50,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        }
    });

    // Add scroll-triggered counter animation for event dates
    gsap.utils.toArray('.event-date .day').forEach(day => {
        const finalNumber = parseInt(day.textContent);
        const counter = { value: 0 };
        
        gsap.to(counter, {
            value: finalNumber,
            duration: 1.5,
            ease: 'power2.out',
            onUpdate: function() {
                day.textContent = Math.round(counter.value);
            },
            scrollTrigger: {
                trigger: day,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    });
}

// Gallery modal functionality
function openModal(index) {
    const modalElement = document.getElementById('galleryModal');
    const modal = new bootstrap.Modal(modalElement);
    
    const data = galleryData[index];
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalImage').src = data.src;
    document.getElementById('modalImage').alt = data.title;
    document.getElementById('modalDescription').textContent = data.description;
    
    modal.show();
    
    // Animate modal content
    modalElement.addEventListener('shown.bs.modal', function() {
        gsap.fromTo('#modalImage', 
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, ease: 'power2.out' }
        );
        
        gsap.fromTo('#modalDescription',
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, delay: 0.2, ease: 'power2.out' }
        );
    });
}

// Add smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            gsap.to(window, {
                duration: 1,
                scrollTo: target,
                ease: 'power2.inOut'
            });
        }
    });
});

// Add loading animation
window.addEventListener('load', function() {
    gsap.fromTo('body', 
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: 'power2.out' }
    );
});

// Add scroll progress indicator
gsap.to('.hero-decoration', {
    scaleX: () => {
        const scrollProgress = window.pageYOffset / (document.body.scrollHeight - window.innerHeight);
        return 1 + scrollProgress * 2;
    },
    ease: 'none',
    scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true
    }
});

// Responsive animations
function handleResize() {
    ScrollTrigger.refresh();
}

window.addEventListener('resize', handleResize);

// Add intersection observer for performance optimization
const observerOptions = {
    threshold: 0.1,
    rootMargin: '50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, observerOptions);

// Observe elements for performance-optimized animations
document.querySelectorAll('.event-card, .gallery-item').forEach(el => {
    observer.observe(el);
});