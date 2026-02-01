// ========================================
// Smooth Scrolling for Anchor Links
// ========================================
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

// ========================================
// Scroll Indicator Interaction
// ========================================
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    });

    // Hide scroll indicator when user scrolls down
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 100) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '0.6';
        }
        lastScroll = currentScroll;
    });
}

// ========================================
// Intersection Observer for Fade-in Animations
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(30px)';
            
            // Trigger animation
            setTimeout(() => {
                entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.feature-card, .use-case-card, .story-text, .story-image');
animateElements.forEach(el => observer.observe(el));

// ========================================
// Parallax Effect for Hero Glow
// ========================================
const heroGlow = document.querySelector('.hero::before');
window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrollPosition < window.innerHeight) {
        hero.style.setProperty('--glow-offset', `${scrollPosition * 0.5}px`);
    }
});

// ========================================
// Dynamic CTA Button Tracking
// ========================================
const ctaButtons = document.querySelectorAll('.cta-button');
ctaButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // Add visual feedback
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
        
        // Log to console (can be replaced with analytics)
        console.log('CTA clicked:', button.textContent.trim());
    });
});

// ========================================
// Add Easter Egg - Click the moon 5 times
// ========================================
let moonClickCount = 0;
const footerMoon = document.querySelector('.footer-moon');
if (footerMoon) {
    footerMoon.addEventListener('click', () => {
        moonClickCount++;
        footerMoon.style.transform = `rotate(${moonClickCount * 72}deg)`;
        footerMoon.style.transition = 'transform 0.5s ease';
        
        if (moonClickCount >= 5) {
            // Easter egg unlocked!
            document.body.style.animation = 'night-mode 2s ease';
            setTimeout(() => {
                alert('🌙 Gratulujeme! Našli jste skrytou funkci. Lampovak – pro ty, kdo mají rádi tajemství.');
                moonClickCount = 0;
            }, 500);
        }
    });
}

// ========================================
// Performance: Lazy Load Background Images
// ========================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.style.backgroundImage = `url(${img.dataset.src})`;
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('[data-src]').forEach(img => imageObserver.observe(img));
}

// ========================================
// Mobile Menu Enhancement (if needed in future)
// ========================================
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
if (isMobile) {
    document.body.classList.add('is-mobile');
}

// ========================================
// Preload Critical Resources
// ========================================
window.addEventListener('load', () => {
    // Mark page as loaded
    document.body.classList.add('loaded');
    
    // Optional: Add any post-load optimizations
    console.log('🔥 Lampovak loaded successfully!');
});
