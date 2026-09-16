        // ===========================
        // PARTICLE ANIMATION
        // ===========================
        const canvas = document.getElementById('particles-canvas');
        const ctx = canvas.getContext('2d');
        let particles = [];
        let mouse = { x: null, y: null, radius: 120 };

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        window.addEventListener('mousemove', e => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });
        window.addEventListener('mouseout', () => {
            mouse.x = null;
            mouse.y = null;
        });

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.4;
                this.speedY = (Math.random() - 0.5) * 0.4;
                this.opacity = Math.random() * 0.4 + 0.1;
                // Randomly choose indigo or amber
                this.color = Math.random() > 0.7
                    ? `rgba(246, 36, 64, ${this.opacity})`
                    : `rgba(232, 134, 43, ${this.opacity * 0.6})`;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (mouse.x !== null && mouse.y !== null) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < mouse.radius) {
                        const force = (mouse.radius - dist) / mouse.radius;
                        this.x -= (dx / dist) * force * 1.5;
                        this.y -= (dy / dist) * force * 1.5;
                    }
                }

                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        }

        function initParticles() {
            particles = [];
            const count = Math.min(Math.floor((canvas.width * canvas.height) / 12000), 120);
            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        }
        initParticles();
        window.addEventListener('resize', initParticles);

        function connectParticles() {
            for (let a = 0; a < particles.length; a++) {
                for (let b = a + 1; b < particles.length; b++) {
                    const dx = particles[a].x - particles[b].x;
                    const dy = particles[a].y - particles[b].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 130) {
                        ctx.strokeStyle = `rgba(246, 36, 64, ${0.06 * (1 - dist / 130)})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            connectParticles();
            requestAnimationFrame(animateParticles);
        }
        animateParticles();

        // ===========================
        // NAVBAR SCROLL EFFECT
        // ===========================
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        });

        // ===========================
        // MOBILE NAV TOGGLE
        // ===========================
        function toggleNav() {
            document.getElementById('navLinks').classList.toggle('open');
            document.getElementById('navToggle').classList.toggle('active');
        }
        function closeNav() {
            document.getElementById('navLinks').classList.remove('open');
            document.getElementById('navToggle').classList.remove('active');
        }

        // ===========================
        // CERTIFICATE FLIP CARD
        // ===========================
        function flipCard(id) {
            document.getElementById(id).classList.toggle('flipped');
        }

        // ===========================
        // ACTIVE NAV LINK HIGHLIGHT
        // ===========================
        const sections = document.querySelectorAll('.section[id]');
        const navAnchors = document.querySelectorAll('.nav-links a:not(.nav-cta)');

        function highlightNav() {
            const scrollY = window.scrollY + 100;
            sections.forEach(section => {
                const top = section.offsetTop;
                const height = section.offsetHeight;
                const id = section.getAttribute('id');
                const link = document.querySelector(`.nav-links a[href="#${id}"]`);
                if (link) {
                    if (scrollY >= top && scrollY < top + height) {
                        navAnchors.forEach(a => a.classList.remove('active'));
                        link.classList.add('active');
                    }
                }
            });
        }
        window.addEventListener('scroll', highlightNav);

        // ===========================
        // SCROLL REVEAL
        // ===========================
        const revealElements = document.querySelectorAll('.reveal');
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        revealElements.forEach(el => revealObserver.observe(el));

        // ===========================
        // COUNTER ANIMATION
        // ===========================
        const statNumbers = document.querySelectorAll('.stat-number[data-count]');
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.getAttribute('data-count'));
                    let current = 0;
                    const step = Math.ceil(target / 40);
                    const timer = setInterval(() => {
                        current += step;
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }
                        el.textContent = current + '+';
                    }, 40);
                    counterObserver.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(el => counterObserver.observe(el));

        // ===========================
        // CONTACT FORM
        // ===========================
        document.getElementById('contactForm').addEventListener('submit', function (e) {
            e.preventDefault();
            const btn = document.getElementById('submitBtn');
            btn.textContent = '✓ Message Sent!';
            btn.style.background = 'linear-gradient(135deg, #22C55E, #16A34A)';
            btn.style.boxShadow = '0 0 30px rgba(34, 197, 94, 0.3)';
            setTimeout(() => {
                btn.textContent = 'Send Message →';
                btn.style.background = '';
                btn.style.boxShadow = '';
                this.reset();
            }, 3000);
        });

        // ===========================
        // TILT EFFECT ON PROJECT CARD
        // ===========================
document.querySelectorAll(".project-card").forEach(projectCard => {

    projectCard.addEventListener("mousemove",(e)=>{

        const rect=projectCard.getBoundingClientRect();

        const x=e.clientX-rect.left;

        const y=e.clientY-rect.top;

        const rotateX=((y-rect.height/2)/(rect.height/2))*-3;

        const rotateY=((x-rect.width/2)/(rect.width/2))*3;

        projectCard.style.transform=
        `perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale(1.02)`;

    });

    projectCard.addEventListener("mouseleave",()=>{

        projectCard.style.transform="";

    });

});

        // ===========================
        // SKILL TAG RANDOM GLOW
        // ===========================
        const skillTags = document.querySelectorAll('.skill-tag');
        setInterval(() => {
            const randomTag = skillTags[Math.floor(Math.random() * skillTags.length)];
            randomTag.style.borderColor = 'var(--amber-500)';
            randomTag.style.color = 'var(--amber-400)';
            randomTag.style.background = 'var(--amber-glow)';
            setTimeout(() => {
                randomTag.style.borderColor = '';
                randomTag.style.color = '';
                randomTag.style.background = '';
            }, 1500);
        }, 3000);
/* ==========================================
   PROJECT SLIDER
========================================== */

const track = document.querySelector(".project-track");
const cards = document.querySelectorAll(".project-track .project-card");
const nextBtn = document.querySelector(".project-nav.next");
const prevBtn = document.querySelector(".project-nav.prev");
const dots = document.querySelectorAll(".project-dots .dot");

let currentIndex = 0;

function updateSlider() {

    track.style.transform =
        `translateX(-${currentIndex * 100}%)`;

    cards.forEach(card => card.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));

    cards[currentIndex].classList.add("active");
    dots[currentIndex].classList.add("active");

}

nextBtn.addEventListener("click", () => {

    currentIndex++;

    if(currentIndex >= cards.length){

        currentIndex = 0;

    }

    updateSlider();

});

prevBtn.addEventListener("click", () => {

    currentIndex--;

    if(currentIndex < 0){

        currentIndex = cards.length - 1;

    }

    updateSlider();

});

/* Dots */

dots.forEach((dot,index)=>{

    dot.addEventListener("click",()=>{

        currentIndex=index;

        updateSlider();

    });

});

/* Auto Play */

setInterval(()=>{

    currentIndex++;

    if(currentIndex>=cards.length){

        currentIndex=0;

    }

    updateSlider();

},5000);

/* Keyboard */

document.addEventListener("keydown",(e)=>{

    if(e.key==="ArrowRight"){

        nextBtn.click();

    }

    if(e.key==="ArrowLeft"){

        prevBtn.click();

    }

});

/* Mobile Swipe */

let startX = 0;

track.addEventListener("touchstart",(e)=>{

    startX=e.touches[0].clientX;

});

track.addEventListener("touchend",(e)=>{

    let endX=e.changedTouches[0].clientX;

    let diff=startX-endX;

    if(diff>60){

        nextBtn.click();

    }

    if(diff<-60){

        prevBtn.click();

    }

});

/* Initial */

updateSlider();

/* ===========================
   PROJECT DATA
=========================== */

const projects = [
    {
        label: "⭐ Featured Project",
        title: "Sponvia",
        url: "https://sponvia.com",
        description: "Founded as my first startup connecting brands with events for sponsorship opportunities.",
        tags: ["Strategy", "Partnerships", "Development", "Marketing"]
    },

    {
        label: "🚀 Test Project",
        title: "Expense Tracker",
        url: "#",
        description: "A smart expense tracker with analytics and budgeting features.",
        tags: ["React", "Node.js", "MongoDB", "Charts"]
    },

    {
        label: "💡 Test Project",
        title: "Portfolio",
        url: "#",
        description: "Modern animated portfolio with smooth interactions.",
        tags: ["HTML", "CSS", "JavaScript", "GSAP"]
    }
];