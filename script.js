// ============= MOBILE MENU TOGGLE ============= 
const menuBtn = document.getElementById('menuBtn');
const navbar = document.querySelector('.navbar');
const menuIcon = menuBtn ? menuBtn.querySelector('i') : null;

menuBtn?.addEventListener('click', () => {
    navbar.classList.toggle('active');
    if (menuIcon) {
        if (navbar.classList.contains('active')) {
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-times');
        } else {
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        }
    }
});

// ============= NAVIGATION ACTIVE LINK ============= 
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove active class from all links
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        this.classList.add('active');
        
        // Close mobile menu if open
        if (navbar && navbar.classList.contains('active')) {
            navbar.classList.remove('active');
            if (menuIcon) {
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            }
        }
        
        // Scroll to section
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ============= SMOOTH SCROLL & ACTIVE NAV UPDATE ============= 
window.addEventListener('scroll', () => {
    let current = '';
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// ============= SKILL BARS ANIMATION ============= 
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillProgress = entry.target.querySelector('.skill-progress');
            if (skillProgress) {
                skillProgress.style.animation = 'fillBar 1.5s ease forwards';
            }
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-bar').forEach(bar => {
    observer.observe(bar);
});

// ============= STAGGERED ANIMATION ON SCROLL ============= 
const cards = document.querySelectorAll('.exp-card, .edu-card, .language-card, .contact-card, .skill-item');

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            cardObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease';
    cardObserver.observe(card);
});

// ============= PARALLAX EFFECT ============= 
window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    const homeSection = document.querySelector('.home');
    if (homeSection) {
        homeSection.style.backgroundPosition = `0 ${scrollY * 0.5}px`;
    }
});

// ============= TYPING ANIMATION FOR TITLE ============= 
const typewriter = () => {
    const title = document.querySelector('.title');
    if (!title) return;

    const text = title.textContent;
    title.textContent = '';
    let index = 0;

    const type = () => {
        if (index < text.length) {
            title.textContent += text.charAt(index);
            index++;
            setTimeout(type, 100);
        }
    };

    // Uncomment to enable typing effect
    // type();
};

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    // typewriter();
});

// ============= SCROLL TO TOP BUTTON ============= 
const createScrollTopBtn = () => {
    const btn = document.createElement('button');
    btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    btn.className = 'scroll-top-btn';
    btn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #0ef, #1e90ff);
        color: #0d1117;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        display: none;
        z-index: 999;
        transition: all 0.3s ease;
        box-shadow: 0 5px 20px rgba(15, 239, 255, 0.3);
    `;

    document.body.appendChild(btn);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            btn.style.display = 'flex';
            btn.style.alignItems = 'center';
            btn.style.justifyContent = 'center';
        } else {
            btn.style.display = 'none';
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    btn.addEventListener('mouseover', () => {
        btn.style.transform = 'translateY(-5px)';
        btn.style.boxShadow = '0 10px 30px rgba(15, 239, 255, 0.5)';
    });

    btn.addEventListener('mouseout', () => {
        btn.style.transform = 'translateY(0)';
        btn.style.boxShadow = '0 5px 20px rgba(15, 239, 255, 0.3)';
    });
};

createScrollTopBtn();

// ============= COUNTER ANIMATION ============= 
const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 30);
};

// ============= FORM VALIDATION (if needed in future) ============= 
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// ============= COPY TO CLIPBOARD ============= 
document.querySelectorAll('.contact-item a').forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.href.startsWith('mailto:') || this.href.startsWith('tel:')) {
            return;
        }
        e.preventDefault();
        const text = this.textContent;
        navigator.clipboard.writeText(text).then(() => {
            const originalText = this.textContent;
            this.textContent = 'Copied!';
            setTimeout(() => {
                this.textContent = originalText;
            }, 2000);
        });
    });
});

// ============= INITIALIZATION ============= 
document.addEventListener('DOMContentLoaded', () => {
    // Set home as active on page load
    document.querySelector('a[href="#home"]')?.classList.add('active');
    
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
});

// ============= PAGE VISIBILITY API (Resume if tab becomes visible) ============= 
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        document.title = 'Come back! 👋';
    } else {
        document.title = 'Muhammad Ejaz - Professional Portfolio';
    }
});

// ============= KEYBOARD NAVIGATION ============= 
document.addEventListener('keydown', (e) => {
    const navLinks = Array.from(document.querySelectorAll('.nav-link'));
    if (e.key === 'ArrowRight') {
        const activeIndex = navLinks.findIndex(link => link.classList.contains('active'));
        if (activeIndex < navLinks.length - 1) {
            navLinks[activeIndex + 1].click();
        }
    } else if (e.key === 'ArrowLeft') {
        const activeIndex = navLinks.findIndex(link => link.classList.contains('active'));
        if (activeIndex > 0) {
            navLinks[activeIndex - 1].click();
        }
    }
});

console.log('🎓 Muhammad Ejaz Portfolio loaded successfully!');
