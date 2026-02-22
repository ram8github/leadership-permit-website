// Leadership Permit Website JavaScript
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
