// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    
    // Hide preloader after page load
    window.addEventListener('load', function() {
        preloader.classList.add('fade-out');
        setTimeout(function() {
            preloader.style.display = 'none';
        }, 500);
    });
    
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Add smooth scrolling to all navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the target section id from the href
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // Scroll to the target section smoothly
            window.scrollTo({
                top: targetSection.offsetTop - 70, // Offset for navbar height
                behavior: 'smooth'
            });
            
            // Update active link
            updateActiveLink();
        });
    });
    
    // Function to update active navigation link based on scroll position
    function updateActiveLink() {
        const sections = document.querySelectorAll('.section');
        const scrollPosition = window.scrollY + 100; // Adding offset for better accuracy
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to the corresponding link
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
    
    // Update active link on scroll
    window.addEventListener('scroll', updateActiveLink);
    
    // Initial call to set active link on page load
    updateActiveLink();
    
    // Scroll to top button
    const scrollTopBtn = document.querySelector('.scroll-top');
    
    // Show/hide scroll to top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top when button is clicked
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add animation to elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.skill-category, .project-item, .experience-item, .education-item, .hobby-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fadeInUp');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        elements.forEach(element => {
            observer.observe(element);
        });
    };
    
    // Initialize animation on scroll
    animateOnScroll();
    
    // Add animation to skill items
    const skillItems = document.querySelectorAll('.skills-list li');
    
    // Add animation when skills come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    // Apply initial style and observe each skill item
    skillItems.forEach((item, index) => {
        item.style.opacity = 0;
        item.style.transform = 'translateY(20px)';
        item.style.transition = `opacity 0.3s ease, transform 0.3s ease ${index * 0.05}s`;
        observer.observe(item);
    });
    
    // Add animation to project items
    const projectItems = document.querySelectorAll('.project-item');
    
    // Apply initial style and observe each project item
    projectItems.forEach((item, index) => {
        item.style.opacity = 0;
        item.style.transform = 'translateY(20px)';
        item.style.transition = `opacity 0.5s ease, transform 0.5s ease ${index * 0.1}s`;
        observer.observe(item);
    });
    
    // Mobile navigation toggle (if needed for smaller screens)
    const navbar = document.getElementById('navbar');
    const navbarHeight = navbar.offsetHeight;
    
    // Update navbar style on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.background = 'white';
        }
    });
    
    // Update copyright year
    const currentYear = new Date().getFullYear();
    const footerYear = document.getElementById('current-year');
    if (footerYear) {
        footerYear.textContent = currentYear;
    }
    
    // Add hover effect to project tech tags
    const techTags = document.querySelectorAll('.project-tech span');
    
    techTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color');
            this.style.color = 'white';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
            this.style.color = '';
        });
    });
    
    // Ensure footer links work properly
    const footerLinks = document.querySelectorAll('.social-links-footer a');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Prevent default only if the link doesn't have a valid href
            if (!this.getAttribute('href') || this.getAttribute('href') === '#') {
                e.preventDefault();
            }
            // Otherwise let the browser handle the link normally
        });
    });
}); 