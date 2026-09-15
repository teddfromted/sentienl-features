// Smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';

// Add interactive glow effect on mouse move
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.feature-card, .command-card');
    
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;
        
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        const distance = Math.sqrt(
            Math.pow(mouseX - cardCenterX, 2) + 
            Math.pow(mouseY - cardCenterY, 2)
        );
        
        const maxDistance = 300;
        
        if (distance < maxDistance) {
            const intensity = (1 - distance / maxDistance) * 0.3;
            card.style.boxShadow = `
                0 0 ${40 + intensity * 20}px rgba(255, 255, 255, ${0.1 + intensity}),
                inset 0 0 20px rgba(255, 255, 255, ${0.05 + intensity * 0.1})
            `;
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe feature and command cards
document.querySelectorAll('.feature-card, .command-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Button ripple effect
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        // Add ripple styles dynamically
        if (!document.querySelector('style[data-ripple]')) {
            const style = document.createElement('style');
            style.setAttribute('data-ripple', 'true');
            style.textContent = `
                .btn { position: relative; overflow: hidden; }
                .ripple {
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.5);
                    transform: scale(0);
                    animation: ripple-animation 0.6s ease-out;
                    pointer-events: none;
                }
                @keyframes ripple-animation {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        this.appendChild(ripple);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    if (scrolled < window.innerHeight) {
        hero.style.backgroundPosition = `center ${scrolled * 0.5}px`;
    }
});

console.log('Sentienl Features Page Loaded');
