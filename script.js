// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'transparent';
        navbar.style.boxShadow = 'none';
    }
});

// Animate timeline items on scroll
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('.timeline-item').forEach(item => {
    observer.observe(item);
});

// Typing effect for hero section
const typeText = (element, text, speed = 100) => {
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
};

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroText = document.querySelector('.hero-text');
    if (heroText) {
        heroText.textContent = '';
        typeText(heroText, 'Data Scientist | Machine Learning Engineer | Problem Solver');
    }
});

// Modal functionality
function openModal() {
    document.getElementById('posterModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('posterModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside the image
document.getElementById('posterModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Close modal with escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && document.getElementById('posterModal').classList.contains('active')) {
        closeModal();
    }
});

// Handle scroll hint for presentation image
document.addEventListener('DOMContentLoaded', function() {
    const scrollContainer = document.querySelector('.presentation-scroll');
    const scrollHint = document.querySelector('.scroll-hint');
    
    if (scrollContainer && scrollHint) {
        // Show scroll hint only if content is scrollable
        function updateScrollHint() {
            if (scrollContainer.scrollWidth > scrollContainer.clientWidth) {
                scrollHint.style.display = 'block';
            } else {
                scrollHint.style.display = 'none';
            }
        }
        
        // Update on load and resize
        updateScrollHint();
        window.addEventListener('resize', updateScrollHint);
        
        // Hide hint when user starts scrolling
        scrollContainer.addEventListener('scroll', function() {
            scrollHint.style.opacity = '0';
        });
        
        // Show hint when user hovers over container
        scrollContainer.addEventListener('mouseenter', function() {
            if (scrollContainer.scrollWidth > scrollContainer.clientWidth) {
                scrollHint.style.opacity = '1';
            }
        });
        
        scrollContainer.addEventListener('mouseleave', function() {
            scrollHint.style.opacity = '0';
        });
    }
});

// Mobile Navigation
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle menu
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Calculate required height for menu
        if (navMenu.classList.contains('active')) {
            const height = Array.from(navMenu.children)
                .reduce((total, item) => total + item.offsetHeight, 0);
            navMenu.style.height = `${height}px`;
        } else {
            navMenu.style.height = '0';
        }
    });
    
    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navMenu.style.height = '0';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInside = navMenu.contains(event.target) || navToggle.contains(event.target);
        if (!isClickInside && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navMenu.style.height = '0';
        }
    });
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth > 768) {
                navMenu.style.height = '';
                navMenu.classList.remove('active');
            }
        }, 250);
    });
});
