// Licensed under Elastic License 2.0
// See LICENSE.txt for details

// ByteFreezer Website JavaScript

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollEffects();
    initializeCopyButtons();
    initializeAnimations();
    initializeTypewriter();
});

// Navigation
function initializeNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on nav links
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Navbar scroll effect
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Smooth scrolling for anchor links
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        }
    });
}

// Scroll Effects
function initializeScrollEffects() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.feature-card, .service-card, .use-case-card, .community-card, .step'
    );
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Copy Code Functionality
function initializeCopyButtons() {
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const codeBlock = this.parentElement;
            const code = codeBlock.querySelector('code');
            const text = code.textContent || code.innerText;

            navigator.clipboard.writeText(text).then(function() {
                // Show success feedback
                const icon = button.querySelector('i');
                const originalClass = icon.className;
                icon.className = 'fas fa-check';
                button.style.background = 'rgba(16, 185, 129, 0.3)';
                
                setTimeout(() => {
                    icon.className = originalClass;
                    button.style.background = '';
                }, 2000);
            }).catch(function(err) {
                console.error('Failed to copy code: ', err);
                // Fallback for older browsers
                fallbackCopyTextToClipboard(text, button);
            });
        });
    });
}

// Fallback copy function for older browsers
function fallbackCopyTextToClipboard(text, button) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            const icon = button.querySelector('i');
            const originalClass = icon.className;
            icon.className = 'fas fa-check';
            button.style.background = 'rgba(16, 185, 129, 0.3)';
            
            setTimeout(() => {
                icon.className = originalClass;
                button.style.background = '';
            }, 2000);
        }
    } catch (err) {
        console.error('Fallback copy failed: ', err);
    }
    
    document.body.removeChild(textArea);
}

// Global copy function for inline use
function copyCode(button) {
    const codeBlock = button.parentElement;
    const code = codeBlock.querySelector('code');
    const text = code.textContent || code.innerText;

    navigator.clipboard.writeText(text).then(function() {
        const icon = button.querySelector('i');
        const originalClass = icon.className;
        icon.className = 'fas fa-check';
        button.style.background = 'rgba(16, 185, 129, 0.3)';
        
        setTimeout(() => {
            icon.className = originalClass;
            button.style.background = '';
        }, 2000);
    }).catch(function(err) {
        fallbackCopyTextToClipboard(text, button);
    });
}

// Initialize Animations
function initializeAnimations() {
    // Add animation classes to elements
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1;
            transform: translateY(0);
            transition: all 0.6s ease-out;
        }
        
        .feature-card,
        .service-card,
        .use-case-card,
        .community-card,
        .step {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease-out;
        }
        
        /* Staggered animation delays */
        .feature-card:nth-child(1) { transition-delay: 0.1s; }
        .feature-card:nth-child(2) { transition-delay: 0.2s; }
        .feature-card:nth-child(3) { transition-delay: 0.3s; }
        .feature-card:nth-child(4) { transition-delay: 0.4s; }
        .feature-card:nth-child(5) { transition-delay: 0.5s; }
        .feature-card:nth-child(6) { transition-delay: 0.6s; }
        
        .service-card:nth-child(1) { transition-delay: 0.1s; }
        .service-card:nth-child(2) { transition-delay: 0.2s; }
        .service-card:nth-child(3) { transition-delay: 0.3s; }
        .service-card:nth-child(4) { transition-delay: 0.4s; }
        .service-card:nth-child(5) { transition-delay: 0.5s; }
        
        .step:nth-child(1) { transition-delay: 0.1s; }
        .step:nth-child(2) { transition-delay: 0.3s; }
        .step:nth-child(3) { transition-delay: 0.5s; }
        .step:nth-child(4) { transition-delay: 0.7s; }
    `;
    document.head.appendChild(style);
}

// Typewriter Effect for Hero Title
function initializeTypewriter() {
    const titleElement = document.querySelector('.hero-title');
    if (!titleElement) return;

    const originalText = titleElement.innerHTML;
    const words = originalText.split(' ');
    let wordIndex = 0;
    
    // Don't run typewriter on mobile for performance
    if (window.innerWidth < 768) return;

    titleElement.innerHTML = '';
    
    function typeWord() {
        if (wordIndex < words.length) {
            const word = words[wordIndex];
            titleElement.innerHTML += word + ' ';
            wordIndex++;
            setTimeout(typeWord, 150);
        }
    }
    
    // Start typewriter effect after a small delay
    setTimeout(typeWord, 500);
}

// Utility Functions
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Performance optimizations
const optimizedScrollHandler = throttle(function() {
    // Add any scroll-based animations here
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// Handle window resize
const optimizedResizeHandler = debounce(function() {
    // Recalculate any size-dependent elements
}, 250);

window.addEventListener('resize', optimizedResizeHandler);

// Preload critical images
function preloadImages() {
    const images = [
        'assets/images/logo.svg',
        'assets/images/hero-bg.jpg'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize preloading
preloadImages();

// Service Worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(error) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Analytics (placeholder - replace with your analytics code)
function trackEvent(eventName, eventData = {}) {
    // Example: gtag('event', eventName, eventData);
    console.log('Event tracked:', eventName, eventData);
}

// Track important interactions
document.addEventListener('click', function(e) {
    const target = e.target.closest('a, button');
    if (!target) return;
    
    if (target.href && target.href.includes('github.com')) {
        trackEvent('github_click', { url: target.href });
    }
    
    if (target.classList.contains('btn-primary')) {
        trackEvent('cta_click', { text: target.textContent.trim() });
    }
    
    if (target.classList.contains('copy-btn')) {
        trackEvent('code_copy', { section: target.closest('section')?.id || 'unknown' });
    }
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // Optional: send to error tracking service
});

// Add loading states for dynamic content
function showLoading(element) {
    element.classList.add('loading');
    element.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
}

function hideLoading(element, originalContent) {
    element.classList.remove('loading');
    element.innerHTML = originalContent;
}

// Export functions for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        copyCode,
        trackEvent,
        showLoading,
        hideLoading
    };
}