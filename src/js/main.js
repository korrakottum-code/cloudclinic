// ===== Cloud Clinic - Main JS =====
import { renderNavbar, renderStickyBar, renderFooter } from './components.js';

// Initialize shared components
export function initApp(activePage = '') {
    renderNavbar(activePage);
    renderStickyBar();
    renderFooter();
    initHamburger();
    initScrollAnimations();
    initNavbarScroll();
    initParallaxClouds();
}

// Hamburger Menu
function initHamburger() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const overlay = document.getElementById('navOverlay');

    if (!hamburger) return;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('open');
        overlay.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    overlay?.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close on link click
    navLinks?.querySelectorAll('.navbar__link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('open');
            overlay?.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// Scroll Animations (Intersection Observer)
function initScrollAnimations() {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// Navbar scroll effect
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });
}

// Parallax Effect for Hero Clouds
function initParallaxClouds() {
    const clouds = document.querySelectorAll('.hero__cloud');
    if (!clouds.length) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;

        clouds.forEach((cloud, index) => {
            // Different subtle speeds for each cloud layer
            const speed = (index + 1) * 0.15;
            // The negative sign moves it upwards as you scroll down
            cloud.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }, { passive: true });
}
