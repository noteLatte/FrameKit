/**
 * FrameKit Liquid Glass v1.1.0
 * Apple-inspired Glassmorphism UI Framework
 * Pure JavaScript & CSS - No dependencies required
 * 
 * Usage: Add <script src="framekit.a5.js"></script> to your HTML
 * Recommended: Add <link rel="preconnect" href="path/to/framekit.a5.js"> for faster loading
 * 
 * GitHub: https://github.com/noteLatte/FrameKit
 */

;(function(global, factory) {
    'use strict';
    
    // Check if FrameKit is already loaded
    if (typeof global.FrameKit !== 'undefined' && global.FrameKit._initialized) {
        return;
    }
    
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
            // Prevent multiple instances
            if (FrameKit._instance) {
                return FrameKit._instance;
            }
            
            this.version = '1.1.0';
            this.name = 'FrameKit Liquid Glass';
            this._initialized = false;
            this.components = {};
            this.utils = new FrameKitUtils();
            this.animations = new FrameKitAnimations();
            this.theme = new FrameKitTheme();
            this._eventListeners = new Set();
            this._initializedElements = new Set();
            
            FrameKit._instance = this;
            this.init();
        }
        
        /**
         * Initialize FrameKit
         */
        init() {
            if (this._initialized) return;
            
            // Mark as initializing to prevent race conditions
            this._initialized = true;
            
            // Auto-initialize components on DOM ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.autoInit());
            } else {
                // Use setTimeout to ensure DOM is fully ready
                setTimeout(() => this.autoInit(), 0);
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
            // Only initialize once
            if (document.documentElement.hasAttribute('data-fk-autoinit')) return;
            document.documentElement.setAttribute('data-fk-autoinit', 'true');
            
            try {
                this.initComponents();
                this.initTheme();
                this.initAnimations();
            } catch (error) {
                console.error('FrameKit: Initialization error:', error);
            }
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
            const buttons = document.querySelectorAll('.fk-btn:not([data-fk-ripple-init])');
            
            buttons.forEach(button => {
                // Mark as initialized
                button.setAttribute('data-fk-ripple-init', 'true');
                
                button.addEventListener('click', (e) => {
                    this.createRipple(e, button);
                });
            });
        }
        
        /**
         * Create ripple effect on click
         */
        createRipple(event, element) {
            // Remove existing ripples first
            const existingRipples = element.querySelectorAll('.fk-ripple');
            existingRipples.forEach(ripple => ripple.remove());
            
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
            
            element.appendChild(ripple);
            
            // Remove ripple after animation
            const removeRipple = () => {
                ripple.remove();
            };
            
            ripple.addEventListener('animationend', removeRipple, { once: true });
            ripple.addEventListener('webkitAnimationEnd', removeRipple, { once: true });
            
            // Fallback: remove after 600ms if animation doesn't fire
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.remove();
                }
            }, 600);
        }
        
        /**
         * Initialize modals
         */
        initModals() {
            const modalTriggers = document.querySelectorAll('[data-fk-modal]:not([data-fk-modal-init])');
            
            modalTriggers.forEach(trigger => {
                // Mark as initialized
                trigger.setAttribute('data-fk-modal-init', 'true');
                
                const targetId = trigger.getAttribute('data-fk-modal');
                const modal = document.getElementById(targetId);
                const overlay = modal?.parentElement;
                
                if (modal && overlay?.classList.contains('fk-modal-overlay')) {
                    // Store reference to overlay on trigger
                    trigger._fkOverlay = overlay;
                    
                    trigger.addEventListener('click', (e) => {
                        e.preventDefault();
                        this.openModal(overlay);
                    });
                    
                    // Close modal on overlay click
                    const closeOnOverlayClick = (e) => {
                        if (e.target === overlay) {
                            this.closeModal(overlay);
                        }
                    };
                    overlay.addEventListener('click', closeOnOverlayClick);
                    
                    // Store for cleanup
                    this._eventListeners.add({ element: overlay, type: 'click', handler: closeOnOverlayClick });
                    
                    // Close modal button
                    const closeBtn = modal.querySelector('.fk-modal-close');
                    if (closeBtn) {
                        const closeHandler = () => this.closeModal(overlay);
                        closeBtn.addEventListener('click', closeHandler);
                        this._eventListeners.add({ element: closeBtn, type: 'click', handler: closeHandler });
                    }
                }
            });
            
            // Global escape key handler (only one)
            if (!this._escapeHandlerAdded) {
                this._escapeHandlerAdded = true;
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape') {
                        const activeModals = document.querySelectorAll('.fk-modal-overlay.active');
                        activeModals.forEach(overlay => {
                            this.closeModal(overlay);
                        });
                    }
                });
            }
        }
        
        /**
         * Open modal
         */
        openModal(overlay) {
            // Close all other modals first
            const allModals = document.querySelectorAll('.fk-modal-overlay.active');
            allModals.forEach(otherOverlay => {
                if (otherOverlay !== overlay) {
                    this.closeModal(otherOverlay);
                }
            });
            
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            const modal = overlay.querySelector('.fk-modal');
            if (modal) {
                this.animations.animateIn(modal, 'scale-in');
            }
            
            // Focus first focusable element in modal
            const focusableElements = modal?.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])') || [];
            if (focusableElements.length > 0) {
                focusableElements[0].focus();
            }
        }
        
        /**
         * Close modal
         */
        closeModal(overlay) {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
            
            // Return focus to trigger if available
            const trigger = document.querySelector(`[data-fk-modal="${overlay.querySelector('.fk-modal')?.id || overlay.id}"]`);
            if (trigger) {
                trigger.focus();
            }
        }
        
        /**
         * Initialize navbar
         */
        initNavbar() {
            // Mobile menu toggle (if hamburger menu exists)
            const menuToggle = document.querySelector('.fk-navbar-toggle:not([data-fk-navbar-init])');
            const menu = document.querySelector('.fk-navbar-menu');
            
            if (menuToggle && menu) {
                menuToggle.setAttribute('data-fk-navbar-init', 'true');
                
                const toggleHandler = () => {
                    menu.classList.toggle('active');
                    menuToggle.classList.toggle('active');
                };
                menuToggle.addEventListener('click', toggleHandler);
                this._eventListeners.add({ element: menuToggle, type: 'click', handler: toggleHandler });
            }
            
            // Navbar scroll effect
            const navbar = document.querySelector('.fk-navbar:not([data-fk-navbar-scroll-init])');
            if (navbar) {
                navbar.setAttribute('data-fk-navbar-scroll-init', 'true');
                
                let lastScroll = 0;
                
                const scrollHandler = this.utils.throttle(() => {
                    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
                    
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
                }, 16);
                
                window.addEventListener('scroll', scrollHandler, { passive: true });
                this._eventListeners.add({ element: window, type: 'scroll', handler: scrollHandler });
            }
        }
        
        /**
         * Initialize cards with hover effects
         */
        initCards() {
            const cards = document.querySelectorAll('.fk-card:not([data-fk-card-init])');
            
            cards.forEach(card => {
                card.setAttribute('data-fk-card-init', 'true');
                
                // Add liquid effect on hover
                const mouseenterHandler = () => {
                    card.style.setProperty('--fk-reflect-opacity', '0.5');
                };
                const mouseleaveHandler = () => {
                    card.style.setProperty('--fk-reflect-opacity', '0.3');
                };
                
                card.addEventListener('mouseenter', mouseenterHandler, { passive: true });
                card.addEventListener('mouseleave', mouseleaveHandler, { passive: true });
                
                this._eventListeners.add({ element: card, type: 'mouseenter', handler: mouseenterHandler });
                this._eventListeners.add({ element: card, type: 'mouseleave', handler: mouseleaveHandler });
            });
        }
        
        /**
         * Initialize theme system
         */
        initTheme() {
            // Only initialize once
            if (document.documentElement.hasAttribute('data-fk-theme-init')) return;
            document.documentElement.setAttribute('data-fk-theme-init', 'true');
            
            try {
                // Check for saved theme preference
                const savedTheme = this.utils.safeLocalStorageGet('framekit-theme');
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
                const themeChangeHandler = (e) => {
                    if (!this.utils.safeLocalStorageGet('framekit-theme')) {
                        this.theme.setTheme(e.matches ? 'dark' : 'light');
                    }
                };
                
                window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', themeChangeHandler);
                this._eventListeners.add({ element: window, type: 'themechange', handler: themeChangeHandler });
                
            } catch (error) {
                console.warn('FrameKit: Theme initialization error:', error);
            }
        }
        
        /**
         * Initialize animations
         */
        initAnimations() {
            // Only initialize once
            if (document.documentElement.hasAttribute('data-fk-anim-init')) return;
            document.documentElement.setAttribute('data-fk-anim-init', 'true');
            
            try {
                this.animations.initScrollAnimations();
            } catch (error) {
                console.warn('FrameKit: Animation initialization error:', error);
            }
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
        
        /**
         * Cleanup all event listeners
         */
        destroy() {
            this._eventListeners.forEach(({ element, type, handler }) => {
                element.removeEventListener(type, handler);
            });
            this._eventListeners.clear();
            this._initializedElements.clear();
            this._initialized = false;
        }
    }
    
    /**
     * FrameKit Utilities
     * Helper functions and utilities
     */
    class FrameKitUtils {
        constructor() {}
        
        /**
         * Safely get from localStorage
         */
        safeLocalStorageGet(key) {
            try {
                return localStorage.getItem(key);
            } catch (error) {
                // localStorage not available (e.g., private browsing)
                console.warn('FrameKit: localStorage not available:', error);
                return null;
            }
        }
        
        /**
         * Safely set to localStorage
         */
        safeLocalStorageSet(key, value) {
            try {
                localStorage.setItem(key, value);
                return true;
            } catch (error) {
                console.warn('FrameKit: localStorage not available:', error);
                return false;
            }
        }
        
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
            let inThrottle = false;
            let lastArgs = null;
            
            const execute = () => {
                if (lastArgs !== null) {
                    func(...lastArgs);
                    lastArgs = null;
                }
                inThrottle = false;
            };
            
            return function(...args) {
                lastArgs = args;
                if (!inThrottle) {
                    func(...args);
                    inThrottle = true;
                    setTimeout(execute, limit);
                }
            };
        }
        
        /**
         * Check if element is in viewport
         */
        isInViewport(element) {
            if (!element || !element.getBoundingClientRect) return false;
            
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
            if (text === null || text === undefined) return '';
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }
        
        /**
         * Parse query string
         */
        parseQuery(query) {
            if (!query) return {};
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
            if (!date) return '';
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
        
        /**
         * Get CSS variable value
         */
        getCSSVar(variableName, element = document.documentElement) {
            return getComputedStyle(element).getPropertyValue(variableName).trim();
        }
        
        /**
         * Set CSS variable value
         */
        setCSSVar(variableName, value, element = document.documentElement) {
            element.style.setProperty(variableName, value);
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
            
            // Try to save to localStorage
            if (typeof localStorage !== 'undefined') {
                try {
                    localStorage.setItem('framekit-theme', theme);
                } catch (error) {
                    // Ignore localStorage errors
                }
            }
            
            this.currentTheme = theme;
            
            // Dispatch custom event
            try {
                const event = new CustomEvent('framekit:theme-change', {
                    detail: { theme }
                });
                document.dispatchEvent(event);
            } catch (error) {
                // CustomEvent might not be available in older browsers
                console.warn('FrameKit: CustomEvent not available');
            }
            
            return theme;
        }
        
        /**
         * Toggle theme between light and dark
         */
        toggle() {
            const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
            return this.setTheme(newTheme);
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
        
        /**
         * Refresh theme (useful after DOM changes)
         */
        refresh() {
            this.currentTheme = this.getCurrentTheme();
        }
    }
    
    /**
     * FrameKit Animations
     * Animation utilities and scroll animations
     */
    class FrameKitAnimations {
        constructor() {
            this.animatedElements = new Set();
            this.observers = new Set();
        }
        
        /**
         * Initialize scroll animations with Intersection Observer
         */
        initScrollAnimations() {
            const animatedElements = document.querySelectorAll(
                '.fk-fade-in, .fk-slide-up, .fk-slide-down, .fk-scale-in, .fk-float, .fk-pulse, [data-fk-animation]'
            );
            
            if (animatedElements.length === 0) return;
            
            // Create observer only if not already created
            if (this.observers.size > 0) return;
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const el = entry.target;
                        
                        // Skip if already animated
                        if (this.animatedElements.has(el)) return;
                        
                        // Get animation type
                        const animationType = el.getAttribute('data-fk-animation') || 
                            Array.from(el.classList).find(cls => 
                                cls.startsWith('fk-') && 
                                !cls.includes('fk-ripple') && 
                                !cls.includes('fk-glass') &&
                                !cls.includes('fk-card') &&
                                !cls.includes('fk-btn') &&
                                !cls.includes('fk-input') &&
                                !cls.includes('fk-navbar') &&
                                !cls.includes('fk-modal')
                            );
                        
                        if (animationType) {
                            this.animateIn(el, animationType);
                        }
                        
                        this.animatedElements.add(el);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            this.observers.add(observer);
            
            animatedElements.forEach(el => {
                // Mark element as being observed
                el.setAttribute('data-fk-observed', 'true');
                observer.observe(el);
            });
        }
        
        /**
         * Animate element in
         */
        animateIn(element, animationType) {
            if (!element || this.animatedElements.has(element)) return;
            
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
                'fk-scale-in', 'fk-float', 'fk-pulse', 'fk-fade-out',
                'fk-slide-out', 'fk-scale-out'
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
            if (!element) return;
            
            const animationClasses = {
                'fade-out': 'fk-fade-out',
                'slide-out': 'fk-slide-out',
                'scale-out': 'fk-scale-out'
            };
            
            const className = animationClasses[animationType] || animationType;
            
            element.classList.remove(
                'fk-fade-in', 'fk-slide-up', 'fk-slide-down', 
                'fk-scale-in', 'fk-float', 'fk-pulse'
            );
            
            element.classList.add(className);
            
            // Remove after animation
            const removeAnimation = () => {
                element.classList.remove(className);
            };
            
            element.addEventListener('animationend', removeAnimation, { once: true });
            element.addEventListener('webkitAnimationEnd', removeAnimation, { once: true });
        }
        
        /**
         * Create custom animation
         */
        createAnimation(element, keyframes, options = {}) {
            if (!element) return null;
            
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
            if (!element) return null;
            
            const handleScroll = this.utils.throttle(() => {
                const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
                const offset = scrollPosition * speed;
                element.style.transform = `translateY(${offset}px)`;
            }, 16);
            
            window.addEventListener('scroll', handleScroll, { passive: true });
            
            // Return cleanup function
            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }
        
        /**
         * Cleanup observers
         */
        cleanup() {
            this.observers.forEach(observer => {
                observer.disconnect();
            });
            this.observers.clear();
            this.animatedElements.clear();
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
            if (options.className) button.classList.add(...options.className.split(' ').filter(Boolean));
            if (options.disabled) button.disabled = true;
            if (options.onClick) button.addEventListener('click', options.onClick);
            
            // Mark as FrameKit component
            button.setAttribute('data-fk-component', 'button');
            
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
            
            // Mark as FrameKit component
            card.setAttribute('data-fk-component', 'card');
            
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
                closeBtn.setAttribute('aria-label', 'Close modal');
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
            
            // Mark as FrameKit component
            overlay.setAttribute('data-fk-component', 'modal-overlay');
            modal.setAttribute('data-fk-component', 'modal');
            
            // Add to DOM
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
            
            // Mark as FrameKit component
            navbar.setAttribute('data-fk-component', 'navbar');
            
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
            if (options.autocomplete) input.autocomplete = options.autocomplete;
            if (options.pattern) input.pattern = options.pattern;
            
            // Mark as FrameKit component
            input.setAttribute('data-fk-component', 'input');
            
            return input;
        }
        
        static createGlassElement(options = {}) {
            const element = document.createElement(options.tag || 'div');
            element.className = `fk-glass ${options.className || ''}`;
            
            if (options.content) {
                element.innerHTML = options.content;
            }
            
            if (options.id) element.id = options.id;
            if (options.variant) {
                element.classList.add(`fk-glass-${options.variant}`);
            }
            
            // Mark as FrameKit component
            element.setAttribute('data-fk-component', 'glass');
            
            return element;
        }
        
        static createLiquidElement(options = {}) {
            const element = document.createElement(options.tag || 'div');
            element.className = `fk-glass fk-liquid ${options.className || ''}`;
            
            if (options.content) {
                element.innerHTML = options.content;
            }
            
            if (options.id) element.id = options.id;
            
            // Mark as FrameKit component
            element.setAttribute('data-fk-component', 'liquid');
            
            return element;
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
 * 
 * Add this to your HTML head for optimal performance:
 * 
 * <link rel="preconnect" href="framekit.a5.css" crossorigin>
 * <link rel="preconnect" href="framekit.a5.js" crossorigin>
 * 
 * Or use absolute paths:
 * <link rel="preconnect" href="/path/to/framekit.a5.css" crossorigin>
 * <link rel="preconnect" href="/path/to/framekit.a5.js" crossorigin>
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
