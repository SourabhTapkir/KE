// Header scroll behavior with momentum
let lastScroll = 0;
let scrollDirection = 0;
const header = document.querySelector('header');
const scrollThreshold = 50;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const scrollDifference = currentScroll - lastScroll;
    
    // Calculate scroll direction with momentum
    scrollDirection = (scrollDirection * 0.8) + (scrollDifference * 0.2);
    
    if (currentScroll <= scrollThreshold) {
        // Always show header at top of page
        header.style.transform = 'translateY(0)';
    } else if (Math.abs(scrollDirection) > 2) {
        // Apply smooth transform based on scroll direction
        const translateY = Math.max(-100, Math.min(0, -scrollDirection));
        header.style.transform = `translateY(${translateY}%)`;
    }
    
    lastScroll = currentScroll;
});

// Show header when mouse moves to top of viewport
document.addEventListener('mousemove', (e) => {
    if (e.clientY < 60) {
        header.style.transform = 'translateY(0)';
    }
});

// Enhanced Slider functionality
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentSlide = 0;
    let autoSlideInterval;
    let isPaused = false;
    let isTransitioning = false;

    function updateSlider() {
        slider.style.transform = `translateX(-${currentSlide * 25}%)`;
    }

    function nextSlide() {
        if (!isPaused && !isTransitioning) {
            isTransitioning = true;
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlider();
            setTimeout(() => {
                isTransitioning = false;
            }, 500);
        }
    }

    function prevSlide() {
        if (!isPaused && !isTransitioning) {
            isTransitioning = true;
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            updateSlider();
            setTimeout(() => {
                isTransitioning = false;
            }, 500);
        }
    }

    function startAutoSlide() {
        stopAutoSlide();
        if (!isPaused) {
            autoSlideInterval = setInterval(nextSlide, 5000);
        }
    }

    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
            autoSlideInterval = null;
        }
    }

    // Initialize slider
    updateSlider();
    startAutoSlide();

    // Event listeners
    prevBtn.addEventListener('click', () => {
        stopAutoSlide();
        prevSlide();
        startAutoSlide();
    });

    nextBtn.addEventListener('click', () => {
        stopAutoSlide();
        nextSlide();
        startAutoSlide();
    });

    slider.addEventListener('mouseenter', () => {
        isPaused = true;
        stopAutoSlide();
    });

    slider.addEventListener('mouseleave', () => {
        isPaused = false;
        startAutoSlide();
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const dropdowns = document.querySelectorAll('.dropdown');

    // Toggle menu
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Handle dropdowns on mobile
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.nav-link');
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
        }
    });
});

let touchStartX = 0;
let touchEndX = 0;

const slider = document.querySelector('.slider-container');

slider.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

slider.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50; // minimum distance for a swipe
    const difference = touchStartX - touchEndX;

    if (Math.abs(difference) > swipeThreshold) {
        if (difference > 0) {
            // Swipe left - show next slide
            document.querySelector('.next').click();
        } else {
            // Swipe right - show previous slide
            document.querySelector('.prev').click();
        }
    }
}