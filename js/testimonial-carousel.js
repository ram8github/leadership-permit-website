/**
 * Testimonial Carousel
 * Auto-rotating carousel with manual controls
 */

document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.testimonial-carousel');
    if (!carousel) return; // Exit if carousel doesn't exist on page
    
    const slides = carousel.querySelectorAll('.testimonial-slide');
    const dots = carousel.querySelectorAll('.dot');
    const prevBtn = carousel.querySelector('.carousel-arrow.prev');
    const nextBtn = carousel.querySelector('.carousel-arrow.next');
    
    let currentSlide = 0;
    let autoRotateInterval;
    let isPaused = false;
    
    // Show specific slide
    function showSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide and dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentSlide = index;
    }
    
    // Next slide
    function nextSlide() {
        let next = currentSlide + 1;
        if (next >= slides.length) {
            next = 0;
        }
        showSlide(next);
    }
    
    // Previous slide
    function prevSlide() {
        let prev = currentSlide - 1;
        if (prev < 0) {
            prev = slides.length - 1;
        }
        showSlide(prev);
    }
    
    // Start auto-rotation
    function startAutoRotate() {
        if (!isPaused) {
            autoRotateInterval = setInterval(nextSlide, 7000); // 7 seconds per slide
        }
    }
    
    // Stop auto-rotation
    function stopAutoRotate() {
        clearInterval(autoRotateInterval);
    }
    
    // Event listeners for navigation arrows
    nextBtn.addEventListener('click', function() {
        nextSlide();
        stopAutoRotate();
        startAutoRotate(); // Restart timer after manual click
    });
    
    prevBtn.addEventListener('click', function() {
        prevSlide();
        stopAutoRotate();
        startAutoRotate(); // Restart timer after manual click
    });
    
    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showSlide(index);
            stopAutoRotate();
            startAutoRotate(); // Restart timer after manual click
        });
    });
    
    // Pause on hover (desktop)
    carousel.addEventListener('mouseenter', function() {
        isPaused = true;
        stopAutoRotate();
    });
    
    carousel.addEventListener('mouseleave', function() {
        isPaused = false;
        startAutoRotate();
    });
    
    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoRotate();
    }, { passive: true });
    
    carousel.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoRotate();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50; // Minimum distance for swipe
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swiped left - show next
                nextSlide();
            } else {
                // Swiped right - show previous
                prevSlide();
            }
        }
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            stopAutoRotate();
            startAutoRotate();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            stopAutoRotate();
            startAutoRotate();
        }
    });
    
    // Initialize - start auto-rotation
    startAutoRotate();
});
