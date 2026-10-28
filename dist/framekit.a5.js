/**
 * FrameKit Liquid Glass v1.0.0
 * Apple-inspired Glassmorphism UI Framework
 * Pure JavaScript & CSS - No dependencies required
 * 
 * Usage: Add <script src="framekit.a5.js"></script> to your HTML
 * Recommended: Add <link rel="preconnect" href="path/to/framekit.a5.js"> for faster loading
 */

;(function(global, factory) {
    'use strict';
    
    // Universal Module Definition (UMD)
    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        global.FrameKit = factory();
    }
})(typeof window !== 'undefined' ? window : this, function() {
    'use strict';
    
    /**
     * FrameKit Core
     * Main framework class
     */
    class FrameKit {
        constructor() {
            this.version = '1.0.0';
            this.name = 'FrameKit Liquid Glass';
            this.components = {};
            this.utils = new FrameKitUtils();
            this.animations = new FrameKitAnimations();
            this.theme = new FrameKitTheme();
            
            this.init();
        }
        
        /**
         * Initialize FrameKit
         */
        init() {
            // Auto-initialize components on DOM ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.autoInit());
            } else {
                this.autoInit();
            }
            
            // Add data-fk-initialized attribute to html
            document.documentElement.setAttribute('data-fk-initialized', 'true');
            
            // Log initialization (only in development)
            if (this.isDev()) {
                console.log(`%c${this.name} v${this.version}`, 'color: #0096ff; font-weight: bold; font-size: 14px;');
                console.log('%cFrameKit initialized successfully!', 'color: #666;');
            }
        }
        
        /**
         * Auto-initialize all FrameKit components
         */
        autoInit() {
            this.initComponents();
            this.initTheme();
            this.initAnimations();
        }
        
        /**
         * Initialize all component instances
         */
        initComponents() {
            // Initialize buttons with ripple effect
            this.initRippleButtons();
            
            // Initialize modals
            this.initModals();
            
            // Initialize navbar mobile menu (if needed)
            this.initNavbar();
            
            // Initialize cards with hover effects
            this.initCards();
        }
        
        /**
         * Initialize ripple effect on buttons
         */
        initRippleButtons() {
            const buttons = document.querySelectorAll('.fk-btn');
            
            buttons.forEach(button => {
                button.addEventListener('click', (e) => {
                    this.createRipple(e, button);
                });
            });
        }
        
        /**
         * Create ripple effect on click
         */
        createRipple(event, element) {
            const ripple = document.createElement('span');
            ripple.className = 'fk-ripple';
            
            // Position ripple at click location
            const rect = element.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = event.clientX - rect.left - size / 2;
            const y = event.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
            `;
            
            // Remove existing ripples
            const existingRipple = element.querySelector('.fk-ripple');
            if (existingRipple) {
                existingRipple.remove();
            }
            
            element.appendChild(ripple);
            
            // Remove ripple after animation
            ripple.addEventListener('animationend', () => {
                ripple.remove();
            });
        }
        
        /**
         * Initialize modals
         */
        initModals() {
            const modalTriggers = document.querySelectorAll('[data-fk-modal]');
            
            modalTriggers.forEach(trigger => {
                const targetId = trigger.getAttribute('data-fk-modal');
                const modal = document.getElementById(targetId);
                const overlay = modal?.parentElement;
                
                if (modal && overlay?.classList.contains('fk-modal-overlay')) {
                    trigger.addEventListener('click', (e) => {
                        e.preventDefault();
                        this.openModal(overlay);
                    });
                    
                    // Close modal on overlay click
                    overlay.addEventListener('click', (e) => {
                        if (e.target === overlay) {
                            this.closeModal(overlay);
                        }
                    });
                    
                    // Close modal on escape key
                    document.addEventListener('keydown', (e) => {
                        if (e.key === 'Escape' && overlay.classList.contains('active')) {
                            this.closeModal(overlay);
                        }
                    });
                    
                    // Close modal button
                    const closeBtn = modal.querySelector('.fk-modal-close');
                    if (closeBtn) {
                        closeBtn.addEventListener('click', () => {
                            this.closeModal(overlay);
                        });
                    }
                }
            });
        }
        
        /**
         * Open modal
         */
        openModal(overlay) {
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            this.animations.animateIn(overlay.querySelector('.fk-modal'), 'scale-in');
        }
        
        /**
         * Close modal
         */
        closeModal(overlay) {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        /**
         * Initialize navbar
         */
        initNavbar() {
            // Mobile menu toggle (if hamburger menu exists)
            const menuToggle = document.querySelector('.fk-navbar-toggle');
            const menu = document.querySelector('.fk-navbar-menu');
            
            if (menuToggle && menu) {
                menuToggle.addEventListener('click', () => {
                    menu.classList.toggle('active');
                    menuToggle.classList.toggle('active');
                });
            }
            
            // Navbar scroll effect
            const navbar = document.querySelector('.fk-navbar');
            if (navbar) {
                let lastScroll = 0;
                
                window.addEventListener('scroll', () => {
                    const currentScroll = window.pageYOffset;
                    
                    if (currentScroll > 100) {
                        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                        navbar.style.backdropFilter = 'blur(20px)';
                        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
                    } else {
                        navbar.style.background = '';
                        navbar.style.backdropFilter = '';
                        navbar.style.boxShadow = '';
                    }
                    
                    lastScroll = currentScroll;
                });
            }
        }
        
        /**
         * Initialize cards with hover effects
         */
        initCards() {
            const cards = document.querySelectorAll('.fk-card');
            
            cards.forEach(card => {
                // Add liquid effect on hover
                card.addEventListener('mouseenter', () => {
                    card.style.setProperty('--fk-reflect-opacity', '0.5');
                });
                
                card.addEventListener('mouseleave', () => {
                    card.style.setProperty('--fk-reflect-opacity', '0.3');
                });
            });
        }
        
        /**
         * Initialize theme system
         */
        initTheme() {
            // Check for saved theme preference
            const savedTheme = localStorage.getItem('framekit-theme');
            if (savedTheme) {
                this.theme.setTheme(savedTheme);
            } else {
                // Check system preference
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (prefersDark) {
                    this.theme.setTheme('dark');
                }
            }
            
            // Watch for system theme changes
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                if (!localStorage.getItem('framekit-theme')) {
                    this.theme.setTheme(e.matches ? 'dark' : 'light');
                }
            });
        }
        
        /**
         * Initialize animations
         */
        initAnimations() {
            // Add animation classes on scroll (Intersection Observer)
            this.animations.initScrollAnimations();
        }
        
        /**
         * Check if in development mode
         */
        isDev() {
            return document.documentElement.hasAttribute('data-fk-dev') || 
                   window.location.hostname === 'localhost' ||
                   window.location.hostname === '127.0.0.1';
        }
        
        /**
         * Get current version
         */
        getVersion() {
            return this.version;
        }
        
        /**
         * Get framework name
         */
        getName() {
            return this.name;
        }
    }
    
    /**
     * FrameKit Utilities
     * Helper functions and utilities
     */
    class FrameKitUtils {
        constructor() {}
        
        /**
         * Debounce function
         */
        debounce(func, wait) {
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
        
        /**
         * Throttle function
         */
        throttle(func, limit) {
            let inThrottle;
            return function(...args) {
                if (!inThrottle) {
                    func.apply(this, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        }
        
        /**
         * Check if element is in viewport
         */
        isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }
        
        /**
         * Add class to element
         */
        addClass(element, className) {
            if (element) {
                element.classList.add(className);
            }
        }
        
        /**
         * Remove class from element
         */
        removeClass(element, className) {
            if (element) {
                element.classList.remove(className);
            }
        }
        
        /**
         * Toggle class on element
         */
        toggleClass(element, className) {
            if (element) {
                element.classList.toggle(className);
            }
        }
        
        /**
         * Has class
         */
        hasClass(element, className) {
            return element ? element.classList.contains(className) : false;
        }
        
        /**
         * Generate unique ID
         */
        generateId(prefix = 'fk') {
            return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
        }
        
        /**
         * Escape HTML
         */
        escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }
        
        /**
         * Parse query string
         */
        parseQuery(query) {
            const params = new URLSearchParams(query);
            const result = {};
            params.forEach((value, key) => {
                result[key] = value;
            });
            return result;
        }
        
        /**
         * Format date
         */
        formatDate(date, format = 'YYYY-MM-DD') {
            const d = new Date(date);
            const pad = (num) => num.toString().padStart(2, '0');
            
            return format
                .replace('YYYY', d.getFullYear())
                .replace('MM', pad(d.getMonth() + 1))
                .replace('DD', pad(d.getDate()))
                .replace('HH', pad(d.getHours()))
                .replace('mm', pad(d.getMinutes()))
                .replace('ss', pad(d.getSeconds()));
        }
    }
    
    /**
     * FrameKit Theme System
     * Theme management and toggling
     */
    class FrameKitTheme {
        constructor() {
            this.currentTheme = this.getCurrentTheme();
        }
        
        /**
         * Get current theme
         */
        getCurrentTheme() {
            return document.documentElement.getAttribute('data-theme') || 
                   (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        }
        
        /**
         * Set theme
         */
        setTheme(theme) {
            const validThemes = ['light', 'dark', 'auto'];
            
            if (!validThemes.includes(theme)) {
                console.warn(`FrameKit: Invalid theme "${theme}". Using "light".`);
                theme = 'light';
            }
            
            if (theme === 'auto') {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                theme = prefersDark ? 'dark' : 'light';
            }
            
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('framekit-theme', theme);
            this.currentTheme = theme;
            
            // Dispatch custom event
            const event = new CustomEvent('framekit:theme-change', {
                detail: { theme }
            });
            document.dispatchEvent(event);
        }
        
        /**
         * Toggle theme between light and dark
         */
        toggle() {
            const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
            this.setTheme(newTheme);
        }
        
        /**
         * Get current theme
         */
        get() {
            return this.currentTheme;
        }
        
        /**
         * Check if dark theme is active
         */
        isDark() {
            return this.currentTheme === 'dark';
        }
        
        /**
         * Check if light theme is active
         */
        isLight() {
            return this.currentTheme === 'light';
        }
    }
    
    /**
     * FrameKit Animations
     * Animation utilities and scroll animations
     */
    class FrameKitAnimations {
        constructor() {
            this.animatedElements = new Set();
        }
        
        /**
         * Initialize scroll animations with Intersection Observer
         */
        initScrollAnimations() {
            const animatedElements = document.querySelectorAll(
                '.fk-fade-in, .fk-slide-up, .fk-slide-down, .fk-scale-in, .fk-float, .fk-pulse'
            );
            
            if (animatedElements.length === 0) return;
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const el = entry.target;
                        
                        // Add animation class based on data attribute or existing class
                        const animationType = el.getAttribute('data-fk-animation') || 
                            Array.from(el.classList).find(cls => 
                                cls.startsWith('fk-') && !cls.includes('fk-ripple')
                            );
                        
                        if (animationType) {
                            this.animateIn(el, animationType);
                        }
                        
                        this.animatedElements.add(el);
                        
                        // Optionally unobserve after animation
                        // observer.unobserve(el);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            animatedElements.forEach(el => observer.observe(el));
        }
        
        /**
         * Animate element in
         */
        animateIn(element, animationType) {
            if (this.animatedElements.has(element)) return;
            
            const animationClasses = {
                'fade-in': 'fk-fade-in',
                'slide-up': 'fk-slide-up',
                'slide-down': 'fk-slide-down',
                'scale-in': 'fk-scale-in',
                'float': 'fk-float',
                'pulse': 'fk-pulse'
            };
            
            const className = animationClasses[animationType] || animationType;
            
            // Remove any existing animation classes
            element.classList.remove(
                'fk-fade-in', 'fk-slide-up', 'fk-slide-down', 
                'fk-scale-in', 'fk-float', 'fk-pulse'
            );
            
            // Force reflow
            void element.offsetWidth;
            
            // Add animation class
            element.classList.add(className);
            
            this.animatedElements.add(element);
        }
        
        /**
         * Animate element out
         */
        animateOut(element, animationType = 'fade-out') {
            element.classList.add(`fk-${animationType}`);
        }
        
        /**
         * Create custom animation
         */
        createAnimation(element, keyframes, options = {}) {
            const animation = element.animate(keyframes, {
                duration: options.duration || 400,
                easing: options.easing || 'ease-out',
                fill: options.fill || 'forwards'
            });
            
            return animation;
        }
        
        /**
         * Parallax effect on scroll
         */
        parallax(element, speed = 0.5) {
            const handleScroll = () => {
                const scrollPosition = window.pageYOffset;
                const offset = scrollPosition * speed;
                element.style.transform = `translateY(${offset}px)`;
            };
            
            window.addEventListener('scroll', handleScroll);
            
            // Return cleanup function
            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }
    }
    
    /**
     * FrameKit Components
     * Individual UI components
     */
    class FrameKitComponents {
        static createButton(options = {}) {
            const button = document.createElement('button');
            button.className = `fk-btn ${options.variant || 'fk-btn-primary'}`;
            button.textContent = options.text || 'Button';
            button.type = options.type || 'button';
            
            if (options.id) button.id = options.id;
            if (options.className) button.classList.add(...options.className.split(' '));
            if (options.disabled) button.disabled = true;
            if (options.onClick) button.addEventListener('click', options.onClick);
            
            return button;
        }
        
        static createCard(options = {}) {
            const card = document.createElement('div');
            card.className = `fk-card ${options.className || ''}`;
            
            if (options.title) {
                const title = document.createElement('h3');
                title.className = 'fk-card-title';
                title.textContent = options.title;
                card.appendChild(title);
            }
            
            if (options.subtitle) {
                const subtitle = document.createElement('p');
                subtitle.className = 'fk-card-subtitle';
                subtitle.textContent = options.subtitle;
                card.appendChild(subtitle);
            }
            
            if (options.content) {
                const content = document.createElement('div');
                content.className = 'fk-card-content';
                content.innerHTML = options.content;
                card.appendChild(content);
            }
            
            if (options.id) card.id = options.id;
            
            return card;
        }
        
        static createModal(options = {}) {
            const overlay = document.createElement('div');
            overlay.className = 'fk-modal-overlay';
            
            const modal = document.createElement('div');
            modal.className = 'fk-modal';
            
            if (options.closeButton !== false) {
                const closeBtn = document.createElement('button');
                closeBtn.className = 'fk-modal-close';
                closeBtn.innerHTML = '&times;';
                modal.appendChild(closeBtn);
            }
            
            if (options.title) {
                const title = document.createElement('h2');
                title.className = 'fk-modal-title';
                title.textContent = options.title;
                modal.appendChild(title);
            }
            
            if (options.content) {
                const content = document.createElement('div');
                content.className = 'fk-modal-content';
                content.innerHTML = options.content;
                modal.appendChild(content);
            }
            
            overlay.appendChild(modal);
            
            if (options.id) {
                overlay.id = options.id;
                modal.id = `${options.id}-modal`;
            }
            
            document.body.appendChild(overlay);
            
            return { overlay, modal };
        }
        
        static createNavbar(options = {}) {
            const navbar = document.createElement('nav');
            navbar.className = 'fk-navbar';
            
            // Brand
            if (options.brand) {
                const brand = document.createElement('a');
                brand.className = 'fk-navbar-brand';
                brand.href = options.brand.href || '#';
                brand.textContent = options.brand.text || 'FrameKit';
                navbar.appendChild(brand);
            }
            
            // Menu
            if (options.menu && options.menu.items) {
                const menu = document.createElement('ul');
                menu.className = 'fk-navbar-menu';
                
                options.menu.items.forEach(item => {
                    const li = document.createElement('li');
                    const link = document.createElement('a');
                    link.className = 'fk-navbar-link';
                    link.href = item.href || '#';
                    link.textContent = item.text || '';
                    li.appendChild(link);
                    menu.appendChild(li);
                });
                
                navbar.appendChild(menu);
            }
            
            if (options.id) navbar.id = options.id;
            
            return navbar;
        }
        
        static createInput(options = {}) {
            const input = document.createElement('input');
            input.className = `fk-input ${options.className || ''}`;
            input.type = options.type || 'text';
            input.placeholder = options.placeholder || '';
            input.value = options.value || '';
            
            if (options.id) input.id = options.id;
            if (options.name) input.name = options.name;
            if (options.required) input.required = true;
            if (options.disabled) input.disabled = true;
            
            return input;
        }
    }
    
    /**
     * Initialize FrameKit when script is loaded
     */
    const instance = new FrameKit();
    
    // Export for use in modules
    return {
        // Core
        FrameKit: instance,
        
        // Classes
        FrameKitUtils,
        FrameKitTheme,
        FrameKitAnimations,
        FrameKitComponents,
        
        // Shortcuts
        utils: instance.utils,
        theme: instance.theme,
        animations: instance.animations,
        components: FrameKitComponents,
        
        // Version
        version: instance.getVersion(),
        name: instance.getName()
    };
});

/**
 * Preconnect recommendation for faster loading
 * Add this to your HTML head:
 * 
 * <link rel="preconnect" href="path/to/framekit.a5.js" crossorigin>
 * <link rel="preconnect" href="path/to/framekit.a5.css" crossorigin>
 * 
 * Or use the FrameKit CDN (when available):
 * <link rel="preconnect" href="https://cdn.framekit.dev/a5/framekit.a5.js" crossorigin>
 */

/**
 * Usage example:
 * 
 * <!DOCTYPE html>
 * <html lang="en">
 * <head>
 *     <meta charset="UTF-8">
 *     <meta name="viewport" content="width=device-width, initial-scale=1.0">
 *     <title>FrameKit Example</title>
 *     
 *     <!-- Preconnect for faster loading -->
 *     <link rel="preconnect" href="framekit.a5.css" crossorigin>
 *     <link rel="preconnect" href="framekit.a5.js" crossorigin>
 *     
 *     <!-- FrameKit CSS -->
 *     <link rel="stylesheet" href="framekit.a5.css">
 * </head>
 * <body>
 *     <!-- Your content -->
 *     <button class="fk-btn fk-btn-primary">Click Me</button>
 *     
 *     <!-- FrameKit JS -->
 *     <script src="framekit.a5.js"></script>
 * </body>
 * </html>
 */
