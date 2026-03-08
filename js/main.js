// Leadership Permit Website JavaScript

// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', function() {
    var hamburger = document.getElementById('nav-hamburger');
    var navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('open');
            navMenu.classList.toggle('open');
        });

        // Close menu when a nav link is clicked
        navMenu.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                hamburger.classList.remove('open');
                navMenu.classList.remove('open');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('open');
                navMenu.classList.remove('open');
            }
        });
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#diagnostic') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Form submission success message
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on a page after form submission
    if (window.location.search.includes('success=true')) {
        alert('Thank you! Your submission has been received.');
    }
});

// Active navigation highlighting
document.addEventListener('DOMContentLoaded', function() {
    var path = window.location.pathname;
    var navLinks = document.querySelectorAll('.nav-menu a:not(.btn-primary-small)');
    navLinks.forEach(function(link) {
        var href = link.getAttribute('href');
        if (!href) return;
        // Normalize: strip leading slash
        var linkPath = href.replace(/^\//, '');
        var currentPath = path.replace(/^\//, '') || 'index.html';
        if (linkPath && currentPath === linkPath) {
            link.style.color = '#1e3a8a';
            link.style.fontWeight = '700';
        }
    });
});
