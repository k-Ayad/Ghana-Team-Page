// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animate elements on scroll
document.addEventListener('DOMContentLoaded', () => {
    // Add scroll animation to sections
    const sections = document.querySelectorAll('section:not(.hero)');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });

    // Animate church cards
    const churchCards = document.querySelectorAll('.church-card');
    churchCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Animate reason cards
    const reasonCards = document.querySelectorAll('.reason-card');
    reasonCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.15}s, transform 0.5s ease ${index * 0.15}s`;
        observer.observe(card);
    });

    // Counter animation for stats
    const animateCounter = (element, target, duration = 2000) => {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };

        updateCounter();
    };

    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const number = entry.target.querySelector('.stat-number');
                const target = parseInt(number.textContent.replace('+', ''));
                const hasPlus = number.textContent.includes('+');
                animateCounter(number, target);
                if (hasPlus) {
                    setTimeout(() => {
                        number.textContent = target + '+';
                    }, 2000);
                }
                statObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-item').forEach(stat => {
        statObserver.observe(stat);
    });

    // Add active state to social links on click
    document.querySelectorAll('.social-card').forEach(card => {
        card.addEventListener('click', function(e) {
            // Add a brief active effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-content');
        if (hero && scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            hero.style.opacity = 1 - (scrolled / window.innerHeight);
        }
    });

    // Add hover effect to game button
    const gameButton = document.querySelector('.game-button');
    if (gameButton) {
        gameButton.addEventListener('mouseenter', function() {
            this.querySelector('i').style.transform = 'scale(1.2) rotate(360deg)';
            this.querySelector('i').style.transition = 'transform 0.5s ease';
        });

        gameButton.addEventListener('mouseleave', function() {
            this.querySelector('i').style.transform = 'scale(1) rotate(0deg)';
        });
    }

    // Add loading animation for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.addEventListener('load', function() {
                this.style.opacity = '1';
            });
        }
    });

    // Add click effect to CTA buttons
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.5)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s ease-out';
            ripple.style.pointerEvents = 'none';

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Show scroll indicator only on hero section
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 100) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        });

        // Click handler for scroll indicator
        scrollIndicator.addEventListener('click', () => {
            const nextSection = document.querySelector('.social-section');
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Add keyboard navigation support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Close any open modals or menus if implemented
        }
    });

    // Track external link clicks for analytics (placeholder)
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        link.addEventListener('click', function() {
            console.log('External link clicked:', this.href);
            // Add your analytics tracking code here
        });
    });

    // Add touch-friendly hover effects for mobile
    if ('ontouchstart' in window) {
        document.querySelectorAll('.church-card, .reason-card, .social-card').forEach(card => {
            card.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            card.addEventListener('touchend', function() {
                this.style.transform = '';
            });
        });
    }

    // Lazy load video iframe
    const videoWrapper = document.querySelector('.video-wrapper');
    if (videoWrapper) {
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const iframe = entry.target.querySelector('iframe');
                    if (iframe && iframe.dataset.src) {
                        iframe.src = iframe.dataset.src;
                    }
                    videoObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.25 });

        videoObserver.observe(videoWrapper);
    }

    // Add subtle parallax to church cards
    if (window.innerWidth > 768) {
        window.addEventListener('scroll', () => {
            const churchCards = document.querySelectorAll('.church-card');
            churchCards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const scrollPercent = rect.top / window.innerHeight;
                if (scrollPercent > -0.5 && scrollPercent < 1.5) {
                    card.style.transform = `translateY(${scrollPercent * 10}px)`;
                }
            });
        });
    }

    // Console welcome message
    console.log('%c🎯 Welcome to Coptic Orthodox Church Ghana Website! 🇬🇭', 
        'color: #8B4513; font-size: 16px; font-weight: bold;');
    console.log('%cBuilt with ❤️ for spreading the message of Christ in West Africa', 
        'color: #DAA520; font-size: 12px;');
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll-heavy functions
const debouncedScroll = debounce(() => {
    // Your scroll-heavy functions here
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Service Worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    // Uncomment when you have a service worker file
    // navigator.serviceWorker.register('/sw.js')
    //     .then(reg => console.log('Service Worker registered', reg))
    //     .catch(err => console.log('Service Worker registration failed', err));
}

// Add error handling for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        console.warn('Failed to load image:', this.src);
        // You could set a fallback image here
        // this.src = 'assets/fallback.png';
    });
});
