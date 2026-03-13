// Global JavaScript for FlowSync Consulting website
// Minimal functionality - most interactions handled by Alpine.js

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for anchor links (with reduced motion support)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                // Check if user prefers reduced motion
                const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                document.querySelector(href).scrollIntoView({
                    behavior: prefersReducedMotion ? 'auto' : 'smooth'
                });
            }
        });
    });
});
