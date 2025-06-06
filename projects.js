document.addEventListener('DOMContentLoaded', function() {
    // Sidebar toggle functionality
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const closeSidebar = document.getElementById('closeSidebar');
    
    if (sidebarToggle && sidebar && closeSidebar) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.add('active');
        });
        
        closeSidebar.addEventListener('click', function() {
            sidebar.classList.remove('active');
        });
        
        // Close sidebar when clicking outside
        document.addEventListener('click', function(event) {
            if (!sidebar.contains(event.target) && !sidebarToggle.contains(event.target) && sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
            }
        });
    }
    


document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const closeSidebar = document.getElementById('closeSidebar');
    const navbar = document.querySelector('.navbar');

    // Smooth navbar transition on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Sidebar toggle functionality
    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');

        // Overlay when sidebar is active
        if (sidebar.classList.contains('active')) {
            const overlay = document.createElement('div');
            overlay.classList.add('sidebar-overlay');
            overlay.style.position = 'fixed';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            overlay.style.zIndex = '1040';
            overlay.style.opacity = '0';
            overlay.style.transition = 'opacity 0.3s ease';
            document.body.appendChild(overlay);

            setTimeout(() => { overlay.style.opacity = '1'; }, 10);

            overlay.addEventListener('click', function() {
                sidebar.classList.remove('active');
                this.style.opacity = '0';
                setTimeout(() => { document.body.removeChild(this); }, 300);
            });
        } else {
            const overlay = document.querySelector('.sidebar-overlay');
            if (overlay) {
                overlay.style.opacity = '0';
                setTimeout(() => { document.body.removeChild(overlay); }, 300);
            }
        }
    });

    // Close sidebar button
    closeSidebar.addEventListener('click', function() {
        sidebar.classList.remove('active');

        const overlay = document.querySelector('.sidebar-overlay');
        if (overlay) {
            overlay.style.opacity = '0';
            setTimeout(() => { document.body.removeChild(overlay); }, 300);
        }
    });
});




    // Sample project data - Updated with images array
    const projects = [
        {
            id: 1,
            title: "Smart Agricultural Irrigation System",
            category: "technology",
            image: "images/projects/irrigation-main.jpg", // Keep this for the main gallery
            images: [
                "images/projects/irrigation-main.jpg",
                "images/projects/irrigation-sensors.jpg", 
                "images/projects/irrigation-system.jpg"
            ],
            students: "Form 3 Students",
            date: "April 2025",
            description: "An automated system that uses soil moisture sensors to optimize water usage in crop farming.",
            likes: 24
        },
        {
            id: 2,
            title: "Biodegradable Plastic from Cassava Starch",
            category: "science",
            image: "images/projects/cassava-main.jpg",
            images: [
                "images/projects/cassava-main.jpg",
                "images/projects/cassava-process.jpg",
                "images/projects/cassava-result.jpg"
            ],
            students: "Form 4 Students",
            date: "March 2025",
            description: "Research and development of an eco-friendly alternative to conventional plastic using locally available cassava.",
            likes: 36
        },
        {
            id: 3,
            title: "Mathematical Model for Traffic Flow Optimization",
            category: "mathematics",
            image: "images/projects/traffic-main.jpg",
            images: [
                "images/projects/traffic-main.jpg",
                "images/projects/traffic-model.jpg",
                "images/projects/traffic-analysis.jpg"
            ],
            students: "Form 4 Students",
            date: "February 2025",
            description: "A statistical approach to improving traffic flow at major intersections using mathematical algorithms.",
            likes: 18
        },
        {
            id: 4,
            title: "Solar-Powered Mobile Phone Charger",
            category: "engineering",
            image: "images/projects/solar-main.jpg",
            images: [
                "images/solar-main.jpg",
                "images/solar-panel.jpg",
                "images/solar-charging.jpg"
            ],
            students: "Form 2 Students",
            date: "May 2025",
            description: "A portable device that harnesses solar energy to charge mobile phones in areas with limited electricity.",
            likes: 29
        },
        {
            id: 5,
            title: "Recycled Materials School Furniture",
            category: "innovation",
            image: "images/projects/furniture-main.jpg",
            images: [
                "images/projects/furniture-main.jpg",
                "images/projects/furniture-materials.jpg",
                "images/projects/furniture-finished.jpg"
            ],
            students: "Form 3 Students",
            date: "January 2025",
            description: "Creating durable and comfortable school furniture using recycled plastics and other waste materials.",
            likes: 42
        },
        {
            id: 6,
            title: "Medicinal Plants Database",
            category: "science",
            image: "images/projects/plants-main.jpg",
            images: [
                "images/projects/plants-main.jpg",
                "images/projects/plants-collection.jpg",
                "images/projects/plants-database.jpg"
            ],
            students: "Form 3 Students",
            date: "March 2025",
            description: "A comprehensive study and cataloging of local medicinal plants and their traditional uses.",
            likes: 31
        },
        {
            id: 7,
            title: "Eco-Friendly Brick Production",
            category: "engineering",
            image: "images/projects/brick-main.jpg",
            images: [
                "images/projects/brick-main.jpg",
                "images/projects/brick-materials.jpg",
                "images/projects/brick-production.jpg"
            ],
            students: "Form 2 Students",
            date: "April 2025",
            description: "Development of a method to produce construction bricks using agricultural waste and minimal cement.",
            likes: 26
        },
        {
            id: 8,
            title: "Machine Learning Weather Prediction",
            category: "technology",
            image: "images/projects/weather-main.jpg",
            images: [
                "images/projects/weather-main.jpg",
                "images/projects/weather-data.jpg",
                "images/projects/weather-prediction.jpg"
            ],
            students: "Form 4 Students",
            date: "February 2025",
            description: "Using historical weather data to create a machine learning model that predicts local weather patterns.",
            likes: 33
        },
        {
            id: 9,
            title: "Affordable Wind Turbine Design",
            category: "innovation",
            image: "images/projects/turbine-main.jpg",
            images: [
                "images/projects/turbine-main.jpg",
                "images/projects/turbine-design.jpg",
                "images/projects/turbine-testing.jpg"
            ],
            students: "Form 1 Students",
            date: "May 2025",
            description: "Small-scale wind turbines designed with locally available materials for rural electrification.",
            likes: 27
        }
    ];
    
    // Project detail data (would typically come from an API/database) - Updated with images array
    const projectDetails = {
        1: {
            title: "Smart Agricultural Irrigation System",
            category: "Technology",
            students: ["John Kamau", "Mary Wanjiku", "Peter Odhiambo"],
            supervisor: "Mrs. Jane Njeri",
            date: "April 2025",
            images: [
                "images/projects/irrigation-main.jpg",
                "images/projects/irrigation-sensors.jpg", 
                "images/projects/irrigation-system.jpg"
            ],
            problem: "Inefficient water usage in agriculture leads to wasted resources and lower crop yields, especially in drought-prone areas.",
            solution: "Our system uses Arduino-based soil moisture sensors to detect when plants need water and automatically activates irrigation. The system is solar-powered and can be monitored via a simple mobile application.",
            methodology: "We developed a prototype using Arduino microcontrollers, soil moisture sensors, and solenoid valves. The system was tested on a small plot growing kale and compared to traditional watering methods.",
            results: "The smart irrigation system reduced water usage by 30% while maintaining optimal soil moisture levels. Crop yields increased by 15% compared to manually irrigated control plots.",
            impact: "If implemented widely, this technology could significantly improve agricultural productivity while conserving water resources in our community.",
            awards: ["Innovation Award - District Science Fair", "Sustainability Recognition - County Agricultural Show"]
        },
        // Additional project details would be added here for other projects
    };
    
    // Variables for pagination
    let currentPage = 1;
    const projectsPerPage = 6;
    let filteredProjects = [...projects];
    
    // Load initial projects
    loadProjects(filteredProjects, currentPage, projectsPerPage);
    
    // Filter buttons functionality
    const filterButtons = document.querySelectorAll('.btn-filter');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Reset pagination
            currentPage = 1;
            
            // Filter projects
            if (filter === 'all') {
                filteredProjects = [...projects];
            } else {
                filteredProjects = projects.filter(project => project.category === filter);
            }
            
            // Load filtered projects
            loadProjects(filteredProjects, currentPage, projectsPerPage);
        });
    });
    
    // Search functionality
    const searchInput = document.getElementById('projectSearch');
    const searchBtn = document.getElementById('searchBtn');
    
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', function() {
            searchProjects();
        });
        
        searchInput.addEventListener('keyup', function(event) {
            if (event.key === 'Enter') {
                searchProjects();
            }
        });
    }
    
    function searchProjects() {
        const searchValue = searchInput.value.toLowerCase().trim();
        
        if (searchValue === '') {
            // If search is empty, reset to current filter
            const activeFilter = document.querySelector('.btn-filter.active').getAttribute('data-filter');
            if (activeFilter === 'all') {
                filteredProjects = [...projects];
            } else {
                filteredProjects = projects.filter(project => project.category === activeFilter);
            }
        } else {
            // Search in titles and descriptions
            filteredProjects = projects.filter(project => {
                return project.title.toLowerCase().includes(searchValue) || 
                       project.description.toLowerCase().includes(searchValue);
            });
        }
        
        // Reset pagination and load filtered projects
        currentPage = 1;
        loadProjects(filteredProjects, currentPage, projectsPerPage);
    }
    
    // Sorting functionality
    const sortSelect = document.getElementById('sortProjects');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortValue = this.value;
            
            switch(sortValue) {
                case 'newest':
                    // Assuming the date format is consistent for simplicity
                    filteredProjects.sort((a, b) => new Date(b.date) - new Date(a.date));
                    break;
                case 'oldest':
                    filteredProjects.sort((a, b) => new Date(a.date) - new Date(b.date));
                    break;
                case 'name-asc':
                    filteredProjects.sort((a, b) => a.title.localeCompare(b.title));
                    break;
                case 'name-desc':
                    filteredProjects.sort((a, b) => b.title.localeCompare(a.title));
                    break;
            }
            
            // Reset pagination
            currentPage = 1;
            
            // Reload projects with new sort
            loadProjects(filteredProjects, currentPage, projectsPerPage);
        });
    }
    
    //student who participated in the camara projects
// Student Profiles JavaScript for Responsive Behavior
document.addEventListener('DOMContentLoaded', function() {
    const profilesSection = document.querySelector('.student-profiles');
    const profileItems = document.querySelectorAll('.profile-item');
    
    // Responsive grid adjustment
    function adjustProfilesLayout() {
        const screenWidth = window.innerWidth;
        const profilesRow = document.querySelector('.profiles-row');
        
        if (screenWidth <= 576) {
            // Mobile: Stack vertically with animation
            profilesRow.style.flexDirection = 'column';
            profilesRow.style.alignItems = 'center';
            
            // Add staggered animation for mobile
            profileItems.forEach((item, index) => {
                item.style.animationDelay = `${index * 0.1}s`;
                item.classList.add('fade-in-up');
            });
        } else if (screenWidth <= 768) {
            // Tablet: 2 columns
            profilesRow.style.flexDirection = 'row';
            profilesRow.style.flexWrap = 'wrap';
            profilesRow.style.justifyContent = 'center';
            
            profileItems.forEach((item, index) => {
                item.style.flex = '0 0 45%';
                item.style.marginBottom = '2rem';
            });
        } else if (screenWidth <= 992) {
            // Small desktop: 3-4 per row
            profilesRow.style.flexDirection = 'row';
            profilesRow.style.flexWrap = 'wrap';
            profilesRow.style.justifyContent = 'space-around';
            
            profileItems.forEach((item) => {
                item.style.flex = '0 0 30%';
                item.style.marginBottom = '2rem';
            });
        } else {
            // Large desktop: Single row
            profilesRow.style.flexDirection = 'row';
            profilesRow.style.flexWrap = 'wrap';
            profilesRow.style.justifyContent = 'space-between';
            
            profileItems.forEach((item) => {
                item.style.flex = '1';
                item.style.marginBottom = '0';
            });
        }
    }
    
    // Intersection Observer for scroll animations
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Stagger animation for profile items
                    const profiles = entry.target.querySelectorAll('.profile-item');
                    profiles.forEach((profile, index) => {
                        setTimeout(() => {
                            profile.classList.add('slide-in');
                        }, index * 100);
                    });
                }
            });
        }, observerOptions);
        
        if (profilesSection) {
            observer.observe(profilesSection);
        }
    }
    
    // Touch/swipe functionality for mobile
    function initTouchInteractions() {
        let startX = 0;
        let currentX = 0;
        let profilesRow = document.querySelector('.profiles-row');
        
        if (window.innerWidth <= 576) {
            profileItems.forEach(item => {
                item.addEventListener('touchstart', (e) => {
                    startX = e.touches[0].clientX;
                });
                
                item.addEventListener('touchmove', (e) => {
                    currentX = e.touches[0].clientX;
                });
                
                item.addEventListener('touchend', () => {
                    const diff = startX - currentX;
                    
                    // Add subtle feedback for touch interactions
                    if (Math.abs(diff) > 10) {
                        item.style.transform = 'scale(0.95)';
                        setTimeout(() => {
                            item.style.transform = '';
                        }, 150);
                    }
                });
            });
        }
    }
    
    // Profile image error handling
    function handleImageErrors() {
        const profileImages = document.querySelectorAll('.profile-img');
        
        profileImages.forEach(img => {
            img.addEventListener('error', function() {
                // Create a placeholder with initials
                const name = this.alt || 'Student';
                const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
                
                // Create a canvas for the placeholder
                const canvas = document.createElement('canvas');
                canvas.width = 92;
                canvas.height = 92;
                const ctx = canvas.getContext('2d');
                
                // Draw background
                ctx.fillStyle = '#28a745';
                ctx.fillRect(0, 0, 92, 92);
                
                // Draw initials
                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 24px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(initials, 46, 46);
                
                // Replace the image with the canvas
                this.src = canvas.toDataURL();
            });
        });
    }
    
    // Lazy loading for better performance
    function initLazyLoading() {
        const profileImages = document.querySelectorAll('.profile-img');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });
            
            profileImages.forEach(img => {
                imageObserver.observe(img);
            });
        }
    }
    
    // Smooth hover effects
    function initHoverEffects() {
        profileItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });
    }
    
    // Resize handler with debouncing
    let resizeTimeout;
    function handleResize() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            adjustProfilesLayout();
        }, 250);
    }
    
    // Initialize all functions
    adjustProfilesLayout();
    initScrollAnimations();
    initTouchInteractions();
    handleImageErrors();
    initLazyLoading();
    initHoverEffects();
    
    // Event listeners
    window.addEventListener('resize', handleResize);
    
    // Add CSS animations dynamically
    const style = document.createElement('style');
    style.textContent = `
        .fade-in-up {
            animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .slide-in {
            animation: slideIn 0.8s ease-out forwards;
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateX(-20px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        .student-profiles {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.8s ease-out;
        }
        
        .profile-item {
            opacity: 0;
            transform: translateX(-20px);
            transition: all 0.6s ease-out;
        }
    `;
    document.head.appendChild(style);
});


    // Load More button functionality
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            currentPage++;
            loadProjects(filteredProjects, currentPage, projectsPerPage, true);
        });
    }
    
    // Project submission functionality
    const submitProjectBtn = document.getElementById('submitProjectBtn');
    const successModal = new bootstrap.Modal(document.getElementById('successModal'));
    const submitProjectModal = document.getElementById('submitProjectModal');
    
    if (submitProjectBtn) {
        submitProjectBtn.addEventListener('click', function() {
            const form = document.getElementById('projectSubmissionForm');
            
            // Simple form validation
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('is-invalid');
                } else {
                    field.classList.remove('is-invalid');
                }
            });
            
            if (isValid) {
                // In a real application, you would submit the form data to a server here
                bootstrap.Modal.getInstance(submitProjectModal).hide();
                successModal.show();
                form.reset();
            }
        });
    }
    
    // Project detail modal functionality
    function setupProjectDetailModal() {
        const projectLinks = document.querySelectorAll('.btn-view-project');
        projectLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const projectId = this.getAttribute('data-id');
                const projectModal = document.getElementById('projectDetailModal');
                const projectDetailContent = document.getElementById('projectDetailContent');
                
                // Get project details
                const details = projectDetails[projectId];
                if (details) {
                    // Build modal content
                    let modalContent = `
                        <div class="project-detail-gallery mb-4">
                            <div class="row">
                                <div class="col-md-8 mb-3">
                                    <img src="${details.images[0]}" alt="${details.title}" class="img-fluid rounded">
                                </div>
                                <div class="col-md-4">
                                    <div class="row">
                                        <div class="col-6 col-md-12 mb-3">
                                            <img src="${details.images[1]}" alt="Project Image" class="img-fluid rounded">
                                        </div>
                                        <div class="col-6 col-md-12">
                                            <img src="${details.images[2]}" alt="Project Image" class="img-fluid rounded">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="project-info mb-4">
                            <h3>${details.title}</h3>
                            <div class="project-meta mb-3">
                                <span class="category"><i class="fas fa-tag"></i> ${details.category}</span>
                                <span class="students"><i class="fas fa-users"></i> ${details.students.join(', ')}</span>
                                <span class="supervisor"><i class="fas fa-chalkboard-teacher"></i> Supervisor: ${details.supervisor}</span>
                                <span class="date"><i class="far fa-calendar-alt"></i> ${details.date}</span>
                            </div>
                        </div>
                        <div class="project-sections">
                            <h4>Problem Statement</h4>
                            <p>${details.problem}</p>
                            
                            <h4>Solution</h4>
                            <p>${details.solution}</p>
                            
                            <h4>Methodology</h4>
                            <p>${details.methodology}</p>
                            
                            <h4>Results</h4>
                            <p>${details.results}</p>
                            
                            <h4>Impact</h4>
                            <p>${details.impact}</p>
                            
                            <h4>Awards & Recognition</h4>
                            <ul>
                                ${details.awards.map(award => `<li>${award}</li>`).join('')}
                            </ul>
                        </div>
                    `;
                    
                    projectDetailContent.innerHTML = modalContent;
                    const modalInstance = new bootstrap.Modal(projectModal);
                    modalInstance.show();
                }
            });
        });
    }
    
    // Project likes functionality
    function setupLikeButtons() {
        const likeButtons = document.querySelectorAll('.project-likes');
        likeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const likeCount = this.querySelector('span');
                let likes = parseInt(likeCount.textContent);
                
                // Toggle like state
                if (!this.classList.contains('liked')) {
                    likes++;
                    this.classList.add('liked');
                    this.style.color = 'var(--primary-color)';
                } else {
                    likes--;
                    this.classList.remove('liked');
                    this.style.color = '#6c757d';
                }
                
                likeCount.textContent = likes;
            });
        });
    }
    
    // Function to load projects
    function loadProjects(projectsArray, page, perPage, append = false) {
        const container = document.getElementById('projectsContainer');
        const start = (page - 1) * perPage;
        const end = start + perPage;
        const paginatedProjects = projectsArray.slice(start, end);
        
        // Hide/show load more button
        if (end >= projectsArray.length) {
            document.getElementById('loadMoreBtn').style.display = 'none';
        } else {
            document.getElementById('loadMoreBtn').style.display = 'block';
        }
        
        if (paginatedProjects.length === 0 && page === 1) {
            container.innerHTML = `<div class="col-12 text-center">
                <p class="my-5">No projects found matching your criteria. Please try a different search or filter.</p>
            </div>`;
            return;
        }
        
        if (!append) {
            container.innerHTML = '';
        }
        
        // Create project cards
        paginatedProjects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'col-md-6 col-lg-4 mb-4';
            projectCard.innerHTML = `
                <div class="project-card">
                    <div class="project-img">
                        <img src="${project.image}" alt="${project.title}">
                        <span class="project-category">${project.category.charAt(0).toUpperCase() + project.category.slice(1)}</span>
                    </div>
                    <div class="project-body">
                        <h3 class="project-title">${project.title}</h3>
                        <div class="project-meta">
                            <span class="students"><i class="fas fa-users"></i> ${project.students}</span>
                            <span class="date"><i class="far fa-calendar-alt"></i> ${project.date}</span>
                        </div>
                        <p class="project-description">${project.description}</p>
                        <div class="project-footer">
                            <a href="#" class="btn btn-sm btn-view-project" data-id="${project.id}">View Project</a>
                            <div class="project-likes">
                                <i class="far fa-heart"></i> <span>${project.likes}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            container.appendChild(projectCard);
        });
        
        // Setup event listeners for the new cards
        setupProjectDetailModal();
        setupLikeButtons();
    }
});