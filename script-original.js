// Cookie Consent Management - Enhanced for Accessibility and Mobile
document.addEventListener('DOMContentLoaded', function() {
    const cookieBannerEn = document.getElementById('cookieConsentBanner-en');
    const cookieBannerFr = document.getElementById('cookieConsentBanner-fr');
    const cookieModalEn = document.getElementById('cookieSettingsModal-en');
    const cookieModalFr = document.getElementById('cookieSettingsModal-fr');
    
    // English elements
    const acceptAllBtnEn = document.getElementById('cookieAcceptAll-en');
    const declineBtnEn = document.getElementById('cookieDecline-en');
    const settingsBtnEn = document.getElementById('cookieSettings-en');
    const closeModalBtnEn = document.getElementById('closeCookieModal-en');
    const savePreferencesBtnEn = document.getElementById('saveCookiePreferences-en');
    const acceptAllModalBtnEn = document.getElementById('acceptAllCookies-en');
    
    // French elements
    const acceptAllBtnFr = document.getElementById('cookieAcceptAll-fr');
    const declineBtnFr = document.getElementById('cookieDecline-fr');
    const settingsBtnFr = document.getElementById('cookieSettings-fr');
    const closeModalBtnFr = document.getElementById('closeCookieModal-fr');
    const savePreferencesBtnFr = document.getElementById('saveCookiePreferences-fr');
    const acceptAllModalBtnFr = document.getElementById('acceptAllCookies-fr');

    // Check if user has already made a choice
    function checkCookieConsent() {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            // Show banner after a small delay for better UX and accessibility
            setTimeout(() => {
                const currentLang = getCurrentLanguage();
                const activeBanner = currentLang === 'en' ? cookieBannerEn : cookieBannerFr;
                if (activeBanner) {
                    activeBanner.style.display = 'block';
                    // Announce to screen readers
                    activeBanner.setAttribute('aria-live', 'polite');
                    activeBanner.focus();
                }
            }, 1000);
        } else {
            loadCookiePreferences();
        }
    }

    // Get current language
    function getCurrentLanguage() {
        return document.documentElement.lang.includes('fr') ? 'fr' : 'en';
    }

    // Save cookie preferences
    function saveCookieConsent(preferences) {
        localStorage.setItem('cookieConsent', JSON.stringify(preferences));
        localStorage.setItem('cookieConsentDate', new Date().toISOString());
        hideCookieBanner();
        loadCookiePreferences();
    }

    // Load and apply cookie preferences
    function loadCookiePreferences() {
        const consent = localStorage.getItem('cookieConsent');
        if (consent) {
            const preferences = JSON.parse(consent);
            
            // Apply preferences
            if (preferences.analytics) {
                loadGoogleAnalytics();
            }
            if (preferences.marketing) {
                loadMarketingCookies();
            }
        }
    }

    // Hide cookie banner
    function hideCookieBanner() {
        if (cookieBannerEn) cookieBannerEn.style.display = 'none';
        if (cookieBannerFr) cookieBannerFr.style.display = 'none';
    }

    // Show cookie settings modal
    function showCookieModal() {
        const currentLang = getCurrentLanguage();
        const activeModal = currentLang === 'en' ? cookieModalEn : cookieModalFr;
        if (activeModal) {
            activeModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
            // Load current preferences
            const consent = localStorage.getItem('cookieConsent');
            if (consent) {
                const preferences = JSON.parse(consent);
                const suffix = currentLang === 'en' ? '-en' : '-fr';
                const analyticsCheckbox = document.getElementById('analytics-cookies' + suffix);
                const marketingCheckbox = document.getElementById('marketing-cookies' + suffix);
                if (analyticsCheckbox) analyticsCheckbox.checked = preferences.analytics || false;
                if (marketingCheckbox) marketingCheckbox.checked = preferences.marketing || false;
            }
        }
    }

    // Hide cookie settings modal
    function hideCookieModal() {
        if (cookieModalEn) cookieModalEn.style.display = 'none';
        if (cookieModalFr) cookieModalFr.style.display = 'none';
        document.body.style.overflow = '';
    }

    // English Event Listeners
    if (acceptAllBtnEn) {
        acceptAllBtnEn.addEventListener('click', function() {
            saveCookieConsent({
                essential: true,
                analytics: true,
                marketing: true
            });
        });
    }

    if (declineBtnEn) {
        declineBtnEn.addEventListener('click', function() {
            saveCookieConsent({
                essential: true,
                analytics: false,
                marketing: false
            });
        });
    }

    if (settingsBtnEn) settingsBtnEn.addEventListener('click', showCookieModal);
    if (closeModalBtnEn) closeModalBtnEn.addEventListener('click', hideCookieModal);

    // French Event Listeners
    if (acceptAllBtnFr) {
        acceptAllBtnFr.addEventListener('click', function() {
            saveCookieConsent({
                essential: true,
                analytics: true,
                marketing: true
            });
        });
    }

    if (declineBtnFr) {
        declineBtnFr.addEventListener('click', function() {
            saveCookieConsent({
                essential: true,
                analytics: false,
                marketing: false
            });
        });
    }

    if (settingsBtnFr) settingsBtnFr.addEventListener('click', showCookieModal);
    if (closeModalBtnFr) closeModalBtnFr.addEventListener('click', hideCookieModal);

    // Save custom preferences - both languages
    if (savePreferencesBtnEn) {
        savePreferencesBtnEn.addEventListener('click', function() {
            const analyticsChecked = document.getElementById('analytics-cookies-en').checked;
            const marketingChecked = document.getElementById('marketing-cookies-en').checked;
            
            saveCookieConsent({
                essential: true,
                analytics: analyticsChecked,
                marketing: marketingChecked
            });
            hideCookieModal();
        });
    }

    if (savePreferencesBtnFr) {
        savePreferencesBtnFr.addEventListener('click', function() {
            const analyticsChecked = document.getElementById('analytics-cookies-fr').checked;
            const marketingChecked = document.getElementById('marketing-cookies-fr').checked;
            
            saveCookieConsent({
                essential: true,
                analytics: analyticsChecked,
                marketing: marketingChecked
            });
            hideCookieModal();
        });
    }

    // Accept all from modal - both languages
    if (acceptAllModalBtnEn) {
        acceptAllModalBtnEn.addEventListener('click', function() {
            document.getElementById('analytics-cookies-en').checked = true;
            document.getElementById('marketing-cookies-en').checked = true;
            
            saveCookieConsent({
                essential: true,
                analytics: true,
                marketing: true
            });
            hideCookieModal();
        });
    }

    if (acceptAllModalBtnFr) {
        acceptAllModalBtnFr.addEventListener('click', function() {
            document.getElementById('analytics-cookies-fr').checked = true;
            document.getElementById('marketing-cookies-fr').checked = true;
            
            saveCookieConsent({
                essential: true,
                analytics: true,
                marketing: true
            });
            hideCookieModal();
        });
    }

    // Close modal when clicking outside - both languages
    if (cookieModalEn) {
        cookieModalEn.addEventListener('click', function(e) {
            if (e.target === cookieModalEn) {
                hideCookieModal();
            }
        });
    }

    if (cookieModalFr) {
        cookieModalFr.addEventListener('click', function(e) {
            if (e.target === cookieModalFr) {
                hideCookieModal();
            }
        });
    }

    // Escape key to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && (
            (cookieModalEn && cookieModalEn.style.display === 'flex') ||
            (cookieModalFr && cookieModalFr.style.display === 'flex')
        )) {
            hideCookieModal();
        }
    });

    // Functions to load tracking scripts (you'll customize these)
    function loadGoogleAnalytics() {
        // Add your Google Analytics code here
        console.log('Google Analytics loaded');
        
        // Example Google Analytics 4 implementation:
        /*
        window.gtag = window.gtag || function() {
            (gtag.q = gtag.q || []).push(arguments);
        };
        gtag('js', new Date());
        gtag('config', 'GA_MEASUREMENT_ID');
        
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
        document.head.appendChild(script);
        */
    }

    function loadMarketingCookies() {
        // Add your marketing tracking code here
        console.log('Marketing cookies loaded');
        
        // Example for Google Tag Manager:
        /*
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-XXXXXXX');
        */
    }

    // Initialize cookie consent check
    checkCookieConsent();
    
    // Initialize language preference
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage && window.setLanguage) {
        window.setLanguage(savedLanguage);
    } else if (navigator.language.includes('fr') && window.setLanguage) {
        window.setLanguage('fr');
    } else if (window.setLanguage) {
        window.setLanguage('en');
    }
    
    // Uncomment for testing: Reset cookie consent function
    // window.resetCookieConsent = function() {
    //     localStorage.removeItem('cookieConsent');
    //     localStorage.removeItem('cookieConsentDate');
    //     console.log('Cookie consent reset - reload page to see banner');
    //     location.reload();
    // };
});

// Smooth scrolling for navigation links and service pills
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"], .service-pill[data-service]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            let targetId;
            if (this.hasAttribute('data-service')) {
                targetId = '#services';
            } else {
                targetId = this.getAttribute('href');
            }
            
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // If it's a service pill, highlight the corresponding service
                if (this.hasAttribute('data-service')) {
                    const serviceType = this.getAttribute('data-service');
                    highlightService(serviceType);
                }
            }
        });
    });
});

// Horizontal scrolling for services bar
document.addEventListener('DOMContentLoaded', function() {
    const scrollContainer = document.getElementById('servicesScrollContainer');
    
    if (scrollContainer) {
        // Touch scrolling for mobile
        let isDown = false;
        let startX;
        let scrollLeft;
        
        scrollContainer.addEventListener('mousedown', (e) => {
            isDown = true;
            scrollContainer.style.cursor = 'grabbing';
            startX = e.pageX - scrollContainer.offsetLeft;
            scrollLeft = scrollContainer.scrollLeft;
        });
        
        scrollContainer.addEventListener('mouseleave', () => {
            isDown = false;
            scrollContainer.style.cursor = 'grab';
        });
        
        scrollContainer.addEventListener('mouseup', () => {
            isDown = false;
            scrollContainer.style.cursor = 'grab';
        });
        
        scrollContainer.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - scrollContainer.offsetLeft;
            const walk = (x - startX) * 2;
            scrollContainer.scrollLeft = scrollLeft - walk;
        });
        
        // Set initial cursor
        scrollContainer.style.cursor = 'grab';
        
        // Auto-scroll hint animation
        setTimeout(() => {
            if (scrollContainer.scrollWidth > scrollContainer.clientWidth) {
                scrollContainer.scrollLeft = 50;
                setTimeout(() => {
                    scrollContainer.scrollLeft = 0;
                }, 800);
            }
        }, 2000);
    }
});

// Service highlighting function
function highlightService(serviceType) {
    // Remove active class from all service pills
    document.querySelectorAll('.service-pill').forEach(pill => {
        pill.classList.remove('active');
    });
    
    // Add active class to clicked pill
    const activePill = document.querySelector(`[data-service="${serviceType}"]`);
    if (activePill) {
        activePill.classList.add('active');
    }
    
    // Highlight corresponding service card
    setTimeout(() => {
        const serviceCard = document.querySelector(`[data-service="${serviceType}"].service-card`);
        if (serviceCard) {
            serviceCard.style.transform = 'scale(1.05)';
            serviceCard.style.borderColor = '#ffd700';
            serviceCard.style.boxShadow = '0 15px 30px rgba(255, 215, 0, 0.3)';
            
            setTimeout(() => {
                serviceCard.style.transform = '';
                serviceCard.style.borderColor = '';
                serviceCard.style.boxShadow = '';
            }, 2000);
        }
    }, 500);
}

// Scroll to section function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Service details modal/popup (simplified version)
function showServiceDetails(serviceType) {
    const serviceDetails = {
        'emergency': {
            title: 'Emergency Flood Control',
            description: 'Immediate help for flooded basements or severe water leaks. Our local experts arrive fast, remove water, and prevent further damage—24/7, every day of the year.',
            features: ['24/7 Emergency Response', 'Water Extraction', 'Damage Prevention', 'Insurance Documentation'],
            price: 'Starting at $150'
        },
        'drain-cleaning': {
            title: 'Professional Drain Cleaning',
            description: 'Blocked or slow drains? We unclog kitchen, bathroom, and main lines quickly—no chemicals, just fast, lasting results.',
            features: ['Chemical-free cleaning', 'Main line service', 'Satisfaction guarantee', 'Same-day service'],
            price: 'Starting at $125'
        },
        'pipe-repair': {
            title: 'Pipe Repair & Unblocking',
            description: 'Broken, leaking, or clogged pipes? We fix and unblock all types—interior or exterior. Expert service, honest pricing, and full warranty.',
            features: ['Interior & exterior repair', 'All pipe materials', 'Full warranty', 'Licensed technicians'],
            price: 'Starting at $200'
        },
        'sewer-obstruction': {
            title: 'Sewer Obstruction Removal',
            description: 'Tree roots, grease, or unknown blockages in your main sewer? We diagnose and clear tough obstructions.',
            features: ['Root removal', 'Grease clearing', 'Diagnostic inspection', 'Prevention advice'],
            price: 'Starting at $250'
        },
        'camera-inspection': {
            title: 'HD Camera Inspection',
            description: 'See inside your pipes. Our HD camera inspections pinpoint hidden problems—like cracks, roots, or misalignments.',
            features: ['HD video recording', 'Problem identification', 'Written report', 'Before/after documentation'],
            price: 'Starting at $175'
        },
        'backwater-valves': {
            title: 'Backwater Valve Installation',
            description: 'Protect your basement from sewer backups. Montreal by-law compliant installations with proper venting.',
            features: ['Montreal by-law compliant', 'Professional installation', 'Proper venting', 'Maintenance accessible'],
            price: 'Starting at $800'
        }
    };
    
    const service = serviceDetails[serviceType];
    if (service) {
        alert(`${service.title}\n\n${service.description}\n\nKey Features:\n• ${service.features.join('\n• ')}\n\n${service.price}\n\nCall 514-829-7514 for immediate service!`);
    }
}

// Form submission handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('quoteForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const phone = formData.get('phone');
            const email = formData.get('email');
            const service = formData.get('service');
            const urgency = formData.get('urgency');
            const message = formData.get('message');
            
            // Simple validation
            if (name && phone && email && service && urgency) {
                // Show success message
                alert(`Thank you, ${name}! Your request has been received.\n\nService: ${service}\nUrgency: ${urgency}\n\nWe'll contact you at ${phone} within 30 minutes!\n\nFor immediate emergencies, call 514-829-7514 now.`);
                
                // Reset form
                this.reset();
                
                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                alert('Please fill in all required fields.');
            }
        });
    }
});

// Enhanced scroll animations and interactions
document.addEventListener('DOMContentLoaded', function() {
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observe service cards, review cards, and stats
    const animatedElements = document.querySelectorAll('.service-card, .review-card, .stat, .about-feature');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
});

// Phone number click tracking and formatting
document.addEventListener('DOMContentLoaded', function() {
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Track phone clicks (you could send to analytics here)
            console.log('Phone number clicked:', this.href);
        });
    });
});

// Emergency button animations - Enhanced for mobile
document.addEventListener('DOMContentLoaded', function() {
    const emergencyButtons = document.querySelectorAll('.btn-primary, .phone-header');
    emergencyButtons.forEach(button => {
        // Use touchstart for better mobile responsiveness
        button.addEventListener('touchstart', function() {
            this.style.animation = 'pulse 0.5s';
        });
        
        button.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 0.5s';
        });
        
        button.addEventListener('animationend', function() {
            this.style.animation = '';
        });
        
        // Ensure proper focus handling
        button.addEventListener('focus', function() {
            this.style.animation = 'pulse 0.5s';
        });
    });
});

// Performance optimization: Throttle scroll events
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
    }
}

// Sticky header background change on scroll - Throttled for performance
const updateHeader = throttle(function() {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.webkitBackdropFilter = 'blur(10px)'; // Safari support
        } else {
            header.style.background = '#fff';
            header.style.backdropFilter = 'none';
            header.style.webkitBackdropFilter = 'none';
        }
    }
}, 16); // ~60fps

window.addEventListener('scroll', updateHeader, { passive: true });

// Add pulse animation styles dynamically for compatibility
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// Add current year to footer dynamically
document.addEventListener('DOMContentLoaded', function() {
    const footer = document.querySelector('footer');
    if (footer) {
        const yearElements = footer.querySelectorAll('*');
        yearElements.forEach(element => {
            if (element.textContent.includes('2025')) {
                element.innerHTML = element.innerHTML.replace('2025', new Date().getFullYear());
            }
        });
    }
});

// Service pills scroll into view on mobile - Enhanced with error handling
document.addEventListener('DOMContentLoaded', function() {
    const servicePills = document.querySelectorAll('.service-pill');
    servicePills.forEach(pill => {
        pill.addEventListener('click', function(e) {
            try {
                // On mobile, scroll the clicked pill into center view
                if (window.innerWidth <= 768) {
                    this.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest',
                        inline: 'center'
                    });
                }
                
                // Add active state for better feedback
                servicePills.forEach(p => p.classList.remove('active'));
                this.classList.add('active');
                
                // Announce to screen readers
                const announcement = document.createElement('div');
                announcement.setAttribute('aria-live', 'polite');
                announcement.setAttribute('aria-atomic', 'true');
                announcement.className = 'visually-hidden';
                announcement.textContent = `Selected service: ${this.textContent.trim()}`;
                document.body.appendChild(announcement);
                
                // Remove announcement after screen reader processes it
                setTimeout(() => {
                    if (announcement.parentNode) {
                        announcement.parentNode.removeChild(announcement);
                    }
                }, 1000);
                
            } catch (error) {
                console.error('Error handling service pill click:', error);
            }
        });
        
        // Add keyboard support
        pill.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
});

// Enhanced form validation and accessibility
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            // Add live validation feedback
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });
        
        // Enhanced form submission
        form.addEventListener('submit', function(e) {
            let isValid = true;
            inputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                const firstError = form.querySelector('.error');
                if (firstError) {
                    firstError.focus();
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    });
});

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Remove existing error state
    field.classList.remove('error');
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = `${field.getAttribute('aria-label') || field.name || 'This field'} is required.`;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address.';
        }
    }
    
    // Phone validation (Canadian format)
    if (field.type === 'tel' && value) {
        const phonePattern = /^[\+]?[1]?[\s]?[\(]?[0-9]{3}[\)]?[\s\-]?[0-9]{3}[\s\-]?[0-9]{4}$/;
        if (!phonePattern.test(value.replace(/\D/g, ''))) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number (e.g., 514-829-7514).';
        }
    }
    
    if (!isValid) {
        field.classList.add('error');
        field.setAttribute('aria-invalid', 'true');
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.setAttribute('role', 'alert');
        errorDiv.textContent = errorMessage;
        field.parentNode.insertBefore(errorDiv, field.nextSibling);
    } else {
        field.setAttribute('aria-invalid', 'false');
    }
    
    return isValid;
}
